import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    width: 'calc(25% - 20px)', 
    minWidth: '250px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  cardContent: {
    flexGrow: 1,
  },
  snackbar: {
    bottom: '50px',
  },
}));

const RetrieveTicketPage = () => {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [quantities, setQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(false); 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setSnackbarMessage('Failed to fetch tickets. Please try again later.');
        setOpenSnackbar(true);
      }
    };
    fetchTickets();
  }, []);

  return (
    <Box className={classes.root}>
      <Typography variant="h4" gutterBottom  style={{fontFamily: 'serif',fontWeight: 'bold',color: 'green',textAlign: 'center',marginTop: '40px',}}>
        Available Tickets
      </Typography>
      <Box className={classes.cardContainer}>
        {tickets.map((ticket) => (
        <Card key={ticket._id} className={classes.card} style={{textAlign:'center'}}>
        {ticket.imageUrl ? (
          <img
            src={ticket.imageUrl}
            alt={ticket.title}
            className={classes.cardImage}
          />
        ) : (
          <img
            src="https://images.pexels.com/photos/4452530/pexels-photo-4452530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Fallback image if no image URL is available
            alt="Default image"
            className={classes.cardImage}
          />
        )}

        <CardContent className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {ticket.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {ticket.description}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Rs {ticket.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ fontFamily:'initial'}}
            disabled={isLoading}
          >
            {isLoading ? 'Retrieving...' : 'Purchase Ticket'}
          </Button>
        </CardActions>
        </Card>

        ))}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        className={classes.snackbar}
      />
    </Box>
  );
};

export default RetrieveTicketPage;
