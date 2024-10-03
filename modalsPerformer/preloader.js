function setModal(){
    var preloader = '<div class="preloader">'+
                        '<div class="preloader__row">'+
                        '<div class="preloader__item"></div>'+
                        ' <div class="preloader__item"></div>'+
                        '</div>'+
                    '</div>';
    $("body").append(preloader);
}
function delModal(){
    $('.preloader').remove();
}