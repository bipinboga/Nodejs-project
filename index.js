require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const AdminRoute = require('./routes/admin')

const ethBalance = require('./routes/eth.balance')
const ethTransaction = require('./routes/eth.transaction')

const bscBalance = require('./routes/bsc.balance')
const bscTransaction = require('./routes/bsc.transaction')

const trxBalance = require('./routes/trx.balance')
const trxTransaction = require('./routes/trx.transaction')

const app = express()

const dbUrl = "mongodb+srv://bipin551632:lr7RIbId1bmwWcFs@cluster0.soiuj.mongodb.net/?retryWrites=true&w=majority"

// lr7RIbId1bmwWcFs
mongoose.connect(dbUrl, {
    useNewUrlParser:  true
})
.then(() => console.log("MongoDB connected!"))
.catch((err) => console.log("Connection Failed"))


app.use(express.json())
app.use('/', require('./routes/router'))
app.use('/api/admin',AdminRoute)
app.use('/api',ethBalance)
app.use('/api',bscBalance)
app.use('/api',trxBalance)
app.use('/api',ethTransaction)
app.use('/api',bscTransaction)
app.use('/api',trxTransaction)

app.listen(3000, () => {
    console.log("server running on port 3000")
})