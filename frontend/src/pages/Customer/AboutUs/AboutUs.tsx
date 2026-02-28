import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  FaClock,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaSearch,
  FaCalendarCheck,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaEnvelope,
} from "react-icons/fa";
import { message } from "antd";
import { useI18n } from "../../../components/Language/useI18n";
interface AboutUsProps {
  isDarkMode?: boolean;
}

const AboutUs = ({ isDarkMode = false }: AboutUsProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState("");
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const t = useI18n();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    messageApi.success(t("about.subscribeSuccess"));
    console.log("Subscribing with email:", email);
    setEmail("");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.01 }, // Lower threshold to trigger earlier
    );

    const currentRef = aboutUsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const features = [
    {
      icon: FaClock,
      titleKey: "about.featuresFastBookingTitle",
      descKey: "about.featuresFastBookingDesc",
    },
    {
      icon: FaShieldAlt,
      titleKey: "about.featuresSecureTitle",
      descKey: "about.featuresSecureDesc",
    },
    {
      icon: FaCreditCard,
      titleKey: "about.featuresPaymentTitle",
      descKey: "about.featuresPaymentDesc",
    },
    {
      icon: FaHeadset,
      titleKey: "about.featuresSupportTitle",
      descKey: "about.featuresSupportDesc",
    },
  ] as const;

  const steps = [
    {
      number: "01",
      icon: FaSearch,
      titleKey: "about.step1Title",
      descKey: "about.step1Desc",
    },
    {
      number: "02",
      icon: FaCalendarCheck,
      titleKey: "about.step2Title",
      descKey: "about.step2Desc",
    },
    {
      number: "03",
      icon: FaCheckCircle,
      titleKey: "about.step3Title",
      descKey: "about.step3Desc",
    },
  ] as const;

  const testimonials = [
    {
      nameKey: "about.testimonial1Name",
      occupationKey: "about.testimonial1Occupation",
      rating: 5,
      textKey: "about.testimonial1Text",
      avatar:
        "https://ui-avatars.com/api/?name=Nguyen+Minh+Anh&background=4da6ff&color=fff&size=128",
    },
    {
      nameKey: "about.testimonial2Name",
      occupationKey: "about.testimonial2Occupation",
      rating: 5,
      textKey: "about.testimonial2Text",
      avatar:
        "https://ui-avatars.com/api/?name=Tran+Hoang+Nam&background=4da6ff&color=fff&size=128",
    },
    {
      nameKey: "about.testimonial3Name",
      occupationKey: "about.testimonial3Occupation",
      rating: 5,
      textKey: "about.testimonial3Text",
      avatar:
        "https://ui-avatars.com/api/?name=Le+Thi+Huong&background=4da6ff&color=fff&size=128",
    },
  ] as const;

  return (
    <div
      ref={aboutUsRef}
      className="relative z-10 w-full py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Tại Sao Chọn Chúng Tôi? */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#379683]">
              {t("about.whyChooseTitle")}
            </h2>
            <p
              className={`text-sm md:text-base ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t("about.whyChooseSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 0 }}
                  animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                    isDarkMode
                      ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700"
                      : "bg-white/95 backdrop-blur-sm border border-gray-100"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
                      isDarkMode ? "bg-[#5cdb95]/20" : "bg-[#5cdb95]/15"
                    }`}
                  >
                    <IconComponent className="text-2xl text-[#379683]" />
                  </div>
                  <h3
                    className={`text-lg font-bold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t(feature.titleKey)}
                  </h3>
                  <p
                    className={`text-xs md:text-sm leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    >
                      {t(feature.descKey)}
                    </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Section 2: Cách Thức Hoạt Động */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#379683]">
              {t("about.howItWorksTitle")}
            </h2>
            <p
              className={`text-sm md:text-base ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t("about.howItWorksSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={
                    isVisible
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`relative rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                      isDarkMode
                        ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700"
                        : "bg-white border border-gray-100"
                    }`}
                  >
                    {/* Number Badge */}
                    <div
                      className={`absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#5cdb95] text-[#034732] shadow-lg`}
                    >
                      {step.number}
                    </div>

                    <div
                      className={`w-20 h-20 rounded-lg flex items-center justify-center mb-6 ${
                        isDarkMode ? "bg-[#5cdb95]/20" : "bg-[#5cdb95]/15"
                      }`}
                    >
                      <IconComponent className="text-3xl text-[#379683]" />
                    </div>
                    <h3
                      className={`text-lg font-bold mb-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t(step.titleKey)}
                    </h3>
                    <p
                      className={`text-xs md:text-sm leading-relaxed ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {t(step.descKey)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Section 3: Khách Hàng Nói Gì Về Chúng Tôi */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#379683]">
              {t("about.testimonialsTitle")}
            </h2>
            <p
              className={`text-sm md:text-base ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t("about.testimonialsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 0 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
                }
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`relative rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  isDarkMode
                    ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700"
                    : "bg-white border border-gray-100"
                }`}
              >
                {/* Quote marks */}
                <FaQuoteLeft
                  className={`absolute top-4 right-4 text-4xl opacity-20 ${
                    isDarkMode ? "text-[#5cdb95]" : "text-[#5cdb95]"
                  }`}
                />
                <FaQuoteRight
                  className={`absolute bottom-4 left-4 text-4xl opacity-20 ${
                    isDarkMode ? "text-[#5cdb95]" : "text-[#5cdb95]"
                  }`}
                />

                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={t(testimonial.nameKey)}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#5cdb95]"
                  />
                  <div>
                    <h4
                      className={`font-bold text-base ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                      >
                      {t(testimonial.nameKey)}
                    </h4>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {t(testimonial.occupationKey)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                <p
                  className={`text-sm leading-relaxed relative z-10 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t(testimonial.textKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 4: Đăng Ký Nhận Ưu Đãi */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20 mt-20"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#5cdb95] to-[#379683] p-8 md:p-12">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 text-center">
              {/* Envelope Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <FaEnvelope className="text-white text-3xl" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                {t("about.subscribeTitle")}
              </h2>

              {/* Subtitle */}
              <p className="text-sm md:text-base text-white/90 mb-8 max-w-2xl mx-auto">
                {t("about.subscribeSubtitle")}
              </p>

              {/* Email Form */}
              {contextHolder}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("about.subscribePlaceholder")}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-[#8ee4af] focus:outline-none focus:border-[#5cdb95] focus:ring-2 focus:ring-[#5cdb95]/25 text-white placeholder-white/80 bg-white/10"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-[#379683] font-semibold rounded-lg hover:bg-[#edf5e1] transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
                >
                  {t("about.subscribeButton")}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
