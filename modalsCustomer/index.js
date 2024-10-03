document.addEventListener('DOMContentLoaded', function(){
    setModal();
    let mainFrame = document.querySelector('.mainFrame');
    let modeTasks = `<div class="modeTasks">
                        <div class="searchPanel"></div>
                        <div class="listTasks"></div>
                    </div>
                    <div class="modalContainer"></div>`;
                    
    mainFrame.innerHTML = modeTasks;
    getCurretUser();
    setTimeout(()=>{
        taskList(false);
        searchPanel();
    }, 1000);
    
})
