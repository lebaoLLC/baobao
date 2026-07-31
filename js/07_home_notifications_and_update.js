/* =========================================================
   FILE: 07_home_notifications_and_update.js
   MAP VỚI: FRAME 3.1 — Trang chủ + Notification quyền lợi sức khỏe
            + FRAME 4.1 — Trang chủ PRUTwin (Cập nhật hồ sơ)
            + FRAME 4.2 — Cập nhật hồ sơ (Gia đình / Công việc / Tài chính...)
            + FRAME 4.3 — Hoàn tất cập nhật PRUTwin

   Chứa:
   - NotificationHomeScreen -> Trang chủ có banner nhắc quyền lợi sức khỏe chưa dùng
   - HomeAfterProfile       -> Trang chủ có Hero Card 'Cập nhật PRUTwin' + 200 điểm thưởng
   - UPDATE_OPTIONS         -> data 7 lựa chọn cập nhật hồ sơ (Gia đình, Công việc...)
   - UpdateProfileScreen    -> form chọn + nhập chi tiết để cập nhật hồ sơ
   - UpdateProfileComplete  -> màn cảm ơn sau khi cập nhật xong (gợi ý Bảo hiểm Mẹ và Bé)

   SỬA GÌ Ở ĐÂY:
   - Đổi nội dung notification nhắc quyền lợi -> sửa trong NotificationHomeScreen
   - Đổi số điểm thưởng / hạn cập nhật -> sửa trong HomeAfterProfile / UpdateProfileScreen
   - Đổi gợi ý sản phẩm sau khi cập nhật -> sửa trong UpdateProfileComplete
   ========================================================= */

