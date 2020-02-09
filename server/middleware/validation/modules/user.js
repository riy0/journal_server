import Joi from 'joi';

class User { }

User.update = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    fav_quote: Joi.string(),
  },
};

module.exports = User;
