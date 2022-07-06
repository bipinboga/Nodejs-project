require('dotenv').config();
const express = require('express')
const router = express.Router()
const Web3 = require('web3')
const Transaction = require("../models/Transaction");
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const Private_key = process.env.PRIVATE_KEY

router.post('/transaction', async (req, res) => {
    const { currency, email, from_address, to_address, amount } = req.body;
    try {
        var status = false;
        var value = web3.utils.toWei("0.01", "ether");
        var SignedTransaction = await web3.eth.accounts.signTransaction(
        {
            from: from_address,
            to: to_address,
            value: value,
            gas: 2000000,
        },
        Private_key
        );

        const Transfer = await web3.eth.sendSignedTransaction(
        SignedTransaction.rawTransaction
        );
        if (Transfer.transactionHash) {
        const transaction = new Transaction({
            currency: currency,
            email: email,
            from_address: from_address,
            to_address: to_address,
            amount: amount,
            tx_ID: Transfer.transactionHash,
            status: true,
        });
        await transaction.save().then((data) => {
            console.log(data, "DataInserted");
            return data;
        });

        console.log(transaction);
        res.status(200).json({
            currency,
            email,
            from_address,
            to_address,
            amount,
            tx_ID: Transfer.transactionHash,
            message: "Successfull Transaction",
        });
    }
} catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Transaction could not complete",
    });
  }
})

module.exports = router