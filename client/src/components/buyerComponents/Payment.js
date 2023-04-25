import { useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';



export default function PaymentForm() {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDhlDelivery, setIsDhlDelivery] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const paymentGatewayImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-vsP61AKGQ6dmk4jORL7YBkfhLMneFP3JEXfY-b9NEBZ35Hx0aoz1wF8_8bpWZBFLWg&usqp=CAU'

  const handleSubmit = (event) => {
    event.preventDefault();
    // Include the logic for submitting the payment on the server side
    setIsPaymentSuccessful(true);
  };

  return (
    <Grid container sx={{ mt: 12 }} spacing={2} style={{ backgroundColor: "#F1F6F9" }} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Card >
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={paymentGatewayImage} alt="Payment Gateway" style={{ width: '200px', height: '80px' }}/>
            </div>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Name on card"
                    value={nameOnCard}
                    onChange={(event) => setNameOnCard(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Card number"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                  />
                </Grid>
                <Grid container item spacing={2} xs={12}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      label="Expiry date"
                      value={expiryDate}
                      onChange={(event) => setExpiryDate(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      label="CVV"
                      value={cvv}
                      onChange={(event) => setCvv(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isDhlDelivery}
                        onChange={(event) =>
                          setIsDhlDelivery(event.target.checked)
                        }
                        name="dhlDeliverySwitch"
                        color="primary"
                      />
                    }
                    label="DHL Delivery"
                  />
                </Grid>
                {isDhlDelivery && (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Shipping address"
                      value={shippingAddress}
                      onChange={(event) =>
                        setShippingAddress(event.target.value)
                      }
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    margin="normal"
                    value={emailAddress}
                    onChange={(event) => setEmailAddress(event.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Pay now
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
            {isPaymentSuccessful && (
            <div
                style={{
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '1rem',
                marginTop: '1rem',
                borderRadius: '0.25rem',
                }}
            >
                <Typography align="center">
                Payment successful! Thank you for your purchase.
                </Typography>
            </div>
        )}
          </Grid>
        </Grid>
);
}        
