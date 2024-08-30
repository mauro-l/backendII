/* import nodemailer from "nodemailer";
import envConfig from "../config/env.config.js";

export const sendEmail = async (ticket) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: envConfig.GMAIL_MAIL,
      pass: envConfig.GMAIL_PASS,
    },
  });

  const formattedDate = moment(appointment.date).format("DD/MM/YYYY");
  const formattedTime = moment(appointment.time, "HH:mm:ss").format("HH:mm");
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: appointment.email,
    subject: "Orden de compra",
    html: `
            <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    .header img {
      max-width: 150px;
    }
    .content {
      padding: 20px 0;
    }
    .content h1 {
      color: #000;
      font-size: 24px;
    }
    .content p {
      color: #555;
      line-height: 1.5;
    }
    .status-section {
      margin: 20px 0;
    }
    .status-section h2 {
      font-size: 18px;
      color: #00a650;
    }
    .order-summary {
      margin: 20px 0;
    }
    .order-summary table {
      width: 100%;
      border-collapse: collapse;
    }
    .order-summary th,
    .order-summary td {
      padding: 10px;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
    }
    .order-summary th {
      background-color: #f5f5f5;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-caf3e.appspot.com/o/Backery%2Fbackenry-logo.png?alt=media&token=91587c38-8693-4265-9683-7d7ffd1ded2a" alt="Backery Logo">
    </div>
    <div class="content">
      <h1>Compra confirmada</h1>
      <p>Tu pedido ha sido realizado exitosamente.</p>
      <p>Gracias por tu compra. Te enviaremos un correo electrónico cuando tus artículos esten listos. Si tienes alguna pregunta, puedes llamarnos en cualquier momento al +54 1168712343 o simplemente responder a este correo electrónico.</p>
      <div class="status-section">
        <h2>Pedido confirmado</h2>
      </div>
      <div class="order-summary">
        <h2>Orden 1367612968581-01</h2>
        <p>Realizada el 09/10/2023</p>
        <table>
          <tr>
            <th>Pago</th>
            <td>Visa $ 17.826,00</td>
          </tr>
          <tr>
            <th>Envío</th>
            <td>Panamá 344, Ezpeleta Este, ARG $1.266,00</td>
          </tr>
          <tr>
            <th colspan="2">Resumen</th>
          </tr>
          <tr>
            <th>Subtotal</th>
            <td>$ 16.560,00</td>
          </tr>
          <tr>
            <th>Envío</th>
            <td>$ 1.266,00</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>$ 17.826,00</td>
          </tr>
        </table>
      </div>
      <div class="purchase-section">
        <h2>Tu compra</h2>
        <table>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
          <tr>
            <td>Zapatillas Mamba Talle 41 - Color: Negro</td>
            <td>$ 16.560,00</td>
            <td>1</td>
            <td>$ 16.560,00</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="footer">
      <p>&copy; 2023 Topper. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
        `,
  };
  await transporter.sendMail(mailOptions);
  await transporter.sendMail({
    from: envConfig.GMAIL_MAIL,
    to: email,
    subject: subject,
    text: message,
  });
}; */
