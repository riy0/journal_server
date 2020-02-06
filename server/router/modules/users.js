import express from 'express';
import validate from 'express-validation';
import UserController from '../../controller/userController';
import Validation from '../../middleware/validation/index';
import auth from '../../middleware/authorization/auth';

const router = express.Router();
const user = new UserController();

router.post('/signup', validate(Validation.user.signup), (req, res, next) => {
  user.create(req, res, next);
});

router.post('/login', validate(Validation.User.login), (req, res, next) => {
  user.login(req, res, next);
});

router.post('/updateuser', [auth.isValid, validate(Validation.User.update)], (req, res, next) => {
  user.update(req, res, next);
});

module.exports = router;
