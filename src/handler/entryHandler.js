/* eslint no-underscore-dangle: 0 */
import Store from '../memory/store';
import Schema from '../model/index';
import util from '../helpers/utils';

class EntryHandler {
  constructor() {
    this.entryStore = new Store.Entry();
    this.entries = [];
    this.entry = {};
  }

  addEntry(title, content) {
    const id = util.generateId();
    const newEntry = new Schema.Entry(id, title, content, Date.now(), Date.now());
    this.entry = this.entryStore.insert(newEntry.getEntry());
    return this.entry;
  }

  getAllEntry() {
    this.entries = this.entryStore.findAll();
    return this.entries;
  }

  findEntry(id) {
    this.entry = this.entryStore.findOne(id);
    return this.entry;
  }

  updateEntry(id, body) {
    const entry = this.entryStore.findOne(id);
    if (entry !== null) {
      const keys = Object.keys(entry);
      const entryUpdate = {};
      keys.forEach((key) => {
        entryUpdate[key] = (body[key] !== undefined) ? body[key] : entry[key];
      });
      // update date
      entryUpdate.updated_at = Date.now();
      this.entry = this.entryStore.update(id, entryUpdate);

      return this.entry;
    }
    return null;
  }
}

module.exports = EntryHandler;
