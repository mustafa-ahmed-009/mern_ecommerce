import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { Address } from "../../data/AdressModel";
import { useLocation, useNavigate } from "react-router-dom";
import { CartService } from "../data/CartService";
import toast from "react-hot-toast";
import { OrdersService } from "../../orders/data/OrderService";
import { OrderModel } from "../../orders/data/orderModel";

const CheckOutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const naviagte = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  // Get user addresses from Redux store
  const userState = useSelector((state: RootState) => state.user.user);
  const userAddresses = useSelector(
    (state: RootState) => state.user.user?.addresses || []
  );

  // Total from previous page (you'll pass this as a prop or get from Redux)
  let cartState = useSelector((state: RootState) => state.cart.cart);

  // Total from previous page (you'll pass this as a prop or get from Redux)
  const total = cartState?.totalCartPrice;
  // Example total, replace with actual logic

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleApplyPromoCode = () => {
    try {
      dispatch(CartService.applyCoupon(promoCode)).unwrap();
    } catch (error: any) {
      toast.error(error);
    }
  };
  const getTheCurrentAddressData = (): Address => {
    const arr = userState!.addresses.filter(
      (address) => address._id === selectedAddress
    );
    return arr[0];
  };
  const handleOrderSubmittion = () => {
    if (!selectedAddress?.trim()) toast.error("please choose an address");
    const selectedAddressModel = getTheCurrentAddressData();
    const orderModel: OrderModel = {
      customerId:userState!._id, 
      customerName: userState!.name.trim(), // Ensure no whitespace
      status: "Pending",
      totalAmount: total!,
      shippingCost: 20,
      shippingAddress: {
        country: selectedAddressModel.country,
        governorate: selectedAddressModel.governorate,
        street: selectedAddressModel.street, // Ensure no whitespace
        phone: selectedAddressModel.phone,
        postalCode: selectedAddressModel.postalCode,
        details: selectedAddressModel.details,
      },
      cartItems: cartState?.cartItems || [], // Provide fallback
    };
    console.log(orderModel);

    try {
      dispatch(OrdersService.addOrder(orderModel)).unwrap();
      toast.success("order has been succeffuly placed");
      dispatch(CartService.deleteTheWholeCart()).unwrap();
     naviagte("/orders")
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto space-y-6 my-2">
      {/* Address Selection */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
        {userAddresses.length === 0 ? (
          <div>
            <p className="text-gray-500">No addresses found</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2"
              onClick={() => naviagte("/profile")}
            >
              click here to add an address in the profile page
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {userAddresses.map((address: Address) => (
              <div
                key={address._id}
                className={`p-3 border rounded-lg cursor-pointer ${
                  selectedAddress === address._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleAddressSelection(address._id || "")}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === address._id}
                    onChange={() => handleAddressSelection(address._id || "")}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">{address.street}</p>
                    <p className="text-gray-600">
                      {address.governorate}, {address.country}
                      {address.postalCode ? ` - ${address.postalCode}` : ""}
                    </p>
                    <p className="text-gray-600">{address.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-3">
          <span>Total</span>
          <span className="font-bold">${total!.toFixed(2)}</span>
        </div>
        {cartState?.totalPriceAfterDiscount ? (
          <div>
            <div className="flex justify-between">
              <span>Total after discount :</span>
              <p className="font-bold"> ${cartState.totalPriceAfterDiscount}</p>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Promo Code Section */}
        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={handlePromoCodeChange}
            className="flex-grow p-2 border rounded-lg"
          />
          <button
            onClick={handleApplyPromoCode}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2 
        "
          onClick={handleOrderSubmittion}
        >
          Submit order
        </button>
      </div>
    </div>
  );
};

export default CheckOutPage;
