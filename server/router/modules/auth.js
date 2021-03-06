import express from 'express';
import validate from 'express-validation';
import AuthController from '../../controller/authController';
import Validation from '../../middleware/validation';

const router = express.Router();
const auth = new AuthController();

router.post('/signup', validate(Validation.Auth.signup), (req, res, next) => {
  auth.create(req, res, next);
});

router.post('/login', validate(Validation.Auth.login), (req, res, next) => {
  auth.login(req, res, next);
});

module.exports = router;
