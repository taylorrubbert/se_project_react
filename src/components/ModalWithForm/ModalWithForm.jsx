//ModalWithForm is a wrapper for our form components.
//To do so, all the markup that’s common to all of the forms should be placed inside this component. You should include the following:
//The form’s title.
//The button that closes the modal.
//The <form> tag itself.
//The button that submits the modal.

//The title, button text, and form identifier (in the form of strings) should be passed from outside the component itself.
// To do this, add the corresponding title, name, and buttonText props, then substitute their values inside the JSX
//To correctly substitute name into the CSS class of the container, use the following syntax: className={`modal modal_type_${name}`}

//One more prop is onClose, which should be called when the user clicks on the close button, clicks outside of the modal content, or presses the Escape button on the keyboard.
import "./ModalWithForm.css";
function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  onClose,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <form className="modal__form">
          {children}
          <button className="modal__submit-btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
