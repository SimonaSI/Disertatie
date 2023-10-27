import React from "react";
import "./Meniu.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { routes } from "../../Utils/appRoutes";

const Meniu = () => {
console.log("hello")

    const location = useLocation();
  
    const activeLinkColor = { color: "#ff6122" },
      inactiveLinkColor = { color: "#000000" };
    const pageRoute = location.pathname;
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("jwt");
      navigate(routes.autentificare);
      toast.success("V-ati delogat cu succes!", { toastId: "sdkhfsjkdd" });
    };
  
    const handleHighlightLinkItem = (linkID) => {
      switch (linkID) {
        case routes.pagCheltuieli:
          if (pageRoute === routes.pagCheltuieli) {
            return activeLinkColor;
          } else {
            return inactiveLinkColor;
          }
  
        case routes.pagDatorii:
          if (pageRoute === routes.pagDatorii) {
            return activeLinkColor;
          } else {
            return inactiveLinkColor;
          }
  
        case routes.pagEducatieFinanciara:
          if (pageRoute === routes.pagEducatieFinanciara) {
            return activeLinkColor;
          } else {
            return inactiveLinkColor;
          }
        case routes.pagVenit:
          if (pageRoute === routes.pagVenit) {
            return activeLinkColor;
          } else {
            return inactiveLinkColor;
          }
        case routes.pagOverview:
          if (pageRoute === routes.pagOverview) {
            return activeLinkColor;
          } else {
            return inactiveLinkColor;
          }
  
        default:
          return inactiveLinkColor;
      }
    };
  
    return (
      <nav className="container-nav">
        <div className="NavBar">
          <div className="container-main">
            <div className="navigation w-100 d-flex flex-row justify-content-around align-items-center">
              <div className="flex-row w-100 justify-content-around align-items-center navigation-menu">
                <div>
                  <NavLink
                    style={handleHighlightLinkItem(routes.pagCheltuieli)}
                    to={routes.pagCheltuieli}
                    className="nav-item font-size-16 font-pnr"
                  >
                    Cheltuieli
                  </NavLink>
                </div>
  
                <div>
                  <NavLink
                    style={handleHighlightLinkItem(routes.pagDatorii)}
                    to={routes.pagDatorii}
                    className="nav-item font-size-16 font-pnr"
                  >
                    Datorii
                  </NavLink>
                </div>
  
                <div>
                  <NavLink
                    style={handleHighlightLinkItem(routes.pagEducatieFinanciara)}
                    to={routes.pagEducatieFinanciara}
                    className="nav-item font-size-16 font-pnr"
                  >
                    Educatie Finanicara
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    style={handleHighlightLinkItem(routes.pagVenit)}
                    to={routes.pagVenit}
                    className="nav-item font-size-16 font-pnr"
                  >
                    Venit
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    style={handleHighlightLinkItem(routes.pagOverview)}
                    to={routes.pagOverview}
                    className="nav-item font-size-16 font-pnr"
                  >
                    Acasa
                  </NavLink>
                </div>
                <button onClick={() => handleLogout()}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Meniu;