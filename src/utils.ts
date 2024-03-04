import gradient from 'gradient-string';

export const textColors = {
  fivelyInitializr: ['#fdba74', '#e4a5a2', '#c288de', '#b27bf9'],
  express: ['#c586c0', '#c586c0'],
  typeOrm: ['#569cd6', '#569cd6'],
  prismaOrm: ['#dcdcaa', '#dcdcaa'],
};

export const hints = {
  express: gradient(textColors.express)('Express JS'),
  typeOrm: gradient(textColors.typeOrm)('Type ORM'),
  prismaOrm: gradient(textColors.prismaOrm)('Prisma ORM'),
};

export const fivelyInitializr = gradient(textColors.fivelyInitializr)('Fively Initializr');
export const outroMsg = `${gradient(textColors.fivelyInitializr)('Thank you for choosing Fively Initializr!')}`;
