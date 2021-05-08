// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const writeFile = require('../readme-guide');
const generator = require('../generation');
// TODO: Create an array of questions for user input

const contributeTest = (answers) => {
    if(!answers.contributionAndTests){
        answers.contributionAndTests = [];
    } 
    return inquirer
    .prompt([
    
    {
        type:'input',
        name: 'contribute',
        message: 'If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The Contributor Covenant is an industry standard, but you can always write your own.',
        validate: contribute => {
            if (contribute) {
              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
    },
    {
        type:'input',
        name: 'tester',
        message: 'Go the extra mile and write tests for your application. Then provide examples on how to run them.',
        validate: tester => {
            if (tester) {
              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
    }

    ]).then(
        info => {
            answers.contributionAndTests.push(info);
            return answers;
        }
    )
}
const licenses = (answers) => {
    if(!answers.licenseList){
        answers.licenseList = [];
    } 
    return inquirer
    
.prompt([
    {
      type: 'rawlist',
      name: 'license',
      message:'List your licenses.',
      choices: ['MIT', 'Apache', 'GPLv3'],
    },
  ])
  .then(info => {
    if(info.addAnother){
        
        answers.licenseList.push(info);        
        
        return licenses(answers);
    }
    else 
    {            
        answers.licenseList.push(info);

        return answers;
    }
});
}
const questions = (answers) => {

if (!answers.questions) {
    answers.questions = [];
}
return inquirer
.prompt([
    /*{
        type:'input',
        name: 'questions',
        message:'List any questions you may have regarding the app.',
        validate: credits => {
            if (credits) {

              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
    },*/
    {
        type:'input',
        name: 'gitHub',
        message: 'Enter a Github link.',
        validate: gitHub => {
            if (gitHub) {
              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
    },
    {
        type:'input',
        name: 'email',
        message: 'Enter an email address.',
        validate: email => {
            if (email) {
              return true;
            } else {
              console.log('Cannot skip!');
              return false;
            }
          }
    }
])
.then(info => {
    answers.questions.push(info); 
    return answers;
})
}
const screenShot = (answers) => {
    if(!answers.screenshot){
        answers.screenshot = [];
    } 
    return inquirer
    .prompt ([
        {
            type:'input',
            name: 'enterScreenshot',
            message: 'To add a screenshot, create an assets/images folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax: ![alt text](assets/images/screenshot.png)',
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
    ])
    .then(info => {
        if(info.addAnother){
            answers.screenshot.push(info)
            return screenShot(answers);
        }
        else 
        {            
            answers.screenshot.push(info)
            return answers;
        }

    
})
}

const instructions = (answers) =>{
    if(!answers.usage){
        answers.usage = []
    }
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
        }
        
    ]).then(info =>{
            answers.usage.push(info);
            //answers.push(info);   
            return answers;
        })
        
    
}
const install = (answers) => {
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
    
    if(additional.addAnotherStep){
        answers.install.push(additional);
        return install(answers);
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
    .then(install)
    .then(instructions)
    .then(screenShot)
    .then(licenses)
    .then(questions)
    .then(contributeTest)
    //.then(info => console.log(info)) 
    .then(info => { 
        return generator(info)
    })
    .then(info => {
       return writeFile(info);
    }) 
    .catch(err => {
        console.log(err);
    });
    }

// Function call to initialize app
init();
