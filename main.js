window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Load tasks from localStorage on page load
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(savedTask => {
        const task_el = createTaskElement(savedTask);
        list_el.appendChild(task_el);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        const task_el = createTaskElement(task);

        list_el.appendChild(task_el);

        // Save tasks to localStorage
        saveTasksToLocalStorage();

        input.value = '';
    });

    function createTaskElement(task) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        // Event listener for Edit and Delete buttons
        task_edit_el.addEventListener('click', (e) => {
            handleEditTask(task_edit_el, task_input_el);
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
            saveTasksToLocalStorage();
        });

        return task_el;
    }

    function handleEditTask(editButton, inputElement) {
        if (editButton.innerText.toLowerCase() == "edit") {
            editButton.innerText = "Save";
            inputElement.removeAttribute("readonly");
            inputElement.focus();
        } else {
            editButton.innerText = "Edit";
            inputElement.setAttribute("readonly", "readonly");
            saveTasksToLocalStorage();
        }
    }

    // Save tasks to localStorage
    function saveTasksToLocalStorage() {
        const tasks = Array.from(list_el.children).map(taskElement => {
            return taskElement.querySelector('.text').value;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
