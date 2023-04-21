const express = require('express');
// const Session = require('express-session');
// const CookieParser = require('cookie-parser');
const TaskDB = require('./TaskDB');

const app = express();
const port = 3002;  // so we don't conflict with React on 3001

// Tell Express to parse the body as JSON.
// (This is a different format than data sent by an HTML form.)
app.use(express.json());

// This sets a CORS header.  It allows requests from JS 
// that didn't originate here
// !!!!! Don't ever use "*" in production!!!
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "content-type")
    next();
});

app.get('/viewTasks', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await TaskDB.allTasks()), delay)
})

app.get('/getUsers', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await TaskDB.allUsers()), delay)
})

app.post('/changeUser/:id', async(req, res) => {
    const id = req.params.id;

    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500) 
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        TaskDB.updateUser(req.body, id).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            res.json(data);
        })
    }
})

app.post('/postTask', async (req, res) => {
    console.log("About to create a new task");

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        TaskDB.insertTask(req.body).then((data) => {
            console.log("Sending:  ")
            res.json(data);
        })
    }
})

app.post('/upload', async(req, res) => {
    console.log("FILES ", req.files);

    res.sendStatus(200);
});

app.post('/editTask/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`Editing task with id #${ id }.`);

    // With JSON data, req.body is the entire parsed JSON object
    console.log(req.body);
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500) 
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        TaskDB.updateTask(req.body).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            res.json(data);
        })
    }
})

app.post('/deleteTask/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`Deleting task with id #${ id }.`);

    // With JSON data, req.body is the entire parsed JSON object
    console.log(req.body);
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500) 
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        TaskDB.deleteTask(req.body).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            res.json(data);
        })
    }
})

app.post('/login', async(req, res) => {
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        TaskDB.validateUser(req.body).then((data) => {
            console.log("Sending:  ");
            console.log("Data: ", data);
            res.json(data);
        })
    }
})

app.post('/createUser', async(req, res) => {
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        TaskDB.insertUser(req.body).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            res.json(data);
        })
    }
})

app.get('/initdb', (req, res) => {
    require('./TaskDB').initialize()
    res.send('Initialized.')
})

app.get('/resetdb', (req, res) => {
    require('./TaskDB').reset();
    res.send('Reset database.');
});

/* Launch the server */
app.listen(port, () => console.log(`Backend listening on port ${port}!`))
