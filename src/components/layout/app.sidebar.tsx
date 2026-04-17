import { Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "@/assets/logo.svg";
import miniLogo from "@/assets/mini-logo.svg";
import {
  UserOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const NAV_ITEMS: MenuProps["items"] = [
  {
    key: "tai-khoan",
    icon: <UserOutlined />,
    label: <Link to="/account">Tài khoản</Link>,
  },
  {
    key: "hom-nay-an-gi",
    icon: <AppstoreOutlined />,
    label: "Hôm nay ăn gì",
  },
  {
    key: "chia-tien-an-choi",
    icon: <ClockCircleOutlined />,
    label: "Chia tiền ăn chơi",
  },
  {
    key: "bien-dong-so-du",
    icon: <CalendarOutlined />,
    label: "Biến động số dư",
  },
  {
    key: "danh-sach-tai-khoan",
    icon: <DollarCircleOutlined />,
    label: <Link to="/profile">Danh sách tài khoản</Link>,
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  selectedKey: string;
  onSelect: (key: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed, selectedKey, onSelect }) => {
  return (
    <Sider
      collapsed={collapsed}
      collapsedWidth={80}
      width={248}
      style={{
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
        flex: "0 0 248px",
        maxWidth: "248px",
        minWidth: "248px",
        width: "2480px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "44px",
          margin: "10px 0px 20px",
        }}
      >
        {collapsed ? (
          /* Compact logo */
          <div style={{ display: "flex", alignItems: "center", gap: 0, justifyContent: "center" }}>
            <img src={miniLogo} alt="" />
          </div>
        ) : (
          /* Full logo */
          <div style={{ display: "flex", alignItems: "center", gap: 0, justifyContent: "center" }}>
            <img src={logo} alt="" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={NAV_ITEMS}
        inlineCollapsed={collapsed}
        onClick={({ key }) => onSelect(key)}
        style={{
          border: "none",
          marginTop: 8,
        }}
        theme="light"
      />

      <style>{`
        .ant-menu-light .ant-menu-item-selected {
          background-color: #fff3ee !important;
          color: #ff6b35 !important;
        }
        .ant-menu-light .ant-menu-item-selected .anticon {
          color: #ff6b35 !important;
        }
        .ant-menu-light .ant-menu-item:hover {
          color: #ff6b35 !important;
        }
        .ant-menu-light .ant-menu-item:hover .anticon {
          color: #ff6b35 !important;
        }
        .ant-menu-inline .ant-menu-item::after {
          border-right-color: #ff6b35 !important;
        }
        .ant-table-body {
          scrollbar-width: thin;
          scrollbar-color: rgba(242, 93, 29, .298) #f1f1f1;
        }
        .ant-table-body::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .ant-table-body::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .ant-table-body::-webkit-scrollbar-thumb {
          background: rgba(242, 93, 29, .298);
          border-radius: 10px;
          -webkit-transition: background-color .3s ease;
          transition: background-color .3s ease;
        }
        .ant-table-body::-webkit-scrollbar-corner {
          background: #f1f1f1;
        }
      `}</style>
    </Sider>
  );
};
