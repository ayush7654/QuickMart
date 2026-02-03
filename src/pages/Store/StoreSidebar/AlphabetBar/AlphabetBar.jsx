import React,{useState} from 'react'
import './AlphabetBar.css'
export default function AlphabetBar({selected,setSelected}) {

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
 
  const [page, setPage] = useState(0); // 0 for A-M, 1 for N-Z

const handleClick = (letter) => {
  if (selected === letter) {
    // DESELECT: If it's already selected, clear it
    setSelected("");
  } else {
    // SELECT: Otherwise, select and scroll
    setSelected(letter);
    const element = document.getElementById(letter);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

  return (
    <nav className="alphabet-sidebar-container">
      {/* Move Up Button */}
      <button 
        className="nav-arrow up" 
        onClick={() => setPage(0)} 
        disabled={page === 0}
      >
        ▲
      </button>

      <div className="alphabet-window">
        <div 
          className="alphabet-track" 
          style={{ transform: `translateY(-${page * 50}%)` }}
        >
          {alphabet.map((letter) => (
            <div key={letter} className="alphabet-slot" onClick={() => handleClick(letter)}>
              <span className={`alphabet-char ${selected === letter ? 'active-char' : ''}`}>
                {letter}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Move Down Button */}
      <button 
        className="nav-arrow down" 
        onClick={() => setPage(1)} 
        disabled={page === 1}
      >
        ▼
      </button>
    </nav>
  )
}
