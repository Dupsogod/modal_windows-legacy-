function sendNotification(){
    setModal();
    var selectedNews = document.querySelectorAll('.selectedNews');
    if(!selectedNews.length){
        return;
    }
    var newsId = [];
    selectedNews.forEach((item)=>{
        var itemNews = item.closest('.task');
        var typeNews = itemNews.querySelector('.type').innerHTML;
        if(typeNews == 'Релиз' || typeNews == 'Релиз Сервис' || typeNews == 'Релиз Продажи' || typeNews == 'Релиз Эксперты' || typeNews == 'Релиз SME'|| typeNews == 'Спринт' || typeNews == 'Спринт Сервис' || typeNews == 'Спринт Продажи' || typeNews == 'Спринт Эксперты' || typeNews == 'Спринт SME'){
            newsId.push({Id:item.getAttribute('id').split("-")[1],
                    typeNews: typeNews});
        }else{
            addNotification({Id:item.getAttribute('id').split("-")[1],
            typeNews: typeNews})
        }
    })
    if(newsId.length){
        isNotification(newsId);
    }
    function isNotification(listNewsId){
        var type = "";
        var listId = [];
        listNewsId.forEach(function(NewsId){
            type = NewsId.typeNews;
            listId.push(NewsId.Id);
        })
        var period = new Date();
        var startPeriod = new Date(period.getFullYear(), period.getMonth(), period.getDate(), 3, 0);
        var endPeriod = new Date(period.getFullYear(), period.getMonth(), period.getDate(), 23, 59);
        var filterIdNews = "substringof('"+listId.join("', listNews) or substringof('")+"', listNews)";
        var urlFilterIdNews = REQUEST_URL+"_api/web/lists(guid'"+LIST_NOTIFICATIONS_GUID+"')/items?$filter="+filterIdNews;
        getData(urlFilterIdNews)
        .then(function(data){
            if(data.d.results.length > 0){
                editNotification(data.d.results[0], {typeNews: type, Id: listId});
            }else{
                var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NOTIFICATIONS_GUID+"')/items?$filter=Title eq '"+type+"' and (dateNotification ge datetime'"+formatDate(startPeriod, 2)+"') and (dateNotification le datetime'"+formatDate(endPeriod, 5)+"')";
                getData(url)
                .then(function(data){
                    if(data.d.results.length){
                        editNotification(data.d.results[0], {typeNews: type, Id: listId});
                    }else{
                        var notificationData = {
                            typeNews: type,
                            Id: listId.join(";")
                        }
                        addNotification(notificationData);
                    }
                })
            }
        })
        
    }
    function addNotification(newsData){
        var dateNotification = formatDate(new Date(), 5);
        var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NOTIFICATIONS_GUID+"')/items";
        var data = {
            "__metadata": { type: METADATA_TYPE_LIST_NOTIFICATIONS },
            "Title": newsData.typeNews,
            "dateNotification": dateNotification,
            "listNews": newsData.Id.toString()
        };
        setData(data, url)
        .then(function(dat){
            getDataFromUserSkills(newsData, dat.d);
        })
    }
    function getDataFromUserSkills(newsData, dataNotification){
        var dataUsers = [];
        var url = "/departments/cc/_api/web/lists(guid'"+LIST_USER_SKILLS_GUID+"')/items?&$top=1000";
        getData(url)
        .then(function(data){
            data.d.results.forEach(function(user){
                var dataUserInfo = user.userCCId ? getDataUser(user.userCCId) : {office:""};
                var dataLeaderInfo = user.leaderCCId ? getDataUser(user.leaderCCId) : {login:""};
                dataUsers.push({
                    idUser: user.userCCId,
                    userLogin: user.logUserCC,
                    leaderId: user.leaderCCId,
                    leaderLogin: dataLeaderInfo.login,
                    office: dataUserInfo.office,
                    skillgroup: user.Skills
                });
            })
            addNewsReadingStatistics(newsData, dataNotification, dataUsers)
        })
        //return dataUsers;
    }
    function getDataUser(idUser){
        var dataUser = {};
        var url = "https://intranet.rencredit.ru/_api/web/SiteUserInfoList/items?$filter=ID eq "+idUser;
        getData2(url)
        .then(function(data){
            dataUser = {
                office: data.d.results[0].Office,
                login: data.d.results[0].UserName
            }
        })
        return dataUser;
    }
    function addNewsReadingStatistics(newsData, dataNotification, dataUsers){
        var arrRequests = [];
        dataUsers.forEach(function(user){
            var userlogin = user.userLogin ? user.userLogin : "";
            var userId = user.idUser ? user.idUser.toString() : "";
            var leaderId = user.leaderId ? user.leaderId.toString() : "";
            var leaderLogin = user.leaderLogin ? user.leaderLogin.toString() : "";
            var office = user.office ? user.office.toString() : "";
            var skillsUser = user.skillgroup ? user.skillgroup.toString() : "";
            var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_READING_STATISTICS_GUID+"')/items";
            var data = {
                "__metadata": { type: METADATA_TYPE_LIST_NEWS_READING_STATISTICS },
                "Title": newsData.typeNews,
                "dateNotification": dataNotification.dateNotification,
                "idNews": newsData.Id.toString(),
                "userId": userId,
                "userLogin": userlogin,
                "leaderId": leaderId,
                "leaderLogin": leaderLogin,
                "office": office,
                "idNotification": dataNotification.Id.toString(),
                "status": "Пользователь не авторизовался",
                "skillsUser": skillsUser
            };
            arrRequests.push(setData(data, url).then(function(){}))

        })
        Promise.all(arrRequests).then(()=>{
            clearResults();
            updateStatusNews(newsData.Id.toString())
        })
        
        
    }
    function editNotification(dataNatification, listNews){
        var listIdNewsFromNotification = dataNatification.listNews.split(";");
        var addListIdNews = [];
        var newListIdNews = "";
        listNews.Id.forEach(function(idNews){
            if(listIdNewsFromNotification.indexOf(idNews)==-1){
                addListIdNews.push(idNews);
            }
        })
        if(addListIdNews.length){
            newListIdNews = dataNatification.listNews + ";" + addListIdNews.join(";");
        }else{
            newListIdNews = dataNatification.listNews;
        }

        
        var dateNotification = formatDate(new Date(), 5);
        var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NOTIFICATIONS_GUID+"')/items("+ dataNatification.Id +")";
        var data = {
            
            "__metadata": { type: METADATA_TYPE_LIST_NOTIFICATIONS },
            "listNews": newListIdNews,
            "dateNotification": dateNotification,
        };
        UpdateData(url, data)
        .then(function(){
            updateNewsReadingStatistics(dataNatification.Id, newListIdNews)
        })
    }
    function updateNewsReadingStatistics(idNotification, newListIdNews){
        var dateNotification = formatDate(new Date(), 5);
        var urlGetReadingStatisticsOfNotification = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_READING_STATISTICS_GUID+"')/items?$filter=idNotification eq '" + idNotification +"'&$top=1000";
        var arrRq = [];
        getData(urlGetReadingStatisticsOfNotification)
        .then(function(data){
            data.d.results.forEach(function(item){
                var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_READING_STATISTICS_GUID+"')/items("+item.Id+")";
                var data = {
                    "__metadata": { type: METADATA_TYPE_LIST_NEWS_READING_STATISTICS },
                    "idNews": newListIdNews,
                    "dateNotification": dateNotification,
                    "status": "Пользователь не авторизовался",
                }
                arrRq.push(UpdateData(url, data)
                .then(function(){
                }))
            })
            Promise.all(arrRq).then(()=>{
                clearResults();
                updateStatusNews(newListIdNews);
            })
        })
        
    }
    function clearResults(){
        var endPeriod = new Date();
        var dataResults = [];
        endPeriod.setMonth(endPeriod.getMonth() - 1);
        var urlGetReadingStatisticsOfNotification = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_READING_STATISTICS_GUID+"')/items?$filter=(dateNotification le datetime'"+formatDate(endPeriod, 2)+"')";
        getResultsForClears(urlGetReadingStatisticsOfNotification)
        function getResultsForClears(url){
            getData(url)
            .then(function(data){
                if(data.d.results.length > 0){
                    data.d.results.forEach(function(res){
                        dataResults.push(res);
                    })
                    if(data.d.__next){
                        getResultsForClears(data.d.__next)
                    }else{
                        delResults(dataResults)
                    }
                }
            })
        }
    }
    function delResults(dataResults){
        var arrReq = [];
        dataResults.forEach(function(res){
            var url = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_READING_STATISTICS_GUID+"')/items("+res.Id+")";
            arrReq/push(deleteData(url)
            .then(function(){}));
        })
        Promise.all(arrReq).then(()=>{})
        
    }
    function updateStatusNews(news){
        var listIdNews = news.split(";")
        var arrRequests = [];
        listIdNews.forEach(function(id){
            var data = {
                "__metadata": { type: METADATA_TYPE_LIST_NEWS },
                "statusNews": "Отправлено",
            }
            var urlNews = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/Items("+ id +")";
            arrRequests.push(UpdateData(urlNews, data).then(function(){}))
        })
        Promise.all(arrRequests).then(()=>{updateStatusTask(listIdNews)})
        
    }
    function updateStatusTask(listNews){
        var listTasks = [];
        var arrRq = [];
        listNews.forEach(function(idNews){
            var urlNews = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/Items?$filter=Id eq "+idNews;
            arrRq.push(getData(urlNews)
            .then(function(data){
                listTasks = checkArray(data.d.results[0].idTask, listTasks);
            }))
        })
        Promise.all(arrRq).then(()=>{
            var arrReq = [];
            listTasks.forEach(function(idTask){
                var data = {
                    "__metadata": { type: METADATA_TYPE_LIST_TASKS },
                    "status": "Отправлено",
                }
                var urlTask = REQUEST_URL+"_api/web/lists(guid'"+LIST_TASKS_GUID+"')/Items("+ idTask +")";
                arrReq.push(UpdateData(urlTask, data)
                .then(function(){}))
            })
            Promise.all(arrReq).then(()=>{newsList()})
        })
    }
    function checkArray(item, array){
        if(array.indexOf(item)==-1){
           array.push(item);
        }
        return array;
    }

}