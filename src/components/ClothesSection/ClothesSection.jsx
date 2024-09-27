import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, handleAddClick, clothingItems }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
