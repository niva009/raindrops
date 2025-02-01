export const addToCart = (product: { id: number }) => ({
  type: "cart/addToCart",
  payload: product,
});

export const removeFromCart = (product: { id: number }) => ({
  type: "cart/removeFromCart",
  payload: product,
});

export const incrementQuantity = (product: { id: number }) => ({
  type: "cart/incrementQuantity",
  payload: product,
});

export const decrementQuantity = (product: { id: number }) => ({
  type: "cart/decrementQuantity",
  payload: product,
});

export const viewCart = () => ({
  type: "cart/viewCart",
});

