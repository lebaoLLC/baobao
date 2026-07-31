/* =========================================================
   FILE: 09_app_router.js
   ĐÂY LÀ FILE QUAN TRỌNG NHẤT KHI CẦN THÊM/SỬA LUỒNG MÀN HÌNH

   Chứa:
   - App -> component gốc, quản lý route hiện tại (useState 'route') và render đúng
           màn hình tương ứng qua switch-case

   SỬA GÌ Ở ĐÂY:
   - Thêm 1 màn hình mới vào luồng -> thêm 1 case mới trong switch, gọi đúng component
   - Đổi thứ tự luồng (VD: sau Login đi thẳng vào Home thay vì Onboarding)
     -> sửa case 'login': content = <LoginScreen onLogin={() => setRoute('...')} />
   - Đổi logic 'đã có hồ sơ hay chưa' (hasProfile) -> sửa handleBottomNav / state hasProfile

   BẢNG MAP ROUTE -> FRAME (PDF) -> FILE COMPONENT:
   ---------------------------------------------------------------
   route            | Frame trong PDF                  | File
   ---------------------------------------------------------------
   login            | Step 0 - Đăng nhập                | 02_login.js
   onboardWelcome   | Frame 1.1                          | 05_onboarding_flow.js
   layer1..layer4   | Frame 1.2 / Layer 1-4              | 05_onboarding_flow.js
   onboardComplete  | Frame 6                            | 05_onboarding_flow.js
   home1            | Frame 1 (chưa có hồ sơ)            | 03_home_before_profile.js
   home2            | Frame 4.1 (đã có hồ sơ)            | 07_home_notifications_and_update.js
   notifications    | Frame 3.1                          | 07_home_notifications_and_update.js
   profilePrompt    | Frame 2 (chưa có hồ sơ)            | 03_home_before_profile.js
   profileAfter     | Frame 3.2                          | 06_profile_after_and_contract.js
   contractDetail   | Frame 3.3                          | 06_profile_after_and_contract.js
   adjustPrompt     | Frame 2 (tab Điều chỉnh)            | 03_home_before_profile.js
   adjustAfter      | Frame 4.2                           | 07_home_notifications_and_update.js
   more             | Frame 3 (tab Thêm)                 | 04_more_tab.js
   updateProfile    | Frame 4.2                           | 07_home_notifications_and_update.js
   updateComplete   | Frame 4.3                           | 07_home_notifications_and_update.js
   chatWelcome      | Frame 2.1                           | 08_chat_ai_flow.js
   chatExplain      | Frame 2.2                           | 08_chat_ai_flow.js
   chatQA           | Frame 3 (Giải đáp thắc mắc)         | 08_chat_ai_flow.js
   chatSim          | Frame 4 (Mô phỏng tình huống)       | 08_chat_ai_flow.js
   ---------------------------------------------------------------
   ========================================================= */

