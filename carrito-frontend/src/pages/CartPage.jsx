import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { createOrder } from '../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  console.log('Cart items:', items); // Para depurar los items del carrito
  const { auth } = useAuth(); // auth.user.id y auth.token
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.monto * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await createOrder(auth.user.id, items, auth.token);
      clearCart();
      alert('¡Orden guardada con éxito!');
      navigate('/'); // o redirigir a /orders cuando exista
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Hubo un problema al guardar la orden.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`data:image/jpeg;base64,${item.imagen}`}
                  alt={item.descripcion}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-bold">{item.nombre}</h4>
                  <p>${item.precio} x {item.quantity}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <InputNumber
                  value={item.quantity}
                  onValueChange={(e) =>
                    updateQuantity(item.id, Math.min(e.value, item.stock))
                  }
                  min={1}
                  max={item.stock}
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">
            Total: ${total.toFixed(2)}
          </div>

          <Button
            label="Checkout"
            icon="pi pi-check"
            loading={loading}
            disabled={loading}
            onClick={handleCheckout}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;