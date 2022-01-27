import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import all components
import Home from "./pages/Home/Home";
import Header from "./components/header/header";
import Board from "./components/board/board";
import BoardList from "./components/boardList/boardList";
import NotFound from "./components/notFound/notFound";

//import Provider
import LoginProvider from "./contexts/loginContexts/store";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="container-fluid">
          <LoginProvider>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/board/new" element={<Board />}></Route>
              <Route path="/board/list" element={<BoardList />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </LoginProvider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
