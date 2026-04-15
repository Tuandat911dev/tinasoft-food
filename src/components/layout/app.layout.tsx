import { Layout } from "antd";
import { useState } from "react";
import { AppSidebar } from "@/components/layout/app.sidebar";
import { AppHeader } from "@/components/layout/app.header";
import { Content } from "antd/es/layout/layout";
import "@/styles/reset.css";
import "@/styles/style.css";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("chia-tien-an-choi");

  const PAGE_TITLES: Record<string, string> = {
    "tai-khoan": "Tài khoản",
    "hom-nay-an-gi": "Hôm nay ăn gì",
    "chia-tien-an-choi": "Chia tiền ăn chơi",
    "bien-dong-so-du": "Biến động số dư",
    "danh-sach-tai-khoan": "Danh sách tài khoản",
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
      <AppSidebar collapsed={collapsed} selectedKey={selectedKey} onSelect={setSelectedKey} />

      <Layout>
        <AppHeader collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} title={PAGE_TITLES[selectedKey]} />

        <Content
          style={{
            padding: 24,
            background: "#fafafa",
            minHeight: "calc(100vh - 56px)",
          }}
        >
          {children ?? (
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 32,
                border: "1px solid #f0f0f0",
                color: "#8c8c8c",
                textAlign: "center",
              }}
            >
              <Outlet />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
