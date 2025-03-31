const sessionPersistence = {
  set: (keyName: string, value: Object) => {
    const valueString = JSON.stringify(value);

    sessionStorage.setItem(keyName, valueString);
  },
  get: (keyName: string) => {
    const valueString = sessionStorage.getItem(keyName);

    return valueString ? JSON.parse(valueString) : null;
  },
  setRawString: (keyName: string, rawString: string) => {
    sessionStorage.setItem(keyName, rawString);
  },
  delete: (keyName: string) => {
    sessionStorage.removeItem(keyName);
  },
  deleteAll: () => {
    const keys = Object.keys(sessionStorage);

    keys.forEach((key) => {
      sessionStorage.removeItem(key);
    });
  }
}

const localSessionPersistence = {
  get: (keyName: string) => {
    const valueString = localStorage.getItem(keyName) || '';

    return JSON.parse(valueString);
  },
  set: (keyName: string, value: Object) => {
    const valueString = JSON.stringify(value);

    localStorage.setItem(keyName, valueString);
  },
  deleteAll: () => {
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  },
}

export { localSessionPersistence, sessionPersistence };
