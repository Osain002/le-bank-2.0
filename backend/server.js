const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const session = require('express-session')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}))

const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;
mongoose.connect(uri, { useNewUrlParser: true});

connection.once('open', () => {
    console.log('...database connection success')
})


const userAuthRouter = require('./routes/userauthentication');
const homeRouter = require('./routes/userhome');
const addAccountRouter = require('./routes/addaccount');
const transferRouter = require('./routes/transfer');

app.use('/userauthentication', userAuthRouter);
app.use('/userhome', homeRouter);
app.use('/addaccount', addAccountRouter);
app.use('/transfer', transferRouter)


app.listen(port, () => {
    console.log(`...server running on port ${port}`)
});