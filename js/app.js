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
        <div class="topnav-right"></div>
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
        <div class="topnav-right"></div>
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
        <div class="topnav-right"></div>
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
        <div class="topnav-right"></div>
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

        <!-- ── Daten & Reset ── -->
        <div class="settings-section">
          <div class="settings-section-header">
            <span class="settings-section-icon">🗄️</span>
            <h2>Daten</h2>
          </div>

          <div class="settings-card">
            <div class="settings-row settings-row-info">
              <span class="settings-label-title">Datenbank-Schema</span>
              <a class="settings-link" onclick="showDbInfo()">📄 Schema ansehen</a>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row settings-row-info">
              <span class="settings-label-title">Fortschritt exportieren</span>
              <button class="settings-action-btn" onclick="exportData()">💾 Export (JSON)</button>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row settings-row-info">
              <span class="settings-label-title">Alle Daten löschen</span>
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

/* ── Boot ──────────────────────────────────────────────────── */
setTimeout(() => {
  const s = loadSettings();
  applySettings(s);
  showHome();
}, 600);
