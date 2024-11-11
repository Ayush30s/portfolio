import  { useState } from 'react';

const EditEmployeeForm = ( addEmployee ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('HR');
  const [gender, setGender] = useState('M');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name & !email & !mobile) {
      alert('Please fill in all required fields.');
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image
    };

    addEmployee(newEmployee);
    setName('');
    setEmail('');
    setMobile('');
    setDesignation('HR');
    setGender('M');
    setCourse([]);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Employee</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Mobile No:
        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
      </label>
      <label>
        Designation:
        <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </label>
      <label>
        Gender:
        <input type="radio" value="M" checked={gender === 'M'} onChange={() => setGender('M')} /> Male
        <input type="radio" value="F" checked={gender === 'F'} onChange={() => setGender('F')} /> Female
      </label>
      <label>
        Course:
        <input type="checkbox" value="MCA" onChange={(e) => setCourse([...course, e.target.value])} /> MCA
        <input type="checkbox" value="BCA" onChange={(e) => setCourse([...course, e.target.value])} /> BCA
        <input type="checkbox" value="BSC" onChange={(e) => setCourse([...course, e.target.value])} /> BSC
      </label>
      <label>
        Image Upload:
        <input type="file" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditEmployeeForm;