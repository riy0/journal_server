import express from 'express';
import validate from 'express-validation';
import EntryController from '../../controller/entryController';
import Validation from '../../middleware/validation/index';
import auth from '../../middleware/authorization/auth';

const router = express.Router();
const entry = new EntryController();

// get all entries
router.get('/', auth.isvalid, (req, res) => {
  entry.getAll(req, res);
});

// add a new entry
router.post('/', [auth.isValid, validate(Validation.Entry.create)], (req, res) => {
  entry.create(req, res);
});

// get entry by id
router.get('/:id', [auth.isValid, validate(Validation.Entry.getById)], (req, res) => {
  entry.create(req, res);
});

// update entry
router.put('/:id', [auth.isValid, validate(Validation.Entry.update)], (req, res) => {
  entry.getById(req, res);
});

// delete entry
router.delete('/:id', [auth.isValid, validate(Validation.Entry.delete)], (req, res) => {
  entry.delete(req, res);
});

module.exports = router;
