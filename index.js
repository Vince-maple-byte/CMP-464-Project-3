const express = require('express');
const app = express();
const port = 3000;
const pool = require("./db");

app.use(express.json());

//get all
app.get('/user', async(req,res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM user_list");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error);
    }
})

//get selected
app.get('/user/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const user = await pool.query("SELECT * FROM user_list WHERE user_id = $1", [id]);
        res.json(user.rows);
    } catch (error) {
        console.error(error);
    }
})

//create a user
app.post('/user', async(req,res) => {
    try {
        const {username, password} = req.body;
        const newUser = await pool.query('INSERT INTO user_list (username, password) VALUES ($1,$2) RETURNING*'
        , [username, password])
        res.json(newUser.rows);
    } catch (error) {
        console.error(error);
    }
})

//update user

app.put('/user/:id', async (req,res) =>{
    const {id} = req.params;
    const {username, password} = req.body;
    const userUpdate = await pool.query("UPDATE user_list SET username = $1, password = $2 WHERE user_id = $3", 
    [username, password, id]);
    res.json(userUpdate.rows);
})

//delete user
app.delete('/user/:id', async(req,res) => {
    const {id} = req.params;
    const userDelete = await pool.query("DELETE FROM user_list WHERE user_id = $1", 
    [id]);
    res.json(userDelete.rows);
})

app.listen(port, () => {
    console.log(`Server is listening in ${port}`)
});
