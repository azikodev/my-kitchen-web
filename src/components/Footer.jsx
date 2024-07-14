//rrd imports
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className="w-full py-5 text-center bg-base-100 border-t"
    >
      <div className="text-base-950 flex items-center justify-center gap-3">
        <span>MYKITCHEN {""} created by</span>
        <span>-</span>
        <Link to="https://t.me/azikodev" className="link">
          Azizbek Ahmadjonov
        </Link>
      </div>
    </div>
  );
}

export default Footer;
