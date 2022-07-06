require("dotenv").config();
const express = require('express')
const router = express.Router()
const Transaction = require("../models/Transaction");
const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
const privateKey = process.env.TRON_PRIVATE_KEY
const tronWeb = new TronWeb( fullNode, solidityNode, eventServer, privateKey)

router.post('/trxtransaction', async (req, res) => {
    const { currency, email, from, to, amount} = req.body;

    try {
  
        const tradeobj = await tronWeb.transactionBuilder.sendTrx(to, amount, from);
        const signedtxn = await tronWeb.trx.sign(tradeobj);
        const receipt = await tronWeb.trx.sendRawTransaction(signedtxn)
        console.log(receipt);
        
        if(receipt.txid){

            const transaction = new Transaction({
                currency: currency,
                email : email,
                from_address : from,
                to_address : to,
                amount : amount,
                tx_ID: receipt.txid,
                status: true,
            });

        await transaction.save()
        .then((data) => {
            console.log(data, "inserted")
            return data
        })
        console.log(transaction)

        res.status(200).json({
            currency,
            from,
            to,
            amount,
            tx_ID: receipt.txid,
            message: 'complete transaction'
        })
    }
}
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'transaction not found!',

        })
    }
}),
module.exports = router