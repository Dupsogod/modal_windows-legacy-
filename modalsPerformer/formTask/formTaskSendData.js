
function sendTaskData(idTask, files){
    var item = {};
    var initiator = document.querySelector('.initiator-fieled select');
    var type = document.querySelector('.typeMessage.active');
    var titleTask;
    var description;
    var descriptionTaskContent = tinymce.get('description').getContent();
    var datePlanedSendNewTask = document.querySelector('.datePlanedSendNewTask');
    var processes = document.querySelectorAll('.typeProsess.active');
    var tags = document.querySelectorAll('.tag.active');
    var takenProcess = document.querySelector('.processesTaken');
    var additinalIntiators = document.querySelector('.additinalIntiators');
    var matching = document.querySelector('.matching');
    var performer = document.querySelector('.performers select');
    var timing = document.querySelector('.timingTask.active');
    var status = document.querySelector('.statusTask.active');

    var valid = true;
    if(idTask){
        titleTask = document.querySelector('.titleTask-initiator').innerText;
        var descriptionTaskContentOld = document.querySelector('.descriptionContentOld').innerHTML;
        var descriptionTaskContentWidthUserData = "";
        if(descriptionTaskContent.length){
            descriptionTaskContentWidthUserData = currentUser.UserName + " (" + formatDate(new Date(), 4) + ")" + " - " + descriptionTaskContent + "<br>";
        }else{
            descriptionTaskContentWidthUserData = currentUser.UserName + " (" + formatDate(new Date(), 4) + ")" + " - В задачу внесены корректировки.<br>";
        }
        description = descriptionTaskContentWidthUserData + descriptionTaskContentOld;
    }else{
        titleTask = document.querySelector('.theme');
        if(descriptionTaskContent){
            description = currentUser.UserName + " (" + formatDate(new Date(), 4) + ")" + " - " + descriptionTaskContent;
        }
        if(!titleTask.value){
            valid = false;
            titleTask.classList.add('notValid');
        }else{
            titleTask.classList.remove('notValid');
        }
    }
    
    
    if(!initiator.value){
        valid = false;
        initiator.classList.add('notValid');
    }else{
        initiator.classList.remove('notValid');
    }

    var types = document.querySelector('.typesMessage');
    if(!type){
        valid = false;
        types.classList.add('notValid');
    }else{
        types.classList.remove('notValid');
    }

    

    if(!description){
        valid = false;
        document.querySelector('.descriptionContent').classList.add('notValid');
    }else{
        document.querySelector('.descriptionContent').classList.remove('notValid');
    }

    if(!datePlanedSendNewTask.value){
        valid = false;
        datePlanedSendNewTask.classList.add('notValid');
    }else{
        datePlanedSendNewTask.classList.remove('notValid');
    }

    if(!processes.length){
        valid = false;
        document.querySelector('.typesProsess').classList.add('notValid');
    }else{
        document.querySelector('.typesProsess').classList.remove('notValid');
    }

    if(!tags.length){
        valid = false;
        document.querySelector('.tags').classList.add('notValid');
    }else{
        document.querySelector('.tags').classList.remove('notValid');
    }

    if(!performer.value){
        valid = false;
        performer.classList.add('notValid');
    }else{
        performer.classList.remove('notValid');
    }

    var timings = document.querySelector('.timings');
    if(!timing){
        valid = false;
        timings.classList.add('notValid');
    }else{
        timings.classList.remove('notValid');
    }

    var statuses = document.querySelector('.statusesTask');
    if(!status){
        valid = false;
        statuses.classList.add('notValid');
    }else{
        statuses.classList.remove('notValid');
    }
    
    if(valid){
        var isNewsValid = getSendNewsData();
        if(!isNewsValid){
            valid = false;
        }
    }

    if(!valid){
        delModal();
        return;
    }

    
    
    item.initiator = initiator ? initiator.value : "";
    item.type = type ? type.innerHTML : "";
    item.title = titleTask.value;
    item.description = description;
    item.dateRegistration = formatDate(new Date(), 2);
    item.datePlanedSend = formatDate(new Date(datePlanedSendNewTask.value), 2);

    var selectedProcesses = [];
    processes.forEach(proc => {
        selectedProcesses.push(proc.innerHTML);
    })
    item.processes = selectedProcesses.length ? selectedProcesses.join(";") : ""; 
    var selectedTags = [];
    tags.forEach(tag=>{
        selectedTags.push(tag.innerHTML);
    })
    item.tags = selectedTags.length ? selectedTags.join(";") : "";
    item.takenProcess = takenProcess.checked ? "Да" : "Нет";
    item.additinalIntiators = additinalIntiators ? additinalIntiators.value : "";
    item.matching = matching.checked  ? "Да" : "Нет";
    item.performer = performer ? performer.value : "";
    item.timing = timing ? timing.innerHTML : "";
    item.status = status.dataset.action;

    
    
    if(idTask){
        var data = {
            "__metadata": { type: METADATA_TYPE_LIST_TASKS },
            "datePlanedSend": item.datePlanedSend,
            "description": item.description,
            "initiator": item.initiator,
            "performer": item.performer,
            "matching": item.matching,
            "process": item.processes,
            "status": item.status,
            "takenProcess": item.takenProcess,
            "type": item.type,
            "tags": item.tags,
            "timing": item.timing,
            "additinalInitiators": item.additinalIntiators
        };
        var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_TASKS_GUID+"')/items("+idTask+")";
        UpdateData(url, data).then(function(data){loadAttachments(idTask)})
        
    }else{
        var data = {
            "__metadata": { type: METADATA_TYPE_LIST_TASKS },
            "Title": item.title,
            "datePlanedSend": item.datePlanedSend,
            "dateRegistration": item.dateRegistration,
            "description": item.description,
            "initiator": item.initiator,
            "performer": item.performer,
            "matching": item.matching,
            "process": item.processes,
            "status": item.status,
            "takenProcess": item.takenProcess,
            "type": item.type,
            "tags": item.tags,
            "timing": item.timing,
            "additinalInitiators": item.additinalIntiators
        };
        var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_TASKS_GUID+"')/items";
        setData(data, url).then(function(data){loadAttachments(data.d.ID)})
        
    }
    
    function loadAttachments(itemId){
        if(files.length > 0){
            var attachments = [];
            var j = 0;
            getFiles(j)
            function getFiles(j){
                if(j >= files.length){
                    var i = 0;
                    sendAttachments(i)
                }else{
                    var reader = new FileReader();
                    reader.onload = e => {
                        attachments.push({
                            url: REQUEST_URL + "_api/lists(guid'"+LIST_TASKS_GUID+"')/items(" + itemId + ")/AttachmentFiles/add(FileName='" + files[j].name + "')",
                            data: e.target.result
                        })
                        getFiles(++j)
                    }
                    reader.readAsArrayBuffer(files[j]);
                    
                }
            }
            function sendAttachments(i){
                if(i >= attachments.length) {
                    //getSendNewsData();
                    backToTaskList()
                    return;
                }else{
                    UploadFiles(attachments[i].url, attachments[i].data)
                    .then((data)=>{
                        sendAttachments(++i);
                    })
                    .fail(err=>{
                        sendAttachments(++i);
                    })
                }
            }
        }else{
            //getSendNewsData();
            backToTaskList()

        }
    }
}
