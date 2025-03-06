import { useDispatch } from "react-redux";
import s from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { NoteAPI } from "api/note";
import { deleteNote } from "store/notes/notes-slice";
export function NoteList({ noteList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async (note) => {
    if (!window.confirm("Delete Note?")) {
      return;
    }
    await NoteAPI.deleteById(note.id);

    dispatch(deleteNote(note));
    alert("deleted note successfully");
  };
  return (
    <div className={`row justify-content-center`}>
      {noteList.map((note) => {
        return (
          <div className={s.card_container} key={note.id}>
            <TextCard
              title={note.title}
              subtitle={note.created_at}
              content={note.content}
              onClick={() => navigate(`/note/${note.id}`)}
              onClickTrash={() => handleDelete(note)}
            />
          </div>
        );
      })}
    </div>
  );
}
