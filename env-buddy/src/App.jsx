import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import NgoAdmin from "./pages/NgoAdmin";
import Events from "./pages/Events";
import Analytics from "./pages/Analytics"; 
import SignUp from "./pages/signup";
import Info from "./pages/Info";
import TopicDetail from "./pages/TopicDetail";
import QuizChat from "./pages/QuizChat";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="learning" element={<div>Quiz</div>} />
        <Route path="tasks" element={<div>Tasks</div>} />
        <Route path="events" element={<Events />} />
        <Route path="analytics" element={<div>Analytics</div>} />
        <Route path="info" element={<Info />} />
        <Route path="info/:topic" element={<TopicDetail />} />
        <Route path="ngo" element={<NgoAdmin />} />
        <Route path="/signup/:role" element={<SignUp />} />
        <Route path="/quiz" element={<QuizChat />} />
      </Route>
    </Routes>
  );
}



