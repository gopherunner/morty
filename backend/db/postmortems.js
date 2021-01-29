const { postmortemSchema } = require('../models/postmortems');

async function createPostmortem(postmortem) {

    try {
        let postmortemToBeCreate = {
            title: postmortem.title,
            startTime: postmortem.startTime,
            endTime: postmortem.endTime,
            detectTime: postmortem.detectTime,
            severity: postmortem.severity,
            created: Date.now()
        };

        // console.log("[DEBUG] StartTime: " + postmortem.startTime);

        let postmortemToCreate = new postmortemSchema(postmortemToBeCreate);

        let { _id } = await postmortemToCreate.save();

        console.log("[INFO] Postmortem successfully created with Id: " + _id);
        return postmortemToCreate;
    } catch (error) {
        console.log("[ERROR] While trying to create the Postmortem, error msg: " + error.message);
    }
};

async function getPostmortem(id) {
    try {
        // console.log("[DEBUG] Postmortem Id for Retrieve: " + id);
        let postmortem = await postmortemSchema.findById({ _id: id });
        if (postmortem) {
            return postmortem;
        }
    } catch (error) {
        console.log("[ERROR] While trying to get the Postmortem with ID: " + id + " , error msg: " + error.message);
    }
};

async function getPostmortems() {
    try {
        let postmortems = await postmortemSchema.find({}, {
            __v: 0
        });
        if (postmortems) {
            return postmortems;
        }
    } catch (error) {
        console.log("[ERROR] While trying to get the Postmortems, error msg: " + error.message);
    }
};

async function updatePostmortem(id, postmortem) {
    try {
        let postmortemToBeUpdated = {
            title: postmortem.title,
            summary: postmortem.summary,
            startTime: postmortem.startTime,
            endTime: postmortem.endTime,
            severity: postmortem.severity,
            gcLink: postmortem.gcLink,
            contact: postmortem.contact,
            ownerTeam: postmortem.ownerTeam,
            modified: postmortem.modified
        };

        let postmortemUpdated = await postmortemSchema.findByIdAndUpdate(id, postmortemToBeUpdated);
        if (postmortemUpdated) {
            console.log("[INFO] Postmortem successfully Updated!");
            return postmortemUpdated;
        }
    } catch (error) {
        console.log("[ERROR] While trying to update the Postmortem, error msg: " + error.message);
    }
};

module.exports = { createPostmortem, getPostmortems, getPostmortem, updatePostmortem };
