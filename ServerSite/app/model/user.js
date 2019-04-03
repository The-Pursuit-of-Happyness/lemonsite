'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    });
    return mongoose.model('TestModel', UserSchema);
};
