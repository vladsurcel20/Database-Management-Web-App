import React from 'react'


const TForm = ({setEmail, setAge, setGender, handleSubmit, handleNameChange}) => {

  return (
    <div className="input-section">
            <h2>Add a new technician</h2>

            <form className="register-form" onSubmit={handleSubmit}>

                <div className="register-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name='name' className="register-input" placeholder="Enter your name" required  onChange={handleNameChange}/>
                </div>

                <div className="register-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="register-input" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value.trim())}/>
                </div>

                <div className="register-field">
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" className="register-input" placeholder="Enter your age"  min="18" max="99" required onChange={(e) => setAge(e.target.value.trim())}/>
                </div>

                <div className="register-field">
                    <label>Gender</label>
                    <div className="gender-section" id="gender-section">
                        <span>
                            <input type="radio" id="male" name="gender" value="M" required onChange={(e) => setGender(e.target.value.trim())}/>
                            <label htmlFor="male">M</label>
                        </span>
                        <span>
                            <input type="radio" id="female" name="gender" value="F" required onChange={(e) => setGender(e.target.value.trim())}/>
                            <label htmlFor="female">F</label>
                        </span>            
                    </div>
                </div>

                <button className="register-btn" type="submit">Submit</button>
            </form>
        </div>
  )
}

export default TForm