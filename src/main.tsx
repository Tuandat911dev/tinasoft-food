import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./components/layout/app.layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <h1>home</h1> },
      { path: "settings", element: <p>Setting</p> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>,
);
