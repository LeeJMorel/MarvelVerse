/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import "./App.scss";
import { FilterOption, profileBodyMap } from "./types";
import SocialPost from "./SocialPost";
import { SocialPostProps, UserData } from "./types";
import AVE from "../src/data/avengers.json";
import SPI from "../src/data/spiderman.json";
import XM from "../src/data/xmen.json";
import FF from "../src/data/fantastic4.json";
import MS from "../src/data/midnight_sons.json";
import DEF from "../src/data/defenders.json";
import ShowAll from "../src/data/data.json";
import userData from "../src/data/marvel_map.json";
import "@react-sigma/core/lib/react-sigma.min.css";
import { SigmaGraphViewer } from "./SigmaGraphViewer";
import HowToPost from "./HowToPost";
import OnHoverTitle from "./OnHoverTitle";

const dataUser: UserData[] = userData as UserData[];

const graphDataMap = {
  Avengers: AVE,
  Spiderman: SPI,
  "X-Men": XM,
  "Fantastic Four": FF,
  "Midnight Sons": MS,
  Defenders: DEF,
  "Show All": ShowAll,
};
interface NetworkProps {
  filter: FilterOption;
}

const Network: React.FC<NetworkProps> = ({ filter }) => {
  const [showSocialPost, setShowSocialPost] = useState(false);
  const [socialPostData, setSocialPostData] = useState<SocialPostProps | null>(
    null
  );
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const graphData = useMemo(() => graphDataMap[filter.label], [filter.label]);

  const handleFollowingChange = (selectedUser: string): void => {
    // Find the selected user in the Marvel map
    const userInMarvelMap = dataUser.find(
      (entry) => entry.label === selectedUser
    );

    if (userInMarvelMap) {
      // eslint-disable-next-line no-useless-escape
      const modifiedTitle = selectedUser.replace(/[.\[\]/-]/g, "");

      const comicsForUser = dataUser.filter(
        (entry) => entry.label === selectedUser
      );
      const comicsCount = comicsForUser.length;

      // Extract the comics from comicsForUser
      const userComics = comicsForUser.map((entry) => entry.comic);

      // Filter dataUser to get all entries that match the user's comics
      const entriesForUserComics = dataUser.filter((entry) =>
        userComics.includes(entry.comic)
      );

      // Get unique names in matching comics
      const uniqueNames = Array.from(
        new Set(entriesForUserComics.map((entry) => entry.label))
      );

      // Get followers count (total count of comics that the user appears in)
      const followersCount = entriesForUserComics.length;

      const socialPost: SocialPostProps = {
        username: selectedUser,
        comicsCount,
        followersCount,
        followingList: uniqueNames,
        profile: profileBodyMap[modifiedTitle],
      };
      console.log(profileBodyMap[modifiedTitle]);

      setSocialPostData(socialPost);
      setShowSocialPost(true);
    } else {
      setShowSocialPost(false);
      console.error("User not found");
    }
  };

  const handleNodeClick = (label: string): void => {
    if (
      label !== null &&
      (!socialPostData || socialPostData.username !== label)
    ) {
      console.log("username: " + socialPostData?.username);
      console.log("label: " + label);
      handleFollowingChange(label);
    }
  };

  const handleHoverNode = (label: string | null): void => {
    if (label !== null && hoveredNode !== label) {
      console.log("hovered node: " + hoveredNode);
      console.log("label: " + label);
      setHoveredNode(label);
    }
  };

  return (
    <div className="app-body network-container">
      {!showSocialPost && <HowToPost filter={filter} />}

      {showSocialPost && socialPostData && (
        <SocialPost
          username={socialPostData.username}
          comicsCount={socialPostData.comicsCount}
          followersCount={socialPostData.followersCount}
          followingList={socialPostData.followingList}
          profile={socialPostData.profile}
          onFollowingChange={(user) => handleFollowingChange(user)}
          onClose={() => setShowSocialPost(false)}
        />
      )}

      <div className="network-graph-container">
        <OnHoverTitle label={hoveredNode} />
        <SigmaGraphViewer
          data={graphData}
          onNodeClick={handleNodeClick}
          hovered={handleHoverNode}
        />
      </div>
    </div>
  );
};

export default Network;
