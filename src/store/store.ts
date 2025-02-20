import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import allReducers from "./reducers"
import localSorage from "./localStorage";


export type rootState = {
  [key in keyof typeof allReducers]: ReturnType<typeof allReducers[key]>;
};

class StoreServiceProvider {
  static _instance: StoreServiceProvider | null = null;
  _storeConfig!: EnhancedStore<rootState>

  get storeConfig() {
    return this._storeConfig;
  }

  constructor(reducers: typeof allReducers) {
    if (!StoreServiceProvider._instance) {
      this._storeConfig = configureStore({
        reducer: reducers
      });
      StoreServiceProvider._instance = this;
    }
    return StoreServiceProvider._instance;
  }
}

const instance = new StoreServiceProvider(allReducers);

const store = instance.storeConfig;
store.subscribe(() => {
  console.log(store, store.getState(), 'store.getState()store.getState()')
  localSorage.saveLocalStorage(store.getState())});

export default store;
