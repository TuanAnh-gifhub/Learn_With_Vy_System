import { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "../../pages/Customer/LoginPage/LoginPage";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.jpg";

const useAuthCheck = () => {
  const { isAuthenticated } = useAuth();
  const requireAuth = (cb: () => void) => {
    if (!isAuthenticated) {
      // Nếu chưa đăng nhập thì mở modal hoặc báo lỗi (tùy logic bạn muốn xử lý)
      // Ở đây tạm thời vẫn cho chạy callback hoặc bạn có thể kích hoạt modal login
      // Ví dụ: alert("Vui lòng đăng nhập");
      cb();
    } else {
      cb();
    }
  };
  return { requireAuth };
};

const useUnreadMessages = () => ({ unreadMessages: [], unreadCount: 0 });

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

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("landing_dark_mode") === "true";
  });

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
    
    const shouldBeTransparent = isHome && window.scrollY < 40;
    
    const timeoutId = setTimeout(() => {
      setIsHeaderTransparent(shouldBeTransparent);
    }, 0);
    if (!isHome) {
      return () => clearTimeout(timeoutId);
    }

    const onScroll = () => {
      setIsHeaderTransparent(window.scrollY < 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
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
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("toggleSidebar"));
                }}
                className={`${ICON_BUTTON_CLASS} ${
                  isHeaderTransparent
                    ? "bg-transparent hover:bg-white/10"
                    : "bg-transparent hover:bg-[#edf5e1]/60"
                }`}
                aria-label="Mở menu"
                title="Menu"
              >
                <FiMenu
                  size={24}
                  className={`md:text-[22px] m-auto ${
                    isHeaderTransparent ? "text-white" : "text-black"
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

           
            <div className="flex-1 flex items-center justify-end gap-0.5 md:gap-1 shrink-0">
              {(() => {
                const iconBgClass = isHeaderTransparent
                  ? "bg-transparent hover:bg-white/10"
                  : "bg-transparent hover:bg-[#edf5e1]/60";
                const wishlistBgClass = isHeaderTransparent
                  ? iconBgClass
                  : iconBgClass;
                const chatBgClass = isHeaderTransparent
                  ? iconBgClass
                  : iconBgClass;

                return (
                  <>
                    <button
                      onClick={() => {
                        setIsDarkMode((prev) => {
                          const newValue = !prev;
                          localStorage.setItem("landing_dark_mode", String(newValue));
                          window.dispatchEvent(
                            new CustomEvent("darkModeChanged", {
                              detail: { isDarkMode: newValue },
                            }),
                          );
                          return newValue;
                        });
                      }}
                      className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none ${isHeaderTransparent
                        ? "bg-white/10 hover:bg-white/15"
                        : isDarkMode
                          ? "bg-slate-700"
                          : "bg-gray-300"
                        }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${isDarkMode ? "translate-x-7" : "translate-x-1"}`}
                      >
                        {isDarkMode ? (
                          <FiMoon size={14} className="text-slate-700" />
                        ) : (
                          <FiSun size={14} className="text-yellow-500" />
                        )}
                      </span>
                    </button>

                    {/* Wishlist */}
                    <Link
                      to="/wishlist"
                      className={`${ICON_BUTTON_CLASS} ${wishlistBgClass}`}
                      title="Yêu thích"
                    >
                      <FaHeart
                        size={18}
                        className="md:text-[20px] text-[#ff3b6b] m-auto"
                      />
                    </Link>

                    {/* Chat */}
                    <button
                      onClick={() => {
                        requireAuth(() => {
                          navigate("/chat");
                        });
                      }}
                      className={`${ICON_BUTTON_CLASS} ${chatBgClass}`}
                      title="Chat"
                    >
                      <FiMessageCircle
                        size={18}
                        className="md:text-[20px] text-[#379683] m-auto"
                      />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center animate-pulse">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Đăng phòng */}
                    <button
                      onClick={() => requireAuth(() => navigate("/post-item"))}
                      className={`${PRIMARY_BUTTON_CLASS} inline-flex items-center justify-center h-10 md:h-11 px-3 md:px-5 py-2 md:py-2.5 bg-transparent ${
                        isHeaderTransparent
                          ? "text-white border-white/40 hover:bg-white/10 hover:text-white hover:border-white/60"
                          : "text-[#034732] border-[#0ea753] hover:bg-[#edf5e1]/60 hover:text-[#034732] hover:border-[#0ea753]"
                      }`}
                      title="Đăng tin"
                    >
                      <span className={`${BUTTON_TEXT_HOVER_CLASS} leading-none`}>Vào lớp học</span>
                    </button>

                    {/* --- 5. USER MENU MỚI --- */}
                    {isLoading ? (
                      // Skeleton Loader khi đang check Auth từ Context
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
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </header>

      <div style={{ height: headerHeight }} />

      {/* Modal Login + Register (slide trong 1 popup) */}
      <LoginPage
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Header;