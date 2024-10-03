function saveChanges(button, itemId, files){
    if(button.innerText==="Отмена" || button.innerText == "+" || button.innerText == ""){return}
    setModal()
    var item = {};
    var descriptionTaskContent = tinymce.get('description').getContent();
    var descriptionTaskContentOld = document.querySelector('.descriptionContentOld').innerHTML;
    var datePlanedSendNewTask = document.querySelector('.datePlanedSendNewTask');
    var matching = document.querySelector('.matching');
    var processes = document.querySelectorAll('.typeProsess.active');
    var tags = document.querySelectorAll('.tag.active');
    var takenProcess = document.querySelector('.processTaken.active');
    var type = document.querySelector('.typeMessage.active');
    var additinalIntiators = document.querySelector('.additinalIntiators');
    var descriptionTaskContentWidthUserData = "";
    if(descriptionTaskContent.length){
        descriptionTaskContentWidthUserData = currentUser.UserName + " (" + formatDate(new Date(), 4) + ")" + " - " + descriptionTaskContent + "<br>";
    }else{
        descriptionTaskContentWidthUserData = currentUser.UserName + " (" + formatDate(new Date(), 4) + ")" + " - В задачу внесены корректировки.<br>";
    }

    var valid = true;
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
    if(!valid){
        delModal();
        return;
    }
        item.description = descriptionTaskContentWidthUserData + descriptionTaskContentOld;
        item.datePlanedSend = formatDate(new Date(datePlanedSendNewTask.value), 2);
        console.log(additinalIntiators.value);
        item.additinalIntiators = additinalIntiators.value ? additinalIntiators.value : "";
        var selectedProcesses = [];
        processes.forEach(proc => {
            selectedProcesses.push(proc.innerHTML);
        })
        item.processes = selectedProcesses.length ? selectedProcesses.join(";") : ""; //
        var selectedTags = [];
        tags.forEach(tag=>{
            selectedTags.push(tag.innerHTML);
        })
        item.tags = selectedTags.length ? selectedTags.join(";") : "";
        item.takenProcess = takenProcess.innerHTML; //
        item.type = type ? type.innerHTML : ""; //

        if(matching.checked){
            item.matching = "Да";
        }else{
            item.matching = "Нет";
        }
        var status = "";
        if(button.innerText === "Отменить задачу"){
            status = 'Отменено';
        }else if(button.innerText === "Перенести задачу"){
            status = 'Перенесено';
        }else if(button.innerText === "Внести уточнения"){
            status = 'Внесены уточнения';
        }else if(button.innerText === "Сохранить изменения"){
            status = 'Новая задача';
        }else if(button.innerText === "Согласовать"){
            status = 'Согласовано';
        }
        
    console.log(item)
    var data = {
        "__metadata": { type: METADATA_TYPE_LIST_TASKS },
        "datePlanedSend": item.datePlanedSend,
        "description": item.description,
        "matching": item.matching,
        "process": item.processes,
        "status": status,
        "takenProcess": item.takenProcess,
        "type": item.type,
        "tags": item.tags,
        "additinalInitiators": item.additinalIntiators
    };
    var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_TASKS_GUID+"')/items("+itemId+")";
    UpdateData(url, data)
    .then(function(data){
        //var itemId =  data.d.ID;
        if(files.length){
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
                    saveChangesNews();
                    return;
                }
                UploadFiles(attachments[i].url, attachments[i].data)
                .then((data)=>{
                    sendAttachments(++i);
                })
                .fail(err=>{
                    sendAttachments(++i);
                })
            }
        }else{
            saveChangesNews();
        }
    })
    function saveChangesNews(){
        var editedNews = document.querySelectorAll('.newsForm');
        if(editedNews.length){
            var requestsUpdateNews = [];
            editedNews.forEach((news)=>{
                
                var idNews = news.getAttribute('id');
                var titleNews = document.querySelector('#titleNews-'+idNews).value ? document.querySelector('#titleNews-'+idNews).value : '';
                console.log(document.querySelector('#descriptionNews-'+idNews));
                var contentNews = tinymce.get('descriptionNews-'+idNews).getContent() ? tinymce.get('descriptionNews-'+idNews).getContent() : '';

                var data = {
                    "__metadata": { type: METADATA_TYPE_LIST_NEWS },
                        "Title": titleNews,
                        "descriptionNews": contentNews
                }
                let url = REQUEST_URL+"/_api/web/lists(guid'"+LIST_NEWS_GUID+"')/items("+idNews+")";
                requestsUpdateNews.push(UpdateData(url, data)
                .then(function(){
                }))

            })
            Promise.all(requestsUpdateNews).then(()=>{backToTaskList()})
        }else{
            backToTaskList()
        }
        
    }
    function backToTaskList(){
        var modalInitiator = document.querySelector('.modal-initiator');
        tinymce.remove();
        modalInitiator.remove();
        var urlAttr = location.href.split('#')[1];
        if(urlAttr){
            window.location.hash = '';
        }
        searchTaskItems()
    }
}