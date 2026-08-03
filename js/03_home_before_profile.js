/* =========================================================
   FILE: 03_home_before_profile.js
   MAP VỚI: FRAME 1 — TRANG CHỦ PRUTWin (Chưa tạo Hồ sơ AI)
            + FRAME 2 — Giao diện Hồ sơ/Điều chỉnh khi CHƯA tạo PRUTwin

   Chứa:
   - CATEGORIES               -> data 5 category thanh đỏ (Tích lũy cho con, Đầu tư...)
   - SHORTCUTS                -> data 5 shortcut card (Hợp đồng, Lịch đóng phí...)
   - HomeScreenBeforeProfile  -> toàn bộ trang chủ khi user CHƯA tạo hồ sơ PRUTwin
   - ProfilePromptScreen      -> màn yêu cầu tạo hồ sơ PRUTwin (dùng cho tab Điều chỉnh khi chưa có hồ sơ)

   SỬA GÌ Ở ĐÂY:
   - Đổi nội dung Hero Banner, các Category, Shortcut -> sửa mảng CATEGORIES / SHORTCUTS
   - Đổi bài viết 'Giới thiệu về Prudential' / 'Góc kiến thức' -> sửa trực tiếp trong JSX của HomeScreenBeforeProfile
   ========================================================= */

const CATEGORIES = [
  { key: "child", icon: "🌱", label: "Tích lũy cho con" },
  { key: "invest", icon: "📈", label: "Đầu tư bền vững" },
  { key: "health", icon: "🏥", label: "Chăm sóc sức khỏe" },
  { key: "benefit", icon: "🤝", label: "Gia tăng quyền lợi" },
  { key: "legacy", icon: "🏛", label: "Kiến tạo di sản" },
];

const SHORTCUTS = [
  { icon: "📄", label: "Hợp đồng của tôi" },
  { icon: "🗓️", label: "Lịch đóng phí\n& thanh toán" },
  { icon: "🛡️", label: "Quyền lợi\ncủa tôi" },
  { icon: "❤️‍🩹", label: "Yêu cầu bồi thường\n& hỗ trợ" },
  { icon: "👤", label: "Cập nhật thông tin\ncá nhân" },
];

