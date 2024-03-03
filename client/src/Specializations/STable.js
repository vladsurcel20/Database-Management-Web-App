import React from 'react'

const STable = ({getItems, editingId, setEditingId, handleDelete, editName, setEditName, editField, setEditField, handleEditClick, handleSaveClick}) => {
  return (
    <div className='table-container'>
      <table className='specializationsTable'>
        <thead>
            <tr>
              <th className="name">Name</th>
              <th className="field">Career Field</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getItems.map((item) => (
              <tr key={item.id}>
                {editingId !== item.id ? (
                  <>
                    <td className="name">{item.name}</td>
                    <td className="field">{item.field}</td>
                  </>
                ) : (
                  <>
                    <td className="name">
                      <input type="text" id="editName" name='editName' className="register-input" value={editName} required  onChange={(e) =>  setEditName(e.target.value.trim())}/>
                    </td>

                    <td className="field">
                      <input type="field" id="editField" name="editField" className="register-input" value={editField} required onChange={(e) =>  setEditField(e.target.value.trim())}/>  
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

export default STable