import React from 'react';
import PTable from './PTable';
import PForm from './PForm';
import apiRequest from '../apiRequest';
import { useState , useEffect} from 'react';

const Projects = () => {
  const API_URL = 'http://localhost:5000/projects';

  const [name, setName] = useState('');
  const [technicianName, setTechnicianName] = useState('');
  const [specializationName, setSpecializationName] = useState('');
  const [duration, setDuration] = useState('');
  const [city, setCity] = useState('');
  const [getItems, setGetItems] = useState([]);
  const [addedItem, setAddedItem] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [editedId, setEditedId] = useState('');

  const postData = {
    name: name,
    technicianName: technicianName,
    specializationName: specializationName,
    duration: duration,
    city: city
};


useEffect(() => {

  const fetchItems = async () => {
    const res = await apiRequest(API_URL);
    if(res.ok) {
      const items = await res.json();
      setGetItems(items);
    } else {
      const err = await res.json();
      alert(err.message);
    }
  };

  fetchItems();
  setEditedId('');
}, [addedItem, deleteId, editedId])

const handleAdd = async () => {
  const postOptions = {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(postData)
  };

  const res = await apiRequest(API_URL, postOptions);
  if(res.ok) {
    setAddedItem(postData);
  }
  const resData = await res.json();
  alert(resData.message);
}

const handleDelete = async (id) => {
  const deleteId ={
    id:id
  };

  const deleteOptions = {
    method: "DELETE",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(deleteId)
  };

  const res = await apiRequest(API_URL, deleteOptions);
  const resData = await res.json();
  alert(resData.message);
  if(res.ok){
    setDeleteId(id);
  }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
    setName('');
    setTechnicianName('');
    setSpecializationName('');
    setDuration('');
    setCity('');
    e.target.reset() 
}


const handleNameChange = (e) => {
  const inputName = e.target.value.trim();
  const capitalizedName = inputName.replace(/\b\w/g, (char) => char.toUpperCase());
  setName(capitalizedName);
}

const handleTechnicianChange = (e) => {
  const inputName = e.target.value.trim();
  const capitalizedName = inputName.replace(/\b\w/g, (char) => char.toUpperCase());
  setTechnicianName(capitalizedName);
}

const handleSpecializationChange = (e) => {
  const inputName = e.target.value.trim();
  const capitalizedName = inputName.replace(/\b\w/g, (char) => char.toUpperCase());
  setSpecializationName(capitalizedName);
}
 

  return (
    <div className='pst-area projects'>
      <PForm 
        API_URL={API_URL}
        setName={setName} 
        setTechnicianName={setTechnicianName} 
        setSpecializationName={setSpecializationName} 
        setDuration={setDuration}
        setCity = {setCity}
        handleSubmit={handleSubmit}/>
      <PTable 
        getItems={getItems}
        handleDelete={handleDelete}
        setEditedId={setEditedId}
        API_URL={API_URL}
      />
    </div>  
  )
}

export default Projects