import "./DeleteModal.css";

function DeleteModal({
  activeModal,
  handleModalClose,
  handleDeleteCard,
  selectedCard,
}) {
  const onCardDelete = () => {
    handleDeleteCard(selectedCard);
  };

  return (
    <div
      className={`modal ${
        activeModal === "delete-confirmation" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_type_delete">
        <button
          className="modal__close-btn"
          type="button"
          onClick={handleModalClose}
        />
        <p className="modal__delete_text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__delete-btns">
          <button className="modal__confirm-delete-btn" onClick={onCardDelete}>
            Yes, delete item
          </button>
          <button className="modal__cancel-btn" onClick={handleModalClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
