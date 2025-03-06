import { useState } from "react";
import s from "./style.module.css";
import { Trash } from "react-bootstrap-icons";
export function TextCard({ title, subtitle, content, onClick, onClickTrash }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTrashHovered, setIsTrahsHovered] = useState(false);
  function handleOnClickTrash(e) {
    onClickTrash();
    e.stopPropagation();
  }
  return (
    <div
      className={`card ${s.container}`}
      onClick={() => {
        onClick();
      }}
      style={{ borderColor: isCardHovered ? "#096efd" : "transparent" }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div className="card-body">
        <div className={s.title_row}>
          <h5 className="card-title">{title}</h5>
          <Trash
            size={20}
            onMouseEnter={() => setIsTrahsHovered(true)}
            onMouseLeave={() => setIsTrahsHovered(false)}
            onClick={handleOnClickTrash}
            style={{ color: isTrashHovered ? "#FF7373" : "#b8b8b8" }}
          />
        </div>
        <h6 className={`card-subtitle mb-2 text-muted`}> {subtitle}</h6>
        <p className={`card-text ${s.text_content}`}>{content}</p>
      </div>
    </div>
  );
}
