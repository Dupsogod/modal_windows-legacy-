function editTask(idTask){
    var formNewTask = `<div class='fieled'><div class='titleFieled'>Инициатор</div>
    <div class='valueFieled'><div class='initiator-fieled'></div></div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Тип задачи*</div>
    <div class='valueFieled'>
        <div class='typesMessage'>
            <div class='typeMessage sprintTypeTask'>Спринт</div>
            <div class='typeMessage lightningTypeTask'>Молния</div>
            <div class='typeMessage pilotTypeTask'>Пилот</div>
            <div class='typeMessage releaseTypeTask'>Релиз</div>
            <div class='typeMessage otherTypeTask'>Другое</div>
        </div>
    </div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Вводные по задаче</div>
    <div class='valueFieled'>
        <div class='descriptionContentOld'></div>
        <div class='descriptionContent'>
            <textarea rows='5' class='description' id='description'></textarea>
        </div>
    </div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Добавленные файлы</div>
    <div class='valueFieled'>
        <div class='attachmentsList'></div>
        <div class="savedAttachments"></div>
        <div class='attachmentsList'>
            <input type="file" class="attachments" id="file" multiple>
        </div>
        <div class='addFiles dialogButtons2'> + <img src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/file.png"></div>
        <div class="preview"></div>
    </div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Дата подготовки*</div>
    <div class='valueFieled'><input type='date' class='datePlanedSendNewTask' /></div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Процесс*</div>
    <div class='valueFieled'>
        <div class='typesProsess'>
            <div class='typeProsess selectionButtons'>Сервис</div>
            <div class='typeProsess selectionButtons'>Продажи</div>
            <div class='typeProsess selectionButtons'>Эксперты</div>
            <div class='typeProsess selectionButtons'>Общее</div>
            <div class='typeProsess selectionButtons'>Коммуникация</div>
            <div class='typeProsess selectionButtons'>Reception</div>
        </div>
    </div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Теги*</div>
    <div class='valueFieled'>
        <div class='tags'>
            <div class='tag selectionButtons'>Кредиты</div>
            <div class='tag selectionButtons'>Карты</div>
            <div class='tag selectionButtons'>Вклады</div>
            <div class='tag selectionButtons'>Чаты</div>
            <div class='tag selectionButtons'>Брокеридж</div>
            <div class='tag selectionButtons'>МКК</div>
            <div class='tag selectionButtons'>X-Sell</div>
            <div class='tag selectionButtons'>Direct</div>
            <div class='tag selectionButtons'>Курьеры</div>
            <div class='tag selectionButtons'>WEB</div>
            <div class='tag selectionButtons'>Общее</div>
        </div>
    </div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Учтены ли другие процессы*</div>
    <div class='valueFieled'>
        <div class='processesTaken'>
            <div class='processTaken yes selectionButtons'>Да</div>
            <div class='processTaken no selectionButtons'>Нет</div>
        </div>
    </div>
    </div>
    <div class='fieled'>
        <div class='titleFieled'>Дополнительные адресаты</div>
        <div class='valueFieled'>
            <input type='text' class='additinalIntiators' placeholder='Укажите дополнительных адресатов по задаче через ; в формате ИмяПользователя@rencredit.ru;ИмяРассылки@rencredit.ru' />
        </div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Согласование*</div>
    <div class='valueFieled'><label class='switch'>
    <input type='checkbox' class='matching'>
    <span class='slider round'></span>
    </label></div>
    </div>
    <div class='listNews'></div>`;
    var modalContent = `<div id="myModal" class="modal-initiator">
                            <div class="modal-content-initiator">
                                <span class="close-initiator close-initiator-up">×</span>
                                <div class="modal-header-initiator">
                                    <div class="titleTask-initiator"></div>
                                </div>
                                <div class="modal-body-initiator">${formNewTask}</div>
                                <div class="modal-footer-initiator">
                                    <div class="cancelTask dialogButtons">Отменить задачу</div>
                                    <div class="rescheduledTask dialogButtons">Перенести задачу</div>
                                    <span class="close-initiator close-initiator-down">×</span>
                                </div>
                            </div>
                        </div>`;
    var modalContainer = document.querySelector('.modalContainer');
    modalContainer.innerHTML = modalContent;
    
    tinymce.init({
        selector: '#description',
        plugins: ['link', 'table', 'lists', 'code', 'image', ''],
        table_toolbar: '',
        toolbar: [
            "alignleft aligncenter alignright alignjustify | bullist numlist table image | outdent indent | blockquote | code",
            "undo redo | bold italic underline | fontselect fontsizeselect forecolor backcolor | link"
        ],
        lists_indent_on_tab: true,
        menubar: 'edit insert view format table tools help',
        language: 'ru',
        height: 300,
        gecko_spellcheck:true,
        convert_urls : false,
        relative_urls : false,
        remove_script_host : false,
        file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
        
            input.onchange = function () {
              var file = this.files[0];
              var reader = new FileReader();
              reader.onload = function () {
                var id = 'blobid' + (new Date()).getTime();
                var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
        
            input.click();
          }
      });
    addActiveStatusMultiple()
    function addActiveStatusMultiple(){ //клик по фильтрам
        var typesProsesses = document.querySelectorAll('.typeProsess');
        typesProsesses.forEach((filter)=>{
            filter.onclick = function(e){
                e.preventDefault();
                this.classList.toggle("active");
            }
        })
        var tags = document.querySelectorAll('.tag');
        tags.forEach((filter)=>{
            filter.onclick = function(e){
                e.preventDefault();
                this.classList.toggle("active");
            }
        })
    }
    setActiveStatus()
    function setActiveStatus(){
        var typesMessage = document.querySelectorAll('.typeMessage');
        typesMessage.forEach((typeMessage)=>{
            typeMessage.onclick = function(e){
                e.preventDefault();
                var activeTypeMessage = document.querySelector('.typeMessage.active');
                if(activeTypeMessage){
                    activeTypeMessage.classList.remove('active');
                }
                this.classList.add('active');
            }
        })
        var processesTaken = document.querySelectorAll('.processTaken');
        processesTaken.forEach((processTaken)=>{
            processTaken.onclick = function(e){
                e.preventDefault();
                var activeProcessTaken = document.querySelector('.processTaken.active');
                if(activeProcessTaken){
                    activeProcessTaken.classList.remove('active');
                }
                this.classList.add('active');
            }
        })
    }
    var addFiles = document.querySelector('.addFiles');
    addFiles.addEventListener('click', (event)=>{
        event.preventDefault();
        var input = document.querySelector('#file');
        input.click();
    })
    var files = [];
    var inputAttachments = document.querySelector('#file');
    inputAttachments.addEventListener('change', (event)=>{
        event.preventDefault();
        if(!event.target.files.length){
            return;
        }

        if(!files.length){
            files = Array.from(event.target.files);
        }else{
            files = files.concat(Array.from(event.target.files));
        }
        var preveiw = document.querySelector('.preview');
        preveiw.addEventListener('click', e => {
            if(!e.target.dataset.name){
                return;
            }

            var {name} = e.target.dataset;
            files = files.filter(file => file.name !== name)

            var block = preveiw
                .querySelector(`[data-name="${name}"]`)
                .closest('.preview-file')
            block.classList.add('removing');
            setTimeout(()=>block.remove(), 300)
        })
        preveiw.innerHTML = '';
        files.forEach(file =>{
            if(file.size >= 104857600){
                alert(`Файл "${file.name}" имеет объем более 100 МБ и не может быть загружен.`);
                return;
            }else{
                var reader = new FileReader();
                reader.onload = e => {
                    //var codeFile = e.target.result;
                    preveiw.insertAdjacentHTML( 'beforeend', `<div class="preview-file" title="${file.name}">
                            <div class="preview-remove" data-name="${file.name}">&times;</div>
                            <img src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/file.png">
                            <div class="preview-info">
                                <div class="preview-info-name">${file.name}</div>
                                <div class="preview-info-size">${formatBytes(file.size)}</div>
                            </div>
                        </div>`)
                }

                reader.readAsDataURL(file);
            }
        })
    })
    var closeModal = document.querySelector('.close-initiator-up');
    closeModal.onclick = function(e){
        e.preventDefault();
        var modalInitiator = document.querySelector('.modal-initiator');
        tinymce.remove();
        modalInitiator.remove();
        var urlAttr = location.href.split('#')[1];
        if(urlAttr){
            window.location.hash = '';
        }
        setModal()
        searchTaskItems()
    }
    var closeModalDown = document.querySelector('.close-initiator-down');
    closeModalDown.onclick = function(e){
        e.preventDefault();
        var modalInitiator = document.querySelector('.modal-initiator');
        tinymce.remove();
        modalInitiator.remove();
        var urlAttr = location.href.split('#')[1];
        if(urlAttr){
            window.location.hash = '';
        }
        setModal()
        searchTaskItems()
    }
    var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_TASKS_GUID+"')/items?$filter=Id eq " + idTask;
    getData(url)
    .then(data=>{
        var taskData = data.d.results;
        var type = document.querySelectorAll('.typeMessage');
        if(taskData[0].type){
            type.forEach(item=>{
                if(item.innerHTML == taskData[0].type){
                    item.classList.add('active');
                }
            })
        }

        var titleTask = document.querySelector('.titleTask-initiator');
        titleTask.innerHTML = `${taskData[0].Title}<span class='statusTaskTitle'> - ${taskData[0].status}</span>`;

        var initiator = document.querySelector('.initiator-fieled');
        initiator.innerHTML = taskData[0].initiator;

        var description = document.querySelector('.descriptionContentOld');
        description.innerHTML = taskData[0].description;
        if(taskData[0].status == "Отправлено" || taskData[0].status == "Отменено" || taskData[0].status == "Закрыто"){
            var descriptionContent = document.querySelector('.descriptionContent');
            tinymce.remove();
            descriptionContent.style.display = "none";
        }
        var datePlanedSendNewTask = document.querySelector('.datePlanedSendNewTask');
        datePlanedSendNewTask.value = formatDate(new Date(taskData[0].datePlanedSend), 1)
        /*datePlanedSendNewTask.addEventListener('change', (e)=>{
            console.log(e.target);
        })*/

        var matching = document.querySelector('.matching');
        if(taskData[0].matching == "Да"){
            matching.checked = true;
        }else{
            matching.checked = false;
        }

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

        var takenProcess = document.querySelectorAll('.processTaken');
        takenProcess.forEach(takenProcItem=>{
            if(takenProcItem.innerText == taskData[0].takenProcess){
                takenProcItem.classList.add('active');
                if(taskData[0].takenProcess == "Другое"){
                    var takenProcessComment = document.querySelector('.descriptionProcessTeken');
                    takenProcessComment.style.display = 'block';
                    takenProcessComment.value = taskData[0].takenProcessComment;
                }
            }
        })
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
        if(taskData[0].additinalInitiators){
            var additinalInitiators = document.querySelector('.additinalIntiators');
            additinalInitiators.value = taskData[0].additinalInitiators;
        }
        var statuses = [
            {
                statusIn: "Новая задача",
                statusOut: "Сохранить изменения"
            },
            {
                statusIn: "В работе",
                statusOut: "Внести уточнения"
            },
            {
                statusIn: "Внесены уточнения",
                statusOut: "Внести уточнения"
            },
            {
                statusIn: "На уточнении",
                statusOut: "Внести уточнения"
            },
            {
                statusIn: "На согласовании",
                statusOut: "Внести уточнения"
            },
            {
                statusIn: "На согласовании",
                statusOut: "Согласовать"
            },
            {
                statusIn: "Отправлено",
                statusOut: ""
            },
            {
                statusIn: "Отменено",
                statusOut: ""
            },
            {
                statusIn: "Закрыто",
                statusOut: ""
            },
            {
                statusIn: "Согласовано",
                statusOut: "Внести уточнения"
            },
            {
                statusIn: "Перенесено",
                statusOut: "Внести уточнения"
            },
            {
                statusIn: "Готово к отправке",
                statusOut: "Внести уточнения"
            },
        ]
        var buttonsOfStatuses = statuses.filter(status=>status.statusIn == taskData[0].status);
        if(taskData[0].status == "Отправлено" || taskData[0].status == "Отменено" || taskData[0].status == "Закрыто"){
            var cancelTaskButton = document.querySelector('.cancelTask');
            cancelTaskButton.style.visibility = "hidden";
            var rescheduledTaskButton = document.querySelector('.rescheduledTask');
            rescheduledTaskButton.style.visibility = "hidden";

        }
        var controlButtons = document.querySelector('.modal-footer-initiator');
        buttonsOfStatuses.forEach(status=>{
            if(!status.statusOut){
                return;
            }
            controlButtons.insertAdjacentHTML('afterbegin', `<div class="dialogButtons" data-status="${status.statusOut}">${status.statusOut}</div>`);
        })
        var dialogButtons = document.querySelectorAll('.dialogButtons');
        dialogButtons.forEach(button=>{
            button.addEventListener('click', e=>{saveChanges(e.target, idTask, files)})
        })
        getNewsList(idTask)
    })
}