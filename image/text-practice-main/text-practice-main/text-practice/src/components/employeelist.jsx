// src/components/EmployeeList.js
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  return (
      
    <div>
      <Link to="/EmployeeForm"><button>Employee form</button></Link>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={ emp.f_Id}>
              <td>{emp.f_Id}</td>
              <td>
                <img src={emp.f_Image} alt="Profile" width="50" />
              </td>
              <td>{emp.f_Name}</td>
              <td>{emp.f_Email}</td>
              <td>{emp.f_Mobile}</td>
              <td>{emp.f_Designation}</td>
              <td>{emp.f_Location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;