/* =========================================================
   FILE: 02_login.js
   MAP VỚI: STEP 0 — ĐĂNG NHẬP (trang 1-2 PDF)

   Chứa:
   - LoginScreen -> màn hình đăng nhập (logo, tên đăng nhập, mật khẩu, nút Đăng nhập)

   Ghi chú theo PDF:
   - Tài khoản demo: ILOVEAIM / metronconvuong (auto-fill theo yêu cầu PDF)
   - Bấm 'Đăng nhập' -> chuyển sang Trang chủ qua router (09_app_router.js)

   SỬA GÌ Ở ĐÂY:
   - Đổi placeholder / label ô nhập -> sửa trong LoginScreen
   - Đổi logic validate nút Đăng nhập (hiện đang luôn enable vì là prototype)
   ========================================================= */

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setUsername("ILOVEAIM");
      setPassword("metronconvuong");
      setAutoFilled(true);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const canSubmit = username.length > 0 && password.length > 0;

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => onLogin(), 700);
  };

  return (
    <div className="screen">
      <div className="scrollarea" style={{ display: "flex", flexDirection: "column", padding: "48px 24px 24px", alignItems: "center" }}>
        <AssetPlaceholder
          assetKey="prudentialLogo"
          icon="🏢"
          label="Logo Prudential"
          note="Thay bằng logo chính thức Prudential (SVG/PNG, nền trong suốt)"
          height={70}
          radius={12}
        />
        <div className="login-brand-copy">
          <div className="login-brand-title">Cổng thông tin dành cho khách hàng</div>
          <div className="login-brand-subtitle">Prudential Việt Nam</div>
          <div className="login-brand-divider" />
        </div>

        <div style={{ width: "100%", marginTop: 36, display: "flex", flexDirection: "column", gap: 14 }}>
          <input className="input-field" placeholder="Tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} />
          <div style={{ position: "relative" }}>
            <input className="input-field" placeholder="Mật khẩu" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 44 }} />
            <span onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 16 }}>{showPw ? "🙈" : "👁️"}</span>
          </div>
        </div>

        <div style={{ width: "100%", display: "flex", gap: 10, marginTop: 22 }}>
          <button className="btn-primary" disabled={!canSubmit || loading} onClick={handleLogin} style={{ flex: 1 }}>
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
          <button className="icon-btn" style={{ width: 52, height: 52, background: "var(--gray-bg)", fontSize: 20 }} title="Đăng nhập bằng vân tay / Face ID">
            <AssetIcon assetKey="loginBiometricIcon" fallback="🖐️" label="Đăng nhập bằng vân tay / Face ID" size={24} />
          </button>
        </div>

        <div style={{ marginTop: 18, textAlign: "center", fontSize: 13 }}>
          <div style={{ color: "var(--red)", fontWeight: 600, marginBottom: 6, cursor: "pointer" }}>Quên mật khẩu hay Tên đăng nhập?</div>
          <div style={{ color: "var(--red)", fontWeight: 600, cursor: "pointer" }}>Kích hoạt tài khoản</div>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 60, textAlign: "center", fontSize: 12.5, color: "var(--gray-text)" }}>
          <div style={{ marginBottom: 8 }}>📞 Tổng đài 1800 1 247</div>
          <div style={{ textDecoration: "underline", marginBottom: 4 }}>Điều khoản và điều kiện</div>
          <div style={{ textDecoration: "underline" }}>Chính sách bảo mật thông tin</div>
        </div>
      </div>
    </div>
  );
}
