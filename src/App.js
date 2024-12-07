import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Int from "./pages/Int";

import Ques from "./pages/Ques";
import Socials from "./pages/socials";
import profile from "./pages/profile";
import Profile from "./pages/profile";
import CompanyReg from './pages/companyReg';
import CompanyDashboard from "./pages/CompanyDashboard";
import SkillsDashboard from "./pages/SkillsDashboard";
import UserDashboard from './components/UserDashboard';  // Import the UserDashboard component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Int />} />
          <Route path="/Ques" element={<Ques />} />
          <Route path="/Socials" element={<Socials />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/comp" element={<CompanyReg />} />
          <Route path="/company-dashboard" element={<CompanyDashboard/>}/>
          <Route path="/skillsdashboard" element={<SkillsDashboard/>}/>
          <UserDashboard />  {/* Render the UserDashboard component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
