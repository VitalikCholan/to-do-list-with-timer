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
const taskTemplate = document.getElementById('task-template');
const addTask = document.querySelector('.add-task');
const newTask = document.querySelector('.new-task');
const deleteTask = document.querySelector('.btn-delete-task');

// Local storage
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsNames.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})

tasksNames.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        save();
        renderTaskCount(selectedList);
    }
})

deleteList.addEventListener('click', () => {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
})

deleteTask.addEventListener('click', () => {
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
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

addTask.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = newTask.value;
    if (taskName === null || taskName === '') {
        return null;
    }
    const task = createTask(taskName);
    newTask.value = null;
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(task);
    saveAndRender();
})

function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] };
}

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false };
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
    renderList();
    const selectedList = lists.find(list => list.id === selectedListId);
    if (selectedListId === null) {
        tasksBox.style.display = 'none' ;
    } else {
        tasksBox.style.display = '';
        tasksTitle.innerText = selectedList.name;
        renderTaskCount(selectedList); 
        clearElement(tasksNames);
        renderTasks(selectedList);
    }
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        tasksNames.appendChild(taskElement);
    })
}

function renderTaskCount(selectedList) {
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTasksCount === 1 ? 'task' : 'tasks';
    tasksCount.innerText = `${incompleteTasksCount} ${taskString} remaining`;
}

function renderList() {
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add('list-name');
        listElement.innerText = list.name;
        if (list.id === selectedListId) {
            listElement.classList.add('active-list');
        }
        listsNames.appendChild(listElement);
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

render();

