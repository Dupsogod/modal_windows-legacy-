function formEditNews(idTask, modeNews, idNews){
    var clearFormNews = `<div class='newsForm ${modeNews}' id='${idNews}'>
    <div class='newsContent'>
        <div class="headerFormEditNews"><div class='delNews' title="Удалить новость"><img id="delNews-${idNews}" src="/Departments/CC/PublishingImages/Pages/default/deleteUrl.png"></div></div>
        <div class='fieled'>
            <div class='titleFieled'>Заголовок*</div>
            <div class='valueFieled'><input type='text' class='titleNews' id='titleNews-${idNews}' placeholder='Укажите заголовок новости' /></div>
        </div>
        <div class='fieled'>
            <div class='titleFieled'>Новость*</div>
            <div class='valueFieled'><div class='descriptionNewsContent'><textarea rows='10' class='descriptionNews' id='descriptionNews-${idNews}'></textarea></div></div>
        </div>
    </div>
    <div class='newsParams'>
    <div class='fieled'>
        <div class='titleFieled'>Процесс*</div>
        <div class='valueFieled'>
            <div class='typesProsessNews'>
                <div class='typeProsessNews selectionButtons'>Сервис</div>
                <div class='typeProsessNews selectionButtons'>Продажи</div>
                <div class='typeProsessNews selectionButtons'>Эксперты</div>
                <div class='typeProsessNews selectionButtons'>SME</div>
                <div class='typeProsessNews selectionButtons'>Reception</div>
                <div class='typeProsessNews selectionButtons'>Общее</div>
            </div>
        </div>
    </div>
    <div class='fieled'>
        <div class='titleFieled'>Теги*</div>
        <div class='valueFieled'>
            <div class='typesProductsNews'>
                <div class='typeProductNews selectionButtons'>Кредиты</div>
                <div class='typeProductNews selectionButtons'>Карты</div>
                <div class='typeProductNews selectionButtons'>Вклады</div>
                <div class='typeProductNews selectionButtons'>Чаты</div>
                <div class='typeProductNews selectionButtons'>Брокеридж</div>
                <div class='typeProductNews selectionButtons'>МКК</div>
                <div class='typeProductNews selectionButtons'>Эксперты online</div>
                <div class='typeProductNews selectionButtons'>СБП</div>
                <div class='typeProductNews selectionButtons'>Овердрафт</div>
                <div class='typeProductNews selectionButtons'>Курьеры</div>
                <div class='typeProductNews selectionButtons'>WEB</div>
                <div class='typeProductNews selectionButtons'>Transfer</div>
                <div class='typeProductNews selectionButtons'>IL</div>
                <div class='typeProductNews selectionButtons'>Общее</div>
                <div class='typeProductNews selectionButtons'>РКО</div>
                <div class='typeProductNews selectionButtons'>Бизнес-карта</div>
                <div class='typeProductNews selectionButtons'>Нефинансовые сервисы</div>
                <div class='typeProductNews selectionButtons'>Торговый эквайринг</div>
                <div class='typeProductNews selectionButtons'>Интернет-эквайтинг</div>
                <div class='typeProductNews selectionButtons'>Общее SME</div>
            </div>
        </div>
    </div>
    <div class='fieled'>
        <div class='titleFieled'>Новость для*</div>
        <div class='valueFieled'>
            <div class='destinationsNews' id='destinationsNews-${idNews}'>
                <div class='destinationNews selectionButtons skills'>Навыка</div>
                <div class='destinationNews selectionButtons groups'>Группы</div>
                <div class='destinationNews selectionButtons users'>Выделенных сотрудников</div>
            </div>
        </div>
    </div>
    </div>
</div>`;

    if(modeNews === 'edit'){
        var formNews = document.querySelector(`#idNews-${idNews}`);
        formNews.innerHTML = '';
        var url = REQUEST_URL +"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/items?$filter=Id eq " + idNews;
        getData(url)
        .then(data=>{
            if(!data.d.results.length){
                delModal()
                return
            }
            data.d.results.forEach(news=>{
                formNews.insertAdjacentHTML('afterbegin', clearFormNews);
                tinymceInitFunction(idNews);
                $('.destinationNews').unbind().click(function(){
                    setActiveDastinationNews($(this));
                })
                if(news.statusNews == 'Отправлено'){
                    $('#delNews-'+idNews).remove();
                }else{
                    $('#delNews-'+idNews).unbind().click(()=>{
                        delNews(idNews, news.Title);
                    })
                }
                $('.typeProductNews').unbind().click(function(){
                    setActiveParamNews($(this));
                })
                $('.typeProsessNews').unbind().click(function(){
                    setActiveParamNews($(this));
                })
                fillFields(news)
            })
        })
    }else if(modeNews === 'new'){
        var listNews = document.querySelector('.listNews')
        listNews.insertAdjacentHTML('beforeend',`<div class='contentNews' id='idNews-${idNews}' style='font-family: "Tahoma";'>${clearFormNews}</div>`);
        tinymceInitFunction(idNews);
        $('.destinationNews').unbind().click(function(){
            setActiveDastinationNews($(this));
        })
        $('.typeProductNews').unbind().click(function(){
            setActiveParamNews($(this));
        })
        $('.typeProsessNews').unbind().click(function(){
            setActiveParamNews($(this));
        })
        $('#delNews-'+idNews).unbind().click(()=>{
            $('#idNews-'+idNews).remove();
        })
        setActiveDastinationNews($('.skills'))
    }

    function tinymceInitFunction(idNews){
        tinymce.init({
            selector: '#descriptionNews-'+idNews,
            plugins: ['link', 'table', 'lists', 'code', 'image', ''],
            table_toolbar: '',
            toolbar: [
                "alignleft aligncenter alignright alignjustify | bullist numlist table image | outdent indent | blockquote | code",
                "undo redo | bold italic underline | fontfamily fontsize forecolor backcolor | link",
                "selectall removeformat"
            ],
            lists_indent_on_tab: true,
            menubar: 'edit insert view format table tools help',
            language: 'ru',
            height: 600,
            gecko_spellcheck:true,
            convert_urls : false,
            relative_urls : false,
            remove_script_host : false,
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
            
                input.onchange = function () {
                var file = this.files[0];
            
                var reader = new FileReader();
                reader.onload = function () {
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
            
                    cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
                };
            
                input.click();
            }
        });
    }
    function fillFields(dataNews){
        var newsID = dataNews.Id;
        $('#titleNews-'+dataNews.Id).val(dataNews.Title);

        var descriptionNews = dataNews.descriptionNews;
        $('#descriptionNews-'+newsID).val(descriptionNews);
        var priorityNews = dataNews.priorityNews;
        if(priorityNews == "Да"){
            $('#priorityNews-'+newsID).prop( "checked", true );
        }else{
            $('#priorityNews-'+newsID).prop( "checked", false );
        }

        var processNews = dataNews.processNews;
        if(processNews){
            var processes = processNews.split(";");
            processes.forEach(function(processesTitle){
                $('#idNews-'+newsID).find('.typeProsessNews').each(function(){
                    if($(this).text() == processesTitle){
                        $(this).addClass('active');
                    }
                })
            })
        }

        var productNews = dataNews.productNews;
        if(productNews){
            var products = productNews.split(";");
            products.forEach(function(productTitle){
                $('#idNews-'+newsID).find('.typeProductNews').each(function(){
                    if($(this).text() == productTitle){
                        $(this).addClass('active');
                    }
                })
            })
        }
        var typeDestination = dataNews.typeDestination;
        if(typeDestination){
            $("#destinationsNews-"+newsID).find('.destinationNews').each(function(){
                if($(this).text() == typeDestination){
                    setActiveDastinationNews($(this), dataNews.destination);
                }
            })

        }
    }
    function delNews(idNew, newsTitle){
        var modalContent = ' <div id="message" class="dialogWinFullScreen">'+
                                '<div class="dialogWin">'+
                                    '<div class="modal-header">'+
                                        '<span class="close-dialog">×</span>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<p>Вы действительно хотите удалить новость <br><b>"'+newsTitle+'"</b>?</p>'+
                                    '</div>'+
                                    '<div class="modal-footer">'+
                                    '<a href="#" class="dialogButtons del">Удалить</a> <a href="#" class="dialogButtons cancel">Отмена</a>'
                                    '</div>'+
                                '</div></div>';
            $('#s4-bodyContainer').append(modalContent);
            $('.close-dialog').click(function(){
                $('#message').remove();
            })
            $('.cancel').click(function(){
                $('#message').remove();
            });
            $('.del').click(function(){
                var urlDel = REQUEST_URL +"_api/web/lists(guid'"+LIST_NEWS_GUID+"')/items('"+idNew+"')";
                deleteData(urlDel).then((data)=>{
                    $('#message').remove();
                    $('#idNews-'+idNew).remove();
                    var datePlanedSendNewTask = document.querySelector('.datePlanedSendNewTask');
                    if(!datePlanedSendNewTask){
                        document.querySelector('.modal-initiator').remove();
                        searchNewsItems()
                    }
                });
            })
    }
    
    function setActiveParamNews(clickedElement){
        var classList = clickedElement.attr('class').split(/\s+/);
        var active = false;
        $.each(classList, function (index, item) {
            if (item === 'active') {
                active = true;
                clickedElement.removeClass('active');
            }
        });
        if (!active) {
            clickedElement.addClass('active');
        }
    }
    function setActiveDastinationNews(clickedElement, destinationListEdit){
        var newsId = idNews;
        if($('.destinationUsersList').length){
            $('#destinationUsersList-'+newsId).remove();
        }
        if($('.listDestinations').length){
            $('#'+newsId).find('.listDestinations').remove();
        }
        if($('.destinationsGroupsSelection').length){
            $('#'+newsId).find('.destinationsGroupsSelection').remove();
        }
        $("#destinationsNews-"+newsId).find(".destinationNews").each(function () {
            $(this).removeClass('active');
        });
        
        clickedElement.addClass('active');
        
        if(clickedElement.text() == "Навыка"){
            clickedElement.parent().after("<div class='listDestinations' id='listDestinations-"+newsId+"'></div>");
            getSkillGroups(destinationListEdit, newsId);
        }else if(clickedElement.text() == "Группы"){
            clickedElement.parent().after("<div class='listDestinations' id='listDestinations-"+newsId+"'></div>");
            getLeaderGroups(destinationListEdit, newsId)
        }else if(clickedElement.text() == "Выделенных сотрудников"){
            destinationUsers(destinationListEdit, newsId);
        }
    }
    function destinationUsers(destinationListEdit, idNews){
        //
        var listUsers = "<textarea class='destinationUsersList' id='destinationUsersList-"+idNews+"' rows='5' placeholder='Укажите логины сотрудников, кому должна отобразиться новость через &laquo; ; &raquo;, без пробелов'></textarea>"
        $('#destinationsNews-'+idNews).after(listUsers);
        if(destinationListEdit){
            $('.destinationUsersList').text(destinationListEdit);
        }
    }
    function destinationGroups(destinationListEdit, newsId, listLeaderGroups){
        
        var listCheckLeaderGroups = "";
        listLeaderGroups.forEach(function(leader){
            listCheckLeaderGroups += "<div class='destinationSelection' id='"+leader.id+"'>"+leader.fullName+"</div>";
        })
        $('#listDestinations-'+newsId).append(listCheckLeaderGroups);
        $('.destinationSelection').unbind().click(function(){
            setActiveParamNews($(this));
        })
        if(destinationListEdit){
            var list = destinationListEdit.split(";");
            list.forEach(function(item){
                if(item){
                    $('#'+item).addClass('active');
                }
            })
        }
    }
    function getLeaderGroups(destinationListEdit, newsId){
        var arrLeaderGroups = [];
        var arrRequests = [];
        var leaderGroups = [];
        var url = "/departments/cc/_api/web/lists(guid'"+LIST_USER_SKILLS_GUID+"')/items?&$top=1000";
        getData(url)
        .then(function(data){
            var dataUser = data.d.results;
            dataUser.forEach(function(user){
                if(user.leaderCCId){
                    arrLeaderGroups = checkArraySkills(user.leaderCCId, arrLeaderGroups)
                }
            })
            arrLeaderGroups.forEach(function(id){
                var urlGetDataUser = "https://intranet.rencredit.ru/_api/web/SiteUserInfoList/items?$filter=ID eq "+id;
                arrRequests.push(getData(urlGetDataUser)
                .then(function(data){
                    leaderGroups.push({
                        fullName: data.d.results[0].LastName + " " + data.d.results[0].FirstName, 
                        FirstName: data.d.results[0].FirstName, 
                        LastName: data.d.results[0].LastName, 
                        id: id});
                }))
            })
          
            Promise.all(arrRequests).then(()=>{destinationGroups(destinationListEdit, newsId, leaderGroups)})
        });
        
        leaderGroups = leaderGroups.sort(byField('LastName'));
        return leaderGroups;
    }
    function destinationSkills(destinationListEdit, newsId, listSkillGroups){

        var listCheckSkillGroups = "";
        var listSelectionGroup = "<div class='destinationsGroupsSelection'>"+
                                    "<div class='destinationGroupSelection' id='Expert'>Expert</div>"+
                                    "<div class='destinationGroupSelection' id='Brok'>Брокеридж</div>"+
                                    "<div class='destinationGroupSelection' id='deposit'>Депозит</div>"+
                                    "<div class='destinationGroupSelection' id='card'>Карты</div>"+
                                    "<div class='destinationGroupSelection' id='loans'>Loans</div>"+
                                    "<div class='destinationGroupSelection' id='mcc'>MCC</div>"+
                                    "<div class='destinationGroupSelection' id='transfer_calls'>Transfer Звонки</div>"+
                                    "<div class='destinationGroupSelection' id='expert_online'>Expert online</div>"+
                                    "<div class='destinationGroupSelection' id='chat'>Чат</div>"+
                                    "<div class='destinationGroupSelection' id='web'>Web</div>"+
                                    "<div class='destinationGroupSelection' id='XS'>XS</div>"+
                                    "<div class='destinationGroupSelection' id='courier'>Курьеры</div>"+
                                    "<div class='destinationGroupSelection' id='IL'>IL</div>"+
                                "</div>";
        $('#listDestinations-'+newsId).before(listSelectionGroup);
        listSkillGroups.sort();
        listSkillGroups.forEach(function(SkillGroup){
            listCheckSkillGroups += "<div class='destinationSelection'>"+SkillGroup+"</div>";
        })
        $('#listDestinations-'+newsId).append(listCheckSkillGroups);
        $('.destinationSelection').unbind().click(function(){
            setActiveParamNews($(this));
        })
        $('.destinationGroupSelection').unbind().click(function(){
            if ($(this).text()=="Expert"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('ПРФ')>-1 || $(this).text().indexOf('УСТ')>-1 || $(this).text().indexOf('Expert')>-1){
                            if ($(this).text() != "Loans+Card+Expert+Chat" && $(this).text() != "Loans+Card+MCC+Expert+Chat"){
                                $(this).removeClass('active');
                            }
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('ПРФ')>-1 || $(this).text().indexOf('УСТ')>-1 || $(this).text().indexOf('Expert')>-1){
                            if ($(this).text() != "Loans+Card+Expert+Chat" && $(this).text() != "Loans+Card+MCC+Expert+Chat"){
                                $(this).addClass('active');
                            }
                        }
                    })
                }
                
            }
            if ($(this).text()=="Expert online"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text() == "Loans+Card+Expert+Chat" || $(this).text() == "Loans+Card+MCC+Expert+Chat"){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text() == "Loans+Card+Expert+Chat" || $(this).text() == "Loans+Card+MCC+Expert+Chat"){
                            $(this).addClass('active');
                        }
                    })
                }
                
            }
            if ($(this).text()=="Брокеридж"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Brok')>-1 || $(this).text().indexOf('Брок')>-1 || $(this).text() == "Card+Deposit" || $(this).text() == "Card+Deposit+Web" || $(this).text() == "Loans+Card+Deposit" || $(this).text() == "Loans+Card+Deposit+Web"){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Brok')>-1 || $(this).text().indexOf('Брок')>-1 || $(this).text() == "Card+Deposit" || $(this).text() == "Card+Deposit+Web" || $(this).text() == "Loans+Card+Deposit" || $(this).text() == "Loans+Card+Deposit+Web"){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="Депозит"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Deposit')>-1 || $(this).text().indexOf('Депозит')>-1){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Deposit')>-1 || $(this).text().indexOf('Депозит')>-1){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="Карты"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Card')>-1){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Card')>-1){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="Loans"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Loans')>-1){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Loans')>-1){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="MCC"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('MCC')>-1 || $(this).text() == "Loans+XS_In+Courier" || $(this).text() == "Loans" || $(this).text() == "Loans+Card" || $(this).text() == "Loans+Card+Web"){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('MCC')>-1 || $(this).text() == "Loans+XS_In+Courier" || $(this).text() == "Loans" || $(this).text() == "Loans+Card" || $(this).text() == "Loans+Card+Web"){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="Чат"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Chat')>-1){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Chat')>-1){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="Web"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text() == 'Loans+Card+Deposit+Web' || $(this).text() == 'Loans+Card+Web' || $(this).text() == 'Loans+Web'){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text() == 'Loans+Card+Deposit+Web' || $(this).text() == 'Loans+Card+Web' || $(this).text() == 'Loans+Web'){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="Transfer Звонки"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if($(this).text().indexOf('Deposit')>-1 || $(this).text().indexOf('Loans')>-1){
                            if ($(this).text().indexOf('Chat')<0 && $(this).text().indexOf('XS_In')<0){
                                $(this).removeClass('active');
                            }
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if($(this).text().indexOf('Deposit')>-1 || $(this).text().indexOf('Loans')>-1){
                            if ($(this).text().indexOf('Chat')<0 && $(this).text().indexOf('XS_In')<0){
                                $(this).addClass('active');
                            }
                        }
                        
                    })
                }
            }
            if ($(this).text()=="XS"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('XS')>-1){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('XS')>-1){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="Курьеры"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Courier')>-1){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('Courier')>-1){
                            $(this).addClass('active');
                        }
                    })
                }
            }
            if ($(this).text()=="IL"){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('IL')>-1){
                            $(this).removeClass('active');
                        }
                    })
                }else{
                    $(this).addClass('active');
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if ($(this).text().indexOf('IL')>-1){
                            $(this).addClass('active');
                        }
                    })
                }
            }
        })
        if(destinationListEdit){
            var list = destinationListEdit.split(";");
            list.forEach(function(item){
                if(item){
                    $('#listDestinations-'+newsId).find('.destinationSelection').each(function(){
                        if($(this).text() == item){
                            $(this).addClass('active');
                        }
                    })
                }
            })
        }
        
    }
    function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
      }
    function getSkillGroups(destinationListEdit, newsId){
        var arrSkillGroups = [];
        var url = "/departments/cc/_api/web/lists(guid'"+LIST_USER_SKILLS_GUID+"')/items?&$top=1000";
        getData(url)
        .then(function(data){
          var dataUser = data.d.results;
          dataUser.forEach(function(user){
            arrSkillGroups = checkArraySkills(user.Skills, arrSkillGroups)
          })
          destinationSkills(destinationListEdit, newsId, arrSkillGroups);
        });
        //return arrSkillGroups;
    }
    function checkArraySkills(skill, array){
        if(array.indexOf(skill)==-1){
           array.push(skill);
        }
        return array;
    }
    
}