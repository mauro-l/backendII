import { ticketModel } from "../models/ticket.model.js";

const getAllTickets = async (query, options) => {
  const tickets = await ticketModel.paginate(query, options);

  return tickets;
};

const createTickets = async (body) => {
  const ticket = await ticketModel.create(body);
  return ticket;
};

const getTicketsById = async (id) => {
  const ticket = await ticketModel.findById(id);
  return ticket;
};

const updateTickets = async (id, data) => {
  const ticketsUpdate = await ticketModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return ticketsUpdate;
};

const deleteTickets = async (id) => {
  const tickets = await ticketModel.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  return tickets;
};

export default {
  createTickets,
  getAllTickets,
  getTicketsById,
  updateTickets,
  deleteTickets,
};
