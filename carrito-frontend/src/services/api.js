import axios from 'axios';

export const createOrder = async (userId, items, token) => {
  const response = await axios.post(
    'http://localhost:8080/api/cart',
    {
      userId,
      status: 'ORDER',
      details: items.map(item => ({
        itemId: item.id,
        quantity: item.quantity,
      })),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
