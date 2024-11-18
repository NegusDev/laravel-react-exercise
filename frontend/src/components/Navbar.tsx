import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('auth'));

  const logout = () => {
    localStorage.removeItem("auth");
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Lead Management</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          {isLoggedIn ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a role="button"
                  className="nav-link active" onClick={() => navigate("/leads")}>Leads</a>
              </li>
              <li className="nav-item">
                <a role="button" className="nav-link " onClick={logout}>Logout</a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a role="button"
                  className="nav-link active" onClick={() => navigate("/")}>Login</a>
              </li>
              <li className="nav-item">
                <a role="button" className="nav-link " onClick={() => navigate("/register")}>Register</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav >
  );
}

export default Navbar;