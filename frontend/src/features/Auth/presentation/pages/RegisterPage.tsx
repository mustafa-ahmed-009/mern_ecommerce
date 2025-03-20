import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4">إنشاء حساب جديد</h2>

        <input
          type="text"
          placeholder="الاسم الكامل..."
          className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="email"
          placeholder="الإيميل..."
          className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="password"
          placeholder="كلمة السر..."
          className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
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
