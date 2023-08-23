import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context, serverUrl } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);
  const handleComplete = async (id) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/tasks/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${serverUrl}/tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${serverUrl}/tasks/new`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${serverUrl}/tasks/mytask`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setTasks(res.data.task);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((task) => (
          <TodoItem
            key={task._id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            handleComplete={() => handleComplete(task._id)}
            handleDelete={() => handleDelete(task._id)}
            id={task._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
