function formTask(idTask){
    var formNewTask = `
        <div class='fieled'>
            <div class='titleFieled'>Инициатор*</div>
            <div class='valueFieled'>
                <div class='initiator-fieled'></div>
            </div>
        </div>
        <div class='fieled'>
            <div class='titleFieled'>Тип задачи*</div>
            <div class='valueFieled'>
                <div class='typesMessage'>
                    <div class='typeMessage sprintTypeTask'>Спринт Сервис</div>
                    <div class='typeMessage sprintTypeTask'>Спринт Продажи</div>
                    <div class='typeMessage sprintTypeTask'>Спринт Эксперты</div>
                    <div class='typeMessage sprintTypeTask'>Спринт SME</div>
                    <div class='typeMessage sprintTypeTask'>Спринт</div>
                </div>
                <div class='typesMessage'>
                    <div class='typeMessage releaseTypeTask'>Релиз Сервис</div>
                    <div class='typeMessage releaseTypeTask'>Релиз Продажи</div>
                    <div class='typeMessage releaseTypeTask'>Релиз Эксперты</div>
                    <div class='typeMessage releaseTypeTask'>Релиз SME</div>
                    <div class='typeMessage releaseTypeTask'>Релиз</div>
                </div>
                <div class='typesMessage'>
                    <div class='typeMessage lightningTypeTask'>Молния</div>
                    <div class='typeMessage pilotTypeTask'>Пилот</div>
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
            <div class='titleFieled'>Вводные по задаче*</div>
            <div class='valueFieled'>
                <div class='descriptionContentOld'></div>
                <div class='descriptionContent'>
                    <textarea rows='5' class='description' id='description'></textarea>
                </div>
            </div>
        </div>
        <div class='fieled'>
            <div class='titleFieled'>Вложения</div>
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
                    <div class='typeProsess selectionButtons'>SME</div>
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
                    <div class='tag selectionButtons'>Эксперты online</div>
                    <div class='tag selectionButtons'>СБП</div>
                    <div class='tag selectionButtons'>Овердрафт</div>
                    <div class='tag selectionButtons'>Transfer</div>
                    <div class='tag selectionButtons'>Курьеры</div>
                    <div class='tag selectionButtons'>WEB</div>
                    <div class='tag selectionButtons'>IL</div>
                    <div class='tag selectionButtons'>Общее</div>
                    <div class='tag selectionButtons'>РКО</div>
                    <div class='tag selectionButtons'>Бизнес-карта</div>
                    <div class='tag selectionButtons'>Нефинансовые сервисы</div>
                    <div class='tag selectionButtons'>Торговый эквайринг</div>
                    <div class='tag selectionButtons'>Интернет-эквайтинг</div>
                    <div class='tag selectionButtons'>Общее SME</div>
                </div>
            </div>
        </div>
        <div class='fieled'>
            <div class='titleFieled'>Учтены ли другие процессы*</div>
            <div class='valueFieled'>
                <label class='switch'>
                    <input type='checkbox' checked class='processesTaken'>
                    <span class='slider round'></span>
                </label>
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
            <div class='valueFieled'>
                <label class='switch'>
                    <input type='checkbox' class='matching'>
                    <span class='slider round'></span>
                </label>
            </div>
        </div>
        <div class='fieled'>
            <div class='titleFieled'>Исполнитель*</div>
            <div class='valueFieled'>
                <div class='performers'></div>
                <p class='promt'>Не нашел в списке нужного имени?<br>Добавить пользователя в список исполнителей можно <a class='linkPromt' href='https://intranet.rencredit.ru/Departments/CC/modalsWin/Lists/performers/AllItems.aspx' target='_blank'>здесь</a></p>
            </div>
        </div>
        <div class='fieled'>
            <div class='titleFieled'>Тайминг*</div>
            <div class='valueFieled'>
                <div class='timings'>
                    <div class='timingTask selectionButtons'>1 час</div>
                    <div class='timingTask selectionButtons'>3 часа</div>
                    <div class='timingTask selectionButtons'>4 часа</div>
                    <div class='timingTask selectionButtons'>6 часов</div>
                    <div class='timingTask selectionButtons'>8 часов</div>
                    <div class='timingTask selectionButtons'>16 часов</div>
                    <div class='timingTask selectionButtons'>24 часа</div>
                    <div class='timingTask selectionButtons'>60 часов</div>
                </div>
            </div>
        </div>
        <div class='fieled'>
            <div class='titleFieled'>Действия с задачей*</div>
            <div class='valueFieled'>
                <div class='statusesTask'>
                    <div class='statusTask selectionButtons' data-action="В работе">В работе</div>
                    <div class='statusTask selectionButtons' data-action="На согласовании">Отправить на согласование</div>
                    <div class='statusTask selectionButtons' data-action="На уточнении">Отправить на уточнение</div>
                    <div class='statusTask selectionButtons' data-action="Готово к отправке">Готово к отправке</div>
                    <div class='statusTask selectionButtons' data-action="Отменено">Отменить</div>
                    <div class='statusTask selectionButtons' data-action="Перенесено">Перенести</div>
                    <div class='statusTask selectionButtons' data-action="Закрыто">Закрыть</div>
                    <div class='statusTask selectionButtons' data-action="Отправлено">Отправлено</div>
                </div>
            </div>
        </div>
        <div class='listNews'></div>`;
    var modalContent = `<div id="myModal" class="modal-initiator">
                        <div class="modal-content-initiator">
                            <span class="close-initiator close-initiator-up">×</span>
                            <div class="modal-header-initiator">
                                <div class="titleTask-initiator">Новая задача</div>
                            </div>
                            <div class="modal-body-initiator"></div>
                            <div class="modal-footer-initiator">
                                <span class="close-initiator close-initiator-down">×</span>
                            </div>
                        </div>
                    </div>`;

    /**/
    var modalContainer = document.querySelector('.modalContainer');
    modalContainer.innerHTML = modalContent;

    var modalBody = document.querySelector('.modal-body-initiator');
    modalBody.innerHTML = formNewTask;

    var url = REQUEST_URL+"_api/web/lists(guid'"+PERFORMERS_GUID+"')/items?";
    var performersListOptions = "";
    getData2(url)
    .then(function(data){
        var dataUser = data.d.results;
        dataUser.forEach(function(user){
            var performer = user;
            if(performer.userLogin == currentUser.UserName){
                performersListOptions += `<option selected value="${performer.userLogin}">${performer.Title}</option>`
            }else{
                performersListOptions += `<option value="${performer.userLogin}">${performer.Title}</option>`
            }
        })
        document.querySelector('.performers').insertAdjacentHTML('afterbegin', `<select>${performersListOptions}</select>`)
    });
    var url = REQUEST_URL+"_api/web/lists(guid'"+CUSTOMERS_GUID+"')/items?";
    getData2(url)
    .then(function(data){
        var customersList = [];
        var dataUser = data.d.results;
            dataUser.forEach(function(user){
            customersList.push(user);
        })
        var customersListOptions = "";
        customersList.forEach(function(customer){
            customersListOptions += '<option value="'+customer.cusLog+'">'+customer.Title+'</option>'
        })
        $('.initiator-fieled').append('<select>'+customersListOptions+'</select>');
    });
        
    


    
    tinymce.init({
        selector: '#description',
        //plugins: ['link', 'table', 'lists', 'code', 'image', ''],
        plugins: ['link', 'table', 'lists', 'code', 'image'],
        table_toolbar: '',
        toolbar: [
            "alignleft aligncenter alignright alignjustify | bullist numlist table image | outdent indent | blockquote | code",
            "undo redo | bold italic underline | fontfamily fontsize forecolor backcolor | link",
            "selectall removeformat"
        ],
        lists_indent_on_tab: true,
        menubar: 'edit insert view format table tools help',
        language: 'ru',
        height: 400,
        gecko_spellcheck:true,
        convert_urls : false,
        relative_urls : false,
        remove_script_host : true,
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
        var timings = document.querySelectorAll('.timingTask');
        timings.forEach((timingTask)=>{
            timingTask.onclick = function(e){
                e.preventDefault();
                var activeTimingTask = document.querySelector('.timingTask.active');
                if(activeTimingTask){
                    activeTimingTask.classList.remove('active');
                }
                this.classList.add('active');
            }
        })
        var status = document.querySelectorAll('.statusTask');
        status.forEach((statusTask)=>{
            statusTask.onclick = function(e){
                e.preventDefault();
                var activeStatusTask = document.querySelector('.statusTask.active');
                if(activeStatusTask){
                    activeStatusTask.classList.remove('active');
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
    var controlButtons = document.querySelector('.modal-footer-initiator');
        controlButtons.insertAdjacentHTML('afterbegin', '<div class="saveTask dialogButtons">Сохранить</div>')
        var saveTask = document.querySelector('.saveTask');
        
    if(idTask){
        showData(idTask)
        saveTask.addEventListener('click', e=>{sendTaskData(idTask, files)})
    }else{
        saveTask.addEventListener('click', e=>{sendTaskData(undefined, files)})
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
    searchTaskItems() ///не сбрасывать фильтры или сбрасывать - подумать
    
}