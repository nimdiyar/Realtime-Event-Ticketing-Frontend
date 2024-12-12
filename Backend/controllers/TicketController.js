const Ticket = require("../models/Ticket");
const TicketPool = require("./TicketPool"); 

// Object to hold active simulations by ticketId
const simulations = {};

// Add ticket configurations to the database
const createTicket = async (req, res) => {
  const { vendor, title, description, totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity, price, imageUrl, releaseInterval, retrievalInterval  } = req.body;

  try {
    const ticket = await Ticket.create({ vendor, title, description, totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity, price, imageUrl, releaseInterval, retrievalInterval  });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all the ticket details from the daytabase
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    if (!tickets.length) {
      return res.status(404).json({ error: "No tickets found" });
    }
    res.status(200).json(tickets); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

// Method to start the simulation
const startSimulation = async (req, res) => {
  const { ticketId } = req.body;

  try {
    const tickets = await Ticket.find({ _id: ticketId });

    tickets.forEach((ticket) => {
      const ticketPool = new TicketPool(
        ticket.vendor,
        ticket.maxTicketCapacity,
        ticket.totalTickets,
        ticket.ticketReleaseRate,
        ticket.customerRetrievalRate,
        ticket.title,
        ticket.releaseInterval,
        ticket.retrievalInterval
      );

      ticketPool.addTickets(ticket.totalTickets);

      // Save reference to the active simulation
      simulations[ticket._id.toString()] = ticketPool;  

      console.log(`Simulation started for ticketId: ${ticket._id}`);

    });

    res.status(200).json({ success: true, message: "Simulation started." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Method to stop the simulation
const stopSimulation = async (req, res) => {
  const { ticketId } = req.body;

  if (!ticketId) {
    return res.status(400).json({ error: "Ticket ID is required" });
  }

  try {
    // Ensure ticketId is a string for comparison
    const ticketPool = simulations[ticketId.toString()];

    if (ticketPool) {
      // Stop the active simulation
      ticketPool.interruptSimulation();
      
      // Remove the simulation reference from the active simulations
      delete simulations[ticketId.toString()];

      console.log(`Simulation for ticket ${ticketId} stopped.`);
      res.status(200).json({
        success: true,
        message: `Simulation for ticket ${ticketId} stopped successfully.`,
      });
    } else {
      // Simulation not found
      res.status(404).json({
        error: `No active simulation found for ticket ${ticketId}.`,
      });
    }
  } catch (error) {
    console.error("Error stopping simulation:", error.message); 
    res.status(500).json({
      error: "An error occurred while stopping the simulation. Please try again later.",
    });
  }
};

// Method to retrurn all the log details
const getAllTicketLogs = async (req, res) => {
  try {
    // Check if there are any active simulations
    if (Object.keys(simulations).length === 0) {
      return res.status(404).json({ error: "No active ticket simulations found." });
    }

    // Collect logs from all active simulations
    let allLogs = [];

    for (const ticketId in simulations) {
      const ticketPool = simulations[ticketId];
      const logs = ticketPool.getLogs(); 
      allLogs = allLogs.concat(logs); 
    }

    // Return the collected logs
    if (allLogs.length > 0) {
      res.status(200).json({ logs: allLogs });
    } else {
      res.status(404).json({ error: "No logs available." });
    }
  } catch (error) {
    console.error("Error retrieving ticket logs:", error.message); 
    res.status(500).json({ error: "An error occurred while retrieving logs." });
  }
};

// Method to get the ticket by its Id
const getTicketById = async (req, res) => {
  const { ticketId } = req.params; 

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the ticket" });
  }
};

// Metjod to update the tivket by its id
const updateTicket = async (req, res) => {
  const { ticketId } = req.params;  
  const updateData = req.body;     

  try {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, updateData, {
      new: true,        
      runValidators: true, 
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully.",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the ticket" });
  }
};



// Controller for deleting a ticket by ticketId
const deleteTicket = async (req, res) => {
  const { ticketId } = req.params;  

  try {
    const ticket = await Ticket.findByIdAndDelete(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the ticket" });
  }
};

module.exports = {createTicket,  getTickets,  startSimulation, stopSimulation, getAllTicketLogs, getTicketById, updateTicket, deleteTicket};
