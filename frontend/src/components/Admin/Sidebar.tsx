import React, { useState, useEffect } from "react";
import { Layout, Menu, type MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  CalendarOutlined,
  TeamOutlined,
  ShopOutlined, // Dùng cho Phòng/Cơ sở
  DollarOutlined,
  SettingOutlined,
  LogoutOutlined,
  StarOutlined,
} from "@ant-design/icons";
import type { UserResponse } from "../../services/usersService";
import { useI18n } from "../Language/useI18n";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  isDark: boolean;
  adminUser: UserResponse | null;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  isDark,
  adminUser,
  handleLogout,
}) => {
  const t = useI18n();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState<string>(location.pathname);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location.pathname]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys);
  };

  // --- CẤU HÌNH MENU CHO THUÊ PHÒNG ---
  const items: MenuItem[] = [
    // 1. Tổng quan
    getItem(<Link to="/admin">{t("admin.sidebarDashboard")}</Link>, "/admin", <AppstoreOutlined />),

    // 2. Nghiệp vụ chính: Quản lý Lịch đặt
    getItem(t("admin.sidebarBookingManagement"), "sub_booking", <CalendarOutlined />, [
      getItem(
        <Link to="/admin/bookings/calendar">{t("admin.sidebarBookingCalendar")}</Link>,
        "/admin/bookings/calendar",
      ),
      getItem(
        <Link to="/admin/bookings/list">{t("admin.sidebarBookingList")}</Link>,
        "/admin/bookings/list",
      ),
      getItem(
        <Link to="/admin/bookings/check-in">{t("admin.sidebarBookingCheckIn")}</Link>,
        "/admin/bookings/check-in",
      ),
    ]),

    // 3. Quản lý Tài nguyên (Phòng ốc) -> BỎ HẾT CHILD
    getItem(
      <Link to="/admin/rooms">{t("admin.sidebarRoomsManagement")}</Link>,
      "/admin/rooms",
      <ShopOutlined />,
    ),

    // 4. Khách hàng
    getItem(
      <Link to="/admin/customers">{t("admin.sidebarCustomers")}</Link>,
      "/admin/customers",
      <TeamOutlined />,
    ),

    // 5. Tài chính
    getItem(t("admin.sidebarFinance"), "sub_finance", <DollarOutlined />, [
      getItem(
        <Link to="/admin/invoices">{t("admin.sidebarInvoices")}</Link>,
        "/admin/invoices",
      ),
      getItem(
        <Link to="/admin/transactions">{t("admin.sidebarTransactions")}</Link>,
        "/admin/transactions",
      ),
    ]),

    // 6. Đánh giá & Phản hồi
    getItem(
      <Link to="/admin/reviews">{t("admin.sidebarReviews")}</Link>,
      "/admin/reviews",
      <StarOutlined />,
    ),

    // 7. Cài đặt hệ thống -> THÊM CHILD
    getItem(t("admin.sidebarSystemSettings"), "sub_settings", <SettingOutlined />, [
      getItem(
        <Link to="/admin/room-types">{t("admin.sidebarRoomTypes")}</Link>,
        "/admin/room-types",
      ),
      getItem(
        <Link to="/admin/amenities">{t("admin.sidebarAmenities")}</Link>,
        "/admin/amenities",
      ),
      getItem(
        <Link to="/admin/settings">{t("admin.sidebarGeneralSettings")}</Link>,
        "/admin/settings",
      ),
    ]),

    // Logout
    getItem(t("admin.sidebarLogout"), "logout", <LogoutOutlined />),
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      handleLogout();
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      theme={isDark ? "dark" : "light"}
      className="shadow-md z-20"
      style={{
        borderRight: isDark ? "1px solid #303030" : "1px solid #f0f0f0",
      }}
    >
      {/* Logo Section */}
      <div
        className={`h-16 flex items-center justify-center border-b transition-colors ${
          isDark ? "border-gray-700 bg-[#001529]" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden px-4">
          <div className="min-w-[32px] h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            E
          </div>
          {!collapsed && (
            <div
              className={`font-bold text-xl tracking-tight whitespace-nowrap transition-opacity duration-300 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Learn With Vy
            </div>
          )}
        </div>
      </div>

      <div className="h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar py-2">
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={items}
          onClick={handleMenuClick}
          theme={isDark ? "dark" : "light"}
          style={{ border: "none", background: "transparent" }}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
