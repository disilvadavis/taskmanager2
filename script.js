document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Fetch initial tasks from mock API
    fetchTasks();
  
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const taskText = taskInput.value.trim();
      if (!taskText) {
        alert("Please enter a valid task.");
        return;
      }
  
      addTask(taskText);
      taskInput.value = "";
    });
  
    function addTask(taskText) {
      const li = document.createElement("li");
      li.textContent = taskText;
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
  
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
  
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
      });
  
      deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
      });
  
      // Optionally send to backend (mock API)
      postTaskToServer(taskText);
    }
  
    function fetchTasks() {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then((res) => res.json())
        .then((data) => {
          data.forEach((task) => {
            addTask(task.title);
          });
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  
    function postTaskToServer(task) {
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: task,
          completed: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Task posted to server:", data);
      })
      .catch((err) => console.error("Post error:", err));
    }
  });
  