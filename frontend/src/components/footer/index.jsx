import './footer.css'

function Footer() {
  return (
    <footer className="footer-component">
      <p>© {new Date().getFullYear()} My App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
