import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <footer
      className={` text-white p-4 text-center ${
        location.pathname.startsWith("/private") ||
        location.pathname.startsWith("/auth")
          ? "hidden"
          : "block"
      }`}
    >
      <ul className="flex">
        <Link to="/terms-of-use">
          <li className="mr-4">Terms of Service</li>
        </Link>
        <Link to="/privacy-policy">
          <li className="mr-4">Privacy Policy</li>
        </Link>
      </ul>
      {/* Social media icons */}
    </footer>
  );
};

export default Footer;
