import './setup.js';
import app from './app.js';

let envPort;
const nodeEnv = process.env.NODE_ENV;
const isRunningLocally = nodeEnv === 'test' || nodeEnv === 'prod';
const isRunningOnCloud = nodeEnv === 'cloud';

if (isRunningLocally) {
  envPort = 4000;
}

if (isRunningOnCloud) {
  envPort = process.env.PORT;
}

app.listen(envPort);
