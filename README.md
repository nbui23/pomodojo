## Inspiration

The inspiration for Pomodojo came from my friends and I increasingly relying on the Pomodoro technique during midterm season. While we tried to use Discord as a makeshift study hall, it fell short due to its lack of specific features for our needs, such as a dedicated Pomodoro timer and a system to keep each other accountable in a charming and engaging manner. Recognizing the gap for a specialized, distraction-free, and cute platform that combines the best of productivity techniques with the social aspect of studying, we envisioned Pomodojo: a cute, all-in-one application designed to make studying a shared, rewarding experience. 

## What it does

Pomodojo is a gamified study platform that encourages users to stay focused and accountable through shared Pomodoro sessions. It offers a low-distraction environment where students can collaborate, share insights, and support each other's learning goals without the interruptions of traditional social media. Unique to Pomodojo, users earn points for studying, which can be exchanged for virtual cosmetics and real-life rewards, adding an element of fun and motivation to the study process.

## How we built it

At its core, the app is built using HTML, CSS, and JavaScript, ensuring cross-platform compatibility and a responsive, charming, and functional design. The aesthetics were enhanced with Bootstrap. We also leveraged WebRTC and Agora for real-time communication, while the backend was powered by Node.js with Express.js to ensure a scalable and efficient server-side solution. Data persistence and management are handled  by MongoDB, providing a solid and flexible database structure.

For the real-time chat functionality, a critical feature for the live Pomodoro sessions, we integrated WebRTC functionalities through Agora's APIs. This allowed us to implement low-latency voice chat and high-definition camera-quality to ensure our application could support these study sessions.

On the backend, MongoDB was our database of choice, providing a flexible scalable solution for managing user data, study session logs, and the gamification elements such as points and rewards. MongoDB's robustness supported our development process, even in the face of connectivity challenges.

This combination of technologies enabled us to create Pomodojo as an all-in-one, cute application that keeps users accountable and motivated in a low-distraction environment.

## Challenges we ran into

There were lots of outdated SDKs when dealing with the real-time chat functionality. The Wi-Fi was also not working properly with our MongoDB database.

## Accomplishments that we're proud of

One of our most significant accomplishments is our real-time communication through WebRTC and Agora. Working through these technologies, especially with the added challenge of outdated documentation was a satisfying challenge and we are proud to have created a platform that not only meets our users for live, interactive Pomodoro sessions but with a level of polish and reliability.

## What we learned

We learned a lot about how to do high-quality, low-latency video calls through WebRTC and Agora. This knowledge has not only propelled our project to new heights but has also prepared us for future challenges.

## What's next for Pomodojo

Since this was just a prototype, next steps would be to add more user customization, horizontal and vertical scaling, virtual cosmetics, and text messaging/direct messaging.