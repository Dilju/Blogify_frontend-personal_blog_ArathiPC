import { Outlet } from "react-router-dom";
import Header from "../component/ui/header";
import Footer from "../component/ui/footer";

const PublicLayout = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default PublicLayout;
