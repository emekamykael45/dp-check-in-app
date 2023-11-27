import { NavLink } from "react-router-dom";

import Navs from "../dashboard/navigations";

import { logoutUserAction } from "../api";

import Icon from "../assets/svg";

const NavBar = () => {
  const navigations = Navs?.filter(
    (x) => x?.hide !== true && x.icon !== "logout"
  );
  const logoutNav = Navs?.find((x) => x.icon === "logout");

  const handleLogout = () => {
    logoutUserAction();
  };

  return (
    <div className="navbar_container">
      {navigations?.map((nav, i) => (
        <NavLink key={i} className="link stroke" to={nav?.to}>
          <Icon name={nav?.icon} />
        </NavLink>
      ))}

      <div className="link" onClick={handleLogout}>
        <Icon name={logoutNav?.icon} />
      </div>
    </div>
  );
};

export default NavBar;
