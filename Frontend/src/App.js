import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home_Page from "./pages/Home_Page";
import Ticket_Configuration from "./pages/Ticket_Configuration";
import View_Tickets from "./pages/View_Tickets";
import Update_Ticket from "./pages/Update_Ticket";
import User_Login from "./pages/User_Login";
import User_SignUp from "./pages/User_SignUp";
import Purchase_Ticket from "./pages/Purchase_Ticket";
import Ticket_Logging from "./pages/Ticket_Logging";
import Ticket_Report from './pages/Ticket_Report';

function App() {
  return (
      <div>
        <Navbar />
        <Routes>
              <Route path="/" element={<Home_Page />} />
              <Route path="/add-ticket" element={<Ticket_Configuration />} />
              <Route path="/view-tickets" element={<View_Tickets />} />
              <Route path="/avilable-tickets" element={<Purchase_Ticket />} />
              <Route path="/update-ticket/:id" element={<Update_Ticket />} />
              <Route path="/login" element={<User_Login />} />
              <Route path="/signup" element={<User_SignUp />} />
              <Route path="/logs" element={<Ticket_Logging />} />
              <Route path="/report" element={<Ticket_Report />} />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
