import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants.js";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p className="clothes-section__title">Your Items</p>
        <button type="button" className="clothes-section__add-btn">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
