import { useEffect, useState } from "react";
import axios from "axios";

const Comics = ({ handleFavorite }) => {
  //state qui contient search
  const [search, setSearch] = useState("");

  //State qui contient le valeur du limit
  const [selectedOption, setSelectedOption] = useState("100");

  //state qui contient la valeur du skip
  const [currentPage, setCurrentPage] = useState("");

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
        `https://site--marvel-backend--bnyc4d5dnhdn.code.run/comics?title=${search}&limit=${selectedOption}&skip=${
          currentPage ? (currentPage - 1) * selectedOption : 0
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
    <div className="comics-container">
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
      <input
        type="text"
        placeholder="numéro de la page"
        value={currentPage}
        onChange={(event) => {
          setCurrentPage(event.target.value);
        }}
      />

      <div className="comics">
        {data.results.map((elem) => {
          return (
            <div className="comic-div" key={elem._id}>
              <img
                src={`${elem.thumbnail.path}/portrait_xlarge.${elem.thumbnail.extension}`}
                alt="thumbnail"
              />
              <p>{elem.title}</p>

              <button
                onClick={() => {
                  handleFavorite(elem);
                }}
              >
                favorite
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
