import React, { useState, useEffect, useContext, useReducer } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import rough from "roughjs/bundled/rough.esm";

//import component
import ToolSelection from "../toolSelection/toolSelection";

//import context
import { LoginContext } from "../../contexts/loginContexts/store";
import TourReducer from "../../contexts/tourContexts/tourReducers";

//import utills
import {
  midPointBtw,
  getElementAtPosition,
  adjustElementCoordinates,
  cursorForPosition,
  resizedCoordinates,
  useHistory,
  createElement,
} from "../../utills/boardUtills";

import { downloadImage } from "../../utills/globalUtills";

import { tourSteps } from "../../utills/productTourUtills";

import "./boardStyle.css";

const Board = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [path, setPath] = useState([]);
  const [action, setAction] = useState("none");
  const [toolType, setToolType] = useState("pencil");
  const [selectedElement, setSelectedElement] = useState(null);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeLineWidth, setStrokeLineWidth] = useState(1);
  const [boardName, setBoardName] = useState("untitled board");
  const [popped, setPopped] = useState(false);
  const [state, dispatch] = useContext(LoginContext);

  const INITIAL_STATE = {
    key: new Date(), // This field makes the tour to re-render when we restart the tour
    run: false,
    continuous: true, // Show next button
    loading: false,
    stepIndex: 0, // Make the component controlled
    steps: tourSteps,
  };

  const [tourState, tourDispatch] = useReducer(TourReducer, INITIAL_STATE);

  useEffect(() => {
    // Auto start the tour if the tour is not viewed before
    if (!localStorage.getItem("tour")) {
      tourDispatch({ type: "START" });
    }

    console.log(document.getElementsByClassName("header"));
  }, []);

  // Set once tour is viewed, skipped or closed
  const setTourViewed = () => {
    localStorage.setItem("tour", "1");
  };

  const callback = (data) => {
    const { action, index, type, status } = data;

    if (
      // If close button clicked, then close the tour
      action === ACTIONS.CLOSE ||
      // If skipped or end tour, then close the tour
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      setTourViewed();
      tourDispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Check whether next or back button click and update the step.
      tourDispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  const resetBoard = () => {
    setElements([]);
    setPoints([]);
    setSelectedElement(null);
    setPath([]);
  };

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.save();

    const drawpath = () => {
      path.forEach((stroke, index) => {
        context.beginPath();

        stroke.forEach((point, i) => {
          context.strokeStyle = point.newColour;
          context.lineWidth = point.newLinewidth;

          var midPoint = midPointBtw(point.clientX, point.clientY);

          context.quadraticCurveTo(
            point.clientX,
            point.clientY,
            midPoint.x,
            midPoint.y
          );
          context.lineTo(point.clientX, point.clientY);
          context.stroke();
        });
        context.closePath();
        context.save();
      });
    };

    if (toolType === "eraser" && popped === true) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setPopped(false);
    }

    const roughCanvas = rough.canvas(canvas);

    if (path !== undefined) drawpath();

    context.lineWidth = strokeLineWidth;

    elements.forEach(({ roughEle }) => {
      context.globalAlpha = "1";
      context.strokeStyle = roughEle.options.stroke;
      roughCanvas.draw(roughEle);
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [popped, elements, path]);

  useEffect(() => {
    const undoRedoFunction = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  const checkPresent = (clientX, clientY) => {
    if (path === undefined) return;
    var newPath = path;
    path.forEach((stroke, index) => {
      stroke.forEach((point, i) => {
        if (
          clientY < point.clientY + 10 &&
          clientY > point.clientY - 10 &&
          clientX < point.clientX + 10 &&
          clientX > point.clientX - 10
        ) {
          console.log("Popped path");
          newPath.splice(index, 1);
          setPopped(true);
          setPath(newPath);
          return;
        }
      });
    });
    const newElements = elements;
    newElements.forEach((ele, index) => {
      if (
        clientX >= ele.x1 &&
        clientX <= ele.x2 &&
        clientY >= ele.y1 &&
        clientY <= ele.y2
      ) {
        console.log("Popped elements");
        newElements.splice(index, 1);
        setPopped(true);
        setElements(newElements);
      }
    });
  };

  const updateElement = (
    index,
    x1,
    y1,
    x2,
    y2,
    toolType,
    strokeWidth,
    strokeColor
  ) => {
    if (toolType) {
      const elementsCopy = [...elements];
      switch (toolType) {
        case "line":
        case "rectangle":
        case "circle":
          elementsCopy[index] = createElement(
            index,
            x1,
            y1,
            x2,
            y2,
            toolType,
            strokeWidth,
            strokeColor
          );
          break;
        case "pencil":
          elementsCopy[index].points = [
            ...elementsCopy[index].points,
            { x: x2, y: y2 },
          ];
          break;
        default:
          throw new Error(`Type not recognised: ${toolType}`);
      }

      setElements(elementsCopy, true);
    }
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;

    if (toolType == "move") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        if (element.toolType === "pencil") {
          const xOffsets = element.points.map((point) => clientX - point.x);
          const yOffsets = element.points.map((point) => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements((prevState) => prevState);

        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else if (toolType === "eraser") {
      setAction("erasing");

      checkPresent(clientX, clientY);
    } else {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");

      const id = elements.length;
      if (toolType === "pencil") {
        setAction("sketching");
        setIsDrawing(true);

        const transparency = "1.0";
        const newColour = strokeColor;
        const newLinewidth = strokeLineWidth;
        const newEle = {
          clientX,
          clientY,
          newColour,
          newLinewidth,
          transparency,
        };
        setPoints((state) => [...state, newEle]);
        context.strokeStyle = newColour;
        context.lineWidth = newLinewidth;
        context.lineCap = 5;
        context.moveTo(clientX, clientY);
        context.beginPath();
      } else {
        setAction("drawing");
        const newColour = strokeColor;
        const newWidth = strokeLineWidth;
        const element = createElement(
          id,
          clientX,
          clientY,
          clientX,
          clientY,
          toolType,
          newWidth,
          newColour
        );

        setElements((prevState) => [...prevState, element]);
        setSelectedElement(element);
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const { clientX, clientY } = e;

    if (toolType === "move") {
      const element = getElementAtPosition(clientX, clientY, elements);
      e.target.style.cursor = element
        ? cursorForPosition(element.position)
        : "default";
    }

    if (action === "erasing") {
      checkPresent(clientX, clientY);
    }

    if (action === "sketching") {
      if (!isDrawing) return;
      const colour = points[points.length - 1].newColour;
      const linewidth = points[points.length - 1].newLinewidth;
      const transparency = points[points.length - 1].transparency;
      const newEle = { clientX, clientY, colour, linewidth, transparency };

      setPoints((state) => [...state, newEle]);
      var midPoint = midPointBtw(clientX, clientY);
      context.quadraticCurveTo(clientX, clientY, midPoint.x, midPoint.y);
      context.lineTo(clientX, clientY);
      context.stroke();
    } else if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      elements[index].strokeColor = strokeColor;
      elements[index].strokeWidth = strokeLineWidth;
      updateElement(
        index,
        x1,
        y1,
        clientX,
        clientY,
        toolType,
        strokeLineWidth,
        strokeColor
      );
    } else if (action == "moving") {
      if (selectedElement.toolType === "pencil") {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const {
          id,
          x1,
          x2,
          y1,
          y2,
          toolType,
          offsetX,
          offsetY,
          strokeLineWidth,
          strokeColor,
        } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        const options =
          toolType === "text" ? { text: selectedElement.text } : {};
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          toolType,
          strokeLineWidth,
          strokeColor
        );
      }
    } else if (action === "resizing") {
      const { id, toolType, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, toolType, strokeLineWidth, strokeColor);
    }
  };

  const handleMouseUp = () => {
    if (action === "drawing") {
      const index = selectedElement.id;
      const { id, toolType, strokeWidth } = elements[index];
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(id, x1, y1, x2, y2, toolType, strokeWidth, strokeColor);
    } else if (action === "sketching") {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      context.closePath();
      const element = points;
      setPoints([]);
      setPath((prevState) => [...prevState, element]); //tuple
      setIsDrawing(false);
    } else if (action === "resizing") {
      const index = selectedElement.id;
      const { id, toolType, strokeWidth, strokeColor } = elements[index];
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(id, x1, y1, x2, y2, toolType, strokeWidth, strokeColor);
    }
    setAction("none");
  };

  return (
    <div className="board">
      <div className={`${state.showLoginBox ? "board-opacity" : ""}`}>
        <div className="tools-container">
          <ToolSelection
            selectedTool={toolType}
            setToolType={setToolType}
            onUndo={undo}
            onRedo={redo}
            strokeColor={strokeColor}
            setStrokeColor={setStrokeColor}
            strokeLineWidth={strokeLineWidth}
            setStrokeLineWidth={setStrokeLineWidth}
            resetBoard={resetBoard}
          />
        </div>
        <div className="canvas-container">
          <canvas
            id="canvas"
            className="App"
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={(e) => {
              var touch = e.touches[0];
              handleMouseDown({
                clientX: touch.clientX,
                clientY: touch.clientY,
              });
            }}
            onTouchMove={(e) => {
              var touch = e.touches[0];
              handleMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY,
              });
            }}
            onTouchEnd={handleMouseUp}
          >
            Canvas
          </canvas>
        </div>
        <JoyRide
          {...tourState}
          callback={callback}
          showSkipButton={true}
          styles={{
            tooltipContainer: {
              textAlign: "left",
            },
            buttonBack: {
              marginRight: 10,
              color: "#750ee4",
            },
            buttonNext: {
              backgroundColor: "#750ee4",
            },
          }}
          locale={{
            last: "End tour",
          }}
        />
      </div>
    </div>
  );
};

export default Board;
