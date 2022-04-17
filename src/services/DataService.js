import { initialData } from "./initialData";

export class ItemData {
  static async getNotes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(initialData);
      }, 3000);
    });
  }

  static async editNote(id, headerText, text, itemColor) {
    const result = { id, headerText, text, itemColor };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result);
      }, 3000);
    });
  }

  static async deleteNote(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(id);
      }, 3000);
    });
  }

  static async addNote(headerText, text, itemColor) {
    const result = { headerText, text, itemColor };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result);
      }, 3000);
    });
  }
}
