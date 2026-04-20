import { useState } from "react";
import { Form, Input, Button, Divider, App } from "antd";
import { EyeInvisibleOutlined, EyeOutlined, GoogleOutlined } from "@ant-design/icons";
import backgroundImage from "@/assets/background-login.png";
import logo from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";
import brand from "@/assets/brand.svg";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      {/* Top header */}
      <div style={styles.header}>
        <span style={styles.headerLogo}>
          <img src={brand} alt="" style={{ width: "40px" }} />
          Tinasoft Vietnam
        </span>
      </div>

      <div style={styles.body}>
        {/* LEFT: Login card */}
        <div style={styles.cardWrap}>
          <div style={styles.card}>
            {/* Brand */}
            <div style={styles.brand}>
              <img style={styles.logo} src={logo} alt="" />
            </div>

            <p style={styles.subtitle}>Xin chào dân Tina đang đói :))</p>
            <h2 style={styles.title}>Đăng Ký </h2>

            <Form layout="vertical" onFinish={() => console.log(1)} requiredMark={false}>
              <Form.Item
                label={<span style={styles.label}>Tài khoản Tinasoft</span>}
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
              >
                <Input placeholder="supabase" style={styles.input} size="large" />
              </Form.Item>

              <Form.Item
                label={<span style={styles.label}>Mật khẩu</span>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  style={styles.input}
                  size="large"
                  suffix={
                    <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </span>
                  }
                />
              </Form.Item>

              <Form.Item
                label={<span style={styles.label}>Xác nhận mật khẩu</span>}
                name="rePassword"
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password type="password" placeholder="••••••••" style={styles.input} size="large" />
              </Form.Item>

              <div style={styles.linksRow}>
                <span style={styles.newUser}>
                  DÂN CŨ?{" "}
                  <a href="/login" style={styles.link}>
                    Đăng nhập
                  </a>
                </span>
                <a href="#" style={styles.link}>
                  Quên mật khẩu?
                </a>
              </div>

              <Form.Item style={{ marginTop: 8 }}>
                <Button htmlType="submit" loading={loading} block size="large" style={styles.loginBtn}>
                  Đăng Ký
                </Button>
              </Form.Item>
            </Form>

            <Divider plain style={styles.divider}>
              <span style={styles.dividerText}>Hãy đăng nhập bằng</span>
            </Divider>

            <div style={styles.googleWrap}>
              <Button
                shape="circle"
                size="large"
                style={styles.googleBtn}
                icon={<GoogleOutlined style={{ fontSize: 20, color: "#EA4335" }} />}
              />
            </div>

            <p style={styles.copyright}>©2026 Tinasoft, Inc. All Rights Reserved.</p>
          </div>
        </div>

        {/* RIGHT: Illustration */}
        <div style={styles.illustrationWrap}></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: 'Nunito', sans-serif;
          background: #fff;
        }

        @keyframes floatBounce {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-14px) rotate(var(--r, 0deg)); }
        }

        .ant-input-affix-wrapper:focus-within,
        .ant-input-affix-wrapper-focused {
          border-color: #ff6b00 !important;
          box-shadow: 0 0 0 2px rgba(255,107,53,0.15) !important;
        }

        .ant-input:focus {
          border-color: #ff6b00 !important;
          box-shadow: 0 0 0 2px rgba(255,107,53,0.15) !important;
        }

        .ant-btn-loading {
          background: #ff6b00 !important;
        }

        .ant-form-item-label > label {
          font-family: 'Nunito', sans-serif !important;
          font-weight: 600 !important;
          color: #333 !important;
        }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    fontFamily: "'Nunito', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#ff6b00",
    height: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    width: "100%",
    position: "fixed",
  },
  headerLogo: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 17,
    letterSpacing: 0.5,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  headerLogoIcon: {
    background: "rgba(255,255,255,0.25)",
    borderRadius: "50%",
    width: 28,
    height: 28,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 15,
  },
  body: {
    marginTop: 50,
    flex: 1,
    display: "flex",
    alignItems: "stretch",
    minHeight: "calc(100vh - 52px)",
  },
  cardWrap: {
    width: "42%",
    minWidth: 360,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
    background: "#fff",
  },
  card: {
    borderRadius: 20,
    boxShadow: "0 8px 48px rgba(0,0,0,0.10)",
    padding: "48px",
    width: "100%",
    maxWidth: 525,
    border: "2px solid #fff",
    background: "hsla(0, 0%, 99%, .1)",
    WebkitBoxShadow: "0 2px 8px 0 rgba(99, 99, 99, .2)",
    backdropFilter: "blur(5px)",
    zIndex: 999,
  },
  brand: {
    fontSize: 30,
    fontWeight: 900,
    color: "#ff6b00",
    letterSpacing: -0.5,
    marginBottom: 6,
    fontFamily: "'Nunito', sans-serif",
  },
  logo: {
    width: 218,
  },
  brandFood: {
    color: "#ff6b00",
  },
  brandO: {
    color: "#333",
  },
  brandD: {
    color: "#ff6b00",
  },
  subtitle: {
    color: "#666",
    fontSize: 14,
    margin: "0 0 2px",
    fontWeight: 600,
  },
  title: {
    fontSize: 26,
    fontWeight: 900,
    color: "#1a1a1a",
    margin: "0 0 20px",
    fontFamily: "'Nunito', sans-serif",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444",
  },
  input: {
    borderRadius: 8,
    border: "1.5px solid #e0e0e0",
    fontFamily: "'Nunito', sans-serif",
    fontSize: 15,
  },
  eyeIcon: {
    cursor: "pointer",
    color: "#aaa",
    fontSize: 16,
    transition: "color 0.2s",
  },
  linksRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    fontSize: 13,
  },
  newUser: {
    color: "#555",
    fontWeight: 600,
  },
  link: {
    color: "#ff6b00",
    fontWeight: 700,
    textDecoration: "none",
  },
  loginBtn: {
    background: "#ff6b00",
    border: "none",
    borderRadius: 10,
    fontWeight: 800,
    fontSize: 16,
    color: "#fff",
    height: 48,
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 4px 16px rgba(255,107,53,0.35)",
    transition: "all 0.2s",
  },
  divider: {
    margin: "8px 0",
    borderColor: "#eee",
  },
  dividerText: {
    fontSize: 13,
    color: "#999",
    fontWeight: 600,
  },
  googleWrap: {
    display: "flex",
    justifyContent: "center",
    margin: "8px 0 16px",
  },
  googleBtn: {
    border: "1.5px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    background: "#fff",
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
    color: "#bbb",
    margin: 0,
    fontWeight: 600,
  },
  illustrationWrap: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "right bottom",
    backgroundAttachment: "fixed",
  },
  orangeBlob: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "85%",
    height: "55%",
    background: "#ff6b00",
    borderRadius: "60% 0 0 0",
    zIndex: 0,
  },
  heroBurger: {
    position: "relative",
    zIndex: 1,
    fontSize: 200,
    filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.22))",
    marginTop: 40,
    animation: "floatBounce 4s ease-in-out infinite",
    userSelect: "none",
    pointerEvents: "none",
  },
};

export default RegisterPage;
