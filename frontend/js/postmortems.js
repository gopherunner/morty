const addPostmortemBtn = document.getElementById('createPostmortem');
const addPostmortemContainer = document.getElementById('newPostmortemContainer');

const postmortemTitle = document.getElementById('title');
const postmortemStartDate = document.getElementById('start-date');
const postmortemEndDate = document.getElementById('end-date');
const postmortemDetectDate = document.getElementById('detect-date');
const postmortemSeverity = document.getElementById('severity');

const postmortemAddBtn = document.getElementById('btn-postmortem-add');
const errorMessages = document.getElementById('errors');

// Postmortems table
const postmortemsTable = document.getElementById('postmortems-table');

// Edit/Show Postmortem modal
const showPostmortemContainer = document.getElementById('showPostmortemContainer');
const postmortemForm = document.getElementsByClassName('postmortem-form')[1];
const postmortemUpdateTitle = document.getElementById('title-update');
const postmortemUpdateStartTime = document.getElementById('start-time-update');
const postmortemUpdateEndTime = document.getElementById('end-time-update');
const postmortemTotalImpactTime = document.getElementById('total-impact-time');
const postmortemUpdateSeverity = document.getElementById('severity-update');
const postmortemContact = document.getElementById('contact');
const postmortemOwnerTeam = document.getElementById('owner-team');
const postmortemMeeting = document.getElementById('meeting');

const postmortemWhatHappened = document.getElementById('what-happened');
var editor = new Editor({ element: postmortemWhatHappened });
// editor.render(editor.codemirror.getValue());

const postmortemTags = document.getElementById('tags');
const postmortemUpdateBtn = document.getElementById('update-postmortem-btn');


// APP Server
const APP_SERVER = "http://127.0.0.1:3000";

document.addEventListener('DOMContentLoaded', getPostmortems);

// postmortemWhatHappened.addEventListener('click', () => {
    
// });

addPostmortemBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addPostmortemContainer.style.display = 'flex';
    
    postmortemTitle.value = '';
    postmortemStartDate.value = '';
    postmortemEndDate.value = '';
    postmortemDetectDate.value = '';
});

postmortemAddBtn.addEventListener('click', createPostmortem);

postmortemUpdateBtn.addEventListener('click', updatePostmortem);


