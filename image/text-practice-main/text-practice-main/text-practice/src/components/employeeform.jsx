import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './header'; // Import the Header component

const EmployeeForm = ( addEmployee ) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'HR',
    gender: 'M',
    course: [],
    image: null,
  });
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.mobile || isNaN(formData.mobile)) {
      newErrors.mobile = 'Mobile number is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addEmployee({
        id: Date.now(),
        ...formData,
      });
      setFormData({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: 'M',
        course: [],
        image: null,
      });
      setErrors({});
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        course: checked
          ? [...prev.course, value]
          : prev.course.filter((c) => c !== value),
      }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Employee Form */}
      <form onSubmit={handleSubmit}>
        <h2>Create Employee</h2>
        
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>

        <label>
          Mobile No:
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </label>

        <label>
          Designation:
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </label>

        <label>
          Gender:
          <input
            type="radio"
            name="gender"
            value="M"
            checked={formData.gender === 'M'}
            onChange={handleChange}
          /> Male
          <input
            type="radio"
            name="gender"
            value="F"
            checked={formData.gender === 'F'}
            onChange={handleChange}
          /> Female
        </label>

        <label>
          Course:
          <input
            type="checkbox"
            name="course"
            value="MCA"
            onChange={handleChange}
          /> MCA
          <input
            type="checkbox"
            name="course"
            value="BCA"
            onChange={handleChange}
          /> BCA
          <input
            type="checkbox"
            name="course"
            value="BSC"
            onChange={handleChange}
          /> BSC
        </label>

        <label>
          Image Upload:
          <input type="file" name="image" accept="image/png, image/jpeg" onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
        <Link to="/editform">
          <button type="button">Go to Edit Form</button>
        </Link>
      </form>
    </div>
  );
};

export default EmployeeForm;
