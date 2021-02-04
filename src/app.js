const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//routers
const carsRouter = require('./routes/cars.routes');
const dealershipsRouter = require('./routes/dealerships.routes');
const garagesRouter = require('./routes/garages.routes');
const motorbikesRouter = require('./routes/motorbikes.routes');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//ROUTES
app.use('/dealership', dealershipsRouter);
app.use('/cars', carsRouter);
app.use('/motorbikes', motorbikesRouter);
app.use('/garages', garagesRouter);



module.exports = app;