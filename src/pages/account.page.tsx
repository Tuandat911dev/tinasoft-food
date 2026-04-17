import { useState } from "react";
import { Form, Input, Button, Typography, Upload, Divider, Space, type UploadProps } from "antd";
import {
  UserOutlined,
  MailOutlined,
  DollarCircleOutlined,
  EditOutlined,
  CameraOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProfileData {
  fullName: string;
  username: string;
  balance: number;
  avatarUrl?: string;
  coverUrl?: string;
}

const MOCK_PROFILE: ProfileData = {
  fullName: "Supabase User",
  username: "supabase_admin",
  balance: 500000,
};

const AccountPage = () => {
  const [profile, setProfile] = useState<ProfileData>(MOCK_PROFILE);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  const [draftAvatar, setDraftAvatar] = useState<string | undefined>(profile.avatarUrl);
  const [draftCover, setDraftCover] = useState<string | undefined>(profile.coverUrl);

  const startEdit = () => {
    form.setFieldsValue({ fullName: profile.fullName });
    setDraftAvatar(profile.avatarUrl);
    setDraftCover(profile.coverUrl);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setProfile((prev) => ({
        ...prev,
        fullName: values.fullName,
        avatarUrl: draftAvatar,
        coverUrl: draftCover,
      }));
      setEditing(false);
    } catch (error) {
      console.log("Validate failed:", error);
    }
  };

  const makeUploadProps = (setter: (v: string) => void): UploadProps => ({
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => setter(e.target?.result as string);
      reader.readAsDataURL(file);
      return false;
    },
    accept: "image/*",
    disabled: !editing,
  });

  const formatBalance = (val: number) => val.toLocaleString("vi-VN") + " ₫";

  // Quyết định ảnh nào sẽ hiển thị (ảnh nháp khi đang sửa, hoặc ảnh thật khi đang xem)
  const displayAvatar = editing ? draftAvatar : profile.avatarUrl;
  const displayCover = editing ? draftCover : profile.coverUrl;

  return (
    <>
      <style>{`
        /* Cover */
        .ant-upload {
            width: 100%;
        }
        .pcov-wrap { position: relative; height: 220px; overflow: hidden; background: #f5f5f5; transition: all 0.3s; }
        .pcov-wrap.editing {cursor: pointer}
        .pcov-wrap.editing:hover { opacity: 0.8; }
        
        .pcov-mask {
          position: absolute; inset: 0; background: rgba(0,0,0,0.2);
          display: flex; align-items: center; justify-content: center; color: #fff;
          opacity: 0; transition: 0.3s;
        }
        .pcov-wrap.editing:hover .pcov-mask { opacity: 1; }

        /* Avatar */
        .pavt-wrap { position: relative; width: 110px; height: 110px; border-radius: 20px; overflow: hidden; background: #fff; }
        .pavt-wrap.editing { cursor: pointer; border: 3px solid #ff6b35 !important; }
        
        .pavt-mask {
          position: absolute; inset: 0; background: rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center; color: #fff;
          opacity: 0; transition: 0.3s;
        }
        .pavt-wrap.editing:hover .pavt-mask { opacity: 1; }

        /* Custom Input */
        .p-input-edit .ant-input {
           border-radius: 8px !important;
           padding: 8px 12px;
        }
      `}</style>

      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          border: "1px solid #f0f0f0",
          color: "#8c8c8c",
          overflow: "hidden",
        }}
      >
        {/* ── SECTION 1: COVER ── */}
        <Upload {...makeUploadProps(setDraftCover)}>
          <div className={`pcov-wrap ${editing ? "editing" : ""}`}>
            {displayCover ? (
              <img
                src={displayCover}
                alt="cover"
                style={{ width: "100%", objectFit: "cover", borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #fff5f0 0%, #ffe0d3 100%)",
                }}
              >
                <CameraOutlined style={{ fontSize: 32, color: "#ffb899" }} />
              </div>
            )}
            {editing && (
              <div className="pcov-mask">
                <Space direction="vertical" align="center">
                  <CameraOutlined style={{ fontSize: 24 }} />
                  <Text style={{ color: "#fff" }}>Thay ảnh bìa</Text>
                </Space>
              </div>
            )}
          </div>
        </Upload>

        {/* ── SECTION 2: INFO HEADER ── */}
        <div style={{ padding: "0 32px 32px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, marginTop: -50 }}>
            {/* Avatar */}
            <Upload {...makeUploadProps(setDraftAvatar)}>
              <div
                className={`pavt-wrap ${editing ? "editing" : ""}`}
                style={{ border: "4px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                {displayAvatar ? (
                  <img src={displayAvatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fff3ee",
                    }}
                  >
                    <UserOutlined style={{ fontSize: 40, color: "#ff6b35" }} />
                  </div>
                )}
                {editing && (
                  <div className="pavt-mask">
                    <CameraOutlined style={{ fontSize: 20 }} />
                  </div>
                )}
              </div>
            </Upload>

            {/* Name and Username */}
            <div style={{ flex: 1, paddingBottom: 8 }}>
              <Title level={3} style={{ margin: 0, fontWeight: 800 }}>
                {profile.fullName}
              </Title>
              <Text type="secondary">@{profile.username}</Text>
            </div>

            {/* Action Buttons */}
            <div style={{ paddingBottom: 8 }}>
              {!editing ? (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={startEdit}
                  style={{ borderRadius: 8, height: 40, background: "#ff6b35", border: "none" }}
                >
                  Chỉnh sửa trang cá nhân
                </Button>
              ) : (
                <Space>
                  <Button icon={<CloseOutlined />} onClick={cancelEdit} style={{ borderRadius: 8, height: 40 }}>
                    Hủy bỏ
                  </Button>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                    style={{ borderRadius: 8, height: 40, background: "#ff6b35", border: "none" }}
                  >
                    Lưu thay đổi
                  </Button>
                </Space>
              )}
            </div>
          </div>

          <Divider style={{ margin: "24px 0" }} />

          {/* ── SECTION 3: FORM FIELDS ── */}
          <Form form={form} layout="horizontal" labelCol={{ span: 6 }} labelAlign="left" className="p-input-edit">
            {/* FIELD: FULL NAME (Sửa trực tiếp tại đây) */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
                <Text strong style={{ color: "#595959" }}>
                  Tên hiển thị
                </Text>
                {editing ? (
                  <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: "Tên không được để trống" }]}
                    style={{ margin: 0 }}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Nhập tên mới..." size="large" />
                  </Form.Item>
                ) : (
                  <div
                    style={{
                      padding: "8px 16px",
                      background: "#f9f9f9",
                      borderRadius: 8,
                      border: "1px solid #eee",
                      color: "#262626",
                    }}
                  >
                    {profile.fullName}
                  </div>
                )}
              </div>
            </div>

            {/* FIELD: USERNAME (Read-only) */}
            <div style={{ marginBottom: 20 }}>
              <Text strong style={{ color: "#595959" }}>
                Tên tài khoản
              </Text>
              <div
                style={{
                  marginTop: 8,
                  padding: "8px 16px",
                  background: "#f5f5f5",
                  borderRadius: 8,
                  border: "1px solid #eee",
                  color: "#8c8c8c",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MailOutlined /> {profile.username}
              </div>
            </div>

            {/* FIELD: BALANCE (Read-only) */}
            <div style={{ marginBottom: 20 }}>
              <Text strong style={{ color: "#595959" }}>
                Số dư tài khoản
              </Text>
              <div
                style={{
                  marginTop: 8,
                  padding: "8px 16px",
                  background: "#f5f5f5",
                  borderRadius: 8,
                  border: "1px solid #eee",
                  color: "#faad14",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <DollarCircleOutlined /> {formatBalance(profile.balance)}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
