import express from 'express';
import EntryController from '../../controller/entryController';

const router = express.Router();
const entry = new EntryController();

// get all entries
router.get('/', (req, res) => {
  entry.getAll(req, res);
});

// add a new entry
router.post('/', (req, res) => {
  entry.create(req, res);
});

// get entry by id
router.get('/:id', (req, res) => {
  // using obj destructring
  entry.create(req, res);
});

// update entry
router.put('/:id', (req, res) => {
  entry.getById(req, res);
});

router.put('/:id', (req, res) => {
  entry.update(req, res);
});
