import { useState, useEffect } from "react";

const C = {
  bg: "#0d0c14",
  surface: "#161522",
  card: "#1e1c2e",
  border: "#2a2840",
  accent: "#e8c4a0",
  accentDim: "#c9a47e",
  muted: "#5c596e",
  mutedLight: "#7a7690",
  text: "#f0ede8",
  textSoft: "#b0acbf",
  low: "#d97a6a",
  lowBg: "#261816",
  lowBorder: "#4a2820",
  mid: "#d4a84b",
  midBg: "#241e10",
  midBorder: "#4a3a18",
  high: "#6ab896",
  highBg: "#102018",
  highBorder: "#1e4030",
};

// ─── Routine Definitions ──────────────────────────────────────────────────────

const ROUTINES = {
  low: {
    key: "low",
    label: "Low Day",
    color: C.low, bg: C.lowBg, border: C.lowBorder,
    emoji: "🌑",
    tagline: "Just the essentials. This is enough.",
    description: "Your nervous system needs gentleness. These steps will help stabilise you without overwhelm.",
    steps: [
      { id: "get_up", icon: "🛏", title: "Get out of bed", detail: "Put on something gentle — soft music, warm lighting. Make your bed once you're up. That's a win.", suggestions: ["🎵 Soft music", "🕯 Warm lamp", "🛏 Make the bed"] },
      { id: "water", icon: "💧", title: "Drink a glass of water", detail: "Before anything else. Your body needs it." },
      { id: "eat", icon: "🍳", title: "Eat something — anything", detail: "No pressure on nutrition today. Hot chocolate, toast, a smoothie — just eat.", examples: ["☕ Hot chocolate", "🥛 Warm milk", "🍞 Toast", "🥤 Smoothie", "🌭 Sausage"] },
      { id: "outside", icon: "🚶", title: "Go for a walk", detail: "Even 10 minutes. Natural light and movement are the two most powerful mood regulators we know of." },
      { id: "shower", icon: "🚿", title: "Shower & brush teeth", detail: "A warm shower resets your nervous system. You'll feel different after." },
      { id: "moisturise", icon: "🧴", title: "Moisturise", detail: "A small act of care for yourself. You're worth it even on hard days." },
    ],
    reassess: true,
    bonusSteps: [
      { id: "journal", icon: "📓", title: "Write in your journal", detail: "Offload whatever's in your head. No rules, no structure. Just write." },
      { id: "skincare", icon: "✨", title: "Do your skincare", detail: "Take your time with it. A ritual, not a chore." },
      { id: "tidy", icon: "🧹", title: "Put clothes away", detail: "Just clothes for now. A small bit of order helps your mind breathe." },
    ],
  },
  mid: {
    key: "mid",
    label: "Okay Day",
    color: C.mid, bg: C.midBg, border: C.midBorder,
    emoji: "🌗",
    tagline: "You have capacity. Use it gently.",
    description: "You're functional but not at full energy. Build on the basics — give yourself permission to stop if you need to.",
    steps: [
      { id: "get_up", icon: "🛏", title: "Get up an hour before work", detail: "Give yourself a proper morning buffer. Don't let work eat your whole morning." },
      { id: "journal", icon: "📓", title: "Write in your journal", detail: "Start the day by clearing your head. Even five minutes helps." },
      { id: "tidy", icon: "🧹", title: "Put clothes away & make bed", detail: "A clear space sets a clear tone for the day." },
      { id: "yoga", icon: "🧘", title: "15 minutes of yoga", detail: "Gentle movement to wake your body up. Not a workout — just a warm-up for the day." },
      { id: "eat", icon: "🥣", title: "Eat a nourishing breakfast", detail: "Something that feels good. Your usual is fine if it appeals." },
      { id: "supplements", icon: "💊", title: "Take your supplements", detail: "With food. Make it a habit you don't have to think about." },
      { id: "shower", icon: "🚿", title: "Shower & brush teeth", detail: "Get dressed properly. It signals to your brain that the day has begun." },
      { id: "skincare", icon: "✨", title: "Skincare & moisturise", detail: "Morning routine. Take your time with it." },
      { id: "outside", icon: "🌿", title: "Walk to start your day", detail: "Put on a motivating podcast. Use the walk as your transition into the day.", suggestion: "🎧 Try a motivating podcast on the walk" },
    ],
    reassess: true,
    reassessOptions: {
      low: { label: "Still low", suggestion: "That's okay. Put a book on or rest. You've done the hard part." },
      okay: { label: "Okay-ish", suggestion: "Plan your workday. Write down 3 things you want to get done." },
    },
  },
  high: {
    key: "high",
    label: "Good Day",
    color: C.high, bg: C.highBg, border: C.highBorder,
    emoji: "🌕",
    tagline: "You're in flow. Protect it.",
    description: "Your full routine is available to you. Notice what's working — future you will want to know.",
    steps: [
      { id: "get_up", icon: "🛏", title: "Get up at 6am", detail: "Early start. Don't negotiate with the snooze button today." },
      { id: "journal", icon: "📓", title: "Write in your journal", detail: "Start with gratitude or intention. Set the tone." },
      { id: "tidy", icon: "🧹", title: "Put clothes away & make bed", detail: "Clear space, clear mind. Do it before anything else." },
      { id: "yoga", icon: "🧘", title: "15 minutes of yoga", detail: "Wake your body up gently before the workout.", time: "15 min" },
      { id: "workout", icon: "💪", title: "30 min workout (3× per week)", detail: "Or extend your yoga session on rest days. Whatever your plan says today.", time: "30 min" },
      { id: "eat", icon: "🥗", title: "Nourishing breakfast", detail: "Fuel yourself properly. You've earned it." },
      { id: "supplements", icon: "💊", title: "Take your supplements", detail: "With food. Non-negotiable habit." },
      { id: "shower", icon: "🚿", title: "Shower & brush teeth", detail: "After your workout. Get dressed like you mean it." },
      { id: "skincare", icon: "✨", title: "Skincare & moisturise", detail: "Morning routine. Take your time." },
      { id: "outside", icon: "🚶", title: "Walk to start your day", detail: "Your anchor habit. The transition from morning to day.", time: "20–30 min" },
      { id: "note", icon: "📝", title: "Note what's working", detail: "Write one sentence about why today feels manageable. Future-you will thank you." },
    ],
  },
};

