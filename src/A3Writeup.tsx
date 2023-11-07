import React from "react";
import "./App.scss";

const A3Writeup: React.FC = () => {
  const title = "A3 Writeup";

  return (
    <div className="app-body writeup">
      <h2>{title}</h2>
      <h4>Design Rationale:</h4>
      <p>
        Our goal was to visualize a timeline of all the core, enduring
        publications published by Marvel Comics which feature their most popular
        and iconic characters more interactively, since the beginning of the
        "Marvel Age" in 1961, with the publication of Fantastic Four #1. This
        is regarded by Marvel and its fans as the era which established the
        Marvel Universe we know today. On our landing page, we display the
        publication timeline as grouped by famous Marvel "key properties",
        meaning teams (or characters, i.e. Spider-Man is usually a loner and is
        featured in enough of his own titles to warrant a stand-alone grouping).
        Since we have a lot of publications for each lane, instead of displaying
        each data point as a dot, we used cluster visualization. By doing so, we
        were able to showcase the overall timeline of all team groupings in a
        glimpse, and the viewers can analyze trends in how many comic titles
        featured that team in a given time period historically. We also wanted
        to provide viewers with the option to be able to choose a certain team
        and view that team's timeline in detail. Therefore in these individual
        filtered views, we used dot visualization so the user could hover over
        the data point to view the data in depth.
      </p>
      <h4>Data Filtering:</h4>
      <p>
        Our largest challenge with this dataset was its size. Since its first
        comic in 1939, Marvel has published over 47k+ comics. We felt however
        that many of these comics didn't tell the story of Marvel over time. We
        aggregated the data set first by removing broken data (about 1,000
        entries), then we filtered out any comic series that didn't last for at
        least 5 years, beacuse many titles in the dataset were miniseries or
        other short publications that don't support the focus of the
        visualization. This brought our data down to roughly 12k+ comics. Chris
        sorted through this manually and placed each comic series into major
        groups found in the Marvel Universe so that people could see the
        progress over time of their favorite superhero teams. Through these
        procedures, we were able to achieve a couple of enhancements. First, by
        removing the shorter-lived series, the data became more focused on
        long-lasting series which were more likely to have a more significant
        role in the Marvel Universe. Secondly, by grouping the series into major
        groups or characters, the visualization allowed the viewers to follow
        the progression of the desired Marvel group. This increases the relevance
        to the audience. Also, by grouping based on well-known teams/characters,
        the viewers are more likely to recognize the data and engage with it
        more. Additionally, we begin our visualization from 1961, per the dawn of
        the "Marvel Age" as described in our design rationale.
      </p>
      <h4>Group Members Role:</h4>
      <p>
        Lee: Worked on creating the base of the MarvelVerse website, including
        implementation of the header, footer, and screen filter buttons. Lee also
        worked on the filtering algorithms that involved grouping and filtering
        of the publications. Lee also worked on customizing the colors and
        components to make it more recognizable and interesting to Marvel fans!
        Finally, Lee co-developed our writeup.
      </p>
      <p>
        Christoph: As a person who knows the most about the Marvel publications,
        Christoph co-developed our compelling question and design rationale based
        on his familiarity with Marvel Comics, the dataset, and fans' interests.
        He went through the original data set performing data cleaning, then
        further removing bad or unusable data manually. Christoph also built the
        grouping data and identified the filtering keys that were fundamental to
        our project. Finally, Christoph co-developed our writeup.
      </p>
      <p>
        Patrick: Patrick worked on Building the Show All timeline view which was
        the basis of all the timeline implementations. Patrick also worked on
        studying and examining the react-svg-timeline that we were using for the
        timeline implementation so that we could change the theme. Finally,
        Patrick co-developed our writeup.
      </p>
    </div>
  );
};

export default A3Writeup;
