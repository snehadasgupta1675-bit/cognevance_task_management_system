import { useEffect, useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const url =
        filter === "All"
          ? "http://localhost:5000/api/tasks"
          : `http://localhost:5000/api/tasks?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Unable to load tasks");
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [filter]);

  const addTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          status,
          deadline,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Task added successfully!");
        setTitle("");
        setDescription("");
        setStatus("Pending");
        setDeadline("");
        fetchTasks();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Unable to add task");
    }
  };

  const updateTask = async (task) => {
    const newStatus =
      task.status === "Pending"
        ? "In Progress"
        : task.status === "In Progress"
        ? "Completed"
        : "Pending";

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      setMessage("Unable to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMessage("Task deleted successfully!");
        fetchTasks();
      }
    } catch (error) {
      setMessage("Unable to delete task");
    }
  };

  return (
    <div className="dashboard-container"> 
      <h1>Task Management Dashboard</h1>

      <p>{message}</p>

      <h2>Add New Task</h2>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <br />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <br />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      <h2>Your Tasks</h2>
      <div className="filter-section">
      <label>Filter by status: </label>
      
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
</div> 
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task._id}> 
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Deadline: {task.deadline || "No deadline"}</p>

            <button onClick={() => updateTask(task)}>
              Change Status
            </button>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard; 