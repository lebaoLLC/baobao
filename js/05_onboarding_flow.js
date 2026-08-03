/* =========================================================
   FILE: 05_onboarding_flow.js
   MAP VỚI: FRAME 1.1 → FRAME 6 (toàn bộ luồng TẠO HỒ SƠ PRUTWIN)

   Thứ tự trong luồng (đúng theo PDF):
   1. OnboardingWelcome  -> Frame 1.1: màn chào 'Cùng tạo nhanh Hồ sơ PRUTwin'
   2. ProgressBar        -> thanh tiến trình 6 bước dùng chung cho cả luồng
   3. OnboardingLayer1   -> Frame 1.2 / Layer 1: Thông tin cá nhân (auto-fill)
   4. OnboardingLayer2   -> Layer 2: Hồ sơ gia đình
   5. OnboardingLayer3   -> Layer 3: Mục tiêu tài chính
   6. OnboardingLayer4   -> Layer 4: Ưu tiên bảo vệ
   7. OnboardingComplete -> Frame 6: Màn hoàn tất (chuyển sang Chatbox AI)

   Data mẫu (auto-fill theo đúng PDF):
   - PERSONAL_INFO / PERSONAL_FIELDS -> dữ liệu NGUYỄN THỊ THANH TÂM
   - FAMILY_OPTIONS / GOAL_OPTIONS / PRIORITY_OPTIONS -> các list lựa chọn từng Layer

   SỬA GÌ Ở ĐÂY:
   - Đổi dữ liệu auto-fill mẫu -> sửa PERSONAL_INFO
   - Đổi các lựa chọn (radio) từng bước -> sửa *_OPTIONS tương ứng
   - Đổi thời gian hiệu ứng auto-fill/typing -> tìm setTimeout/delay trong từng Layer
   ========================================================= */

function OnboardingWelcome({ onStart, onBack }) {
  return (
    <div className="screen">
      <SimpleHeader title="Hồ sơ PRUTwin" onBack={onBack} />
      <div className="scrollarea" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 28px 40px", textAlign: "center" }}>
        <AssetPlaceholder assetKey="prudentialLogo" icon="🏢" label="Logo Prudential" note="Chỉ icon + chữ PRUDENTIAL, không kèm slogan" height={64} radius={12} />
        <div style={{ fontSize: 24, fontWeight: 800, marginTop: 26 }}>
          Cùng tạo nhanh <span style={{ color: "var(--red)" }}>Hồ sơ PRUTwin</span>
        </div>
        <div style={{ fontStyle: "italic", color: "var(--gray-text)", marginTop: 10, fontSize: 14 }}>
          "Thấu hiểu hôm nay. Bảo vệ trọn hành trình mai sau."
        </div>
      </div>
      <div style={{ padding: "0 24px 40px" }}>
        <button className="btn-primary" onClick={onStart}>Bắt đầu tạo →</button>
      </div>
    </div>
  );
}

function ProgressBar({ step, total = 6 }) {
  return (
    <div className="progress-row">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={"progress-seg" + (i < step ? " filled" : "")} />
      ))}
    </div>
  );
}

// Layer 1 — Thông tin cá nhân (auto fill)
const PERSONAL_INFO = {
  name: "NGUYỄN THỊ THANH TÂM",
  id: "012345678910",
  dob: "05/08/1990",
  gender: "Nữ",
  address: "279 Nguyễn Tri Phương, Diên Hồng, TP.HCM",
  phone: "0123456789",
  job: "Nhân viên văn phòng",
};
const PERSONAL_FIELDS = [
  ["name", "Họ và tên"], ["id", "CMND / CCCD"], ["dob", "Ngày sinh"],
  ["address", "Địa chỉ"], ["phone", "Số điện thoại"], ["job", "Nghề nghiệp hiện tại"],
];

