import { rootState } from "./store";

class LocalStorage {
  _localState: rootState | undefined;

  get localState() {
    return this._localState;
  }

  constructor() {
      const state = localStorage.getItem("store");
      if (state) {
        const json = JSON.parse(state);
        this._localState = json;
      }
    }

  saveLocalStorage(state: any) {
    if (state) {
      const json = JSON.stringify(state);
      localStorage.setItem("store", json);
    }
  }

  removeLocalStorage() {
    localStorage.removeItem("store")
  }
}

const instance = new LocalStorage()
export default instance