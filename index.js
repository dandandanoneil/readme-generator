const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require("chalk");
const log = console.log;

// array of questions for user
const questions = [
    {type: 'input',
     message: 'GitHub Username:',
     name: 'github'}, 
    {type: 'input',
     message: 'Contact Email:',
     name: 'email'}, 
    {type: 'input',
     message: 'Project Title:',
     name: 'title'}, 
    {type: 'input',
     message: 'Brief Description of Project:',
     name: 'description'}, 
    {type: 'input',
     message: 'Installation Steps:',
     name: 'installation'}, 
    {type: 'input',
     message: 'Usage Instructions:',
     name: 'usage'}, 
    {type: 'list',
     message: 'What license do you want to list?',
     name: 'license', 
     choices: ['MIT', 'GNU GPL v3', 'ISC']}, 
    {type: 'input',
     message: 'Contribution Guidelines:',
     name: 'contributions'}, 
    {type: 'input',
     message: 'Testing Instructions:',
     name: 'testing'}, 
];

// function to write README file
function writeToFile(fileName, data) {
    // Builds badge and license descriptions based on data.license
    let badge = '';
    let licenseDescription = '';
    let year = new Date().getFullYear();
    switch (data.license) {
        case 'MIT':
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            licenseDescription = `### The MIT License\n\nCopyright ${year} ${data.github}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nRead More at <https://opensource.org/licenses/MIT>.`;
            break;
        case 'GNU GPL v3':
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            licenseDescription = `### The GNU General Public License v3.0\n\nCopyright ${year} ${data.github}\n\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.\n\nRead more at <https://www.gnu.org/licenses/>.`;
            break;
        case 'ISC':
            badge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
            licenseDescription = `### The ISC License\n\nCopyright ${year} ${data.github}\n\nPermission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.\n\nTHE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\n\nRead more at <https://opensource.org/licenses/ISC>.`;
            break;
        }
    
    // Takes the data and plugs it into a template
    let parsedData = `# ${data.title}\n${data.description}\n## Table of Contents\n- [Installation Steps](#installation-steps)\n- [Usage Instructions](#usage-instructions)\n- [Licenses](#licenses)\n- [Contribution Guidelines](#contribution-guidelines)\n- [Testing Instructions](#testing-instructions)\n\n${badge}\n---\n## Installation Steps\n${data.installation}\n\n## Usage Instructions\n${data.usage}\n\n## Licenses\n${licenseDescription}\n\n## Contribution Guidelines\n${data.contributions}\n\n## Testing Instructions\n${data.testing}\n\n---\nGenerated using [README Generator](https://github.com/dandandanoneil/readme-generator)`

    fs.writeFile(fileName, parsedData , err => { 
        if (err) 
          log(chalk.red(err)); 
        else { 
          log(chalk.black.bgGreen('Your README has been generated!'));
          log(`A markdown file called ${fileName} has been created at the root of this directory.`);
        } 
    }); 
}

// function to initialize program
function init() {
    log(chalk.inverse(' **************************** '));
    log(chalk.inverse(' *     README Generator     * '));
    log(chalk.inverse(' **************************** '));
    log('Let\'s generate a professional README.md for your open source GithHub project!');
    log(chalk.green('Enter your project info to add it to the README...'));
    inquirer.prompt(questions)
    .then(answers => {
        let fileName = answers.title.split(' ').join('-') + '-README.md';
        writeToFile(fileName, answers);
    })
    .catch(err => log(chalk.red(err)));
    
}

// function call to initialize program
init();
