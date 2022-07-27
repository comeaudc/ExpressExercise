# Express Exercises

## Getting Started
 These inscructions will help you get a copy of the project up and running on your local machine.

 ### Prerequisites:
 You will need:
 * Any text editor
 * [git](https://git-scm.com/downloads)
 * dotenv  
`
npm i dotenv
`
* Node.js  
`
npm init -y 
`
* express  
`
npm i express
`

 
 To clone from GitHub Repository type the following code into your text editor terminal:

 `
git clone https://github.com/comeaudc/ExpressLab.git
 `

  Here is a link to the repository on [GitHub](https://github.com/comeaudc/ExpressLab.git)  
 The clone will appear in your local terminal

  ## To Run App:
 1. Type nodemon into terminal
 2. Open prefered browser
 3. Type localhost:3000 in URL bar

## Features:
* localhost:3000/ 
    * You can click link to decrement bugs
    * There is a random chance that program will add a random amount of bugs each click
    * If reaches localhost:3000/0 specialized message will appear and prompt for restart
* localhost:3000/greeting
    * You will see generic greeting
* localhost:3000/greeting/{put your first name here}
    * Will render specialized greatings
* localhost:3000/magic/ {Your question here}
    * Will answer your question with a randomized 8 ball response
* localhost:3000/tip/{total bill amout}/{percent tip}
    * Will calculate and display total and required tip amount

 ## Built With:
* HTML5 - DOM
* JavaScript
* Express
* .env