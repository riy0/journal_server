import Joi from 'joi';

class Entry {

}

Entry.create = {
  body: {
    title: Joi.string().required(),
    content: Joi.string().required(),
  },
};

Entry.getById = {
  params: {
    id: Joi.string().max(16).required(),
  },
};

Entry.update = {
  params: {
    id: Joi.string().max(16).required(),
  },
  body: {
    title: Joi.string().required(),
    content: Joi.string().required(),
  },
};

module.exports = Entry;
