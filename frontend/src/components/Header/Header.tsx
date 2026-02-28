import { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiMenu, FiFileText } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "../../pages/Customer/LoginPage/LoginPage";
import UserMenu from "./UserMenu";
import CustomerSidebar from "./CustomerSidebar";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.jpg";

const useAuthCheck = () => {
  const requireAuth = (cb: () => void) => {
    cb();
  };
  return { requireAuth };
};

const useUnreadMessages = () => ({ unreadCount: 0 });

const HEADER_CONFIG = { MIN_HEIGHT: 64 } as const;

const ICON_BUTTON_CLASS =
  "relative w-9 h-9 md:w-10 md:h-10 grid place-items-center rounded-full border border-transparent hover:border-[#5cdb95] shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out origin-center will-change-transform";
const PRIMARY_BUTTON_CLASS =
  "px-1.5 md:px-4 py-1.5 md:py-2 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out border hover:border-[#5cdb95]";
const BUTTON_TEXT_HOVER_CLASS =
  "text-xs md:text-sm whitespace-nowrap inline-block hover:scale-110 transition-transform duration-300 ease-in-out";

const Header = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { requireAuth } = useAuthCheck();
  const { unreadCount } = useUnreadMessages();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeaderTransparent, setIsHeaderTransparent] = useState<boolean>(false);

  const [headerHeight, setHeaderHeight] = useState<number>(HEADER_CONFIG.MIN_HEIGHT);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const headerHeightClass = "md:h-16 py-1";

  const handleLogoutClick = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const updateHeaderHeight = () => {
      const h = headerRef.current
        ? headerRef.current.offsetHeight
        : HEADER_CONFIG.MIN_HEIGHT;
      setHeaderHeight(h);
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

 
  useEffect(() => {
    const isHome = location.pathname === "/";
    
    const updateTransparency = () => {
      if (!isHome) {
        setIsHeaderTransparent(false);
      } else {
        setIsHeaderTransparent(window.scrollY < 40);
      }
    };

    updateTransparency();
    
    if (!isHome) {
      return;
    }

    window.addEventListener("scroll", updateTransparency, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateTransparency);
    };
  }, [location.pathname]);


  const displayUser = user ? {
    name: user.userName || "User",
  } : null;

  return (
    <>
      <header
        ref={headerRef}
          className={`w-full fixed top-0 left-0 right-0 z-50 text-[#0e0e0e] text-base leading-[1.4] transition-colors duration-300 ${
          isHeaderTransparent
            ? "border-b-0 shadow-none bg-transparent"
            : "border-b-2 border-[#0ea753] shadow-sm bg-[rgba(171,222,186,0.7)] backdrop-blur-[2px]"
          }`}
        style={{ minHeight: `${HEADER_CONFIG.MIN_HEIGHT}px` }}
      >
        <div
          className={`w-full max-w-screen-2xl mx-auto px-2 md:px-4 flex flex-col items-center justify-center h-auto ${headerHeightClass}`}
        >
          <div className="flex items-center w-full gap-2 md:gap-4">
            <div className="flex-1 flex items-center justify-start">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className={`${ICON_BUTTON_CLASS} ${
                  isHeaderTransparent
                    ? "bg-transparent hover:bg-white/10 border-transparent hover:border-[#5cdb95]"
                    : "bg-transparent hover:bg-[#edf5e1]/60 border-[#0ea753] hover:border-[#0ea753]"
                }`}
                aria-label="Mở menu"
                title="Menu"
              >
                <FiMenu
                  size={24}
                  className={`md:text-[22px] m-auto ${
                    isHeaderTransparent ? "text-white" : "text-[#034732]"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-center shrink-0">
              <Link
                to="/"
                className="flex items-center"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (window.location.pathname === "/chat") {
                    e.preventDefault();
                    window.location.href = "/";
                  }
                }}
              >
                <img
                  src={logo}
                  alt="Learn With Vy Logo"
                  className={`object-contain transform transition-all duration-300 ease-in-out ${
                    isHeaderTransparent
                      ? "h-40 w-40 md:h-60 md:w-60 translate-y-10 md:translate-y-26 scale-[2.15] md:scale-[2.35]"
                      : "h-24 w-24 md:h-28 md:w-28 translate-y-0 scale-125 md:scale-150"
                  }`}
                />
              </Link>
            </div>

           
            <div className="flex-1 flex items-center justify-end gap-2 md:gap-3 shrink-0">
              <Link
                to="/homework"
                className={`${ICON_BUTTON_CLASS} ${
                  isHeaderTransparent
                    ? "bg-transparent hover:bg-white/10 border-transparent hover:border-[#5cdb95]"
                    : "bg-transparent hover:bg-[#edf5e1]/60 border-[#0ea753] hover:border-[#0ea753]"
                }`}
                title="Bài tập"
              >
                <FiFileText
                  size={18}
                  className={`md:text-[20px] m-auto ${
                    isHeaderTransparent ? "text-white" : "text-[#034732]"
                  }`}
                />
              </Link>

              <button
                onClick={() => {
                  requireAuth(() => {
                    navigate("/chat");
                  });
                }}
                className={`${ICON_BUTTON_CLASS} ${
                  isHeaderTransparent
                    ? "bg-transparent hover:bg-white/10 border-transparent hover:border-[#5cdb95]"
                    : "bg-transparent hover:bg-[#edf5e1]/60 border-[#0ea753] hover:border-[#0ea753]"
                }`}
                title="Chat"
              >
                <FiMessageCircle
                  size={18}
                  className={`md:text-[20px] m-auto ${
                    isHeaderTransparent ? "text-white" : "text-[#034732]"
                  }`}
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => requireAuth(() => navigate("/post-item"))}
                className={`${PRIMARY_BUTTON_CLASS} inline-flex items-center justify-center h-10 md:h-11 px-3 md:px-5 py-2 md:py-2.5 bg-transparent ${
                  isHeaderTransparent
                    ? "text-white border-white/40 hover:bg-white/10 hover:text-white hover:border-[#5cdb95]"
                    : "text-[#034732] border-[#0ea753] hover:bg-[#edf5e1]/60 hover:text-[#034732] hover:border-[#0ea753]"
                }`}
                title="Đăng tin"
              >
                <span className={`${BUTTON_TEXT_HOVER_CLASS} leading-none`}>Vào lớp học</span>
              </button>

              {isLoading ? (
                <div className="w-10 h-10 ml-2 bg-gray-200 rounded-full animate-pulse" />
              ) : (
                <UserMenu
                  isLoggedIn={isAuthenticated}
                  user={displayUser}
                  onLoginClick={() => setShowLoginModal(true)}
                  onLogoutClick={handleLogoutClick}
                  isHeaderTransparent={isHeaderTransparent}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <div style={{ height: headerHeight }} />

      {/* Customer Sidebar */}
      <CustomerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Modal Login + Register (slide trong 1 popup) */}
      <LoginPage
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Header;