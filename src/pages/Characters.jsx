import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Pagination from "../components/Pagination";

const Characters = ({ handleFavorite }) => {
  //state qui contient search
  const [search, setSearch] = useState("");

  //State qui contient le valeur du limit
  const [selectedOption, setSelectedOption] = useState("100");

  //state qui contient la valeur du skip
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //State qui contiendra la data reçue dans la réponse du serveur
  const [data, setData] = useState();

  //State pour savoir si la réponse du serveur est arrivée
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--bnyc4d5dnhdn.code.run/characters?name=${search}&limit=${selectedOption}&skip=${
          (currentPage - 1) * selectedOption
        }`
      );

      //Je stocke la réponse du serveur dans le state data
      setData(response.data);

      //Je fais passer isLoading à false
      setIsLoading(false);
    };

    //J'appelle la fonction fetchData
    fetchData();
  }, [search, selectedOption, currentPage]);

  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <div className="characters-container">
      {/* DropDown pour limit  */}
      <div className="dropdown">
        <label htmlFor="options">nombre de personnages par page</label>
        <select
          id="options"
          value={selectedOption}
          onChange={(event) => {
            setSelectedOption(event.target.value);
          }}
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>

      {/* Barre de recherche  */}
      <input
        type="text"
        placeholder="rechercher des caractères"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />

      {/* Pagination  */}
      <Pagination
        currentPage={Number(currentPage)}
        totalPages={Number(data.count / selectedOption).toFixed(0)}
        onPageChange={handlePageChange}
      />

      <div className="characters">
        {data.results.map((elem) => {
          return (
            <div key={elem._id} className="character-div">
              <Link className="character-link" to={`/comics/${elem._id}`}>
                <div className="character">
                  <img
                    src={`${elem.thumbnail.path}/portrait_xlarge.${elem.thumbnail.extension}`}
                    alt="thumbnail"
                  />
                  <p>{elem.name}</p>
                </div>
              </Link>

              {/* ------------Favorite Button--------------  */}
              <button
                onClick={() => {
                  handleFavorite(elem);
                }}
              >
                Favorite
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
