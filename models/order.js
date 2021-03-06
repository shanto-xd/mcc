const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
// const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    // survey: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Survey',
    //     // required: true,
    // },
    orderStatus: {
        type: String,
        // required: true,
    },
    plateSize: {
        type: String,
        // required: true,
    },
    paid: {
        type: String,
        // required: true,
    },
    bill: {
        type: Number,
    }
}, { timestamps: true });

orderSchema.plugin(autoIncrement, { inc_field: 'bill' });
// orderSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Order', orderSchema);