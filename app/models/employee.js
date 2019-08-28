const mongoose = require('mongoose');       // requiring mongoose

const Schema = mongoose.Schema;             // obtaining the Schema object

const employeeSchema = new Schema({         // creating the Schema
    empDetails: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    department: {
        type: String,
        enum: ['Technical', 'Sales', 'HR'],
        required: true
    },
    events: [ {
        type: Schema.Types.ObjectId,
        ref: 'event'
    } ]
});

employeeSchema.methods.shortInfo = function() {
    return {
        _id: this._id,
        numberCount: this.mobileNumbers.length,
        tickets: this.tickets
    }
}

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = {
    Employee
}