// ─── Check-in Questions ───────────────────────────────────────────────────────
// Scoring: negative total = low, 0-3 = mid, 4+ = high
// HRV thresholds based on research: <50ms = low, 50-70ms = mid, >70ms = high
// Body battery: <30 = low, 30-60 = mid, >60 = high
// Sleep score: <60 = low, 60-79 = mid, 80+ = high

const CHECK_IN_QUESTIONS = [
  { id: "ate_well", question: "Did you eat properly yesterday?", yes: 1, no: -1, type: "yesno" },
  { id: "moved", question: "Did you move your body?", yes: 1, no: -1, type: "yesno" },
  { id: "room_tidy", question: "Is your space reasonably tidy?", yes: 1, no: -2, type: "yesno" },
  { id: "slept", question: "Did you sleep okay?", yes: 1, no: -2, type: "yesno" },
  { id: "routine", question: "Did you manage most of your normal routine?", yes: 2, no: -1, type: "yesno" },
  {
    id: "hrv", question: "What's your HRV this morning?", type: "select",
    options: [
      { label: "Not tracking", value: 0 },
      { label: "Below 50ms (low)", value: -2 },
      { label: "50–70ms (moderate)", value: 1 },
      { label: "Above 70ms (strong)", value: 2 },
    ]
  },
  {
    id: "body_battery", question: "What's your body battery?", type: "select",
    options: [
      { label: "Not tracking", value: 0 },
      { label: "Below 30 (depleted)", value: -2 },
      { label: "30–60 (moderate)", value: 1 },
      { label: "Above 60 (charged)", value: 2 },
    ]
  },
  {
    id: "sleep_score", question: "What was your sleep score last night?", type: "select",
    options: [
      { label: "Not tracking", value: 0 },
      { label: "Below 60 (poor)", value: -2 },
      { label: "60–79 (fair)", value: 1 },
      { label: "80+ (good)", value: 2 },
    ]
  },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Btn({ children, onClick, disabled, variant = "primary", style = {} }) {
  const base = {
    padding: "13px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer", border: "none",
    fontFamily: "'DM Sans', sans-serif", transition: "all 0.18s", ...style,
  };
  const variants = {
    primary: { background: disabled ? C.border : C.accent, color: disabled ? C.muted : C.bg },
    ghost: { background: "transparent", border: `1px solid ${C.border}`, color: C.mutedLight },
    tonal: { background: C.card, border: `1px solid ${C.border}`, color: C.textSoft },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant] }}>{children}</button>;
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 3, background: C.card, borderRadius: 14, padding: 4, marginBottom: 24, border: `1px solid ${C.border}` }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          flex: 1, padding: "9px 4px", borderRadius: 11, border: "none", cursor: "pointer",
          background: active === t.id ? C.surface : "transparent",
          color: active === t.id ? C.text : C.muted,
          fontSize: 12, fontWeight: active === t.id ? 600 : 400,
          fontFamily: "'DM Sans', sans-serif", transition: "all 0.18s",
          boxShadow: active === t.id ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
        }}>
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  );
}

