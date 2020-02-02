class Entry {
  constructor() {
    this.entries = {};
  }

  insert(entry) {
    this.entries[entry.id] = entry;
    return this.entries[entry.id];
  }

  findOne(id) {
    if (Object.prototype.hasOwnProperty.call(this.entries, id)) {
      return this.entries[id];
    }
    return null;
  }

  findAll() {
    return Object.values(this.entries);
  }

  update(id, entry) {
    this.entries[id] = entry;
    return this.entries[id];
  }

  delete(id) {
    delete this.entries[id];
    return this.entries[id];
  }
}

module.exports = Entry;
