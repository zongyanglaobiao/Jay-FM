/**
 * 针对window api的封装
 */
const localStorage = window.localStorage;

export function getLocalStorage() {
	return localStorage;
}

export function localStoragePut(key, value) {
	localStorage.setItem(key, value);
}

export  function localStorageGet(key) {
	return localStorage.getItem(key);
}


