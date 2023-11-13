const express = require('express');
const app = express();
const bodyparser = require('body-parser');
//import 'btford/angular-socket-io/mock/socket-io';
const path = require('path');
//const httpServer = require('http').Server(app);
const http = require("http").createServer(app);
//const server = http.createServer(app.callback())
//const io = require('socket.io')(httpServer, {
//  transports: ['websocket'],
//});
const io = require("socket.io")(http);
//const moment = require('moment-timezone');

//require('./socket.js')(io);
//require('socket.io')(httpServer, {
//  transports: ['websocket'],
//});
require('express-async-errors')

const db = require('./db'),
    journeyRoutes = require('./controllers/journey.controller'),
    userRoutes = require('./controllers/users.controller'),
    eventRoutes = require('./controllers/event.controller'),
    //getEvent = require('./controllers/getEvent.controller')
    voteRoutes = require('./controllers/vote.controller'),
    votingOptionRoutes = require('./controllers/votingOption.controller'),
	resultRoutes = require('./controllers/result.controller'),
	matchRoutes = require('./controllers/match.controller'),
//	socketRoutes = require('./socketIO')
    socketRoutes = require('./socket')
app.use(express.static(path.join(__dirname,'web')));

app.use(function(req,res,next){
  req.db= db;
  next();
});

app.use(bodyparser.json())
app.use('/api/journey', journeyRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/user', userRoutes)
app.use('/api/vote', voteRoutes)
app.use('/api/votingOption', votingOptionRoutes)
app.use('/api/result', resultRoutes)
app.use('/api/match', matchRoutes)
//app.use(express.static(path.join(__dirname,'web')));

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong')
})


app.post('/api/receive-json', (req, res) => {
    // Access the JSON data from the request body
    const jsonData = req.body;

    // You can now work with the JSON data as needed
    console.log('Received JSON data:', jsonData);

    //await service.addJourney(req.body);
    res.status(201).send('add successfully.');

    // Respond with a success message
});

// //first make sure db connected is ok
// //then start the express server
// db.query("SELECT 1")
//         .then(() => {
//             console.log('database connected')
//             app.listen(3000,
//                 () => console.log('server started at 3000'))
//
//             })
//         .catch(err => console.log('database connected failed'))

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

