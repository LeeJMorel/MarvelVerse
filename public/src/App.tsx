import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Graph from "./Graph";
import Network from "./Network";
import GraphFilters from "./GraphFilters";
import NetworkFilters from "./NetworkFilters";
import { SelectedGraphFilter, SelectedNetworkFilter } from "./types";

function App() {
  const [view, setView] = useState("Network");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuContentRef = useRef<HTMLDivElement | null>(null);

  //this checks if we are in mobile
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 500);
    }

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //get a dynamic width value for the side bar menu
  useEffect(() => {
    const menuContent = menuContentRef.current;
    const menu = menuContent?.parentElement;

    if (menuContent && menu) {
      const contentWidth = menuContent.offsetWidth;

      if (menuOpen) {
        menu.style.left = "0px";
      } else {
        menu.style.left = `-${contentWidth}px`;
      }
    }
  }, [menuOpen]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentGraphFilter, setCurrentGraphFilter] =
    useState<SelectedGraphFilter>({
      yearStart: 1990,
      yearEnd: 2020,
      comic: "",
      viewBy: "character",
      viewByValue: "",
    });

  const handleGraphFilterChange = (filter: SelectedGraphFilter) => {
    setCurrentGraphFilter(filter);
  };

  //This is just a placeholder
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentNetworkFilter, setCurrentNetworkFilter] =
    useState<SelectedNetworkFilter>({
      placeholder: "I'll have data soon!",
    });

  const handleNetworkFilterChange = (filter: SelectedNetworkFilter) => {
    setCurrentNetworkFilter(filter);
  };

  return (
    <>
      <header className="app-header">
        <button onClick={() => setView("Network")}>Network</button>
        <h1 className="title">MARVELverse</h1>
        <button onClick={() => setView("Graph")}>Graph</button>
      </header>

      {isMobile && (
        <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content" ref={menuContentRef}>
            <div className="mobile-menu-content.row">
              <button onClick={() => setView("Network")}>Network</button>
              <button onClick={() => setView("Graph")}>Graph</button>
            </div>
            {view === "Network" ? (
              <NetworkFilters onFilterChange={handleNetworkFilterChange} />
            ) : (
              <GraphFilters onFilterChange={handleGraphFilterChange} />
            )}
            <p>Data provided by Marvel. ©2023 Marvel</p>
          </div>
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "<" : ">"}
          </button>
        </aside>
      )}

      <div className="app-container">
        <div className="app-body">
          {window.innerWidth > 768 || window.innerHeight < window.innerWidth ? (
            view === "Network" ? (
              <Network filter={currentNetworkFilter} />
            ) : (
              <Graph filter={currentGraphFilter} />
            )
          ) : (
            <p>View only enabled in landscape mode.</p>
          )}
        </div>
      </div>

      <footer className="app-footer">
        <div className="filter-container">
          {view === "Network" ? (
            <NetworkFilters onFilterChange={handleNetworkFilterChange} />
          ) : (
            <GraphFilters onFilterChange={handleGraphFilterChange} />
          )}
        </div>
        <p>Data provided by Marvel. ©2023 Marvel</p>
      </footer>
    </>
  );
}

export default App;
