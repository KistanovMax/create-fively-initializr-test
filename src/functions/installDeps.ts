import { type IOType, execSync } from 'node:child_process';

import type { PackageManager } from '../types';

interface InstallDepsProps {
  dir: string;
  packageManager: PackageManager;
  stdio: IOType;
}

export function installDeps({
  packageManager,
  dir,
  stdio = 'pipe',
}: InstallDepsProps) {
  const depsCommand = `${packageManager} install`;

  execSync(depsCommand, { cwd: `${dir}/backend`, stdio });
  execSync(depsCommand, { cwd: `${dir}/frontend`, stdio });
}
