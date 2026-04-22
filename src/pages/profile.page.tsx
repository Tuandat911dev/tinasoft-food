import ProfileTable from "@/components/profile/profile.table";
import { createProfile, deleteProfile, getAllProfiles } from "@/services/api/profile.api";
import { App, Button } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ProfileCreateModal from "@/components/profile/profile.create.modal";
import ProfileUpdateModal from "@/components/profile/profile.update.modal";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<IProfile[]>([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [updateData, setUpdateData] = useState<IProfile | null>(null);
  const { message } = App.useApp();
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data: IProfile[] = await getAllProfiles();
      setProfileData(data || []);
    } catch (error: unknown) {
      message.error("Không thể tải dữ liệu!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (id: string) => {
    try {
      await deleteProfile(id);
      await loadData();
      message.info("Xoá tài khoản thành công");
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (values: CreateProfileFormValues) => {
    try {
      await createProfile(values);
      message.success("Tạo tài khoản thành công!");
      await loadData();
    } catch (err: unknown) {
      console.log(err);
      message.error("Có lỗi xảy ra");
    }
  };

  return (
    <>
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 20,
          border: "1px solid #f0f0f0",
          color: "#8c8c8c",
          textAlign: "center",
        }}
      >
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => setOpenModalCreate(true)}
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(255, 107, 53, 0.35)",
            marginBottom: "10px",
            display: "flex",
            marginLeft: "auto",
          }}
        >
          Thêm mới
        </Button>
        <ProfileTable
          profileData={profileData}
          setUpdateData={setUpdateData}
          setOpenModalUpdate={setOpenModalUpdate}
          handleDeleteProfile={handleDeleteProfile}
          loading={loading}
        />

        <ProfileCreateModal
          openModalCreate={openModalCreate}
          onCancel={() => setOpenModalCreate(false)}
          onSubmit={handleSubmit}
        />

        <ProfileUpdateModal
          openModalUpdate={openModalUpdate}
          updateData={updateData}
          onCancel={() => setOpenModalUpdate(false)}
          loadData={loadData}
        />
      </div>
    </>
  );
};

export default ProfilePage;
