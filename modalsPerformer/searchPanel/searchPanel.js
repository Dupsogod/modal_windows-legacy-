function searchPanel(){
    /*
    <div class="searchCustomer">
                        <div class="titleFilter">Инициатор</div>
                        <div class="itemsFilter customers"></div>
                    </div>
    <div class="searchPerformers">
                        <div class="titleFilter">Исполнитель</div>
                        <div class="itemsFilter performers"></div>
                    </div>
    <div class="searchStatus">
                        <div class="titleFilter">Статус</div>
                        <div class="itemsFilter statuses">
                            <div class="itemFilter statusFilter">Новая задача</div>
                            <div class="itemFilter statusFilter">В работе</div>
                            <div class="itemFilter statusFilter">На согласовании</div>
                            <div class="itemFilter statusFilter">Согласовано</div>
                            <div class="itemFilter statusFilter">На уточнении</div>
                            <div class="itemFilter statusFilter">Внесены уточнения</div>
                            <div class="itemFilter statusFilter">Готово к отправке</div>
                            <div class="itemFilter statusFilter">Отправлено</div>
                            <div class="itemFilter statusFilter">Перенесено</div>
                            <div class="itemFilter statusFilter">Отменено</div>
                            <div class="itemFilter statusFilter">Закрыто</div>
                        </div>
                    </div>
    */
    var panel = `<div class="buttons">
                    <div class="button addTask">Добавить задачу</div>
                    <label class='switchTask'>
                        <input type='checkbox' class='matchingTask'>
                        <span class='sladerTask round'></span>
                    </label>
                </div>
                <div class="searchFilters">
                    <div class="searchKeyWords">
                        <!--<div class="titleFilter">Поиск по ключевым словам</div>-->
                        <input type="text" autocomplete="off" placeholder="Поиск по ключевым словам" class="searchPanel-input keywords" /><div class="searchTask"><img src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/search.png"></div>
                        <span class="clearKyewords">×</span>
                    </div>
                    <div class="searchTypeTask">
                        
                        <div class="titleFilter">Тип задачи</div>
                        <div class="itemsFilter typeTask">
                            <div class="itemFilter typeTaskFilter">Спринт</div>
                            <div class="itemFilter typeTaskFilter">Спринт Сервис</div>
                            <div class="itemFilter typeTaskFilter">Спринт Продажи</div>
                            <div class="itemFilter typeTaskFilter">Спринт Эксперты</div>
                            <div class="itemFilter typeTaskFilter">Спринт SME</div>
                            <div class="itemFilter typeTaskFilter">Молния</div>
                            <div class="itemFilter typeTaskFilter">Пилот</div>
                            <div class="itemFilter typeTaskFilter">Релиз</div>
                            <div class="itemFilter typeTaskFilter">Релиз Сервис</div>
                            <div class="itemFilter typeTaskFilter">Релиз Продажи</div>
                            <div class="itemFilter typeTaskFilter">Релиз Эксперты</div>
                            <div class="itemFilter typeTaskFilter">Релиз SME</div>
                            <div class="itemFilter typeTaskFilter">Другое</div>
                        </div>
                    </div>
                    <div class="searchProcess">
                        <div class="titleFilter">Процесс</div>
                        <div class="itemsFilter processes">
                            <div class="itemFilter processFilter">Сервис</div>
                            <div class="itemFilter processFilter">Продажи</div>
                            <div class="itemFilter processFilter">Эксперты</div>
                            <div class="itemFilter processFilter">SME</div>
                            <div class="itemFilter processFilter">Общее</div>
                            <div class="itemFilter processFilter">Reception</div>
                            <div class="itemFilter processFilter">Коммуникация</div>
                        </div>
                    </div>
                    <div class="searchProduct">
                        <div class="titleFilter">Теги</div>
                        <div class="itemsFilter products">
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Кредиты</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Карты</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Вклады</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Чаты</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Брокеридж</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>МКК</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Эксперты online</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>СБП</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Овердрафт</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Курьеры</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>WEB</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>IL</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Общее</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>РКО</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Бизнес-карта</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Нефинансовые сервисы</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Торговый эквайринг</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Интернет-эквайтинг</div>
                            <div class="itemFilter productFilter"><span class='hashtagCustomersInterface'>#</span>Общее SME</div>
                        </div>
                    </div>
                    <div class="searchDatePlanedSend">
                        <div class="titleFilter">Срок исполнения</div>
                        c <input type="date" autocomplete="off" class="searchPanel-input-date datePlanedSendStart" /> 
                        по <input type="date" autocomplete="off" class="searchPanel-input-date datePlanedSendEnd" />
                    </div>
                    <div class="searchRegistration">
                        <div class="titleFilter">Дата поступления</div>
                        c <input type="date" autocomplete="off" class="searchPanel-input-date dateRegistrationStart" /> 
                        по <input type="date" autocomplete="off" class="searchPanel-input-date dateRegistrationEnd" />
                    </div>
                    <div class="buttons">
                        <div class="button clearFilters" title="Сброс фильтров">Сброс фильтров</div>
                    </div>
                </div>`;
    var searchPanelElement = document.querySelector('.searchPanel');
    searchPanelElement.innerHTML = panel;
    const sliderTasks = document.querySelector('.matchingTask');
    sliderTasks.addEventListener('change', e=>{
        setModal()
        searchTaskItems()
    })

    addActiveStatus()
    function addActiveStatus(){ //клик по фильтрам
        var filters = document.querySelectorAll('.itemFilter');
        filters.forEach((filter)=>{
            filter.onclick = function(e){
                e.preventDefault();
                this.classList.toggle("active");
                setModal()
                searchTaskItems()
            }
        })
    }
    document.querySelector('.keywords').addEventListener('keyup', function(event) { 
        event.preventDefault(); 
        if (event.keyCode === 13) { 
            setModal()
            searchTaskItems()
            //searchOfKeywords()
            //поиск по ключевым словам
        }
    })
    
    var searchTaskButton = document.querySelector('.searchTask') //клик по кнопке поиск задачи
    searchTaskButton.onclick = function(e){
        e.preventDefault();
        setModal()
        searchTaskItems()
        //searchOfKeywords()
    }
    var newTaskButton = document.querySelector('.addTask') //клик по кнопке новая задача
    newTaskButton.onclick = function(e){
        e.preventDefault();
        //newTask()
        formTask()
    }
    document.querySelector('.datePlanedSendStart').addEventListener('change', e=>{setModal();searchTaskItems();});
    document.querySelector('.datePlanedSendEnd').addEventListener('change', e=>{setModal();searchTaskItems();});
    document.querySelector('.dateRegistrationStart').addEventListener('change', e=>{setModal();searchTaskItems();});
    document.querySelector('.dateRegistrationEnd').addEventListener('change', e=>{setModal();searchTaskItems();});

    var clearFilters = document.querySelector('.clearFilters') //сброс фильтров
    clearFilters.onclick = function(e){
        e.preventDefault();
        setModal()
        var filters = document.querySelectorAll('.itemFilter');
        filters.forEach((filter)=>{
            filter.classList.remove('active');
        })
        document.querySelector('.matchingTask').checked = false;
        //document.querySelector('.keywords').value = "";
        document.querySelector('.datePlanedSendStart').value = "";
        document.querySelector('.datePlanedSendEnd').value = "";
        document.querySelector('.dateRegistrationStart').value = "";
        document.querySelector('.dateRegistrationEnd').value = "";
        taskList(false);
    }

    const clearKyewords = document.querySelector('.clearKyewords');
    clearKyewords.addEventListener('click', e=>{
        setModal()
        document.querySelector('.keywords').value = "";
        document.querySelector('.clearKyewords').style.visibility = 'hidden';
        searchTaskItems()
    })
        
    
}