function Card({ children, style = {}, color }) {
  return (
    <div style={{
      background: color ? color + "18" : C.card,
      border: `1px solid ${color ? color + "44" : C.border}`,
      borderRadius: 14, padding: "16px 18px", ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Check-in Questions ───────────────────────────────────────────────────────

function CheckInQuestions({ answers, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {CHECK_IN_QUESTIONS.map(q => {
        if (q.type === "yesno") {
          const ans = answers[q.id];
          return (
            <div key={q.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "13px 16px", borderRadius: 12,
              background: ans === true ? C.highBg : ans === false ? C.lowBg : C.card,
              border: `1px solid ${ans === true ? C.highBorder : ans === false ? C.lowBorder : C.border}`,
              transition: "all 0.2s",
            }}>
              <span style={{ color: C.textSoft, fontSize: 14, lineHeight: 1.4 }}>{q.question}</span>
              <div style={{ display: "flex", gap: 7, flexShrink: 0, marginLeft: 12 }}>
                {[true, false].map(val => {
                  const selected = ans === val;
                  const label = val ? "Yes" : "No";
                  const selColor = val ? C.high : C.low;
                  return (
                    <button key={label} onClick={() => onChange(q.id, val)} style={{
                      padding: "5px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                      border: selected ? "none" : `1px solid ${C.border}`,
                      background: selected ? selColor : "transparent",
                      color: selected ? C.bg : C.muted,
                      fontWeight: selected ? 700 : 400, transition: "all 0.15s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{label}</button>
                  );
                })}
              </div>
            </div>
          );
        }

        if (q.type === "select") {
          const ans = answers[q.id];
          return (
            <div key={q.id} style={{
              padding: "13px 16px", borderRadius: 12,
              background: C.card, border: `1px solid ${C.border}`,
            }}>
              <div style={{ color: C.textSoft, fontSize: 14, marginBottom: 10 }}>{q.question}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {q.options.map(opt => {
                  const selected = ans === opt.value || (ans === undefined && opt.value === 0 && q.options[0].value === 0);
                  const isSelected = answers[q.id] !== undefined ? answers[q.id] === opt.value : false;
                  return (
                    <button key={opt.label} onClick={() => onChange(q.id, opt.value)} style={{
                      padding: "8px 14px", borderRadius: 10, fontSize: 13, cursor: "pointer", textAlign: "left",
                      border: `1px solid ${isSelected ? C.accent : C.border}`,
                      background: isSelected ? C.accent + "22" : C.surface,
                      color: isSelected ? C.accent : C.muted,
                      fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                    }}>{opt.label}</button>
                  );
                })}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

// ─── Step Item ────────────────────────────────────────────────────────────────

function StepItem({ step, done, onToggle, color }) {
  const [showExamples, setShowExamples] = useState(false);
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${done ? color + "55" : C.border}`, transition: "all 0.2s" }}>
      <div onClick={onToggle} style={{
        padding: "15px 18px", cursor: "pointer",
        background: done ? color + "15" : C.card,
        display: "flex", alignItems: "flex-start", gap: 14, transition: "background 0.2s",
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
          border: `2px solid ${done ? color : C.muted}`,
          background: done ? color : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: C.bg, fontWeight: 800, transition: "all 0.2s",
        }}>
          {done ? "✓" : ""}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
            <span style={{ fontSize: 17 }}>{step.icon}</span>
            <span style={{ color: done ? C.muted : C.text, fontSize: 14, fontWeight: 500, textDecoration: done ? "line-through" : "none" }}>
              {step.title}
            </span>
            {step.time && <span style={{ color: C.muted, fontSize: 11, marginLeft: "auto" }}>{step.time}</span>}
          </div>
          <p style={{ color: C.muted, fontSize: 12, margin: 0, lineHeight: 1.55 }}>{step.detail}</p>
          {step.suggestion && (
            <div style={{ marginTop: 6, fontSize: 11, color: color, opacity: 0.8 }}>{step.suggestion}</div>
          )}
          {step.suggestions && (
            <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 5 }}>
              {step.suggestions.map(s => (
                <span key={s} style={{ fontSize: 11, padding: "2px 9px", borderRadius: 20, background: color + "22", color: color }}>{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {step.examples && (
        <div style={{ borderTop: `1px solid ${C.border}`, background: C.surface }}>
          <button onClick={() => setShowExamples(v => !v)} style={{
            width: "100%", padding: "8px 18px", background: "transparent", border: "none",
            color: C.muted, fontSize: 11, cursor: "pointer", textAlign: "left",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {showExamples ? "▲ Hide ideas" : "▼ Show food ideas"}
          </button>
          {showExamples && (
            <div style={{ padding: "0 18px 12px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {step.examples.map(e => (
                <span key={e} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: color + "22", color }}>
                  {e}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Reassess Block ───────────────────────────────────────────────────────────

function ReassessBlock({ routineKey, color, bg, border, onAnswer }) {
  const [answered, setAnswered] = useState(null);

  const options =
    routineKey === "low"
      ? [
          { val: "better", label: "A bit better 🌤", desc: "Great. Here are a few more steps when you're ready." },
          { val: "same", label: "About the same", desc: "That's okay. You've done the hard part. Rest now." },
        ]
      : [
          { val: "low", label: "Still low 🌑", desc: "That's okay. Try reading a book or resting. You've done well." },
          { val: "okay", label: "Okay-ish 🌗", desc: "Great. Plan your workday — write down 3 things to get done." },
          { val: "good", label: "Actually good 🌕", desc: "Brilliant. Lean into it." },
        ];

  return (
    <div style={{
      borderRadius: 14, padding: "16px 18px",
      background: bg, border: `1px solid ${border}`,
    }}>
      <div style={{ color, fontFamily: "'Crimson Text', serif", fontSize: 18, marginBottom: 4 }}>
        💭 How do you feel now?
      </div>
      <p style={{ color: C.muted, fontSize: 12, margin: "0 0 14px", lineHeight: 1.5 }}>
        Take a moment to check in honestly.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map(o => (
          <button key={o.val} onClick={() => { setAnswered(o.val); onAnswer(o.val); }} style={{
            padding: "11px 14px", borderRadius: 10, border: `1px solid ${answered === o.val ? color : C.border}`,
            background: answered === o.val ? color + "22" : C.card,
            color: answered === o.val ? color : C.textSoft,
            cursor: "pointer", fontSize: 13, textAlign: "left",
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.18s",
          }}>
            {o.label}
          </button>
        ))}
      </div>
      {answered && (
        <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: color + "15", border: `1px solid ${color}44` }}>
          <p style={{ color, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
            {options.find(o => o.val === answered)?.desc}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Routine View ─────────────────────────────────────────────────────────────

function RoutineView({ routine, onReset, onSaveJournal }) {
  const [done, setDone] = useState({});
  const [reassessAnswer, setReassessAnswer] = useState(null);
  const [journalText, setJournalText] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);

  const toggle = id => setDone(d => ({ ...d, [id]: !d[id] }));
  const completed = Object.values(done).filter(Boolean).length;
  const total = routine.steps.length + (routine.bonusSteps && reassessAnswer === "better" ? routine.bonusSteps.length : 0);
  const showBonus = routine.key === "low" && reassessAnswer === "better";

  const handleSaveJournal = () => { onSaveJournal(journalText); setJournalSaved(true); };

  return (
    <div>
      <div style={{
        borderRadius: 16, padding: "20px 22px", marginBottom: 20, textAlign: "center",
        background: routine.bg, border: `1px solid ${routine.border}`,
      }}>
        <div style={{ fontSize: 38, marginBottom: 6 }}>{routine.emoji}</div>
        <div style={{ color: routine.color, fontFamily: "'Crimson Text', serif", fontSize: 24, marginBottom: 3 }}>
          {routine.label}
        </div>
        <div style={{ color: C.textSoft, fontSize: 13, fontStyle: "italic", marginBottom: 8 }}>{routine.tagline}</div>
        <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.65 }}>{routine.description}</div>
      </div>

      {completed > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: C.muted, fontSize: 11 }}>{completed} of {total} done</span>
            <span style={{ color: routine.color, fontSize: 11 }}>{Math.round((completed / total) * 100)}%</span>
          </div>
          <div style={{ height: 3, borderRadius: 3, background: C.border, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(completed / total) * 100}%`, background: routine.color, transition: "width 0.4s", borderRadius: 3 }} />
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {routine.steps.map(step => (
          <StepItem key={step.id} step={step} done={done[step.id]} onToggle={() => toggle(step.id)} color={routine.color} />
        ))}
      </div>

      {routine.reassess && (
        <div style={{ marginBottom: 16 }}>
          <ReassessBlock
            routineKey={routine.key}
            color={routine.color} bg={routine.bg} border={routine.border}
            onAnswer={setReassessAnswer}
          />
        </div>
      )}

      {showBonus && routine.bonusSteps && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: routine.color, fontSize: 13, marginBottom: 10, fontWeight: 500 }}>
            ✦ A few more when you're ready
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {routine.bonusSteps.map(step => (
              <StepItem key={step.id} step={step} done={done[step.id]} onToggle={() => toggle(step.id)} color={routine.color} />
            ))}
          </div>
        </div>
      )}

      {completed > 0 && completed === total && (
        <div style={{
          padding: "14px 18px", borderRadius: 12, background: routine.bg,
          border: `1px solid ${routine.border}`, marginBottom: 16, textAlign: "center",
        }}>
          <span style={{ color: routine.color, fontSize: 14 }}>
            🎉 You did every single one. That is everything.
          </span>
        </div>
      )}

      <Card style={{ marginBottom: 14 }}>
        <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 10, fontWeight: 500 }}>
          📓 How are you feeling? (optional note)
        </div>
        <textarea
          value={journalText}
          onChange={e => setJournalText(e.target.value)}
          placeholder="Anything on your mind. No rules here."
          style={{
            width: "100%", minHeight: 80, background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: "10px 12px", color: C.text, fontSize: 13,
            resize: "vertical", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
            boxSizing: "border-box",
          }}
        />
        {journalSaved
          ? <div style={{ color: C.high, fontSize: 12, marginTop: 8 }}>✓ Saved</div>
          : <button onClick={handleSaveJournal} disabled={!journalText.trim()} style={{
              marginTop: 10, padding: "8px 18px", borderRadius: 10, border: "none",
              background: journalText.trim() ? C.accent : C.border,
              color: journalText.trim() ? C.bg : C.muted,
              fontSize: 13, cursor: journalText.trim() ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            }}>Save note</button>
        }
      </Card>

      <Btn variant="ghost" onClick={onReset} style={{ width: "100%" }}>← New check-in</Btn>
    </div>
  );
}

// ─── Patterns View ────────────────────────────────────────────────────────────

function PatternView({ history }) {
  const [selected, setSelected] = useState(null);

  if (history.length === 0) return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <div style={{ fontSize: 44, marginBottom: 12 }}>📊</div>
      <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>
        No data yet.<br />Complete your first check-in to start seeing patterns.
      </div>
    </div>
  );

  const today = new Date();
  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - (27 - i));
    const key = d.toLocaleDateString();
    return { date: d, key, entry: history.find(h => h.date === key) };
  });

  const rColor = { low: C.low, mid: C.mid, high: C.high };
  const rEmoji = { low: "🌑", mid: "🌗", high: "🌕" };

  const last7 = history.slice(0, 7);
  const avgMood = last7.length ? (last7.reduce((a, b) => a + b.moodScore, 0) / last7.length).toFixed(1) : null;
  const lowCount = last7.filter(h => h.routine === "low").length;
  const highCount = last7.filter(h => h.routine === "high").length;

  const dayPattern = Array(7).fill(null).map(() => []);
  history.forEach(h => { const d = new Date(h.date); if (!isNaN(d)) dayPattern[d.getDay()].push(h.moodScore); });
  const dayAvgs = dayPattern.map(s => s.length ? s.reduce((a, b) => a + b, 0) / s.length : null);

  return (
    <div>
      <h2 style={{ fontFamily: "'Crimson Text', serif", color: C.text, fontSize: 24, fontWeight: 400, margin: "0 0 4px" }}>Your patterns</h2>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>{history.length} days logged. Keep going — cycles take a few weeks to appear.</p>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 12, fontWeight: 500 }}>Last 28 days</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
          {DAYS.map(d => <div key={d} style={{ textAlign: "center", color: C.muted, fontSize: 10 }}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {days.map(({ date, key, entry }) => (
            <div key={key} onClick={() => entry && setSelected(selected?.key === key ? null : { key, entry, date })}
              style={{
                aspectRatio: "1", borderRadius: 8,
                cursor: entry ? "pointer" : "default",
                background: entry ? rColor[entry.routine] + "30" : C.surface,
                border: `1px solid ${entry ? rColor[entry.routine] + "55" : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, transition: "all 0.15s",
                boxShadow: selected?.key === key ? `0 0 0 2px ${rColor[entry?.routine]}` : "none",
              }}>
              {entry ? rEmoji[entry.routine] : ""}
            </div>
          ))}
        </div>
      </Card>

      {selected && (
        <div style={{
          borderRadius: 14, padding: "16px 18px", marginBottom: 14,
          background: selected.entry ? ROUTINES[selected.entry.routine].bg : C.card,
          border: `1px solid ${selected.entry ? rColor[selected.entry.routine] + "55" : C.border}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: C.textSoft, fontSize: 12 }}>
                {selected.date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              </div>
              <div style={{ color: rColor[selected.entry.routine], fontFamily: "'Crimson Text', serif", fontSize: 18, marginTop: 3 }}>
                {rEmoji[selected.entry.routine]} {ROUTINES[selected.entry.routine].label} · Mood {selected.entry.moodScore}/10
              </div>
              {selected.entry.journal && (
                <div style={{ color: C.textSoft, fontSize: 13, marginTop: 10, fontStyle: "italic", lineHeight: 1.6 }}>
                  "{selected.entry.journal}"
                </div>
              )}
            </div>
            <button onClick={() => setSelected(null)} style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 20 }}>×</button>
          </div>
        </div>
      )}

      {last7.length >= 3 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { label: "Avg mood (7d)", value: avgMood + "/10", color: C.accent },
            { label: "Low days (7d)", value: lowCount, color: C.low },
            { label: "Good days (7d)", value: highCount, color: C.high },
          ].map(s => (
            <Card key={s.label} style={{ textAlign: "center", padding: "14px 10px" }}>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 600, fontFamily: "'Crimson Text', serif" }}>{s.value}</div>
              <div style={{ color: C.muted, fontSize: 10, marginTop: 4 }}>{s.label}</div>
            </Card>
          ))}
        </div>
      )}

      {history.length >= 7 && (
        <Card>
          <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 14, fontWeight: 500 }}>Average mood by day of week</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 72 }}>
            {DAYS.map((day, i) => {
              const avg = dayAvgs[i];
              const h = avg ? (avg / 10) * 64 : 3;
              const col = avg ? (avg <= 4 ? C.low : avg <= 7 ? C.mid : C.high) : C.border;
              return (
                <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <div style={{ width: "100%", height: h, borderRadius: 5, background: col, minHeight: 3, transition: "height 0.4s" }} />
                  <div style={{ color: C.muted, fontSize: 10 }}>{day}</div>
                </div>
              );
            })}
          </div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 12, lineHeight: 1.6 }}>
            {(() => {
              const valid = dayAvgs.map((a, i) => ({ a, d: DAYS[i] })).filter(x => x.a !== null);
              if (valid.length < 3) return "Keep logging to see which days tend to be harder.";
              const lo = valid.reduce((a, b) => a.a < b.a ? a : b);
              const hi = valid.reduce((a, b) => a.a > b.a ? a : b);
              return `${lo.d}s tend to be your hardest · ${hi.d}s tend to be your best — this is useful data for a doctor if you're exploring PMDD or bipolar.`;
            })()}
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Customise View ───────────────────────────────────────────────────────────

