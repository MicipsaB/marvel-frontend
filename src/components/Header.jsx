import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
          alt="logo"
        />
        <div className="header-buttons">
          <Link to="/characters" className="no-decoration">
            <button>Characters</button>
          </Link>

          <Link to="/comics" className="no-decoration">
            <button>Comics</button>
          </Link>

          <Link to="/favorites" className="no-decoration">
            <button>Favoris</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