async function getPostmortems() {
    let fetchPostmortems = await fetch(`${APP_SERVER}/postmortems`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    let allPostmortems = await fetchPostmortems.json();
    let postmortems = allPostmortems.postmortems;

    console.table(postmortems);

    if (postmortems) {
        for (let i = 0; i < postmortems.length; i++) {
            let id = postmortems[i]._id;
            let title = postmortems[i].title;
            let startTime = postmortems[i].startTime;
            let endTime = postmortems[i].endTime != undefined ? postmortems[i].endTime : '';
            let detectTime = postmortems[i].detectTime != undefined ? postmortems[i].detectTime : '';
            let severity = postmortems[i].severity;

            addPostmortemRowToTable(id, title, startTime, endTime, detectTime, severity);
        }
    }
};

function addPostmortemRowToTable(id, title, startTime, endTime, detectTime, severity) {
    let postmortemId = id;

    let postmortemRow = document.createElement('div');

    let postmortemManage = document.createElement('div');
    let postmortemEdit = document.createElement('i');

    let titleDiv = document.createElement('div');

    let startTimeDiv = document.createElement('div');
    let startTimeDivDate = document.createElement('p');
    let startTimeDivTime = document.createElement('small');
    
    let endTimeDiv = document.createElement('div');
    let endTimeDivDate = document.createElement('p');
    let endTimeDivTime = document.createElement('small');

    let detectTimeDiv = document.createElement('div');
    let severityDiv = document.createElement('div');
    let severityLevelDiv = document.createElement('div');

    postmortemRow.className = 'postmortem-row';
    postmortemRow.id = postmortemId;
    
    postmortemManage.className = 'postmortem-edit';
    postmortemEdit.className = 'fas fa-book-dead';
    postmortemEdit.setAttribute('data-target', '#updateModal');
    postmortemEdit.setAttribute('data-toggle', 'modal');

    postmortemManage.appendChild(postmortemEdit);

    titleDiv.className = 'postmortem-info';
    startTimeDiv.className = 'postmortem-info';
    endTimeDiv.className = 'postmortem-info';
    detectTimeDiv.className = 'postmortem-info';
    severityDiv.className = 'postmortem-info';

    titleDiv.innerText = title;

    startTimeDivDate.innerText = startTime.split("T")[0];
    startTimeDivTime.innerText = startTime.split("T")[1];
    startTimeDiv.appendChild(startTimeDivDate);
    startTimeDiv.appendChild(startTimeDivTime);

    endTimeDivDate.innerText = endTime.split("T")[0];
    endTimeDivTime.innerText = endTime.split("T")[1];
    endTimeDiv.appendChild(endTimeDivDate);
    endTimeDiv.appendChild(endTimeDivTime);

    detectTimeDiv.innerText = detectTime;

    severityLevelDiv.innerText = severity.toLowerCase();
    if (severity.toLowerCase() == 'low')      severityLevelDiv.className = 'severity-low';
    if (severity.toLowerCase() == 'medium')   severityLevelDiv.className = 'severity-medium';
    if (severity.toLowerCase() == 'high')     severityLevelDiv.className = 'severity-high';

    severityDiv.appendChild(severityLevelDiv);

    postmortemRow.appendChild(postmortemManage);
    postmortemRow.appendChild(titleDiv);
    postmortemRow.appendChild(startTimeDiv);
    postmortemRow.appendChild(endTimeDiv);
    postmortemRow.appendChild(detectTimeDiv);
    postmortemRow.appendChild(severityDiv);

    postmortemsTable.appendChild(postmortemRow);

    postmortemEdit.addEventListener('click', async () => {
        showPostmortemContainer.style.display = 'flex';
        let postmortemRetrieved = await getPostmortemById(postmortemId);
        if (postmortemRetrieved) {
            renderPostmortemModal(postmortemRetrieved);
        }
    });
};

async function renderPostmortemModal(postmortem) {
    postmortemForm.id = postmortem._id;
    // console.log("[DEBUG] ==>> " + postmortem.summary);

    if (postmortem.title != undefined)  postmortemUpdateTitle.value = postmortem.title;
    if (postmortem.summary != undefined && postmortem.summary != '') {
        postmortemWhatHappened.innerText = postmortem.summary;
        editor.codemirror.getDoc().setValue(postmortem.summary);
        editor.render();
    } else {
        editor.codemirror.getDoc().setValue('');
        editor.render();
    }       

    if (postmortem.startTime != undefined)  postmortemUpdateStartTime.value = postmortem.startTime;
    if (postmortem.endTime != undefined)    postmortemUpdateEndTime.value = postmortem.endTime;

    if (postmortem.severity != undefined)   postmortemUpdateSeverity.value = postmortem.severity;
    if (postmortem.contact != undefined)    postmortemContact.value = postmortem.contact;
    if (postmortem.ownerTeam != undefined)  postmortemOwnerTeam.value = postmortem.ownerTeam;
    if (postmortem.gcLink != undefined) postmortemMeeting.value = postmortem.gcLink;
    
    postmortemTotalImpactTime.value = getTotalImpactTimeInMinutes(postmortem.startTime, postmortem.endTime);
};

function getTotalImpactTimeInMinutes(startTime, endTime) {
    var st = new Date(startTime);
    var et = new Date(endTime);
    var diffMinutes = Math.round((et.getTime() - st.getTime()) / 60000);
    let hours = Math.floor(diffMinutes / 60);
    let minutes = diffMinutes % 60;
    hours = hours <  10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours} hours, ${minutes} minutes`;
};

async function getPostmortemById(postmortemId) {
    let fetchPostmortem = await fetch(`${APP_SERVER}/postmortems/${postmortemId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    let postmortem = await fetchPostmortem.json();
    return postmortem.postmortems;
};

async function createPostmortem(event) {
    event.preventDefault();

    let startTime = '';
    let endTime = '';
    let detectTime = '';

    if (postmortemStartDate.value != '')    startTime = postmortemStartDate.value;
    if (postmortemEndDate.value != '')  endTime = postmortemEndDate.value;
    if (postmortemDetectDate.value != '')   detectTime = postmortemDetectDate.value;

    try {
        let postmortem = {
            title: postmortemTitle.value,
            summary: '',
            startTime: startTime,
            endTime: endTime,
            detectTime: detectTime,
            severity: postmortemSeverity.value,
            gcLink: '',
            contact: '',
            ownerTeam: '',
            created: new Date(),
            modified: '',
            deleted: ''
        };

        let postmortemCreate = await fetch(`${APP_SERVER}/postmortems`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postmortem)
        });

        let postmortemCreated = await postmortemCreate.json();

        if (postmortemCreated) {
            addPostmortemContainer.style.display = 'none';
            location.reload();
        }
    } catch (error) {
        errorMessages.textContent = error;
    }
};

async function updatePostmortem(event) {
    event.preventDefault();

    let postmortemId = postmortemForm.id;
    let postmortemSummary = editor.codemirror.getValue();
    // console.log("[DEBUG] ====>>> " + editor.codemirror.getValue());

    let tags = postmortemTags.value;
    console.log("[DEBUG] Tags: " + tags);

    let updatedPostmortem = {
        title: postmortemUpdateTitle.value,
        summary: postmortemSummary,
        startTime: postmortemUpdateStartTime.value,
        endTime: postmortemUpdateEndTime.value,
        severity: postmortemUpdateSeverity.value,
        gcLink: postmortemMeeting.value,
        contact: postmortemContact.value,
        ownerTeam: postmortemOwnerTeam.value,
        modified: new Date()
    };
    console.table(updatedPostmortem);

    let postmortemToUpdate = await fetch(`${APP_SERVER}/postmortems/${postmortemId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPostmortem)
    });

    let postmortemUpdate = await postmortemToUpdate.json();
    if (postmortemUpdate) {
        location.reload();
    }
};
