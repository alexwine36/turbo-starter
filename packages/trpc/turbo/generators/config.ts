import type { PlopTypes } from '@turbo/gen';
// @ts-ignore
import directoryPrompt from 'inquirer-directory';
import { toCamelCase, toKebabCase } from 'remeda';

type TurboAnswers = {
  turbo: {
    paths: {
      cwd: string;
      root: string;
      workspace: string;
    };
  };
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setPrompt('directory', directoryPrompt);
  plop.setGenerator('add handler', {
    description: 'Generate a new handler',
    prompts: [
      {
        type: 'directory',
        name: 'router',
        message: 'Select a router',
        basePath: './server/routers',
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as any,
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the route?',
      },
    ],
    actions: (rawData) => {
      const modData = rawData as TurboAnswers & {
        router: string;
        name: string;
      };
      console.log(modData);
      console.log(modData.turbo.paths);
      const basePath = `${modData?.turbo.paths.workspace}/server/routers`;
      const targetPath = `${basePath}/${modData.router}`;
      const templateBasePath = `${
        modData?.turbo.paths.workspace
      }/turbo/generators/templates/add-route`;

      const routeName = toCamelCase(modData.name);
      const routerName = `${routeName}Router`;
      const routerFile = toKebabCase(modData.name);
      const routerPath = `${targetPath}/${routerFile}/_router.ts`;

      // TODO: use this to make sure that paths are correctly implemnted

      const importPath = routerPath
        .replace(modData?.turbo.paths.workspace, '@')
        .replace('.ts', '');

      const data = {
        ...modData,
        importPath,
        routerName,
        routeName,
        routerFile,
        routerPath,
      };

      const actions: PlopTypes.Actions = [];

      console.log(data);
      actions.push({
        type: 'add',
        path: routerPath,
        templateFile: `${templateBasePath}/router.ts.hbs`,
        data,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/_router.ts`,
        pattern: 'Handlers\n',
        data,
        template: '{{routeName}}: {{routerName}},\n',
        // template: `import {{ routerName }} from './{{ routerFile }}/_router';\n`,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/_router.ts`,
        pattern: 'Imports\n',
        data,
        // template: '{{routeName}}: {{routerName}},\n',
        template: `import { {{ routerName }} } from './{{ routerFile }}/_router';\n`,
      });

      // return [];
      return actions;
    },
  });
  plop.setGenerator('add route', {
    description: 'Generate a new route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the route?',
      },
    ],
    actions: (rawData) => {
      const modData = rawData as TurboAnswers & {
        name: string;
      };
      console.log(modData);
      console.log(modData.turbo.paths);
      const basePath = `${modData?.turbo.paths.workspace}/server/routers`;
      const targetPath = `${basePath}`;
      const templateBasePath = `${
        modData?.turbo.paths.workspace
      }/turbo/generators/templates/add-route`;

      const routeName = toCamelCase(modData.name);
      const routerName = `${routeName}Router`;
      const routerFile = toKebabCase(modData.name);
      const routerPath = `${targetPath}/${routerFile}/_router.ts`;

      const data = {
        ...modData,
        routerName,
        routeName,
        routerFile,
        routerPath,
      };

      const actions: PlopTypes.Actions = [];

      actions.push({
        type: 'add',
        path: routerPath,
        templateFile: `${templateBasePath}/router.ts.hbs`,
        data,
      });

      return actions;
    },
  });
}
