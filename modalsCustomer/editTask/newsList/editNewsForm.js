function formEditNews(idTask, modeNews, idNews){
    var clearFormNews = `<div class='newsForm ${modeNews}' id='${idNews}'>
    <div class='newsContent'>
        <div class='fieled'>
            <div class='titleFieled'>Заголовок*</div>
            <div class='valueFieled'><input type='text' class='titleNews'  id='titleNews-${idNews}'placeholder='Укажите заголовок новости' /></div>
        </div>
        <div class='fieled'>
            <div class='titleFieled'>Новость*</div>
            <div class='valueFieled'><div class='descriptionNewsContent'><textarea rows='10' class='descriptionNews' id='descriptionNews-${idNews}'></textarea></div></div>
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
    }

    function tinymceInitFunction(idNews){
        tinymce.init({
            selector: '#descriptionNews-'+idNews,
            plugins: ['link', 'table', 'lists', 'code', 'image', ''],
            table_toolbar: '',
            toolbar: [
                "alignleft aligncenter alignright alignjustify | bullist numlist table image | outdent indent | blockquote | code",
                "undo redo | bold italic underline | fontselect fontsizeselect forecolor backcolor | link"
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
        $('#titleNews-'+dataNews.Id).val(dataNews.Title);
        $('#descriptionNews-'+dataNews.Id).val(dataNews.descriptionNews);

    }
}