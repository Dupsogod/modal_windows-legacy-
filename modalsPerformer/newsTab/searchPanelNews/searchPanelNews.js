function searchPanelNews(){
    var prevewButton = `<div class="buttons">
                            <div class="button showPrevewNotification">Предварительный просмотр</div>
                        </div>`;
    var sendButton = `<div class="buttons">
                            <div class="button sendNotification">Отправить оповещение</div>
                        </div>`;
    var filters = `<div class="searchFilters">
                    <div class="searchStatusNews">
                        <div class="titleFilter">Статус</div>
                        <div class="itemsFilter statusNews">
                            <div class="itemFilterNews statusNewsFilter active">Готово к отправке</div>
                            <div class="itemFilterNews statusNewsFilter">Отправлено</div>
                            <div class="itemFilterNews statusNewsFilter">В работе</div>
                            <div class="itemFilterNews statusNewsFilter">На согласовании</div>
                        </div>
                    </div>
                    <div class="searchTypeNews">
                        <div class="titleFilter">Тип задачи</div>
                        <div class="itemsFilter typeNews">
                            <div class="itemFilterNews typeNewsFilter">Спринт</div>
                            <div class="itemFilterNews typeNewsFilter">Спринт Сервис</div>
                            <div class="itemFilterNews typeNewsFilter">Спринт Продажи</div>
                            <div class="itemFilterNews typeNewsFilter">Спринт Эксперты</div>
                            <div class="itemFilterNews typeNewsFilter">Спринт SME</div>
                            <div class="itemFilterNews typeNewsFilter">Молния</div>
                            <div class="itemFilterNews typeNewsFilter">Пилот</div>
                            <div class="itemFilterNews typeNewsFilter">Релиз</div>
                            <div class="itemFilterNews typeNewsFilter">Релиз Сервис</div>
                            <div class="itemFilterNews typeNewsFilter">Релиз Продажи</div>
                            <div class="itemFilterNews typeNewsFilter">Релиз Эксперты</div>
                            <div class="itemFilterNews typeNewsFilter">Релиз SME</div>
                            <div class="itemFilterNews typeNewsFilter">Другое</div>
                        </div>
                    </div>
                    <div class="searchProcess">
                        <div class="titleFilter">Процесс</div>
                        <div class="itemsFilter processes">
                            <div class="itemFilterNews processNewsFilter">Сервис</div>
                            <div class="itemFilterNews processNewsFilter">Продажи</div>
                            <div class="itemFilterNews processNewsFilter">Эксперты</div>
                            <div class="itemFilterNews processNewsFilter">SME</div>
                            <div class="itemFilterNews processNewsFilter">Общее</div>
                            <div class="itemFilterNews processNewsFilter">Reception</div>
                            <div class="itemFilterNews processNewsFilter">Коммуникация</div>
                        </div>
                    </div>
                    <div class="searchDatePlanedSend">
                        <div class="titleFilter">Срок исполнения</div>
                        c <input type="date" autocomplete="off" class="searchPanel-input-date datePlanedSendStartNews" /> 
                        по <input type="date" autocomplete="off" class="searchPanel-input-date datePlanedSendEndNews" />
                    </div>
                  </div>`;
    var searchPanelNewsItem = document.querySelector('.searchPanelNews');
    searchPanelNewsItem.innerHTML = "";
    searchPanelNewsItem.insertAdjacentHTML('afterbegin', prevewButton + sendButton + filters)
    document.querySelector('.sendNotification').addEventListener('click', ()=>sendNotification());
    document.querySelector('.showPrevewNotification').addEventListener('click', ()=>showPreviewNotification());

    var filters = document.querySelectorAll('.itemFilterNews');
        filters.forEach((filter)=>{
            filter.onclick = function(e){
                e.preventDefault();
                this.classList.toggle("active");
                setModal()
                searchNewsItems()
            }
    })
    document.querySelector('.datePlanedSendStartNews').addEventListener('change', e=>{setModal();searchNewsItems();});
    document.querySelector('.datePlanedSendEndNews').addEventListener('change', e=>{setModal();searchNewsItems();});

}