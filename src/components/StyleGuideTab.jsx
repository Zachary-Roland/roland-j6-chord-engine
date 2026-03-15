import { styleGuide, variationDensity } from '../data/styleGuide';
import './StyleGuideTab.css';

export default function StyleGuideTab() {
  return (
    <div className="style-guide-tab">
      <div className="style-guide-title">Style Banks</div>
      <div className="style-guide-subtitle">J-6 has 9 style banks, each with 12 variations</div>

      <div className="variation-legend">
        <div className="variation-legend-item">
          <span className="variation-legend-label">Var {variationDensity.sparse[0]}–{variationDensity.sparse[variationDensity.sparse.length - 1]}:</span> Sparse / Simple
        </div>
        <div className="variation-legend-item">
          <span className="variation-legend-label">Var {variationDensity.medium[0]}–{variationDensity.medium[variationDensity.medium.length - 1]}:</span> Medium
        </div>
        <div className="variation-legend-item">
          <span className="variation-legend-label">Var {variationDensity.dense[0]}–{variationDensity.dense[variationDensity.dense.length - 1]}:</span> Dense / Complex
        </div>
      </div>

      {styleGuide.map((bank) => (
        <div key={bank.bank} className="style-bank-card">
          <div className="style-bank-header">
            <span className="style-bank-number">{bank.bank}</span>
            <span className="style-bank-name">{bank.name}</span>
          </div>
          <div className="style-bank-character">{bank.character}</div>
          <div className="style-bank-best-with">
            {bank.bestWith.map((genre) => (
              <span key={genre} className="style-bank-genre-tag">{genre}</span>
            ))}
          </div>
          <div className="style-bank-variations">{bank.variations}</div>
        </div>
      ))}
    </div>
  );
}
