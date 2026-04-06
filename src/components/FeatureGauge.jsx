import './FeatureGauge.css';

export const FeatureGauge = ({ label, value }) => {
  const dots = [0, 1, 2].map(i => (
    <span key={i} style={{
      display: 'inline-block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: i < value ? '#f5a623' : '#444',
      marginRight: '4px'
    }} />
  ));

  return (
    <div className="FeatureGauge" >
      <span>{label}</span>
      <div>{dots}</div>
    </div>
  );
};