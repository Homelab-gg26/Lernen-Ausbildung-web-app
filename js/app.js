/* ── Datenregister ──────────────────────────────────────────── */
const REGISTRY = {
  'fi-si': DATA_FI_SI,
  'fi-ae': DATA_FI_AE,
  'wiso':  DATA_WISO
};

/* ── Quiz-Code Store (im localStorage simuliert) ───────────── */
const QUIZ_STORE_KEY = 'quizCodes';

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function saveQuizCode(code, config) {
  const store = JSON.parse(localStorage.getItem(QUIZ_STORE_KEY) || '{}');
  store[code] = { ...config, created: Date.now() };
  localStorage.setItem(QUIZ_STORE_KEY, JSON.stringify(store));
}

function loadQuizCode(code) {
  const store = JSON.parse(localStorage.getItem(QUIZ_STORE_KEY) || '{}');
  const entry = store[code.toUpperCase().trim()];
  if (!entry) return null;
  if (Date.now() - entry.created > 24 * 60 * 60 * 1000) return null; // 24h TTL
  return entry;
}

/* ── State ─────────────────────────────────────────────────── */
const state = {
  profession: null,  // 'fi-si' | 'fi-ae' | 'wiso'
  exam: null,        // 'ap1' | 'ap2' | 'wiso'
  topic: null,
  cardIndex: 0,
  quiz: {
    questions: [], current: 0, score: 0, streak: 0,
    answered: false, timer: null, timeLeft: 20, results: []
  }
};

const progress = JSON.parse(localStorage.getItem('lernProgress') || '{}');

function saveProgress() { localStorage.setItem('lernProgress', JSON.stringify(progress)); }

function getTopicProgress(profId, examId, topicId) {
  return progress[`${profId}_${examId}_${topicId}`] || { learned: false, bestScore: 0, attempts: 0 };
}

function setTopicProgress(profId, examId, topicId, data) {
  const key = `${profId}_${examId}_${topicId}`;
  progress[key] = { ...getTopicProgress(profId, examId, topicId), ...data };
  saveProgress();
}

/* ── Theme (Dark / Light) ───────────────────────────────────── */
const THEME_KEY = 'appTheme';

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem(THEME_KEY, theme);
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.textContent = theme === 'light' ? '🌙' : '☀️';
    btn.title = theme === 'light' ? 'Dark Mode' : 'Light Mode';
  });
}

function toggleTheme() {
  applyTheme(getTheme() === 'light' ? 'dark' : 'light');
}

function themeBtn() {
  const t = getTheme();
  return `<button class="theme-toggle-btn" onclick="toggleTheme()" title="${t === 'light' ? 'Dark Mode' : 'Light Mode'}">${t === 'light' ? '🌙' : '☀️'}</button>`;
}

/* ── Helpers ───────────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function currentData() { return REGISTRY[state.profession]; }
function currentExam() { return currentData()?.exams[state.exam]; }

const app = document.getElementById('app');
function render(html) { app.innerHTML = html; }

/* ════════════════════════════════════════════════════════════
   SCREEN 0 – Startseite (Berufsauswahl)
   ════════════════════════════════════════════════════════════ */
function showHome() {
  state.profession = null;
  state.exam = null;
  state.topic = null;

  const profCards = Object.values(REGISTRY).map(d => {
    const examList = Object.values(d.exams);
    const totalQ = examList.reduce((s, e) => s + e.topics.reduce((ts, t) => ts + t.questions.length, 0), 0);
    const totalC = examList.reduce((s, e) => s + e.topics.reduce((ts, t) => ts + t.cards.length, 0), 0);
    const totalT = examList.reduce((s, e) => s + e.topics.length, 0);
    const examBadges = examList.map(e => `<span class="card-chip">${e.name}</span>`).join('');
    return `
    <div class="subject-card prof-card ${d.id} screen-fade" onclick="showProfession('${d.id}')">
      <span class="card-bg-icon">${d.icon}</span>
      <span class="card-icon">${d.icon}</span>
      <h2>${d.shortName}</h2>
      <div class="card-subtitle">${d.name}</div>
      <div class="card-meta" style="margin-bottom:12px">${examBadges}</div>
      <div class="card-meta">
        <span class="card-chip">📚 ${totalC} Karten</span>
        <span class="card-chip">❓ ${totalQ} Fragen</span>
        <span class="card-chip">🏆 ${totalT} Themen</span>
      </div>
    </div>`;
  }).join('');

  render(`
    <div class="screen screen-fade">
      <div class="home-hero">
        <button class="settings-nav-btn" onclick="showSettings('home')" title="Einstellungen">⚙️</button>
        <button class="theme-toggle-home-btn" onclick="toggleTheme()" title="Theme wechseln" style="position:absolute;top:18px;right:66px;width:38px;height:38px;border-radius:50%;background:var(--surface);border:1px solid var(--border);font-size:1rem;display:flex;align-items:center;justify-content:center;transition:var(--transition);z-index:10;box-shadow:var(--shadow-sm);">${getTheme() === 'light' ? '🌙' : '☀️'}</button>
        <span class="logo-icon">⚡</span>
        <h1>IT-Lernplattform</h1>
        ${loadSettings().profile.name
          ? `<div class="home-welcome">${loadSettings().profile.avatar} Hallo, <strong>${loadSettings().profile.name}</strong>!</div>`
          : ''}
        <p>Vorbereitung auf AP1 &amp; AP2 – spielerisch wie Kahoot, strukturiert wie die IHK-Prüfung.</p>
      </div>
      <div class="subjects-grid">${profCards}</div>
      <div class="quiz-code-entry screen-fade">
        <div class="qce-inner">
          <span class="qce-icon">🎮</span>
          <h3>Quiz-Code eingeben</h3>
          <p>Tritt einem Quiz bei, das von deinem Lehrer oder Freund erstellt wurde.</p>
          <div class="qce-input-row">
            <input type="text" id="codeInput" class="qce-input" placeholder="z.B. ABC123" maxlength="6"
              oninput="this.value=this.value.toUpperCase()" onkeydown="if(event.key==='Enter')joinByCode()">
            <button class="qce-btn" onclick="joinByCode()">Beitreten →</button>
          </div>
          <div id="codeError" class="qce-error hidden"></div>
        </div>
      </div>
    </div>
  `);
}

