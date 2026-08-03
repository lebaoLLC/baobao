/* =========================================================
   FILE: 00_assets_config.js
   Cau hinh logo / anh / video dung trong prototype.

   Cach dung:
   1. Tha file cua ban vao thu muc assets/custom/.
   2. Doi ten file dung nhu cot file ben duoi, hoac sua duong dan src.
   3. Reload lai trang.
   ========================================================= */

const CUSTOM_ASSETS = {
  prudentialLogo: {
    type: "image",
    src: "assets/custom/prudential-logo.png",
    alt: "Logo Prudential",
    fit: "contain",
  },
  loginBiometricIcon: {
    type: "image",
    src: "assets/custom/login-biometric-icon.png",
    alt: "Dang nhap bang van tay / Face ID",
    fit: "contain",
  },
  familyHero: {
    type: "image",
    src: "assets/custom/family-hero.png",
    alt: "Minh hoa gia dinh",
    fit: "cover",
  },
  articleImage1: {
    type: "image",
    src: "assets/custom/article-image-1.png",
    alt: "Anh bai viet 1",
    fit: "cover",
  },
  articleImage2: {
    type: "image",
    src: "assets/custom/article-image-2.png",
    alt: "Anh bai viet 2",
    fit: "cover",
  },
  articleImage3: {
    type: "image",
    src: "assets/custom/article-image-3.png",
    alt: "Anh bai viet 3",
    fit: "cover",
  },
  knowledgeImage1: {
    type: "image",
    src: "assets/custom/knowledge-image-1.png",
    alt: "Anh kien thuc 1",
    fit: "cover",
  },
  knowledgeImage2: {
    type: "image",
    src: "assets/custom/knowledge-image-2.png",
    alt: "Anh kien thuc 2",
    fit: "cover",
  },
  knowledgeImage3: {
    type: "image",
    src: "assets/custom/knowledge-image-3.png",
    alt: "Anh kien thuc 3",
    fit: "cover",
  },
  prutwinCharacter: {
    type: "image",
    src: "assets/custom/prutwin-character.png",
    alt: "Nhan vat PRUTwin",
    fit: "contain",
  },
  prutwinCharacterShield: {
    type: "image",
    src: "assets/custom/prutwin-character-shield.png",
    alt: "Nhan vat PRUTwin trong khien do",
    fit: "contain",
  },
  chatWelcomeCharacter: {
    type: "image",
    src: "assets/custom/chat-welcome-character.png",
    alt: "Nhan vat PRUTwin trong khien do - man Chatbox",
    fit: "contain",
  },
  familyShieldCharacter: {
    type: "image",
    src: "assets/custom/family-shield-character.png",
    alt: "Nhan vat om em be trong khien bao ve",
    fit: "contain",
  },
  avatar: {
    type: "image",
    src: "assets/custom/avatar.png",
    alt: "Avatar nguoi dung",
    fit: "cover",
  },
  simulationBenefitsCard: {
    type: "image",
    src: "assets/custom/simulation-benefits-card.png",
    alt: "Mo phong quyen loi bao hiem",
    fit: "contain",
    aspectRatio: "503 / 596",
  },
  qaBenefitsExplanation: {
    type: "image",
    src: "assets/custom/qa-benefits-explanation.png",
    alt: "Giai thich quyen loi va so sanh ke hoach",
    fit: "contain",
    aspectRatio: "499 / 600",
  },
  benefitsVideo: {
    type: "video",
    src: "assets/custom/benefits-video.mp4",
    poster: "assets/custom/benefits-video-poster.png",
    alt: "Video hieu nhanh quyen loi bao hiem",
    controls: true,
  },
};
