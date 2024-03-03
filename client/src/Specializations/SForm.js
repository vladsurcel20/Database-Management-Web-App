import React from 'react'

const SForm = ({setName, setField, handleSubmit}) => {

  return (
    <div className="input-section">
            <h2>Add a new specialization</h2>

            <form className="register-form" onSubmit={handleSubmit}>

                <div className="register-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name='name' className="register-input" placeholder="Enter specialization name" required  onChange={(e) => setName(e.target.value.trim())}/>
                </div>

                <div className="register-field">
                    <label htmlFor="field">Career Field</label>
                    <input type="text" id="field" name='field' className="register-input" placeholder="Enter specialization field" required  onChange={(e) => setField(e.target.value.trim())}/>
                </div>

                <button className="register-btn" type="submit">Submit</button>
            </form>
        </div>
  )
}

export default SForm