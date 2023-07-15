class Storage {
  rm(k) {
    return localStorage.removeItem(k);
  }

  get(k, def) {
    return localStorage.getItem(k) || def;
  }

  set(k, v) {
    localStorage.setItem(k, v);
  }

  getJ(k) {
    const v = this.get(k);
    if (v) {
      try {
        return JSON.parse(v);
      } catch (e) {
        //
      }
    }
    return false;
  }

  setJ(k, v) {
    return this.set(k, JSON.stringify(v));
  }
}

export default new Storage();
