import { transporter } from "../config/email.config.js";
import envConfig from "../config/env.config.js";
import { generateEmailHtml } from "../utils/emailMessage.js";

const sendTicketEmail = async (ticket) => {
  const emailHtml = generateEmailHtml(ticket);

  const mailOptions = {
    from: envConfig.GMAIL_MAIL,
    to: ticket.purchaser,
    subject: "Backery - Tu pedido fue confirmado con éxito ",
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};

export default {
  sendTicketEmail,
};
