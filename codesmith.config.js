'use strict';
const path = require('path');

module.exports = function (codesmith) {
    codesmith.setGenerator('class-component-ts', {
        description: 'Add a new class component(ts)',
        questions: [
            {
                type: 'directory',
                name: 'basePath',
                message: 'Where you like to put this component?',
                basePath: ".",
            },
            {
                type: 'input',
                name: 'name',
                message: "What's your component class name"
            }
        ],
        actions: [
            {
                type: 'add',
                path: '{{basePath}}/{{paramCase name}}.tsx',
                templateFile: 'class-component-ts/templates/component.ts',
                abortOnFail: true
            }
        ]
    });

    // codesmith.setGenerator('pure-component-ts', {
    //     description: 'Add a new pure component(ts)',
    //     questions: [
    //         {
    //             type: 'input',
    //             name: 'packageName',
    //             message: 'What is your new package name?',
    //             validate: function (value) {
    //                 if ((/.+/).test(value)) { return true; }
    //                 return 'name is required';
    //             }
    //         },
    //         {
    //             type: 'list',
    //             name: 'platform',
    //             message: 'What pizza toppings do you like?',
    //             choices: [
    //                 {name: 'None', value: 'none', checked: true},
    //                 {name: 'Github', value: 'github'}
    //             ]
    //         },
    //         {
    //           type: 'input',
    //           name: 'githubPath',
    //           message: 'What is your Github repository path(like sundogrd/codesmith)?',
    //           when: function(answers) {
    //               return answers.platform === "github"
    //           }
    //         }
    //     ],
    //     actions: [
    //         {
    //             type: 'add',
    //             path: 'package.json',
    //             templateFile: 'templates/package.json',
    //             abortOnFail: true
    //         }
    //     ]
    // });
};
