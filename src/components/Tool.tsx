import { Dispatch, SetStateAction } from "react";
import { Tool as ToolType } from "./RoomPage";

export const Tool = ({
  toolName,
  checked,
  setTool,
}: {
  toolName: ToolType;
  checked: boolean;
  setTool: Dispatch<SetStateAction<ToolType>>;
}) => {
  return (
    <div className=" gap-2 text-neutral-200">
      <input
        type="radio"
        name={toolName}
        id={toolName}
        checked={checked}
        className="m-1 p-1"
        onClick={() => {
          setTool(toolName);
        }}
      />
      <label htmlFor={toolName} className="m-1 ">
        {toolName.charAt(0).toUpperCase() + toolName.slice(1)}
      </label>
    </div>
  );
};
