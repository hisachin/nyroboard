/* eslint-disable eqeqeq */
import React from "react";
import {
  BiPencil,
  BiRectangle,
  BiCircle,
  BiMove,
  BiUndo,
  BiRedo,
  BiReset,
} from "react-icons/bi";

import { AiOutlineMinus } from "react-icons/ai";

import "./toolSelection.css";

export default function ToolSelection({
  selectedTool,
  setToolType,
  onUndo,
  onRedo,
  setStrokeColor,
  strokeColor,
  setStrokeLineWidth,
  strokeLineWidth,
  resetBoard,
}) {
  const handleColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  const handleLineWidthChange = (e) => {
    setStrokeLineWidth(e.target.value);
  };

  return (
    <div className="tool-lists-container">
      <div className="tool-lists" id="tool-lists">
        <div
          className={` tool-li tool-li ${
            selectedTool == "pencil" ? "active" : ""
          }`}
        >
          <div
            data-title="Pencil"
            onClick={() => {
              setToolType("pencil");
            }}
          >
            <BiPencil />
          </div>
        </div>
        <div className={` tool-li ${selectedTool == "line" ? "active" : ""}`}>
          <div
            data-title="Line"
            onClick={() => {
              setToolType("line");
            }}
          >
            <AiOutlineMinus />
          </div>
        </div>
        <div
          className={` tool-li ${selectedTool == "rectangle" ? "active" : ""}`}
        >
          <div
            data-title="Rectangle"
            onClick={() => {
              setToolType("rectangle");
            }}
          >
            <BiRectangle />
          </div>
        </div>
        <div className={` tool-li ${selectedTool == "circle" ? "active" : ""}`}>
          <div
            data-title="Circle"
            onClick={() => {
              setToolType("circle");
            }}
          >
            <BiCircle />
          </div>
        </div>
        <div className={` tool-li ${selectedTool == "move" ? "active" : ""}`}>
          <div
            data-title="Move"
            onClick={() => {
              setToolType("move");
            }}
          >
            <BiMove />
          </div>
        </div>
        {/* <div className={` tool-li ${selectedTool == 'erasing' ? 'active' : ''}`}>
                        <div
                            data-title="Erase"
                            onClick={() => {
                                setToolType("erasing");
                            }}
                        >
                            <BiEraser />
                        </div>
                    </div> */}
        <div className={` tool-li active-hover`}>
          <div data-title="Undo" onClick={onUndo}>
            <BiUndo />
          </div>
        </div>
        <div className={` tool-li active-hover`}>
          <div data-title="Redo" onClick={onRedo}>
            <BiRedo />
          </div>
        </div>
        <div className=" tool-li active-hover mt-2">
          <input
            type="color"
            value={strokeColor}
            onChange={handleColorChange}
            data-title="Select color"
          />
        </div>
        <div
          className=" tool-li active-hover mt-2"
          data-title="Select Brush Size"
        >
          <select onChange={handleLineWidthChange}>
            <option value="1" selected>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className=" tool-li active-hover">
          <div data-title="Clear Board" onClick={resetBoard}>
            <BiReset />
          </div>
        </div>
      </div>
    </div>
  );
}
