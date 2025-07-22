import "./navbar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav">
      <div className="container">
        <Link to={"/"}>
          <div className="btn">Home</div>
        </Link>

        <div className="btn">Contact</div>
        <div className="select-wrapper">
          <select>
            <option value="">Categorie</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
          </select>
          <div className="select-arrow">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <Link to={"/Cart"}>
          <div className="btn">Cart</div>
        </Link>

        <svg
          className="outline"
          overflow="visible"
          width="400"
          height="60"
          viewBox="0 0 400 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="rect"
            pathLength="100"
            x="0"
            y="0"
            width="400"
            height="60"
            fill="transparent"
            strokeWidth="5"
          ></rect>
        </svg>
      </div>
    </div>
  );
}
export default NavBar;
