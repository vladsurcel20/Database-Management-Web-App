const express = require("express");
const db = require("../connection");

const router = express.Router();

/// POST ///

router.post('/', (req,res) =>{
    const projectData = req.body; 
    const sqlPost = "INSERT INTO projects (name, technician_id, specialization_id, duration, city) VALUES (?, ?, ?, ?, ?);";
    const sqlFindT = "SELECT id FROM technicians WHERE name = ?;";
    const sqlFindS = "SELECT id FROM specializations WHERE name = ?;";
    let t_id=0;
    let s_id=0;

    db.query(sqlFindT, projectData.technicianName, (err, result) =>{
        if(err){
            console.error('Error executing SELECT query:', err);
             return res.status(500).json({ message: 'Internal Server Error' });
        }
        else{
            if(result.length === 0){
               return res.status(404).json({message: "Technician doesn't exists"})
            }
            else{
                t_id = result[0].id;
            }

            db.query(sqlFindS, projectData.specializationName, (err, result) =>{
                if(err){
                    console.error('Error executing SELECT query:', err);
                     return res.status(500).json({ message: 'Internal Server Error' });
                }
                else{
                    if(result.length === 0){
                        return res.status(404).json({message: "Specialization doesn't exists"})
                    }
                    else{
                        s_id = result[0].id;
                    }

                    const values = [projectData.name, t_id, s_id, projectData.duration, projectData.city]; 

                    db.query(sqlPost, values, (err, result)=>{
                        if(err){
                          if(err.code ===  'ER_DUP_ENTRY' && err.sqlMessage.includes('projects.name')){
                            console.error('Duplicate name error:', err.sqlMessage);
                            res.status(400).json({ message: 'Name already in use' });
                          } else {
                            console.error('Error executing INSERT query:', err);
                            res.status(500).json({ message: 'Internal Server Error' });
                          }
                        }
                        else{
                            res.status(201).json({message: 'Data inserted successfully'});
                        }
                    });
                }
            });
        }
    });
});



/// GET ALL /// 

router.get('/', (req, res) => {
    const sqlStatement = "SELECT projects.id, projects.name AS name, technicians.name AS technicianName, specializations.name AS specializationName, projects.duration, projects.city FROM projects INNER JOIN technicians ON projects.technician_id = technicians.id INNER JOIN specializations ON projects.specialization_id = specializations.id;"

    db.query(sqlStatement, (err, result)=>{
        if(err){
            console.error('Error executing SELECT query:', err);
            res.status(500).json({message: 'Error fetching data'});
        } else{
            res.status(200).json(result);
        }
    });
});




/// Get one ///     

