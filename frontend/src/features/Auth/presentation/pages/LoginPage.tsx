import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../data/AuthService";
import { AppDispatch } from "../../../../redux/store";
import toast from "react-hot-toast";
import { UserService } from "../../../data/UserService";

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
      toast.error("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    try {
      setLoading(true);
      await dispatch(AuthService.login(formData));
      await dispatch(UserService.checkAuth());
      

      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/"); // Redirect to home page after successful login
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4">تسجيل الدخول</h2>
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="الإيميل.."
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="كلمة السر..."
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
          />

          <button 
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-sm mt-3">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-red-500 font-semibold">
            اضغط هنا
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;