// CRUD Operations

const crud = {
  getAll(resource) {
    return storage.get(resource);
  },
  
  add(resource, item) {
    const items = this.getAll(resource);
    items.push(item);
    storage.set(resource, items);
    return item;
  },
  
  delete(resource, id) {
    const items = this.getAll(resource);
    const filtered = items.filter(item => item.id !== id);
    storage.set(resource, filtered);
    return true;
  },
  
  clear(resource) {
    storage.clear(resource);
    return true;
  }
};