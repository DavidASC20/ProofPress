import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export const Navbar = () => {
  return(
    // change the MyProfile to Login / MyProfile by checking to session when user is logged in
    <div>
      <Container className="d-flex align-items-center justify-content-center">
        <Link to="/" className="mx-3"> Home </Link>
        <Link to="/how-to" className="mx-3"> Getting Started </Link>
        <Link to="/create-posts" className="mx-3"> Create Posts </Link>
        <Link to="/auth" className="mx-3"> My Profile </Link>
      </Container>
    </div>
  );
}