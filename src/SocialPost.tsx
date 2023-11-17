import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import Kapow from "./assets/kapow.png";
import "./App.scss";

const SocialPost = () => {
  const [liked, setLiked] = useState(false);
  const [showLikedMessage, setShowLikedMessage] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    setShowLikedMessage(true);

    // Hide the "Liked!" message after 2 seconds
    setTimeout(() => {
      setShowLikedMessage(false);
    }, 2000);
  };

  return (
    <div className="social-container">
      <Card className="MuiCard-root">
        <div className="social-heading">
          <h2 className="social-title">MarvelMingle</h2>
          <div className="icon">
            <Fade in={showLikedMessage} timeout={1000}>
              <img src={Kapow} alt="Kapow!" className="liked-message" />
            </Fade>
            <IconButton
              aria-label="Favorite this hero!"
              className={`heart-icon ${liked ? "liked" : ""}`}
              onClick={handleLikeClick}
            >
              <Favorite />
            </IconButton>
          </div>
        </div>
        <CardHeader
          title="User Name"
          subheader="Comics: 100 | Followers: 500 | Following: 200"
        />
        <img src="url-to-heros-image" alt="User's Post" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Description of the post goes here.
          </Typography>
        </CardContent>
        <div className="actions">
          <Select value="following" variant="outlined">
            <MenuItem value="following">Following</MenuItem>
            {/* Add the heros connected to them here */}
          </Select>
          <Button variant="outlined">Share</Button>
        </div>
      </Card>
    </div>
  );
};

export default SocialPost;
