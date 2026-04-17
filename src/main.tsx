import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "@/components/layout/app.layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import AccountPage from "@/pages/profile.page";
import { App } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <h1>home</h1> },
      { path: "account", element: <AccountPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff6b00",
            borderRadius: 6,
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </App>
  </StrictMode>,
);
