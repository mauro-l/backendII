//en caso de que se envia una cantidad mediante body se verifica que este sea un numero y sea mayor a 0
const checkQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (
    quantity !== undefined &&
    (typeof quantity !== "number" || quantity <= 0)
  ) {
    return res.status(400).json({
      status: "Error",
      msg: "The amount must be a number and must be greater than 0",
    });
  }
  next();
};

export default checkQuantity;
