class HashMap {
  constructor() {
      this.size = 1000; // Initial size of the hashmap
      this.count = 0; // Keep track of the number of entries
      this.loadFactor = 0.75; // Threshold to resize
      this.map = new Array(this.size);
  }

  hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
      }
      return hashCode;
  }

  _getHash(key) {
      return this.hash(key);
  }

  _resize() {
      const newSize = this.size * 2;
      const newMap = new Array(newSize);
      for (let i = 0; i < this.size; i++) {
          if (this.map[i]) {
              for (let j = 0; j < this.map[i].length; j++) {
                  const [key, value] = this.map[i][j];
                  const index = this.hash(key) % newSize;
                  if (!newMap[index]) {
                      newMap[index] = [[key, value]];
                  } else {
                      newMap[index].push([key, value]);
                  }
              }
          }
      }
      this.size = newSize;
      this.map = newMap;
  }

  set(key, value) {
      if (this.count / this.size >= this.loadFactor) {
          this._resize();
      }

      const keyHash = this._getHash(key);
      if (!this.map[keyHash]) {
          this.map[keyHash] = [];
      }

      let found = false;
      for (let i = 0; i < this.map[keyHash].length; i++) {
          if (this.map[keyHash][i][0] === key) {
              this.map[keyHash][i][1] = value;
              found = true;
              break;
          }
      }
      if (!found) {
          this.map[keyHash].push([key, value]);
          this.count++;
      }
  }

  get(key) {
      const keyHash = this._getHash(key);
      const bucket = this.map[keyHash];
      if (bucket) {
          for (let i = 0; i < bucket.length; i++) {
              if (bucket[i][0] === key) {
                  return bucket[i][1];
              }
          }
      }
      return null;
  }

  has(key) {
      return this.get(key) !== null;
  }

  remove(key) {
      const keyHash = this._getHash(key);
      const bucket = this.map[keyHash];
      if (bucket) {
          for (let i = 0; i < bucket.length; i++) {
              if (bucket[i][0] === key) {
                  bucket.splice(i, 1);
                  this.count--;
                  return true;
              }
          }
      }
      return false;
  }

  length() {
      return this.count;
  }

  clear() {
      this.size = 1000;
      this.count = 0;
      this.map = new Array(this.size);
  }

  keys() {
      const keys = [];
      for (let bucket of this.map) {
          if (bucket) {
              for (let [key] of bucket) {
                  keys.push(key);
              }
          }
      }
      return keys;
  }

  values() {
      const values = [];
      for (let bucket of this.map) {
          if (bucket) {
              for (let [, value] of bucket) {
                  values.push(value);
              }
          }
      }
      return values;
  }

  entries() {
      const entries = [];
      for (let bucket of this.map) {
          if (bucket) {
              for (let entry of bucket) {
                  entries.push(entry);
              }
          }
      }
      return entries;
  }
}

// HashSet class
class HashSet {
  constructor() {
      this.map = new HashMap(); // Leverage the existing HashMap implementation
  }

  add(key) {
      this.map.set(key, true); // Value is irrelevant; true is just a placeholder
  }

  remove(key) {
      return this.map.remove(key);
  }

  has(key) {
      return this.map.has(key);
  }

  clear() {
      this.map.clear();
  }

  length() {
      return this.map.length();
  }

  values() {
      return this.map.keys(); // Only keys are relevant for a set
  }
}
