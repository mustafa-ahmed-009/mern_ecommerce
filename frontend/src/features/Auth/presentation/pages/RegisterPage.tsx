import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../redux/store";
import { AuthService } from "../../data/AuthService";
import toast from "react-hot-toast";
import { UserService } from "../../../data/UserService";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    console.log("is it working"); // This should now appear
    
    const { name, email, password, passwordConfirm } = formData;
    
    // Fixed validation logic
    if (!email.trim() || !password.trim() || !name.trim() || password !== passwordConfirm) {
      toast.error("Please fill all fields correctly and ensure passwords match");
      return;
    }

    try {
      await dispatch(AuthService.register({ name, email, password, passwordConfirm }));
            await dispatch(UserService.checkAuth());
      
      toast.success("Registration successful!");
      navigate("/"); 
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4">إنشاء حساب جديد</h2>

        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل..."
          className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="الإيميل..."
          className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة السر..."
          className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="تأكيد كلمة السر..."
          className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={formData.passwordConfirm}
          onChange={handleInputChange}
        />

        <button 
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-800 transition" 
          onClick={handleRegister} // Fixed: now properly calling the function
        >
          إنشاء الحساب
        </button>

        <p className="text-center text-sm mt-3">
          لديك حساب؟{" "}
          <Link to="/login" className="text-red-500 font-semibold">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;