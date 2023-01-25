require('./db/config');
const express = require("express");
const cors = require('cors');
const User = require('./db/User');
const Tickets = require('./db/Tickets');
const Answers = require('./db/Answers');
const app = express();

var answersArray;
var user;

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.user) {
        user = await User.findOne(req.body);
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

app.get('/getanswers', async(req, res)=>{
    let result = await Answers.find();
    answersArray = result[0]['answers'];
    if(answersArray){
        res.send(answersArray);
    }
    else{
        res.send({result:'Answers not found'})
    }
})

app.post('/generateticket', async (req, res)=>{
    let shuffled  = answersArray.sort(() => 0.5 - Math.random());
    let row1 = shuffled.slice(0, 5).sort(() => 0.5 - Math.random()).concat((new Array(4)).fill(null)).sort(() => 0.5 - Math.random());
    let row2 = shuffled.slice(5, 10).sort(() => 0.5 - Math.random()).concat((new Array(4)).fill(null)).sort(() => 0.5 - Math.random());
    let row3 = shuffled.slice(10, 15).sort(() => 0.5 - Math.random()).concat((new Array(4)).fill(null)).sort(() => 0.5 - Math.random());
    let array = row1.concat(row2,row3);
    Tickets.create( {
                        'answers': array, 
                    }, 
    (err, result ) => {
        if (err) {
            console.log('error', err)
        } else {
            res.status(200).send(result);
        }
    })
})


app.get("/", async (req, res) => {
    let user_id = user['id'];
    let ticket = await Tickets.findOne({ id: user_id });

    if (ticket) {
        res.send(ticket);
    } else {
        res.send({ result: "No Ticket found" })
    }
})

app.listen(5000);