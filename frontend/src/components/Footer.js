import React from 'react';

function Footer() {
  const currentDate = new Date();
  return (
    <footer className="footer">
      <h2 className="footer__copyright">&copy; {currentDate.getFullYear()} Mesto Russia</h2>
    </footer>
  );
}

export default Footer;
