import dotenv from 'dotenv';

const envFile = (environment) => {
  const connections = {
    prod: '.env',
    test: '.env.test',
    cloud: '.env.heroku',
  };

  return connections[environment] || connections['test'];
};

dotenv.config({
  path: envFile(process.env.NODE_ENV),
});
