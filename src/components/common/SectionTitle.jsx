const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {subtitle && <p><span className="badge bg-primary px-3 py-2">{subtitle}</span></p>}      
    </div>
  );
};

export default SectionTitle;
