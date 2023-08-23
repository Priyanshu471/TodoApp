import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, serverUrl } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverUrl}/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>TaskFlow</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>LogIn</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
