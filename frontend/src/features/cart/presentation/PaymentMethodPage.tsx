import { useState } from "react";

const PaymentMethodPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("cash");

  return (
    <div className="flex flex-col  bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto ">
      <h2 className="text-lg font-semibold mb-4">اختر طريقة الدفع</h2>
      <div className="bg-white p-4 rounded-lg w-full shadow">
        <label className="flex items-center justify-end gap-2 mb-2">
          <span>الدفع عن طريق الفيزا</span>
          <input
            type="radio"
            name="payment"
            value="visa"
            checked={selectedMethod === "visa"}
            onChange={() => setSelectedMethod("visa")}
            className="form-radio accent-black"
          />
        </label>
        <label className="flex items-center justify-end gap-2">
          <span>الدفع عند الاستلام</span>
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={selectedMethod === "cash"}
            onChange={() => setSelectedMethod("cash")}
            className="form-radio accent-black"
          />
        </label>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button className="bg-black text-white px-6 py-2 rounded-lg">اتمام الشراء</button>
        <div className="bg-gray-200 px-4 py-2 rounded-lg">جنيه 34000</div>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
