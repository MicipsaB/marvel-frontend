import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterComics = () => {
  const { id } = useParams();
  //State qui contiendra la data reçue dans la réponse du serveur
  const [data, setData] = useState();

  //State pour savoir si la réponse du serveur est arrivée
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--bnyc4d5dnhdn.code.run/comics/${id}`
      );

      //Je stocke la réponse du serveur dans le state data
      setData(response.data);

      //Je fais passer isLoading à false
      setIsLoading(false);
    };

    //J'appelle la fonction fetchData
    fetchData();
  }, []);

  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <div className="character-comics-container">
      {data.comics.map((elem) => {
        return (
          <div key={elem._id}>
            <img
              src={`${elem.thumbnail.path}/portrait_xlarge.${elem.thumbnail.extension}`}
              alt="thumbnail"
            />
            <p>{elem.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterComics;
