/*
    This file is used to display the user's profile information
    on the profile.html page. It fetches the user's information
    from the server and displays it on the page upon loading.
*/
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/get-session-user');
      const userInfo = await response.json();

      const email = userInfo.email;
      const school = userInfo.school;
      const score = userInfo.score;
      const points = userInfo.points;

      const emailDiv = document.getElementById('profile__email');
      const schoolDiv = document.getElementById('profile__school');
      const scoreDiv = document.getElementById('score');
      const pointsDiv = document.getElementById('points');

      emailDiv.textContent = `Email: ${email}`;
      schoolDiv.textContent = `School: ${school}`;
      scoreDiv.textContent = `Score: ${score}`;
      pointsDiv.textContent = `Points: ${points}`;

    } catch (err) {
      console.error('Error fetching leaderboard data', err);
    }
  });