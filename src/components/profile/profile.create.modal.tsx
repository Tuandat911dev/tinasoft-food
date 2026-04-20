import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Avatar,
  Upload,
  Space,
  Divider,
  type UploadProps,
  App,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  IdcardOutlined,
  CrownOutlined,
  CameraOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

interface IProps {
  openModalCreate: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateProfileFormValues) => Promise<void> | void;
}

const ROLE_OPTIONS = [
  {
    value: "SuperAdmin",
    label: (
      <Space size={6}>
        <CrownOutlined style={{ color: "#ff6b35" }} />
        <span>Super Admin</span>
      </Space>
    ),
  },
  {
    value: "Admin",
    label: (
      <Space size={6}>
        <IdcardOutlined style={{ color: "#faad14" }} />
        <span>Admin</span>
      </Space>
    ),
  },
  {
    value: "User",
    label: (
      <Space size={6}>
        <UserOutlined style={{ color: "#52c41a" }} />
        <span>User</span>
      </Space>
    ),
  },
];

const STATUS_OPTIONS = [
  { value: 1, label: "Hoạt động" },
  { value: 0, label: "Không hoạt động" },
];

const ProfileCreateModal = (props: IProps) => {
  const { openModalCreate, onCancel, onSubmit } = props;
  const [form] = Form.useForm<CreateProfileFormValues>();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { message } = App.useApp();

  const handleFinish = async (values: CreateProfileFormValues) => {
    setLoading(true);
    try {
      await onSubmit({ ...values, avatar_path: avatarPreview ?? undefined });
      form.resetFields();
      setAvatarPreview(null);
      onCancel();
      message.success("Tạo tài khoản thành công");
    } finally {
      setLoading(false);
      message.error("Có lỗi, tạo tài khoản không thành công");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setAvatarPreview(null);
    onCancel();
  };

  const uploadProps: UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      return false;
    },
    accept: "image/*",
  };

  return (
    <>
      <style>{`
        .create-user-modal .ant-modal-content {
          border-radius: 16px;
          overflow: hidden;
          padding: 0;
          box-shadow: 0 20px 60px rgba(255, 107, 53, 0.12), 0 4px 20px rgba(0,0,0,0.08);
        }
        .create-user-modal .ant-input:focus,
        .create-user-modal .ant-input-focused,
        .create-user-modal .ant-input-affix-wrapper:focus,
        .create-user-modal .ant-input-affix-wrapper-focused {
          border-color: #ff6b35 !important;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.12) !important;
        }
        .create-user-modal .ant-input:hover,
        .create-user-modal .ant-input-affix-wrapper:hover {
          border-color: #ff8c5a !important;
        }
        .create-user-modal .ant-select-focused .ant-select-selector,
        .create-user-modal .ant-select-selector:focus {
          border-color: #ff6b35 !important;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.12) !important;
        }
        .create-user-modal .ant-select:hover .ant-select-selector {
          border-color: #ff8c5a !important;
        }
        .create-user-modal .ant-form-item-label > label {
          font-weight: 500;
          color: #434343;
          font-size: 13px;
        }
        .create-user-modal .ant-form-item-explain-error {
          font-size: 12px;
          margin-top: 3px;
        }
        .create-user-modal .ant-input-affix-wrapper {
          border-radius: 8px;
          padding: 8px 12px;
          border-color: #e8e8e8;
          transition: all 0.2s;
        }
        .create-user-modal .ant-input {
          border-radius: 8px;
          padding: 8px 12px;
          border-color: #e8e8e8;
        }
        .create-user-modal .ant-select-selector {
          border-radius: 8px !important;
          border-color: #e8e8e8 !important;
          min-height: 40px !important;
          align-items: center !important;
        }
        .create-user-modal .ant-form-item {
          margin-bottom: 18px;
        }
        .avatar-upload-btn:hover {
          border-color: #ff6b35 !important;
          color: #ff6b35 !important;
        }
        .avatar-upload-btn:hover .camera-icon {
          color: #ff6b35 !important;
        }
      `}</style>

      <Modal
        open={openModalCreate}
        onCancel={handleCancel}
        footer={null}
        width={520}
        className="create-user-modal"
        closeIcon={<CloseOutlined style={{ fontSize: 14, color: "#8c8c8c" }} />}
        styles={{ body: { padding: 0 } }}
        maskClosable={false}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #ff9a5c 100%)",
            padding: "28px 32px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: 60,
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
            }}
          />

          <Title level={4} style={{ color: "#fff", margin: 0, fontWeight: 700, fontSize: 18 }}>
            Thêm tài khoản mới
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            Điền thông tin để tạo tài khoản người dùng
          </Text>
        </div>

        {/* ── Form body ── */}
        <div style={{ padding: "24px 32px 28px" }}>
          {/* Avatar upload */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Upload {...uploadProps}>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <Avatar
                  size={80}
                  src={avatarPreview}
                  icon={!avatarPreview && <UserOutlined />}
                  style={{
                    background: avatarPreview ? "transparent" : "#fff3ee",
                    color: "#ff6b35",
                    border: "3px solid #ff6b35",
                    fontSize: 28,
                  }}
                />
                <div
                  className="avatar-upload-btn"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "2px solid #e8e8e8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.2s",
                  }}
                >
                  <CameraOutlined
                    className="camera-icon"
                    style={{ fontSize: 12, color: "#8c8c8c", transition: "color 0.2s" }}
                  />
                </div>
              </div>
            </Upload>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ role: "User", status: 1 }}
            requiredMark={false}
          >
            <Form.Item
              name="fullName"
              label="Tên hiển thị"
              rules={[
                { required: true, message: "Vui lòng nhập tên hiển thị" },
                { min: 2, message: "Tên phải có ít nhất 2 ký tự" },
                { max: 50, message: "Tên không được vượt quá 50 ký tự" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Nhập tên hiển thị"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="username"
              label="Tên tài khoản"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản" },
                {
                  pattern: /^[a-z0-9._]+$/,
                  message: "Chỉ được dùng chữ thường, số, dấu chấm và gạch dưới",
                },
                { min: 3, message: "Tên tài khoản phải có ít nhất 3 ký tự" },
                { max: 30, message: "Tên tài khoản không được vượt quá 30 ký tự" },
              ]}
            >
              <Input
                prefix={<IdcardOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="vd: nguyen.van.a"
                size="large"
              />
            </Form.Item>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}>
                <Select options={ROLE_OPTIONS} size="large" placeholder="Chọn vai trò" />
              </Form.Item>

              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
              >
                <Select options={STATUS_OPTIONS} size="large" />
              </Form.Item>
            </div>

            <Divider style={{ margin: "4px 0 18px", borderColor: "#f5f5f5" }} />

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Phải có chữ hoa, chữ thường và số",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Tối thiểu 8 ký tự"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
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
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Nhập lại mật khẩu"
                size="large"
              />
            </Form.Item>

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
                marginTop: 8,
              }}
            >
              <Button
                size="large"
                onClick={handleCancel}
                style={{
                  borderRadius: 8,
                  fontWeight: 500,
                  minWidth: 100,
                  borderColor: "#e8e8e8",
                  color: "#595959",
                }}
              >
                Huỷ
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                icon={<PlusOutlined />}
                style={{
                  borderRadius: 8,
                  fontWeight: 600,
                  minWidth: 140,
                  background: "linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(255, 107, 53, 0.35)",
                }}
              >
                Tạo tài khoản
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileCreateModal;
