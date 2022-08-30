import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => props.onDelete(props.title, props.content)}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
