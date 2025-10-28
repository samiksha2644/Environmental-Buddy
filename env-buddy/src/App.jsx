import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="learning" element={<div>Quiz & Learning</div>} />
        <Route path="tasks" element={<div>Tasks</div>} />
        <Route path="events" element={<div>Events</div>} />
        <Route path="analytics" element={<div>Analytics</div>} />
        <Route path="info" element={<div>Info Hub</div>} />
      </Route>
    </Routes>
  );
}



