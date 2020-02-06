import bodyParser from 'body-parser';
import express from 'express';
import expressValidation from 'express-validation';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import router from './router/index';

const app = express();

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With, X-Access-Token, X-Key, Authorization');
  if (req.method === 'OPTIONS'){
    res.status(200).end();
  } else {
    next();
  }
});

// to trim body values posted
app.use((req, res, next) => {
  const keys = Object.keys(req.body);
  keys.forEach((val) => {
    req.body[val] = req.body[val].trim();
  });
  next();
});

app.use('/api/v1/entries', router.entries);
app.use('/api/v1/auth', router.users);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error instanceof expressValidation.ValidationError) {
    const messages = error.errors.reduce((msg, obj) => {
      msg.push(obj.messages[0]);
      return msg;
    }, []);

    res.status(error.status)
      .json({
        status: 'error',
        message: error.statusText,
        errors: messages,
      });
  } else {
    res.status(error.status || 500);
    res.json({
      status: 'error',
      message: error.message || 'An error occured',
    });
  }
  next();
});

if (!module.parent) {
  app.listen(port, () => {
    // console.log(`Listening on port ${port}`);
  });
}

module.exports = app;
