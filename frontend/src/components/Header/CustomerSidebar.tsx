import { useState, useEffect, useRef, useMemo } from "react";
import { FiX, FiSearch, FiGlobe, FiChevronDown, FiMoon, FiSun } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.jpg";

interface CustomerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerSidebar = ({ isOpen, onClose }: CustomerSidebarProps) => {
  const location = useLocation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("VI");
  const languageRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("landing_dark_mode") === "true";
  });

  const menuItems = useMemo(
    () => [
      { label: "Trang chủ", path: "/", active: location.pathname === "/" },
      { label: "Danh mục", path: "/categories", active: location.pathname === "/categories" },
      { label: "Lớp học 1:1", path: "/classes/1-on-1", active: location.pathname.includes("/classes/1-on-1") },
      { label: "Lớp nhóm", path: "/classes/group", active: location.pathname.includes("/classes/group") },
      { label: "IELTS", path: "/classes/ielts", active: location.pathname.includes("/ielts") },
      { label: "TOEIC", path: "/classes/toeic", active: location.pathname.includes("/toeic") },
      { label: "Thiếu nhi", path: "/classes/kids", active: location.pathname.includes("/kids") },
      { label: "Business English", path: "/classes/business", active: location.pathname.includes("/business") },
      { label: "Về chúng tôi", path: "/about", active: location.pathname === "/about" },
      { label: "Liên hệ", path: "/contact", active: location.pathname === "/contact" },
    ],
    [location.pathname]
  );

  const languages = [
    { code: "VI", label: "Tiếng Việt" },
    { code: "EN", label: "English" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    if (!isLanguageOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageOpen]);


  return (
    <>
      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/35 backdrop-blur-md z-[9998]"
              onClick={onClose}
              style={{
                WebkitBackdropFilter: 'blur(8px)',
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 h-full w-[33.333%] min-w-[320px] max-w-[400px] bg-[#fafafa] z-[9999] flex flex-col shadow-2xl"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Đóng menu"
                >
                  <FiX size={20} className="text-black" />
                </button>

                {/* Logo - Center */}
                <div className="flex-1 flex justify-center">
                  <Link to="/" onClick={onClose}>
                    <img
                      src={logo}
                      alt="Learn With Vy Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </Link>
                </div>

                {/* Search Icon */}
                <button
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Tìm kiếm"
                >
                  <FiSearch size={20} className="text-black" />
                </button>
              </div>

              {/* Menu Items - Scrollable */}
              <div className="flex-1 overflow-y-auto sidebar-scroll">
                <nav className="py-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`block px-4 py-3 text-base font-medium transition-colors ${
                        item.active
                          ? "bg-[#d4a574]/30 text-[#8b5a2b] font-semibold"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Language Selector */}
                    <div className="relative" ref={languageRef}>
                      <button
                        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <FiGlobe size={18} />
                        <span className="text-sm font-medium">{selectedLanguage}</span>
                        <FiChevronDown
                          size={16}
                          className={`transition-transform ${isLanguageOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Language Dropdown */}
                      {isLanguageOpen && (
                        <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[150px] z-10">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setSelectedLanguage(lang.code);
                                setIsLanguageOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                                selectedLanguage === lang.code ? "bg-gray-50 font-medium" : ""
                              }`}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dark Mode Toggle */}
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
                      className="relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none bg-gray-300 hover:bg-gray-400"
                      title={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
                    >
                      <span
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
                          isDarkMode ? "translate-x-7" : "translate-x-1"
                        }`}
                      >
                        {isDarkMode ? (
                          <FiMoon size={14} className="text-slate-700" />
                        ) : (
                          <FiSun size={14} className="text-yellow-500" />
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Policy Link */}
                  <Link
                    to="/policy"
                    onClick={onClose}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Chính sách
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerSidebar;
