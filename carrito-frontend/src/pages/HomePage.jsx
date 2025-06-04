import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Card } from 'primereact/card';
import { format } from 'date-fns';

const HomePage = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("auth", auth);
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/cart/user/${auth?.user?.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    if (auth?.user?.id) fetchOrders();
  }, [auth]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const total = order.details.reduce(
              (sum, item) => sum + item.itemPrice * item.quantity,
              0
            );

            return (
              <Card
                key={order.id}
                className="p-4 border-1 surface-border border-round shadow-2"
              >
                <div className="flex justify-content-between align-items-center mb-3">
                  <h3>Order #{order.id}</h3>
                  <small className="text-secondary">
                    {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                  </small>
                </div>

                <ul className="list-none p-0 m-0">
                  {order.details.map((item) => (
                    <li key={item.id} className="mb-2">
                      {item.itemDescription} — {item.quantity} × ${item.itemPrice.toFixed(2)} = <strong>${(item.itemPrice * item.quantity).toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>

                <div className="text-right font-bold mt-3">
                  Total: ${total.toFixed(2)}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
