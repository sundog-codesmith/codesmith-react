'use strict';
const path = require('path');
const ts = require('typescript');
const changeCase = require('change-case');

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
                message: "What's your component class name?"
            },
            {
                type: 'checkbox',
                name: 'decorators',
                message: "What decorator do you want?",
                choices: [
                    {name: 'withRouter', value: 'withRouter'},
                    // {name: 'connect(redux)', value: 'github'}
                ]
            }
        ],
        actions: [
            {
                type: 'add',
                path: '{{basePath}}/{{dashCase name}}.tsx',
                templateFile: 'generators/class-component-ts/templates/component.tsx',
                abortOnFail: true
            },
            {
                type: 'ts/ast',
                when: (data, config) => {
                    if(data.decorators.indexOf('withRouter') !== -1) {
                        return true
                    }
                    return false
                },
                ast: (tsMorch, data) => {
                    const project = new tsMorch.Project({});
                    project.addExistingSourceFiles(`${process.cwd()}/${data.basePath}/${changeCase.paramCase(data.name)}.tsx`);
                    const testFile = project.getSourceFileOrThrow(`${changeCase.paramCase(data.name)}.tsx`)
                    testFile.transform((traversal) => {
                        const node = traversal.visitChildren(); // return type is `ts.Node`
    
                        if (ts.isExportAssignment(node)) {
                            const callExpression = ts.createCall(
                                ts.createIdentifier('withRouter'),
                                undefined, // type arguments, e.g. Foo<T>()
                                [
                                    node.expression
                                ]
                            )
                            return ts.createExportAssignment(
                                undefined,
                                undefined,
                                false,
                                callExpression
                            );
                        }
    
                        return node;
                    });
                    testFile.addImportDeclaration({
                        namedImports: ['withRouter'],
                        moduleSpecifier: 'react-router'
                    })
                    return project.save();
                }
            }
        ]
    });

    codesmith.setGenerator('functional-component-ts', {
        description: 'Add a new functional component(ts)',
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
                message: "What's your component class name?"
            }
        ],
        actions: [
            {
                type: 'add',
                path: '{{basePath}}/{{dashCase name}}.tsx',
                templateFile: 'generators/functional-component-ts/templates/component.tsx',
                abortOnFail: true
            }
        ]
    });
};
