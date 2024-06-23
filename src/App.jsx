import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//Import Components
import Header from "./components/Header";

//Import Pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import CharacterComics from "./pages/CharacterComics";
import Favorites from "./pages/Favorites";

function App() {
  // State that contains favorites
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = Cookies.get("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  //function that handles cookie favorite
  const handleFavorite = (item) => {
    if (favorites.includes(item)) {
      const updatedFavorites = favorites.filter((elem) => elem !== item);
      setFavorites(updatedFavorites);
      Cookies.set("favorites", JSON.stringify(updatedFavorites), {
        expires: 7,
      });
    } else {
      const updatedFavorites = [...favorites, item];
      setFavorites(updatedFavorites);
      Cookies.set("favorites", JSON.stringify(updatedFavorites), {
        expires: 7,
      });
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/characters"
          element={
            <Characters favorites={favorites} handleFavorite={handleFavorite} />
          }
        />

        <Route
          path="/"
          element={
            <Characters favorites={favorites} handleFavorite={handleFavorite} />
          }
        />

        <Route
          path="/comics"
          element={<Comics handleFavorite={handleFavorite} />}
        />
        <Route path="/comics/:id" element={<CharacterComics />} />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
