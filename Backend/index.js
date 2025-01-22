const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserModel = require('./models/user');

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/CodeCraftT1");

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Password is incorrect");
                }
            } else {
                res.json("No record exists!");
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.listen(8080, () => {
    console.log("Server is running");
})