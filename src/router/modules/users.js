import express from 'express';
import validate from 'express-validation';
import UserController from '../../controller/userController';
import Validation from '../../middleware/validation/index';

const router = express.Router();
const user = new UserController();

router.post('/signup', validate(Validation.user.signup), (req, res, next) => {
  user.create(req, res, next);
});

router.post('/login', validate(Validation.User.login), (req, res, next) => {
  user.login(req, res, next);
});

module.exports = router;
