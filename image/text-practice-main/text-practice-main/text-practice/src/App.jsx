
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
 import Appto from "./components/Appto";
import Dashboard from "./components/dashboard";
import EmployeeList from "./components/employeelist";
import EmployeeForm from "./components/employeeform";
import EditEmployeeForm from "./components/form_edit";

function App() {
  const addEmployee = [] 
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Appto />} />
        <Routes>
            <Route path="/editform" element={<EditEmployeeForm />} />
            <Route path="/EmployeeForm" element={<EmployeeForm addEmployee={addEmployee}/>} />
            <Route path="/app" element={<Dashboard />} />
            <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
    </Routes>
</Router>
  );
}

export default App;