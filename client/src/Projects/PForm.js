import React from 'react'
import apiRequest from '../apiRequest';
import {useState} from 'react'


const PForm = ({setName, setTechnicianName, setSpecializationName, setDuration, setCity, handleSubmit}) => {

    const [technicianList, setTechnicianList] = useState([]);
    const [specializationList, setSpecializationList] = useState([]);

    const handleSelectTechnicianClick = async () => {
        const API_URL = 'http://localhost:5000/technicians';

        const res = await apiRequest(API_URL);
        if(res.ok) {
            const list = await res.json();
            setTechnicianList(list)
        }
    }

    const handleSelectSpecializationClick = async () => {
        const API_URL = 'http://localhost:5000/specializations';

        const res = await apiRequest(API_URL);
        if(res.ok) {
            const list = await res.json();
            setSpecializationList(list)
        }
    }

  return (
    <div className="input-section">
            <h2>Create a new project</h2>

            <form className="register-form" onSubmit={handleSubmit}>

                <div className="register-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name='name' className="register-input" placeholder="Enter project's name" required  onChange={(e) => setName(e.target.value.trim())}/>
                </div>

                <div className="register-field">
                    <label htmlFor="technicianName">Technician</label>
                    {/* <input type="technicianName" id="technicianName" name="technicianName" className="register-input" placeholder="Enter technician's name" required onChange={(e) => setTechnicianName(e.target.value.trim())}/> */}
                    <select id="technicianName" name='technicianName' className='register-input' placeholder="Select technician"  required onClick={handleSelectTechnicianClick} onChange={(e) => setTechnicianName(e.target.value.trim())}>
                        <option value=""  disabled selected>Select a technician</option>
                        {technicianList.map((item) => (
                            <>
                                <option value={item.name}>{item.name}</option>
                            </>
                        ))}
                    </select>
                </div>

                <div className="register-field">
                    <label htmlFor="specializationName">Specialization</label>
                    {/* <input type="specializationName" id="specializationName" name="specializationName" className="register-input" placeholder="Enter specialization's name" required onChange={(e) => setSpecializationName(e.target.value.trim())}/> */}
                    <select id="specializationName" name='specializationName' className='register-input' placeholder="Select specialization"  required onClick={handleSelectSpecializationClick} onChange={(e) => setSpecializationName(e.target.value.trim())}>
                        <option value=""  disabled selected>Select a specialization</option>
                        {specializationList.map((item) => (
                            <>
                                <option value={item.name}>{item.name}</option>
                            </>
                        ))}
                    </select>
                </div>

                <div className="register-field">
                    <label htmlFor="duration">Duration (months)</label>
                    <input type="number" id="duration" name="duration" className="register-input" placeholder="Project's duration" required onChange={(e) => setDuration(e.target.value.trim())}/>
                </div>

                <div className="register-field">
                    <label htmlFor="City">City</label>
                    <input type="City" id="City" name="City" className="register-input" placeholder="Enter the city" required onChange={(e) => setCity(e.target.value.trim())}/>
                </div>

                <button className="register-btn" type="submit">Submit</button>
            </form>
        </div>
  )
}

export default PForm