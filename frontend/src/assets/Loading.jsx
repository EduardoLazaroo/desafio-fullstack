import "../assets/Loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay" data-testid="loading">
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
