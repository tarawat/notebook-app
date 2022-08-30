import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";

function Header() {
  const user = useSelector(selectUser);
  return (
    <header>
      <div className="left_div">
        <h1>NoteBook</h1>
      </div>
      <div className="right_div">
        <p>{user.displayName}</p>
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={() => auth.signOut()}
          src={user.photo}
        />
      </div>
    </header>
  );
}

export default Header;
