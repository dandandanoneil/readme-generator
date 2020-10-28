const fs = require('fs');
const inquirer = require('inquirer')

// array of prompts for user
const prompts = [
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
    let parsedData = `# ${data.title}\n${data.description}\n## Table of Contents\n- [Installation Steps](#installation-steps)\n- [Usage Instructions](#usage-instructions)\n- [Licenses](#licenses)\n- [Contribution Guidelines](#contribution-guidelines)\n- [Testing Instructions](#testing-instructions)\n---\n## Installation Steps\n${data.installation}\n## Usage Instructions\n${data.usage}\n## Licenses\n...BADGE PLACEHOLDER\n## Contribution Guidelines\n${data.contributions}\n## Testing Instructions\n${data.testing}\n\n---\nGenerated using [README Generator](https://github.com/dandandanoneil/readme-generator)`

    fs.writeFile(fileName, parsedData , err => { 
        if (err) 
          console.log(err); 
        else { 
          console.log('File created successfully!');
        } 
    }); 
}

// function to initialize program
function init() {
    console.log(
        'Let\'s generate a professional README.md for your open source GithHub project!\nEnter your project info to add it to the README...')
    inquirer.prompt([
        {type: 'input', message: prompts[0], name: 'github'}, 
        {type: 'input', message: prompts[1], name: 'email'},
        {type: 'input', message: prompts[2], name: 'title'},
        {type: 'input', message: prompts[3], name: 'description'},
        {type: 'input', message: prompts[4], name: 'installation'},
        {type: 'input', message: prompts[5], name: 'usage'},
        {type: 'list', message: prompts[6], name: 'license', choices: ['MIT', 'GNU']},
        {type: 'input', message: prompts[7], name: 'contributions'},
        {type: 'input', message: prompts[8], name: 'testing'}
    ])
    .then(answers => {
        let fileName = answers.title.split(' ').join('-') + '-README.md';
        writeToFile(fileName, answers);
    })
    .catch(err => console.log(err));
    
}

// function call to initialize program
init();
