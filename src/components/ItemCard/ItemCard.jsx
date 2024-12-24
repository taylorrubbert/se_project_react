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

  const itemLikeButton = `item__like ${isLiked ? "item__like_active" : ""}`;

  return (
    <div className="card">
      <div className="card__information">
        <h2 className="card__name">{item.name}</h2>
        {currentUser?._id && (
          <button
            className={itemLikeButton}
            type="button"
            onClick={handleLike}
          />
        )}
      </div>
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
