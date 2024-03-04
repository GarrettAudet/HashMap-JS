class HashMap {
    constructor() {
      this.size = 1000; // Size of the hashmap
      this.map = new Array(this.size);
    }
  
    hash(key) {
        let hashCode = 0;
       
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    }
  
    put(key, value) {
      const keyHash = this._getHash(key);
      const keyValue = [key, value];
  
      if (!this.map[keyHash]) {
        this.map[keyHash] = [keyValue];
      } else {
        let inserted = false;
        for (let i = 0; i < this.map[keyHash].length; i++) {
          if (this.map[keyHash][i][0] === key) {
            this.map[keyHash][i][1] = value;
            inserted = true;
          }
        }
        if (!inserted) {
          this.map[keyHash].push(keyValue);
        }
      }
    }
  
    get(key) {
      const keyHash = this._getHash(key);
      if (this.map[keyHash]) {
        for (let i = 0; i < this.map[keyHash].length; i++) {
          if (this.map[keyHash][i][0] === key) {
            return this.map[keyHash][i][1];
          }
        }
      }
      return null;
    }
  
    remove(key) {
      const keyHash = this._getHash(key);
      if (this.map[keyHash]) {
        for (let i = 0; i < this.map[keyHash].length; i++) {
          if (this.map[keyHash][i][0] === key) {
            this.map[keyHash].splice(i, 1);
            return true;
          }
        }
      }
      return false;
    }
}