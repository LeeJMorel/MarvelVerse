/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "./App.scss";
import { FilterOption } from "./types";
import SocialPost from "./SocialPost";
import { SocialPostProps, UserData } from "./types";
import graphData from "../src/data/marvelShowAll.json";
import userData from "../src/data/marvel_map.json";
import "@react-sigma/core/lib/react-sigma.min.css";
import { SigmaGraphViewer } from "./SigmaGraphViewer";

const dataGraph: any = graphData;
const dataUser: UserData[] = userData as UserData[];

interface NetworkProps {
  filter: FilterOption;
}

const Network: React.FC<NetworkProps> = ({ filter }) => {
  const [showSocialPost, setShowSocialPost] = useState(false);
  const [socialPostData, setSocialPostData] = useState<SocialPostProps | null>(
    null
  );

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
      {showSocialPost && socialPostData && (
        <SocialPost
          username={socialPostData.username}
          comicsCount={socialPostData.comicsCount}
          followersCount={socialPostData.followersCount}
          followingList={socialPostData.followingList}
          onFollowingChange={(user) => handleFollowingChange(user)}
        />
      )}

      <div className="network-graph-container">
        <div className="title">
          <p>Current Filter: {filter.label}</p>
        </div>
        <SigmaGraphViewer data={dataGraph} onNodeClick={handleNodeClick} />
      </div>
    </div>
  );
};

export default Network;
