let clearButton = document.querySelector('#clearButton');
let addButton = document.querySelector('#addButton');
let taskText = document.querySelector('input');
let ul = document.querySelector('ul');
let displayAll = document.querySelectorAll('.sort-Buttons')[0];
let displayActive = document.querySelectorAll('.sort-Buttons')[1];
let displayCompleted = document.querySelectorAll('.sort-Buttons')[2];
let itemsLeft = document.querySelector('#items-left-p');


let creatCheckIcon = () => {
    let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "11");
    svgElement.setAttribute("height", "9");

    let pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("fill", "none");
    pathElement.setAttribute("stroke", "#FFF");
    pathElement.setAttribute("stroke-width", "2");
    pathElement.setAttribute("d", "M1 4.304L3.696 7 9 1"); 

    svgElement.appendChild(pathElement);
    return svgElement
}

let creatCrossIcon = () => {
    let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "18");
    svgElement.setAttribute("height", "18");

    let pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("fill", "#494C6B");
    pathElement.setAttribute("fill-rule", "evenodd");
    pathElement.setAttribute("d", "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"); 

    svgElement.appendChild(pathElement);
    return svgElement
}

let creatButton = (task) => {

    let button = document.createElement("button");
    button.type = "button";
    button.className = "uncompleted-task-icon";
    task.insertBefore(button, task.firstChild);

    button.addEventListener('click', () => {

        if(button.children.length == 0) {
            button.appendChild(creatCheckIcon());
        } else {
            button.firstChild.remove();
        }

        button.className = (button.className == "uncompleted-task-icon") ? "completed-task-icon": "uncompleted-task-icon";
        task.className = (task.className == "completed-task") ? task.className = "uncompleted-task" : "completed-task";
        } )
}

let creatDeleteButton = (task) => {

    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "deleteButtons";
    deleteButton.appendChild(creatCrossIcon());
    task.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        task.classList.add("animate__animated","animate__fadeOutRight");
        setTimeout(() => {
            task.remove()
        }, 800);
        itemsLeft.textContent = `${document.querySelectorAll('li').length - 1} items left`
    }) 
}

let creatTask = () => {
    if(taskText.value.length != 0) {
       
        let task = document.createElement("li");
        task.draggable = "true";
        task.textContent = taskText.value;
        taskText.value = "";
        task.className = "uncompleted-task animate__animated animate__fadeInLeft";
        ul.insertBefore(task, ul.firstChild);
        task.classList.remove("animate__animated", "animate__fadeInLeft");

        creatButton(task);
        creatDeleteButton(task);
        itemsLeft.textContent = `${document.querySelectorAll('li').length - 1} items left`     

        updateDraggables();
    }
}

let removeCompletedTasks = () => {
    let liElements = document.querySelectorAll('li');
    for(let i = 0; i < liElements.length - 1; i++) {
        if(liElements[i].firstChild.className == "completed-task-icon") {
            liElements[i].classList.add("animate__animated","animate__fadeOutRight")
            setTimeout(() => {
                liElements[i].remove()
            }, 800);
        }
    }
    itemsLeft.textContent = `${liElements.length - 1} items left`
}

let sortTasks = (completed) => {
    let liElements = document.querySelectorAll('li');
    for(let i = 0; i < liElements.length - 1; i++) {
        if(liElements[i].classList.contains(completed)) {
            liElements[i].classList.remove('hidden');
        } else {
            liElements[i].classList.add('hidden');
        }
    }
}

let displayAllTasks = () => {
    displayActive.classList.remove('clickedSortButton');
    displayCompleted.classList.remove('clickedSortButton');
    displayAll.classList.add('clickedSortButton');
    let liElements = document.querySelectorAll('li');
    for(let i = 0; i < liElements.length - 1; i++) {
        liElements[i].classList.remove('hidden');
    }
}

addButton.addEventListener('click', creatTask);


clearButton.addEventListener('click', removeCompletedTasks);


displayActive.addEventListener('click', () => {
    displayActive.classList.add('clickedSortButton');
    displayCompleted.classList.remove('clickedSortButton');
    displayAll.classList.remove('clickedSortButton');
    sortTasks("uncompleted-task");
})
displayActive.addEventListener('mouseenter', () => {
    displayActive.classList.add('hoverOverSortButtons');
})
displayActive.addEventListener('mouseleave', () => {
    displayActive.classList.remove('hoverOverSortButtons');
})



displayCompleted.addEventListener('click', () => {
    displayActive.classList.remove('clickedSortButton');
    displayCompleted.classList.add('clickedSortButton');
    displayAll.classList.remove('clickedSortButton');
    sortTasks("completed-task");
})
displayCompleted.addEventListener('mouseenter', () => {
    displayCompleted.classList.add('hoverOverSortButtons');
})
displayCompleted.addEventListener('mouseleave', () => {
    displayCompleted.classList.remove('hoverOverSortButtons');
})



displayAll.addEventListener('click', displayAllTasks)
displayAll.addEventListener('mouseenter', () => {
    displayAll.classList.add('hoverOverSortButtons');
})
displayAll.addEventListener('mouseleave', () => {
    displayAll.classList.remove('hoverOverSortButtons');
})

taskText.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') {
        creatTask();
    }
})



ul.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(e.clientY);
    const draggable = document.querySelector('.dragging');

    if(afterElement === null) {
        ul.appendChild(draggable);
    } else {
        ul.insertBefore(draggable, afterElement);
    }
})

function getDragAfterElement(y) {
    const draggableElements = [...document.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = (y - box.top - box.height / 2);
        
        if(offset < 0 && offset > closest.offset) {
            return { offset : offset , element : child}
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const updateDraggables = () => {
    const draggables = document.querySelectorAll('li:not(#last-li-element)');

    draggables[0].addEventListener('dragstart', () => {
        draggables[0].classList.add('dragging');
    })

    draggables[0].addEventListener('dragend', () => {
        draggables[0].classList.remove('dragging');
    })
}



