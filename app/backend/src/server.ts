import { App } from './app';

const PORT = process.env.APP_PORT || 3001;

//Start project

new App().start(PORT);
