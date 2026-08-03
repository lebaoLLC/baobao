/* =========================================================
   FILE: 08_chat_ai_flow.js
   MAP VỚI: FRAME 2.1 → FRAME 4 (toàn bộ luồng CHATBOX AI PRUTWIN)

   Thứ tự trong luồng:
   1. ChatWelcome          -> Frame 2.1: trang chủ chatbox (nhân vật + 3 quick action)
   2. TypingBubble         -> hiệu ứng '...' khi AI đang trả lời (dùng chung)
   3. ChatExplainBenefits  -> Frame 2.2: Giải thích Quyền lợi (video + tóm tắt)
   4. ChatQA               -> Frame 3: Giải đáp Thắc mắc (nội dung text: trích dẫn điều khoản + so sánh 2 kế hoạch)
   5. ChatSimulation       -> Frame 4: Mô phỏng Tình huống (infographic ước tính quyền lợi)
                              + nối tiếp NGAY trong cùng luồng chat: Frame 5 — Question Card
                              xác nhận đã hiểu quyền lợi (trước khi hợp đồng chính thức
                              có hiệu lực, cuối 21 ngày cân nhắc / Free-Look Period)
   6. ChatContractActive   -> Frame 6: Hợp đồng chính thức có hiệu lực (sau 21 ngày) —
                              màn hình cuối cùng của Customer Journey, gồm Congratulations
                              message + Contract Status Card + PRUTWin Companion message

   SỬA GÌ Ở ĐÂY:
   - Đổi câu hỏi mẫu / câu trả lời AI mẫu -> sửa trực tiếp trong JSX từng component
   - Đổi số liệu mô phỏng (620tr / 870tr VNĐ...) -> sửa trong ChatSimulation
   - Đổi các nút gợi ý nhanh (pill-btn) dưới ô chat -> sửa suggested-row trong từng màn
   - Đổi tốc độ hiệu ứng typing/reveal từng block -> tìm setTimeout trong từng component
   - Đổi 4 lựa chọn xác nhận hiểu quyền lợi (Frame 5) -> sửa mảng CONFIRM_OPTIONS
   - Đổi số liệu hợp đồng ở Status Card (Frame 6) -> sửa trong ChatContractActive
   ========================================================= */

function ChatWelcome({ onBack, onSelect }) {
  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <div className="scrollarea" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 22px 20px", textAlign: "center" }}>
        <div style={{ width: 200 }}>
          <AssetPlaceholder assetKey="chatWelcomeCharacter" icon="🛡️👩‍💼" label="Nhân vật PRUTwin trong khiên đỏ" note="Nữ chuyên viên Prudential, vest đen, khoanh tay, khiên đỏ phát sáng phía sau" height={240} radius={20} />
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, marginTop: 18 }}>
          Xin chào, tôi là <span style={{ color: "var(--red)" }}>PRUTwin</span> của bạn
        </div>
        <div className="muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55 }}>
          Tôi ở đây để giúp bạn hiểu rõ hợp đồng, quyền lợi và đồng hành cùng bạn trong mọi bước quan trọng.
        </div>

        <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 20 }}>
          {[
            { icon: "🛡️", color: "var(--red-tint-05)", label: "Giải thích\nQuyền lợi", key: "explain" },
            { icon: "💬", color: "var(--gray-bg)", label: "Giải đáp\nThắc mắc", key: "qa" },
            { icon: "🧪", color: "var(--red-tint-10)", label: "Mô phỏng\nTình huống", key: "sim" },
          ].map(b => (
            <div key={b.key} className="card" style={{ flex: 1, textAlign: "center", cursor: "pointer", padding: "16px 8px" }} onClick={() => onSelect(b.key)}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: b.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontSize: 18 }}>{b.icon}</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, whiteSpace: "pre-line" }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer">
        <div className="chat-input-bar">
          <span style={{ fontSize: 18, cursor: "pointer" }}>+</span>
          <input placeholder="Nhắn tin cho PRUTwin…" />
          <div className="icon-round">🎤</div>
          <div className="icon-round mic-active">🔊</div>
        </div>
        <div className="muted" style={{ fontSize: 10, textAlign: "center", marginTop: 8 }}>
          ⓘ PRUTwin có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng.
        </div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="msg-row">
      <div className="avatar-mini">🤖</div>
      <div className="bubble ai">
        <span style={{ display: "inline-flex", gap: 4 }}>
          <span>●</span><span>●</span><span>●</span>
        </span>
      </div>
    </div>
  );
}

