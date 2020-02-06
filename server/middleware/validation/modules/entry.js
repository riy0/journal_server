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
    id: Joi.number().required(),
  },
};

Entry.update = {
  params: {
    id: Joi.number().required(),
  },
  body: {
    title: Joi.string().required(),
    content: Joi.string().required(),
  },
};

Entry.delete = {
  params: {
    id: Joi.number().required(),
  },
};

module.exports = Entry;
