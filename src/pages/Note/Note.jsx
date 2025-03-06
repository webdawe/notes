import { NoteAPI } from "api/note";
import { NoteForm } from "components/NoteForm/NoteForm";
import { withAuthRequired } from "hoc/withAuthRequired";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, updateNote } from "store/notes/notes-slice";
import { toast } from "utils/sweet-alert";

export function Note() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let note = useSelector((store) =>
    store.notesSlice.noteList.find((note) => note.id === noteId)
  );
  const handleSubmit = async (formValues) => {
    const updatedNote = await NoteAPI.updateById(note.id, formValues);
    console.log(updatedNote);
    dispatch(updateNote(updatedNote));
    note = updatedNote;
    setIsEditable(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete Note?")) {
      return;
    }
    await NoteAPI.deleteById(note.id);

    dispatch(deleteNote(note));
    await toast("success", "deleted note successfully");
    navigate("/");
  };

  const [isEditable, setIsEditable] = useState(false);
  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={note.title}
          note={note}
          onClickEdit={() => setIsEditable(!isEditable)}
          onClickDelete={handleDelete}
          onSubmit={isEditable && handleSubmit}
        />
      )}
    </>
  );
}

export const ProtectiveNote = withAuthRequired(Note);
