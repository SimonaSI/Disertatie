import React from "react";
import "./Meniu.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { routes } from "../../Utils/appRoutes";

const Meniu = () => {
  const location = useLocation();
  const pageRoute = location.pathname;
  const navigate = useNavigate();

  const activeLinkColor = { color: "#ff6122" },
    inactiveLinkColor = { color: "#000000" };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate(routes.autentificare);
    toast.success("V-ati delogat cu succes!", { toastId: "sdkhfsjkdd" });
  };

  const handleHighlightLinkItem = (linkID) => {
    switch (linkID) {

      case routes.pagOverview:
        return pageRoute === routes.pagOverview ? `nav-item font-size-16 font-pnr active` : `nav-item font-size-16 font-pnr`;

      case routes.pagMetadata:
        return pageRoute === routes.pagMetadata ? `nav-item font-size-16 font-pnr active` : `nav-item font-size-16 font-pnr`;

      case routes.pagVenit:
        return pageRoute === routes.pagVenit ? `nav-item font-size-16 font-pnr active` : `nav-item font-size-16 font-pnr`;

      case routes.pagCheltuieli:
        return pageRoute === routes.pagCheltuieli ? `nav-item font-size-16 font-pnr active` : `nav-item font-size-16 font-pnr`;

      case routes.pagDatorii:
        return pageRoute === routes.pagDatorii ? `nav-item font-size-16 font-pnr active` : `nav-item font-size-16 font-pnr`;

      case routes.pagEducatieFinanciara:
        return pageRoute === routes.pagEducatieFinanciara ? `nav-item font-size-16 font-pnr active` : `nav-item font-size-16 font-pnr`;



      default:
        return `${inactiveLinkColor} delimitator`;
    }
  };

  return (
    <nav className="container-nav">
      <div>
        <div>
          <div className="w-100 d-flex flex-row justify-content-around align-items-center">
            <div className="d-flex flex-row w-100 justify-content-around align-items-center">
              <div className="nav-item d-flex justify-content-around align-items-center">
                <NavLink
                  className={handleHighlightLinkItem(routes.pagOverview)}
                  to={routes.pagOverview}
                >
                  Acasa
                </NavLink>
              </div>

              <span className="delimitator">|</span>

              <div className="nav-item d-flex justify-content-around align-items-center">
                <NavLink
                  className={handleHighlightLinkItem(routes.pagMetadata)}
                  to={routes.pagMetadata}
                >
                  Metadata
                </NavLink>
              </div>

              <span className="delimitator">|</span>

              <div className="nav-item d-flex justify-content-around align-items-center">
                <NavLink
                  className={handleHighlightLinkItem(routes.pagVenit)}
                  to={routes.pagVenit}
                >
                  Venit
                </NavLink>
              </div>

              <span className="delimitator">|</span>

              <div className="nav-item d-flex justify-content-around align-items-center">
                <NavLink
                  className={handleHighlightLinkItem(routes.pagDatorii)}
                  to={routes.pagDatorii}

                >
                  Datorii
                </NavLink>
              </div>

              <span className="delimitator">|</span>

              <div className="nav-item d-flex justify-content-around align-items-center">
                <NavLink
                  className={handleHighlightLinkItem(routes.pagCheltuieli)}
                  to={routes.pagCheltuieli}
                >
                  Cheltuieli
                </NavLink>
              </div>

              <span className="delimitator">|</span>

              <div className="nav-item d-flex justify-content-around align-items-center">


                <NavLink
                  className={handleHighlightLinkItem(routes.pagEducatieFinanciara)}
                  to={routes.pagEducatieFinanciara}
                >
                  Educatie Financiara
                </NavLink>

              </div>

              <span className="delimitator">|</span>

              <button onClick={() => handleLogout()}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Meniu;
