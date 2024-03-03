/*
    This file is used to display the user's profile information
    on the profile.html page. It fetches the user's information
    from the server and displays it on the page upon loading.
*/
document.addEventListener('DOMContentLoaded', async () => {
    try {
      let response = await fetch('/get-session-user');
      const userInfo = await response.json();

      response = await fetch('/get-data');
      const allUsers = await response.json();
  
      // Sort the users by score
      console.log(userInfo);
      console.log(allUsers);
      const sortedUsers = allUsers.slice().sort((a, b) => b.score - a.score);
      console.log(sortedUsers);
    
      // Find the index of the current user in the sorted list
      const userIndex = sortedUsers.findIndex(user => user.email === userInfo.email);

      // Calculate the rank of the current user
      const userRank = userIndex !== -1 ? userIndex + 1 : null; // Add 1 because rank starts from 1
    

    // Calculate the rank of the current user
      console.log(userRank);
    
      

      const email = userInfo.email;
      const school = userInfo.school;
      const score = userInfo.score;
      const points = userInfo.points;

      const profileDiv = document.getElementById('profile');
      const buttonsDiv = document.getElementById('redirect-buttons-div');
      const loadingDiv = document.getElementById('loading-gif');
      const emailDiv = document.getElementById('profile__email');
      const schoolDiv = document.getElementById('profile__school');
      const scoreDiv = document.getElementById('score');
      const pointsDiv = document.getElementById('points');
      const leaderboardDiv = document.getElementById('leaderboard');
      const schoolRoomButton = document.getElementById('school-room');


      emailDiv.textContent = `Email: ${email}`;
      schoolDiv.textContent = `School: ${school}`;
      scoreDiv.textContent = `Score: ${score}`;
      pointsDiv.textContent = `Points: ${points}`;
      leaderboardDiv.textContent = `Leaderboard Position: ${userRank}`;
      schoolRoomButton.href = school === 'Carleton University' ? '/room.html?room=carleton' : '/room.html?room=uOttawa';
      schoolRoomButton.textContent = `Join ${school} Room`;

      loadingDiv.style.display = 'none';
      profileDiv.style.display = 'flex';
      buttonsDiv.style.display = 'block';
    } catch (err) {
      console.error('Error fetching profile data', err);
    }
  });