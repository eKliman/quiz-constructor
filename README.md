# Quiz-constructor

[**_"Quiz-constructor"_**](https://quiz-constructor.web.app/ "Quiz-constructor") is a SPA application for creating and passing quizzes.
Each quiz consists of a title and four-choice questions each.

The application consists of 4 pages:

- quiz list;
- quiz page;
- quiz creation page;
- login page.

**The quiz list page** displays the list of all quizzes.

**_Actions on the quiz list page:_**

- go to authorization;
- go to to creating a new quiz (only if the user is authorized);
- authorized users can delete their own quizzes (the delete button appears when the mouse is over the quiz). Confirmation required;
- go to the passage of the quiz (no authorization required).

**The quiz creation page** allows you to create a new quiz.

**_Quiz creation consists of the following stages:_**

- quiz name entry
- question entry
- entering of four answer options
- indication of the correct answer
- saving the created question
- creating the next question or saving the quiz

While creating a quiz, you can go back to your already saved questions and edit them.

**The quiz page** is intended for passing the quiz. The user answers the questions sequentially by choosing one of the four answer options offered. At the end of the quiz, the result of the quiz is displayed (the number of correct answers and the list of all questions with a note about the correctness of each answer).

**The authorization page** allows a user to register or log in.

**_Actions on the login page:_**

- enter Email, validate it;
- enter a password, validate it;
- login;
- sign up.

### Storage

User authorization is organized using the Firebase service. Information about the current status of user authorization is stored in **_LocalStorage_**.

**_Firebase Realtime Database_** is used to store created quizzes.

### The following technical means were used in the development

- HTML/SCSS/JavaScript
- React
- Redux/redux-thunk
- Fetch API
- Webpack
- Firebase
- LocalStorage

To see the **application in action** click [**_here._**](https://quiz-constructor.web.app/ "Quiz-constructor")

The application is adaptive for different screen resolutions. Supports IE11.  
This project was bootstrapped with Create React App.  
Deployed on **_Firebase Hosting_**.

---

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
