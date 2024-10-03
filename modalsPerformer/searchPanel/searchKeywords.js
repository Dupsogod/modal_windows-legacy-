function searchOfKeywords(filteredTasks){
    const keywords = document.querySelector('.keywords').value;
    if(!keywords.length){
        delModal();
        return;
    }
    document.querySelector('.clearKyewords').style.visibility = 'visible';
    var listTasks = [];
    if(filteredTasks.length){
        const urlRequestNewsList = `${REQUEST_URL}_api/web/lists(guid'${LIST_NEWS_GUID}')/items?$orderby=Modified desc`;
        listTasks = filteredTasks;
        getListNews(urlRequestNewsList)
    }else{
        const myTasks = document.querySelector('.matchingTask').checked;
        var filter = myTasks ? "" : `&$filter=initiator eq '${currentUser.UserName}'`;
        const urlRequestTaslList = `${REQUEST_URL}_api/web/lists(guid'${LIST_TASKS_GUID}')/items?$orderby=Modified desc ${filter}`;
        getListTasks(urlRequestTaslList);
    }
    function getListTasks(url){
        getData(url)
        .then(data=>{
            if(data.d.results.length){
                data.d.results.forEach(itemTask=>{
                    listTasks.push(itemTask);
                })
                if(data.d.__next){
                    getListTasks(data.d.__next)
                }else{
                    const urlRequestNewsList = `${REQUEST_URL}_api/web/lists(guid'${LIST_NEWS_GUID}')/items?$orderby=Modified desc`;
                    getListNews(urlRequestNewsList)
                }
            }else{
                taskList(listTasks)
            }
        })
        .fail((err)=>{
            console.log(err.responseJSON.error.message.value)
        })
    }
    var listNews = [];
    function getListNews(url){
        getData(url)
        .then(data=>{
            if(data.d.results.length){
                data.d.results.forEach(itemTask=>{
                    listNews.push(itemTask);
                })
                if(data.d.__next){
                    getListNews(data.d.__next)
                }else{
                    flterKeywords(listTasks, listNews)
                }
            }else{
                taskList(listTasks)
            }
        })
    }
    function flterKeywords(listTasks, listNews){
        var listFilteredNewsOfKeywords = [];
        listNews.forEach((itemNews)=>{
            if(itemNews.Title && itemNews.descriptionNews){
                if(itemNews.Title.toLowerCase().includes(keywords.toLowerCase()) || itemNews.descriptionNews.toLowerCase().includes(keywords.toLowerCase())){
                    listFilteredNewsOfKeywords.push(itemNews)
                }
            }
        })
        var findedListTask = [];
        listTasks.forEach((item)=>{
            if(item.Title.toLowerCase().includes(keywords.toLowerCase()) || item.description.toLowerCase().includes(keywords.toLowerCase())){
                findedListTask.push(item);
            }
        })
        listFilteredNewsOfKeywords.forEach(itemNews=>{
            var additionalTask = listTasks.find(task=>itemNews.idTask === task.Id.toString());
            if(additionalTask){findedListTask.push(additionalTask)}
        })
        taskList(findedListTask);
    }
    //delModal();
}