function showNews(newsData, newsTytleClass){
    var newsPrcess = "";
    if(newsData.processNews){
        newsPrcess = newsData.processNews.split(";");
    }
    var newsProductsArr = [];
    var newsProducts = "";
    if(newsData.productNews){
        newsProductsArr = newsData.productNews.split(";");
    }
    newsProductsArr.forEach(function(productName){
        if(productName){
            newsProducts += "<span class='hashtag'>#</span>"+productName;
        }
    })
    var listNews = document.querySelector('.listNews');
    listNews.insertAdjacentHTML('beforeend', `<div class='contentNews' id='idNews-${newsData.Id}' style='font-family: "Tahoma";'>
    <div class='${newsTytleClass}'>${newsData.Title}<a class='editNewsButton' id="editNews-${newsData.Id}" data-item="${newsData.Id}"><img data-item="${newsData.Id}" src="https://intranet.rencredit.ru/Departments/CC/modalsWin/Documents/modalsCustomer/img/editTask.png"></a></div>
    <div class='processHeaderNew' style="font-size: 12pt;">${newsPrcess}
    <span>${newsProducts}</span>
    </div>
    <div class='newsContent'>${newsData.descriptionNews}</div>
    </div>`);
    delModal()
    $('#editNews-'+newsData.Id).click((e)=>{
        formEditNews(newsData.idTask, 'edit', newsData.Id);
    })
    if(newsData.statusNews == "Отправлено" || newsData.statusNews == "Отменено" || newsData.statusNews == "Закрыто"){
        $('#editNews-'+newsData.Id).remove();
    }
}