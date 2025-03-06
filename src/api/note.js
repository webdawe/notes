import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "services/firebase";

const BASE_URL = "http://localhost:3200/notes";

export class NoteAPI {
  static async create(note) {
    const response = await addDoc(collection(firebaseApp.db, "notes"), note);
    return {
      id: response.id,
      ...note,
    };
  }

  static async fetchAll() {
    const q = query(
      collection(firebaseApp.db, "notes"),
      orderBy("created_at", "asc")
    );
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }

  static async fetchById(noteId) {}

  static async deleteById(noteId) {
    deleteDoc(doc(firebaseApp.db, "notes", noteId));
  }

  static async updateById(noteId, note) {
    const query = doc(firebaseApp.db, "notes", noteId);
    await updateDoc(query, note);

    return {
      noteId,
      ...note,
    };
  }

  static onShouldSyncNotes(onChange) {
    const q = query(collection(firebaseApp.db, "notes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      console.log("You are not synced with notes collection");
      !isUserPerformingChange && onChange();
    });
    return unsubscribe;
  }
}
