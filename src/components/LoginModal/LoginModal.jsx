import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./LoginModal.css";

const LoginModal = ({
  handleModalClose,
  isOpen,
  onLogIn,
  buttonClass = "modal__login",
  handleRegisterModal,
  error = null,
}) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(data.email.trim() !== "" && data.password.trim() !== "");
  }, [data.email, data.password]);

  useEffect(() => {
    if (isOpen) {
      setData({ email: "", password: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    onLogIn({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={handleModalClose}
      onSubmit={handleSubmit}
      buttonClass={`login-modal__login ${
        isButtonActive ? "login-modal__login_active" : ""
      }`}
      error={error}
      name="login"
    >
      <label className="modal__title">Log in</label>
      <button
        className="modal__close-btn"
        type="button"
        onClick={handleModalClose}
      />
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
          required
          autoComplete="email"
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          required
          autoComplete="current-password"
        />
      </label>
      {error && <div className="modal__error">{error}</div>}
      <div className="modal__btns">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__login_active" : ""
          }`}
        >
          Log In
        </button>
        <button
          type="button"
          className="modal__signup"
          onClick={handleRegisterModal}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
