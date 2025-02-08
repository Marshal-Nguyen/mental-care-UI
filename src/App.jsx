import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Web/Home";
//import NavigaForWeb from "./components/NavigaForWeb";
import TestEmo from "./pages/Web/TestEmo";
import Intro from "./pages/Web/Intro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
      {/* <NavigaForWeb /> */}
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/TestEmo" element={<TestEmo />} />
      </Routes>
    </Router>
  );
}

export default App;
