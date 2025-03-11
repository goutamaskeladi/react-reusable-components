const Card = ({ title, url, author }) => {
  return (
    <div className="card">
      <div className="card-info">
        <h3>{title}</h3>
        <h3>{author}</h3>
      </div>
      <img src={url} />
    </div>
  );
};

export default Card;
