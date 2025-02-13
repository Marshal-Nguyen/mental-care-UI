import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Web/Home";
import TestEmo from "./pages/User/Web/TestEmo";
import Intro from "./pages/User/Web/Intro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/TestEmo" element={<TestEmo />} />
      </Routes>
    </Router>
  );
}

export default App;
