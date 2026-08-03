/* =========================================================
   FILE: 01_shared_components.js
   DÙNG CHUNG CHO TOÀN APP — không map riêng 1 Frame nào

   Chứa:
   - AssetPlaceholder   -> khung ảnh/video placeholder (thay bằng ảnh thật)
   - TopHeaderHome      -> header dùng ở màn Trang chủ (menu + notification)
   - ChatHeader         -> header dùng trong các màn Chatbox AI (back + PRUTWin + history)
   - SimpleHeader       -> header dùng ở các màn phụ (back + tiêu đề)
   - BottomNav          -> thanh điều hướng dưới cùng (5 tab)

   SỬA GÌ Ở ĐÂY:
   - Đổi icon, label của bottom nav -> sửa mảng items trong BottomNav
   - Đổi logo/tiêu đề header -> sửa TopHeaderHome / ChatHeader / SimpleHeader
   - Các placeholder ảnh (khung caro xám) -> thay bằng thẻ <img src=... />
   ========================================================= */

function AssetPlaceholder({ icon = "🖼️", label, note, height = 140, radius, assetKey, asset, className = "", style }) {
  const media = asset || (assetKey && typeof CUSTOM_ASSETS !== "undefined" ? CUSTOM_ASSETS[assetKey] : null);
  const [failed, setFailed] = useState(false);

  if (media && media.src && !failed) {
    // Nếu asset có khai báo aspectRatio (VD: ảnh infographic dạng dọc),
    // dùng aspect-ratio để khung tự co theo đúng tỉ lệ ảnh thật thay vì
    // ép vào chiều cao cố định (height) gây méo/cắt ảnh.
    const sizeStyle = media.aspectRatio
      ? { width: "100%", height: "auto", aspectRatio: media.aspectRatio }
      : { width: "100%", height };

    const mediaStyle = {
      ...sizeStyle,
      display: "block",
      objectFit: media.fit || "cover",
      borderRadius: radius,
      ...style,
    };

    if (media.type === "video") {
      return (
        <video
          className={"asset-media" + (className ? ` ${className}` : "")}
          src={media.src}
          poster={media.poster}
          controls={media.controls !== false}
          muted={media.muted}
          loop={media.loop}
          playsInline
          style={{ ...sizeStyle, borderRadius: radius, ...style }}
          onError={() => setFailed(true)}
        >
          {media.alt || label}
        </video>
      );
    }

    return (
      <img
        className={"asset-media" + (className ? ` ${className}` : "")}
        src={media.src}
        alt={media.alt || label || ""}
        style={mediaStyle}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={"asset-placeholder" + (className ? ` ${className}` : "")} style={{ height, borderRadius: radius, ...style }}>
      <div className="ap-icon">{icon}</div>
      <div className="ap-label">{label}</div>
      {assetKey && typeof CUSTOM_ASSETS !== "undefined" && CUSTOM_ASSETS[assetKey] && (
        <div className="ap-file">assets/custom/{CUSTOM_ASSETS[assetKey].src.split("/").pop()}</div>
      )}
      {note && <div className="ap-note">{note}</div>}
    </div>
  );
}

function AssetIcon({ assetKey, fallback = "🖼️", label = "", size = 24 }) {
  const media = assetKey && typeof CUSTOM_ASSETS !== "undefined" ? CUSTOM_ASSETS[assetKey] : null;
  const [failed, setFailed] = useState(false);

  if (media && media.src && !failed) {
    return (
      <img
        src={media.src}
        alt={media.alt || label}
        title={label}
        style={{ width: size, height: size, objectFit: media.fit || "contain", display: "block" }}
        onError={() => setFailed(true)}
      />
    );
  }

  return <span title={label} style={{ fontSize: size * 0.82, lineHeight: 1 }}>{fallback}</span>;
}

/* =========================================================
   HEADER COMPONENTS
   ========================================================= */
function TopHeaderHome({ onNav }) {
  return (
    <div className="header">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="header-title">
          <span className="brand-pru">PRU</span><span className="brand-twin">Twin</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="icon-btn" onClick={() => onNav("notifications")}>🔔</button>
        <button className="icon-btn" onClick={() => onNav("more")}>👤</button>
      </div>
    </div>
  );
}

function ChatHeader({ title = "PRUTWin", onBack, onHistory }) {
  return (
    <div className="header">
      <button className="back-btn" onClick={onBack}>‹</button>
      <div className="header-title">
        <span className="brand-pru">PRUT</span><span className="brand-twin">Win</span>
      </div>
      <button className="icon-btn" onClick={onHistory}>📖</button>
    </div>
  );
}

function SimpleHeader({ title, onBack }) {
  return (
    <div className="header" style={{ justifyContent: "flex-start", gap: 12 }}>
      <button className="back-btn" onClick={onBack}>‹</button>
      <div className="header-title" style={{ flex: 1, textAlign: "center", marginRight: 36 }}>{title}</div>
    </div>
  );
}

/* =========================================================
   BOTTOM NAVIGATION
   ========================================================= */
function BottomNav({ active, onNav }) {
  const items = [
    { key: "home", icon: "🏠", label: "Trang chủ" },
    { key: "profile", icon: "👤", label: "Hồ sơ" },
    { key: "prutwin", icon: "🤖", label: "PRUTwin", fab: true },
    { key: "adjust", icon: "⚙️", label: "Điều chỉnh" },
    { key: "more", icon: "☰", label: "Thêm" },
  ];
  return (
    <div className="bottom-nav">
      {items.map(it => (
        <div key={it.key} className={"nav-item" + (active === it.key ? " active" : "")} onClick={() => onNav(it.key)}>
          <div className="nav-icon-slot">
            {it.fab ? <div className="nav-fab">{it.icon}</div> : <div className="nav-icon">{it.icon}</div>}
          </div>
          <div>{it.label}</div>
        </div>
      ))}
    </div>
  );
}
