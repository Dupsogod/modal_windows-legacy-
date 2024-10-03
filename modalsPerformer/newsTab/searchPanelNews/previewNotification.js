function showPreviewNotification(){
    var selectedNews = document.querySelectorAll('.selectedNews');
    if(!selectedNews.length){
        return;
    }
    var newsId = [];
    var listNewsData = [];
    var i = 0;
    for (var j = selectedNews.length; j > 0; j--){
        var item = selectedNews[j-1];
        var itemNews = item.closest('.task');
        var typeNews = itemNews.querySelector('.type').innerHTML;
        newsId.push({
            Id:item.getAttribute('id').split("-")[1],
            typeNews: typeNews
        });   
    }
    getNewsData(i)
    function getNewsData(i){
        
        if(i >= newsId.length){showNews(listNewsData);return}
        var urlRequest = REQUEST_URL+"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/items?$filter=Id eq "+newsId[i].Id;
        getData(urlRequest)
        .then(data=>{
            var dataNews = data.d.results[0];
            listNewsData.push({
                title: dataNews.Title,
                descriptionNews: dataNews.descriptionNews,
                processNews: dataNews.processNews,
                productNews: dataNews.productNews,
                statusNews: dataNews.statusNews,
                typeDestination: dataNews.typeDestination,
                priorityNews: dataNews.priorityNews,
                destination: dataNews.destination,
                typeNews: dataNews.typeNews,
                id: dataNews.Id
            })
            getNewsData(++i)
        })
    }
    function showNews(newsData, dateNotification){
        var isModal = document.querySelector('.modalNotification');
        if(isModal){return}
        if(newsData.length == 1){
            showNewsWithoutAnnounsment(newsData)
        }else if(newsData.length > 1){
            if(newsData[0].typeNews == "Спринт Сервис" || newsData[0].typeNews == "Релиз Сервис"){
                showSprintService(newsData)
            }else{
                showNewsWithAnnounsment(newsData)
            }
            
        }
    }

    function showNewsWithoutAnnounsment(newsData){
        var content = "";
        var typeNews = "";
        var stylesTitles = {};
        newsData.forEach(function(news){
            typeNews = news.typeNews;
            stylesTitles = getStyleTypeNews(typeNews);
            content += getNewsContent(news, 'oneNews');
        })
        var modalContent = `<div id="myModalNotification" class="modalNotification">
                                <div class="modal-content" style="height: ${heightModalWin()}px">
                                    <div class="modal-header">
                                        <div class="titleTask"></div>
                                        <span class="closeNotification">×</span>
                                    </div>
                                    <div class="modal-body">
                                        <div class="${stylesTitles.newsStyleTypeNews}">${typeNews}</div>
                                        <div class="newsHeaderTime"></div>
                                        <div class="listNewsFullArchive" style="height: ${heightModalContent()}px">
                                            ${content}
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                    </div>
                                </div></div>`;
        
        document.querySelector('body').insertAdjacentHTML('afterend', modalContent);
        document.querySelector('.closeNotification').addEventListener('click', e=>{
            document.querySelector('#myModalNotification').remove();
        })
    }
    function showNewsWithAnnounsment(newsData){
        var allProcessesListNewsArr = [];
        var serviceListNewsArr = [];
        var salesListNewsArr = [];
        var expertsListNewsArr = [];

        var allProcessesListNews = "";
        var serviceListNews = "";
        var salesListNews = "";
        var expertsListNews = "";

        var allProcessesAnnouncement = "";
        var serviceAnnouncement = "";
        var salesAnnouncement = "";
        var expertsAnnouncement = "";
        var processHeader = "";
        var announcement = "";
        var stylesTitles = {};
        newsData.forEach(function(news){
            typeNews = news.typeNews;
            stylesTitles = getStyleTypeNews(typeNews);
            if(typeNews == "Спринт"){
                processHeader = "processHeader";
                announcement = "announcement";
            }else if(typeNews == "Релиз"){
                processHeader = "processHeaderRelease";
                announcement = "announcementRelease";
            }
            var processesNews = news.processNews.split(";");
            processesNews.forEach(function(proc){
                var priority = ""
                if(news.priorityNews == "Да"){
                    priority = `<div class='importanatNewsContent'>!</div>`
                }
                if(proc){
                    if(proc == "Сервис"){
                        serviceListNewsArr.push(getNewsContent(news, 'manyNews'));
                        serviceAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title} ${priority}</a></div></li>`;
                    }
                    if(proc == "Общее"){
                        allProcessesListNewsArr.push(getNewsContent(news, 'manyNews'));
                        allProcessesAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title} ${priority}</a></div></li>`;
                    }
                    if(proc == "Продажи"){
                        salesListNewsArr.push(getNewsContent(news, 'manyNews'));
                        salesAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title} ${priority}</a></div></li>`;
                    }
                    if(proc == "Эксперты"){
                        expertsListNewsArr.push(getNewsContent(news, 'manyNews'));
                        expertsAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title} ${priority}</a></div></li>`;
                    }
                }
            })
        })
        
        
        if(serviceAnnouncement.length){
            serviceAnnouncement = `<div class='processHeaderAnnouncement'>Сервис</div><ol class='beads'>${serviceAnnouncement}</ol>`;
        }
        if(allProcessesAnnouncement.length){
            allProcessesAnnouncement = `<div class='processHeaderAnnouncement'>Общее</div><ol class='beads'>${allProcessesAnnouncement}</ol>`;
        }
        if(salesAnnouncement.length){
            salesAnnouncement = `<div class='processHeaderAnnouncement'>Продажи</div><ol class='beads'>${salesAnnouncement}</ol>`;
        }
        if(expertsAnnouncement.length){
            expertsAnnouncement = `<div class='processHeaderAnnouncement'>Эксперты</div><ol class='beads'>${expertsAnnouncement}</ol>`;
        }
        if(serviceListNewsArr.length){
            serviceListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>Сервис</div>
                                ${serviceListNewsArr.join("")}
                              </div>`;
        }
        if(allProcessesListNewsArr.length){
            allProcessesListNews = `<div class='serviceListNews'>
                                        <div class='${processHeader}'>Общее</div>
                                        ${allProcessesListNewsArr.join("")}
                                    </div>`;
        }
        if(salesListNewsArr.length){
            salesListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>Продажи</div>
                                ${salesListNewsArr.join("")}
                            </div>`;
        }
        if(expertsListNewsArr.length){
            expertsListNews = `<div class='serviceListNews'>
                                    <div class='${processHeader}'>Эксперты</div>
                                    ${expertsListNewsArr.join("")}
                                </div>`;
        }
        var modalContent = `<div id="myModalNotification" class="modalNotification">
                                <div class="modal-content" style="height: ${heightModalWin()}px">
                                    <div class="modal-header">
                                        <div class="titleTask"></div>
                                        <span class="closeNotification">×</span>
                                    </div>
                                    <div class="modal-body">
                                        <div class="${stylesTitles.newsStyleTypeNews}">${typeNews}</div>
                                        <div class="newsHeaderTime"></div>
                                        <div class="contentNewsWin" style="height: ${heightModalContent()}px">
                                            <div class="announcementList" style="height: ${heightModalContent()}px">
                                                <div class="announcementHeader">Содержание</div>
                                                ${allProcessesAnnouncement}${serviceAnnouncement}${expertsAnnouncement}${salesAnnouncement}
                                            </div>
                                            <div class="listNewsFullArchive" style="height: ${heightModalContent()}px; overflow: auto;">
                                                ${allProcessesListNews}
                                                ${serviceListNews}
                                                ${expertsListNews}
                                                ${salesListNews}
                                            </div>
                                        </div>
                                    </div>
                                </div></div>`;
        document.querySelector('body').insertAdjacentHTML('afterend', modalContent);
        document.querySelector('.closeNotification').addEventListener('click', e=>{
            document.querySelector('#myModalNotification').remove();
        })
        
    }
    function showSprintService(newsData){
        var allProductsListNewsArr = [];
        var creditsListNewsArr = [];
        var cardsListNewsArr = [];
        var depisitsListNewsArr = [];
        var chatsListNewsArr = [];
        var brokerListNewsArr = [];
        var mccListNewsArr = [];

        var allProductsListNews = "";
        var creditsListNews = "";
        var cardsListNews = "";
        var depisitsListNews = "";
        var chatsListNews = "";
        var brokerListNews = "";
        var mccListNews = "";

        var allProductsAnnouncement = "";
        var creditsAnnouncements = "";
        var cardsAnnouncement = "";
        var depisitsAnnouncement = "";
        var chatsAnnouncement = "";
        var brokerAnnouncement = "";
        var mccAnnouncement = "";
        var processHeader = "";
        var announcement = "";
        var stylesTitles = {};
        newsData.forEach(function(news){
            typeNews = news.typeNews;
            stylesTitles = getStyleTypeNews(typeNews);
            if(typeNews == "Спринт Сервис"){
                processHeader = "processHeader";
                announcement = "announcement";
            }else if(typeNews == "Релиз Сервис"){
                processHeader = "processHeaderRelease";
                announcement = "announcementRelease";
            }
            var productNews = news.productNews.split(";");
            productNews.forEach(function(product){
                if(product){
                    if(product == "Кредиты"){
                        creditsListNewsArr.push(getNewsContent(news, 'manyNews'));
                        creditsAnnouncements += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title}</a></div></li>`;
                    }else if(product == "Карты"){
                        cardsListNewsArr.push(getNewsContent(news, 'manyNews'));
                        cardsAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title}</a></div></li>`;
                    }else if(product == "Вклады"){
                        depisitsListNewsArr.push(getNewsContent(news, 'manyNews'));
                        depisitsAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title}</a></div></li>`;
                    }else if(product == "Чаты"){
                        chatsListNewsArr.push(getNewsContent(news, 'manyNews'));
                        chatsAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title}</a></div></li>`;
                    }else if(product == "Брокеридж"){
                        brokerListNewsArr.push(getNewsContent(news, 'manyNews'));
                        brokerAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title}</a></div></li>`;
                    }else if(product == "MCC"){
                        mccListNewsArr.push(getNewsContent(news, 'manyNews'));
                        mccAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title}</a></div></li>`;
                    }else{
                        allProductsListNewsArr.push(getNewsContent(news, 'manyNews'));
                        allProductsAnnouncement += `<li><div class='linkAnnouncement'><a class='${announcement}' href='#idNews-${news.id}'>${news.title}</a></div></li>`;
                    }
                }
            })
        })
        
        if(allProductsAnnouncement.length){
            allProductsAnnouncement = `<div class='processHeaderAnnouncement'>Общее</div><ol class='beads'>${allProductsAnnouncement}</ol>`;
        }
        if(creditsAnnouncements.length){
            creditsAnnouncements = `<div class='processHeaderAnnouncement'>Кредиты</div><ol class='beads'>${creditsAnnouncements}</ol>`;
        }
        if(cardsAnnouncement.length){
            cardsAnnouncement = `<div class='processHeaderAnnouncement'>Карты</div><ol class='beads'>${cardsAnnouncement}</ol>`;
        }
        if(depisitsAnnouncement.length){
            depisitsAnnouncement = `<div class='processHeaderAnnouncement'>Вклады</div><ol class='beads'>${depisitsAnnouncement}</ol>`;
        }
        if(chatsAnnouncement.length){
            chatsAnnouncement = `<div class='processHeaderAnnouncement'>Чаты</div><ol class='beads'>${chatsAnnouncement}</ol>`;
        }
        if(brokerAnnouncement.length){
            brokerAnnouncement = `<div class='processHeaderAnnouncement'>Брокеридж</div><ol class='beads'>${brokerAnnouncement}</ol>`;
        }
        if(mccAnnouncement.length){
            mccAnnouncement = `<div class='processHeaderAnnouncement'>МСС</div><ol class='beads'>${mccAnnouncement}</ol>`;
        }

        if(allProductsListNewsArr.length){
            allProductsListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>Общее</div>
                                ${allProductsListNewsArr.join("")}
                              </div>`;
        }
        if(creditsListNewsArr.length){
            creditsListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>Кредиты</div>
                                ${creditsListNewsArr.join("")}
                              </div>`;
        }
        if(cardsListNewsArr.length){
            cardsListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>Карты</div>
                                ${cardsListNewsArr.join("")}
                              </div>`;
        }
        if(depisitsListNewsArr.length){
            depisitsListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>Вклады</div>
                                ${depisitsListNewsArr.join("")}
                              </div>`;
        }
        if(chatsListNewsArr.length){
            chatsListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>Чаты</div>
                                ${chatsListNewsArr.join("")}
                              </div>`;
        }
        if(brokerListNewsArr.length){
            brokerListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>Брокеридж</div>
                                ${brokerListNewsArr.join("")}
                              </div>`;
        }
        if(mccListNewsArr.length){
            mccListNews = `<div class='serviceListNews'>
                                <div class='${processHeader}'>МСС</div>
                                ${mccListNewsArr.join("")}
                              </div>`;
        }
        
        var modalContent = `<div id="myModalNotification" class="modalNotification">
                                <div class="modal-content" style="height: ${heightModalWin()}px">
                                    <div class="modal-header">
                                        <div class="titleTask"></div>
                                        <span class="closeNotification">×</span>
                                    </div>
                                    <div class="modal-body">
                                        <div class="${stylesTitles.newsStyleTypeNews}">${typeNews}</div>
                                        <div class="newsHeaderTime"></div>
                                        <div class="contentNewsWin" style="height: ${heightModalContent()}px">
                                            <div class="announcementList" style="height: ${heightModalContent()}px">
                                                <div class="announcementHeader">Содержание</div>
                                                ${allProductsAnnouncement}
                                                ${creditsAnnouncements}
                                                ${cardsAnnouncement}
                                                ${depisitsAnnouncement}
                                                ${chatsAnnouncement}
                                                ${brokerAnnouncement}
                                                ${mccAnnouncement}
                                            </div>
                                            <div class="listNewsFullArchive" style="height: ${heightModalContent()}px; overflow: auto;">
                                                ${allProductsListNews}
                                                ${creditsListNews}
                                                ${cardsListNews}
                                                ${depisitsListNews}
                                                ${chatsListNews}
                                                ${brokerListNews}
                                                ${mccListNews}
                                            </div>
                                        </div>
                                    </div>
                                </div></div>`;
        document.querySelector('body').insertAdjacentHTML('afterend', modalContent);
        document.querySelector('.closeNotification').addEventListener('click', e=>{
            document.querySelector('#myModalNotification').remove();
        })
    }
    function getNewsContent(news, typeModal){
        var newsPrcess = news.processNews.split(";");
        var newsProductsArr = news.productNews.split(";");
        var newsProducts = "";
        newsProductsArr.forEach(function(productName){
            if(productName){
                newsProducts += "<span class='hashtag'>#</span>"+productName;
            }
        })
        var newsContentDescr = document.createElement('div');
        newsContentDescr.innerHTML =  news.descriptionNews;
        
        stylesTitles = getStyleTypeNews(news.typeNews, typeModal);
        content = `<div class='contentNewsArchive' id='idNews-${news.id}'>
                        <div class='${stylesTitles.newsTitelStyle}'>${news.title}</div>
                        <div class='processHeaderNew'>${newsPrcess.join(" ")}
                            <span> ${newsProducts}</span>
                        </div>
                        <div class='newsDescription'>${newsContentDescr.innerHTML}</div>
                    </div>`       
        return content;
    }
    function getStyleTypeNews(typeNews, typeModal){
        
        if(typeNews == "Спринт" || typeNews == "Спринт Сервис" || typeNews == "Спринт Продажи" || typeNews == "Спринт Эксперты"){
            newsStyleTypeNews = "newsHeaderSprint";
            if(typeModal === "manyNews"){
                newsTitelStyle = "newsTitleSprint"
            }else{
                newsTitelStyle = "newsTitleOther";
            }
        }else if(typeNews == "Молния"){
            newsStyleTypeNews = "newsHeaderLightning";
            newsTitelStyle = "newsTitleLightning";
        }else if(typeNews == "Пилот"){
            newsStyleTypeNews = "newsHeaderPilot";
            newsTitelStyle = "newsTitlePilot";
        }else if(typeNews == "Релиз" || typeNews == "Релиз Сервис" || typeNews == "Релиз Продажи" || typeNews == "Релиз Эксперты"){
            newsStyleTypeNews = "newsHeaderRelease";
            if(typeModal === "manyNews"){
                newsTitelStyle = "newsTitleRelease"
            }else{
                newsTitelStyle = "newsTitleOther";
            }
        }else if(typeNews == "Другое"){
            newsStyleTypeNews = "newsHeaderOther";
            newsTitelStyle = "newsTitleOther";
        }
        return {newsStyleTypeNews: newsStyleTypeNews, newsTitelStyle: newsTitelStyle}
    }
    function heightModalWin(){
        return height=$( window ).height()-50;
    }
    function heightModalContent(){
        return height=$( window ).height()-155;
    }
}