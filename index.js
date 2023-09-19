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


//first make sure db connected is ok
//then start the express server
db.query("SELECT 1")
        .then(() => {
            console.log('database connected')
            app.listen(3000,
                () => console.log('server started at 3000'))

            })
        .catch(err => console.log('database connected failed'))


