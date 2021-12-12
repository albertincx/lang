class Storage {
  _(k, def) {
    return localStorage.getItem(k) || def;
  }

  __(k, v) {
    return localStorage.setItem(k, v);
  }

  rm(k) {
    return localStorage.removeItem(k);
  }

  get(k, def) {
    return this._(k, def);
  }

  set(k, v) {
    return this.__(k, v);
  }

  getJ(k, def = {}) {
    let v = this._(k);
    if (v) {
      try {
        return JSON.parse(v);
      } catch (e) {
      }
    }
    return def;
  }

  setJ(k, v) {
    return this.__(k, JSON.stringify(v));
  }

  clear() {
    const tree0 = this._('tree');
    const tree = this._('treeList8');
    const da = this._('dev_api');
    const pa = this._('foto_api');
    localStorage.clear();
    if (tree) this.__('treeList8', tree);
    if (tree0) this.__('tree', tree0);
    if (da) this.__('dev_api', da);
    if (pa) this.__('foto_api', pa);
  }

  resetFilter(filterName = window.location.pathname) {
    Object.keys(localStorage)
      .filter(i => i.match(`autocomplete_${filterName}`))
      .map(k => this.rm(k));
  }
}

export default new Storage();
