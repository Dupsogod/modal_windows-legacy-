function searchNewsItems(){
    var selectedFilters = document.querySelectorAll('.active');
    var datePlanedSendStart = document.querySelector('.datePlanedSendStartNews').value;
    var datePlanedSendEnd = document.querySelector('.datePlanedSendEndNews').value;
    var typeNews = [];
    var processes = [];
    var statusNews = [];
    selectedFilters.forEach((filter)=>{
        if(filter.classList.contains("processNewsFilter")){
            processes.push(filter.innerText);
        }else if(filter.classList.contains("statusNewsFilter")){
            statusNews.push(filter.innerText.replace("#", ""));
        }else if(filter.classList.contains("typeNewsFilter")){
            typeNews.push(filter.innerText);
        }
    });
    var queryFilter = "";
    if(processes.length){
        queryFilter += `&$filter=(substringof('${processes.join("', processNews) or substringof('")}', processNews))`;
    }
    if(typeNews.length){
        if(processes.length){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(typeNews eq '${typeNews.join("' or typeNews eq '")}')`;
    }
    if(statusNews.length){
        if(processes.length || typeNews.length){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(statusNews eq '${statusNews.join("' or statusNews eq '")}')`;
    }
    if(datePlanedSendStart){
        if(processes.length || typeNews.length || statusNews.length){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(datePlanedSend ge datetime'${formatDate(new Date(datePlanedSendStart), 2)}')`;
    }
    if(datePlanedSendEnd){
        if(processes.length || typeNews.length || statusNews.length || datePlanedSendStart){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(datePlanedSend le datetime'${formatDate(new Date(datePlanedSendEnd).setDate(new Date(datePlanedSendEnd).getDate()+1), 2)}')`;
    }
    var urlSearchNews = `${REQUEST_URL}_api/web/lists(guid'${LIST_NEWS_GUID}')/items?$orderby=Modified desc${queryFilter}`;
    getFilteredNews(urlSearchNews)
    var filteredNewsList = [];
    function getFilteredNews(url){
        getData(url)
        .then((data)=>{
            if(data.d.results.length){
                data.d.results.forEach((itemNews)=>{
                    filteredNewsList.push(itemNews)
                })
            }else{
                newsList(filteredNewsList);
            }
            if(data.d.__next){
                getFilteredNews(data.d.__next);
            }else{
                newsList(filteredNewsList);
            }
        })
        .fail((err)=>{
            delModal()
            console.log(err.responseJSON.error.message.value)
        })
    }
}