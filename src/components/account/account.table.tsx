import { useState } from "react";
import { Table, Input, Select, Button, Tag, Typography, Space, type TableColumnsType } from "antd";
import { SearchOutlined, DollarCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + " ₫";

interface IProps {
  profileData: IProfile[];
}

const AccountTable = (props: IProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<number>(1);
  const { profileData } = props;

  const totalBalance = profileData.reduce((sum, p) => sum + (p.balance ?? 0), 0);

  const filtered = profileData.filter((item) => {
    const matchName =
      item.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      item.username?.toLowerCase().includes(search.toLowerCase());
    let matchStatus = true;
    if (statusFilter !== 2) {
      matchStatus = item?.status === statusFilter;
    }
    return matchName && matchStatus;
  });

  const columns: TableColumnsType<IProfile> = [
    {
      title: "STT",
      key: "stt",
      width: 64,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      align: "center",
      render: () => <DollarCircleOutlined style={{ fontSize: 22, color: "#faad14", cursor: "pointer" }} />,
    },
    {
      title: "Tên hiển thị",
      dataIndex: "full_name",
      key: "full_name",
      ellipsis: true,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      align: "center",
      render: (_, record) => (
        <Tag
          style={{
            color: record.status === 1 ? "#52c41a" : "#ff4d4f",
            background: record.status === 1 ? "rgba(82,196,26,0.08)" : "rgba(255,77,79,0.08)",
            border: `1px solid ${record.status === 1 ? "#b7eb8f" : "#ffa39e"}`,
            borderRadius: 4,
            fontWeight: 500,
            padding: "1px 8px",
          }}
        >
          {record.status === 1 ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Số dư",
      dataIndex: "balance",
      key: "balance",
      width: 130,
      align: "center",
      render: (val: number) => <Text style={{ color: val > 0 ? "#262626" : "#8c8c8c" }}>{formatCurrency(val)}</Text>,
    },

    {
      title: "Lần cuối cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 200,
      align: "center",
      render: (_, record) => {
        return dayjs(record.updatedAt).format("HH:mm DD/MM/YYYY");
      },
    },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #f0f0f0", padding: "16px 0" }}>
      {/* ── Toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 16px 16px",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <Space size={8}>
          <Text style={{ fontSize: 14, color: "#595959", whiteSpace: "nowrap" }}>Tên hiển thị:</Text>
          <Input
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Tìm theo tên"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />
        </Space>

        {/* Status filter */}
        <Space size={8}>
          <Text style={{ fontSize: 14, color: "#595959", whiteSpace: "nowrap" }}>Trạng thái:</Text>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
            options={[
              { value: 2, label: "Tất cả" },
              { value: 1, label: "Hoạt động" },
              { value: 0, label: "Không hoạt động" },
            ]}
          />
        </Space>

        {/* Right side: QR link + total */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <Button type="link" style={{ color: "#ff6b35", padding: 0, fontWeight: 500 }}>
            Mã QR nạp tiền
          </Button>
          <Text style={{ fontSize: 14, color: "#262626", fontWeight: 500 }}>
            Tổng số dư: <span style={{ color: "#262626" }}>{formatCurrency(totalBalance)}</span>
          </Text>
        </div>
      </div>

      {/* ── Table ── */}
      <Table<IProfile>
        columns={columns}
        dataSource={filtered}
        pagination={false}
        size="middle"
        scroll={{ y: "calc(100vh - 240px)" }}
        rowKey="key"
        style={{ borderTop: "1px solid #f0f0f0" }}
        bordered={true}
      />

      {/* Ant Design orange active row override */}
      <style>{`
        .ant-table-tbody > tr:hover > td {
          background: #fff8f5 !important;
        }
        .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-weight: 600;
          color: #262626;
        }
        .ant-select-selector:hover,
        .ant-select-focused .ant-select-selector {
          border-color: #ff6b35 !important;
          box-shadow: 0 0 0 2px rgba(255,107,53,0.1) !important;
        }
        .ant-input:hover, .ant-input:focus {
          border-color: #ff6b35 !important;
          box-shadow: 0 0 0 2px rgba(255,107,53,0.1) !important;
        }
        .ant-input-affix-wrapper:hover,
        .ant-input-affix-wrapper-focused {
          border-color: #ff6b35 !important;
          box-shadow: 0 0 0 2px rgba(255,107,53,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default AccountTable;
