const generateProductRows = (ticketItems) => {
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/ecommerce-caf3e.appspot.com/o/Backery%2Fbackery-logo.png?alt=media&token=6ca5eb8d-5dce-406d-b8b6-70d606df0f54";
  return ticketItems
    .map(
      (item) => `
        <tr>
          
          <td style="border-bottom: 1px solid #e0e0e0;">
            <img src="${
              item.productId.thumbnail || defaultImage
            }" alt="Producto" width="50" height="50" style="vertical-align: middle; margin-right: 10px;">
            ${item.product}
          </td>
          <td align="right" style="border-bottom: 1px solid #e0e0e0;">$${item.price.toFixed(
            2
          )}</td>
          <td align="center" style="border-bottom: 1px solid #e0e0e0;">${
            item.quantity
          }</td>
          <td align="right" style="border-bottom: 1px solid #e0e0e0;">$${(
            item.price * item.quantity
          ).toFixed(2)}</td>
        </tr>
      `
    )
    .join("");
};

const formatDatetime = (ticket) => {
  const localDateTime = new Date(ticket.purchase_datatime).toLocaleString(
    "es-AR",
    {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );

  const [date, time] = localDateTime.split(", ");

  return {
    date: date,
    time: time,
  };
};

export const generateEmailHtml = (ticket) => {
  const productRows = generateProductRows(ticket.items);
  const { date, time } = formatDatetime(ticket);

  return `
        <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Compra - Backery</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
        <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-caf3e.appspot.com/o/Backery%2Fbackery-logo.png?alt=media&token=6ca5eb8d-5dce-406d-b8b6-70d606df0f54" alt="Backery Logo" style="max-width: 150px;">
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <h1 style="color: #000; font-size: 24px;">Compra confirmada</h1>
        <h3 style="color: #333;">Tu pedido ha sido realizado exitosamente.</h3>
        <p style="color: #555; line-height: 1.5;">Gracias por tu compra. Te enviaremos un correo electrónico cuando tus artículos estén listos. Si tienes alguna pregunta, puedes llamarnos en cualquier momento al +54 1168712343 o simplemente responder a este correo electrónico.</p>
        <h2 style="color: #32be00; font-size: 18px;">Pedido confirmado</h2>
        <h2 style="font-size: 18px;">Orden ${ticket.code}</h2>
        <p>Realizada el ${date} - ${time}</p>
        <table cellpadding="10" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
          <tr>
            <th align="left" style="background-color: #f5f5f5; border-bottom: 1px solid #e0e0e0;">Pago</th>
            <td style="border-bottom: 1px solid #e0e0e0;">En efectivo</td>
          </tr>
          <tr>
            <th align="left" style="background-color: #f5f5f5; border-bottom: 1px solid #e0e0e0;">Envío</th>
            <td style="border-bottom: 1px solid #e0e0e0;"> - </td>
          </tr>
          <tr>
            <th align="left" colspan="2" style="background-color: #f5f5f5; border-bottom: 1px solid #e0e0e0;">Resumen</th>
          </tr>
          <tr>
            <th align="left" style="border-bottom: 1px solid #e0e0e0;">Subtotal</th>
            <td style="border-bottom: 1px solid #e0e0e0;">$ ${ticket.amount}</td>
          </tr>
          <tr>
            <th align="left" style="border-bottom: 1px solid #e0e0e0;">Envío</th>
            <td style="border-bottom: 1px solid #e0e0e0;"> - </td>
          </tr>
          <tr>
            <th align="left" style="border-bottom: 1px solid #e0e0e0;">Total</th>
            <td style="border-bottom: 1px solid #e0e0e0;">$ ${ticket.amount}</td>
          </tr>
        </table>
        <h2 style="font-size: 18px;">Tu compra</h2>
        <table cellpadding="10" cellspacing="0" border="0" width="100%" style="border: 1px solid #e0e0e0;">
          <tr style="background-color: #f5f5f5;">
            <th align="left" style="border-bottom: 1px solid #e0e0e0;">Producto</th>
            <th align="right" style="border-bottom: 1px solid #e0e0e0;">Precio</th>
            <th align="center" style="border-bottom: 1px solid #e0e0e0;">Cantidad</th>
            <th align="right" style="border-bottom: 1px solid #e0e0e0;">Subtotal</th>
          </tr>
          ${productRows}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
        <p>&copy; 2024 Backery. Todos los derechos reservados.</p>
      </td>
    </tr>
  </table>
</body>
</html>
        `;
};
