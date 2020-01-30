import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(bodyParser);

app.use(morgan('dev'));

app.listen(process.env.PORT || 300, () => {
  console.log(`port ${this.address().port}`);
});
