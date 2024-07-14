import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="bg-gray-400 h-full flex flex-1 justify-center  ">
      <div className="p-1 m-1 flex-1 flex flex-col gap-y-4 justify-center items-center">
        <h1 className="text-6xl  tracking-widest  underline-offset-8">
          WHITEBOARD
        </h1>
        <p className="text-lg text-neutral-600">
          Join a room and share the canvas among your peers.
        </p>
      </div>

      <div className="m-1 p-1 flex-1 flex flex-col items-center justify-center gap-y-3">
        <div className=" gap-2">
          <label htmlFor="name" className="m-1 p-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Your name"
            className="p-1  rounded-md m-1 bg-gray-300 text-md outline-none"
          />
        </div>
        <div className="flex justify-center items-center">
          <label htmlFor="room" className="m-1 p-1">
            Room
          </label>
          <input
            type="text"
            name="room"
            id="room"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            placeholder="Room ID"
            className="p-1  rounded-md m-1 bg-gray-300 text-md outline-none"
          />
        </div>
        <div className="">
          <button
            className="bg-gray-200 p-1 rounded-md hover:scale-105 transition mx-10"
            onClick={() => {
              if (room !== "" && name !== "") {
                navigate("/room/" + room + "/" + name);
              }
            }}
          >
            Join Room
          </button>
          {room === "" && (
            <button
              className="bg-gray-200 p-1 rounded-md hover:scale-105 transition mx-10 "
              onClick={() => {
                setRoom(Math.floor(Math.random() * 10000).toString());
              }}
            >
              Create Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
