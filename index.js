// Call in information from otehr js files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Use inquirer module for user input prompt
const inquirer = require("inquirer");

// module provides utilities for working with file and directory paths
const path = require("path");


// fs is a Node standard library package for reading and writing files
const fs = require("fs");

// const __dirname = './outputHTMLfile/';
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

//create an array to add the team member data
var teamMembersArray =[];


// TODO: Write Code to gather information about the development team members, and render the HTML file.



// array of questions for user- manager
const questionsManager = [
    {
        type: 'input',
        message: 'What is the team manager\'\s name?',
        name: 'name',
      },
      {
        type: 'input',
        message: 'What is the team manager\'\s Employee ID?',
        name: 'EmployeeID',
      },
      {
        type: 'input',
        message: 'What is the team manager\'\s Email address?',
        name: 'eMail',
      },
      {
        type: 'input',
        message: 'What is the team manager\'\s office number?',
        name: 'officeNumber',
      },
];

// array of question for next step
const questionsNextStep = [
      {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        name: 'jobType',
        choices: ['Engineer', 'Intern', 'I dont want to add any more team members'],
      },
];

// array of questions for user- engineer
const questionsEngineer = [
    {
        type: 'input',
        message: 'What is the engineer\'\s name?',
        name: 'name',
      },
      {
        type: 'input',
        message: 'What is the engineer\'\s Employee ID?',
        name: 'EmployeeID',
      },
      {
        type: 'input',
        message: 'What is the engineer\'\s Email address?',
        name: 'eMail',
      },
      {
        type: 'input',
        message: 'What is the engineer\'\s gitHub?',
        name: 'gitHub',
      },
];

// array of questions for user- engineer
const questionsIntern = [
    {
        type: 'input',
        message: 'What is the intern\'\s name?',
        name: 'name',
      },
      {
        type: 'input',
        message: 'What is the intern\'\s Employee ID?',
        name: 'EmployeeID',
      },
      {
        type: 'input',
        message: 'What is the intern\'\s Email address?',
        name: 'eMail',
      },
      {
        type: 'input',
        message: 'What is the intern\'\s school?',
        name: 'school',
      },
];


// function to write HTML file
function buildTeam(teamMembers) {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }

    // writes file to outPath, with the render function inputting the data into the template literal
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    
  }

// function to initialize program
function init() {
    inquirer
    .prompt(questionsManager)
    .then((answers) => {

            // pass data to manager class
            const managerObject = new Manager(answers.name, answers.EmployeeID, answers.eMail, answers.officeNumber);

            // push Object to array to store for input into render
            teamMembersArray.push(managerObject);

            // Ask user if they want to add another team member
            additionalMemberEnquiry();
    })
};

function additionalMemberEnquiry(){
    inquirer
    .prompt(questionsNextStep)
    .then((answers) => {
            // if function to control next step depending on user answer
            if (answers.jobType=== 'Engineer'){
                addEngineer();
            }else if(answers.jobType=== 'Intern'){
                addIntern();
            }else{
                buildTeam(teamMembersArray);
            }

    })
}

function addEngineer(){
    inquirer
    .prompt(questionsEngineer)
    .then((answers) => {
            // pass data to manager class
            const engineerObject = new Engineer(answers.name, answers.EmployeeID, answers.eMail, answers.gitHub);

            // push Object to array to store for input into render
            teamMembersArray.push(engineerObject);

            // Ask user if they want to add another team member
            additionalMemberEnquiry();
    })
};

function addIntern(){
    inquirer
    .prompt(questionsIntern)
    .then((answers) => {
            // pass data to manager class
            const internObject = new Intern(answers.name, answers.EmployeeID, answers.eMail, answers.school);

            // push Object to array to store for input into render
            teamMembersArray.push(internObject);

            // Ask user if they want to add another team member
            additionalMemberEnquiry();
    })
};

// function call to initialize program
init();