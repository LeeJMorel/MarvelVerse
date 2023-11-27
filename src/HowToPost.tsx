import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./App.scss";

interface HowToPostPropsWithCallback {
  onClose: () => void;
}

const HowToPost: React.FC<HowToPostPropsWithCallback> = ({ onClose }) => {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="social-container">
      <Card className="MuiCard-root">
        <div className="social-heading">
          <h2 className="social-title">Welcome</h2>
          <div className="icon">
            <IconButton
              aria-label="Close"
              className="close-icon"
              onClick={handleCloseClick}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <CardHeader
          title="How to Navigate the MarvelVerse"
          subheader="The MarvelVerse is a way to engage with the history and social network of your favorite marvel heros."
        />
        <img src="url-to-heros-image" alt="User's Post" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            "Blah Blah Do Stuff"
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default HowToPost;
