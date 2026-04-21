import { useCurrentApp } from "@/components/context/app.context";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { isAuthenticated } = useCurrentApp();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, tài nguyên không tồn tại."
      extra={
        <Button type="primary" style={{ background: "#f25d1d" }}>
          {isAuthenticated ? <Link to="/">Trở Lại Trang Chủ</Link> : <Link to="/login">Trang Đăng Nhập</Link>}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
