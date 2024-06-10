import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navigation() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavBar = () => {
    setMobileDrawerOpen((prevState) => !prevState);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 bg-white">
      <div className="py-0 px-5 relative text-md">
        <div className="flex justify-between items-center">
          <div className="h-10 w-30 mr-2 flex items-center font-bold">
            <Link to="/">studyfast 📕</Link>
          </div>
          <div className="hidden lg:flex justify-center space-x-7 items-center">
            <Link className="py-2 font-semibold" to="/login">
              Login
            </Link>
            <Button className="px-5">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
          <div className="lg:hidden flex flex-col justify-end">
            <button onClick={toggleNavBar}>
              {mobileDrawerOpen ? "" : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div
            className={`bg-white border-l border-neutral-100 shadow-2xl fixed top-0 z-20 h-screen p-12 flex flex-row justify-center ${
              mobileDrawerOpen ? "right-0" : "-right-full"
            } lg:hidden`}
          >
            <div className="flex flex-col items-start gap-y-2">
              <button onClick={toggleNavBar}>
                <X />
              </button>
              <Link className="py-2 font-semibold" to="/login">
                Login
              </Link>
              <Button className="px-5">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
