import { Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
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
    label: "Tài khoản",
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
    label: (
      <Link to="/account">
        Danh sách tài khoản
      </Link>
    ),
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
      collapsedWidth={56}
      width={220}
      style={{
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? 0 : "0 20px",
          borderBottom: "1px solid #f0f0f0",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {collapsed ? (
          /* Compact logo: two orange circles */
          <div style={{ display: "flex", gap: 3 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff6b35",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff6b35",
              }}
            />
          </div>
        ) : (
          /* Full logo: TinaFOOD wordmark */
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#ff6b35",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              Tina
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#ff6b35",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              F
            </span>
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#ff6b35",
                marginBottom: 1,
              }}
            />
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#ff6b35",
                marginBottom: 1,
                marginLeft: 1,
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#ff6b35",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              D
            </span>
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
      `}</style>
    </Sider>
  );
};
