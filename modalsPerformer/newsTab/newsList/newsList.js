function newsList(filteredNewsList){
    var listNews = document.querySelector(".listNewsModeNews");
        listNews.innerHTML = "";
    if(filteredNewsList){
        showNewsList(filteredNewsList)
    }else{
        var urlGetTaskList = `${REQUEST_URL}_api/web/lists(guid'${LIST_NEWS_GUID}')/items?$orderby=Modified desc&$filter=statusNews eq 'Готово к отправке'`;
        var news = [];
        getNewsList(urlGetTaskList);
        function getNewsList(url){
            getData(url)
            .then((data)=>{
                if(data.d.results.length){
                    data.d.results.forEach((item)=>{
                        news.push(item)
                    })
                    if(data.d.__next){
                        getNewsList(data.d.__next)
                    }else{
                        showNewsList(news)
                    }
                }else{
                    showNewsList(news)
                }
            })
            .fail((err)=>{
                delModal()
                console.log(err.responseJSON.error.message.value)
            })
        }
    }
    function showNewsList(newsList){
        var headNewsList = `<div class='headNewslist'>
                                <div class='selectNews' style="width:25px;"></div>
                                <div class='title'>Название</div>
                                <div class='type'><span class='titleFilter'>Тип задачи</span></div>
                                <div class='performer'><span class='titleFilter'>Исполнитель</span></div>
                                <div class='process'><span class='titleFilter'>Процесс</span></div>
                                <div class='status'><span class='titleFilter'>Статус</span></div>
                                <div class='datePlanedSend'>Срок исполнения</div>
                                <div class='editNewsButton' style="width:25px;"></div>
                            </div>
                            <div class="listNewsItems"></div>`;
        
        listNews.innerHTML = headNewsList;
        var newsItems = "";
        if(!newsList.length){
            delModal()
        }else{
            var listNewsItems = document.querySelector(".listNewsItems");
            newsList.forEach((newsItem)=>{
                var processes = [];
                if(newsItem.processNews){
                    processes = newsItem.processNews.split(";")
                }
                var datePlanedSend = "Не указано";
                if(newsItem.datePlanedSend){
                    datePlanedSend = formatDate(new Date(newsItem.datePlanedSend))
                }
                var typeNews = newsItem.typeNews ? newsItem.typeNews : "Не указан"
                /*<div class='timing'>${timing}</div>*/
                newsItems = `<div class='task' id="${newsItem.Id}">
                                <div class='selectNews'><div id="selectNewsButton-${newsItem.Id}" class='radioSelectNews'></div></div>
                                <div class='title'>${newsItem.Title}</div>
                                <div class='type'>${typeNews}</div>
                                <div class='performer'>${newsItem.performer}</div>
                                <div class='process'>${processes.join()}</div>
                                <div class='status'>${newsItem.statusNews}</div>
                                <div class='datePlanedSend'>${datePlanedSend}</div>
                                <a class='editNewsButton' id="editNewsButton-${newsItem.Id}"><img src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/editTask.png"></a>
                            </div>`;
                listNewsItems.insertAdjacentHTML('beforeend', newsItems);
                document.getElementById(`selectNewsButton-${newsItem.Id}`).addEventListener('click',(e)=>{
                    e.target.classList.toggle('selectedNews');
                })
                document.getElementById(`editNewsButton-${newsItem.Id}`).addEventListener('click',(e)=>{
                    setModal()
                    showItemNews(newsItem)
                })

            })
            delModal()
        }

        function showItemNews(newsItem){
            var modalContent = `<div id="myModal" class="modal-initiator">
                        <div class="modal-content-initiator">
                            <span class="close-initiator close-initiator-up">×</span>
                            <div class="modal-header-initiator">
                                <div class="titleTask-initiator"></div>
                            </div>
                            <div class="modal-body-initiator"><div class='listNews'></div></div>
                            <div class="modal-footer-initiator">
                            </div>
                        </div>
                    </div>`;
            var modalContainer = document.querySelector('.modalContainer');
            modalContainer.innerHTML = modalContent;
            modalContainer.addEventListener('click', (e)=>{
                if(e.target.dataset.item){
                    if(!document.querySelector('.saveNews')){
                        document.querySelector('.modal-footer-initiator').insertAdjacentHTML('afterbegin', '<div class="saveNews dialogButtons">Сохранить</div>')
                    }
                    document.querySelector('.saveNews').addEventListener('click', ()=>{
                        var validNews = true;
                        var titleNews = document.querySelector('.titleNews');
                        var descriptionNews = tinymce.get(`descriptionNews-${newsItem.Id}`).getContent();
                        var selectedProcessesNews = document.querySelectorAll('.typeProsessNews.active');
                        var selectedProcessesNewsList = "";
                        var selectedTagsNews = document.querySelectorAll('.typeProductNews.active');
                        var selectedTagsNewsList = "";
                        var typeDestination = document.querySelector('.destinationNews.active');
                        var destination;
                        var destinationList = "";
                        var dataItem = {};
                        if(!titleNews.value){
                            validNews = false;
                            titleNews.classList.add('notValid');
                        }else{
                            titleNews.classList.remove('notValid');
                            dataItem.titleNews = titleNews.value;
                        }

                        if(!descriptionNews){
                            validNews = false;
                            document.querySelector('.descriptionNewsContent').classList.add('notValid')
                        }else{
                            document.querySelector('.descriptionNewsContent').classList.remove('notValid')
                            dataItem.descriptionNews = descriptionNews;
                        }

                        if(selectedProcessesNews.length == 0){
                            validNews = false;
                            document.querySelector('.typesProsessNews').classList.add('notValid')
                        }else{
                            document.querySelector('.typesProsessNews').classList.remove('notValid')
                            selectedProcessesNews.forEach((item)=>{
                                selectedProcessesNewsList +=item.innerHTML+";";
                            })
                            dataItem.selectedProcessesNewsList = selectedProcessesNewsList
                        }

                        if(selectedTagsNews.length == 0){
                            validNews = false;
                            document.querySelector('.typesProductsNews').classList.add('notValid')
                        }else{
                            document.querySelector('.typesProductsNews').classList.remove('notValid')
                            selectedTagsNews.forEach((item)=>{
                                selectedTagsNewsList +=item.innerHTML+";";
                            })
                            dataItem.selectedTagsNewsList = selectedTagsNewsList;
                        }
                        if(typeDestination.innerHTML){
                            dataItem.typeDestination = typeDestination.innerHTML;
                            if(typeDestination.innerHTML == "Навыка"){
                                destination = document.querySelectorAll('.destinationSelection.active');
                                destination.forEach((item)=>{
                                    destinationList +=item.innerHTML+";";
                                })
                            }else if(typeDestination.innerHTML == "Выделенных сотрудников"){
                                destinationList = document.querySelector('.destinationUsersList').value;
                            }else if(typeDestination.innerHTML == "Группы"){
                                destination = document.querySelectorAll('.destinationSelection.active');
                                destination.forEach((item)=>{
                                    destinationList +=item.getAttribute('id')+";";
                                })
                            }
                            dataItem.destinationList = destinationList;
                        }else{
                            dataItem.typeDestination = '';
                            dataItem.destinationList = destinationList;
                        }
                        var data = {
                            "__metadata": { type: METADATA_TYPE_LIST_NEWS },
                            "Title": dataItem.titleNews,
                            "descriptionNews": dataItem.descriptionNews,
                            "processNews": dataItem.selectedProcessesNewsList,
                            "productNews": dataItem.selectedTagsNewsList,
                            "typeDestination": dataItem.typeDestination,
                            "destination":  dataItem.destinationList,
                        }
                        var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/Items("+ newsItem.Id +")";
                        UpdateData(url, data).then(function(data){
                            var modalInitiator = document.querySelector('.modal-initiator');
                            tinymce.remove();
                            modalInitiator.remove();
                        });
                    })
                }
                
            })
            var closeModal = document.querySelector('.close-initiator-up');
            closeModal.onclick = function(e){
                e.preventDefault();
                var modalInitiator = document.querySelector('.modal-initiator');
                tinymce.remove();
                modalInitiator.remove();
                //setModal()
                //backToTaskList()
            }

            if(newsItem.typeNews == "Молния"){
                showNews(newsItem, "newsTitleLightningFormTask")
            }else if(newsItem.typeNews == "Пилот"){
                showNews(newsItem, "newsTitlePilotFormTask")
            }else{
                showNews(newsItem, "newsTitleOtherFormTask")
            }
            /*var url = REQUEST_URL +"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/items?$filter=Id eq " + newsItem.Id;
            getData(url)
            .then((data)=>{
                if(!data.d.results.length){
                    delModal()
                    return
                }
                data.d.results.forEach(news=>{
                    if(news.typeNews == "Молния"){
                        showNews(news, "newsTitleLightningFormTask")
                    }else if(news.typeNews == "Пилот"){
                        showNews(news, "newsTitlePilotFormTask")
                    }else{
                        showNews(news, "newsTitleOtherFormTask")
                    }
                })
            })*/
        }
        start()
        window.onresize = start;
        function start(){
            var listNews = document.querySelector(".listNewsModeNews");
            listNews.style.width = document.documentElement.clientWidth - 440 + "px";
            var headNewsListElement = document.querySelector(".headNewslist");
            headNewsListElement.style.width = document.documentElement.clientWidth - 440 + "px";
            var mainBox = document.querySelector('#s4-workspace');
            if(mainBox){
                mainBox.style.width = document.documentElement.clientWidth + "px";
            }
        }
    }
}