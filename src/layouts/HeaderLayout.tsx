import { Outlet } from "react-router-dom";
import { Header } from "../components";

const HeaderLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