function StepEditor({ steps, onChange, color }) {
  const update = (idx, field, val) => onChange(steps.map((x, i) => i === idx ? { ...x, [field]: val } : x));
  const remove = (idx) => onChange(steps.filter((_, i) => i !== idx));
  const add = () => onChange([...steps, { id: `c_${Date.now()}`, icon: "⭐", title: "", detail: "", time: "" }]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {steps.map((step, idx) => (
          <div key={step.id} style={{ background: C.card, borderRadius: 12, padding: "13px 15px", border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <input value={step.icon} onChange={e => update(idx, "icon", e.target.value)} style={{ width: 34, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 4px", color: C.text, fontSize: 16, textAlign: "center" }} />
              <input value={step.title} onChange={e => update(idx, "title", e.target.value)} placeholder="Step title" style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", color: C.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
              <input value={step.time || ""} onChange={e => update(idx, "time", e.target.value)} placeholder="Time" style={{ width: 60, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 8px", color: C.muted, fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} />
              <button onClick={() => remove(idx)} style={{ background: "transparent", border: "none", color: C.low, cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
            </div>
            <input value={step.detail} onChange={e => update(idx, "detail", e.target.value)} placeholder="Description or encouragement" style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", color: C.muted, fontSize: 12, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
      <button onClick={add} style={{ width: "100%", padding: "10px", borderRadius: 10, border: `1px dashed ${C.border}`, background: "transparent", color: C.muted, cursor: "pointer", fontSize: 13, marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>+ Add step</button>
    </div>
  );
}

function CustomiseView({ customRoutines, onSave }) {
  const [editing, setEditing] = useState(null);
  const [steps, setSteps] = useState([]);
  const [bonusSteps, setBonusSteps] = useState([]);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("main");

  const startEditing = (level) => {
    const r = customRoutines[level] || ROUTINES[level];
    setSteps(r.steps.map(s => ({ ...s })));
    setBonusSteps((customRoutines[level]?.bonusSteps || ROUTINES[level]?.bonusSteps || []).map(s => ({ ...s })));
    setEditing(level); setSaved(false); setActiveTab("main");
  };

  const handleSave = () => {
    onSave(editing, steps.filter(s => s.title.trim()), bonusSteps.filter(s => s.title.trim()));
    setSaved(true);
    setTimeout(() => { setEditing(null); setSaved(false); }, 900);
  };

  if (editing) {
    const r = ROUTINES[editing];
    const hasBonusSteps = !!r.bonusSteps;
    return (
      <div>
        <button onClick={() => setEditing(null)} style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 14, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>← Back</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 28 }}>{r.emoji}</span>
          <div>
            <div style={{ color: r.color, fontFamily: "'Crimson Text', serif", fontSize: 20 }}>{r.label}</div>
            <div style={{ color: C.muted, fontSize: 12 }}>Edit steps to match your life</div>
          </div>
        </div>

        {hasBonusSteps && (
          <div style={{ display: "flex", gap: 3, background: C.card, borderRadius: 12, padding: 4, marginBottom: 20, border: `1px solid ${C.border}` }}>
            {["main", "bonus"].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                flex: 1, padding: "8px", borderRadius: 9, border: "none", cursor: "pointer",
                background: activeTab === t ? C.surface : "transparent",
                color: activeTab === t ? C.text : C.muted,
                fontSize: 12, fontWeight: activeTab === t ? 600 : 400,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {t === "main" ? "Main steps" : "✦ Bonus steps"}
              </button>
            ))}
          </div>
        )}

        {activeTab === "main" && <StepEditor steps={steps} onChange={setSteps} color={r.color} />}
        {activeTab === "bonus" && hasBonusSteps && (
          <div>
            <p style={{ color: C.muted, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>These appear when you check in as feeling better after the main routine.</p>
            <StepEditor steps={bonusSteps} onChange={setBonusSteps} color={r.color} />
          </div>
        )}

        <Btn onClick={handleSave} style={{ width: "100%", background: saved ? C.high : C.accent }}>{saved ? "✓ Saved!" : "Save routine"}</Btn>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontFamily: "'Crimson Text', serif", color: C.text, fontSize: 24, fontWeight: 400, margin: "0 0 6px" }}>Your routines</h2>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20, lineHeight: 1.65 }}>Adjust the steps for each day type to match what actually works for you.</p>
      {["low", "mid", "high"].map(level => {
        const r = ROUTINES[level];
        const current = customRoutines[level] || r;
        const isCustom = !!customRoutines[level];
        return (
          <div key={level} style={{ background: r.bg, borderRadius: 14, padding: "16px 18px", marginBottom: 12, border: `1px solid ${r.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ color: r.color, fontFamily: "'Crimson Text', serif", fontSize: 18 }}>{r.emoji} {r.label}</div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{current.steps.length} steps · {isCustom ? "✏️ customised" : "default"}</div>
              </div>
              <button onClick={() => startEditing(level)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${r.color}66`, background: "transparent", color: r.color, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {current.steps.slice(0, 5).map(s => (
                <span key={s.id} style={{ padding: "3px 10px", borderRadius: 20, background: r.color + "20", color: r.color, fontSize: 11 }}>{s.icon} {s.title}</span>
              ))}
              {current.steps.length > 5 && (
                <span style={{ padding: "3px 10px", borderRadius: 20, background: C.border, color: C.muted, fontSize: 11 }}>+{current.steps.length - 5} more</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("checkin");
  const [step, setStep] = useState("questions");
  const [answers, setAnswers] = useState({});
  const [moodScore, setMoodScore] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [todayEntry, setTodayEntry] = useState(null);
  const [history, setHistory] = useState([]);
  const [customRoutines, setCustomRoutines] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [h, c] = await Promise.allSettled([
          Promise.resolve(localStorage.getItem("toolkit_history") ? { value: localStorage.getItem("toolkit_history") } : null),
          Promise.resolve(localStorage.getItem("toolkit_custom") ? { value: localStorage.getItem("toolkit_custom") } : null),
        ]);
        if (h.status === "fulfilled" && h.value) setHistory(JSON.parse(h.value.value));
        if (c.status === "fulfilled" && c.value) setCustomRoutines(JSON.parse(c.value.value));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const handleAnswer = (id, val) => setAnswers(a => ({ ...a, [id]: val }));

  const allAnswered = CHECK_IN_QUESTIONS.every(q => answers[q.id] !== undefined);

  const buildRoutine = () => {
    let score = 0;
    CHECK_IN_QUESTIONS.forEach(q => {
      const ans = answers[q.id];
      if (q.type === "yesno" && ans !== undefined) score += ans ? q.yes : q.no;
      if (q.type === "select" && ans !== undefined) score += ans;
    });

    // Wider range now with HRV/battery/sleep: roughly -13 to +13
    const derived = Math.round(((score + 13) / 26) * 9) + 1;
    const clamped = Math.max(1, Math.min(10, derived));
    setMoodScore(clamped);

    const key = clamped <= 4 ? "low" : clamped <= 7 ? "mid" : "high";
    const base = { ...ROUTINES[key] };
    if (customRoutines[key]) {
      base.steps = customRoutines[key].steps;
      if (customRoutines[key].bonusSteps) base.bonusSteps = customRoutines[key].bonusSteps;
    }

    const entry = { date: new Date().toLocaleDateString(), moodScore: clamped, answers, routine: key, journal: "" };
    setTodayEntry(entry);
    setRoutine(base);
    setStep("routine");
  };

  const handleSaveJournal = (text) => {
    if (!todayEntry) return;
    const updated = { ...todayEntry, journal: text };
    setTodayEntry(updated);
    const newH = [updated, ...history.filter(h => h.date !== updated.date)].slice(0, 90);
    setHistory(newH);
    try { localStorage.setItem("toolkit_history", JSON.stringify(newH)); } catch {}
  };

  const handleCustomSave = (level, steps, bonusSteps) => {
    const updated = { ...customRoutines, [level]: { steps, bonusSteps } };
    setCustomRoutines(updated);
    try { localStorage.setItem("toolkit_custom", JSON.stringify(updated)); } catch {}
  };

  const reset = () => {
    if (todayEntry) {
      const newH = [todayEntry, ...history.filter(h => h.date !== todayEntry.date)].slice(0, 90);
      setHistory(newH);
      try { localStorage.setItem("toolkit_history", JSON.stringify(newH)); } catch {}
    }
    setStep("questions"); setAnswers({}); setMoodScore(null); setRoutine(null); setTodayEntry(null);
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: C.muted, fontSize: 14 }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 16px 56px", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ color: C.accentDim, letterSpacing: 5, fontSize: 10, textTransform: "uppercase", marginBottom: 8 }}>Daily Toolkit</div>
          <h1 style={{ fontFamily: "'Crimson Text', serif", fontSize: 32, color: C.text, margin: 0, fontWeight: 400, lineHeight: 1.2 }}>
            Good morning
          </h1>
        </div>

        <TabBar
          tabs={[
            { id: "checkin", icon: "🌙", label: "Check-in" },
            { id: "patterns", icon: "📊", label: "Patterns" },
            { id: "customise", icon: "✏️", label: "Routines" },
          ]}
          active={tab}
          onChange={setTab}
        />

        <div style={{ background: C.surface, borderRadius: 20, padding: "26px 22px", border: `1px solid ${C.border}` }}>
          {tab === "checkin" && step === "questions" && (
            <div>
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ fontFamily: "'Crimson Text', serif", color: C.text, fontSize: 22, fontWeight: 400, margin: "0 0 6px" }}>
                  Let's figure out today
                </h2>
                <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.65 }}>
                  Answer honestly — this builds your routine for the morning.
                </p>
              </div>
              <CheckInQuestions answers={answers} onChange={handleAnswer} />
              <Btn onClick={buildRoutine} disabled={!allAnswered} style={{ width: "100%", marginTop: 22 }}>
                Build my morning →
              </Btn>
            </div>
          )}

          {tab === "checkin" && step === "routine" && routine && (
            <RoutineView routine={routine} onReset={reset} onSaveJournal={handleSaveJournal} />
          )}

          {tab === "patterns" && <PatternView history={history} />}
          {tab === "customise" && <CustomiseView customRoutines={customRoutines} onSave={handleCustomSave} />}
        </div>

        <p style={{ textAlign: "center", color: C.muted, fontSize: 10, marginTop: 18, lineHeight: 1.8 }}>
          Everything stays on your device. Nothing is shared.
        </p>
      </div>
    </div>
  );
}