module.exports = (plop) => {
    plop.setHelper('upperCase', (txt) => txt.toUpperCase());

    plop.setGenerator('component', {
        description: 'Create a reusable component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/index.tsx',
                template: "export * from './{{pascalCase name}}';",
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Component.tsx.hbs',
            },
            {
                type: 'add',
                path:
          'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
                templateFile: 'plop-templates/Component.stories.tsx.hbs',
            },
            {
                type: 'append',
                path: 'src/index.ts',
                template: "export * from './components/{{pascalCase name}}';",
            },
        ],
    });
    plop.setGenerator('recipe', {
        description: 'Create a recipe',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your recipe name (e.g. GlobalHeader)?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: '.storybook/common-patterns/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Recipe.tsx.hbs',
            },
            {
                type: 'add',
                path:
          '.storybook/common-patterns/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
                templateFile: 'plop-templates/Recipe.stories.tsx.hbs',
            },
            {
                type: 'add',
                path: '.storybook/common-patterns/{{pascalCase name}}/{{pascalCase name}}.scss',
                templateFile: 'plop-templates/Recipe.scss.hbs',
            },
        ],
    });
    plop.setGenerator('page', {
        description: 'Create a page',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your page name (e.g. Homepage)?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: '.storybook/pages/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Page.tsx.hbs',
            },
            {
                type: 'add',
                path:
          '.storybook/pages/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
                templateFile: 'plop-templates/Page.stories.tsx.hbs',
            },
        ],
    });
};
