import { useParams } from "react-router-dom";
import { Tool } from "./Tool";
import rough from "roughjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface Element {
  path?: [number, number][];
  tool: string;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  color?: string;
}
export type Tool = "pencil" | "line" | "rectangle";
const RoomPage = () => {
  const { roomId, name } = useParams();
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<Element[]>([]);
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#000000");
  const startCoord = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
  }, []);

  function handleMouseDown(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log("Mouse Down - " + offsetX + " " + offsetY);
    startCoord.current = { x: offsetX, y: offsetY };
    setIsDrawing(true);
    if (tool === "pencil") {
      const newPath: [number, number][] = [[offsetX, offsetY]];
      setElements((prevElements) => [
        ...prevElements,
        { tool: "pencil", path: newPath, color },
      ]);
    } else if (tool === "rectangle" || tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          tool,
          x1: offsetX,
          x2: offsetX,
          y1: offsetY,
          y2: offsetY,
          color,
        },
      ]);
    }
  }
  function handleMouseMove(e) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setElements((prevElements) => {
      const lastElement = prevElements[prevElements.length - 1];
      if (lastElement.tool === "pencil") {
        const updatedPath: [number, number][] = [
          ...lastElement.path!,
          [offsetX, offsetY],
        ];
        const updatedElement = { ...lastElement, path: updatedPath };
        return [...prevElements.slice(0, -1), updatedElement];
      } else if (
        lastElement.tool === "rectangle" ||
        lastElement.tool === "line"
      ) {
        const updatedElement = { ...lastElement, x2: offsetX, y2: offsetY };
        return [...prevElements.slice(0, -1), updatedElement];
      }
      return prevElements;
    });
  }
  function handleMouseUp(e) {
    setIsDrawing(false);
  }

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const gen = rough.canvas(canvasRef.current);
      const roughCanvas = rough.canvas(canvasRef.current!);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      elements.forEach((element) => {
        if (element.tool === "pencil") {
          gen.linearPath(element.path!, {
            stroke: element.color,
            roughness: 0,
          });
          console.log("path : " + element.path);
        } else if (element.tool === "rectangle") {
          const { x1, x2, y1, y2 } = element;
          if (x1 && x2 && y1 && y2) {
            roughCanvas.draw(
              gen?.rectangle(x1, y1, x2 - x1, y2 - y1, {
                stroke: element.color,
              })
            );
          }
        } else if (element.tool === "line") {
          const { x1, x2, y1, y2 } = element;
          if (x1 && x2 && y1 && y2) {
            if (!ctx) return;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      });
    }
  }, [elements]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className="h-full w-full bg-gray-400 flex flex-col items-center ">
      <div className="p-1 m-1 my-4 ">
        <h1 className="text-4xl  tracking-widest underline underline-offset-8 my-2">
          WHITEBOARD
        </h1>
        <p>ROOM : {roomId}</p>
        <p>USER : {name}</p>
      </div>
      <div className="flex w-full ">
        <div className=" bg-gray-500 rounded-lg flex flex-col items- justify-between m-2 py-10 w-[200px]">
          <div className=" flex flex-col m-2">
            <Tool
              toolName="pencil"
              checked={tool === "pencil"}
              setTool={setTool}
            />
            <Tool toolName="line" checked={tool === "line"} setTool={setTool} />
            <Tool
              toolName="rectangle"
              checked={tool === "rectangle"}
              setTool={setTool}
            />
          </div>
          <div className="m-2">
            <input
              type="color"
              id="color"
              className="m-1 p-1"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
            <label htmlFor="color" className="m-1 text-neutral-300 ">
              Color
            </label>
          </div>
          <div className="flex flex-col m-2">
            <button className="bg-gray-400 m-1 p-1 rounded-lg hover:scale-105 transition hover:bg-gray-200">
              Undo
            </button>
            <button className="bg-gray-400 m-1 p-1 rounded-lg hover:scale-105 transition hover:bg-gray-200">
              Redo
            </button>
          </div>
          <div className="flex flex-col m-2">
            <button className="bg-red-600 m-1 p-1 rounded-lg hover:scale-105 transition hover:bg-gray-200">
              Clear
            </button>
          </div>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="w-full bg-neutral-400 mx-10 rounded-2xl border-2 border-gray-700 h-[550px]"
        >
          <canvas
            className="bg-neutral-200 w-full h-full rounded-2xl"
            ref={canvasRef}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
