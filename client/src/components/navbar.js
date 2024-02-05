import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export const Navbar = () => {
  const check_storage = () => {
    console.log("checking local storage");
    var eth_address = localStorage.getItem("userAddress");
    console.log(eth_address);
  }

  return(
    <div>
      <Container className="d-flex align-items-center justify-content-center">
        <Link to="/" className="mx-3"> Home </Link>
        <Link to="/how-to" className="mx-3"> Getting Started </Link>
        <Link to="/create-posts" className="mx-3"> Create Posts </Link>
        <Link to="/auth" className="mx-3">Connect to MetaMask</Link>
      </Container>
      <button onClick={check_storage}>check storage checking</button>

    </div>
  );
}