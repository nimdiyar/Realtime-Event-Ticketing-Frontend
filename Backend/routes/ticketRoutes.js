const express = require("express");
const {createTicket, getTickets, startSimulation, stopSimulation,
     getAllTicketLogs, getTicketById, updateTicket, deleteTicket} = require("../controllers/TicketController");
const router = express.Router();

// Route to create a new ticket
router.post("/", createTicket);

// Route to get all the log details
router.get("/logs", getAllTicketLogs);

// Route to get all tickets
router.get("/", getTickets);

// Route to get all tickets
router.get("/:ticketId", getTicketById);

// Route to start ticket simulation
router.post("/simulation/start", startSimulation);

// Route to start ticket simulation
router.post("/simulation/stop", stopSimulation);

// Define route for updating a ticket
router.put("/:ticketId", updateTicket);

// Define route for updating a ticket
router.delete("/:ticketId", deleteTicket);

module.exports = router;
