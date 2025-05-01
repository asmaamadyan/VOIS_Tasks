import { Outlet } from "react-router-dom";
import DashboardNavigation from "../components/DashboardNavigation";

function DashboardLayout() {
  return (
    <>
      <DashboardNavigation />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
