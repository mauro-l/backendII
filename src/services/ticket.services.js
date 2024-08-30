import ticketRepository from "../persistence/MongoDB/repository/ticket.repository.js";

const generateOrderCode = () => {
  const prefix = "ORD";
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

const createTicket = async (user, totalCart, purchasedItems) => {
  const newTicket = {
    user: user._id,
    amount: totalCart,
    purchaser: user.email,
    code: generateOrderCode(),
    items: purchasedItems,
  };

  const ticket = await ticketRepository.createTickets(newTicket);
  return ticket;
};

export default { createTicket };
