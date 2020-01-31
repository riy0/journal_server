class Entry {
  constructor(id, title, content, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = createdAt;
    this.updated_at = updatedAt;
  }

  get id() {
    return this.id;
  }

  get title() {
    return this.title;
  }

  get content() {
    return this.content;
  }

  get createdAt() {
    return this.created_at;
  }

  get updatedAt() {
    return this.updated_at;
  }

  getEntry() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = Entry;
