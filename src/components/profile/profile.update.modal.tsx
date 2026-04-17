import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Typography, Avatar, Upload, Space, Divider, type UploadProps } from "antd";
import {
  UserOutlined,
  LockOutlined,
  IdcardOutlined,
  CrownOutlined,
  CameraOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { updateProfile } from "@/services/api/profile.api";

const { Text, Title } = Typography;

interface IProps {
  openModalUpdate: boolean;
  updateData: IProfile | null;
  onCancel: () => void;
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

const ProfileUpdateModal = (props: IProps) => {
  const { openModalUpdate, onCancel, updateData } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (openModalUpdate && updateData) {
      console.log(updateData);
      form.setFieldsValue({
        fullName: updateData.full_name,
        username: updateData.username,
        role: updateData.role,
        status: updateData.status,
        password: "",
        confirmPassword: "",
      });
      setAvatarPreview(updateData.avatar_path || null);
    }
  }, [updateData, openModalUpdate, form]);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log(values);
      const { confirmPassword, ...submitData } = values;
      await updateProfile(updateData!.id, submitData);
      handleCancel();
    } finally {
      setLoading(false);
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
        .update-user-modal .ant-modal-content {
          border-radius: 16px;
          overflow: hidden;
          padding: 0;
          box-shadow: 0 20px 60px rgba(250, 173, 20, 0.12), 0 4px 20px rgba(0,0,0,0.08);
        }
        .update-user-modal .ant-input:focus,
        .update-user-modal .ant-input-focused,
        .update-user-modal .ant-input-affix-wrapper:focus {
          border-color: #faad14 !important;
          box-shadow: 0 0 0 3px rgba(250, 173, 20, 0.12) !important;
        }
        .update-user-modal .ant-form-item-label > label {
          font-weight: 500;
          color: #434343;
          font-size: 13px;
        }
        .update-user-modal .ant-input-affix-wrapper, 
        .update-user-modal .ant-input,
        .update-user-modal .ant-select-selector {
          border-radius: 8px !important;
        }
        .avatar-upload-container:hover .avatar-mask {
          opacity: 1;
        }
      `}</style>

      <Modal
        open={openModalUpdate}
        onCancel={handleCancel}
        footer={null}
        width={520}
        className="update-user-modal"
        closeIcon={<CloseOutlined style={{ fontSize: 14, color: "#fff" }} />}
        styles={{ body: { padding: 0 } }}
        maskClosable={false}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #faad14 0%, #ffc53d 100%)",
            padding: "28px 32px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <Title level={4} style={{ color: "#fff", margin: 0, fontWeight: 700, fontSize: 18 }}>
              Cập nhật thông tin
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 13 }}>
              Thay đổi thông tin chi tiết của người dùng
            </Text>
          </div>
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
        </div>

        <div style={{ padding: "24px 32px 28px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <Upload {...uploadProps}>
              <div className="avatar-upload-container" style={{ position: "relative", cursor: "pointer" }}>
                <Avatar
                  size={85}
                  src={avatarPreview}
                  icon={<UserOutlined />}
                  style={{
                    background: "#fff7e6",
                    color: "#faad14",
                    border: "3px solid #faad14",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "1px solid #faad14",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <CameraOutlined style={{ fontSize: 12, color: "#faad14" }} />
                </div>
              </div>
            </Upload>
          </div>

          <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
            <Form.Item
              name="fullName"
              label="Tên hiển thị"
              rules={[{ required: true, message: "Không được để trống tên" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Nhập tên hiển thị"
                size="large"
              />
            </Form.Item>

            <Form.Item name="username" label="Tên tài khoản (Không thể sửa)">
              <Input
                prefix={<IdcardOutlined style={{ color: "#bfbfbf" }} />}
                size="large"
                disabled
                style={{ backgroundColor: "#f5f5f5", color: "#8c8c8c" }}
              />
            </Form.Item>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Form.Item name="role" label="Vai trò">
                <Select options={ROLE_OPTIONS} size="large" />
              </Form.Item>

              <Form.Item name="status" label="Trạng thái">
                <Select options={STATUS_OPTIONS} size="large" />
              </Form.Item>
            </div>

            <Divider orientation="left" style={{ margin: "10px 0 20px" }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Bảo mật (Chỉ nhập nếu muốn đổi)
              </Text>
            </Divider>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Form.Item name="password" label="Mật khẩu mới" rules={[{ min: 8, message: "Tối thiểu 8 ký tự" }]}>
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Mật khẩu mới"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Xác nhận lại"
                dependencies={["password"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Nhập lại"
                  size="large"
                />
              </Form.Item>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
                marginTop: 24,
              }}
            >
              <Button size="large" onClick={handleCancel} style={{ borderRadius: 8, minWidth: 100 }}>
                Huỷ
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                icon={<EditOutlined />}
                style={{
                  borderRadius: 8,
                  fontWeight: 600,
                  minWidth: 150,
                  background: "linear-gradient(135deg, #faad14 0%, #ff9a14 100%)",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(250, 173, 20, 0.3)",
                }}
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileUpdateModal;
