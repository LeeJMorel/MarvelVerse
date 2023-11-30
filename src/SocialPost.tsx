import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  CardActions,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Kapow from "./assets/kapow.png";
import "./App.scss";
import { SocialPostProps } from "./types";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import * as Images from "./assets/profiles/ProfilePhoto";

interface SocialPostPropsWithCallback extends SocialPostProps {
  onFollowingChange: (selectedUser: string) => void;
  onClose: () => void;
}

const SocialPost: React.FC<SocialPostPropsWithCallback> = ({
  username,
  profile,
  comicsCount,
  followersCount,
  followingList,
  onFollowingChange,
  onClose,
}) => {
  const [liked, setLiked] = useState(false);
  const [showLikedMessage, setShowLikedMessage] = useState(false);
  // eslint-disable-next-line no-useless-escape
  const modifiedTitle = username.replace(/['&.\[\]/-]/g, "");

  const handleLikeClick = () => {
    setLiked(!liked);
    setShowLikedMessage(true);

    // Hide the "Liked!" message after 2 seconds
    setTimeout(() => {
      setShowLikedMessage(false);
    }, 2000);
  };

  const handleFollowingChange = (event: SelectChangeEvent<string>) => {
    console.log("Selected value:", event.target.value);
    onFollowingChange(event.target.value);
  };

  const handleCloseClick = () => {
    onClose();
  };

  const shareUrl = window.location.href;
  const quote = `Check out ${username}'s Marvel Character!`;

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
          title={username}
          subheader={`Comics: ${comicsCount} | Connections: ${followingList.length} | Encounters: ${followersCount}`}
        />
        <div className="image-container">
          <img
            src={Images[modifiedTitle] || Images.DEFAULT}
            alt={`Profile Picture for ${username}`}
          />
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {profile}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="actions">
            <FormControl
              sx={{ m: 1, minWidth: 130, width: "100%" }}
              size="small"
            >
              <InputLabel id="select-label">Connections</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value=""
                onChange={handleFollowingChange}
                label="Connections"
              >
                <MenuItem value="" disabled>
                  Connections
                </MenuItem>
                {followingList.map((follower) => (
                  <MenuItem key={follower} value={follower}>
                    {follower}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </CardActions>
        <div className="share-buttons">
          <FacebookShareButton url={shareUrl} quote={quote}>
            <FacebookIcon size={32} round />
            <FacebookShareCount url={shareUrl} className="share-count" />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={quote}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <TelegramShareButton url={shareUrl} title={quote}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <WhatsappShareButton url={shareUrl} title={quote}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={quote}
            body={`I thought you might be interested in this Marvel Character: ${window.location.href}`}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </Card>
    </div>
  );
};

export default SocialPost;
