import { NoteAPI } from "api/note-api";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setNoteList } from "store/notes/notes-slice";
import s from "style.module.css";
export function App() {
  const dispatch = useDispatch();
  async function fetchAllNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
    console.log(noteList);
  }

  useEffect(() => {
    fetchAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <div className={s.workspace}>
        <Outlet />
      </div>
    </div>
  );
}
