import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export const Navbar = () => {
  const userAddress = localStorage.getItem('userAddress');

  return(
    <div>
      <Container className="d-flex align-items-center justify-content-center">
        <Link to="/" className="mx-3"> Home </Link>
        <Link to="/how-to" className="mx-3"> Getting Started </Link>
        <Link to="/create-posts" className="mx-3"> Create Posts </Link>
        {userAddress ? (
          <Link to="/logout" className="mx-3"> Logout </Link>
        ) : (
          <Link to="/auth" className="mx-3"> Login </Link>
        )}
      </Container>
    </div>
  );
}