function joinByCode() {
  const input = document.getElementById('codeInput').value.trim().toUpperCase();
  const err = document.getElementById('codeError');
  if (input.length < 6) {
    err.textContent = 'Bitte einen 6-stelligen Code eingeben.';
    err.classList.remove('hidden');
    return;
  }
  const config = loadQuizCode(input);
  if (!config) {
    err.textContent = 'Code nicht gefunden oder abgelaufen. Bitte prüfe den Code.';
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  state.profession = config.profId;
  state.exam = config.examId;
  startQuiz(config.profId, config.examId, config.topicId || null, true);
}

/* ════════════════════════════════════════════════════════════
   SCREEN 1 – Berufsauswahl → Prüfungsauswahl
   ════════════════════════════════════════════════════════════ */
function showProfession(profId) {
  state.profession = profId;
  const d = REGISTRY[profId];

  const examCards = Object.values(d.exams).map(e => {
    const totalQ = e.topics.reduce((s, t) => s + t.questions.length, 0);
    const totalC = e.topics.reduce((s, t) => s + t.cards.length, 0);
    return `
    <div class="subject-card exam-card screen-fade" style="background:linear-gradient(135deg,${d.color},${d.color2||d.color})" onclick="showExam('${profId}','${e.id}')">
      <span class="card-bg-icon">${e.icon}</span>
      <span class="card-icon">${e.icon}</span>
      <h2>${e.name}</h2>
      <div class="card-subtitle">${e.fullName}</div>
      <div class="card-desc">${e.desc}</div>
      <div class="card-meta">
        <span class="card-chip">📚 ${totalC} Karten</span>
        <span class="card-chip">❓ ${totalQ} Fragen</span>
      </div>
    </div>`;
  }).join('');

  render(`
    <div class="screen screen-fade">
      <nav class="topnav">
        <button class="topnav-back" onclick="showHome()"><span class="arrow">←</span> Start</button>
        <div class="topnav-title">${d.icon} ${d.shortName}</div>
        <div class="topnav-right">${themeBtn()}</div>
      </nav>
      <div class="subject-header">
        <div class="icon">${d.icon}</div>
        <h1>${d.name}</h1>
        <p>Wähle die Prüfung, für die du lernen möchtest.</p>
      </div>
      <div class="subjects-grid">${examCards}</div>
    </div>
  `);
}

/* ════════════════════════════════════════════════════════════
   SCREEN 2 – Themenauswahl
   ════════════════════════════════════════════════════════════ */
function showExam(profId, examId) {
  state.profession = profId;
  state.exam = examId;
  const d = REGISTRY[profId];
  const exam = d.exams[examId];

  const topicRows = exam.topics.map(t => {
    const p = getTopicProgress(profId, examId, t.id);
    const pct = p.attempts > 0 ? Math.round(p.bestScore) : 0;
    return `
    <div class="topic-row">
      <div class="topic-icon" style="background:${t.color}22"><span style="color:${t.color}">${t.icon}</span></div>
      <div class="topic-info">
        <h3>${t.name}</h3>
        <p>${t.cards.length} Karten · ${t.questions.length} Fragen</p>
      </div>
      <div class="topic-progress-wrap">
        <div class="topic-progress-bar">
          <div class="topic-progress-fill" style="width:${pct}%;background:${t.color}"></div>
        </div>
        <div class="topic-progress-label">${pct}%</div>
      </div>
      <div class="topic-actions">
        <button class="btn-learn" onclick="showLearn('${profId}','${examId}','${t.id}')">📖 Lernen</button>
        <button class="btn-quiz" style="background:linear-gradient(135deg,${d.color},${d.color2||d.color})"
          onclick="startQuiz('${profId}','${examId}','${t.id}')">⚡ Quiz</button>
      </div>
    </div>`;
  }).join('');

  render(`
    <div class="screen screen-fade">
      <nav class="topnav">
        <button class="topnav-back" onclick="showProfession('${profId}')"><span class="arrow">←</span> ${d.shortName}</button>
        <div class="topnav-title">${exam.icon} ${exam.name}</div>
        <div class="topnav-right">${themeBtn()}</div>
      </nav>
      <div class="subject-header">
        <div class="icon">${exam.icon}</div>
        <h1>${exam.fullName}</h1>
        <p>${exam.desc}</p>
      </div>
      <div style="text-align:center;margin-bottom:8px">
        <button class="mixed-quiz-btn" style="background:linear-gradient(135deg,${d.color},${d.color2||d.color})"
          onclick="startQuiz('${profId}','${examId}',null)">🎯 Gemischtes Quiz</button>
        <button class="share-quiz-btn" onclick="showShareModal('${profId}','${examId}',null)">🔗 Quiz-Code erstellen</button>
      </div>
      <p class="section-title">THEMEN</p>
      <div class="topics-list">${topicRows}</div>
    </div>
  `);
}

/* ════════════════════════════════════════════════════════════
   SCREEN 3 – Lernkarten
   ════════════════════════════════════════════════════════════ */
function showLearn(profId, examId, topicId) {
  state.profession = profId;
  state.exam = examId;
  const exam = REGISTRY[profId].exams[examId];
  state.topic = exam.topics.find(t => t.id === topicId);
  state.cardIndex = 0;
  renderLearnCard();
}

function renderLearnCard() {
  const d = currentData();
  const exam = currentExam();
  const topic = state.topic;
  const idx = state.cardIndex;
  const card = topic.cards[idx];
  const total = topic.cards.length;
  const pct = Math.round(((idx + 1) / total) * 100);

  const diagram = card.diagram ? `<div class="diagram-wrap">${card.diagram}</div>` : '';
  const keyPoints = card.keyPoints ? `
    <div class="key-points">
      <h4>Kernpunkte</h4>
      <ul>${card.keyPoints.map(k => `<li>${k}</li>`).join('')}</ul>
    </div>` : '';
  const tip = card.tip ? `
    <div class="exam-tip">
      <span class="tip-icon">💡</span>
      <span><strong>Prüfungstipp:</strong> ${card.tip}</span>
    </div>` : '';

  const isLast = idx === total - 1;
  const prevBtn = idx > 0
    ? `<button class="btn-nav btn-nav-prev" onclick="learnNav(-1)">← Zurück</button>`
    : `<div></div>`;
  const nextBtn = isLast
    ? `<button class="btn-nav btn-nav-next finish" onclick="finishLearn()">✅ Fertig → Quiz</button>`
    : `<button class="btn-nav btn-nav-next" onclick="learnNav(1)">Weiter →</button>`;

  render(`
    <div class="screen screen-fade">
      <nav class="topnav">
        <button class="topnav-back" onclick="showExam('${state.profession}','${state.exam}')">
          <span class="arrow">←</span> ${exam.name}
        </button>
        <div class="topnav-title">${topic.icon} ${topic.name}</div>
        <div class="topnav-right">${themeBtn()}</div>
      </nav>
      <div class="learn-container">
        <div class="learn-progress">
          <div class="learn-progress-bar">
            <div class="learn-progress-fill" style="width:${pct}%;background:linear-gradient(90deg,${d.color},${d.color2||d.color})"></div>
          </div>
          <div class="learn-progress-label">${idx + 1} / ${total}</div>
        </div>
        <div class="learn-card">
          <h2>${card.icon || '📖'} ${card.title}</h2>
          <div class="card-body">${card.body}</div>
          ${diagram}${keyPoints}${tip}
        </div>
        <div class="learn-nav">${prevBtn}${nextBtn}</div>
      </div>
    </div>
  `);
}

function learnNav(dir) {
  state.cardIndex = Math.max(0, Math.min(state.topic.cards.length - 1, state.cardIndex + dir));
  renderLearnCard();
}

function finishLearn() {
  setTopicProgress(state.profession, state.exam, state.topic.id, { learned: true });
  startQuiz(state.profession, state.exam, state.topic.id);
}

/* ════════════════════════════════════════════════════════════
   QUIZ-CODE MODAL
   ════════════════════════════════════════════════════════════ */
function showShareModal(profId, examId, topicId) {
  const code = generateCode();
  saveQuizCode(code, { profId, examId, topicId });
  const d = REGISTRY[profId];
  const exam = d.exams[examId];
  const topicName = topicId ? exam.topics.find(t => t.id === topicId)?.name : 'Gemischtes Quiz';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'shareModal';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <h2>🔗 Quiz-Code erstellt</h2>
        <button class="modal-close" onclick="document.getElementById('shareModal').remove()">✕</button>
      </div>
      <div class="modal-body">
        <p class="modal-sub">${d.shortName} · ${exam.name} · ${topicName}</p>
        <div class="code-display">
          <span class="code-letters">${code}</span>
        </div>
        <p class="modal-hint">Gib diesen Code auf der Startseite ein, um das Quiz zu starten.<br>Der Code ist <strong>24 Stunden</strong> gültig.</p>
        <button class="btn-copy" onclick="navigator.clipboard.writeText('${code}').then(()=>{this.textContent='✅ Kopiert!'})">
          📋 Code kopieren
        </button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

/* ════════════════════════════════════════════════════════════
   SCREEN 4 – Quiz
   ════════════════════════════════════════════════════════════ */
const COLORS = ['color-red', 'color-blue', 'color-yellow', 'color-green'];
const SHAPES = ['▲', '◆', '●', '■'];
const TIME_LIMIT = 20;

function startQuiz(profId, examId, topicId, fromCode = false) {
  state.profession = profId;
  state.exam = examId;
  const exam = REGISTRY[profId].exams[examId];

  let pool;
  if (topicId) {
    const t = exam.topics.find(t => t.id === topicId);
    state.topic = t;
    pool = t.questions.map(q => ({ ...q, topicId }));
  } else {
    state.topic = null;
    pool = exam.topics.flatMap(t => t.questions.map(q => ({ ...q, topicId: t.id })));
  }

  const q = state.quiz;
  q.questions = shuffle(pool).slice(0, Math.min(pool.length, 15));
  q.current = 0;
  q.score = 0;
  q.streak = 0;
  q.answered = false;
  q.results = [];
  clearInterval(q.timer);

  if (fromCode) {
    showQuizCodeIntro(profId, examId, topicId);
  } else {
    renderQuizQuestion();
  }
}

function showQuizCodeIntro(profId, examId, topicId) {
  const d = REGISTRY[profId];
  const exam = d.exams[examId];
  const topicName = topicId ? exam.topics.find(t => t.id === topicId)?.name : 'Gemischtes Quiz';

  render(`
    <div class="screen screen-fade" style="align-items:center;justify-content:center;display:flex;flex-direction:column;min-height:100vh;text-align:center;padding:40px 24px">
      <div style="font-size:80px;margin-bottom:16px">🎮</div>
      <h1 style="font-size:2rem;font-weight:900;margin-bottom:8px">Quiz bereit!</h1>
      <p style="color:var(--text-muted);font-size:1.1rem;margin-bottom:8px">${d.shortName} · ${exam.name}</p>
      <p style="font-size:1.3rem;font-weight:800;margin-bottom:32px">${topicName}</p>
      <div class="results-stats" style="margin-bottom:32px">
        <div class="results-stat"><span class="rs-num">${state.quiz.questions.length}</span><span class="rs-label">Fragen</span></div>
        <div class="results-stat"><span class="rs-num">20s</span><span class="rs-label">Pro Frage</span></div>
      </div>
      <button class="btn-retry" style="font-size:1.2rem;padding:16px 48px" onclick="renderQuizQuestion()">
        🚀 Quiz starten!
      </button>
    </div>
  `);
}

function renderQuizQuestion() {
  const q = state.quiz;
  const d = currentData();
  const qData = q.questions[q.current];
  const total = q.questions.length;
  const shuffled = shuffle(qData.options.map((text, i) => ({ text, origIndex: i })));

  q.answered = false;
  q._shuffledOptions = shuffled;

  const optBtns = shuffled.map((opt, i) => `
    <button class="quiz-answer-btn ${COLORS[i]}" onclick="answerQuiz(${i})" id="qbtn-${i}">
      <span class="ans-shape">${SHAPES[i]}</span>
      <span>${opt.text}</span>
    </button>`).join('');

  render(`
    <div class="quiz-shell">
      <div class="quiz-topbar">
        <button class="topnav-back" onclick="confirmExitQuiz()">✕ Ende</button>
        <div class="quiz-score-box">⭐ <span class="quiz-score-num" id="score-disp">${q.score}</span></div>
        <div class="quiz-streak" id="streak-disp">🔥 ${q.streak}</div>
        <div class="quiz-qnum">${q.current + 1} / ${total}</div>
      </div>
      <div class="quiz-timer-track">
        <div class="quiz-timer-fill" id="timer-bar" style="width:100%;background:${d.color}"></div>
      </div>
      <div class="quiz-question-area">
        <div class="quiz-question-text">${qData.q}</div>
        <div class="quiz-timer-text" id="timer-text">${TIME_LIMIT}</div>
      </div>
      <div class="quiz-answers">${optBtns}</div>
    </div>
  `);

  startTimer();
}

function confirmExitQuiz() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'exitModal';
  overlay.innerHTML = `
    <div class="modal-box" style="text-align:center">
      <h2 style="margin-bottom:12px">Quiz beenden?</h2>
      <p style="color:var(--text-muted);margin-bottom:24px">Dein Fortschritt in diesem Quiz geht verloren.</p>
      <div style="display:flex;gap:12px;justify-content:center">
        <button class="btn-nav btn-nav-prev" onclick="document.getElementById('exitModal').remove()">Weiter spielen</button>
        <button class="btn-retry" onclick="exitQuiz()">Beenden</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

function exitQuiz() {
  clearInterval(state.quiz.timer);
  document.getElementById('exitModal')?.remove();
  showExam(state.profession, state.exam);
}

function startTimer() {
  const q = state.quiz;
  q.timeLeft = TIME_LIMIT;
  clearInterval(q.timer);
  q.timer = setInterval(() => {
    q.timeLeft--;
    const bar = document.getElementById('timer-bar');
    const txt = document.getElementById('timer-text');
    if (!bar) { clearInterval(q.timer); return; }
    const pct = (q.timeLeft / TIME_LIMIT) * 100;
    bar.style.width = pct + '%';
    bar.style.backgroundColor = q.timeLeft <= 5 ? '#e21b3c' : q.timeLeft <= 10 ? '#d89e00' : currentData().color;
    txt.textContent = q.timeLeft;
    if (q.timeLeft <= 5) txt.classList.add('urgent'); else txt.classList.remove('urgent');
    if (q.timeLeft <= 0) { clearInterval(q.timer); handleTimeout(); }
  }, 1000);
}

function answerQuiz(btnIdx) {
  if (state.quiz.answered) return;
  clearInterval(state.quiz.timer);
  state.quiz.answered = true;

  const q = state.quiz;
  const qData = q.questions[q.current];
  const chosen = q._shuffledOptions[btnIdx];
  const isCorrect = chosen.origIndex === qData.correct;
  const correctBtnIdx = q._shuffledOptions.findIndex(o => o.origIndex === qData.correct);

  document.querySelectorAll('.quiz-answer-btn').forEach(b => b.disabled = true);

  if (isCorrect) {
    document.getElementById(`qbtn-${btnIdx}`)?.classList.add('correct');
    const points = 10 + Math.round(q.timeLeft * 2);
    q.score += points;
    q.streak++;
    q.results.push({ correct: true, points, q: qData.q });
    showFeedback(true, points, qData.explanation, null);
  } else {
    document.getElementById(`qbtn-${btnIdx}`)?.classList.add('wrong');
    document.getElementById(`qbtn-${correctBtnIdx}`)?.classList.add('reveal-correct');
    q.streak = 0;
    q.results.push({ correct: false, points: 0, q: qData.q });
    showFeedback(false, 0, qData.explanation, q._shuffledOptions[correctBtnIdx].text);
  }

  const scoreEl = document.getElementById('score-disp');
  const streakEl = document.getElementById('streak-disp');
  if (scoreEl) scoreEl.textContent = q.score;
  if (streakEl) streakEl.textContent = `🔥 ${q.streak}`;
}

function handleTimeout() {
  const q = state.quiz;
  if (q.answered) return;
  q.answered = true;
  q.streak = 0;
  const qData = q.questions[q.current];
  const correctBtnIdx = q._shuffledOptions.findIndex(o => o.origIndex === qData.correct);
  document.querySelectorAll('.quiz-answer-btn').forEach(b => b.disabled = true);
  document.getElementById(`qbtn-${correctBtnIdx}`)?.classList.add('reveal-correct');
  q.results.push({ correct: false, points: 0, timeout: true, q: qData.q });
  showFeedback('timeout', 0, qData.explanation, q._shuffledOptions[correctBtnIdx]?.text);
}

function showFeedback(result, points, explanation, correctText) {
  const isCorrect = result === true;
  const isTimeout = result === 'timeout';
  const emojis = isCorrect ? ['🎉','⚡','🚀','💥','✨'] : isTimeout ? ['⏰'] : ['😬','💀','🤔','😅'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const title = isCorrect ? 'Richtig!' : isTimeout ? 'Zeit abgelaufen!' : 'Falsch!';
  const cls = isCorrect ? 'feedback-correct' : isTimeout ? 'feedback-timeout' : 'feedback-wrong';

  const overlay = document.createElement('div');
  overlay.className = 'quiz-feedback';
  overlay.innerHTML = `
    <div class="quiz-feedback-box ${cls}">
      <span class="feedback-emoji">${emoji}</span>
      <div class="feedback-title">${title}</div>
      ${isCorrect ? `<div class="feedback-points">+${points} Punkte ⭐</div>` : ''}
      ${(!isCorrect && correctText) ? `<div class="feedback-correct-ans">Richtige Antwort: <strong>${correctText}</strong></div>` : ''}
      <div class="feedback-explanation">${explanation}</div>
      <button class="btn-next-q" onclick="nextQuestion()">Weiter →</button>
    </div>`;
  document.body.appendChild(overlay);
}

function nextQuestion() {
  document.querySelectorAll('.quiz-feedback').forEach(el => el.remove());
  const q = state.quiz;
  q.current++;
  if (q.current >= q.questions.length) showResults();
  else renderQuizQuestion();
}

/* ════════════════════════════════════════════════════════════
   SCREEN 5 – Ergebnisse
   ════════════════════════════════════════════════════════════ */
function showResults() {
  clearInterval(state.quiz.timer);
  const q = state.quiz;
  const correct = q.results.filter(r => r.correct).length;
  const pct = Math.round((correct / q.questions.length) * 100);
  const d = currentData();
  const exam = currentExam();

  if (state.topic) {
    const prev = getTopicProgress(state.profession, state.exam, state.topic.id);
    const attempts = (prev.attempts || 0) + 1;
    if (pct > (prev.bestScore || 0)) {
      setTopicProgress(state.profession, state.exam, state.topic.id, { bestScore: pct, attempts });
    } else {
      setTopicProgress(state.profession, state.exam, state.topic.id, { attempts });
    }
  }

  const gradeInfo = pct >= 80
    ? { cls: 'grade-excellent', label: '🏆 Ausgezeichnet!' }
    : pct >= 60 ? { cls: 'grade-good', label: '👍 Gut gemacht!' }
    : pct >= 40 ? { cls: 'grade-ok', label: '😐 Noch üben' }
    : { cls: 'grade-retry', label: '💪 Nochmal!' };

  const trophy = pct >= 80 ? '🏆' : pct >= 60 ? '🥈' : pct >= 40 ? '🥉' : '📚';
  const topicLabel = state.topic ? state.topic.name : 'Gemischtes Quiz';

  const breakdown = q.results.map(r => {
    const icon = r.correct ? '✅' : r.timeout ? '⏰' : '❌';
    const shortQ = r.q.length > 45 ? r.q.substring(0, 45) + '…' : r.q;
    return `
    <div class="breakdown-item">
      <span class="breakdown-icon">${icon}</span>
      <span class="breakdown-label">${shortQ}</span>
      <span class="breakdown-pct">${r.correct ? '+' + r.points : '0'}</span>
    </div>`;
  }).join('');

  const replayArgs = state.topic
    ? `'${state.profession}','${state.exam}','${state.topic.id}'`
    : `'${state.profession}','${state.exam}',null`;

  render(`
    <div class="screen screen-fade">
      <div class="results-screen">
        <div class="results-trophy">${trophy}</div>
        <div class="results-title">Quiz beendet!</div>
        <div class="results-subtitle">${d.shortName} · ${exam.name} · ${topicLabel}</div>
        <div class="results-score-big">${q.score}</div>
        <div class="results-stats">
          <div class="results-stat"><span class="rs-num">${correct}/${q.questions.length}</span><span class="rs-label">Richtig</span></div>
          <div class="results-stat"><span class="rs-num">${pct}%</span><span class="rs-label">Quote</span></div>
          <div class="results-stat"><span class="rs-num">${q.score}</span><span class="rs-label">Punkte</span></div>
        </div>
        <div class="results-grade ${gradeInfo.cls}">${gradeInfo.label}</div>
        <div class="results-breakdown">
          <h3>📋 Fragenübersicht</h3>
          ${breakdown}
        </div>
        <div class="results-actions">
          <button class="btn-retry" onclick="startQuiz(${replayArgs})">🔄 Nochmal</button>
          <button class="btn-home-result" onclick="showExam('${state.profession}','${state.exam}')">← Themen</button>
          <button class="share-quiz-btn" onclick="showShareModal('${state.profession}','${state.exam}',${state.topic ? `'${state.topic.id}'` : 'null'})">🔗 Code teilen</button>
        </div>
      </div>
    </div>
  `);

  if (pct >= 80) launchConfetti();
}

/* ── Confetti ──────────────────────────────────────────────── */
function launchConfetti() {
  const colors = ['#667eea','#f093fb','#43e97b','#ffd700','#ff4d6d','#4da6ff'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.cssText = `left:${Math.random()*100}vw;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*0.5}s;transform:rotate(${Math.random()*360}deg)`;
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }, i * 30);
  }
}

/* ════════════════════════════════════════════════════════════
   SETTINGS
   ════════════════════════════════════════════════════════════ */

const SETTINGS_KEY = 'lernSettings';

const DEFAULT_SETTINGS = {
  profile: {
    name: '',
    beruf: '',           // 'fi-si' | 'fi-ae' | 'wiso' | ''
    pruefungsjahr: '',   // '2025' | '2026' | ...
    avatar: '🧑‍💻'
  },
  quiz: {
    timerSekunden: 20,   // 10 | 20 | 30 | 0 (kein Timer)
    freiProRunde: 15,    // 5 | 10 | 15 | 20
    zufaelligeReihenfolge: true,
    soundEffekte: true,
    confetti: true
  },
  lernkarten: {
    autoWeiter: false,       // automatisch zur nächsten Karte
    autoWeiterSekunden: 5,
    schwierigkeitMarkierung: true
  },
  anzeige: {
    theme: 'dark',           // 'dark' | 'light' (für spätere Erweiterung)
    schriftgroesse: 'normal', // 'klein' | 'normal' | 'gross'
    animationen: true,
    kompaktModus: false
  },
  datenschutz: {
    fortschrittSpeichern: true,
    statistikenSpeichern: true,
    analyseErlaubt: false
  }
};

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    return deepMerge(DEFAULT_SETTINGS, stored);
  } catch { return { ...DEFAULT_SETTINGS }; }
}

function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  applySettings(s);
}

function deepMerge(base, override) {
  const result = { ...base };
  for (const key in override) {
    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
      result[key] = deepMerge(base[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

function applySettings(s) {
  const root = document.documentElement;
  const size = s.anzeige?.schriftgroesse;
  root.style.fontSize = size === 'klein' ? '14px' : size === 'gross' ? '18px' : '16px';
  if (s.anzeige?.kompaktModus) {
    document.body.classList.add('compact');
  } else {
    document.body.classList.remove('compact');
  }
}

const avatarOptions = ['🧑‍💻','👨‍🎓','👩‍🎓','🧑‍🏫','👨‍💼','👩‍💼','🦊','🐧','🤖','🦁','🐉','⚡'];
const berufe = [
  { id: '', label: '— Beruf wählen —' },
  { id: 'fi-si', label: 'FI Systemintegration' },
  { id: 'fi-ae', label: 'FI Anwendungsentwicklung' },
  { id: 'wiso',  label: 'WiSo (alle Berufe)' }
];

function showSettings(fromScreen) {
  const s = loadSettings();
  state._settingsFrom = fromScreen || 'home';

  const avatarGrid = avatarOptions.map(a => `
    <button class="avatar-opt ${s.profile.avatar === a ? 'selected' : ''}"
      onclick="selectAvatar('${a}')">${a}</button>`).join('');

  const berufsSelect = berufe.map(b =>
    `<option value="${b.id}" ${s.profile.beruf === b.id ? 'selected' : ''}>${b.label}</option>`
  ).join('');

  const yearOptions = ['2025','2026','2027'].map(y =>
    `<option value="${y}" ${s.profile.pruefungsjahr === y ? 'selected' : ''}>${y}</option>`
  ).join('');

  render(`
    <div class="screen screen-fade">
      <nav class="topnav">
        <button class="topnav-back" onclick="settingsBack()"><span class="arrow">←</span> Zurück</button>
        <div class="topnav-title">⚙️ Einstellungen</div>
        <div class="topnav-right">${themeBtn()}</div>
      </nav>

      <div class="settings-container">

        <!-- ── Profil ── -->
        <div class="settings-section">
          <div class="settings-section-header">
            <span class="settings-section-icon">👤</span>
            <h2>Profil</h2>
          </div>

          <div class="settings-card">
            <div class="settings-row">
              <div class="settings-label">
                <span class="settings-label-title">Avatar</span>
              </div>
              <div class="avatar-grid" id="avatarGrid">${avatarGrid}</div>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label" for="inputName">
                <span class="settings-label-title">Name / Spitzname</span>
                <span class="settings-label-sub">Wird im Quiz angezeigt</span>
              </label>
              <input type="text" id="inputName" class="settings-input"
                placeholder="z.B. Max Mustermann"
                value="${s.profile.name}"
                onchange="patchSetting('profile','name',this.value)">
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label" for="selectBeruf">
                <span class="settings-label-title">Ausbildungsberuf</span>
                <span class="settings-label-sub">Wird als Standardauswahl genutzt</span>
              </label>
              <select id="selectBeruf" class="settings-select"
                onchange="patchSetting('profile','beruf',this.value)">
                ${berufsSelect}
              </select>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label" for="selectJahr">
                <span class="settings-label-title">Prüfungsjahr</span>
                <span class="settings-label-sub">Geplantes Abschlussjahr</span>
              </label>
              <select id="selectJahr" class="settings-select"
                onchange="patchSetting('profile','pruefungsjahr',this.value)">
                <option value="">— Jahr wählen —</option>
                ${yearOptions}
              </select>
            </div>
          </div>
        </div>

        <!-- ── Quiz ── -->
        <div class="settings-section">
          <div class="settings-section-header">
            <span class="settings-section-icon">⚡</span>
            <h2>Quiz</h2>
          </div>

          <div class="settings-card">
            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Timer pro Frage</span>
                <span class="settings-label-sub">Sekunden bis zur Zeitüberschreitung</span>
              </label>
              <div class="settings-segmented" id="timerSeg">
                ${[['10s','10'],['20s','20'],['30s','30'],['Kein','0']].map(([label, val]) => `
                  <button class="seg-btn ${s.quiz.timerSekunden == val ? 'active' : ''}"
                    onclick="patchSetting('quiz','timerSekunden',${val});setSegActive('timerSeg',this)">${label}</button>
                `).join('')}
              </div>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Fragen pro Runde</span>
              </label>
              <div class="settings-segmented" id="fragenSeg">
                ${[['5','5'],['10','10'],['15','15'],['20','20']].map(([label, val]) => `
                  <button class="seg-btn ${s.quiz.freiProRunde == val ? 'active' : ''}"
                    onclick="patchSetting('quiz','freiProRunde',${val});setSegActive('fragenSeg',this)">${label}</button>
                `).join('')}
              </div>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Zufällige Reihenfolge</span>
                <span class="settings-label-sub">Fragen und Antworten mischen</span>
              </label>
              <button class="settings-toggle ${s.quiz.zufaelligeReihenfolge ? 'on' : ''}"
                onclick="toggleSetting('quiz','zufaelligeReihenfolge',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Sound-Effekte</span>
                <span class="settings-label-sub">Ton bei richtiger/falscher Antwort</span>
              </label>
              <button class="settings-toggle ${s.quiz.soundEffekte ? 'on' : ''}"
                onclick="toggleSetting('quiz','soundEffekte',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Konfetti bei Bestleistung</span>
                <span class="settings-label-sub">Feier-Animation bei ≥ 80%</span>
              </label>
              <button class="settings-toggle ${s.quiz.confetti ? 'on' : ''}"
                onclick="toggleSetting('quiz','confetti',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- ── Lernkarten ── -->
        <div class="settings-section">
          <div class="settings-section-header">
            <span class="settings-section-icon">📚</span>
            <h2>Lernkarten</h2>
          </div>

          <div class="settings-card">
            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Auto-Weiter</span>
                <span class="settings-label-sub">Automatisch zur nächsten Karte blättern</span>
              </label>
              <button class="settings-toggle ${s.lernkarten.autoWeiter ? 'on' : ''}"
                onclick="toggleSetting('lernkarten','autoWeiter',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Auto-Weiter Verzögerung</span>
              </label>
              <div class="settings-segmented" id="autoSeg">
                ${[['3s','3'],['5s','5'],['8s','8']].map(([label, val]) => `
                  <button class="seg-btn ${s.lernkarten.autoWeiterSekunden == val ? 'active' : ''}"
                    onclick="patchSetting('lernkarten','autoWeiterSekunden',${val});setSegActive('autoSeg',this)">${label}</button>
                `).join('')}
              </div>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Schwierigkeits-Markierung</span>
                <span class="settings-label-sub">Karten als "schwer" markieren können</span>
              </label>
              <button class="settings-toggle ${s.lernkarten.schwierigkeitMarkierung ? 'on' : ''}"
                onclick="toggleSetting('lernkarten','schwierigkeitMarkierung',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- ── Anzeige ── -->
        <div class="settings-section">
          <div class="settings-section-header">
            <span class="settings-section-icon">🎨</span>
            <h2>Anzeige</h2>
          </div>

          <div class="settings-card">
            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Schriftgröße</span>
              </label>
              <div class="settings-segmented" id="fontSeg">
                ${[['Klein','klein'],['Normal','normal'],['Groß','gross']].map(([label, val]) => `
                  <button class="seg-btn ${s.anzeige.schriftgroesse === val ? 'active' : ''}"
                    onclick="patchSetting('anzeige','schriftgroesse','${val}');setSegActive('fontSeg',this)">${label}</button>
                `).join('')}
              </div>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Animationen</span>
                <span class="settings-label-sub">Übergangseffekte aktivieren</span>
              </label>
              <button class="settings-toggle ${s.anzeige.animationen ? 'on' : ''}"
                onclick="toggleSetting('anzeige','animationen',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Kompakt-Modus</span>
                <span class="settings-label-sub">Weniger Abstände, mehr Inhalt</span>
              </label>
              <button class="settings-toggle ${s.anzeige.kompaktModus ? 'on' : ''}"
                onclick="toggleSetting('anzeige','kompaktModus',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- ── Datenschutz ── -->
        <div class="settings-section">
          <div class="settings-section-header">
            <span class="settings-section-icon">🔒</span>
            <h2>Datenschutz & Daten</h2>
          </div>

          <div class="settings-card">
            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Lernfortschritt speichern</span>
                <span class="settings-label-sub">Bestscores und Themen-Fortschritt lokal merken</span>
              </label>
              <button class="settings-toggle ${s.datenschutz.fortschrittSpeichern ? 'on' : ''}"
                onclick="toggleSetting('datenschutz','fortschrittSpeichern',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Statistiken speichern</span>
                <span class="settings-label-sub">Quiz-Ergebnisse und Zeitstempel</span>
              </label>
              <button class="settings-toggle ${s.datenschutz.statistikenSpeichern ? 'on' : ''}"
                onclick="toggleSetting('datenschutz','statistikenSpeichern',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="settings-divider"></div>

            <div class="settings-row">
              <label class="settings-label">
                <span class="settings-label-title">Anonyme Analyse</span>
                <span class="settings-label-sub">Hilft, die App zu verbessern (keine persönlichen Daten)</span>
              </label>
              <button class="settings-toggle ${s.datenschutz.analyseErlaubt ? 'on' : ''}"
                onclick="toggleSetting('datenschutz','analyseErlaubt',this)">
                <span class="toggle-knob"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- ── SQLite Datenbank ── -->
        <div class="settings-section">
          <div class="settings-section-header">
            <span class="settings-section-icon">🗄️</span>
            <h2>SQLite-Datenbank</h2>
          </div>

          <div class="settings-card">

            <!-- Status-Anzeige -->
            <div class="db-status-bar" id="dbStatusBar">
              <div class="db-status-dot" id="dbStatusDot"></div>
              <span id="dbStatusText">Nicht initialisiert</span>
              <button class="db-status-btn" id="dbStatusBtn" onclick="dbInit()">Initialisieren</button>
            </div>

            <div class="settings-divider"></div>

            <!-- Auto-Import aus localStorage -->
            <div class="settings-row settings-row-col">
              <div class="settings-label">
                <span class="settings-label-title">Auto-Import aus App-Daten</span>
                <span class="settings-label-sub">Überträgt Fortschritt, Einstellungen und Quiz-Codes aus dem Browser in die SQLite-DB</span>
              </div>
              <button class="settings-action-btn db-action" id="btnAutoImport" onclick="dbAutoImport()" disabled>
                ⬆️ Jetzt importieren
              </button>
            </div>

            <div class="settings-divider"></div>

            <!-- .db-Datei importieren -->
            <div class="settings-row settings-row-col">
              <div class="settings-label">
                <span class="settings-label-title">SQLite-Datei laden (.db / .sqlite)</span>
                <span class="settings-label-sub">Vorhandene Datenbank öffnen und deren Inhalte in die App übernehmen</span>
              </div>
              <label class="settings-action-btn db-action" id="btnFileImport">
                📂 Datei wählen
                <input type="file" id="dbFileInput" accept=".db,.sqlite,.sqlite3"
                  style="display:none" onchange="dbImportFile(event)">
              </label>
            </div>

            <div class="settings-divider"></div>

            <!-- .sql-Datei importieren -->
            <div class="settings-row settings-row-col">
              <div class="settings-label">
                <span class="settings-label-title">SQL-Datei ausführen (.sql)</span>
                <span class="settings-label-sub">Schema oder Seed-Datei in die geöffnete Datenbank einspielen</span>
              </div>
              <label class="settings-action-btn db-action" id="btnSqlImport">
                📄 SQL-Datei wählen
                <input type="file" id="sqlFileInput" accept=".sql,.txt"
                  style="display:none" onchange="dbRunSqlFile(event)">
              </label>
            </div>

            <div class="settings-divider"></div>

            <!-- DB exportieren -->
            <div class="settings-row settings-row-col">
              <div class="settings-label">
                <span class="settings-label-title">Datenbank herunterladen</span>
                <span class="settings-label-sub">Aktuelle DB als lernplattform.db speichern</span>
              </div>
              <button class="settings-action-btn db-action" id="btnDbExport" onclick="dbExportFile()" disabled>
                💾 DB herunterladen
              </button>
            </div>

            <div class="settings-divider"></div>

            <!-- SQL-Abfrage -->
            <div class="db-query-section">
              <div class="db-query-header">
                <span class="settings-label-title">🔍 SQL-Abfrage ausführen</span>
                <button class="db-run-btn" id="btnRunSql" onclick="dbRunQuery()" disabled>▶ Ausführen</button>
              </div>
              <textarea id="dbQueryInput" class="db-query-input"
                placeholder="SELECT * FROM users;" rows="3"></textarea>
              <div id="dbQueryResult" class="db-query-result hidden"></div>
            </div>

            <div class="settings-divider"></div>

            <!-- Frage hinzufügen -->
            <div class="db-query-section">
              <div class="db-query-header">
                <span class="settings-label-title">➕ Neue Frage eintragen</span>
                <button class="db-run-btn" id="btnInsertFrage" onclick="dbInsertFrage()" disabled>💾 Speichern</button>
              </div>

              <div class="qf-grid">

                <!-- Thema -->
                <div class="qf-field qf-field-full">
                  <label class="qf-label">Thema</label>
                  <select id="qfThema" class="qf-select">
                    <option value="">– Thema wählen –</option>
                    ${Object.values(REGISTRY).flatMap(d =>
                      Object.values(d.exams).flatMap(e =>
                        e.topics.map(t =>
                          `<option value="${d.id}|${e.id}|${t.id}">${d.shortName} · ${e.name} · ${t.name}</option>`
                        )
                      )
                    ).join('')}
                  </select>
                </div>

                <!-- Fragetext -->
                <div class="qf-field qf-field-full">
                  <label class="qf-label">Frage</label>
                  <textarea id="qfFrage" class="qf-textarea" rows="2" placeholder="Wie lautet die Frage?"></textarea>
                </div>

                <!-- 4 Antwortmöglichkeiten -->
                ${[0,1,2,3].map(i => `
                <div class="qf-field qf-field-answer">
                  <label class="qf-label">
                    <span class="qf-answer-letter">${['A','B','C','D'][i]}</span>
                    Antwort ${i+1}
                    <span class="qf-correct-badge" id="qfCorrectBadge${i}" style="display:none">✓ Richtig</span>
                  </label>
                  <div class="qf-answer-row">
                    <input type="text" id="qfOpt${i}" class="qf-input" placeholder="Antwortmöglichkeit ${i+1}">
                    <label class="qf-radio-wrap" title="Als richtige Antwort markieren">
                      <input type="radio" name="qfCorrect" value="${i}" onchange="qfMarkCorrect(${i})">
                      <span class="qf-radio-btn">✓</span>
                    </label>
                  </div>
                </div>`).join('')}

                <!-- Erklärung -->
                <div class="qf-field qf-field-full">
                  <label class="qf-label">Erklärung <span class="qf-optional">(wird nach Antwort angezeigt)</span></label>
                  <textarea id="qfErklaerung" class="qf-textarea" rows="2" placeholder="Warum ist diese Antwort richtig?"></textarea>
                </div>

              </div>

              <div id="qfResult" class="db-query-result hidden"></div>
            </div>

          </div>
        </div>

        <!-- ── Log-Fenster ── -->
        <div class="settings-section" id="dbLogSection" style="display:none">
          <div class="settings-section-header">
            <span class="settings-section-icon">📋</span>
            <h2>Import-Protokoll</h2>
          </div>
          <div class="db-log" id="dbLog"></div>
        </div>

        <!-- ── Daten & Reset ── -->
        <div class="settings-section">
          <div class="settings-section-header">
            <span class="settings-section-icon">📦</span>
            <h2>App-Daten</h2>
          </div>

          <div class="settings-card">
            <div class="settings-row settings-row-info">
              <span class="settings-label-title">Datenbank-Schema ansehen</span>
              <a class="settings-link" onclick="showDbInfo()">📄 Schema</a>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row settings-row-info">
              <span class="settings-label-title">Fortschritt exportieren (JSON)</span>
              <button class="settings-action-btn" onclick="exportData()">💾 Export</button>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row settings-row-info">
              <span class="settings-label-title">Alle App-Daten löschen</span>
              <button class="settings-action-btn danger" onclick="confirmReset()">🗑️ Zurücksetzen</button>
            </div>
          </div>
        </div>

        <!-- ── Version ── -->
        <div class="settings-version">
          <span>IT-Lernplattform v1.0.0</span>
          <span>Daten: localStorage + SQL-Datenbankschema</span>
          <span>© 2025 – FI-SI · FI-AE · WiSo</span>
        </div>

      </div>
    </div>
  `);
}

/* ── Settings Helpers ──────────────────────────────────────── */
function settingsBack() {
  if (state._settingsFrom === 'home') showHome();
  else showHome();
}

function patchSetting(section, key, value) {
  const s = loadSettings();
  s[section][key] = value;
  saveSettings(s);
  showToast('Gespeichert ✓');
}

function toggleSetting(section, key, btn) {
  const s = loadSettings();
  s[section][key] = !s[section][key];
  saveSettings(s);
  btn.classList.toggle('on', s[section][key]);
  showToast(s[section][key] ? 'Aktiviert ✓' : 'Deaktiviert');
}

function setSegActive(groupId, btn) {
  document.querySelectorAll(`#${groupId} .seg-btn`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectAvatar(emoji) {
  patchSetting('profile', 'avatar', emoji);
  document.querySelectorAll('.avatar-opt').forEach(b => {
    b.classList.toggle('selected', b.textContent === emoji);
  });
}

