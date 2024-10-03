function getNewsList(idTask){
    var url = REQUEST_URL +"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/items?$filter=idTask eq " + idTask;
    getData(url)
    .then(data=>{
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
    })
}