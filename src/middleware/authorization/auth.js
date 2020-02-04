import jwt from 'jsonwebtoken';

class Auth {

}

Auth.isValid = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.userData = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error){
    res.status(401)
      .json({
        status: 'error',
        message: 'not authorized',
      });
  }
};

module.exports = Auth;
