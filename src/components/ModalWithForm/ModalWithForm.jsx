import "./modalwithform.css";
function ModalWithForm({ children, titleText, isOpen, onClose, onSubmit }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{titleText}</h2>
        <button className="modal__close-btn" type="button" onClick={onClose} />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
