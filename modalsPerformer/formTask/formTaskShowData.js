function showData(idTask){
    document.querySelector('.theme').parentElement.parentElement.innerHTML = '';
    var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_TASKS_GUID+"')/items?$filter=Id eq " + idTask;
    getData(url)
    .then(data=>{
        var taskData = data.d.results;

        var titleTask = document.querySelector('.titleTask-initiator');
        titleTask.innerHTML = `${taskData[0].Title}<span class='statusTaskTitle'> - ${taskData[0].status}</span>`;

        var initiator = document.querySelector('.initiator-fieled select');
        initiator.value = taskData[0].initiator;

        var type = document.querySelectorAll('.typeMessage');
        if(taskData[0].type){
            type.forEach(item=>{
                if(item.innerHTML == taskData[0].type){
                    item.classList.add('active');
                }
            })
        }

        var description = document.querySelector('.descriptionContentOld');
        description.innerHTML = taskData[0].description;

        var savedAttachments = document.querySelector('.savedAttachments');
        if(taskData[0].Attachments){
            var urlGetAttachments = REQUEST_URL + "/_api/web/lists(guid'"+LIST_TASKS_GUID+"')/items(" + idTask + ")/AttachmentFiles"
            getData(urlGetAttachments)
            .then(data=>{
                savedAttachments.style.display = "flex";
                data.d.results.forEach(file=>{
                    savedAttachments.insertAdjacentHTML( 'beforeend', `<a href="${file.ServerRelativeUrl}" target="_blank"><div class="saved-file" title="${file.FileName}">
                                <img src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/file.png">
                                <div class="saved-info">
                                    <div class="saved-info-name">${file.FileName}</div>
                                </div>
                        </div></a>`)
                })
            })
        }else{
            savedAttachments.style.display = "none";
        }

        var datePlanedSendNewTask = document.querySelector('.datePlanedSendNewTask');
        datePlanedSendNewTask.value = formatDate(new Date(taskData[0].datePlanedSend), 1)

        if(taskData[0].process){
            var processItems = document.querySelectorAll('.typeProsess');
            var processData = taskData[0].process.split(";");
            processItems.forEach(procItem=>{
                var selectedProcess = processData.find(proc=>procItem.innerText == proc);
                if(selectedProcess){
                    procItem.classList.add('active');
                }
            })
        }

        if(taskData[0].tags){
            var tagsItems = document.querySelectorAll('.tag');
            var tagsData = taskData[0].tags.split(";");
            tagsItems.forEach(tagItem=>{
                var selectedTags = tagsData.find(tag=>tagItem.innerText == tag);
                if(selectedTags){
                    tagItem.classList.add('active');
                }
            })
        }

        var takenProcess = document.querySelector('.processesTaken');
        if(taskData[0].takenProcess == "Да"){
            takenProcess.checked = true;
        }else{
            takenProcess.checked = false;
        }

        var additinalIntiators = document.querySelector('.additinalIntiators');
        additinalIntiators.value = taskData[0].additinalInitiators;

        var matching = document.querySelector('.matching');
        if(taskData[0].matching == "Да"){
            matching.checked = true;
        }else{
            matching.checked = false;
        }

        var performers = document.querySelector('.performers select');
        if(taskData[0].performer){
            performers.value = taskData[0].performer;
        }

        var timing = document.querySelectorAll('.timingTask');
        if(taskData[0].timing){
            timing.forEach(item=>{
                if(item.innerHTML == taskData[0].timing){
                    item.classList.add('active');
                }
            })
        }
        var stuses = document.querySelectorAll('.statusTask');
        if(taskData[0].status == 'Отправлено'){
            stuses.forEach(item=>{
                if(item.innerHTML == 'Отправлено'){
                    item.classList.add('active');
                }
            })
        }else if(taskData[0].status == 'Отменено'){
            stuses.forEach(item=>{
                if(item.innerHTML == 'Отменить'){
                    item.classList.add('active');
                }
            })
        }else if(taskData[0].status == 'Закрыто'){
            stuses.forEach(item=>{
                if(item.innerHTML == 'Закрыть'){
                    item.classList.add('active');
                }
            })
        }else if(taskData[0].status == 'Готово к отправке'){
            stuses.forEach(item=>{
                if(item.innerHTML == 'Готово к отправке'){
                    item.classList.add('active');
                }
            })
        }else if(taskData[0].status == 'На уточнении'){
            stuses.forEach(item=>{
                if(item.innerHTML == 'Отправить на уточнение'){
                    item.classList.add('active');
                }
            })
        }else if(taskData[0].status == 'На согласовании'){
            stuses.forEach(item=>{
                if(item.innerHTML == 'Отправить на согласование'){
                    item.classList.add('active');
                }
            })
        }else if(taskData[0].status == 'Перенесено'){
            stuses.forEach(item=>{
                if(item.innerHTML == 'Перенести'){
                    item.classList.add('active');
                }
            })
        }else{
            stuses.forEach(item=>{
                if(item.innerHTML == 'В работе'){
                    item.classList.add('active');
                }
            })
        }
        getNewsList(idTask)
        document.querySelector('.listNews').insertAdjacentHTML("afterend", `<div class='addNews' title="Добавить новость"><img src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/addNews.png"></div>`);
        var addNews = document.querySelector('.addNews');
        addNews.addEventListener('click', ()=>{
            var newsID;
            var listNews = [];
            $('.listNews').find('.newsForm').each(function(){
                listNews.push($(this).attr('id'));
            })
            if(listNews){
                newsID = listNews.length;
            }else{
                newsID = 0;
            }
            formEditNews(idTask, 'new', newsID);
        })
    })
}