function OnboardingLayer1({ onNext, onBack }) {
  const [filled, setFilled] = useState({});
  const [gender, setGender] = useState("");
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < PERSONAL_FIELDS.length) {
        const [key] = PERSONAL_FIELDS[i];
        setFilled(f => ({ ...f, [key]: PERSONAL_INFO[key] }));
        if (key === "gender" || i === 2) setGender(PERSONAL_INFO.gender);
        i++;
        setDoneCount(i);
      } else {
        clearInterval(timer);
      }
    }, 350);
    return () => clearInterval(timer);
  }, []);

  const allDone = doneCount >= PERSONAL_FIELDS.length;

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <ProgressBar step={1} />
      <div className="scrollarea" style={{ padding: "0 20px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>Thông tin cá nhân</div>
          <div className="muted" style={{ fontSize: 12.5 }}>AI sẽ giúp bạn tạo hồ sơ nhanh chóng</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <span className="input-label">Họ và tên</span>
            <input className="input-field" value={filled.name || ""} placeholder="Nhập họ và tên" readOnly />
          </div>
          <div>
            <span className="input-label">CMND / CCCD</span>
            <input className="input-field" value={filled.id || ""} placeholder="Nhập số CMND/CCCD" readOnly />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <span className="input-label">Ngày sinh</span>
              <input className="input-field" value={filled.dob || ""} placeholder="dd/mm/yyyy" readOnly />
            </div>
            <div style={{ flex: 1 }}>
              <span className="input-label">Giới tính</span>
              <div className="segmented">
                <div className={"seg-option" + (gender === "Nam" ? " selected" : "")}>Nam</div>
                <div className={"seg-option" + (gender === "Nữ" ? " selected" : "")}>{gender === "Nữ" ? "Nữ ✓" : "Nữ"}</div>
              </div>
            </div>
          </div>
          <div>
            <span className="input-label">Địa chỉ</span>
            <input className="input-field" value={filled.address || ""} placeholder="Nhập địa chỉ" readOnly />
          </div>
          <div>
            <span className="input-label">Số điện thoại</span>
            <input className="input-field" value={filled.phone || ""} placeholder="Nhập số điện thoại" readOnly />
          </div>
          <div>
            <span className="input-label">Nghề nghiệp hiện tại</span>
            <input className="input-field" value={filled.job || ""} placeholder="Nhập nghề nghiệp hiện tại" readOnly />
          </div>
        </div>
      </div>
      <div style={{ padding: "0 20px 24px" }}>
        <button className="btn-primary" disabled={!allDone} onClick={onNext}>Tiếp theo {allDone && "→"}</button>
      </div>
    </div>
  );
}

