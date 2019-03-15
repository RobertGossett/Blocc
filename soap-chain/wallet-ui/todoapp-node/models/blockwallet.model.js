var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var BloccWalletSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
})

BloccWalletSchema.plugin(mongoosePaginate)
const BloccWallet = mongoose.model('Bloccwallet', BloccWalletSchema)

module.exports = BloccWallet;