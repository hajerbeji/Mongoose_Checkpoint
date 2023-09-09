const mongoose = require('mongoose')

const prsonschema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
    },
    favouriteFoods: {
        type: [String]
    },
})
const PersonalModel = mongoose.model('person', prsonschema);
module.exports = PersonalModel;