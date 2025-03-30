import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store"; // Adjust path if needed
import ErrorMessage from "../../../utils/components/ErroMessage"; // Adjust path if needed
import LoadingSpinner from "../../../utils/components/LoadingSpinner"; // Adjust path if needed
import { OrderModel } from "../data/orderModel"; // Adjust path if needed
import { OrdersService } from "../data/OrderService"; // Adjust path if needed
// Corrected: Import CartItem from the location you provided
import { CartItem } from "../../cart/data/CartModel"; // Adjust path if needed

// Helper function to format currency
const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Helper function to format date
const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return dateString;
  }
};

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders, // Use the correct slice name
  );
  const userState = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    // Fetch only if the list is empty
    if (orders.length === 0) {
      dispatch(OrdersService.getOrderById(userState!._id));
    }
  }, [dispatch, orders.length]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">My Orders</h1>
      <div className="space-y-6">
        {/* Use order._id as key */}
        {orders.map((order: OrderModel) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            {/* Order Header */}
            <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center border-b">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Order ID: <span className="text-gray-900">{order._id}</span>{" "}
                  {/* Use required _id */}
                </p>
                <p className="text-sm text-gray-600">
                  Placed on: {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-200 text-gray-800" // Default/pending
                  }`}
                >
                  {/* Capitalize status for display (optional) */}
                  {order.status
                    ? order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)
                    : "Pending"}
                </span>
              </div>
            </div>

            {/* Order Body */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Items List */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Items Ordered</h3>
                <ul className="space-y-3">
                  {/* *** CORRECTED PART using CartItem interface *** */}
                  {order.cartItems.map((item: CartItem) => (
                    // Use item._id as it's guaranteed by the interface
                    <li
                      key={item._id}
                      className="flex items-start sm:items-center space-x-3 border-b pb-3 last:border-b-0"
                    >
                      {/* Use item.image */}
                      <img
                        src={item.image || "/placeholder.png"} // Use item.image, provide a fallback
                        alt={item.title || "Product image"} // Use item.title for alt text
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                        onError={(e) =>
                          (e.currentTarget.src = "/placeholder.png")
                        } // Handle broken image links
                      />
                      <div className="flex-grow">
                        {/* Use item.title */}
                        <p className="font-medium text-gray-800">
                          {item.title || "Product Name Missing"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        {/* Optionally display individual item price if needed, though often covered by total */}
                        {/* <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p> */}
                      </div>
                      {/* Show total price for this line item (quantity * price) */}
                      <p className="text-sm font-semibold text-gray-800 flex-shrink-0">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                  {/* *** END OF CORRECTED PART *** */}
                </ul>
              </div>

              {/* Order Summary & Shipping */}
              <div className="md:col-span-1 space-y-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                  <div className="text-sm space-y-1">
                    {/* Calculate subtotal by summing item totals if needed, or use total - shipping */}
                    {/* Calculation based on assumption totalAmount INCLUDES shipping */}
                    <p className="flex justify-between">
                      <span>Subtotal:</span>{" "}
                      <span>
                        {formatCurrency(order.totalAmount - order.shippingCost)}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Shipping:</span>{" "}
                      <span>{formatCurrency(order.shippingCost)}</span>
                    </p>
                    <p className="flex justify-between font-bold text-base border-t pt-1 mt-1">
                      <span>Total:</span>{" "}
                      <span>{formatCurrency(order.totalAmount)}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Shipping Address
                  </h3>
                  <address className="text-sm text-gray-700 space-y-1 not-italic">
                    {" "}
                    {/* Use <address> tag */}
                    <p>
                      {order.shippingAddress.street}
                      {order.shippingAddress.details
                        ? `, ${order.shippingAddress.details}`
                        : ""}
                    </p>
                    <p>
                      {order.shippingAddress.governorate},{" "}
                      {order.shippingAddress.country}
                    </p>
                    <p>Postal Code: {order.shippingAddress.postalCode}</p>
                    <p>Phone: {order.shippingAddress.phone}</p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
