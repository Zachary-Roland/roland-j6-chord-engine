import { useState } from 'react';
import { styleGuide, rhythmNotation } from '../data/styleGuide';
import './StyleGuideTab.css';

const CATEGORIES = ['ARPEGGIO', 'BEAT', 'PHRASE'];

export default function StyleGuideTab() {
  const [expanded, setExpanded] = useState(() => new Set());

  const toggle = (styleNumber) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(styleNumber)) next.delete(styleNumber);
      else next.add(styleNumber);
      return next;
    });
  };

  return (
    <div className="style-guide-tab">
      <div className="style-guide-title">Style Banks</div>
      <div className="style-guide-subtitle">J-6 has 9 style banks, each with 12 variations</div>

      {CATEGORIES.map((category) => (
        <section key={category} className="style-category">
          <h3 className="style-category-title">{category}</h3>
          {styleGuide
            .filter((s) => s.category === category)
            .map((style) => {
              const isOpen = expanded.has(style.style);
              const panelId = `style-${style.style}-variations`;
              return (
                <div key={style.style} className="style-bank-card">
                  <button
                    type="button"
                    className="style-bank-header"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`Style ${style.style}: ${style.name}`}
                    onClick={() => toggle(style.style)}
                  >
                    <span className="style-bank-number">{style.style}</span>
                    <span className="style-bank-name">{style.name}</span>
                    <span className="style-bank-chevron" aria-hidden="true">
                      {isOpen ? '▾' : '▸'}
                    </span>
                  </button>
                  {isOpen && (
                    <ol id={panelId} className="style-bank-variations">
                      {style.variations ? (
                        style.variations.map((v, i) => <li key={i}>{v}</li>)
                      ) : (
                        <li className="style-bank-blank-note">
                          12 Roland preset phrases (not individually named in the manual).
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              );
            })}
        </section>
      ))}

      <div className="style-guide-legend">
        <h4 className="style-guide-legend-title">Notation</h4>
        <ul className="style-guide-legend-list">
          {rhythmNotation.map(({ symbol, meaning }) => (
            <li key={symbol}>
              <code>{symbol}</code>
              <span>{meaning}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
