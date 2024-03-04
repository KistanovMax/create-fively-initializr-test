import { type IOType, execSync } from 'node:child_process';

import { Backend, Frontend } from '../types';

interface CloneTemplatesProps {
  dir: string;
  frontend: Frontend;
  backend: Backend;
  stdio: IOType;
};

export async function cloneTemplates({ dir, frontend, backend, stdio = 'pipe', }: CloneTemplatesProps) {
  const gitCloneCommand: { [x: string]: string } = {
    nextJs: 'git clone https://github.com/KistanovMax/fively-initializr-nextjs.git .',
    typeOrm: 'git clone https://github.com/KistanovMax/fively-initializr-express-typeorm.git .',
  };

  const removeGitCommand = 'rm -rf .git';

  execSync(gitCloneCommand[backend], { cwd: `${dir}/backend`, stdio });
  execSync(removeGitCommand, { cwd: `${dir}/backend`, stdio });

  execSync(gitCloneCommand[frontend], { cwd: `${dir}/frontend`, stdio });
  execSync(removeGitCommand, { cwd: `${dir}/frontend`, stdio });
};
