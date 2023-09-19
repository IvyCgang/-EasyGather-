const express = require('express');
const app = express();
const bodyparser = require('body-parser');

require('express-async-errors')

const db = require('./db'),
    journeyRoutes = require('./controllers/journey.controller')

//middlewore
app.use(bodyparser.json())
app.use('/api/journey', journeyRoutes)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong')
})


app.post('/api/receive-json', (req, res) => {
    // Access the JSON data from the request body
    const jsonData = req.body;

    // You can now work with the JSON data as needed
    console.log('Received JSON data:', jsonData);

    // Respond with a success message
    res.json({message: 'JSON data received successfully'});
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

