import * as React from 'react';
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function StatsSection({ title = "Event Highlights", stats }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleOpen = (card) => {
    setSelectedCard(card);
    setCurrentSlide(0);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedCard(null);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? selectedCard.slides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === selectedCard.slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>

     
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                cursor: "pointer",
                backgroundColor: "#BE9BCB",
                "&:hover": {
                bgcolor: "#ffe6f0", 
                transform: "scale(1.03)", 
              },
              }}
              onClick={() => handleOpen(stat)}
            >
              <CardContent>
                <Typography variant="h3" sx={{ color: "#632f76ff" }}>
                  {stat.value}
                </Typography>
                <Typography variant="h6">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

     
      {selectedCard && (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              width: "90vw",
              height: "80vh",
              maxWidth: "800px",
              maxHeight: "600px",
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
            },
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${selectedCard.slides[currentSlide].img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "2rem",
              boxSizing: "border-box",
            }}
          >
           
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                zIndex: 1,
                textAlign: "center",
              }}
            >
              {selectedCard.label}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                zIndex: 1,
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedCard.slides[currentSlide].text}
            </Typography>

          
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2rem",
                right: "2rem",
                display: "flex",
                justifyContent: "space-between",
                zIndex: 2,
              }}
            >
              <IconButton onClick={handlePrev} sx={{ color: "white" }}>
                <ArrowBack />
              </IconButton>
              <IconButton onClick={handleNext} sx={{ color: "white" }}>
                <ArrowForward />
              </IconButton>
            </div>

           
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                zIndex: 2,
              }}
            >
              ✕
            </IconButton>
          </div>
        </Dialog>
      )}
    </div>
  );
}
