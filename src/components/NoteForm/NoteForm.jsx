import { PencilFill, TrashFill } from "react-bootstrap-icons";
import s from "./style.module.css";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useState } from "react";
import { ValidatorService } from "services/validator";
import { FieldError } from "components/FieldError/FieldError";

export function NoteForm({
  isEditable = true,
  note,
  title,
  onClickEdit,
  onClickDelete,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });
  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : true,
    content: note?.content ? undefined : true,
  });
  const VALIDATOR = {
    title: (value) => {
      return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
    },
    content: (value) => {
      return ValidatorService.min(value, 3);
    },
  };

  const validate = (fieldName, fieldValue) => {
    console.log(VALIDATOR[fieldName](fieldValue));
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  };
  function updateFormValues(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    validate(name, value);
  }
  const hasError = () => {
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        return true;
      }
    }
    return false;
  };
  const actionIcons = (
    <>
      <div className="col-1">
        {onClickEdit && <PencilFill className={s.icon} onClick={onClickEdit} />}
      </div>
      <div className="col-1">
        {onClickDelete && (
          <TrashFill className={s.icon} onClick={onClickDelete} />
        )}
      </div>
    </>
  );

  const titleInput = (
    <div className="mb-5">
      <label htmlFor="title" className="form-label">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="form-control"
        onChange={updateFormValues}
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );

  const contentInput = (
    <div className="mb-5">
      <label htmlFor="title" className="form-label">
        Content
      </label>
      <textarea
        type="text"
        name="content"
        className="form-control"
        rows={5}
        onChange={updateFormValues}
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );

  const submitButton = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        OnClick={() => {
          onSubmit(formValues);
        }}
        isDisabled={hasError()}
      >
        Submit
      </ButtonPrimary>
    </div>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{!isEditable ? title : "Edit Note"}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>
        {isEditable && titleInput}
      </div>
      <div className={`mb-3 ${s.content_container}`}>
        {isEditable ? contentInput : <p>{note.content}</p>}
      </div>
      {onSubmit && submitButton}
    </div>
  );
}
