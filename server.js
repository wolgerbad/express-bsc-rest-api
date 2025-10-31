import express from 'express';
import router from './users.js';
import errorHandler from './errorHandler.js';

const app = express();

// json parser
app.use(express.json());

// form encoded values parser
app.use(express.urlencoded());

//router middleware
app.use('/api/users', router);

//error middleware
app.use(errorHandler);

app.listen('8000', () => console.log('listening for changes on port 8000'));
