function getSendNewsData(){
    var news = document.querySelectorAll('.newsForm');
    var itemsNews = [];
    var valid = true;
    if(news.length){
        news.forEach((formEditNews)=>{
            var itemNews = validationNews(formEditNews);
            if(itemNews){
                itemNews.mode = formEditNews.classList[1];
                itemsNews.push(itemNews)
            }else{
                valid = false;
            }
        })
    }else{
        valid = true;
    }
    var notEditedNews = document.querySelectorAll('.contentNews');
    var requestsDataNotEditedNews = [];
    if(notEditedNews.length){
        notEditedNews.forEach(news=>{
            var id = news.getAttribute('id').split('-')[1];
            var status = document.querySelector('.statusTask.active').innerHTML;
            var typeNews = document.querySelector('.typeMessage.active').innerHTML;
            var datePlanedSendNewTask = formatDate(new Date(document.querySelector('.datePlanedSendNewTask').value), 2);
            var performerNews = document.querySelector('.performers select').value;
            var data = {
                "__metadata": { type: METADATA_TYPE_LIST_NEWS },
                "statusNews": status,
                "typeNews": typeNews,
                "datePlanedSend":datePlanedSendNewTask,
                "performer": performerNews
            }
            var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/Items("+ id +")";
            requestsDataNotEditedNews.push(UpdateData(url, data).then(function(data){}));
        })
        Promise.all(requestsDataNotEditedNews).then(data=>{return true})
    }else{
        valid = true;
    }

    if(valid){
        sendNewsData(itemsNews);
        return true;
    }else{
        return false;
    }
}
function validationNews(formEditNews){
    var validNews = true;
    var idNewsForm = formEditNews.getAttribute('id');
    var titleNews = formEditNews.querySelector('.titleNews');
    var descriptionNews = tinymce.get(`descriptionNews-${idNewsForm}`).getContent();
    var selectedProcessesNews = formEditNews.querySelectorAll('.typeProsessNews.active');
    var selectedProcessesNewsList = "";
    var selectedTagsNews = formEditNews.querySelectorAll('.typeProductNews.active');
    var selectedTagsNewsList = "";
    var typeDestination = formEditNews.querySelector('.destinationNews.active');
    var destination;
    var destinationList = "";
    var status = document.querySelector('.statusTask.active');
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
        formEditNews.querySelector('.descriptionNewsContent').classList.add('notValid')
    }else{
        formEditNews.querySelector('.descriptionNewsContent').classList.remove('notValid')
        dataItem.descriptionNews = descriptionNews;
    }

    if(selectedProcessesNews.length == 0){
        validNews = false;
        formEditNews.querySelector('.typesProsessNews').classList.add('notValid')
    }else{
        formEditNews.querySelector('.typesProsessNews').classList.remove('notValid')
        selectedProcessesNews.forEach((item)=>{
            selectedProcessesNewsList +=item.innerHTML+";";
        })
        dataItem.selectedProcessesNewsList = selectedProcessesNewsList
    }

    if(selectedTagsNews.length == 0){
        validNews = false;
        formEditNews.querySelector('.typesProductsNews').classList.add('notValid')
    }else{
        formEditNews.querySelector('.typesProductsNews').classList.remove('notValid')
        selectedTagsNews.forEach((item)=>{
            selectedTagsNewsList +=item.innerHTML+";";
        })
        dataItem.selectedTagsNewsList = selectedTagsNewsList;
    }
    if(typeDestination.innerHTML){
        dataItem.typeDestination = typeDestination.innerHTML;
        if(typeDestination.innerHTML == "Навыка"){
            destination = formEditNews.querySelectorAll('.destinationSelection.active');
            destination.forEach((item)=>{
                destinationList +=item.innerHTML+";";
            })
        }else if(typeDestination.innerHTML == "Выделенных сотрудников"){
            destinationList = formEditNews.querySelector('.destinationUsersList').value;
        }else if(typeDestination.innerHTML == "Группы"){
            destination = formEditNews.querySelectorAll('.destinationSelection.active');
            destination.forEach((item)=>{
                destinationList +=item.getAttribute('id')+";";
            })
        }
        dataItem.destinationList = destinationList;
    }else{
        dataItem.typeDestination = '';
        dataItem.destinationList = destinationList;
    }
    
    if(status.innerHTML == 'Готово к отправке'){
        if(!destinationList) validNews=false;
    }

    dataItem.idNews = idNewsForm;
    dataItem.statusNews = status.innerHTML;
    if(validNews){
        return dataItem
    }else{
        return validNews;
    }
}
function sendNewsData(itemsNews){
    var requestsData = [];
    var urlAttr = location.href.split('#')[1];
    var typeNews = document.querySelector('.typeMessage.active').innerHTML;
    var datePlanedSendNewTask = formatDate(new Date(document.querySelector('.datePlanedSendNewTask').value), 2);
    var performerNews = document.querySelector('.performers select').value;
    itemsNews.forEach(dataItem=>{
        if(dataItem.mode == 'edit'){
            var data = {
                "__metadata": { type: METADATA_TYPE_LIST_NEWS },
                "Title": dataItem.titleNews,
                "descriptionNews": dataItem.descriptionNews,
                "idTask": urlAttr.split('=')[1],
                "processNews": dataItem.selectedProcessesNewsList,
                "productNews": dataItem.selectedTagsNewsList,
                "statusNews": dataItem.statusNews,
                "typeDestination": dataItem.typeDestination,
                "destination":  dataItem.destinationList,
                "typeNews": typeNews,
                "datePlanedSend":datePlanedSendNewTask,
                "performer": performerNews
            }
            var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/Items("+ dataItem.idNews +")";
            requestsData.push(UpdateData(url, data).then(function(data){}));

        }else if(dataItem.mode == 'new'){
            var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/items";
            var data = {
                "__metadata": { type: METADATA_TYPE_LIST_NEWS },
                "Title": dataItem.titleNews,
                "descriptionNews": dataItem.descriptionNews,
                "idTask": urlAttr.split('=')[1],
                "processNews": dataItem.selectedProcessesNewsList,
                "productNews": dataItem.selectedTagsNewsList,
                "statusNews": dataItem.statusNews,
                "typeDestination": dataItem.typeDestination,
                "destination":  dataItem.destinationList,
                "typeNews": typeNews,
                "datePlanedSend":datePlanedSendNewTask,
                "performer": performerNews
            }
            requestsData.push(setData(data, url).then(function(data){}));
        }
    })
    Promise.all(requestsData).then(data=>{return true})
}