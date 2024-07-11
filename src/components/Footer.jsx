import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className="w-full py-5 text-center"
    >
      <p className="">
        Copyright © 2024 - All rights reserved by{" "}
        <Link to="https://t.me/azikodev" className="link">
          Azizbek Ahmadjonov
        </Link>
      </p>
    </div>
  );
}

export default Footer;
