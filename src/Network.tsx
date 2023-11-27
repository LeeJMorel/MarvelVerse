/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "./App.scss";
import { FilterOption } from "./types";
import SocialPost from "./SocialPost";
import { SocialPostProps, UserData } from "./types";
import AVE from "../src/data/avengers.json";
import SPI from "../src/data/spiderman.json";
import XM from "../src/data/xmen.json";
import FF from "../src/data/fantastic4.json";
import MS from "../src/data/midnight_sons.json";
import DEF from "../src/data/defenders.json";
import graphData from "../src/data/data.json";
import userData from "../src/data/marvel_map.json";
import "@react-sigma/core/lib/react-sigma.min.css";
import { SigmaTeamViewer } from "./SigmaTeamViewer";
import { SigmaGraphViewer } from "./SigmaGraphViewer";
import HowToPost from "./HowToPost";

const dataUser: UserData[] = userData as UserData[];

const graphDataMap = {
  Avengers: AVE,
  Spiderman: SPI,
  "X-Men": XM,
  "Fantastic Four": FF,
  "Midnight Sons": MS,
  Defenders: DEF,
  "Show All": graphData,
};
interface NetworkProps {
  filter: FilterOption;
}

const Network: React.FC<NetworkProps> = ({ filter }) => {
  const [showSocialPost, setShowSocialPost] = useState(false);
  const [socialPostData, setSocialPostData] = useState<SocialPostProps | null>(
    null
  );

  const dataGraph: any = graphDataMap[filter.label];
  const graphData = dataGraph;

  const handleFollowingChange = (selectedUser: string): void => {
    // Find the selected user in the Marvel map
    const userInMarvelMap = dataUser.find(
      (entry) => entry.label === selectedUser
    );

    if (userInMarvelMap) {
      const comicsForUser = dataUser.filter(
        (entry) => entry.label === selectedUser
      );
      const comicsCount = comicsForUser.length;

      // Get unique names in matching comics
      const uniqueNames = Array.from(
        new Set(
          dataUser.map((entry: any) => entry.label).filter(Boolean) as string[]
        )
      );
      // Get followers count (total count of comics that the user appears in)
      const followersCount = dataUser.filter((entry) =>
        uniqueNames.includes(entry.comic)
      ).length;

      const socialPost: SocialPostProps = {
        username: selectedUser,
        comicsCount,
        followersCount,
        followingList: uniqueNames,
      };

      setSocialPostData(socialPost);
      setShowSocialPost(true);
    } else {
      setShowSocialPost(false);
      console.error("User not found");
    }
  };

  const handleNodeClick = (label: string): void => {
    handleFollowingChange(label);
  };

  return (
    <div className="app-body network-container">
      {!showSocialPost && (
        <HowToPost filter={filter} onClose={() => setShowSocialPost(false)} />
      )}

      {showSocialPost && socialPostData && (
        <SocialPost
          username={socialPostData.username}
          comicsCount={socialPostData.comicsCount}
          followersCount={socialPostData.followersCount}
          followingList={socialPostData.followingList}
          onFollowingChange={(user) => handleFollowingChange(user)}
          onClose={() => setShowSocialPost(false)}
        />
      )}

      <div className="network-graph-container">
        {filter.label === "Show All" ? (
          <SigmaGraphViewer data={graphData} onNodeClick={handleNodeClick} />
        ) : (
          <SigmaTeamViewer data={graphData} onNodeClick={handleNodeClick} />
        )}
      </div>
    </div>
  );
};

export default Network;
