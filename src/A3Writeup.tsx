import React from "react";
import "./App.scss";

const A3Writeup: React.FC = () => {
  const title = "A3 Writeup";

  return (
    <div className="app-body writeup">
      <h2>{title}</h2>
      <h4>Design Rationale:</h4>
      <p>
        Our goal was to visualize a timeline of all the publications published
        by Marvel more interactively. On our landing page, we display the
        publication timeline grouped by famous Marvel characters or teams. Since
        we have a lot of publications for each lane, instead of displaying each
        data point as a dot, we used cluster visualization. This way we were
        able to showcase the overall timeline of all teams/characters in a
        glimpse and the viewers can get a grasp of which period are
        concentrated. We also wanted to provide viewers with the option to be
        able to choose a certain character/team and view that character/team’s
        timeline in detail. Therefore in these individual categories, we used
        dot visualization so the user could hover over the data point to view
        the data in depth.
      </p>
      <h4>Data Filtering:</h4>
      <p>
        Our largest challenge with this dataset was its size. Since its first
        comic in 1939 Marvel has published over 47k+ comics. We felt however
        that many of these comics didn't tell the story of Marvel over time. We
        aggregated the data set first by removing broken data (about 1,000
        entries), then we filtered out any comic series that didn't last for at
        least 5 years. This brought our data down to roughly 12k+ comics. Chris
        sorted through this manually and placed each comic series into major
        groups found in the Marvel Universe so that people could see the
        progress over time of their favorite superhero teams. Through these
        procedures, we were able to achieve a couple of enhancements. First, by
        removing the shorter-lived series, the data became more focused on
        long-lasting series which were more likely to have a more significant
        role in the Marvel Universe. Secondly, by grouping the series into major
        groups or characters, the visualization allowed the viewers to follow
        the progression of the desired Marvel character/group. This increases
        the relevance to the audience. Also, by grouping based on well-known
        characters or groups, the viewers are more likely to recognize the data
        and engage more with it.
      </p>
      <h4>Group Members Role:</h4>
      <p>
        Lee: Worked on creating the base of the MarvelVerse website. Lee worked
        on implementing the header, footer, and screen filter buttons. Lee also
        worked on the filtering algorithms that involved grouping and filtering
        of the publications. Lee also worked on customizing the colors and
        components to make it more recognizable and interesting to{" "}
      </p>
      <p>
        Christoph: As a person who knows the most about the Marvel publications,
        Christoph went through the original data set removing the bad or
        unusable data manually. Christoph also built the grouping data that was
        fundamental to our project.
      </p>
      <p>
        Patrick: Patrick worked on Building the Show All timeline view which was
        the basis of all the timeline implementations. Patrick also worked on
        studying and examining the react-svg-timeline that we were using for the
        timeline implementation so that we could change the theme.
      </p>
    </div>
  );
};

export default A3Writeup;
