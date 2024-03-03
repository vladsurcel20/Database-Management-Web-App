import React from 'react'

const TTable = ({getItems, editingId, setEditingId, handleDelete, editName, editEmail, setEditEmail, editAge, setEditAge, setEditGender, handleEditNameChange, handleEditClick, handleSaveClick}) => {
  return (
    <div className='table-container'>
      <table className='techniciansTable'>
        <thead>
            <tr>
              <th className="name">Name</th>
              <th className="email">Email</th>
              <th className="age">Age</th> 
              <th className="gender">Gender</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getItems.map((item) => (
              <tr key={item.id}>
                {editingId !== item.id ? (
                  <>
                    <td className="name">{item.name}</td>
                    <td className="email">{item.email}</td>
                    <td className="age">{item.age}</td>
                    <td className="gender">{item.gender}</td>
                  </>
                ) : (
                  <>
                    <td className="name">
                      <input type="text" id="editName" name='editName' className="register-input" value={editName} required  onChange={handleEditNameChange}/>
                    </td>

                    <td className="email">
                      <input type="email" id="editEmail" name="editEmail" className="register-input" value={editEmail} required onChange={(e) => setEditEmail(e.target.value.trim())}/>  
                    </td>

                    <td className="age">
                      <input type="number" id="editAge" name="editAge" className="register-input" value={editAge} min="18" max="99" required onChange={(e) => setEditAge(e.target.value.trim())}/>
                    </td>

                    <td className="gender">
                      <div className="gender-section" id="editGender-section">
                          <span>
                            <input type="radio" id="male" name="gender" value="M" required onChange={(e) => setEditGender(e.target.value.trim())}/>
                            <label htmlFor="male">M</label> 
                          </span>

                          <span>
                            <input type="radio" id="female" name="gender" value="F" required onChange={(e) => setEditGender(e.target.value.trim())}/>
                            <label htmlFor="female">F</label> 
                          </span>
                        </div>
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

export default TTable