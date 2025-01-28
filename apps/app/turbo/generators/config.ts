import path from 'node:path';
import type { PlopTypes } from '@turbo/gen';
// @ts-ignore
import directoryPrompt from 'inquirer-directory';
import { capitalize, pipe, toCamelCase, toKebabCase } from 'remeda';

type TurboAnswers = {
  turbo: {
    paths: {
      cwd: string;
      root: string;
      workspace: string;
    };
  };
};

const routerPath = path.resolve(__dirname, '../../');

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  plop.setPrompt('directory', directoryPrompt as any);
  plop.setGenerator('add resource table', {
    description: 'Generate resource table',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the route?',
      },

      {
        type: 'directory',
        name: 'directory',
        message: 'Select a directory',
        basePath: routerPath,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as any,
      {
        type: 'input',
        name: 'dataType',
        message: 'What is the name of the data type import?',
        default: ({ name }: { name: string }) =>
          `${pipe(name, toCamelCase(), capitalize())}Data`,
      },
      {
        type: 'input',
        name: 'inputType',
        message: 'What is the name of the form input type import?',
        default: ({ name }: { name: string }) =>
          `${pipe(name, toCamelCase(), capitalize())}Input`,
      },
    ],
    actions: (rawData) => {
      const modData = rawData as TurboAnswers & {
        name: string;
        directory: string;
        dataType: string;
        inputType: string;
      };
      const basePath = `${modData?.turbo.paths.workspace}/${modData.directory}`;
      const templateBasePath = `${
        modData?.turbo.paths.workspace
      }/turbo/generators/templates/resource-table`;
      const propertyName = pipe(modData.name, toCamelCase());
      const pathName = toKebabCase(modData.name);
      const capitalizedName = pipe(modData.name, toCamelCase(), capitalize());
      const formName = `${capitalizedName}Form`;

      const data = {
        ...modData,
        formName,
        propertyName,
        capitalizedName,
        pathName,
      };
      console.log(modData);
      const actions: PlopTypes.Actions = [];

      actions.push({
        type: 'add',
        templateFile: `${templateBasePath}/form.tsx.hbs`,
        path: `${basePath}/components/${pathName}-form/index.tsx`,
      });

      actions.push({
        type: 'add',
        templateFile: `${templateBasePath}/dialog.tsx.hbs`,
        path: `${basePath}/components/${pathName}-dialog/index.tsx`,
      });

      actions.push({
        type: 'add',
        templateFile: `${templateBasePath}/table.tsx.hbs`,
        path: `${basePath}/components/${pathName}-table/index.tsx`,
      });

      actions.push({
        type: 'add',
        templateFile: `${templateBasePath}/card.tsx.hbs`,
        path: `${basePath}/components/${pathName}-card/index.tsx`,
      });

      return actions.map((action) => {
        return {
          // biome-ignore lint/suspicious/noExplicitAny: Don't use strings
          ...(action as any),
          data,
        };
      });
    },
  });
}
