document.addEventListener('DOMContentLoaded', function(){
    setModal();
    var mainFrame = document.querySelector('#mainFrame');
    var modeNews = `<div class="modeNews">
                        <div class="searchPanelNews"></div>
                        <div class=listNewsModeNews></div>
                    </div>`;
    var modeTasks = `<div class="modeTasks">
                        <div class="searchPanel"></div>
                        <div class="listTasks"></div>
                    </div>`;
    var administrationPanel = `<div class="administrationPanel">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li><a class="nav-menu active" href="#tasks" aria-controls="tasks" role="tab" data-toggle="tab">Задачи</a></li>
                                    <li><a class="nav-menu" href="#news" aria-controls="news" role="tab" data-toggle="tab">Новости</a></li>
                                </ul>
                                <section class="section section--white">
                                    <div class="tab-content">
                                        <div role="tabpanel" class="tab-pane active" id="tasks">${modeTasks}</div>
                                        <div role="tabpanel" class="tab-pane" id="news">${modeNews}</div>
                                    </div>
                                </section>
                                <div class="modalContainer"></div>
                            </div>`;
    mainFrame.innerHTML = administrationPanel;
    getCurretUser();
    setTimeout(()=>{
        taskList(false);
        searchPanel();
        newsList();
        searchPanelNews();
    }, 1000);
    var tabs = document.querySelectorAll('.nav-menu')
    tabs.forEach((tab)=>{
        tab.addEventListener('click', (e)=>{
            if(e.target.innerHTML == 'Новости'){
                newsList();
                searchPanelNews();
            }else if(e.target.innerHTML == 'Задачи'){
                taskList(false);
                searchPanel();
            }
            
        })
    })
})
