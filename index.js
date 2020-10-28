const fs = require('fs');
const inquirer = require('inquirer')

// array of questions for user
const questions = [
    'GitHub Username:',
    'Contact Email:',
    'Project Title:',
    'Brief Description of Project:',
    'Installation Steps:',
    'Usage Instructions:',
    'What license are you using?',
    'Contribution Guidelines:',
    'Testing Instructions:'
];

// function to write README file
function writeToFile(fileName, data) {
    // Code here that takes the data and makes it way prettier

    // But as a placeholder:
    let parsedData = JSON.stringify(data);

    fs.writeFile(fileName, parsedData , err => { 
        if (err) 
          console.log(err); 
        else { 
          console.log('File written successfully');
        } 
    }); 
}

// function to initialize program
function init() {
    console.log('Let\'s generate a professional README.md for your open source GithHub project!\nEnter your project info to add it to the README...')
    inquirer.prompt([
        {type: 'input', message: questions[0], name: 'github'}, 
        {type: 'input', message: questions[1], name: 'email'},
        {type: 'input', message: questions[2], name: 'title'},
        {type: 'input', message: questions[3], name: 'description'},
        {type: 'input', message: questions[4], name: 'installation'},
        {type: 'input', message: questions[5], name: 'usage'},
        {type: 'list', message: questions[6], name: 'license', choices: ['MIT', 'GNU']},
        {type: 'input', message: questions[7], name: 'contributions'},
        {type: 'input', message: questions[8], name: 'testing'}
    ])
    .then(answers => {
        let fileName = answers.title.split(' ').join('-') + '.md';
        writeToFile(fileName, answers);
    })
    .catch(err => console.log(err));
    
}

// function call to initialize program
init();
