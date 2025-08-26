import "../assets/Loading.css"; // você já tem este import

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span>Carregando...</span>
    </div>
  );
};

export default Loading;
