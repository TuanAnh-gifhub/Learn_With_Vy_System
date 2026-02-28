import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter, FaHome } from "react-icons/fa";
import { useI18n } from "../Language/useI18n";

interface FooterProps {
  isDarkMode?: boolean;
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ isDarkMode }, ref) => {
  const t = useI18n();
  return (
    <footer
      ref={ref}
      className={`w-full relative z-20 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 mb-8">
          {/* Column 1: Learn With Vy Branding and Social Media */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#5cdb95] rounded-lg flex items-center justify-center">
                <FaHome className="text-[#05386b] text-xl" />
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Learn With Vy</h3>
            </div>
            <p
              className={`text-sm leading-relaxed ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {t("footer.brandDescription")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-[#edf5e1] border-2 border-[#8ee4af] rounded-lg flex items-center justify-center hover:border-[#5cdb95] hover:bg-[#8ee4af] transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-gray-700 text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#edf5e1] border-2 border-[#8ee4af] rounded-lg flex items-center justify-center hover:border-[#5cdb95] hover:bg-[#8ee4af] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-gray-700 text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#edf5e1] border-2 border-[#8ee4af] rounded-lg flex items-center justify-center hover:border-[#5cdb95] hover:bg-[#8ee4af] transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-gray-700 text-lg" />
              </a>
            </div>
          </div>

          {/* Column 2: Liên Kết Nhanh */}
          <div className="space-y-4">
            <h4
              className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {t("footer.quickLinksTitle")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about-us"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#379683] transition-colors"
                >
                  {t("footer.quickLinksAboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-gray-600 hover:text-[#379683] transition-colors"
                >
                  {t("footer.quickLinksClassrooms")}
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-sm text-gray-600 hover:text-[#379683] transition-colors"
                >
                  {t("footer.quickLinksNews")}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-600 hover:text-[#379683] transition-colors"
                >
                  {t("footer.quickLinksTerms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hỗ Trợ */}
          <div className="space-y-4">
            <h4
              className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {t("footer.supportTitle")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#379683] transition-colors"
                >
                  {t("footer.supportHelpCenter")}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-gray-600 hover:text-[#379683] transition-colors"
                >
                  {t("footer.supportFaq")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-600 hover:text-[#379683] transition-colors"
                >
                  {t("footer.supportPrivacy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-600 hover:text-[#379683] transition-colors"
                >
                  {t("footer.supportContact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Liên Hệ */}
          <div className="space-y-4">
            <h4
              className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {t("footer.contactTitle")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#5cdb95] text-lg mt-0.5 shrink-0" />
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {t("footer.contactAddress")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-[#5cdb95] text-lg shrink-0" />
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {t("footer.contactPhone")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-[#5cdb95] text-lg shrink-0" />
                <a
                  href={`mailto:${t("footer.contactEmail")}`}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#379683] transition-colors"
                >
                  {t("footer.contactEmail")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={`border-t pt-6 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
          <p className={`text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
