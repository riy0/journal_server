import EntryHandler from '../handler/entryHandler';

class EntryController {
  constructor() {
    this.entry = new EntryHandler();
  }

  create(req, res) {
    const result = this.entry.addEntry(req.body.title, req.body.content);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  }

  getById(req, res) {
    const { id, } = req.params;
    const result = this.entry.findEntry(id);
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }

  getAll(req, res) {
    const result = this.entry.getAllEntry();
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }

  update(req, res) {
    const { id, } = req.params;
    const { body, } = req;
    const result = this.entry.updateEntry(id, body);
    if (result !== null) {
      res.status(200)
        .json({
          status: 'success',
          data: result,
        });
    } else {
      res.status(404)
        .json({
          status: 'error',
          message: 'Oops entry not found',
          errors: [
            'entry with id doesn\'t exist',
          ],
        });
    }
  }
}

module.exports = EntryController;
