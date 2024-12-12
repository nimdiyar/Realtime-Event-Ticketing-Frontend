const mongoose = require("mongoose");

// Customer schema definition
const customerSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  nic: { 
    type: String, 
    required: true, 
    unique: true 
  },
  contact: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  },
  confirmPassword: { 
    type: String, 
    required: true 
  },
});

module.exports = mongoose.model("Customer", customerSchema);
