
import { useState } from "react";
import "./ExpandablePanel.css";

export default function ExpandablePanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`side-panel ${isOpen ? "open" : ""}`}>
      {!isOpen ? (
        <button
          className="expand-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open side panel"
        >
          +
        </button>
      ) : (
        <div className="panel-content">
          <header className="panel-header">
            <h2>My Panel</h2>

            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close side panel"
            >
              ×
            </button>
          </header>

          <div className="panel-body">
            <p>Your content goes here.</p>
          </div>
        </div>
      )}
    </div>
  );
}
