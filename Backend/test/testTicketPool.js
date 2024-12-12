const TicketPool = require('../controllers/TicketPool');

function runTests() {
    console.log("Starting TicketPool Tests...\n");

    // Initialize test parameters
    const vendor = 'Vendor1';
    const maxTicketCapacity = 50;
    const totalTickets = 100;
    const ticketReleaseRate = 10; 
    const customerRetrievalRate = 5; 
    const title = 'Concert';

    const ticketPool = new TicketPool(
        vendor,
        maxTicketCapacity,
        totalTickets,
        ticketReleaseRate,
        customerRetrievalRate,
        title,
        500, 
        500 
    );

    // Helper function for test results
    function testResult(testName, condition) {
        if (condition) {
            console.log(`✔ ${testName} Passed\n`);
        } else {
            console.error(`✘ ${testName} Failed\n`);
        }
    }

    // Test 1: Adding Tickets to the Pool
    console.log("Test 1: Adding Tickets to the Pool");
    ticketPool.addTickets(30, vendor);
    testResult(
        "Adding tickets up to 30",
        ticketPool.ticketPool.length === 30
    );

    // Test 2: Exceedinng maximum ticket capacity
    console.log("Test 2: Exceeding Max Ticket Capacity");
    ticketPool.addTickets(100, vendor); 
    if (
        ticketPool.ticketPool.length === maxTicketCapacity &&
        ticketPool.ticketsRemainingToRelease === totalTickets - 30
    ) {
        console.log("✔ Test 2 Passed");
    } else {
        console.error("✘ Test 2 Failed");
        console.log("Pool Size:", ticketPool.ticketPool.length);
        console.log("Tickets Remaining to Release:", ticketPool.ticketsRemainingToRelease);
    }
    
    // Test 3: Purchasing a Ticket
    console.log("Test 3: Purchasing a Ticket");
    const ticketsBefore = ticketPool.ticketPool.length;
    ticketPool.purchaseTicket();
    if (
        ticketPool.ticketPool.length === ticketsBefore - customerRetrievalRate &&
        ticketPool.ticketsSold === customerRetrievalRate
    ) {
        console.log("✔ Test 3 Passed");
    } else {
        console.error("✘ Test 3 Failed");
        console.log("Pool Size:", ticketPool.ticketPool.length);
        console.log("Tickets Sold:", ticketPool.ticketsSold);
    }
    
    // Multiple Customer Purchasing Ticket
    console.log("Test 4: Multiple Customers Purchasing Tickets");
    ticketPool.addTickets(maxTicketCapacity - ticketPool.ticketPool.length, vendor);
    
    const initialTicketCount = ticketPool.ticketPool.length;
    const customers = 10; 
    let ticketsPurchased = 0;
    
    for (let i = 0; i < customers; i++) {
        if (ticketPool.ticketPool.length >= customerRetrievalRate) {
            ticketPool.purchaseTicket();
            ticketsPurchased += customerRetrievalRate;
        } else {
            console.log(`Customer [${i + 2}] could not retrieve tickets: Pool empty.`);
            break;
        }
    }
    
    if (
        ticketPool.ticketsSold === ticketsPurchased &&
        ticketPool.ticketPool.length === initialTicketCount - ticketsPurchased
    ) {
        console.log("✔ Test 4 Passed");
    } else {
        console.error("✘ Test 4 Failed");
        console.log("Tickets Sold:", ticketPool.ticketsSold);
        console.log("Remaining Tickets:", ticketPool.ticketPool.length);
    }
    

    // Test 5: Interrupt Simulation
    console.log("Test 5: Interrupt Simulation");
    ticketPool.interruptSimulation();
    const initialTickets = ticketPool.ticketPool.length;
    ticketPool.addTickets(10, vendor);
    testResult(
        "Adding tickets after interruption",
        ticketPool.ticketPool.length === initialTickets
    );

    // Test 6: Simulation Completion
    console.log("Test 6: Simulation Completion");
    ticketPool.ticketPool = []; 
    ticketPool.ticketsSold = totalTickets;
    ticketPool.purchaseTicket();
    testResult(
        "Checking simulation completion",
        ticketPool.isSimulationComplete()
    );

    console.log("All tests completed.\n");
}

// Run the tests
runTests();
