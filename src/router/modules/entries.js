import express from 'express';
import EntryController from '../../controller/entryController';

const router = express.Router();
const entry = new EntryController();

// get all entries
router.get('/', (req, res) => {
  const result = entry.getAllEntry();
  res.status(200)
    .json({
      status: 'success',
      data: result,
    });
});

// add a new entry
router.post('/', (req, res) => {
  const result = entry.addEntry(req.body.title, req.body.content);
  res.status(200)
    .json({
      status: 'success',
      data: result,
    });
});

// get entry by id
router.get('/:id', (req, res) => {
  // using obj destructring
  const { id, } = req.params;
  const result = entry.findEntry(id);
  res.status(200)
    .json({
      status: 'success',
      data: result,
    });
});

// update entry
router.put('/:id', (req, res) => {
  const { id, } = req.params;
  const { body, } = req;
  const result = entry.updateEntry(id, body);
  res.status(200)
    .json({
      status: 'success',
      data: result,
    });
});
