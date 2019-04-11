'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const TagSchema = new Schema({
        tagname: {
            type: String,
            // required: true,
        },
    });
    return mongoose.model('Tag', TagSchema);
};
