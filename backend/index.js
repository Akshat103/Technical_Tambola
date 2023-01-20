const express = require("express");
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Tickets = require('./db/Tickets');
const { parse } = require("dotenv");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(req.body);
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user);
        }
        else {
            res.send({ result: 'No user found' });
        }
    }
    else {
        res.send({ result: 'No user found' });
    }
})


app.get("/", async (req, res) => {
    var user = await User.findOne(req.body).select('-password');
    let user_id = user['id'];

    let ticket = await Tickets.findOne({ id: user_id });

    if (ticket) {
        res.send(ticket);
    } else {
        res.send({ result: "No Ticket found" })
    }
})

app.listen(5000);