function showToast(msg) {
  const existing = document.getElementById('settingsToast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.id = 'settingsToast';
  t.className = 'settings-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('visible'), 10);
  setTimeout(() => { t.classList.remove('visible'); setTimeout(() => t.remove(), 300); }, 1800);
}

function exportData() {
  const payload = {
    settings: loadSettings(),
    progress: JSON.parse(localStorage.getItem('lernProgress') || '{}'),
    quizCodes: JSON.parse(localStorage.getItem(QUIZ_STORE_KEY) || '{}'),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `lernplattform-export-${new Date().toISOString().slice(0,10)}.json`;
  a.click(); URL.revokeObjectURL(url);
  showToast('Export gestartet 💾');
}

function confirmReset() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'resetModal';
  overlay.innerHTML = `
    <div class="modal-box" style="text-align:center">
      <div style="font-size:3rem;margin-bottom:12px">⚠️</div>
      <h2 style="margin-bottom:8px">Alle Daten löschen?</h2>
      <p style="color:var(--text-muted);margin-bottom:24px;font-size:0.9rem">
        Lernfortschritt, Einstellungen und Quiz-Codes werden unwiderruflich gelöscht.
      </p>
      <div style="display:flex;gap:12px;justify-content:center">
        <button class="btn-nav btn-nav-prev" onclick="document.getElementById('resetModal').remove()">Abbrechen</button>
        <button class="settings-action-btn danger" style="padding:12px 28px" onclick="resetAllData()">Ja, alles löschen</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

function resetAllData() {
  localStorage.clear();
  document.getElementById('resetModal')?.remove();
  showToast('Alle Daten gelöscht');
  setTimeout(() => showHome(), 800);
}

function showDbInfo() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'dbModal';
  overlay.innerHTML = `
    <div class="modal-box" style="max-width:560px">
      <div class="modal-header">
        <h2>🗄️ Datenbankstruktur</h2>
        <button class="modal-close" onclick="document.getElementById('dbModal').remove()">✕</button>
      </div>
      <div class="db-info-body">
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:16px">
          Das vollständige SQL-Schema liegt unter <code>db/schema.sql</code>.
          Beispieldaten findest du in <code>db/seed.sql</code>.
        </p>
        <div class="db-table-preview">
          <div class="db-table-name">👤 users</div>
          <div class="db-cols">id · name · avatar · beruf · pruefungsjahr · erstellt_am</div>
        </div>
        <div class="db-table-preview">
          <div class="db-table-name">⚙️ user_settings</div>
          <div class="db-cols">id · user_id · sektion · schluessel · wert · geaendert_am</div>
        </div>
        <div class="db-table-preview">
          <div class="db-table-name">📊 quiz_ergebnisse</div>
          <div class="db-cols">id · user_id · beruf · pruefung · thema · score · richtig · gesamt · gespielt_am</div>
        </div>
        <div class="db-table-preview">
          <div class="db-table-name">📚 lernfortschritt</div>
          <div class="db-cols">id · user_id · beruf · pruefung · thema_id · bestScore · versuche · gelernt · aktualisiert_am</div>
        </div>
        <div class="db-table-preview">
          <div class="db-table-name">🔗 quiz_codes</div>
          <div class="db-cols">id · code · user_id · beruf · pruefung · thema_id · erstellt_am · gueltig_bis</div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

/* ════════════════════════════════════════════════════════════
   SQLITE ENGINE (sql.js – WebAssembly)
   ════════════════════════════════════════════════════════════ */

let _sqlJs = null;   // sql.js Instanz (nach initSqlJs)
let _db    = null;   // aktive SQLite-DB

/* ── sql.js laden (lazy, einmalig) ────────────────────────── */
async function ensureSqlJs() {
  if (_sqlJs) return _sqlJs;
  if (typeof initSqlJs === 'undefined') {
    throw new Error('sql.js nicht geladen – prüfe die Internet-Verbindung.');
  }
  _sqlJs = await initSqlJs({
    locateFile: file =>
      `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
  });
  return _sqlJs;
}

/* ── Hilfsfunktionen ───────────────────────────────────────── */
function dbLog(msg, type = 'info') {
  const log = document.getElementById('dbLog');
  const section = document.getElementById('dbLogSection');
  if (!log) return;
  section.style.display = '';
  const line = document.createElement('div');
  line.className = `db-log-line db-log-${type}`;
  const time = new Date().toLocaleTimeString('de-DE');
  line.innerHTML = `<span class="db-log-time">${time}</span> ${msg}`;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function dbSetStatus(state, text) {
  const dot  = document.getElementById('dbStatusDot');
  const txt  = document.getElementById('dbStatusText');
  const btn  = document.getElementById('dbStatusBtn');
  if (!dot) return;
  dot.className = `db-status-dot db-status-${state}`;
  txt.textContent = text;
  btn.textContent = state === 'ok' ? 'Schließen' : 'Initialisieren';
  btn.onclick = state === 'ok' ? dbClose : dbInit;

  const dbBtns = ['btnAutoImport','btnDbExport','btnRunSql','btnInsertFrage'];
  dbBtns.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = (state !== 'ok');
  });
}

function dbEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  return `'${String(val).replace(/'/g, "''")}'`;
}

/* ── DB initialisieren (neue leere DB + Schema anlegen) ────── */
async function dbInit() {
  dbSetStatus('loading', 'Wird initialisiert …');
  dbLog('sql.js wird geladen …');
  try {
    const SQL = await ensureSqlJs();
    _db = new SQL.Database();
    dbLog('Leere SQLite-Datenbank erstellt.', 'ok');

    // Schema aus db/schema.sql via fetch laden (wenn vorhanden)
    try {
      const resp = await fetch('db/schema.sql');
      if (resp.ok) {
        const sql = await resp.text();
        _db.run(sql);
        dbLog('Schema aus db/schema.sql eingespielt.', 'ok');
      }
    } catch {
      dbLog('db/schema.sql nicht erreichbar – nur leere DB.', 'warn');
    }

    dbSetStatus('ok', 'Datenbank bereit');
    dbLog('✅ Initialisierung abgeschlossen.', 'ok');
    showToast('SQLite bereit ✓');
  } catch (err) {
    dbSetStatus('error', 'Fehler: ' + err.message);
    dbLog('❌ ' + err.message, 'error');
  }
}

/* ── DB schließen ──────────────────────────────────────────── */
function dbClose() {
  if (_db) { _db.close(); _db = null; }
  dbSetStatus('idle', 'Nicht verbunden');
  dbLog('Datenbank geschlossen.');
  showToast('DB geschlossen');
}

/* ── Auto-Import: localStorage → SQLite ────────────────────── */
async function dbAutoImport() {
  if (!_db) { showToast('DB zuerst initialisieren!'); return; }

  dbLog('──── Auto-Import gestartet ────');
  let total = 0;

  try {
    // ── 1. User ──────────────────────────────────────────────
    const s = loadSettings();
    let userUuid = localStorage.getItem('userUuid');
    if (!userUuid) {
      userUuid = crypto.randomUUID();
      localStorage.setItem('userUuid', userUuid);
    }

    const existing = _db.exec(
      `SELECT id FROM users WHERE uuid = ${dbEscape(userUuid)}`
    );
    let userId;

    if (existing.length && existing[0].values.length) {
      userId = existing[0].values[0][0];
      _db.run(`UPDATE users SET name=${dbEscape(s.profile.name)},
        avatar=${dbEscape(s.profile.avatar)},
        beruf=${dbEscape(s.profile.beruf)},
        pruefungsjahr=${dbEscape(s.profile.pruefungsjahr || null)},
        zuletzt_aktiv=CURRENT_TIMESTAMP WHERE id=${userId}`);
      dbLog(`Nutzer aktualisiert (ID ${userId}).`, 'ok');
    } else {
      _db.run(`INSERT INTO users (uuid,name,avatar,beruf,pruefungsjahr)
        VALUES (${dbEscape(userUuid)},${dbEscape(s.profile.name)},
        ${dbEscape(s.profile.avatar)},${dbEscape(s.profile.beruf)},
        ${dbEscape(s.profile.pruefungsjahr || null)})`);
      const res = _db.exec(`SELECT id FROM users WHERE uuid=${dbEscape(userUuid)}`);
      userId = res[0].values[0][0];
      dbLog(`Neuer Nutzer angelegt (ID ${userId}).`, 'ok');
      total++;
    }

    // ── 2. Einstellungen ─────────────────────────────────────
    let settingsCount = 0;
    for (const [sektion, obj] of Object.entries(s)) {
      if (sektion === 'profile') continue;
      for (const [key, val] of Object.entries(obj)) {
        _db.run(`INSERT OR REPLACE INTO user_settings
          (user_id,sektion,schluessel,wert,geaendert_am)
          VALUES (${userId},${dbEscape(sektion)},${dbEscape(key)},
          ${dbEscape(String(val))},CURRENT_TIMESTAMP)`);
        settingsCount++;
      }
    }
    dbLog(`${settingsCount} Einstellungen übertragen.`, 'ok');
    total += settingsCount;

    // ── 3. Lernfortschritt ───────────────────────────────────
    const prog = JSON.parse(localStorage.getItem('lernProgress') || '{}');
    let progCount = 0;
    for (const [key, val] of Object.entries(prog)) {
      const parts = key.split('_');
      if (parts.length < 3) continue;
      const [beruf, pruefung, ...rest] = parts;
      const themaId = rest.join('_');
      _db.run(`INSERT OR REPLACE INTO lernfortschritt
        (user_id,beruf,pruefung,thema_id,gelernt,best_score,versuche,aktualisiert_am)
        VALUES (${userId},${dbEscape(beruf)},${dbEscape(pruefung)},
        ${dbEscape(themaId)},${val.learned ? 1 : 0},
        ${dbEscape(val.bestScore || 0)},${dbEscape(val.attempts || 0)},
        CURRENT_TIMESTAMP)`);
      progCount++;
    }
    dbLog(`${progCount} Lernfortschritt-Einträge übertragen.`, 'ok');
    total += progCount;

    // ── 4. Quiz-Codes ────────────────────────────────────────
    const codes = JSON.parse(localStorage.getItem(QUIZ_STORE_KEY) || '{}');
    let codeCount = 0;
    for (const [code, cfg] of Object.entries(codes)) {
      const gueltigBis = new Date(cfg.created + 24*60*60*1000).toISOString();
      try {
        _db.run(`INSERT OR IGNORE INTO quiz_codes
          (code,erstellt_von,beruf,pruefung,thema_id,erstellt_am,gueltig_bis)
          VALUES (${dbEscape(code)},${userId},${dbEscape(cfg.profId)},
          ${dbEscape(cfg.examId)},${dbEscape(cfg.topicId || null)},
          CURRENT_TIMESTAMP,${dbEscape(gueltigBis)})`);
        codeCount++;
      } catch { /* ignoriere Duplikate */ }
    }
    dbLog(`${codeCount} Quiz-Codes übertragen.`, 'ok');
    total += codeCount;

    dbLog(`✅ Auto-Import abgeschlossen: ${total} Datensätze.`, 'ok');
    showToast(`Import: ${total} Datensätze ✓`);
    dbRefreshStatus();

  } catch (err) {
    dbLog('❌ Fehler: ' + err.message, 'error');
    showToast('Import fehlgeschlagen!');
  }
}

/* ── .db/.sqlite Datei laden ───────────────────────────────── */
async function dbImportFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  dbLog(`Datei geladen: ${file.name} (${(file.size/1024).toFixed(1)} KB)`);

  try {
    const SQL = await ensureSqlJs();
    const buf = await file.arrayBuffer();
    if (_db) _db.close();
    _db = new SQL.Database(new Uint8Array(buf));
    dbSetStatus('ok', `${file.name} geöffnet`);
    dbLog(`✅ Datenbank "${file.name}" erfolgreich geöffnet.`, 'ok');
    dbRefreshStatus();
    showToast(`${file.name} geladen ✓`);
  } catch (err) {
    dbLog('❌ Datei konnte nicht geöffnet werden: ' + err.message, 'error');
    dbSetStatus('error', 'Ladefehler');
    showToast('Datei fehlerhaft!');
  }
  event.target.value = '';
}

/* ── .sql Datei ausführen ──────────────────────────────────── */
async function dbRunSqlFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!_db) { showToast('DB zuerst initialisieren!'); return; }

  dbLog(`SQL-Datei: ${file.name}`);
  try {
    const text = await file.text();
    const statements = text
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let ok = 0, skip = 0;
    for (const stmt of statements) {
      try {
        _db.run(stmt);
        ok++;
      } catch (e) {
        dbLog(`⚠️ Übersprungen: ${stmt.substring(0,60)}… → ${e.message}`, 'warn');
        skip++;
      }
    }
    dbLog(`✅ ${file.name}: ${ok} Statements ausgeführt, ${skip} übersprungen.`, 'ok');
    dbRefreshStatus();
    showToast(`SQL eingespielt: ${ok} Statements ✓`);
  } catch (err) {
    dbLog('❌ Fehler beim Lesen der Datei: ' + err.message, 'error');
  }
  event.target.value = '';
}

