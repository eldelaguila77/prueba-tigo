import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log("token", token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios
      .get('http://localhost:8080/api/items')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.descripcion}
          subTitle={`$${product.monto}`}
          footer={
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm">Stock: {product.cantidadDisponible}</span>
              <Button
                label="Add"
                icon="pi pi-shopping-cart"
                disabled={product.cantidadDisponible === 0}
                onClick={() => addToCart(product)}
              />
            </div>
          }
        >
          {product.imagen ? (
            <img
              src={`data:image/jpeg;base64,${product.imagen}`}
              alt={product.descripcion}
              className="w-full h-48 object-cover rounded mb-2"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded mb-2">
              No image
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default CatalogPage;
