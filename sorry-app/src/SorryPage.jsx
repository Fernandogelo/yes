import React, { useState, useRef } from "react";

/**
 * ─────────────────────────────────────────────────────────────
 * CUSTOMIZE ME — everything you'll want to change is right here.
 * ─────────────────────────────────────────────────────────────
 */
const HER_NAME = "Bebe Love";               // her name
const YOUR_NAME = "Gelo";                // your name / how you sign off
const LETTER_BODY = [
  "Sorry sophia kagabi dahil na stress lng ako and I want you to be sweet",
  "Alam ko mahirap sayo maging sweet, pero it would make my day if sweet ikaw",
  "I promise to become a better person lovey, please lets be sweet",
];
const REASONS = [
  "Masyado me na stress sa school kaya gusto ko gumala",
  "I was too focused on myself not realizing I'm hurting you inside",
  "I made you feel like it was your job to fix things."
];
/** ───────────────────────────────────────────────────────────── */

export default function SorryPage() {
  const [stage, setStage] = useState("envelope"); // envelope -> letter -> reasons -> ask -> forgiven
  const [reasonIndex, setReasonIndex] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noDodges, setNoDodges] = useState(0);
  const yesRef = useRef(null);
  const noRef = useRef(null);

  const dodgeNo = () => {
    const spread = 120 + noDodges * 12;
    const x = (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * 60;
    setNoPos({ x, y });
    setNoDodges((n) => Math.min(n + 1, 8));
  };

  const nextReason = () => {
    if (reasonIndex < REASONS.length - 1) {
      setReasonIndex((i) => i + 1);
    } else {
      setStage("ask");
    }
  };

  return (
    <div style={styles.root}>
      <style>{FONT_IMPORT}</style>
      <FloatingHearts show={stage === "forgiven"} />

      <div style={styles.stage}>
        {stage === "envelope" && (
          <Envelope onOpen={() => setStage("letter")} her={HER_NAME} />
        )}

        {stage === "letter" && (
          <Letter
            body={LETTER_BODY}
            her={HER_NAME}
            you={YOUR_NAME}
            onContinue={() => setStage("reasons")}
          />
        )}

        {stage === "reasons" && (
          <ReasonCard
            text={REASONS[reasonIndex]}
            index={reasonIndex}
            total={REASONS.length}
            onNext={nextReason}
          />
        )}

        {stage === "ask" && (
          <div style={styles.askCard}>
            <p style={styles.askEyebrow}>one more thing</p>
            <h2 style={styles.askQuestion}>Will you forgive me?</h2>
            <div style={styles.buttonRow}>
              <button
                ref={yesRef}
                onClick={() => setStage("forgiven")}
                style={{
                  ...styles.yesBtn,
                  transform: `scale(${1 + noDodges * 0.08})`,
                }}
              >
                Yes, I forgive you
              </button>
              <button
                ref={noRef}
                onMouseEnter={dodgeNo}
                onClick={dodgeNo}
                style={{
                  ...styles.noBtn,
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                }}
              >
                No
              </button>
            </div>
            {noDodges > 2 && (
              <p style={styles.askHint}>
                (the "no" button seems to be having second thoughts)
              </p>
            )}
          </div>
        )}

        {stage === "forgiven" && (
          <div style={styles.forgivenCard}>
            <p style={styles.forgivenEyebrow}>thank you</p>
            <h2 style={styles.forgivenTitle}>That means everything.</h2>
            <p style={styles.forgivenBody}>
              I will always be a better person for you. Thank you lovey. I love you my beautiful gf
            </p>
            <p style={styles.signature}>— {YOUR_NAME}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Sub-components ───────────────────────── */

function Envelope({ onOpen, her }) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div style={styles.envelopeWrap}>
      <div
        onClick={handleClick}
        style={{
          ...styles.envelope,
          transform: opening ? "translateY(30px) scale(0.96)" : "translateY(0) scale(1)",
          opacity: opening ? 0 : 1,
        }}
      >
        <div style={styles.envelopeFlapBack} />
        <div style={styles.envelopeAddress}>For {her}</div>
        <div
          style={{
            ...styles.envelopeFlap,
            transform: opening ? "rotateX(180deg)" : "rotateX(0deg)",
          }}
        />
        <div style={styles.seal}>✦</div>
      </div>
      <p style={styles.tapHint}>tap the envelope</p>
    </div>
  );
}

function Letter({ body, her, you, onContinue }) {
  return (
    <div style={styles.letterCard}>
      <p style={styles.letterEyebrow}>Dear {her},</p>
      {body.map((para, i) => (
        <p key={i} style={styles.letterPara}>
          {para}
        </p>
      ))}
      <p style={styles.signature}>— {you}</p>
      <button style={styles.continueBtn} onClick={onContinue}>
        There's more →
      </button>
    </div>
  );
}

function ReasonCard({ text, index, total, onNext }) {
  return (
    <div style={styles.reasonCard}>
      <p style={styles.reasonEyebrow}>
        what I got wrong · {index + 1} of {total}
      </p>
      <p style={styles.reasonText}>{text}</p>
      <div style={styles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              background: i <= index ? "var(--gold)" : "rgba(61,31,53,0.15)",
            }}
          />
        ))}
      </div>
      <button style={styles.continueBtn} onClick={onNext}>
        {index === total - 1 ? "Okay, keep going →" : "Next →"}
      </button>
    </div>
  );
}