function ChatExplainBenefits({ onBack, onGoQA }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 900),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2200),
      setTimeout(() => setStage(4), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <div className="scrollarea">
        <div className="chat-body">
          <div className="msg-row user">
            <div>
              <div className="bubble user">Giải thích quyền lợi</div>
              <div className="timestamp" style={{ textAlign: "right" }}>09:41 ✓✓</div>
            </div>
          </div>

          {stage >= 1 && (
            <div className="msg-row fade-in">
              <div className="avatar-mini">🤖</div>
              <div className="bubble ai">
                Chắc chắn rồi! Mình sẽ giúp bạn hiểu các quyền lợi trong hợp đồng bảo hiểm một cách đơn giản và dễ hiểu. Trước tiên, hãy xem video tổng quan dưới đây.
              </div>
            </div>
          )}

          {stage >= 2 && (
            <div className="fade-in" style={{ marginLeft: 38 }}>
              <AssetPlaceholder
                assetKey="benefitsVideo"
                icon="▶️"
                label="Video: Hiểu nhanh quyền lợi bảo hiểm trong 3 phút"
                note="Thumbnail 16:9 + nút Play + thời lượng 02:45 (thay bằng video thật)"
                height={170}
                radius={16}
              />
            </div>
          )}

          {stage >= 3 && (
            <div className="msg-row fade-in">
              <div className="avatar-mini">🤖</div>
              <div className="bubble ai">
                Trong video trên, bạn sẽ hiểu cách các quyền lợi bảo hiểm được áp dụng trong những tình huống phổ biến như nằm viện, phẫu thuật hoặc mắc bệnh nghiêm trọng.
                <div style={{ marginTop: 8 }}>
                  • Quyền lợi bảo vệ cơ bản và mở rộng<br />
                  • Quyền lợi chăm sóc sức khỏe<br />
                  • Điều kiện áp dụng quyền lợi<br />
                  • Các trường hợp loại trừ
                </div>
              </div>
            </div>
          )}

          {stage >= 4 && (
            <div className="fade-in">
              <div className="msg-row">
                <div className="avatar-mini">🤖</div>
                <div className="bubble ai">Bạn còn điều gì cần mình giải đáp không? Mình luôn sẵn sàng hỗ trợ bạn.</div>
              </div>
              <div style={{ marginLeft: 38, marginTop: 8 }}>
                <button className="pill-btn-outline-red" onClick={onGoQA}>💬 Giải đáp thắc mắc</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-footer">
        <div className="suggested-row">
          <div className="pill-btn">🖼️ Tạo ảnh</div>
          <div className="pill-btn">❓ Tạo quiz</div>
          <div className="pill-btn">💬 Giải đáp thêm</div>
        </div>
        <div className="chat-input-bar">
          <span style={{ fontSize: 18 }}>+</span>
          <input placeholder="Hỏi PRUTWin bất kỳ điều gì…" />
          <div className="icon-round">🎤</div>
          <div className="icon-round mic-active">🔊</div>
        </div>
      </div>
    </div>
  );
}

function ChatQA({ onBack, onGoSim }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <div className="scrollarea">
        <div className="chat-body">
          <div className="msg-row user"><div className="bubble user">Giải đáp thắc mắc</div></div>
          {stage >= 1 && (
            <div className="msg-row fade-in">
              <div className="avatar-mini">🤖</div>
              <div className="bubble ai">Chắc chắn rồi! Bạn cần giải đáp vấn đề gì? Hãy nhắn cho tôi, tôi sẽ giúp bạn.</div>
            </div>
          )}
          <div className="msg-row user">
            <div className="bubble user">
              Nếu chẳng may tôi bị "thương tật toàn bộ và vĩnh viễn" thì Prudential sẽ tính tiền "chi trả" cho tôi như thế nào? Kế hoạch Cơ bản và Kế hoạch Nâng cao khác nhau ở điểm nào?
            </div>
          </div>

          {stage >= 2 && (
            <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="msg-row">
                <div className="avatar-mini">🤖</div>
                <div className="bubble ai">
                  Đây là một câu hỏi rất phổ biến, vì nhiều khách hàng thường nhầm rằng bảo hiểm sẽ chi trả lại số tiền mình đã đóng.
                </div>
              </div>

              <div style={{ marginLeft: 38, background: "var(--gray-bg)", borderRadius: 14, padding: "12px 14px", fontSize: 12.5, lineHeight: 1.6, display: "flex", gap: 8 }}>
                <span>ℹ️</span>
                <span>
                  Thực tế, theo <b>Điều 1.2.2</b> của hợp đồng <b>PRU Bảo Vệ Tối Đa 2.0</b>, nếu hợp đồng của bạn vẫn còn hiệu lực, bạn được xác nhận bị <b>Thương tật Toàn bộ và Vĩnh viễn (TTTBVV)</b> không do ung thư tuyến giáp giai đoạn sớm và không thuộc các trường hợp loại trừ tại Điều 2.2, Prudential sẽ chi trả quyền lợi theo kế hoạch bảo hiểm mà bạn đã lựa chọn.
                </span>
              </div>

              <div className="msg-row">
                <div className="avatar-mini">🤖</div>
                <div className="bubble ai">Điểm khác nhau nằm ở cách tính quyền lợi.</div>
              </div>

              <div style={{ marginLeft: 38, display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="card-border" style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 800, fontSize: 13.5, color: "var(--red)" }}>🛡️ Kế hoạch Cơ bản</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.6, marginTop: 6 }}>
                    Prudential sẽ so sánh giữa <b>Số tiền bảo hiểm</b> và <b>Giá trị tài khoản cơ bản</b>, sau đó chi trả khoản có giá trị cao hơn, đồng thời cộng thêm <b>Giá trị tài khoản đóng thêm</b> nếu bạn có tham gia.
                  </div>
                </div>

                <div className="card-border" style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 800, fontSize: 13.5, color: "#1a9b5a" }}>✅ Kế hoạch Nâng cao</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.6, marginTop: 6 }}>
                    Prudential sẽ không cần so sánh. Thay vào đó, công ty sẽ chi trả <b>100%</b> Số tiền bảo hiểm, cộng với Giá trị tài khoản cơ bản, và cộng thêm Giá trị tài khoản đóng thêm nếu có.
                  </div>
                </div>
              </div>

              <div style={{ marginLeft: 38, background: "var(--red-tint-05)", borderRadius: 14, padding: "12px 14px", fontSize: 12.5, lineHeight: 1.6, display: "flex", gap: 8 }}>
                <span>💡</span>
                <span>
                  Vì vậy, trong cùng một thời điểm và với cùng giá trị tài khoản, <b>Kế hoạch Nâng cao</b> thường mang lại mức quyền lợi chi trả cao hơn, do được cộng cả hai khoản thay vì chỉ nhận khoản có giá trị lớn hơn.
                </span>
              </div>

              <div style={{ marginLeft: 38 }}>
                <button className="pill-btn-outline-red" onClick={onGoSim}>🧪 Mô phỏng tình huống</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-footer">
        <div className="suggested-row">
          <div className="pill-btn">🎗️ Tôi bị ung thư</div>
          <div className="pill-btn">🚑 Tôi bị tai nạn</div>
          <div className="pill-btn">▶️ Tạo dạng Video</div>
          <div className="pill-btn">🖼️ Tạo dạng ảnh</div>
        </div>
        <div className="chat-input-bar">
          <span style={{ fontSize: 18 }}>+</span>
          <input placeholder="Hỏi PRUTWin bất kỳ điều gì…" />
          <div className="icon-round">🎤</div>
          <div className="icon-round mic-active">🔊</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FRAME 5 — Question Card xác nhận đã hiểu quyền lợi
   (nối tiếp NGAY trong luồng chat sau khi mô phỏng tình huống xong)

   4 lựa chọn theo PDF. Trong prototype chỉ Option 1 có luồng xử lý:
   - Radio chuyển Active, hàng highlight đỏ, border đỏ, animation nhẹ.
   - Sau đó xuất hiện User Bubble "Có, tôi đã hiểu rõ hơn." bên phải.
   - Sau 0.5-1s, AI gửi tin nhắn xác nhận cảm ơn.
   - Cuối cùng hiện nút để đi tiếp sang Frame 6 (hợp đồng chính thức có hiệu lực).
   Option 2/3/4 chỉ hiển thị ở trạng thái mặc định, chưa xử lý (đúng PDF).
   ========================================================= */
