function taskList(filteredTasKlist){
    if(filteredTasKlist === undefined){return}
    if(filteredTasKlist.length){
        showTaskList(filteredTasKlist)
    }else if(filteredTasKlist === false){
            var urlGetTaskList = `${REQUEST_URL}_api/web/lists(guid'${LIST_TASKS_GUID}')/items?$orderby=Modified desc&$filter=initiator eq '${currentUser.UserName}'`;
            var tasks = [];
            getTaskList(urlGetTaskList);
            function getTaskList(url){
                getData(url)
                .then((data)=>{
                    if(data.d.results.length){
                        data.d.results.forEach((item)=>{
                            tasks.push(item)
                        })
                        if(data.d.__next){
                            getTaskList(data.d.__next)
                        }else{
                            showTaskList(tasks)
                        }
                    }else{
                        showTaskList(tasks)
                    }
                })
                .fail((err)=>{
                    delModal()
                    console.log(err.responseJSON.error.message.value)
                })
            }
    }else if(filteredTasKlist.length == 0){
        showTaskList(filteredTasKlist);
    }
    function showTaskList(tasksList){
        /*<div class='timing'><span class='titleFilter'>Тайминг</span></div> */
        var headTaskList = `<div class='headTaskList'>
                                <div class='editTaskButton' style="width:25px;"></div>
                                <div class='title'>Название</div>
                                <div class='type'><span class='titleFilter'>Тип задачи</span></div>
                                <div class='initiator'><span class='titleFilter'>Инициатор</span></div>
                                <div class='process'><span class='titleFilter'>Процесс</span></div>
                                
                                <div class='datePlanedSend'>Срок исполнения</div>
                                <div class='dateRegistration'>Дата поступления</div>
                                <div class='status'><span class='titleFilter'>Статус</span></div>
                            </div>
                            <div class="listTasksItems"></div>`;
        var listTasks = document.querySelector(".listTasks");
        //listTasks.style.width = document.documentElement.clientWidth - 440 + "px";
        listTasks.innerHTML = headTaskList;
        //var headTaskListElement = document.querySelector(".headTaskList");
        //headTaskListElement.style.width = document.documentElement.clientWidth - 440 + "px";
        var taskItems = "";
        if(!tasksList.length){
            delModal()
        }else{
            tasksList.forEach((task)=>{
                var datePlanedSend = "Не указано";
                if(task.datePlanedSend){
                    datePlanedSend = formatDate(new Date(task.datePlanedSend))
                }
                var dateRegistration = "Не указано";
                if(task.dateRegistration){
                    dateRegistration = formatDate(new Date(task.dateRegistration))
                }
                var processes = [];
                if(task.process){
                    processes = task.process.split(";")
                }
                var typeTask = task.type ? task.type : "Не указан"
                var timing = task.timing ? task.timing : "Не указан";
                /*<div class='timing'>${timing}</div>*/
                var iconEditTask = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-item="${task.Id}"><g fill="none" stroke="#323e48" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621Z"/><path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/></g></svg>`;
                taskItems += `<div class='task' id="${task.Id}">
                                <a class='editTaskButton' href="#idTask=${task.Id}" data-item="${task.Id}"><img data-item="${task.Id}" src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/editTask.png"></a>
                                <div class='title'>${task.Title}</div>
                                <div class='type'>${typeTask}</div>
                                <div class='initiator'>${task.initiator}</div>
                                <div class='process'>${processes.join()}</div>
                                
                                <div class='datePlanedSend'>${datePlanedSend}</div>
                                <div class='dateRegistration'>${dateRegistration}</div>
                                <div class='status'>${task.status}</div>
                            </div>`;
            })
    
            var listTasksItems = document.querySelector(".listTasksItems");
            listTasksItems.innerHTML = taskItems;
            delModal()
            var urlAttr = location.href.split('#')[1];
            if(urlAttr){
                editTask(urlAttr.split('=')[1]);
            }
            listTasksItems.addEventListener('click', e=>{
                    if(!e.target.dataset.item){
                        return;
                    }
                    setModal()
                    editTask(e.target.dataset.item);
            })
        }

        start()
        window.onresize = start;
        function start(){
            var listTasks = document.querySelector(".listTasks");
            listTasks.style.width = document.documentElement.clientWidth - 440 + "px";
            var headTaskListElement = document.querySelector(".headTaskList");
            headTaskListElement.style.width = document.documentElement.clientWidth - 440 + "px";
            var mainBox = document.querySelector('#s4-workspace');
            if(mainBox){
                mainBox.style.width = document.documentElement.clientWidth + "px";
            }
        }
    }
    
}