import React from 'react';
import TTable from './TTable';
import TForm from './TForm';
import apiRequest from '../apiRequest';
import { useState, useEffect} from 'react';

const Technicians = () => {
  const API_URL = 'http://localhost:5000/technicians';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [addedItem, setAddedItem] = useState('');
  const [getItems, setGetItems] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [editedId, setEditedId] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editGender, setEditGender] = useState('');

  const postData = {
    name: name,
    email: email,
    age: age,
    gender: gender
};

const editData = {
  name: editName,
  email: editEmail,
  age: editAge,
  gender: editGender
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
    setEmail('');
    setAge('');
    setGender('');
    e.target.reset() 
}

  const handleNameChange = (e) => {
      const inputName = e.target.value.trim();
      const capitalizedName = inputName.replace(/\b\w/g, (char) => char.toUpperCase());
      setName(capitalizedName);
  }

  const handleEditNameChange = (e) => {
    const inputName = e.target.value.trim();
    const capitalizedName = inputName.replace(/\b\w/g, (char) => char.toUpperCase());
    setEditName(capitalizedName);
}

const handleEditClick = (item) => {
  setEditingId(item.id);
  setEditName(item.name);
  setEditEmail(item.email);
  setEditAge(item.age);
}

const handleSaveClick = async (item) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(editEmail)){
    alert("Please enter a valid email address")
  } else {

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
    setEditEmail('');
    setEditAge('');
    setEditGender('');
  }
}

 

  return (
    <div className='pst-area'>
      <TForm 
        setName={setName} 
        setEmail={setEmail} 
        setAge={setAge} 
        setGender={setGender} 
        handleSubmit={handleSubmit} 
        handleNameChange={handleNameChange}
      />
      <TTable 
        getItems={getItems}
        editingId={editingId}
        setEditingId={setEditingId}
        handleDelete={handleDelete}
        editEmail={editEmail}
        setEditEmail={setEditEmail} 
        editAge={editAge}
        setEditAge={setEditAge} 
        editGender={editGender}
        setEditGender={setEditGender}
        editName={editName}
        handleEditNameChange={handleEditNameChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />
    </div>  
  )
}

export default Technicians