const CONFIRM_OPTIONS = [
  "Có, tôi đã hiểu rõ hơn.",
  "Tôi vẫn còn một số thắc mắc.",
  "Tôi muốn trao đổi với tư vấn viên.",
  "Tôi muốn yêu cầu hủy hợp đồng.",
];

function ConfirmUnderstandingCard({ onConfirmed }) {
  const [selected, setSelected] = useState(null);
  const [confirmedStage, setConfirmedStage] = useState(0); // 0: chưa xác nhận, 1: đã xác nhận Option 1 (bubble user), 2: AI đã phản hồi
  // Card chỉ khóa (không cho đổi lựa chọn nữa) SAU KHI Option 1 đã được xác nhận
  // (confirmedStage >= 1). Trước đó, user có thể tự do bấm đổi qua lại giữa 4 option
  // — kể cả đã lỡ bấm Option 2/3/4 (chưa có luồng xử lý riêng) thì vẫn bấm được Option 1
  // hoặc option khác bất cứ lúc nào.
  const locked = confirmedStage >= 1;

  const handleSelect = (opt) => {
    if (locked) return;
    setSelected(opt);
    if (opt === CONFIRM_OPTIONS[0]) {
      setTimeout(() => setConfirmedStage(1), 200);
      setTimeout(() => setConfirmedStage(2), 900);
    }
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ marginLeft: 38, background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 16, padding: "14px" }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 10, lineHeight: 1.4 }}>
          Bạn đã cảm thấy tự tin hơn về hợp đồng bảo hiểm của mình chưa?
        </div>
        {CONFIRM_OPTIONS.map(opt => (
          <div
            key={opt}
            className={"radio-row" + (selected === opt ? " selected" : "")}
            style={{ transition: "all .18s ease", cursor: locked ? "default" : "pointer" }}
            onClick={() => handleSelect(opt)}
          >
            <div className={"radio-dot" + (selected === opt ? " selected" : "")} />
            <div className="radio-text">
              {opt}
              {selected === opt && confirmedStage >= 1 && <span style={{ marginLeft: 6, fontSize: 11, color: "var(--gray-text)" }}>09:50 ✓✓</span>}
            </div>
          </div>
        ))}
      </div>

      {confirmedStage >= 1 && (
        <div className="msg-row user fade-in">
          <div>
            <div className="bubble user">Có, tôi đã hiểu rõ hơn.</div>
          </div>
        </div>
      )}

      {confirmedStage >= 2 && (
        <div className="fade-in">
          <div className="msg-row">
            <div className="avatar-mini">🤖</div>
            <div className="bubble ai">
              Cảm ơn bạn đã tin tưởng Prudential và PRUTWin.
              <div style={{ marginTop: 8 }}>
                Mình sẽ luôn đồng hành cùng bạn trong suốt hành trình bảo vệ phía trước. Nếu có bất kỳ thắc mắc nào, chỉ cần quay lại trò chuyện với mình bất cứ lúc nào. ❤️
              </div>
            </div>
          </div>
          <div style={{ marginLeft: 38, marginTop: 8 }}>
            <button className="pill-btn-outline-red" onClick={onConfirmed}>Xem hợp đồng của tôi →</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatSimulation({ onBack, onContractActive }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 700),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2400), // Frame 5: Question Card xác nhận hiểu quyền lợi
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <div className="scrollarea">
        <div className="chat-body">
          <div className="msg-row user"><div className="bubble user">Mô phỏng tình huống</div></div>

          {stage >= 1 && (
            <div className="msg-row fade-in">
              <div className="avatar-mini">🤖</div>
              <div className="bubble ai">Đây là mô phỏng quyền lợi dựa trên hợp đồng của bạn để giúp bạn hình dung cách bảo hiểm sẽ chi trả trong tình huống này.</div>
            </div>
          )}

          {stage >= 2 && (
            <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ marginLeft: 38 }}>
                <AssetPlaceholder
                  className="chat-large-asset"
                  assetKey="simulationBenefitsCard"
                  icon="🖼️"
                  label="Ảnh mô phỏng quyền lợi bảo hiểm"
                  note="Thay toàn bộ infographic mô phỏng bằng một ảnh lớn"
                  height={520}
                  radius={16}
                />
              </div>

              <div className="msg-row">
                <div className="avatar-mini">🤖</div>
                <div className="bubble ai">Hy vọng tình huống này giúp bạn hiểu rõ hơn về quyền lợi của mình. Nếu muốn, tôi có thể mô phỏng thêm một tình huống khác.</div>
              </div>
            </div>
          )}

          {stage >= 3 && (
            <div className="fade-in">
              <div className="msg-row">
                <div className="avatar-mini">🤖</div>
                <div className="bubble ai">
                  Hy vọng phần mô phỏng trên đã giúp bạn hiểu rõ hơn về quyền lợi bảo hiểm của mình.
                  <div style={{ marginTop: 8 }}>
                    Để đảm bảo bạn đã nắm rõ thông tin trước khi hợp đồng chính thức có hiệu lực sau 21 ngày, PRUTWin muốn xác nhận một lần nữa về mức độ hiểu của bạn.
                  </div>
                </div>
              </div>
              <ConfirmUnderstandingCard onConfirmed={onContractActive} />
            </div>
          )}
        </div>
      </div>
      <div className="chat-footer">
        <div className="suggested-row">
          <div className="pill-btn">❓ Tạo dạng Quiz</div>
          <div className="pill-btn">▶️ Tạo dạng Video</div>
          <div className="pill-btn">💬 Cần giải đáp thêm</div>
        </div>
        <div className="chat-input-bar">
          <span style={{ fontSize: 18 }}>+</span>
          <input placeholder="Hỏi PRUTWin bất kỳ điều gì…" />
          <div className="icon-round">🎤</div>
          <div className="icon-round mic-active">🔊</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FRAME 6 — Hợp đồng chính thức có hiệu lực (sau 21 ngày)
   Màn hình cuối cùng của Customer Journey.
   Gồm: Congratulations message -> Contract Status Card -> Companion message
   Không có bước điều hướng tiếp theo, chỉ giữ lại Suggested Prompts.

   SỬA GÌ Ở ĐÂY:
   - Đổi ngày bắt đầu bảo vệ / ngày đóng phí / số hợp đồng -> sửa mảng contractInfo
   - Đổi danh sách khả năng hỗ trợ của PRUTwin -> sửa mảng companionCapabilities
   ========================================================= */
