import React, { useEffect, useState, Fragment } from 'react'; // Added useState, Fragment
import { useDispatch, useSelector } from 'react-redux';
import { OrdersService } from '../../../orders/data/OrderService'; // Adjust path if needed
import { AppDispatch, RootState } from '../../../../redux/store'; // Adjust path if needed
import LoadingSpinner from '../../../../utils/components/LoadingSpinner'; // Assuming you have this
import toast from 'react-hot-toast';
import { OrderModel } from '../../../orders/data/orderModel';

// Define the possible statuses based on your schema
const ORDER_STATUSES: OrderModel['status'][] = ["Pending", "Processing", "Shipped", "Delivered", "Canceled"];

const OrdersManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Select relevant state - *** Updated state path ***
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  // State for managing which order's status is currently being updated
  const [updatingStatusOrderId, setUpdatingStatusOrderId] = useState<string | null>(null);

  // --- State to track expanded rows ---
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(OrdersService.getAllOrders());
  }, [dispatch]);

  // Handler for changing order status - *** Updated action dispatched ***
  const handleStatusChange = async (orderId: string, newStatus: OrderModel['status']) => {
    if (!orderId) return;
    setUpdatingStatusOrderId(orderId);
    try {
      // *** Dispatch the corrected update action ***
      await dispatch(OrdersService.updateOrderStatus({ orderId, status: newStatus })).unwrap();
      toast.success(`Order ${orderId.slice(-6)} status updated to ${newStatus}`);
    } catch (updateError: any) {
      console.error("Failed to update order status:", updateError);
      toast.error(`Failed to update status: ${updateError?.message || 'Unknown error'}`);
    } finally {
      setUpdatingStatusOrderId(null);
    }
  };

  // --- Handler to toggle product details visibility ---
  const toggleRowExpansion = (orderId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [orderId]: !prev[orderId] // Toggle the boolean value
    }));
  };


  // --- Render Logic ---
  if (loading && !orders.length) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error loading orders: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="text-center p-4">No orders found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Orders Management</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* Add a column for the expand button */}
              <th scope="col" className="px-2 py-3 w-12"></th>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Items #</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              // Use Fragment to group the main row and the details row
              <Fragment key={order._id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {/* Expand/Collapse Button Cell */}
                  <td className="px-2 py-4">
                    <button
                      onClick={() => toggleRowExpansion(order._id!)}
                      className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                      aria-expanded={!!expandedRows[order._id!]}
                      aria-label={expandedRows[order._id!] ? "Collapse products" : "Expand products"}
                    >
                      {/* Simple +/- icon or use an SVG */}
                      {expandedRows[order._id!] ? '-' : '+'}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order._id?.slice(-8) || 'N/A'}
                  </td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    ${order.totalAmount?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-4">
                      {order.cartItems.length}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id!, e.target.value as OrderModel['status'])}
                      disabled={updatingStatusOrderId === order._id}
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        updatingStatusOrderId === order._id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {ORDER_STATUSES.map(statusOption => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                    {updatingStatusOrderId === order._id && <span className="text-xs ml-2">Updating...</span>}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {order.shippingAddress?.street}, {order.shippingAddress?.governorate}, {order.shippingAddress?.country} <br/>
                    Ph: {order.shippingAddress?.phone} <br/>
                    Postal: {order.shippingAddress?.postalCode} <br />
                    Details: {order.shippingAddress?.details}
                  </td>
                </tr>

                {/* --- Conditionally Rendered Product Details Row --- */}
                {expandedRows[order._id!] && (
                  <tr className="bg-gray-100 dark:bg-gray-900">
                    {/* Use colSpan to make this cell span all columns */}
                    <td colSpan={8} className="px-6 py-4">
                      <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Order Items:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        {order.cartItems.map(item => (
                          <li key={item._id || item.productId} className="flex items-center justify-between text-sm">
                            <div className='flex items-center'>
                                {item.image && <img src={item.image} alt={item.title} className="w-8 h-8 mr-2 object-cover rounded"/>}
                                <span>{item.title}</span>
                            </div>
                            <span>Qty: {item.quantity} @ ${item.price?.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManagement;