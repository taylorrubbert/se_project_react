import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import "./itemmodal.css";
function ItemModal({
  activeModal,
  handleModalClose,
  card,
  confirmDeleteModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && currentUser?._id === card?.owner;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__image_close-btn"
          type="button"
          onClick={handleModalClose}
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__caption-weather-container">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
            {isOwn && (
              <button
                className="modal__delete-btn"
                onClick={confirmDeleteModal}
              >
                Delete item
              </button>
            )}
            {!isOwn && (
              <p className="modal__error">You Cannot Delete This Item</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