function ChatContractActive({ onBack }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const timers = [setTimeout(() => setStage(1), 500), setTimeout(() => setStage(2), 1300)];
    return () => timers.forEach(clearTimeout);
  }, []);

  const contractInfo = [
    ["Ngày bắt đầu bảo vệ", "05/08/2026"],
    ["Ngày đóng phí tiếp theo", "05/08/2027"],
    ["Số hợp đồng", "1234"],
  ];
  const companionCapabilities = [
    "Nhắc lịch đóng phí",
    "Giải thích quyền lợi",
    "Mô phỏng quyền lợi",
    "Hỗ trợ yêu cầu bồi thường",
    "Cập nhật thông tin hợp đồng",
  ];

  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <div className="scrollarea">
        <div className="chat-body">
          {/* Block 1 — Congratulations Message */}
          <div className="msg-row fade-in">
            <div className="avatar-mini">🤖</div>
            <div className="bubble ai">
              <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 6 }}>🎉 Chúc mừng!</div>
              <div style={{ fontWeight: 700 }}>Hợp đồng của bạn hiện đã chính thức có hiệu lực đầy đủ.</div>
              <div style={{ marginTop: 8 }}>
                Sau 21 ngày cân nhắc, bạn đã bước sang giai đoạn được Prudential bảo vệ theo toàn bộ quyền lợi của hợp đồng.
              </div>
              <div style={{ marginTop: 8 }}>
                Bạn không còn trong thời gian cân nhắc miễn phí, vì vậy mọi thay đổi hoặc chấm dứt hợp đồng sẽ được thực hiện theo các điều khoản của hợp đồng bảo hiểm.
              </div>
            </div>
          </div>

          {/* Block 2 — Contract Status Card */}
          {stage >= 1 && (
            <div className="fade-in" style={{ marginLeft: 38, background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 18, padding: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: 0.3, color: "var(--gray-text)", marginBottom: 14 }}>TÌNH TRẠNG HỢP ĐỒNG</div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ flexShrink: 0, textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: "var(--red-tint-05)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26
                  }}>✅</div>
                  <div style={{ fontWeight: 700, fontSize: 12.5, marginTop: 8, whiteSpace: "nowrap" }}>Đang có hiệu lực</div>
                  <span className="badge-green" style={{ marginTop: 4 }}>Active</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  {contractInfo.map(([label, value], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                      <span className="muted">{label}</span>
                      <span style={{ fontWeight: 700 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Block 3 — PRUTWin Companion Message */}
          {stage >= 2 && (
            <div className="msg-row fade-in">
              <div className="avatar-mini">🤖</div>
              <div className="bubble ai">
                Từ bây giờ, PRUTWin sẽ đồng hành cùng bạn trong suốt thời gian hợp đồng còn hiệu lực.
                <div style={{ marginTop: 8, marginBottom: 4 }}>Mình có thể hỗ trợ bạn:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {companionCapabilities.map((c, i) => (
                    <div key={i}>• {c}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-footer">
        <div className="suggested-row">
          <div className="pill-btn">📝 Tạo dạng Quiz</div>
          <div className="pill-btn">🎥 Tạo dạng Video</div>
          <div className="pill-btn">💬 Cần giải đáp thêm</div>
        </div>
        <div className="chat-input-bar">
          <span style={{ fontSize: 18 }}>+</span>
          <input placeholder="Hỏi PRUTWin bất kỳ điều gì…" />
          <div className="icon-round">🎤</div>
          <div className="icon-round mic-active">🔊</div>
        </div>
      </div>
    </div>
  );
}
