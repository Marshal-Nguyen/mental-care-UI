import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Web/Home";
//import NavigaForWeb from "./components/NavigaForWeb";
import TestEmo from "./pages/user/Web/TestEmo";
import Intro from "./pages/user/Web/Intro";
import SocialCard from "../src/components/manager/SocialCard";
// manager
import Manager from "./pages/manager/manager";
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
        <Route path="/Manager" element={<Manager />} />
        <Route path="/SocialCard" element={<SocialCard />} />

      </Routes>
    </Router>
  );
}

export default App;
