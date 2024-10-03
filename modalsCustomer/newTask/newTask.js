function newTask(){
    var formNewTask = `<div class='fieled'>
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
        </div>
        <div class='fieled'>
        <div class='titleFieled'>Тема*</div>
        <div class='valueFieled'>
            <input type='text' class='theme' placeholder='Укажите краткую тему задачи' />
        </div>
        </div>
        <div class='fieled'>
        <div class='titleFieled'>Описание*</div>
        <div class='valueFieled'>
            <div class='descriptionContent'>
                <textarea rows='5' class='description' id='description'></textarea>
                <div class='attachmentsList'>
                    <input type="file" class="attachments" id="file" multiple>
                </div>
                <div class='addFiles dialogButtons'> + <img src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/file.png"></div>
                <div class="preview"></div>
            </div>
        </div>
    </div>
    <div class='fieled'>
    <div class='titleFieled'>Дата подготовки*</div>
    <div class='valueFieled'>
        <input type='date' class='datePlanedSendNewTask' />
    </div>
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
            <div class='processTaken yes active selectionButtons'>Да</div>
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
    </label></div></div>`;
    var modalContent = `<div id="myModal" class="modal-initiator">
                            <div class="modal-content-initiator">
                                <span class="close-initiator close-initiator-up">×</span>
                                <div class="modal-header-initiator">
                                    <div class="titleTask-initiator">Новая задача</div>
                                </div>
                                <div class="modal-body-initiator"></div>
                                <div class="modal-footer-initiator">
                                    <div class="sendNewTask dialogButtons">Сохранить</div>
                                    <span class="close-initiator close-initiator-down">×</span>
                                </div>
                            </div>
                        </div>`;
    var modalContainer = document.querySelector('.modalContainer');
    modalContainer.innerHTML = modalContent;

    var modalBody = document.querySelector('.modal-body-initiator');
    modalBody.innerHTML = formNewTask;
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
        height: 600,
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
                    preveiw.insertAdjacentHTML( 'afterbegin', `<div class="preview-file" title="${file.name}">
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
        setModal()
        backToTaskList()
    }
    var closeModalDown = document.querySelector('.close-initiator-down');
    closeModalDown.onclick = function(e){
        e.preventDefault();
        setModal()
        backToTaskList()
    }
    var sendTask = document.querySelector('.sendNewTask');
    sendTask.addEventListener('click', e => {
        setModal();
        var item = validation();
        if(item){
            var data = {
                    "__metadata": { type: METADATA_TYPE_LIST_TASKS },
                    "Title": item.title,
                    "datePlanedSend": item.datePlanedSend,
                    "dateRegistration": item.dateRegistration,
                    "description": item.description,
                    "initiator": item.initiator,
                    "matching": item.matching,
                    "process": item.processes,
                    "status": "Новая задача",
                    "takenProcess": item.takenProcess,
                    "type": item.type,
                    "tags": item.tags,
                    "additinalInitiators": item.additinalIntiators
                };
            var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_TASKS_GUID+"')/items";
            setData(data, url)
            .then(function(data){
                var itemId =  data.d.ID;
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
                            backToTaskList();
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
                    backToTaskList()
                }
            })
        }else{
            delModal()
        }
    })
}
function backToTaskList(){
    var modalInitiator = document.querySelector('.modal-initiator');
    tinymce.remove();
    modalInitiator.remove();
    searchTaskItems()
}
function validation(){
    var valid = true;
    var item = {};
    var titleTask = document.querySelector('.theme');
    var descriptionTaskContent = tinymce.get('description').getContent();
    var datePlanedSendNewTask = document.querySelector('.datePlanedSendNewTask');
    var matching = document.querySelector('.matching');
    var processes = document.querySelectorAll('.typeProsess.active');
    var tags = document.querySelectorAll('.tag.active');
    var takenProcess = document.querySelector('.processTaken.active');
    var type = document.querySelector('.typeMessage.active');
    var additinalIntiators = document.querySelector('.additinalIntiators');

    if(!titleTask.value){
        valid = false;
        titleTask.classList.add('notValid');
    }else{
        titleTask.classList.remove('notValid');
    }

    var types = document.querySelector('.typesMessage');
    if(!type){
        valid = false;
        types.classList.add('notValid');
    }else{
        types.classList.remove('notValid');
    }

    var descriptionContent = document.querySelector('.descriptionContent');
    if(!descriptionTaskContent){
        valid = false;
        descriptionContent.classList.add('notValid');
    }else{
        descriptionContent.classList.remove('notValid');
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
    if(valid){
        item.title = titleTask.value;
        item.description = currentUser.UserName + " (" + formatDate(new Date(), 4) + ")" + " - " + descriptionTaskContent;
        item.dateRegistration = formatDate(new Date(), 2);
        item.datePlanedSend = formatDate(new Date(datePlanedSendNewTask.value), 2);
        item.additinalIntiators = additinalIntiators ? additinalIntiators.value : "";
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
        item.initiator = currentUser.UserName;
        return item;
    }else{
        return valid;
    }
}
