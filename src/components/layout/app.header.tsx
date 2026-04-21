import { Layout, Avatar, Dropdown, Button, Typography, Divider } from "antd";
import type { MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined, DownOutlined } from "@ant-design/icons";
import { signout } from "@/services/api/auth.api";
import { useNavigate } from "react-router-dom";
import { useCurrentApp } from "@/components/context/app.context";

const { Header } = Layout;
const { Text } = Typography;

interface AppHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  title?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, onToggle, title = "Chia tiền ăn chơi" }) => {
  const navigate = useNavigate();
  const { profile } = useCurrentApp();

  const USER_MENU_ITEMS: MenuProps["items"] = [
    { key: "change-password", label: "Đổi mật khẩu" },
    {
      key: "logout",
      label: "Đăng xuất",
      danger: true,
      onClick: async () => {
        await signout();
        navigate("/login");
      },
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
        height: 56,
        lineHeight: "56px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{
            width: 56,
            height: 56,
            fontSize: 16,
            color: "#595959",
          }}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#262626",
            margin: 0,
          }}
        >
          {title}
        </Text>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          type="text"
          shape="circle"
          icon={<QuestionCircleOutlined style={{ fontSize: 18, color: "#8c8c8c" }} />}
        />
        <Divider type="vertical" style={{ background: "#373737", height: "25px" }} />
        <Dropdown menu={{ items: USER_MENU_ITEMS }} trigger={["click"]} placement="bottomRight">
          <Button
            type="text"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 40,
              padding: "0 8px",
              borderRadius: 8,
            }}
          >
            <Avatar
              src={profile?.avatar_path}
              size={28}
              style={{ background: "#ff6b35", fontSize: 12, flexShrink: 0 }}
            />
            <Text style={{ fontSize: 14, color: "#262626", fontWeight: 500 }}>{profile?.full_name}</Text>
            <DownOutlined style={{ fontSize: 10, color: "#8c8c8c" }} />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};
