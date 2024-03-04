#!/usr/bin/env node
console.clear();

import type { Backend, Frontend, PackageManager } from './types';

import { intro, text, select, password, confirm, outro } from '@clack/prompts';
import { fivelyInitializr, hints, outroMsg } from './utils';
import { setup } from './functions/setup';
import { installDeps } from './functions/installDeps';
import { cloneTemplates } from './functions/cloneTemplates';

import path from 'node:path';
import colors from 'colors';
import fs from 'fs-extra';

await intro(`Welcome to ${fivelyInitializr}!`);

const dir = path.resolve(
  process.cwd(),
  (await text({
    message: 'Enter a project directory:',
    placeholder: 'Leave blank for current directory',
    defaultValue: '.',
    validate: (value) => {
      value = path.resolve(process.cwd(), value);
      let isEmpty;

      try {
        const contents = fs.readdirSync(value);
        isEmpty = contents.length === 0;
      } catch {
        isEmpty = true;
      }

      return isEmpty ? undefined : 'Directory is not empty!';
    },
  })) as string,
);

const frontend = (await select({
  message: 'Select frontend to use:',
  options: [
    { label: 'Next JS', value: 'nextJs' },
  ],
})) as Frontend;

const backend = (await select({
  message: 'Select backend to use:',
  options: [
    { label: `Node JS (${hints.express} & ${hints.typeOrm})`, value: 'typeOrm' },
  ],
})) as Backend;

const packageManager = (await select({
  message: 'Select a package manager:',
  options: [
    { label: 'NPM', value: 'npm' },
    { label: 'YARN', value: 'yarn' },
  ],
})) as PackageManager;

const installNow = await confirm({
  message: 'Install dependencies now?',
  initialValue: true,
});

outro(colors.cyan('Setup complete.'));

await setup({ dir });

await cloneTemplates({ dir, frontend, backend, stdio: 'inherit' });

if (installNow) {
  await installDeps({ dir, packageManager, stdio: 'inherit' });
}

console.log(outroMsg);
