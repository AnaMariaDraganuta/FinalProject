import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        
        <div className="footer-about">

          <h3>Despre noi</h3>
          <p>
          Indiferent de nivel, aici veți găsi resurse pentru a vă dezvolta cunoștințele matematice
          </p>

        </div>


        <div className="footer-contact">
        <h3>Contact</h3>
          <p>Email: mathquest@gmail.com</p>
          <p>Telefon: 0757414141</p>
          <p>Adresă: Brașov, România</p>
        </div>

        <div className="footer-social">
          <h3>Urmărește-ne</h3>
          <a href="https://www.facebook.com/?locale=ro_RO" target="_blank">Facebook</a>
          <a href="https://www.tiktok.com/" target="_blank">Tiktok</a>
          <a href="https://www.instagram.com/" target="_blank">Instagram</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Math Quest. Toate drepturile rezervate.</p>
      </div>

    </footer>
  );
};

export default Footer;
