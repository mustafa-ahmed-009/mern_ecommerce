import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../redux/store"; // Ensure path is correct
import { AuthService } from "../../data/AuthService"; // Ensure path is correct
import toast from "react-hot-toast";
import { UserService } from "../../../data/UserService"; // Ensure path is correct
import { CartService } from "../../../cart/data/CartService";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [loading, setLoading] = useState(false); // Added loading state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => { // Changed to MouseEvent for button onClick
    e.preventDefault(); // Prevent default form submission if wrapped in form later

    const { name, email, password, passwordConfirm } = formData;

    // Validation
    if (!name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }
    if (password.length < 6) { // Example: Add password length check
       toast.error("Password must be at least 6 characters long");
       return;
    }
    if (!passwordConfirm.trim()) {
      toast.error("Please confirm your password");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true); // Set loading true before dispatch
    try {
      // Use unwrap to catch potential rejections from the thunk
      await dispatch(AuthService.register({ name, email, password, passwordConfirm })).unwrap();
      // Check auth might be needed depending on whether register logs the user in
      await dispatch(UserService.checkAuth()).unwrap();
  await dispatch(CartService.getUserCartItems()).unwrap();
      // Use English success message
      toast.success("Registration successful! Please log in."); // Adjusted message
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error: any) {
      // Use English error message
      const errorMessage = error?.message || error || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
       setLoading(false); // Set loading false after operation completes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        {/* Use English title */}
        <h2 className="text-xl font-bold text-center mb-4">Create New Account</h2>

        {/* Consider wrapping inputs in a <form> tag if needed, though onClick handles submission here */}
        <input
          type="text"
          name="name"
          // Use English placeholder
          placeholder="Full Name..."
          className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={formData.name}
          onChange={handleInputChange}
          disabled={loading} // Disable input during loading
        />
        <input
          type="email"
          name="email"
          // Use English placeholder
          placeholder="Email..."
          className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading} // Disable input during loading
        />
        <input
          type="password"
          name="password"
          // Use English placeholder
          placeholder="Password..."
          className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={formData.password}
          onChange={handleInputChange}
          disabled={loading} // Disable input during loading
        />
        <input
          type="password"
          name="passwordConfirm"
          // Use English placeholder
          placeholder="Confirm Password..."
          className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={formData.passwordConfirm}
          onChange={handleInputChange}
          disabled={loading} // Disable input during loading
        />

        <button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50" // Ensure 'primary' is defined in Tailwind or replace
          onClick={handleRegister}
          disabled={loading} // Disable button during loading
        >
          {/* Use English button text */}
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Use English text */}
        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          {/* Use English link text */}
          <Link to="/login" className="text-red-500 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;