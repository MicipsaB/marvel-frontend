const Favorites = ({ favorites }) => {
  return (
    <div className="favorites-container">
      {favorites.map((elem) => {
        return (
          <div key={elem._id}>
            <img
              src={`${elem.thumbnail.path}/portrait_xlarge.${elem.thumbnail.extension}`}
              alt="thumbnail"
            />
            <p>{elem.name}</p>
            <p>{elem.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
