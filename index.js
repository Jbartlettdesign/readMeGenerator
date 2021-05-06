// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const writeFile = require('../readme-guide');
const generator = require('../generation');
//const answers = {yourAnswers:[], install:[]};
// TODO: Create an array of questions for user input
//const questions = [];
//title of my project and sections entitled Description, 
//Table of Contents, Installation, Usage, License, 
//Contributing, Tests, and Questions
const finalQuestions= (answers) => {
return inquirer
.prompt([
    {
        type:'input',
        name: 'credits',
        message:'List your collaborators, if any, with links to their GitHub profiles.',
        validate: credits => {
            if (credits) {
              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
    },
    {
        type:'input',
        name: 'license',
        message:'List your licenses.',
        validate: license => {
            if (license) {
              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
    }
])
.then(answers => {   
    return answers;
})
}
const screenShot = (answers) => {
    return inquirer
    .prompt ([
        
        {
            type:'input',
            name: 'insertScreenShot',
            message:'Insert screenshot',
            validate: screenshot => {
                if (screenshot) {
                  return true;
                } else {
                  console.log('Cannot skip!');
                  return false;
                }
              }
        },
        {
            type:'confirm',
            name: 'addAnother',
            message:'Add another screenshot?',
            when:({insertScreenShot}) => insertScreenShot
        }
    ])
    .then(info => {
        if(info.addAnother){
            return screenShot(answers);
        }
        else 
        {
            return answers;
        }

    
})
}

const nextQuestions = (answers) =>{
    return inquirer
    .prompt ([
        {
         type:'input',
         name: 'usage',
         message: 'Provide instructions and examples for use.',
         validate: usage => {
            if (usage) {
              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
        },
        {
         type:'confirm',
         name: 'screenshot',
         message: 'Enter a screenshot to help others navigate the usage?',
         default: false
        },
        {
         type:'input',
         name: 'enterScreenshot',
         message: 'To add a screenshot, create an assets/images folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax: ![alt text](assets/images/screenshot.png)',
         when:({screenshot}) => screenshot,
         validate: screenshot => {
            if (screenshot) {
              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
        },
        {
            type:'confirm',
            name: 'addAnother',
            message:'Add another screenshot?',
        }
    ]).then(info =>{
        if(info.addAnother){
            return screenshot(answers)

        }
        else
        {
        return answers;
    }
        })
    
}
const aditionalQuestions = (answers) => {
if(!answers.install){
    answers.install = [];
} 
return inquirer
.prompt([
    {
        type: 'input',
        name: 'step',
        message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running. Enter your step.',
        validate: installation => {
            if(installation){
                return true;
                
            }
            else{
                console.log('Please enter the installation steps required.');
            }
        }
    },
    {   
        type: 'confirm',
        name: 'addAnotherStep',
        message: 'Would you like to enter another step?',
        default: true,
        
    }
    
]).then(additional => {
    //answers.install.push(answersToQuestions);
    
    if(additional.addAnotherStep){
        answers.install.push(additional);
        return aditionalQuestions(answers);
    }
    else{
        
        answers.install.push(additional);
        return answers;
    }
})



};
const promptUser = () =>{

return inquirer
.prompt([
{
    type: 'input',
    name: 'projectTitle',
    message: 'What is your project title?',
    validate: projectTitleInput => {
        if(projectTitleInput){
            return true;
        }
        else{
            console.log('Please enter a project title.');
            return false;
        }
    }
}, 
{
    type: 'input',
    name: 'description',
    message: 'Enter a description for your application',
    validate: descriptionTitle => {
        if(descriptionTitle){
            return true;
        }
        else{
            console.log('Please enter a description.');
            return false;
        }
    }
},
{
    type: 'confirm', 
    name: 'tableOfContents',
    message: 'If your README is very long, add a table of contents to make it easy for users to find what they need. This is OPTIONAL',
    default: true,
   
}


])


};


// TODO: Create a function to write README file
//function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    
    promptUser()
    .then(aditionalQuestions)
    /*.then(nextQuestions)
    .then(finalQuestions)*/
    .then(info => console.log(info));
    }
        //return writeFile(info);
        //return generator(info);
        
    /*.then(info => {
        //console.log(info);
        return generator(info)
    })*/
    
    /*.then(file => {
       return writeFile(file);
       //console.log(file);
    }) 
    .catch(err => {
        console.log(err);
      });
*/


// Function call to initialize app
init();
