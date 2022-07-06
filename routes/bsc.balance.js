const express = require('express')
const router = express.Router()
const Web3 = require('web3')
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')


router.post('/balance', async (req, res) => {
    const {address} = req.body
    try{
        var sender = address
        var value = web3.utils.fromWei(
            await web3.eth.getBalance(sender),
            'ether'
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