function FloatingHearts({ show }) {
  if (!show) return null;
  const hearts = Array.from({ length: 18 });
  return (
    <div style={styles.heartsLayer} aria-hidden="true">
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 4 + Math.random() * 3;
        const size = 14 + Math.random() * 16;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              bottom: "-40px",
              fontSize: `${size}px`,
              color: i % 2 === 0 ? "var(--blush)" : "var(--gold)",
              animation: `floatUp ${duration}s ease-in ${delay}s infinite`,
              opacity: 0.85,
            }}
          >
            ♥
          </span>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Styles ───────────────────────── */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,500&family=Lora:ital,wght@0,400;0,500;1,400&family=Caveat:wght@600&display=swap');

@keyframes floatUp {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.85; }
  100% { transform: translateY(-115vh) translateX(20px) rotate(20deg); opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const styles = {
  root: {
    "--blush": "#E8B4B8",
    "--plum": "#3D1F35",
    "--paper": "#FDF6F0",
    "--gold": "#C9A76D",
    "--sage": "#9CAF88",
    minHeight: "100vh",
    width: "100%",
    background:
      "radial-gradient(circle at 20% 20%, #FBEAE4 0%, var(--paper) 45%, #F6E9DE 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    fontFamily: "'Lora', serif",
    color: "var(--plum)",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  stage: {
    width: "100%",
    maxWidth: "440px",
    position: "relative",
    zIndex: 2,
  },
  heartsLayer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1,
    overflow: "hidden",
  },

  /* Envelope */
  envelopeWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
  },
  envelope: {
    position: "relative",
    width: "320px",
    height: "220px",
    background: "linear-gradient(135deg, #FBEFE8, #F3DCCF)",
    borderRadius: "6px",
    boxShadow: "0 18px 40px rgba(61,31,53,0.18)",
    cursor: "pointer",
    transition: "transform 0.9s cubic-bezier(.4,0,.2,1), opacity 0.9s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(61,31,53,0.08)",
  },
  envelopeFlapBack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "110px",
    background: "linear-gradient(160deg, #F6E3D6, #EFD2BF)",
    clipPath: "polygon(0 0, 100% 0, 50% 85%)",
    borderRadius: "6px 6px 0 0",
    zIndex: 1,
  },
  envelopeFlap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "110px",
    background: "linear-gradient(160deg, #EFDCCE, #E6C6AF)",
    clipPath: "polygon(0 0, 100% 0, 50% 85%)",
    borderRadius: "6px 6px 0 0",
    transformOrigin: "top center",
    transition: "transform 0.8s cubic-bezier(.4,0,.2,1)",
    zIndex: 3,
  },
  envelopeAddress: {
    fontFamily: "'Caveat', cursive",
    fontSize: "26px",
    color: "var(--plum)",
    zIndex: 2,
    marginTop: "40px",
  },
  seal: {
    position: "absolute",
    top: "94px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "var(--gold)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    boxShadow: "0 4px 10px rgba(201,167,109,0.5)",
    zIndex: 4,
  },
  tapHint: {
    fontSize: "14px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(61,31,53,0.45)",
  },

  /* Letter */
  letterCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "36px 32px",
    boxShadow: "0 20px 50px rgba(61,31,53,0.14)",
    animation: "fadeIn 0.6s ease",
  },
  letterEyebrow: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "22px",
    marginBottom: "18px",
    color: "var(--plum)",
  },
  letterPara: {
    fontSize: "16px",
    lineHeight: 1.7,
    marginBottom: "16px",
    color: "rgba(61,31,53,0.88)",
  },
  signature: {
    fontFamily: "'Caveat', cursive",
    fontSize: "28px",
    marginTop: "8px",
    color: "var(--plum)",
  },
  continueBtn: {
    marginTop: "24px",
    background: "var(--plum)",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "12px 24px",
    fontFamily: "'Lora', serif",
    fontSize: "14px",
    letterSpacing: "0.03em",
    cursor: "pointer",
  },

  /* Reasons */
  reasonCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "40px 32px",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(61,31,53,0.14)",
    animation: "fadeIn 0.5s ease",
  },
  reasonEyebrow: {
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: "18px",
  },
  reasonText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "24px",
    lineHeight: 1.5,
    color: "var(--plum)",
    marginBottom: "24px",
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "22px",
  },
  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    transition: "background 0.3s ease",
  },

  /* Ask */
  askCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "44px 32px",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(61,31,53,0.14)",
    animation: "fadeIn 0.5s ease",
    minHeight: "220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  askEyebrow: {
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: "10px",
  },
  askQuestion: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "30px",
    color: "var(--plum)",
    marginBottom: "28px",
  },
  buttonRow: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    position: "relative",
    minHeight: "50px",
  },
  yesBtn: {
    background: "var(--sage)",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "13px 26px",
    fontSize: "15px",
    fontFamily: "'Lora', serif",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  noBtn: {
    background: "transparent",
    color: "var(--plum)",
    border: "1px solid rgba(61,31,53,0.3)",
    borderRadius: "999px",
    padding: "13px 26px",
    fontSize: "15px",
    fontFamily: "'Lora', serif",
    cursor: "pointer",
    transition: "transform 0.25s ease",
  },
  askHint: {
    marginTop: "18px",
    fontSize: "13px",
    color: "rgba(61,31,53,0.45)",
    fontStyle: "italic",
  },

  /* Forgiven */
  forgivenCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "48px 32px",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(61,31,53,0.14)",
    animation: "fadeIn 0.6s ease",
  },
  forgivenEyebrow: {
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: "10px",
  },
  forgivenTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "30px",
    color: "var(--plum)",
    marginBottom: "16px",
  },
  forgivenBody: {
    fontSize: "16px",
    lineHeight: 1.7,
    color: "rgba(61,31,53,0.85)",
    marginBottom: "18px",
  },
};
