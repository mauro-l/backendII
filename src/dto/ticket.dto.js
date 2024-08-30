export const formatTicketDTO = (ticket) => {
  const utcDate = new Date(ticket.purchase_datatime);

  const options = {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const buenosAiresDate = utcDate.toLocaleString("es-AR", options);

  const [datePart, timePart] = buenosAiresDate.split(", ");
  const [day, month, year] = datePart.split("/");
  const [hours, minutes, seconds] = timePart.split(":");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return {
    code: ticket.code,
    purchase_datatime: formattedDate,
    amount: ticket.amount,
    purchaser: ticket.purchaser,
  };
};
