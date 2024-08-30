export const formatUserCartDTO = (userData) => {
  if (
    !userData ||
    !userData.user ||
    !userData.user.cart ||
    !userData.user.cart.products
  ) {
    return null;
  }

  const simplifiedProducts = userData.user.cart.products.map((item) => {
    const product = item.productId;
    return {
      title: product.title,
      category: product.category,
      price: product.price,
      stock: product.stock,
      quantity: item.quantity,
    };
  });

  return {
    userId: userData.user._id,
    email: userData.user.email,
    role: userData.user.role,
    cart: {
      id: userData.user.cart._id,
      products: simplifiedProducts,
    },
  };
};
