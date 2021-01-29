const { Schema, model } = require('mongoose');

const postmortemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: false
    },
    detectTime: {
        type: String,
        required: false
    },
    severity: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    },
    gcLink: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: false
    },
    ownerTeam: {
        type: String,
        required: false
    },
    created: {
        type: String,
        required: false
    },
    modified: {
        type: Date,
        required: false
    },
    deleted: {
        type: Date,
        required: false
    }
});

const postmortem = model('Postmortem', postmortemSchema);

module.exports = { postmortemSchema: postmortem };
