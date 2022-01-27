import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";
import {
  FaBars,
  FaDownload,
  FaEnvelope,
  FaList,
  FaPlus,
  FaSave,
  FaUsers,
} from "react-icons/fa";

import "./headerStyle.css";

import Login from "../login/login";
import Sidebar from "../sidebar/sidebar";
import InlineEdit from "../inlineEdit/inlineEdit";

import { LoginContext } from "../../contexts/loginContexts/store";

const downloadImage = (data, filename = "my-canvas.png") => {
  var a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
};

export default function Header() {
  const urlLocation = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [state, dispatch] = useContext(LoginContext);

  useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    console.log("user", user);
    console.log("token", token);
    if (user && token) {
      dispatch({ type: "UPDATE_LOGIN_FLAG", payload: !state.isLoggedIn });
      dispatch({ type: "SET_USER", payload: { user, token } });
    }
  }, []);

  const handleDownload = () => {
    if (!state.isLoggedIn) {
      dispatch({
        type: "TOGGLE_LOGIN_BOX",
        payload: !state.isLoggedIn,
      });

      return;
    }

    const canvas = document.getElementById("canvas");
    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    downloadImage(image, "my-canvas.png");
  };

  const handleSaveBoard = () => {
    if (!state.isLoggedIn) {
      dispatch({
        type: "TOGGLE_LOGIN_BOX",
        payload: !state.isLoggedIn,
      });

      return;
    }

    const canvas = document.getElementById("canvas");

    console.log("board saved");
  };

  return (
    <div className="header">
      <div className="row">
        <div className="d-flex flex-column flex-md-row">
          <div className="col-4 d-flex align-item-center p-2 bd-highlight">
            <div className="p-2 menu-list">
              <div
                className="sidebar-btn"
                id="sidebar-btn"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <FaBars />
              </div>
              {showSidebar && (
                <Sidebar
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />
              )}
            </div>
            <div className="p-2">
              <div className="board-data-title" id="board-data-title">
                {urlLocation.pathname !== "/board/new" && (
                  <Link to="/">
                    <h2>NyroBoard</h2>
                  </Link>
                )}
                {urlLocation.pathname === "/board/new" && (
                  <InlineEdit
                    text={boardName}
                    onSetText={(text) => setBoardName(text)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-8 d-flex align-item-center justify-content-md-end p-2 bd-highlight misc-link-list">
            <div
              id="create-new-board"
              className="d-inline p-2 tool-li"
              data-title="Create New Board"
            >
              <Link to="/board/new" target="_blank">
                <FaPlus />
              </Link>
            </div>
            {urlLocation.pathname === "/board/new" && (
              <div
                id="save-current-board"
                className="d-inline p-2 tool-li"
                data-title="Save Board"
                onClick={handleSaveBoard}
              >
                <FaSave />
              </div>
            )}
            {urlLocation.pathname === "/board/new" && (
              <>
                <div
                  id="download-board-image"
                  className="d-inline p-2 tool-li"
                  data-title="Download as Image"
                  onClick={handleDownload}
                >
                  <FaDownload />
                </div>
                <div
                  id="invite-people"
                  className="d-inline p-2 tool-li"
                  data-title="Invite People"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_LOGIN_BOX",
                      payload: !state.isLoggedIn,
                    })
                  }
                >
                  <FaUsers />
                </div>
              </>
            )}
            {urlLocation.pathname === "/board/new" && state.isLoggedIn && (
              <div className="d-inline p-2 tool-li" data-title="Board Lists">
                <Link to="board/list">
                  <FaList />
                </Link>
              </div>
            )}
            <div
              id="get-help"
              className="d-inline p-2 tool-li"
              data-title="Get Help"
            >
              <BiHelpCircle />
            </div>
            <div className="d-inline p-2 tool-li" data-title="Give Feedback">
              <FaEnvelope />
            </div>
          </div>
        </div>
      </div>
      <div className="login-container">{state.showLoginBox && <Login />}</div>
    </div>
  );
}
