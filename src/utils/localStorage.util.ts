/**
 * Retrieves a value from localStorage by key.
 * Returns null if the item is not found or if the environment doesn't support localStorage.
 * 
 * @param {string} key - The key used to retrieve the value from localStorage.
 * @returns {string | null} The value associated with the key, or null if not found.
 */
export const getFromLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

/**
 * Sets a value in localStorage with the specified key.
 * 
 * @param {string} key - The key used to store the value in localStorage.
 * @param {string} value - The value to be stored in localStorage.
 * @returns {void}
 */
export const setToLocalStorage = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

/**
 * Removes an item from localStorage by key.
 * 
 * @param {string} key - The key of the item to be removed from localStorage.
 * @returns {void}
 */
export const removeFromLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