function NotificationHomeScreen({ onBack, onNav, onGoProfile }) {
  const [dismissed, setDismissed] = useState(false);
  return (
    <div className="screen">
      <div className="header">
        <div>
          <div className="muted" style={{ fontSize: 12 }}>Chào mừng đến với</div>
          <div className="header-title"><span className="brand-pru">PRU</span><span className="brand-twin">Twin</span></div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="icon-btn">🔔</button>
          <button className="icon-btn">👤</button>
        </div>
      </div>
      <div className="scrollarea" style={{ padding: "0 16px 20px" }}>
        {!dismissed && (
          <div className="card" style={{ background: "var(--red-tint-05)", borderLeft: "4px solid var(--red)", marginBottom: 16, position: "relative" }}>
            <span onClick={() => setDismissed(true)} style={{ position: "absolute", top: 10, right: 12, cursor: "pointer", color: "var(--gray-text)" }}>✕</span>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🔔</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.4 }}>
                  Bạn còn 3 quyền lợi sức khỏe chưa sử dụng trong năm bảo hiểm hiện tại
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
                  Hãy đặt lịch khám hoặc sử dụng quyền lợi trước ngày 05/08 để tránh mất phần quyền lợi chưa sử dụng.
                </div>
                <button className="pill-btn-outline-red" style={{ marginTop: 10 }} onClick={onGoProfile}>Xem Hồ sơ →</button>
              </div>
            </div>
          </div>
        )}
        <div style={{ borderRadius: 24, padding: 20, background: "linear-gradient(135deg,var(--red-tint-05),var(--white) 70%)" }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Chào mừng đến với <span style={{ color: "var(--red)" }}>PRUTwin</span></div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>Mọi thông tin bảo hiểm của bạn được quản lý tại đây.</div>
          <button className="pill-btn-outline-red" style={{ background: "var(--red)", color: "var(--white)", border: "none", marginTop: 12 }}>Khám phá ngay →</button>
        </div>
      </div>
      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

/* =========================================================
   FRAME 4.1 — Trang chủ + Card cập nhật hồ sơ (sau khi đã có hồ sơ)
   ========================================================= */
function HomeAfterProfile({ onNav, onUpdateProfile, showUpdatePrompt = true }) {
  return (
    <div className="screen">
      <div className="header">
        <div className="header-title"><span className="brand-pru">PRU</span><span className="brand-twin">Twin</span></div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="icon-btn">🔔</button>
          <button className="icon-btn">👤</button>
        </div>
      </div>
      <div className="scrollarea" style={{ padding: "0 16px 24px" }}>
        {showUpdatePrompt && (
          <div className="card" style={{ borderLeft: "5px solid var(--red)", marginTop: 4 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 18 }}>✏️</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.4 }}>Gần đây, cuộc sống bạn có sự kiện gì mới không?</div>
                <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>Cập nhật để PRUTwin hiểu bạn hơn, đồng hành cùng bạn tốt hơn.</div>
                <div style={{ background: "var(--red-tint-05)", color: "var(--red)", display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 999, padding: "6px 12px", marginTop: 10, fontSize: 12 }}>
                  🎁 Cập nhật để có thêm <b>200 điểm thưởng</b>
                </div>
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: 14 }} onClick={onUpdateProfile}>Cập nhật PRUTwin →</button>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "18px 2px 4px" }}>
          {SHORTCUTS.map((s, i) => (
            <div key={i} className="card" style={{ minWidth: 92, textAlign: "center", padding: "14px 10px" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, whiteSpace: "pre-line", lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", background: "var(--red)", borderRadius: 20, padding: "12px 8px", justifyContent: "space-between", marginTop: 16 }}>
          {CATEGORIES.map((c, i) => (
            <div key={c.key} style={{ textAlign: "center", flex: 1, opacity: i === 0 ? 1 : 0.85 }}>
              <div style={{ fontSize: 18 }}>{c.icon}</div>
              <div style={{ color: "var(--white)", fontSize: 9.5, fontWeight: 700, marginTop: 4, lineHeight: 1.25 }}>{c.label}</div>
            </div>
          ))}
        </div>

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
   FRAME 4.2 — CẬP NHẬT HỒ SƠ
   ========================================================= */
const UPDATE_OPTIONS = ["Gia đình", "Công việc", "Tài chính", "Sức khỏe", "Nơi ở", "Mục tiêu tương lai", "Khác"];
function UpdateProfileScreen({ onBack, onNext }) {
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState("");

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <div className="scrollarea" style={{ padding: "0 20px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>Cập nhật hồ sơ</div>
          <div className="muted" style={{ fontSize: 12.5 }}>Có điều gì mới trong cuộc sống của bạn?</div>
        </div>
        <div style={{ background: "var(--red-tint-05)", borderRadius: 14, padding: "10px 14px", fontSize: 12.5, margin: "14px 0", display: "flex", alignItems: "center", gap: 8 }}>
          🎁 Cập nhật ngay để nhận <b style={{ color: "var(--red)" }}>200 điểm PRU Rewards</b>
        </div>
        {UPDATE_OPTIONS.map(opt => (
          <div key={opt}>
            <div className={"radio-row" + (selected === opt ? " selected" : "")} onClick={() => setSelected(opt)}>
              <div className={"radio-dot" + (selected === opt ? " selected" : "")} />
              <div className="radio-text">{opt}</div>
            </div>
            {selected === opt && (
              <textarea
                className="radio-detail"
                rows={2}
                placeholder="Nhập thông tin chi tiết (nếu có)"
                value={detail}
                onChange={e => setDetail(e.target.value)}
                style={{ marginTop: -4, marginBottom: 10 }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: "0 20px 24px" }}>
        <button className="btn-primary" disabled={!selected} onClick={onNext}>Tiếp theo</button>
      </div>
    </div>
  );
}

function UpdateProfileComplete({ onBack, onSeeMoreBenefits }) {
  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <div className="scrollarea" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 28px", textAlign: "center" }}>
        <div style={{ width: 200, marginTop: 6 }}>
          <AssetPlaceholder assetKey="familyShieldCharacter" icon="🛡️🤱" label="Nhân vật ôm em bé trong khiên bảo vệ" note="Character mới, thể hiện chăm sóc gia đình" height={240} radius={20} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, marginTop: 20 }}>Cảm ơn bạn đã cập nhật <span style={{ color: "var(--red)" }}>PRUTwin</span></div>
        <div className="muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5 }}>
          Hồ sơ mới sẽ được hoàn tất xác minh và đồng bộ trong <span style={{ color: "var(--red)", fontWeight: 700 }}>2–3 ngày</span> tới.
        </div>

        <div style={{ width: "100%", marginTop: 22, textAlign: "left" }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>✨ Có thể bạn sẽ quan tâm</div>
          <div className="card-border" onClick={onSeeMoreBenefits} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ color: "var(--red)", fontWeight: 700, fontSize: 13.5 }}>Bảo hiểm Mẹ và Bé</span>
            <span style={{ color: "var(--red)" }}>›</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 24px 32px" }}>
        <button className="btn-secondary-outline" onClick={onBack}>🏠 Quay về</button>
      </div>
    </div>
  );
}
