/* "status": "success",
    "product": {
        "_id": "667a161bbc3fcc8a9eaaafa4",
        "title": "Tiramisu",
        "description": "Vainillas embebidas en licor de café, con crema mascarpone y cobertura de cacao amargo.",
        "price": 10500,
        "thumbnail": [
            "https://d22fxaf9t8d39k.cloudfront.net/bd0895c0f274d4f041194286cc8f4961ffffdb5e3f80be89b295a26c251fac7821167.png"
        ],
        "code": "TRT006",
        "stock": 16,
        "category": "tortas",
        "status": true,
        "__v": 0
    } */

export const resProductDTO = (product) => {
  return {
    title: product.title,
    category: product.category,
    price: product.price,
    stock: product.stock,
  };
};
