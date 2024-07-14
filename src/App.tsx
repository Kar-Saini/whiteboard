import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RoomPage from "./components/RoomPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:roomId/:name" element={<RoomPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
