import React from 'react'
import apiRequest from '../apiRequest';
import { useState, useEffect } from 'react'

const PTable = ({getItems, handleDelete, API_URL, setEditedId}) => {

  const [inputIsActive, setInputIsActive] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [editName, setEditName] = useState('');
  const [editTechnician, setEditTechnician] = useState('');
  const [editSpecialization, setEditSpecialization] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editCity, setEditCity] = useState('');


  const editData = {
    name: editName,
    technicianName: editTechnician,
    specializationName: editSpecialization,
    duration: editDuration,
    city: editCity
  };
  

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//         const clickedElement = e.target;
//         const editingRow = document.querySelector(`tr[key="${editingId}"]`);

//         if (inputIsActive && editingRow && !editingRow.contains(clickedElement)) {
//             setInputIsActive(false);
//         }
//     };

//     document.addEventListener('click', handleOutsideClick);

//     return () => {
//         document.removeEventListener('click', handleOutsideClick);
//     };
// }, [inputIsActive, setInputIsActive, editingId]);


  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditTechnician(item.technicianName);
    setEditSpecialization(item.specializationName);
    setEditDuration(item.duration);
    setEditCity(item.city);
    // setInputIsActive(true);
  }
  
  const handleSaveClick = async (item) => {
    const patchObj = Object.fromEntries(
      Object.entries(editData).filter(
        ([key, value]) => item[key] !== value && editData[key] !== ""
      )
    );
    
    if(Object.keys(patchObj).length !== 0){
      patchObj['id'] = item.id;
  
      const patchOptions = {
        method: "PATCH",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(patchObj)
      };
  
      const res = await apiRequest(API_URL, patchOptions);
      const resData = await res.json();
      alert(resData.message);
  
      if(res.ok) {
        setEditedId(item.id);
      }
    }
    
    setEditingId('');
    setEditName('');
    setEditTechnician('');
    setEditSpecialization('');
    setEditDuration('');
    setEditCity('');
    // setInputIsActive(false);
  }

  const handleEditNameChange = (e) => {
    const inputName = e.target.value.trim();
    const capitalizedName = inputName.replace(/\b\w/g, (char) => char.toUpperCase());
    setEditName(capitalizedName);
  }

  const handleEditTechnicianChange = (e) => {
    const inputName = e.target.value.trim();
    const capitalizedName = inputName.replace(/\b\w/g, (char) => char.toUpperCase());
    setEditTechnician(capitalizedName);
  }

  const handleEditSpecializationChange = (e) => {
    const inputName = e.target.value.trim();
    const capitalizedName = inputName.replace(/\b\w/g, (char) => char.toUpperCase());
    setEditSpecialization(capitalizedName);
  }

  return (
    <div className='table-container projects'>
      <table className='projectsTable'>
        <thead>
            <tr>
              <th className="name">Name</th>
              <th className="technician">Technician</th>
              <th className="specialization">Specialization</th>
              <th className="duration">Duration</th>
              <th className="city">City</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getItems.map((item) => (
              <tr key={item.id}>
                {editingId !== item.id && !inputIsActive ? (
                  <>
                    <td className="name">{item.name}</td>
                    <td className="technician">{item.technicianName}</td>
                    <td className="specialization">{item.specializationName}</td>
                    <td className="duration">{item.duration}</td>
                    <td className="city">{item.city}</td>
                  </>
                ) : (
                  <>
                    <td className="name">
                      <input type="text" id="editName" name='editName' className="register-input" value={editName} required  onChange={handleEditNameChange}/>
                    </td>

                    <td className="technician">
                      <input type="text" id="editTechnician" name="editTechnician" className="register-input" value={editTechnician} required onChange={handleEditTechnicianChange}/>  
                    </td>

                    <td className="specialization">
                      <input type="text" id="editSpecialization" name="editSpecialization" className="register-input" value={editSpecialization} required onChange={handleEditSpecializationChange}/>  
                    </td>

                    <td className="duration">
                      <input type="number" id="editDuration" name="editDuration" className="register-input" value={editDuration} required onChange={(e) => setEditDuration(e.target.value.trim())}/>
                    </td>

                    <td className="city">
                      <input type="text" id="editCity" name="editCity" className="register-input" value={editCity} required onChange={(e) => setEditCity(e.target.value.trim())}/>  
                    </td>
                  </>
                )}
                <td className="actions">
                  <div>
                    {editingId === item.id ? (
                      <button type="button" className='save' onClick={() => handleSaveClick(item)}>Save</button>
                    ) : (
                      <button type="button" className='edit' onClick={() => handleEditClick(item)}>Edit</button>
                    )}
                    <button className='delete' onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default PTable