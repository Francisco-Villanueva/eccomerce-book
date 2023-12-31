import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AdressForm.jsx";
import PaymentForm from "./PaymentForm.jsx";
import Review from "./Review.jsx";
import devBookLogo from "../assets/imgs/devbooks-circulo.png";
import ProgressButton from "../commons/Progress_button/ProgessBotton.jsx";
import { CheckoutContext } from "../contexts/CheckoutContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        DevBooks
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export const Checkout = () => {
  const { checkOut } = React.useContext(CheckoutContext);
  const { user } = React.useContext(AuthContext);
  const nav = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          fontFamily: "'Hanken Grotesk', sans-serif",
        }}
      >
        <Toolbar>
          <Typography color="inherit" noWrap display={"flex"}>
            <img
              style={{
                height: "50px",
                width: "50px",
                margin: "auto",
                padding: "auto",
                fontFamily: "'Hanken Grotesk', sans-serif",
              }}
              src={devBookLogo}
              alt="devbooks"
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <Typography component="h1" variant="h4" align="center" style={{fontFamily: "'Hanken Grotesk', sans-serif"}}>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, }} style={{fontFamily: "'Hanken Grotesk', sans-serif"}}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom style={{fontFamily: "'Hanken Grotesk', sans-serif"}}>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1" style={{fontFamily: "'Hanken Grotesk', sans-serif"}}>
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <Button onClick={() => {
                nav("/home")
                window.location.reload()}
              } sx={{marginTop: "15px" ,backgroundColor: "#1565c0", color: "#fff", fontFamily: "'Hanken Grotesk', sans-serif"}}>
                HOME
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1, fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={
                    !(activeStep === steps.length - 1)
                      ? handleNext
                      : () => {
                          console.log();
                        }
                  }
                  sx={{ mt: 3, ml: 1, fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {activeStep === steps.length - 1 ? (
                    <ProgressButton
                      handle={() => {
                        handleNext();
                        checkOut(user.id);
                      }}
                    />
                  ) : (
                    "Next"
                  )}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
};
