const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    currency: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    from_address: {
        type : String,
        require : true
    },
    to_address: {
        type : String,
        require : true
    },
    amount: {
        type : String,
        require : true
    },
    tx_ID: {
        type : String,
        require : true
    },
    status : {
        type : Boolean,
        default : false
    }},
    {
        timestamps:true
    },
)

module.exports = mongoose.model('Transaction', transactionSchema)