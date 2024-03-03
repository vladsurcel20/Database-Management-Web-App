const express = require("express");
const db = require("../connection");

const router = express.Router();

/// Post///

router.post('/', (req,res) => {
    const userData = req.body;
    const sqlStatement = "INSERT INTO specializations (name, field) VALUES (?, ?);";
    const values = [userData.name, userData.field];
    
    db.query(sqlStatement, values, (err, result) =>{  
        if(err){
            if (err.code === 'ER_DUP_ENTRY') {
                if (err.sqlMessage.includes('specializations.name')) {
                  console.error('Duplicate name error:', err.sqlMessage);
                  res.status(400).json({ message: 'Specialization already exists'});
                }   
              } 
              else{
                console.error('Error executing INSERT query:', err);
              }
        } else{
            res.status(201).json({message: 'Data inserted successfully'});
        }
    });
});



/// Get all /// 

router.get('/', (req,res) => {
  const sqlStatement = "SELECT * FROM specializations;"; 

  db.query(sqlStatement, (err, result) =>{
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
  const inputName = req.body; 
  const sqlStatement = "SELECT * FROM specializations WHERE name = ?;";

  db.query(sqlStatement, inputName.findName, (err, result)=>{
    if(err){
      console.error('Error executing SELECT query:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else{
      if(result.length === 0){
        res.status(404).json({message: 'Specialization not found'});
      } else{
        res.status(200).json(result);
      }
    }
  });
});



/// Delete one /// 

router.delete('/', (req, res) =>{
  const userData = req.body; 
  const sqlStatement = "DELETE FROM specializations WHERE id = ?;";

  db.query(sqlStatement, userData.id, (err, result)=>{
    if(err){
      console.error('Error executing DELETE query:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else{
      if(result.affectedRows === 0){
        res.status(404).json({message: 'Specialization not found'});
      } else{
        res.status(200).json({message: 'Specialization deleted succesfully'});
      }
    }
  });
});



/// Patch /// 

router.patch('/', (req,res) =>{ 
  const inputData = req.body;

  const setClause = Object.keys(inputData).map((key, index, array) => index===array.length-1 ? '' : `${key} = ?`).filter(Boolean).join(', ');
  const values = Object.values(inputData);

  const sqlStatement = `UPDATE specializations SET ${setClause} WHERE id = ?;`;

  db.query(sqlStatement, values, (err, result)=>{
    if(err){
      if(err.code === 'ER_DUP_ENTRY') {

        if (err.message.includes('specializations.name')) {
          console.error('Duplicate name error:', err.message);
          res.status(400).json({ message: 'Name already in use'});
        }   
      } else{
        console.error('Error executing PATCH query:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else{
      if(result.affectedRows === 0){
        console.error('Error:', err)
        res.status(404).json({message: 'Specialization not found'});
      } else{
        res.status(200).json({message: 'Specialization updated succesfully'});
      }
    }
  });
});





module.exports = router;