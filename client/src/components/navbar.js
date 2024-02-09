import { Link } from "react-router-dom";

export const Navbar = () => {
  const ethereum_address = localStorage.getItem("userAddress");

  return(
    <div classname="navbar">
      <Link to="/"> Home </Link>
      <Link to="/how-to"> Getting Started </Link>
      {ethereum_address ? (
        <> <Link to="/create-posts"> Create Posts </Link>
        <Link to="/auth"> Disconnect from MetaMask </Link> </>) : (
        <Link to="/auth"> Connect to MetaMask </Link>
      )}
    </div>
  );
}