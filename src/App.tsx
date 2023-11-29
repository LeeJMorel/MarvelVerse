import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Timeline from "./Timeline";
import Network from "./Network";
import A3Writeup from "./A3Writeup";
import FinalWriteup from "./VideoDemonstration";
import Filters from "./Filters";
import { FilterOption, defaultFilter, filterOptions } from "./types";
import { Link } from "@mui/material";

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

  const [currentFilter, setCurrentFilter] =
    useState<FilterOption>(defaultFilter);

  const handleFilterChange = (filter: FilterOption) => {
    setCurrentFilter(filter);
  };

  return (
    <>
      <header className="app-header">
        <button onClick={() => setView("Network")}>Network</button>
        <h1 className="title">MARVELverse</h1>
        <button onClick={() => setView("Timeline")}>Timeline</button>
      </header>

      <aside className={`mobile-menu ${isMobile ? "isVisible" : ""}`}>
        <div className="mobile-menu-content" ref={menuContentRef}>
          <div className="references">
            {view === "Timeline" && (
              <button onClick={() => setView("A3Writeup")}>A3 Writeup</button>
            )}

            {view === "Network" && (
              <button onClick={() => setView("FinalWriteup")}>
                Final Writeup
              </button>
            )}
            <Link href="https://www.marvel.com/" underline="hover">
              Data provided by Marvel. ©2023 Marvel
            </Link>
          </div>
          <div className="mobile-menu-content.row">
            <button onClick={() => setView("Network")}>Network</button>
            <button onClick={() => setView("Timeline")}>Timeline</button>
          </div>
          <Filters
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            isMobile={true}
          />
          {view === "Timeline" && (
            <div className="keyboard-shortcuts">
              <div>Zoom In: Click</div>
              <div>Zoom Out: Alt + Click</div>
              <div>Zoom Custom: Shift + Click + Drag</div>
              <div>Pan: Click + Drag</div>
              <div>Reset: Esc</div>
            </div>
          )}
        </div>
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "<" : ">"}
        </button>
      </aside>

      <div className="app-container">
        <div className="app-body">
          {window.innerWidth > 768 || window.innerHeight < window.innerWidth ? (
            view === "Network" ? (
              <Network filter={currentFilter} />
            ) : view === "A3Writeup" ? (
              <A3Writeup />
            ) : view === "FinalWriteup" ? (
              <FinalWriteup />
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
          <Filters
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            isMobile={false}
          />
        </div>
        <div className="references">
          {view === "Timeline" && (
            <button onClick={() => setView("A3Writeup")}>A3 Writeup</button>
          )}

          {view === "Network" && (
            <button onClick={() => setView("FinalWriteup")}>
              Video Demonstration
            </button>
          )}
          <Link href="https://www.marvel.com/" underline="hover">
            Data provided by Marvel. ©2023 Marvel
          </Link>
        </div>
      </footer>
    </>
  );
}

export default App;
