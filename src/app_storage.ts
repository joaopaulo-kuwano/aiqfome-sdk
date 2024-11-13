import { LocalStorage } from 'node-localstorage'

let storage: Storage

if (typeof window !== "undefined" && window.localStorage) {
  // Running in the browser, use localStorage
  storage = window.localStorage;
} else {
  // Running in Node.js, use a Node-based localStorage alternative
  storage = new LocalStorage('./scratch');
}

export class AppStorage {
  static setItem(key: string, value: string): void {
    storage.setItem(key, value)
  }

  static getItem(key: string): string {
    return storage.getItem(key) || ''
  }
}
