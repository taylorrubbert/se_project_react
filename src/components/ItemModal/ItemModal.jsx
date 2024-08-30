//ItemModal renders the item image and title. The component accepts the following props:

//onClose (works the same way as the ModalWithForm)
//The item card data that you need to render
import "./ItemModal.css";
function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close-btn" type="button" onClick={onClose}>
          CLOSE
        </button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
