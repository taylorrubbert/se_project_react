import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  handleAddClick,
  clothingItems = [],
  handleCardLike,
}) {
  const currentUserId = useContext(CurrentUserContext)?._id;
  console.log("Current user ID:", currentUserId);
  console.log("All clothing items:", clothingItems);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUserId
  );
  console.log("Filtered user items:", userItems);

  return (
    <div className="clothes-section">
      <div>
        <p className="clothes-section__title">Your Items</p>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              handleCardLike={handleCardLike}
            />
          ))
        ) : (
          <p>No clothing items found.</p>
        )}
      </ul>
    </div>
  );
}
export default ClothesSection;
