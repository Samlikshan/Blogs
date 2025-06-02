import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, PenSquare, LayoutDashboard, LogOut } from "lucide-react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reducers/rootReducer";
import { logout } from "../../reducers/userSlice";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation and close menu
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMenuOpen(false);
  };

  // Check if route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Link styles
  const linkBaseClasses =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-blue-100 text-blue-800";
  const inactiveLinkClasses = "text-gray-700 hover:bg-gray-100";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-blue-600 text-2xl font-bold">
                BlogForge
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className={`${linkBaseClasses} ${
                    isActive("/dashboard")
                      ? activeLinkClasses
                      : inactiveLinkClasses
                  } flex items-center`}
                >
                  <LayoutDashboard size={18} className="mr-1" />
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("/posts/new")}
                  className={`${linkBaseClasses} ${
                    isActive("/posts/new")
                      ? activeLinkClasses
                      : inactiveLinkClasses
                  } flex items-center`}
                >
                  <PenSquare size={18} className="mr-1" />
                  New Post
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LogOut size={18} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">
                {isMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className={`${linkBaseClasses} w-full text-left ${
                    isActive("/dashboard")
                      ? activeLinkClasses
                      : inactiveLinkClasses
                  } flex items-center`}
                >
                  <LayoutDashboard size={18} className="mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("/posts/new")}
                  className={`${linkBaseClasses} w-full text-left ${
                    isActive("/posts/new")
                      ? activeLinkClasses
                      : inactiveLinkClasses
                  } flex items-center`}
                >
                  <PenSquare size={18} className="mr-2" />
                  New Post
                </button>
                <button
                  onClick={handleLogout}
                  className={`${linkBaseClasses} w-full text-left ${inactiveLinkClasses} flex items-center`}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/login")}
                  className={`${linkBaseClasses} w-full ${
                    isActive("/login") ? activeLinkClasses : inactiveLinkClasses
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/register")}
                  className={`${linkBaseClasses} w-full ${
                    isActive("/register")
                      ? activeLinkClasses
                      : inactiveLinkClasses
                  }`}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
