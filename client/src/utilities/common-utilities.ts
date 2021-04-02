import store from '../store';

/**
 * Common Utilities for Client
 */
export const loadAccount = (id: string): any => {
  return store.getters.accounts[id];
};
