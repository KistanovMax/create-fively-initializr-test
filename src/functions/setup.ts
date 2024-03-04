import fs from 'fs-extra';

interface SetupProps {
  dir: string;
};

export async function setup({ dir }: SetupProps) {
  await fs.emptyDir(`${dir}/backend`);
  await fs.emptyDir(`${dir}/frontend`);
};