// Layer 2 — Hồ sơ gia đình
const FAMILY_OPTIONS = ["Độc thân", "Đã kết hôn", "Có con", "Đang chăm sóc bố mẹ", "Khác"];
function OnboardingLayer2({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState("");

  // AI tự động chọn đáp án gợi ý sau ~1s (giống hiệu ứng auto-fill ở Layer 1)
  useEffect(() => {
    const t = setTimeout(() => setSelected("Đã kết hôn"), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (selected === "Đã kết hôn") {
      const t = setTimeout(() => setDetail("Kết hôn được 2 năm, đang có em bé"), 700);
      return () => clearTimeout(t);
    }
  }, [selected]);

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <ProgressBar step={2} />
      <div className="scrollarea" style={{ padding: "0 20px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>Hồ sơ gia đình</div>
          <div className="muted" style={{ fontSize: 12.5 }}>AI sẽ giúp bạn hiểu rõ hơn để tư vấn phù hợp</div>
        </div>
        <div className="input-label" style={{ marginBottom: 10 }}>Hiện tại bạn đang ở giai đoạn nào của cuộc sống?</div>
        {FAMILY_OPTIONS.map(opt => (
          <div key={opt}>
            <div className={"radio-row" + (selected === opt ? " selected" : "")} onClick={() => setSelected(opt)}>
              <div className={"radio-dot" + (selected === opt ? " selected" : "")} />
              <div className="radio-text">{opt}</div>
            </div>
            {selected === opt && opt === "Đã kết hôn" && (
              <textarea className="radio-detail" rows={2} value={detail} readOnly placeholder="Nhập thông tin chi tiết (nếu có)" style={{ marginTop: -4, marginBottom: 10 }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: "0 20px 24px" }}>
        <button className="btn-primary" disabled={!selected} onClick={onNext}>Tiếp theo {selected && "→"}</button>
      </div>
    </div>
  );
}

// Layer 3 — Mục tiêu tài chính
const GOAL_OPTIONS = ["Bảo vệ gia đình", "Tích lũy dài hạn", "Chuẩn bị cho con", "Kế hoạch nghỉ hưu", "Đầu tư", "Chăm sóc sức khỏe", "Khác"];
function OnboardingLayer3({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState("");

  // AI tự động chọn đáp án gợi ý sau ~1s (giống hiệu ứng auto-fill ở Layer 1)
  useEffect(() => {
    const t = setTimeout(() => setSelected("Bảo vệ gia đình"), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (selected === "Bảo vệ gia đình") {
      const t = setTimeout(() => setDetail("Chuẩn bị cho gia đình lỡ may có sự kiện không may xảy ra"), 700);
      return () => clearTimeout(t);
    }
  }, [selected]);

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <ProgressBar step={3} />
      <div className="scrollarea" style={{ padding: "0 20px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>Mục tiêu tài chính</div>
          <div className="muted" style={{ fontSize: 12.5 }}>Điều gì quan trọng nhất với bạn ở thời điểm hiện tại?</div>
        </div>
        {GOAL_OPTIONS.map(opt => (
          <div key={opt}>
            <div className={"radio-row" + (selected === opt ? " selected" : "")} onClick={() => setSelected(opt)}>
              <div className={"radio-dot" + (selected === opt ? " selected" : "")} />
              <div className="radio-text">{opt}</div>
            </div>
            {selected === opt && opt === "Bảo vệ gia đình" && (
              <textarea className="radio-detail" rows={2} value={detail} readOnly style={{ marginTop: -4, marginBottom: 10 }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: "0 20px 24px" }}>
        <button className="btn-primary" disabled={!selected} onClick={onNext}>Tiếp theo {selected && "→"}</button>
      </div>
    </div>
  );
}

// Layer 4 — Ưu tiên bảo vệ (multi-select, AI auto suggest)
const PRIORITY_OPTIONS = ["Mất nguồn thu nhập", "Bệnh hiểm nghèo", "Tai nạn", "Tương lai của con cái", "Chi phí y tế", "Khác"];
function OnboardingLayer4({ onNext, onBack }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setSelected(["Mất nguồn thu nhập", "Bệnh hiểm nghèo", "Tai nạn", "Tương lai của con cái"]), 700);
    return () => clearTimeout(t);
  }, []);

  const toggle = (opt) => {
    setSelected(s => s.includes(opt) ? s.filter(x => x !== opt) : [...s, opt]);
  };

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <ProgressBar step={4} />
      <div className="scrollarea" style={{ padding: "0 20px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>Ưu tiên bảo vệ</div>
          <div className="muted" style={{ fontSize: 12.5 }}>Nếu một điều không mong muốn xảy ra, bạn lo lắng nhất về điều gì?</div>
        </div>
        {PRIORITY_OPTIONS.map(opt => (
          <div key={opt} className={"radio-row" + (selected.includes(opt) ? " selected" : "")} onClick={() => toggle(opt)}>
            <div className={"radio-dot" + (selected.includes(opt) ? " selected" : "")} />
            <div className="radio-text">{opt}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 20px 24px" }}>
        <button className="btn-primary" disabled={selected.length === 0} onClick={onNext}>Tiếp theo {selected.length > 0 && "→"}</button>
      </div>
    </div>
  );
}

function OnboardingComplete({ onFinish }) {
  return (
    <div className="screen">
      <ChatHeader onBack={() => {}} onHistory={() => {}} />
      <ProgressBar step={6} />
      <div className="scrollarea" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 28px", textAlign: "center" }}>
        <div style={{ width: 220, marginTop: 10 }}>
          <AssetPlaceholder
            assetKey="prutwinCharacterShield"
            icon="🛡️👤"
            label="Nhân vật PRUTwin trong khiên bảo vệ"
            note="Nhân vật minh hoạ + hiệu ứng khiên đỏ phát sáng phía sau (theo mô tả gốc)"
            height={260}
            radius={20}
          />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, marginTop: 22 }}>Chào mừng bạn!</div>
        <div className="muted" style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55 }}>
          21 ngày cân nhắc là khoảng thời gian để bạn hiểu rõ hợp đồng.<br />
          Hãy để tôi đồng hành, giúp bạn hiểu rõ hợp đồng và tự tin đưa ra quyết định.
        </div>
      </div>
      <div style={{ padding: "0 24px 32px" }}>
        <button className="btn-primary" onClick={onFinish}>Hoàn tất →</button>
      </div>
    </div>
  );
}
