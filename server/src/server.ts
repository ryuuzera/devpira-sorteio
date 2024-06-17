import chalk from 'chalk';
import app from './app';

const logColorEnv = (env: string) => {
  switch (env) {
    case 'dev':
      return 'cyan';
    case 'prod':
      return 'green';
    case 'test':
      return 'yellow';
  }
  return 'cyan';
};

app.listen(process.env.PORT, () =>
  console.log(
    `Server running on Port ` +
      chalk.bold.blue(process.env.PORT) +
      ` - ` +
      chalk.bold[logColorEnv(process.env.NODE_ENV as string)]`${process.env.NODE_ENV}`
  )
);
