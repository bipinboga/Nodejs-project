require("dotenv").config();
const express = require('express')
const router = express.Router()
const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
// const privateKey = process.env.TRON_PRIVATE_KEY
const tronWeb = new TronWeb( fullNode, solidityNode, eventServer, "d2e7de50a5f3dbbd34972cc1e18015acb91f67fe84238cde2bc2b1ee0cd760a2")

router.post('/trxbalance', async (req, res) => {
    const {address} = req.body
    try{
        // var sender = "TGKoFRBtGfEbVHWETnvo5ieMQJQEGuQPkb"
        var value = await tronWeb.fromSun(
            await tronWeb.trx.getBalance("TGKoFRBtGfEbVHWETnvo5ieMQJQEGuQPkb")
        )
        console.log(value)
        res.status(200).json({
            value,
            message: 'Successfull'
        })
    } catch(error) {
        console.log(error)
        res.status(404).json({
            message: 'Cannot find address',
            address
        })
    }

    
})

module.exports = router