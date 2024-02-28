// For lists
const listsNames = document.querySelector('.lists-names');
const addList = document.querySelector('.add-list');
const newList = document.querySelector('.new-list'); 
const deleteList = document.querySelector('.btn-delete-list');

// For tasks
const tasksBox = document.querySelector('.tasks-box');
const tasksTitle = document.querySelector('.tasks-title');
const tasksCount = document.querySelector('.tasks-count');
const tasksNames = document.querySelector('.tasks-names');

// Local storage
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsNames.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})

deleteList.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
})

addList.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newList.value;
    if (listName === null || listName === '') {
        return null;
    }
    const list = createList(listName);
    newList.value = null;
    lists.push(list);
    saveAndRender();
})

function createList(name) {
    return { id: Date.now().toString(), name: name, task: [] };
}

function saveAndRender() {
    save();
    render();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
    clearElement(listsNames);
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add('list-name');
        listElement.innerText = list.name;
        if (list.id === selectedListId){
            listElement.classList.add('active-list');
        }
        listsNames.appendChild(listElement);
    })
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

render();