/* ── Abfrage ausführen (SQL-Konsole) ───────────────────────── */
function dbRunQuery() {
  if (!_db) { showToast('DB zuerst initialisieren!'); return; }
  const input = document.getElementById('dbQueryInput');
  const result = document.getElementById('dbQueryResult');
  const sql = (input?.value || '').trim();
  if (!sql) return;
  result.classList.remove('hidden');

  try {
    const res = _db.exec(sql);
    if (!res.length) {
      result.innerHTML = '<div class="db-query-ok">✅ Ausgeführt (keine Rückgabe)</div>';
      dbLog(`Query OK: ${sql.substring(0,60)}`, 'ok');
      return;
    }

    // Tabelle rendern
    const { columns, values } = res[0];
    const maxRows = 50;
    const shown = values.slice(0, maxRows);
    const more = values.length > maxRows
      ? `<div class="db-more">… ${values.length - maxRows} weitere Zeilen</div>` : '';

    result.innerHTML = `
      <div class="db-result-meta">${values.length} Zeile(n) · ${columns.length} Spalte(n)</div>
      <div class="db-table-scroll">
        <table class="db-result-table">
          <thead><tr>${columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
          <tbody>${shown.map(row =>
            `<tr>${row.map(cell =>
              `<td>${cell === null ? '<em class="db-null">NULL</em>' : String(cell)}</td>`
            ).join('')}</tr>`
          ).join('')}</tbody>
        </table>
      </div>${more}`;
    dbLog(`Query: ${values.length} Zeile(n) zurückgegeben.`, 'ok');
  } catch (err) {
    result.innerHTML = `<div class="db-query-error">❌ ${err.message}</div>`;
    dbLog('❌ Query-Fehler: ' + err.message, 'error');
  }
}

