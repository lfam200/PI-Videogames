import "./styles.css";

const Loader = () => {
  return (
    <div className="loader">
        <div className="text_loader">
            <span>Wait a moment while we look for the games</span>
        </div>
        <div className="spinner"></div>
    </div>
  );
};

export default Loader;
