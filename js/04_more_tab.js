/* =========================================================
   FILE: 04_more_tab.js
   MAP VỚI: FRAME 3 — Giao diện tab Thêm (Settings)

   Chứa:
   - MoreScreen -> màn hình 'Thêm' (thông tin tài khoản, hỗ trợ, chính sách, cài đặt, đăng xuất)

   SỬA GÌ Ở ĐÂY:
   - Đổi thông tin tài khoản mẫu (họ tên, email, sđt...) -> sửa object trong MoreScreen
   - Thêm/bớt mục trong 'Hỗ trợ' / 'Chính sách' / 'Cài đặt' -> sửa các mảng tương ứng
   ========================================================= */

function MoreScreen({ onBack, onNav, hasProfile }) {
  const accountRows = [
    ["Họ và tên", hasProfile ? "NGUYỄN THỊ THANH TÂM" : "—"],
    ["Giới tính", hasProfile ? "Nữ" : "—"],
    ["Email", "Chưa cập nhật"],
    ["Số điện thoại", hasProfile ? "0123456789" : "—"],
    ["Ngày sinh", hasProfile ? "05/08/1990" : "—"],
    ["Địa chỉ", hasProfile ? "Diên Hồng, TPHCM" : "—"],
  ];
  const support = ["Về Prudential", "Liên hệ với Prudential", "Cập nhật phiên bản", "Câu hỏi thường gặp (FAQ)", "Hướng dẫn sử dụng"];
  const policy = ["Chính sách bảo mật", "Điều khoản sử dụng", "Quy định và điều khoản"];

  return (
    <div className="screen">
      <div className="header">
        <div className="header-title">Thêm</div>
        <button className="icon-btn" onClick={() => {}}>🔔</button>
      </div>
      <div className="scrollarea" style={{ padding: "0 16px 24px" }}>
        <div className="card" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18 }}>
          <div style={{ width: 52, height: 52, flexShrink: 0 }}>
            <AssetPlaceholder assetKey="avatar" icon="🙂" label="Avatar" height={52} radius={26} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{hasProfile ? "NGUYỄN THỊ THANHTÂM" : "Chưa có tên"}</div>
            <div className="link-red" style={{ fontSize: 12, cursor: "pointer" }} onClick={() => onNav("prutwin")}>
              {hasProfile ? "Xem hồ sơ PRUTwin ›" : "Chưa tạo hồ sơ PRUTwin ›"}
            </div>
          </div>
        </div>

        {!hasProfile && (
          <div className="card" style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, background: "var(--red-tint-05)" }}>
            <div style={{ fontSize: 20 }}>🎁</div>
            <div style={{ fontSize: 12.5 }}>Tạo hồ sơ để nhận tư vấn và quyền lợi cá nhân hóa dành riêng cho bạn.</div>
          </div>
        )}

        <div className="section-title" style={{ marginBottom: 8 }}>Thông tin tài khoản</div>
        <div className="card-border" style={{ marginBottom: 18 }}>
          {accountRows.map(([k, v], i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", fontSize: 13.5 }}>
                <span className="muted">{k}</span>
                <span style={{ fontWeight: 600 }}>{v} ›</span>
              </div>
              {i < accountRows.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>

        <div className="section-title" style={{ marginBottom: 8 }}>Hỗ trợ</div>
        <div className="card-border" style={{ marginBottom: 18 }}>
          {support.map((s, i) => (
            <div key={i}>
              <div style={{ padding: "10px 2px", fontSize: 13.5, display: "flex", justifyContent: "space-between" }}>{s} <span>›</span></div>
              {i < support.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>

        <div className="section-title" style={{ marginBottom: 8 }}>Chính sách</div>
        <div className="card-border" style={{ marginBottom: 18 }}>
          {policy.map((s, i) => (
            <div key={i}>
              <div style={{ padding: "10px 2px", fontSize: 13.5, display: "flex", justifyContent: "space-between" }}>{s} <span>›</span></div>
              {i < policy.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>

        <div className="section-title" style={{ marginBottom: 8 }}>Cài đặt</div>
        <div className="card-border" style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", fontSize: 13.5 }}><span>Ngôn ngữ</span><span>Tiếng Việt ›</span></div>
          <div className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", fontSize: 13.5 }}><span>Thông báo</span><span>›</span></div>
          <div className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", fontSize: 13.5 }}><span>Bảo mật</span><span>›</span></div>
          <div className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 2px", fontSize: 13.5 }}>
            <span>Chế độ tối</span>
            <div style={{ width: 40, height: 22, borderRadius: 12, background: "var(--gray-border)" }} />
          </div>
        </div>

        <button className="btn-secondary-outline">↩ Đăng xuất</button>
      </div>
      <BottomNav active="more" onNav={onNav} />
    </div>
  );
}
