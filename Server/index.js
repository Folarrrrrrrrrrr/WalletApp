const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
require ('dotenv').config();
const db = require('./models')
const corsOptions = {
    credentials: true,
    origin:['http://localhost:7777', 'http://localhost:5173']
};


app.use(express.json());

// const dbConfig = require('./config/dbConfig');
const { Sequelize } = require('sequelize');
app.use(cors(corsOptions));


(async ()=>{
    await db.sequelize.sync();
})();


const userRoute = require('./controllers/userAuthController')
const accountTypeRoutes = require('./routes/accountTypeRoutes')
const tiertypeRoutes = require('./routes/tiertypeRoutes')
const customerAccountRoutes = require('./routes/customerAccountRoutes')
// const customerAccountRoutes = require('./routes/customerAccountRoutes')
const router = [accountTypeRoutes, customerAccountRoutes, userRoute,tiertypeRoutes]
app.use('./api/accounttypes', router[0])
app.use('./api/customerAccounts', router[1])
app.use('/api/users', router[2]);
// app.use('/api/tiertypes', router[3]);


const PORT = process.env.PORT || 5006;




app.listen(PORT, ()=>{
    console.log(`Server is running in port: ${PORT}`)
})