router.get('/get1', (req, res) =>{
  const userData = req.body; 
    const sqlStatement = "SELECT projects.id, projects.name AS project_name, technicians.name AS technician_name, specializations.name AS specialization_name, projects.duration, projects.city FROM projects INNER JOIN technicians ON projects.technician_id = technicians.id INNER JOIN specializations ON projects.specialization_id = specializations.id WHERE projects.name = ?;";
  
    db.query(sqlStatement, userData.findName, (err, result)=>{
      if(err){
        console.error('Error executing SELECT query:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else{
        if(result.length === 0){
          res.status(404).json({message: 'Project not found'});
        } else{
          res.status(200).json(result);
        }
      }
    });
  });




  /// Delete one /// 

  router.delete('/', (req, res) =>{
    const userData = req.body; 
    const sqlStatement = "DELETE FROM projects WHERE id = ?;";
  
    db.query(sqlStatement, userData.id, (err, result)=>{
      if(err){
        console.error('Error executing DELETE query:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else{
        if(result.affectedRows === 0){
          res.status(404).json({message: 'Project not found'});
        } else{
          res.status(200).json({message: 'Project deleted succesfully'});
        }
      }
    });
  });



  /// Patch /// 

  router.patch('/', (req,res) =>{
    const inputData = req.body;

    if(!inputData.hasOwnProperty("technicianName") && !inputData.hasOwnProperty("specializationName")){

      const setClause = Object.keys(inputData).map((key, index, array) => index === array.length-1 ? '' : `${key} = ?`).filter(Boolean).join(', ');
      const values = Object.values(inputData);
      
      const sqlStatement = `UPDATE projects SET ${setClause} WHERE id = ?;`;
      db.query(sqlStatement, values, (err, result)=>{
        if(err){
            console.error('Error executing PATCH query:', err);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        else{
          if(result.affectedRows === 0){
            console.error('Error:', err)
            res.status(404).json({message: 'Project not found'});
          } else{
            res.status(200).json({message: 'Project updated succesfully'});
          }
        }
      });
    }

    else if(inputData.hasOwnProperty("technicianName") && inputData.hasOwnProperty("specializationName")){
      const sqlFindT = "SELECT id FROM technicians WHERE name = ?;";
      const sqlFindS = "SELECT id FROM specializations WHERE name = ?;";
      let t_id=0;
      let s_id=0;

      db.query(sqlFindT, inputData.technicianName, (err, result) =>{
          if(err){
              console.error('Error executing SELECT query:', err);
              return res.status(500).json({ message: 'Internal Server Error' });
          }
          else{
              if(result.length === 0){
                return res.status(404).json({message: "Technician doesn't exists"})
              }
              else{
                  t_id = result[0].id;
              }

              db.query(sqlFindS, inputData.specializationName, (err, result) =>{
                  if(err){
                      console.error('Error executing SELECT query:', err);
                      return res.status(500).json({ message: 'Internal Server Error' });
                  }
                  else{
                      if(result.length === 0){
                          return res.status(404).json({message: "Specialization doesn't exists"})
                      }
                      else{
                          s_id = result[0].id;
                      }

                      const newData = {};
                      Object.keys(inputData).forEach(key => {
                        let newKey = '';
                        let newValue = '';
                        if(key === "technicianName"){
                          newKey = "technician_id";
                          newValue = t_id;
                        }
                        else if(key === "specializationName"){
                          newKey = "specialization_id";
                           newValue = s_id;
                        }
                        else{
                        newKey = key;
                        newValue = inputData[key];
                        }

                        newData[newKey] = newValue;
                      })


                      const setClause = Object.keys(newData).map((key, index, array) => index === array.length-1 ? '' : `${key} = ?`).filter(Boolean).join(', ');
                      const values = Object.values(newData);
                      
                      const sqlStatement = `UPDATE projects SET ${setClause} WHERE id = ?;`;
                    
                      db.query(sqlStatement, values, (err, result)=>{
                        if(err){
                            console.error('Error executing PATCH query:', err);
                            res.status(500).json({ message: 'Internal Server Error' });
                          }
                        else{
                          if(result.affectedRows === 0){
                            console.error('Error:', err)
                            res.status(404).json({message: 'Project not found'});
                          } else{
                            res.status(200).json({message: 'Project updated succesfully'});
                          }
                        }
                      });
                    }
                  })
                }
              });

    } else if(inputData.hasOwnProperty("technicianName")) {
        const sqlFindT = "SELECT id FROM technicians WHERE name = ?;";
        let t_id=0;

        db.query(sqlFindT, inputData.technicianName, (err, result) =>{
            if(err){
                console.error('Error executing SELECT query:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            else{
                if(result.length === 0){
                  return res.status(404).json({message: "Technician doesn't exists"})
                }
                else{
                    t_id = result[0].id;
                }

                        const newData = {};
                        Object.keys(inputData).forEach(key => {
                          let newKey = '';
                          let newValue = '';
                          if(key === "technicianName"){
                            newKey = "technician_id";
                            newValue = t_id;
                          }
                          else{
                          newKey = key;
                          newValue = inputData[key];
                          }

                          newData[newKey] = newValue;
                        })


                        const setClause = Object.keys(newData).map((key, index, array) => index === array.length-1 ? '' : `${key} = ?`).filter(Boolean).join(', ');
                        const values = Object.values(newData);
                        
                        const sqlStatement = `UPDATE projects SET ${setClause} WHERE id = ?;`;
                      
                        db.query(sqlStatement, values, (err, result)=>{
                          if(err){
                              console.error('Error executing PATCH query:', err);
                              res.status(500).json({ message: 'Internal Server Error' });
                            }
                          else{
                            if(result.affectedRows === 0){
                              console.error('Error:', err)
                              res.status(404).json({message: 'Project not found'});
                            } else{
                              res.status(200).json({message: 'Project updated succesfully'});
                            }
                          }
                        });
                      }
                    })
      } else if(inputData.hasOwnProperty("specializationName")) {
          const sqlFindS = "SELECT id FROM specializations WHERE name = ?;";
          let s_id=0;
    
          db.query(sqlFindS, inputData.specializationName, (err, result) =>{
              if(err){
                  console.error('Error executing SELECT query:', err);
                  return res.status(500).json({ message: 'Internal Server Error' });
              }
              else{
                  if(result.length === 0){
                    return res.status(404).json({message: "Specialization doesn't exists"})
                  }
                  else{
                      s_id = result[0].id;
                  }
    
                          const newData = {};
                          Object.keys(inputData).forEach(key => {
                            let newKey = '';
                            let newValue = '';
                            if(key === "specializationName"){
                              newKey = "specialization_id";
                              newValue = s_id;
                            }
                            else{
                            newKey = key;
                            newValue = inputData[key];
                            }
    
                            newData[newKey] = newValue;
                          })
    
    
                          const setClause = Object.keys(newData).map((key, index, array) => index === array.length-1 ? '' : `${key} = ?`).filter(Boolean).join(', ');
                          const values = Object.values(newData);
                          
                          const sqlStatement = `UPDATE projects SET ${setClause} WHERE id = ?;`;
                        
                          db.query(sqlStatement, values, (err, result)=>{
                            if(err){
                                console.error('Error executing PATCH query:', err);
                                res.status(500).json({ message: 'Internal Server Error' });
                              }
                            else{
                              if(result.affectedRows === 0){
                                console.error('Error:', err)
                                res.status(404).json({message: 'Project not found'});
                              } else{
                                res.status(200).json({message: 'Project updated succesfully'});
                              }
                            }
                          });
                        }
                      })
        }

    
  });




module.exports = router;