function searchTaskItems(){
    var selectedFilters = document.querySelectorAll('.active');
    var datePlanedSendStart = document.querySelector('.datePlanedSendStart').value;
    var datePlanedSendEnd = document.querySelector('.datePlanedSendEnd').value;
    var dateRegistrationStart = document.querySelector('.dateRegistrationStart').value;
    var dateRegistrationEnd = document.querySelector('.dateRegistrationEnd').value;
    var myTasksList = document.querySelector('.matchingTask');
    var typeTask = [];
    var processes = [];
    var products = [];
    selectedFilters.forEach((filter)=>{
        if(filter.classList.contains("processFilter")){
            processes.push(filter.innerText);
        }else if(filter.classList.contains("productFilter")){
            products.push(filter.innerText.replace("#", ""));
        }else if(filter.classList.contains("typeTaskFilter")){
            typeTask.push(filter.innerText);
        }
    });

    var queryFilter = "";
    if(processes.length){
        queryFilter += `&$filter=(substringof('${processes.join("', process) or substringof('")}', process))`;
    }
    if(products.length){
        if(processes.length){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(substringof('${products.join("', tags) or substringof('")}', tags))`;
    }
    if(datePlanedSendStart){
        if(products.length || processes.length){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(datePlanedSend ge datetime'${formatDate(new Date(datePlanedSendStart), 2)}')`;
    }
    if(datePlanedSendEnd){
        if(products.length || processes.length || datePlanedSendStart){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(datePlanedSend le datetime'${formatDate(new Date(datePlanedSendEnd).setDate(new Date(datePlanedSendEnd).getDate()+1), 2)}')`;
    }
    if(typeTask.length){
        if(products.length || processes.length || datePlanedSendStart || datePlanedSendEnd){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(type eq '${typeTask.join("' or type eq '")}')`;
    }
    if(dateRegistrationStart){
        if(products.length || processes.length || datePlanedSendStart || datePlanedSendEnd || typeTask.length){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(dateRegistration ge datetime'${formatDate(new Date(dateRegistrationStart), 2)}')`;
    }
    if(dateRegistrationEnd){
        if(products.length || processes.length || datePlanedSendStart || datePlanedSendEnd || typeTask.length || dateRegistrationStart){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `(dateRegistration le datetime'${formatDate(new Date(dateRegistrationEnd).setDate(new Date(dateRegistrationEnd).getDate()+1), 2)}')`;
    }
        
    if(!myTasksList.checked){
        if(products.length || processes.length || datePlanedSendStart || datePlanedSendEnd || typeTask.length || dateRegistrationStart || dateRegistrationEnd){
            queryFilter += " and "
        }else{
            queryFilter += "&$filter="
        }
        queryFilter += `performer eq '${currentUser.UserName}'`;
    }
        var urlSearchTasks = `${REQUEST_URL}_api/web/lists(guid'${LIST_TASKS_GUID}')/items?$orderby=Modified desc${queryFilter}`;
        getFilteredTasks(urlSearchTasks)
        var filteredTaskList = [];
        function getFilteredTasks(url){
            getData(url)
            .then((data)=>{
                if(data.d.results.length){
                    data.d.results.forEach((itemTask)=>{
                        filteredTaskList.push(itemTask)
                    })
                }else{
                    isSearchOfKeywords(filteredTaskList)
                    //taskList(filteredTaskList);
                }
                if(data.d.__next){
                    getFilteredTasks(data.d.__next);
                }else{
                    isSearchOfKeywords(filteredTaskList)
                    //taskList(filteredTaskList);
                }
            })
            .fail((err)=>{
                delModal()
                console.log(err.responseJSON.error.message.value)
            })
        }
    function isSearchOfKeywords(filteredTaskList){
        const keywords = document.querySelector('.keywords');
        if(keywords.value.length){
            searchOfKeywords(filteredTaskList)
        }else{
            taskList(filteredTaskList);
        }
    }
}