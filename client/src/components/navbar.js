import { Link } from "react-router-dom";

export const Navbar = () => {
  return(
    <div>
      <Link to="/"> Home </Link>
      <Link to="/auth"> Auth </Link>
      <Link to="/create-posts"> Create-Posts </Link>
    </div>
  );
}