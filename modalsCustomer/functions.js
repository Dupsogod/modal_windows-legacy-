function formatDate(date, type){
    date = new Date(date);
    date.setMonth(date.getMonth()+1);
    if(type == 2){
        var dd = date.getDate(); 
        
        var mm = date.getMonth(); 
        var yyyy = date.getFullYear(); 

        if (dd < 10) { 
            dd = '0' + dd; 
        }

        if (mm < 10) { 
            mm = '0' + mm; 
        }
        var dateFormat = yyyy + "-" + mm + "-" + dd+"T00:00:00Z";
    }else if(type == 3){
        console.log(date)
        date.setDate(date.getDate()-1)
        var dd = date.getDate(); 
        var mm = date.getMonth(); 
        var yyyy = date.getFullYear(); 
        if (dd < 10) { 
            dd = '0' + dd; 
        }

        if (mm < 10) { 
            mm = '0' + mm; 
        }
        var dateFormat = yyyy + "-" + mm + "-" + dd+"T23:59:00Z";
    }else if(type == 1){
        var dd = date.getDate(); 
        var mm = date.getMonth(); 
        var yyyy = date.getFullYear(); 
        if (dd < 10) { 
            dd = '0' + dd; 
        }

        if (mm < 10) { 
            mm = '0' + mm; 
        }

        var dateFormat = yyyy + "-" + mm + "-" + dd;
    }else if(type == 4){
        var dd = date.getDate(); 
        var mm = date.getMonth(); 
        var yyyy = date.getFullYear(); 
        var hh = date.getHours();
        var min = date.getMinutes();
        if(min < 10){
            min = "0" + min;
        }

        if (dd < 10) { 
            dd = '0' + dd; 
        }

        if (mm < 10) { 
            mm = '0' + mm; 
        }

        var dateFormat = dd + "." + mm + "." + yyyy + " " + hh + ":" + min;
    }else{
        var dd = date.getDate(); 
        var mm = date.getMonth(); 
        var yyyy = date.getFullYear(); 
        if (dd < 10) { 
            dd = '0' + dd; 
        }

        if (mm < 10) { 
            mm = '0' + mm; 
        }

        var dateFormat = dd + "." + mm + "." + yyyy;
    }
    return dateFormat;
}
function uniqe(item, array){
    if(array.indexOf(item)==-1){
        array.push(item);
    }
    return array;
}
var currentUser = {};
function getCurretUser(){
    if(currentUser.UserName){
        return currentUser;
    }else{
        var url = '/_api/SP.UserProfiles.PeopleManager/GetMyProperties';
        getData(url)
        .then(function(data){
            var dataUser = data.d.UserProfileProperties.results;
            for(var i = 0; i < dataUser.length; i++){
                currentUser[dataUser[i].Key] = dataUser[i].Value;
            }
        })
    }
    
}
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    var i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}