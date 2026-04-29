import express from 'express';
import fs from 'fs';
import credentials from './data/credentials.json' with { type: 'json' };

const app = express();

app.use(express.json());
app.use(express.static('src', { index: 'login.html' })); // { index: 'login.html' } tells the server to respond to "GET /" with login.html 

// handle user login by POST
app.post('/login', function(req, res){
    const username = req.body.username;
    const user = credentials[username];
    
    if(user === undefined) { // if username wasn't found in the credentials object
        res.json({ success: false, message: 'Username does not exist.' }); // send a response that the authentication was unsuccessful
        return;
    }

    if(user.password === req.body.password){ // if password is the correct password
        res.json({ success: true, message: 'User authentication successful.'}); // send a response that the authentication was successful
    }
    else {                                   // otherwise
        res.json({ success: false, message: 'Incorrect password.' }); // send a response that the authentication was unsuccessful
    }
});

// handle user registration by POST
app.post('/register', function(req, res){
    const username = req.body.username;
    const existingUser = credentials[username];

    if(existingUser !== undefined){ // if the username already exists in the database 
        res.json({ success: false, message: 'Username is already taken.' }); // send a failure message stating that the username has already been taken
        return; // exit the handler
    }

    // add new user to the credentials object
    credentials[username] = { 
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    // update the credentials.json file with the new credentials object containing the new user
    fs.writeFile('./data/credentials.json', JSON.stringify(credentials, null, 4), 'utf-8', function(err){
        if(err) console.log(error);
        else console.log('Credentials saved to data/credentials.json');
    })

    // send a success message
    res.json({ success: true, message: "Registration successful."})
})

// GET the current user's first and last name
app.get('/user', function(req, res){
    const currentUser = credentials['testUser']; // hardcode the currently logged in user

    res.json({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName
    }); // send the firstname and lastname of the currently logged in user
    
    
});

app.listen(3000, function(err){
    if(err) console.log(err);
    else console.log('Server listening on port 3000');
})