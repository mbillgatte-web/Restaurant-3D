import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>L'Expérience<br/>Gastronomique <span>Ultime</span></h1>
          <p>Découvrez notre menu en 3D immersive et plongez dans un univers où le goût rencontre la technologie.</p>
          <div className="hero-actions">
            <button className="btn-primary">Découvrir le Menu</button>
            <button className="btn-secondary">Notre Histoire</button>
          </div>
        </div>
        <div className="hero-3d-container">
          {/* We will add the 3D Canvas here later */}
          <div className="placeholder-3d">
            <span>Espace 3D à venir</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
