import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import "./ItemCard.css";
function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    handleCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `item__heart ${
    isLiked ? "item__heart_liked" : ""
  }`;

  return (
    <div>
      <h2 className="card__name">{item.name}</h2>
      {currentUser?._id && (
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={handleLike}
        />
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
