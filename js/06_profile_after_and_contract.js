/* =========================================================
   FILE: 06_profile_after_and_contract.js
   MAP VỚI: FRAME 3.2 — Tab Hồ sơ (KHI ĐÃ tạo PRUTwin)
            + FRAME 3.3 — Chi tiết hợp đồng 1234

   Chứa:
   - ProfileScreenAfter   -> tab Hồ sơ sau khi đã có Hồ sơ PRUTwin (lời chào, hợp đồng, quick actions, checklist quyền lợi)
   - ContractDetailScreen -> chi tiết 1 hợp đồng cụ thể (phí, số tiền BH, bảo tức, ngày đáo hạn...)

   SỬA GÌ Ở ĐÂY:
   - Đổi tên khách hàng 'Iris Pham' -> sửa trong ProfileScreenAfter
   - Đổi danh sách hợp đồng / trạng thái -> sửa mảng contracts trong ProfileScreenAfter
   - Đổi số liệu tài chính hợp đồng (phí, số tiền BH...) -> sửa trong ContractDetailScreen
   ========================================================= */

function ProfileScreenAfter({ onNav, onOpenContract }) {
  const contracts = [
    { id: "1234", status: "Đang hiệu lực" },
    { id: "5678", status: "Đang hiệu lực" },
  ];
  const quickActions = [
    { icon: "📄", label: "Thanh toán\nphí bảo hiểm" },
    { icon: "💞", label: "Yêu cầu\nquyền lợi" },
    { icon: "🎁", label: "Ưu đãi\nđặc quyền" },
    { icon: "📖", label: "Tìm hiểu\nthêm" },
  ];
  const benefits = [
    { text: "Khám chữa bệnh tại cơ sở y tế liên kết", used: false },
    { text: "Điều trị nội trú và ngoại trú", used: false },
    { text: "Hỗ trợ chi phí thuốc điều trị", used: false },
    { text: "Xét nghiệm và chẩn đoán hình ảnh (X-quang, CT, MRI, siêu âm…)", used: true },
    { text: "Tiêm phòng và dịch vụ phòng ngừa bệnh tật", used: true },
  ];

  return (
    <div className="screen">
      <div className="header">
        <button className="icon-btn plain" style={{ fontSize: 18 }}>☰</button>
        <button className="icon-btn" onClick={() => onNav("notifications")}>🔔</button>
      </div>
      <div className="scrollarea" style={{ padding: "0 20px 24px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div className="muted" style={{ fontSize: 13 }}>Xin chào,</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--red)" }}>Iris Nguyen</div>
            <div className="muted" style={{ fontSize: 12.5, marginTop: 6, lineHeight: 1.5 }}>
              Cùng <b>PRUTwin</b> theo dõi và quản lý hành trình bảo vệ của bạn.
            </div>
          </div>
          <div style={{ width: 90, flexShrink: 0 }}>
            <AssetPlaceholder assetKey="prutwinCharacter" icon="🙋‍♀️" label="Nhân vật PRUTwin" note="Không có khiên phía sau ở màn này" height={90} radius={16} />
          </div>
        </div>

        <div className="section-title-row" style={{ marginTop: 22 }}>
          <div className="section-title">Hợp đồng của bạn</div>
          <div className="link-red">Xem tất cả ›</div>
        </div>
        {contracts.map(c => (
          <div key={c.id} className="card" onClick={onOpenContract} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderLeft: "4px solid var(--red)", marginBottom: 10, cursor: "pointer"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--red)", fontSize: 18 }}>✅</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Hợp đồng {c.id}</div>
                <span className="badge-green">{c.status}</span>
              </div>
            </div>
            <span style={{ color: "var(--gray-text)" }}>›</span>
          </div>
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 16, marginBottom: 20 }}>
          {quickActions.map((q, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: "var(--red)" }}>{q.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 600, whiteSpace: "pre-line", marginTop: 4, lineHeight: 1.3 }}>{q.label}</div>
            </div>
          ))}
        </div>

        <div className="section-title-row">
          <div className="section-title">Quyền lợi thẻ khám sức khỏe</div>
          <div className="link-red">Chi tiết ›</div>
        </div>
        <div className="card-border">
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 2px", fontSize: 13 }}>
              <span style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: b.used ? "var(--red)" : "transparent",
                border: b.used ? "none" : "2px solid var(--gray-border)",
                color: "var(--white)", fontSize: 11
              }}>{b.used ? "✓" : ""}</span>
              <span style={{ color: b.used ? "var(--ink)" : "var(--gray-text)" }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </div>
  );
}

function ContractDetailScreen({ onBack }) {
  const rows = [
    ["🛡️", "12.000.000 VNĐ", "Phí bảo hiểm định kỳ", "Hàng năm"],
    ["🗓️", "05/08/2020", "Kỳ nộp phí tiếp theo", "Xem lịch sử thu phí"],
    ["💰", "152.450.000 VNĐ", "Số tiền bảo hiểm", null],
    ["📈", "6.615.100 VNĐ", "Bảo tức tích lũy", null],
    ["🔁", "98.750.000 VNĐ", "Giá trị hoàn lại tính đến ngày hiện tại", null],
    ["🗓️", "05/08/2040", "Ngày đáo hạn hợp đồng", null],
  ];
  return (
    <div className="screen">
      <SimpleHeader title="Chi tiết hợp đồng: 1234" onBack={onBack} />
      <div className="scrollarea" style={{ padding: "0 20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
          {rows.map((r, i) => (
            <div key={i} className="card-border" style={{ textAlign: "center", padding: "16px 10px" }}>
              <div style={{ fontSize: 20 }}>{r[0]}</div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "var(--red)", marginTop: 6 }}>{r[1]}</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 4, lineHeight: 1.3 }}>{r[2]}</div>
              {r[3] && <div className="link-red" style={{ fontSize: 10.5, marginTop: 4 }}>{r[3]}</div>}
            </div>
          ))}
        </div>

        <div className="card-border" style={{ marginTop: 16, textAlign: "center", color: "var(--gray-text)", fontSize: 12.5 }}>
          Thông tin đóng phí tự động: —
        </div>
        <div className="card-border" style={{ marginTop: 10, textAlign: "center", color: "var(--gray-text)", fontSize: 12.5 }}>
          Thông tin tạm ứng giá trị hoàn lại: —
        </div>

        <div className="card" style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>📋</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Tải bộ hợp đồng bảo hiểm về điện thoại</span>
          </div>
          <span style={{ color: "var(--red)" }}>⬇️</span>
        </div>

        <div className="section-title" style={{ marginTop: 20, marginBottom: 10 }}>👤 Thông tin liên quan</div>
        <div className="card-border">
          {[["Bên mua bảo hiểm", "Tâm"], ["Người được bảo hiểm", "Tâm"], ["Người thụ hưởng", "Con của Tâm"]].map((r, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", fontSize: 13.5 }}>
                <span className="muted">{r[0]}</span><span style={{ fontWeight: 600 }}>{r[1]}</span>
              </div>
              {i < 2 && <div className="divider" />}
            </div>
          ))}
        </div>

        <div className="badge-note" style={{ marginTop: 16 }}>
          ⓘ Lưu ý: Tổng Bảo tức đặc biệt được công bố từ năm 2022 đến năm 2025 là 6.615.100 VNĐ và đã bao gồm trong Giá trị hoàn lại. Số tiền này sẽ được chi trả cho Quý khách theo quy định của Prudential. Mọi thắc mắc liên quan, có thể giải đáp ở PRUTwin hoặc vui lòng liên hệ Tổng đài Prudential.
        </div>
      </div>
    </div>
  );
}
