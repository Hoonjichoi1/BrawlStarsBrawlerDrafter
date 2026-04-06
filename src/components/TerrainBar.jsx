import './TerrainBar.css';

export const TerrainBar = ({ label, value, color, max = 40 }) => (
  <div className="TerrainBar-wrapper">
    <div className="TerrainBar-header">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="TerrainBar-track">
      <div className="TerrainBar-fill" style={{
        width: `${Math.min((value / max) * 100, 100)}%`,
        background: color,
      }} />
    </div>
  </div>
);