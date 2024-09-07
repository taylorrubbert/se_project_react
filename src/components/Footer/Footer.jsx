//renders meta info about the app - copyright and the production year, basic text
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">Developed by Taylor Rubbert</p>
        <p className="footer__year">{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
