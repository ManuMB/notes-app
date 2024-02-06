import { useContext } from "react";
import { Link } from "react-router-dom";
import { NoteContext } from "../../context/NoteContext";

export const Navbar = () => {
  const { handlerOpenForm } = useContext(NoteContext);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-success p-2 text-dark bg-opacity-90 bg-gradient border-bottom border-body p-3"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link
            className="decoration-none"
            style={{ textDecoration: "none" }}
            to="/"
          >
            <a
              className="h4 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="#"
            >
              Home
            </a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handlerOpenForm}
                  >
                    New Note
                  </button>
                </a>
              </li>
              <li className="nav-item">
                <Link to="/archived">
                  <a className="nav-link active" aria-current="page" href="#">
                    <button type="button" className="btn btn-secondary btn-sm">
                      Archived Notes
                    </button>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
