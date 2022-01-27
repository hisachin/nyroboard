import "./sidebar.css";

import React from "react";
import { useContext } from "react";
import {
  FaAngleLeft,
  FaUser,
  FaPlus,
  FaList,
  FaUsers,
  FaCog,
  FaHome,
  FaPowerOff,
} from "react-icons/fa";

//import context
import { LoginContext } from "../../contexts/loginContexts/store";
import { Link } from "react-router-dom";

import { Logout } from "../../services/auth";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [state, dispatch] = useContext(LoginContext);

  const handleLogout = () => {
    Logout();
    //dispatch new state
    dispatch({ type: "UPDATE_LOGIN_FLAG", payload: !state.isLoggedIn });
    dispatch({ type: "TOGGLE_LOGIN_BOX", payload: !state.showLoginBox });
    dispatch({ type: "SET_USER", payload: { user: null, token: null } });
  };

  return (
    <div className={`sidebar ${showSidebar ? "show" : ""}`}>
      <div className="sidebar-header">
        <div class="d-flex flex-row">
          <div class="p-2">
            <h2>NyroBoard</h2>
          </div>
          <div class="p-2" onClick={() => setShowSidebar(!showSidebar)}>
            <FaAngleLeft />
          </div>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul class="list-group">
          <li>
            <Link to="/" onClick={() => setShowSidebar(!showSidebar)}>
              <div className="d-flex">
                <div className="p-2">
                  <FaHome />
                </div>
                <div className="p-2">Home</div>
              </div>
            </Link>
          </li>
          {!state.isLoggedIn && (
            <li>
              <div className="d-flex hover-clr">
                <div className="p-2">
                  <FaUser />
                </div>
                <div
                  className="p-2"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_LOGIN_BOX",
                      payload: !state.showLoginBox,
                    })
                  }
                >
                  Login/Signup
                </div>
              </div>
            </li>
          )}
          <li>
            <Link
              to="/board/new"
              target="_blank"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <div className="d-flex">
                <div className="p-2">
                  <FaPlus />
                </div>
                <div className="p-2">Create New Board</div>
              </div>
            </Link>
          </li>
          {state.isLoggedIn && (
            <li>
              <Link to="board/list">
                <div className="d-flex">
                  <div className="p-2">
                    <FaList />
                  </div>
                  <div className="p-2">My Board</div>
                </div>
              </Link>
            </li>
          )}
          <li>
            <div className="d-flex">
              <div className="p-2">
                <FaUsers />
              </div>
              <div className="p-2">Invite People</div>
            </div>
          </li>
          <li>
            <div className="d-flex">
              <div className="p-2">
                <FaCog />
              </div>
              <div className="p-2">Settings</div>
            </div>
          </li>
          {state.isLoggedIn && (
            <li>
              <div className="d-flex hover-clr">
                <div className="p-2">
                  <FaPowerOff />
                </div>
                <div className="p-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
