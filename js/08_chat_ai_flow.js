/* =========================================================
   FILE: 08_chat_ai_flow.js
   MAP VỚI: FRAME 2.1 → FRAME 4 (toàn bộ luồng CHATBOX AI PRUTWIN)

   Thứ tự trong luồng:
   1. ChatWelcome          -> Frame 2.1: trang chủ chatbox (nhân vật + 3 quick action)
   2. TypingBubble         -> hiệu ứng '...' khi AI đang trả lời (dùng chung)
   3. ChatExplainBenefits  -> Frame 2.2: Giải thích Quyền lợi (video + tóm tắt)
   4. ChatQA               -> Frame 3: Giải đáp Thắc mắc (trích dẫn điều khoản + so sánh 2 kế hoạch)
   5. ChatSimulation       -> Frame 4: Mô phỏng Tình huống (infographic ước tính quyền lợi)

   SỬA GÌ Ở ĐÂY:
   - Đổi câu hỏi mẫu / câu trả lời AI mẫu -> sửa trực tiếp trong JSX từng component
   - Đổi số liệu mô phỏng (620tr / 870tr VNĐ...) -> sửa trong ChatSimulation
   - Đổi các nút gợi ý nhanh (pill-btn) dưới ô chat -> sửa suggested-row trong từng màn
   - Đổi tốc độ hiệu ứng typing/reveal từng block -> tìm setTimeout trong từng component
   ========================================================= */

function ChatWelcome({ onBack, onSelect }) {
  return (
    <div className="screen">
      <ChatHeader onBack={onBack} onHistory={() => {}} />
      <div className="scrollarea" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 22px 20px", textAlign: "center" }}>
        <div style={{ width: 200 }}>
          <AssetPlaceholder assetKey="prutwinCharacterShield" icon="🛡️👩‍💼" label="Nhân vật PRUTwin trong khiên đỏ" note="Nữ chuyên viên Prudential, vest đen, khoanh tay, khiên đỏ phát sáng phía sau" height={240} radius={20} />
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
              <div style={{ marginLeft: 38 }}>
                <AssetPlaceholder
                  className="chat-large-asset"
                  assetKey="qaBenefitsExplanation"
                  icon="🖼️"
                  label="Ảnh giải thích quyền lợi"
                  note="Thay toàn bộ phần giải thích, nguồn tham chiếu và so sánh kế hoạch bằng một ảnh lớn"
                  height={520}
                  radius={16}
                />
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

function ChatSimulation({ onBack }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const timers = [setTimeout(() => setStage(1), 700), setTimeout(() => setStage(2), 1400)];
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