/* ── DB als .db herunterladen ──────────────────────────────── */
function dbExportFile() {
  if (!_db) { showToast('Keine Datenbank geöffnet!'); return; }
  try {
    const data = _db.export();
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `lernplattform-${date}.db`;
    a.click();
    URL.revokeObjectURL(url);
    dbLog('✅ Datenbank heruntergeladen.', 'ok');
    showToast('DB gespeichert ✓');
  } catch (err) {
    dbLog('❌ Export fehlgeschlagen: ' + err.message, 'error');
  }
}

/* ── Tabellenübersicht im Status-Panel ─────────────────────── */
function dbRefreshStatus() {
  if (!_db) return;
  try {
    const res = _db.exec(
      `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`
    );
    if (!res.length) return;
    const tables = res[0].values.map(r => r[0]);
    const counts = tables.map(t => {
      try {
        const c = _db.exec(`SELECT COUNT(*) FROM "${t}"`);
        return `${t} (${c[0].values[0][0]})`;
      } catch { return t; }
    });
    dbLog(`Tabellen: ${counts.join(' · ')}`, 'info');
  } catch { /* ignore */ }
}

/* ── Frage-Formular: richtige Antwort visuell markieren ─────── */
function qfMarkCorrect(index) {
  for (let i = 0; i < 4; i++) {
    const badge = document.getElementById(`qfCorrectBadge${i}`);
    const field = document.getElementById(`qfOpt${i}`)?.closest('.qf-field-answer');
    if (!badge || !field) continue;
    if (i === index) {
      badge.style.display = 'inline';
      field.classList.add('qf-field-correct');
    } else {
      badge.style.display = 'none';
      field.classList.remove('qf-field-correct');
    }
  }
}

