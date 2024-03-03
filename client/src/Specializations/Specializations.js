import React from 'react';
import STable from './STable';
import SForm from './SForm';
import apiRequest from '../apiRequest';
import { useState, useEffect} from 'react';

const Specializations = () => {
  const API_URL = 'http://localhost:5000/specializations';

  const [name, setName] = useState('');
  const [field, setField] = useState('');
  const [addedItem, setAddedItem] = useState('');
  const [getItems, setGetItems] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [editedId, setEditedId] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editName, setEditName] = useState('');
  const [editField, setEditField] = useState('');

  const postData = {
    name: name,
    field:field
};

const editData = {
  name: editName,
  field: editField,
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
    setField('');
    e.target.reset() 
}

const handleEditClick = (item) => {
  setEditingId(item.id);
  setEditName(item.name);
  setEditField(item.field);
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
  setEditField('');
}
 

  return (
    <div className='pst-area'>
      <SForm setName={setName} setField={setField} handleSubmit={handleSubmit}/>
      <STable
        getItems={getItems}
        editingId={editingId}
        setEditingId={setEditingId}
        handleDelete={handleDelete}
        editField={editField}
        setEditField={setEditField} 
        editName={editName}
        setEditName={setEditName}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />
    </div>  
  )
}

export default Specializations