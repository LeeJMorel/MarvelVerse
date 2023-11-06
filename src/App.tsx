import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Timeline from "./Timeline";
import Network from "./Network";
import NetworkFilters from "./NetworkFilters";
import Filters from "./Filters";
import { SelectedNetworkFilter, filterOptions } from "./types"; // Import the necessary types

function App() {
  const [view, setView] = useState("Timeline");
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

  const [currentFilter, setCurrentFilter] = useState<string | null>("Show All");

  const handleFilterChange = (filter: string | null) => {
    setCurrentFilter(filter);
  };

  //This is just a placeholder
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
        <button onClick={() => setView("Timeline")}>Timeline</button>
      </header>

      {isMobile && (
        <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content" ref={menuContentRef}>
            <div className="mobile-menu-content.row">
              <button onClick={() => setView("Network")}>Network</button>
              <button onClick={() => setView("Timeline")}>Timeline</button>
            </div>
            {view === "Network" ? (
              <NetworkFilters onFilterChange={handleNetworkFilterChange} />
            ) : (
              <Filters
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
                isMobile={true}
              />
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
              <Timeline filter={currentFilter} />
            )
          ) : (
            <p>View only enabled in landscape mode.</p>
          )}
        </div>
      </div>

      <footer className="app-footer">
        {view === "Timeline" && (
          <div className="keyboard-shortcuts">
            Keyboard Shortcuts: Zoom In (Click), Zoom Out (Alt + Click), Zoom
            Custom (Shift + Click + Drag), Pan (Click + Drag), Reset (Esc)
          </div>
        )}
        <div className="filter-container">
          {view === "Network" ? (
            <NetworkFilters onFilterChange={handleNetworkFilterChange} />
          ) : (
            <Filters
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              isMobile={false}
            />
          )}
        </div>
        <p>Data provided by Marvel. ©2023 Marvel</p>
      </footer>
    </>
  );
}

export default App;
