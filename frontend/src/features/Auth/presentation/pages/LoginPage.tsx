import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../data/AuthService"; // Ensure path is correct
import { AppDispatch } from "../../../../redux/store"; // Ensure path is correct
import toast from "react-hot-toast";
import { UserService } from "../../../data/UserService"; // Ensure path is correct
import { CartService } from "../../../cart/data/CartService";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email.trim() || !formData.password.trim()) {
      // Use English error message
      toast.error("Please enter both email and password");
      return;
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // Use English error message
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      // Using unwrap() allows catching specific errors from rejected thunks directly
      await dispatch(AuthService.login(formData)).unwrap();
      await dispatch(UserService.checkAuth()).unwrap();
      await dispatch(CartService.getUserCartItems()).unwrap();

      // Use English success message
      toast.success("Logged in successfully");
      navigate("/"); // Redirect to home page after successful login
    } catch (error: any) {
      // `error` here will be the value passed to rejectWithValue in the thunk
      const errorMessage = error?.message || error || "An error occurred during login";
      // Use English error message
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        {/* Use English title */}
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            // Use English placeholder
            placeholder="Email..."
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400" // Removed text-right
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
            // Removed dir="ltr" - default browser behavior is LTR
          />
          <input
            type="password"
            name="password"
            // Use English placeholder
            placeholder="Password..."
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400" // Removed text-right
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50" // Ensure 'primary' is defined in Tailwind or replace
            disabled={loading}
          >
            {/* Use English button text */}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Use English text */}
        <p className="text-center text-sm mt-3">
          Don't have an account?{" "}
          {/* Use English link text */}
          <Link to="/register" className="text-red-500 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;