import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  //IconButton,
  Typography,
} from "@mui/material";
//import CloseIcon from "@mui/icons-material/Close";
import "./App.scss";
import { FilterOption } from "./types";

interface HowToPostPropsWithCallback {
  filter: FilterOption;
  //onClose: () => void;
}

const HowToPost: React.FC<HowToPostPropsWithCallback> = ({
  filter,
  //onClose,
}) => {
  // const handleCloseClick = () => {
  //   onClose();
  // };

  // Define content for different filter labels
  const contentMap: Record<
    string,
    { title: string; subheader: string; textBody: string }
  > = {
    showall: {
      title: "Welcome",
      subheader:
        "The MarvelVerse is a way to engage with the history and social network of your favorite Marvel heroes.",
      textBody:
        "To learn more about the major hero teams in Marvel, click a filter in the bottom navigation. If you click to get a closer look at these teams, you can also double-click any of the characters in the teams to learn a bit more about them and who they know in the Marvel social network. We recommend looking at the timeline as well to see more history about the teams.",
    },
    avengers: {
      title: "The Avengers",
      subheader: "Assembling Heroes Since 1963",
      textBody:
        "The Avengers, formed in 1963, have been a symbol of unity and strength. Originally composed of Iron Man, Thor, Hulk, Ant-Man, and Wasp, the team has grown to include many iconic Marvel characters over the years. Known for their epic battles against powerful foes, the Avengers stand as Earth's mightiest heroes.",
    },
    spiderman: {
      title: "Spider-Man",
      subheader: "Swinging Since 1962",
      textBody:
        "Spider-Man, created in 1962, has been swinging through the streets of New York for decades. Peter Parker, a high school student bitten by a radioactive spider, balances the challenges of life and crime-fighting. With his iconic red and blue suit, Spider-Man has become one of Marvel's most beloved characters.",
    },
    xmen: {
      title: "X-Men",
      subheader: "Evolution Since 1963",
      textBody:
        "The X-Men, introduced in 1963, are mutants with extraordinary abilities. Led by Professor Charles Xavier, they seek to coexist with humans while protecting a world that fears them. The X-Men's dynamic stories explore themes of prejudice, identity, and acceptance.",
    },
    fantasticfour: {
      title: "Fantastic Four",
      subheader: "The World's Greatest Since 1961",
      textBody:
        "The Fantastic Four, debuting in 1961, consists of Mr. Fantastic, Invisible Woman, Human Torch, and The Thing. Endowed with unique powers after a space mission gone wrong, they explore the unknown and face cosmic threats. The Fantastic Four is Marvel's first superhero team.",
    },
    midnightsuns: {
      title: "Midnight Sons",
      subheader: "Dark Forces Since 1992",
      textBody:
        "The Midnight Sons, formed in 1992, confront supernatural and mystical threats. Comprising characters like Ghost Rider, Blade, and Morbius, they battle dark forces that lurk in the shadows. The Midnight Sons bring a supernatural edge to the Marvel Universe.",
    },
    defenders: {
      title: "The Defenders",
      subheader: "Protecting Reality Since 1971",
      textBody:
        "The Defenders, established in 1971, are a unique team brought together by mystical and cosmic forces. With ever-changing members, including Doctor Strange, Hulk, and Silver Surfer, the Defenders protect reality from magical and cosmic threats. Their stories often delve into the supernatural and cosmic aspects of the Marvel Universe.",
    },
  };

  // Determine the content based on the filter label or default to welcome
  const filterKey = filter?.label.toLowerCase().replace(/[\s-]/g, "");
  const { title, subheader, textBody } =
    contentMap[filterKey] || contentMap.showall;

  return (
    <div className="social-container">
      <Card className="MuiCard-root">
        <div className="social-heading">
          <h2 className="social-title">{title}</h2>
          {/* <div className="icon">
            <IconButton
              aria-label="Close"
              className="close-icon"
              onClick={handleCloseClick}
            >
              <CloseIcon />
            </IconButton>
          </div> */}
        </div>
        <CardHeader title={title} subheader={subheader} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {textBody}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default HowToPost;
