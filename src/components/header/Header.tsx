import { HeaderProvider } from "../providers/HeaderProvider";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";

function Header() {
  return (
    <HeaderProvider>
      <header className="w-full fixed bg-white shadow-sm top-0 z-50 transition-opacity duration-300 ease-in-out">
        <div className="max-container">
          <Navbar />
        </div>
        <MobileMenu />
      </header>
    </HeaderProvider>
  );
}

export default Header;
