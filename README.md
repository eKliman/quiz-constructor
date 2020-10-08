# Quiz-constructor

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### The following technical means were used in the development

- HTML/SCSS/JavaScript
- React
- Redux
- Webpack
- Firebase
- Local Storage

### General information about the application:

- Quiz-constructor is a single-page application.
- State organized in redux.
- The application allows users:
  - To create their own quizzes.
  - To pass both own and other users' quizzes.
- To create a new test, the user must be logged in.
- Authorized users can delete only their own quizzes (the delete button appears when the mouse is over the quiz).
- Authorization is organized using Email and password on Firebase.
- Data about the current user authorization are saved in the Local Storage, which allows you to save the authorization status after a page reboot.
- All created quizzes are saved in Firebase Realtime Database.
- The application is adaptive for different screen resolutions. Supports IE11.

### Deployed on Firebase Hosting

To see the application in action click [here.](https://quiz-constructor.web.app/ 'Quiz-constructor')