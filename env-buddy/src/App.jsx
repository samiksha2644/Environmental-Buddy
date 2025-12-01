import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import NgoAdmin from "./pages/NgoAdmin";
import Events from "./pages/Events";
import Analytics from "./pages/Analytics"; 

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="learning" element={<div>Quiz</div>} />
        <Route path="tasks" element={<div>Tasks</div>} />
        <Route path="events" element={<Events />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="info" element={<div>Info Hub</div>} />
        <Route path="ngo" element={<NgoAdmin />} />
      </Route>
    </Routes>
  );
}