function App() {
  const [route, setRoute] = useState("login");
  const [hasProfile, setHasProfile] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const go = (r) => setRoute(r);

  const handleBottomNav = (key) => {
    if (key === "home") setRoute(hasProfile ? "home2" : "home1");
    else if (key === "profile") setRoute(hasProfile ? "profileAfter" : "onboardWelcome");
    else if (key === "prutwin") setRoute("chatWelcome");
    else if (key === "adjust") setRoute(hasProfile ? "adjustAfter" : "adjustPrompt");
    else if (key === "more") setRoute("more");
  };

  let content;
  switch (route) {
    case "login":
      content = <LoginScreen onLogin={() => setRoute("home1")} />;
      break;

    // Onboarding chain (Step 1: Tạo hồ sơ PRUTwin)
    case "onboardWelcome":
      content = <OnboardingWelcome onBack={() => setRoute(hasProfile ? "home2" : "home1")} onStart={() => setRoute("layer1")} />;
      break;
    case "layer1":
      content = <OnboardingLayer1 onBack={() => setRoute("onboardWelcome")} onNext={() => setRoute("layer2")} />;
      break;
    case "layer2":
      content = <OnboardingLayer2 onBack={() => setRoute("layer1")} onNext={() => setRoute("layer3")} />;
      break;
    case "layer3":
      content = <OnboardingLayer3 onBack={() => setRoute("layer2")} onNext={() => setRoute("layer4")} />;
      break;
    case "layer4":
      content = <OnboardingLayer4 onBack={() => setRoute("layer3")} onNext={() => setRoute("onboardComplete")} />;
      break;
    case "onboardComplete":
      content = <OnboardingComplete onFinish={() => { setHasProfile(true); setRoute("chatWelcome"); }} />;
      break;

    // Home (before/after profile)
    case "home1":
      content = <HomeScreenBeforeProfile onNav={handleBottomNav} />;
      break;
    case "home2":
      content = <HomeAfterProfile onNav={handleBottomNav} onUpdateProfile={() => setRoute("updateProfile")} showUpdatePrompt={!profileUpdated} />;
      break;

    case "notifications":
      content = <NotificationHomeScreen onNav={handleBottomNav} onGoProfile={() => setRoute(hasProfile ? "profileAfter" : "profilePrompt")} />;
      break;

    // Profile tab
    case "profilePrompt":
      content = <ProfilePromptScreen title="Hồ sơ PRUTWin" onBack={() => setRoute(hasProfile ? "home2" : "home1")} onCreate={() => setRoute("onboardWelcome")} />;
      break;
    case "profileAfter":
      content = <ProfileScreenAfter onNav={handleBottomNav} onOpenContract={() => setRoute("contractDetail")} />;
      break;
    case "contractDetail":
      content = <ContractDetailScreen onBack={() => setRoute("profileAfter")} />;
      break;

    // Adjust tab (uses same prompt screen)
    case "adjustPrompt":
      content = <ProfilePromptScreen title="Điều chỉnh hồ sơ" onBack={() => setRoute(hasProfile ? "home2" : "home1")} onCreate={() => setRoute("onboardWelcome")} />;
      break;
    case "adjustAfter":
      content = <UpdateProfileScreen onBack={() => setRoute("home2")} onNext={() => { setProfileUpdated(true); setRoute("updateComplete"); }} />;
      break;

    // More tab
    case "more":
      content = <MoreScreen onBack={() => setRoute(hasProfile ? "home2" : "home1")} onNav={handleBottomNav} hasProfile={hasProfile} />;
      break;

    // Update profile flow (from home card)
    case "updateProfile":
      content = <UpdateProfileScreen onBack={() => setRoute("home2")} onNext={() => { setProfileUpdated(true); setRoute("updateComplete"); }} />;
      break;
    case "updateComplete":
      content = <UpdateProfileComplete onBack={() => setRoute("home2")} onSeeMoreBenefits={() => setRoute("home2")} />;
      break;

    // Chat AI flow
    case "chatWelcome":
      content = <ChatWelcome onBack={() => setRoute(hasProfile ? "home2" : "home1")} onSelect={(k) => {
        if (k === "explain") setRoute("chatExplain");
        else if (k === "qa") setRoute("chatQA");
        else if (k === "sim") setRoute("chatSim");
      }} />;
      break;
    case "chatExplain":
      content = <ChatExplainBenefits onBack={() => setRoute("chatWelcome")} onGoQA={() => setRoute("chatQA")} />;
      break;
    case "chatQA":
      content = <ChatQA onBack={() => setRoute("chatWelcome")} onGoSim={() => setRoute("chatSim")} />;
      break;
    case "chatSim":
      content = <ChatSimulation onBack={() => setRoute(hasProfile ? "home2" : "home1")} />;
      break;

    default:
      content = <LoginScreen onLogin={() => setRoute("home1")} />;
  }

  return (
    <div className="device">
      {content}
    </div>
  );
}
