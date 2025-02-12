import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Web/Home";
// import NavigaForWeb from "./components/NavigaForWeb";
import TestEmo from "./pages/user/Web/TestEmo";
import Intro from "./pages/user/Web/Intro";
import { Outlet } from "react-router-dom";
// manager
import TestButton from "../src/components/manager/TestButton";
import Manager1 from "../src/components/manager/sildebarLeft/SildebarLeft";
import Manager from "./pages/manager/manager";
import DashboardManager from "./pages/manager/dashboard/Dashboard";
import AddCustomerManager from "./pages/manager/customer/AddCustomer";
import ListCustomerManager from "./pages/manager/customer/ListCustomer";
import AddStaff from "./pages/manager/staff/AddStaff";
import ListStaff from "./pages/manager/staff/ListStaff";
import AcceptDoctor from "./pages/manager/doctor/AcceptDoctor";
import ListDoctor from "./pages/manager/doctor/ListDoctor";
import AddPromo from "./pages/manager/promotion/AddPromo";
import ListPromo from "./pages/manager/promotion/ListPromo";
import ListFeedback from "./pages/manager/feedback/ListFeedback";
import ResponseFeedback from "./pages/manager/feedback/ResponseFeedback";

function App() {
  return (
    <Router>
      <Routes>
        {/* Các route chính */}
        <Route path="/" element={<Intro />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/TestEmo" element={<TestEmo />} />

        {/* Route Manager */}
        <Route path="/Manager" element={<Manager />}>
          <Route path="/Manager" element={<DashboardManager />} />
          {/* Route con của Manager */}
          <Route path="Button" element={<TestButton />} />
          <Route path="dashboard" element={<DashboardManager />} />

          <Route path="customer" element={<AddCustomerManager />} />
          <Route path="addCustomer" element={<AddCustomerManager />} />
          <Route path="viewCustomer" element={<ListCustomerManager />} />
          <Route path="staff" element={<AddStaff />} />
          <Route path="addStaff" element={<AddStaff />} />
          <Route path="viewStaff" element={<ListStaff />} />
          <Route path="doctor" element={<AcceptDoctor />} />
          <Route path="addDoctor" element={<AcceptDoctor />} />
          <Route path="viewDoctor" element={<ListDoctor />} />
          <Route path="promotion" element={<AddPromo />} />
          <Route path="addPromo" element={<AddPromo />} />
          <Route path="managePromo" element={<ListPromo />} />
          <Route path="feedback" element={<ListFeedback />} />
          <Route path="view-feedback" element={<ListFeedback />} />
          <Route path="respond-feedback" element={<ResponseFeedback />} />

        </Route>

        {/* Các route khác */}
        <Route path="/Manager1" element={<Manager1 />} />
      </Routes>
    </Router>
  );
}

export default App;
