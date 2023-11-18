import React, { useState } from "react";
import "./App.scss";
import { FilterOption } from "./types";
import SocialPost from "./SocialPost";
import { SocialPostProps } from "./types";
import graphData from "../src/data/data.json";
import "@react-sigma/core/lib/react-sigma.min.css";
import { SigmaGraphViewer } from "./SigmaGraphViewer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataGraph: any = graphData;

const fakeUsersData: Record<string, SocialPostProps> = {
  ironMan: {
    username: "Iron Man",
    profile: "Genius, billionaire, playboy, philanthropist.",
    comicsCount: 100,
    followersCount: 500,
    followingList: ["captainAmerica", "thor", "blackWidow"],
  },
  captainAmerica: {
    username: "Captain America",
    profile: "Super-soldier and leader of the Avengers.",
    comicsCount: 80,
    followersCount: 300,
    followingList: ["ironMan", "blackWidow", "hulk"],
  },
  thor: {
    username: "Thor",
    profile: "God of Thunder and prince of Asgard.",
    comicsCount: 120,
    followersCount: 700,
    followingList: ["ironMan", "captainAmerica", "hulk"],
  },
  blackWidow: {
    username: "Black Widow",
    profile: "Master spy and assassin, former KGB agent.",
    comicsCount: 90,
    followersCount: 400,
    followingList: ["ironMan", "captainAmerica", "thor"],
  },
};

interface NetworkProps {
  filter: FilterOption;
}

const Network: React.FC<NetworkProps> = ({ filter }) => {
  const [showSocialPost, setShowSocialPost] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleFollowingChange = (selectedUser: string): void => {
    const userData: SocialPostProps | undefined = fakeUsersData[selectedUser];

    if (userData) {
      console.log("Selected User Data:", userData);
      setSelectedUser(selectedUser);
      setShowSocialPost(true);
    } else {
      setShowSocialPost(false);
      console.error("User not found in fakeUsersData");
    }
  };

  const handleTestButtonClick = () => {
    const testUser = "ironMan";
    handleFollowingChange(testUser);
  };

  return (
    <div className="app-body network-container">
      {showSocialPost && selectedUser && (
        <SocialPost
          username={fakeUsersData[selectedUser].username}
          profile={fakeUsersData[selectedUser].profile}
          comicsCount={fakeUsersData[selectedUser].comicsCount}
          followersCount={fakeUsersData[selectedUser].followersCount}
          followingList={fakeUsersData[selectedUser].followingList}
          onFollowingChange={(user) => handleFollowingChange(user)}
        />
      )}

      <div className="network-graph-container">
        <div className="title">
          <p>Current Filter: {filter.label}</p>
        </div>
        <SigmaGraphViewer data={dataGraph} />
        {showSocialPost && (
          <button onClick={handleTestButtonClick}>Test Button</button>
        )}
      </div>
    </div>
  );
};

export default Network;
