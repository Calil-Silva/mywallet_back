import dotenv from 'dotenv';

const envPath = (environment) => {
  const config = {
    prod: '.env',
    dev: '.env.dev',
    test: '.env.test',
  };
  return config[environment];
};

dotenv.config({
  path: envPath(process.env.NODE_ENV),
});
