import AccountTable from "@/components/account/account.table";
import { getAllProfiles } from "@/services/api/profile.api";
import { message } from "antd";
import { useEffect, useState } from "react";

const AccountPage = () => {
  const [profileData, setProfileData] = useState<IProfile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data: IProfile[] = await getAllProfiles();
        setProfileData(data || []);
      } catch (error: unknown) {
        message.error("Không thể tải dữ liệu!");
        console.error(error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <>
      <AccountTable profileData={profileData} />
    </>
  );
};

export default AccountPage;
