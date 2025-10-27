import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuthStore";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold hover:text-blue-400">
          Blogify
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          {user && (
            <>
              <Link to="/user-posts" className="hover:text-blue-400">
                My Posts
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 focus:outline-none"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-400">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
