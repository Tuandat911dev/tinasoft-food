import React, { useState } from "react";
import { Table, Input, Select, Button, Tag, Typography, Space, type TableColumnsType } from "antd";
import { SearchOutlined, DollarCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

// ─── Types ────────────────────────────────────────────────────────────────────

type AccountStatus = "Hoạt động" | "Không hoạt động";

interface Account {
  key: number;
  stt: number;
  tenHienThi: string;
  tenTaiKhoan: string;
  trangThai: AccountStatus;
  soDu: number;
  lanCuoiCapNhat: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_DATA: Account[] = [
  {
    key: 1,
    stt: 1,
    tenHienThi: "Super Admin",
    tenTaiKhoan: "superadmin",
    trangThai: "Hoạt động",
    soDu: 0,
    lanCuoiCapNhat: "09:42 19/06/2025",
  },
  {
    key: 2,
    stt: 2,
    tenHienThi: "Nguyễn Thắng Hải An",
    tenTaiKhoan: "haian.nt",
    trangThai: "Hoạt động",
    soDu: 85000,
    lanCuoiCapNhat: "11:25 09/04/2026",
  },
  {
    key: 3,
    stt: 3,
    tenHienThi: "Hoàng Bá Thanh",
    tenTaiKhoan: "thanh.hb",
    trangThai: "Hoạt động",
    soDu: 0,
    lanCuoiCapNhat: "11:08 27/11/2025",
  },
  {
    key: 4,
    stt: 4,
    tenHienThi: "Phạm Thị Minh Nguyệt",
    tenTaiKhoan: "nguyet.ptm",
    trangThai: "Hoạt động",
    soDu: 0,
    lanCuoiCapNhat: "18:19 20/03/2026",
  },
  {
    key: 5,
    stt: 5,
    tenHienThi: "Trần Thị Giang",
    tenTaiKhoan: "giang.tt",
    trangThai: "Hoạt động",
    soDu: 0,
    lanCuoiCapNhat: "11:30 19/06/2025",
  },
  {
    key: 6,
    stt: 6,
    tenHienThi: "Nguyễn Thạch Nam",
    tenTaiKhoan: "nam.nt",
    trangThai: "Hoạt động",
    soDu: 0,
    lanCuoiCapNhat: "10:39 12/12/2025",
  },
  {
    key: 7,
    stt: 7,
    tenHienThi: "Lamoon",
    tenTaiKhoan: "thanh.dd",
    trangThai: "Hoạt động",
    soDu: 15000,
    lanCuoiCapNhat: "11:16 06/01/2026",
  },
  {
    key: 8,
    stt: 8,
    tenHienThi: "nyagami",
    tenTaiKhoan: "quan.dh",
    trangThai: "Hoạt động",
    soDu: 184700,
    lanCuoiCapNhat: "11:00 09/04/2026",
  },
  {
    key: 9,
    stt: 9,
    tenHienThi: "không phải con chu",
    tenTaiKhoan: "con.ch",
    trangThai: "Hoạt động",
    soDu: 503000,
    lanCuoiCapNhat: "11:25 09/04/2026",
  },
  {
    key: 10,
    stt: 10,
    tenHienThi: "Lê Văn Đức",
    tenTaiKhoan: "duc.lv",
    trangThai: "Không hoạt động",
    soDu: 20000,
    lanCuoiCapNhat: "08:00 01/01/2026",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + " ₫";

const totalBalance = MOCK_DATA.reduce((sum, a) => sum + a.soDu, 0);

// ─── Component ────────────────────────────────────────────────────────────────

const AccountTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Hoạt động");

  const filtered = MOCK_DATA.filter((item) => {
    const matchName =
      item.tenHienThi.toLowerCase().includes(search.toLowerCase()) ||
      item.tenTaiKhoan.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Tất cả" || item.trangThai === statusFilter;
    return matchName && matchStatus;
  });

  const columns: TableColumnsType<Account> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 64,
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      width: 80,
      align: "center",
      render: () => <DollarCircleOutlined style={{ fontSize: 22, color: "#faad14", cursor: "pointer" }} />,
    },
    {
      title: "Tên hiển thị",
      dataIndex: "tenHienThi",
      key: "tenHienThi",
      ellipsis: true,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "tenTaiKhoan",
      key: "tenTaiKhoan",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: 130,
      render: (status: AccountStatus) => (
        <Tag
          style={{
            color: status === "Hoạt động" ? "#52c41a" : "#ff4d4f",
            background: status === "Hoạt động" ? "rgba(82,196,26,0.08)" : "rgba(255,77,79,0.08)",
            border: `1px solid ${status === "Hoạt động" ? "#b7eb8f" : "#ffa39e"}`,
            borderRadius: 4,
            fontWeight: 500,
            padding: "1px 8px",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Số dư",
      dataIndex: "soDu",
      key: "soDu",
      width: 130,
      align: "right",
      render: (val: number) => <Text style={{ color: val > 0 ? "#262626" : "#8c8c8c" }}>{formatCurrency(val)}</Text>,
    },
    {
      title: "Lần cuối cập nhật",
      dataIndex: "lanCuoiCapNhat",
      key: "lanCuoiCapNhat",
      width: 170,
      align: "right",
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
              { value: "Tất cả", label: "Tất cả" },
              { value: "Hoạt động", label: "Hoạt động" },
              { value: "Không hoạt động", label: "Không hoạt động" },
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
      <Table<Account>
        columns={columns}
        dataSource={filtered}
        pagination={false}
        size="middle"
        scroll={{ y: "calc(100vh - 240px)" }}
        rowKey="key"
        style={{ borderTop: "1px solid #f0f0f0" }}
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
