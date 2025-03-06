import axios from "axios";

const BASE_URL = "http://localhost:3200/notes";

export class NoteAPI {
  static async create(note) {
    const response = await axios.post(`${BASE_URL}`, note);
    return this.formatId(response.data);
  }

  static async fetchAll() {
    const response = await axios.get(`${BASE_URL}`);
    return response.data.map(this.formatId);
  }

  static async fetchById(noteId) {
    return await axios.get(`${BASE_URL}/${noteId}`).data;
  }

  static async deleteById(noteId) {
    return await axios.delete(`${BASE_URL}/${noteId}`).data;
  }

  static async updateById(noteId, note) {
    const response = await axios.patch(`${BASE_URL}/${noteId}`, note);
    return this.formatId(response.data);
  }
  static formatId(note) {
    return {
      ...note,
      id: note.id.toString(),
    };
  }
}