/* ── Frage in SQLite einfügen ───────────────────────────────── */
function dbInsertFrage() {
  if (!_db) { showToast('DB zuerst initialisieren!'); return; }

  const themaVal  = document.getElementById('qfThema')?.value || '';
  const frageText = (document.getElementById('qfFrage')?.value || '').trim();
  const erklaerung = (document.getElementById('qfErklaerung')?.value || '').trim();
  const opts      = [0,1,2,3].map(i => (document.getElementById(`qfOpt${i}`)?.value || '').trim());
  const correctEl = document.querySelector('input[name="qfCorrect"]:checked');
  const result    = document.getElementById('qfResult');

  result.classList.remove('hidden');

  // Validierung
  if (!themaVal) {
    result.innerHTML = '<div class="db-query-error">❌ Bitte ein Thema auswählen.</div>';
    return;
  }
  if (!frageText) {
    result.innerHTML = '<div class="db-query-error">❌ Fragetext darf nicht leer sein.</div>';
    return;
  }
  if (opts.some(o => !o)) {
    result.innerHTML = '<div class="db-query-error">❌ Alle 4 Antwortmöglichkeiten ausfüllen.</div>';
    return;
  }
  if (!correctEl) {
    result.innerHTML = '<div class="db-query-error">❌ Bitte die richtige Antwort markieren (✓-Button).</div>';
    return;
  }

  const korrektIndex = parseInt(correctEl.value, 10);
  const [profId, examId, topicKey] = themaVal.split('|');

  try {
    // Thema-ID aus DB lesen
    const themaRes = _db.exec(
      `SELECT id FROM themen WHERE thema_key='${dbEscape(topicKey)}'
       AND pruefung_id='${dbEscape(examId)}'
       AND ausbildungsberuf_id='${dbEscape(profId)}'`
    );

    let themaId;
    if (themaRes.length && themaRes[0].values.length) {
      themaId = themaRes[0].values[0][0];
    } else {
      result.innerHTML = '<div class="db-query-error">❌ Thema nicht in der DB gefunden. Bitte zuerst fi-si-schema.sql + fi-si-seed.sql einspielen.</div>';
      return;
    }

    // Maximale Reihenfolge für dieses Thema
    const maxOrdRes = _db.exec(`SELECT MAX(reihenfolge) FROM fragen WHERE thema_id=${themaId}`);
    const maxOrd = (maxOrdRes[0]?.values[0][0] || 0) + 1;

    // Frage einfügen
    _db.run(
      `INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge)
       VALUES (${themaId}, '${dbEscape(frageText)}', '${dbEscape(erklaerung)}', ${korrektIndex}, ${maxOrd})`
    );
    const frageId = _db.exec('SELECT last_insert_rowid()')[0].values[0][0];

    // Antwortoptionen einfügen
    opts.forEach((text, pos) => {
      _db.run(
        `INSERT INTO antwortoptionen (frage_id, position, text)
         VALUES (${frageId}, ${pos}, '${dbEscape(text)}')`
      );
    });

    result.innerHTML = `
      <div class="db-query-ok">
        ✅ Frage gespeichert (ID ${frageId}) · Thema: ${profId.toUpperCase()} / ${examId.toUpperCase()} / ${topicKey}
        <div class="qf-preview">
          <strong>${frageText}</strong><br>
          ${opts.map((o,i) => `<span class="${i===korrektIndex?'qf-prev-correct':'qf-prev-wrong'}">${['A','B','C','D'][i]}) ${o}</span>`).join('  ')}
        </div>
      </div>`;

    dbLog(`✅ Frage #${frageId} eingetragen: "${frageText.substring(0,50)}…"`, 'ok');

    // Formular zurücksetzen
    document.getElementById('qfFrage').value = '';
    document.getElementById('qfErklaerung').value = '';
    [0,1,2,3].forEach(i => {
      document.getElementById(`qfOpt${i}`).value = '';
      document.getElementById(`qfCorrectBadge${i}`).style.display = 'none';
      document.getElementById(`qfOpt${i}`)?.closest('.qf-field-answer')?.classList.remove('qf-field-correct');
    });
    document.querySelectorAll('input[name="qfCorrect"]').forEach(r => r.checked = false);

  } catch (err) {
    result.innerHTML = `<div class="db-query-error">❌ ${err.message}</div>`;
    dbLog('❌ Insert-Fehler: ' + err.message, 'error');
  }
}

/* ── Boot ──────────────────────────────────────────────────── */
setTimeout(() => {
  applyTheme(getTheme());
  const s = loadSettings();
  applySettings(s);
  showHome();
}, 600);
