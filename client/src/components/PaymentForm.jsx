import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import { CheckoutContext } from "../contexts/CheckoutContext";

export default function PaymentForm() {
  const { payment, setPayment } = useContext(CheckoutContext);

  const updatePayment = (name, value) => {
    setPayment((prevPayment) => {
      const updatedPayment = [...prevPayment];

      const existingPaymentField = updatedPayment.find(
        (field) => field.name === name);
        
      if (existingPaymentField) {
        existingPaymentField.detail = value;
      } else {
        updatedPayment.push({ name: name, detail: value });
      }
      return updatedPayment;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updatePayment(name, value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom style={{fontFamily: "'Hanken Grotesk', sans-serif"}}>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            name="Card type"
            onChange={handleInputChange}
            style={{fontFamily: "'Hanken Grotesk', sans-serif"}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            name="Card number"
            onChange={handleInputChange}
            style={{fontFamily: "'Hanken Grotesk', sans-serif"}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            name="Expiry date"
            onChange={handleInputChange}
            style={{fontFamily: "'Hanken Grotesk', sans-serif"}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            name="CVV"
            onChange={handleInputChange}
            style={{fontFamily: "'Hanken Grotesk', sans-serif"}}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" style={{fontFamily: "'Hanken Grotesk', sans-serif"}}/>}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