function HomeScreenBeforeProfile({ onNav, onOpenProfileCard }) {
  return (
    <div className="screen">
      <TopHeaderHome onNav={onNav} />
      <div className="scrollarea" style={{ padding: "4px 16px 24px" }}>
        {/* Hero Banner */}
        <div className="hero-banner" style={{ marginTop: 6 }}>
          <div className="hero-banner-bg">
            <AssetPlaceholder className="hero-media" assetKey="familyHero" icon="👨‍👩‍👧" label="Ảnh nền banner (gia đình)" note="Ảnh phủ toàn bộ banner, nằm phía sau chữ" height="100%" radius={24} />
          </div>
          <div className="hero-banner-content">
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
              Chào mừng đến với <span style={{ color: "var(--red)" }}>PRUTwin</span>
            </div>
            <div className="muted" style={{ marginBottom: 14, fontSize: 13.5 }}>
              Mọi thông tin bảo hiểm của bạn được quản lý tại đây.
            </div>
            <button className="pill-btn-outline-red" style={{ background: "var(--red)", color: "var(--white)", border: "none" }} onClick={() => onNav("prutwin")}>
              Khám phá ngay →
            </button>
          </div>
        </div>

        {/* Shortcuts */}
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "18px 2px 4px" }}>
          {SHORTCUTS.map((s, i) => (
            <div key={i} className="card" style={{ minWidth: 92, textAlign: "center", padding: "14px 10px" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, whiteSpace: "pre-line", lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category bar */}
        <div style={{
          display: "flex", background: "var(--red)", borderRadius: 20, padding: "12px 8px",
          justifyContent: "space-between", marginTop: 6
        }}>
          {CATEGORIES.map((c, i) => (
            <div key={c.key} style={{ textAlign: "center", flex: 1, opacity: i === 0 ? 1 : 0.85 }}>
              <div style={{ fontSize: 18 }}>{c.icon}</div>
              <div style={{ color: "var(--white)", fontSize: 9.5, fontWeight: 700, marginTop: 4, lineHeight: 1.25 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Giới thiệu về Prudential */}
        <div className="section-title-row" style={{ marginTop: 22 }}>
          <div className="section-title">Giới thiệu về Prudential</div>
          <div className="link-red">Xem thêm ›</div>
        </div>
        {[
          { t: "Tìm hiểu về Prudential", d: "Giới thiệu về tập đoàn Prudential, lịch sử và sứ mệnh đồng hành cùng người Việt." },
          { t: "PRUTwin – Công nghệ mới đồng hành cùng bạn", d: "Giới thiệu PRUTwin là nền tảng số hỗ trợ khách hàng quản lý bảo hiểm dễ dàng hơn." },
          { t: "Phát triển cộng đồng bền vững", d: "Các hoạt động trách nhiệm xã hội và phát triển bền vững của Prudential tại Việt Nam." },
        ].map((a, i) => (
          <div key={i} className="card article-card">
            <div className="article-thumb">
              <AssetPlaceholder className="article-thumb" assetKey={`articleImage${i + 1}`} icon="🖼️" label={`Ảnh bài viết ${i + 1}`} height={72} radius={12} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="article-title">{a.t}</div>
              <div className="muted article-desc">{a.d}</div>
              <div className="link-red" style={{ fontSize: 11.5 }}>Đọc thêm →</div>
            </div>
          </div>
        ))}

        {/* Góc kiến thức */}
        <div className="section-title-row" style={{ marginTop: 8 }}>
          <div className="section-title">Góc kiến thức</div>
          <div className="link-red">Xem tất cả ›</div>
        </div>
        <div className="knowledge-row">
          {["Làm việc hiệu quả", "Bảo hiểm nhân thọ là gì?", "Sử dụng PRUTwin hiệu quả"].map((t, i) => (
            <div key={i} className="card knowledge-card">
              <AssetPlaceholder className="knowledge-thumb" assetKey={`knowledgeImage${i + 1}`} icon="🖼️" label={`Ảnh kiến thức ${i + 1}`} height={96} radius={12} />
              <div className="knowledge-title">{t}</div>
              <div className="muted" style={{ fontSize: 10.5, marginTop: 4 }}>05-03-2026</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

/* =========================================================
   FRAME 2 — Hồ sơ PRUTwin (chưa tạo) + Điều chỉnh hồ sơ (chưa tạo)
   ========================================================= */
function ProfilePromptScreen({ title, onBack, onCreate }) {
  return (
    <div className="screen">
      <SimpleHeader title={title} onBack={onBack} />
      <div className="scrollarea" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 28px", textAlign: "center" }}>
        <AssetPlaceholder assetKey="prudentialLogo" icon="🏢" label="Logo Prudential" note="Logo chính thức Prudential" height={64} radius={12} />
        <div style={{ fontSize: 24, fontWeight: 800, marginTop: 22, lineHeight: 1.2 }}>
          Cùng tạo nhanh <span style={{ color: "var(--red)" }}>Hồ sơ PRUTwin</span>
        </div>
        <div style={{ fontStyle: "italic", color: "var(--gray-text)", marginTop: 10, fontSize: 14, lineHeight: 1.5 }}>
          "Thấu hiểu hôm nay. Bảo vệ trọn hành trình mai sau."
        </div>
        <button className="btn-primary" style={{ marginTop: 28 }} onClick={onCreate}>Tạo hồ sơ ngay</button>
        <div className="link-red" style={{ marginTop: 14, fontSize: 13 }}>Tìm hiểu thêm về PRUTwin</div>
      </div>
    </div>
  );
}
