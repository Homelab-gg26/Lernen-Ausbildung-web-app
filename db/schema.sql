-- ══════════════════════════════════════════════════════════════
-- IT-Lernplattform – Datenbankschema
-- Datei:   db/schema.sql
-- Engine:  MySQL 8+ / MariaDB 10.6+ / SQLite 3 (kompatibel)
-- Zweck:   Persistente Speicherung von Nutzern, Einstellungen,
--          Lernfortschritt, Quiz-Ergebnissen und Quiz-Codes
-- ══════════════════════════════════════════════════════════════

-- ── Zeichensatz (nur MySQL/MariaDB) ──────────────────────────
-- CREATE DATABASE IF NOT EXISTS lernplattform
--   CHARACTER SET utf8mb4
--   COLLATE utf8mb4_unicode_ci;
-- USE lernplattform;

-- ──────────────────────────────────────────────────────────────
-- TABELLE: users
-- Speichert die Basisinformationen eines Nutzers/Profils.
-- In der aktuellen lokalen Version entspricht ein User einem
-- Browser-Profil (identifiziert über localStorage-UUID).
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id              INTEGER       PRIMARY KEY AUTOINCREMENT,
    uuid            TEXT          NOT NULL UNIQUE,           -- Browser-UUID (localStorage)
    name            TEXT          NOT NULL DEFAULT '',
    avatar          TEXT          NOT NULL DEFAULT '🧑‍💻',
    beruf           TEXT          NOT NULL DEFAULT ''        -- 'fi-si' | 'fi-ae' | 'wiso' | ''
                    CHECK (beruf IN ('fi-si','fi-ae','wiso','')),
    pruefungsjahr   INTEGER,                                 -- z.B. 2025, 2026
    erstellt_am     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    zuletzt_aktiv   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ──────────────────────────────────────────────────────────────
-- TABELLE: user_settings
-- Key-Value-Speicher für alle Einstellungen eines Nutzers.
-- Struktur: sektion.schluessel = wert
-- Beispiel: quiz.timerSekunden = '20'
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_settings (
    id              INTEGER       PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sektion         TEXT          NOT NULL,   -- 'profile' | 'quiz' | 'lernkarten' | 'anzeige' | 'datenschutz'
    schluessel      TEXT          NOT NULL,   -- z.B. 'timerSekunden', 'confetti', 'schriftgroesse'
    wert            TEXT          NOT NULL,   -- Wert als String ('20', 'true', 'normal')
    geaendert_am    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, sektion, schluessel)
);

-- ──────────────────────────────────────────────────────────────
-- TABELLE: lernfortschritt
-- Speichert pro Nutzer/Beruf/Prüfung/Thema den Lernstand:
-- ob die Karten gelernt wurden und den Bestscorewert im Quiz.
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lernfortschritt (
    id              INTEGER       PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    beruf           TEXT          NOT NULL,   -- 'fi-si' | 'fi-ae' | 'wiso'
    pruefung        TEXT          NOT NULL,   -- 'ap1' | 'ap2' | 'wiso'
    thema_id        TEXT          NOT NULL,   -- z.B. 'netzwerk', 'programmierung-ae'
    gelernt         INTEGER       NOT NULL DEFAULT 0 CHECK (gelernt IN (0,1)),  -- Boolean
    best_score      REAL          NOT NULL DEFAULT 0,  -- 0–100 (Prozent)
    versuche        INTEGER       NOT NULL DEFAULT 0,
    aktualisiert_am DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, beruf, pruefung, thema_id)
);

-- ──────────────────────────────────────────────────────────────
-- TABELLE: quiz_ergebnisse
-- Vollständiges Log jedes gespielten Quiz-Durchlaufs.
-- Ermöglicht Auswertungen (Trends, Schwachstellen, Highscores).
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_ergebnisse (
    id              INTEGER       PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    beruf           TEXT          NOT NULL,
    pruefung        TEXT          NOT NULL,
    thema_id        TEXT,                     -- NULL = gemischtes Quiz
    score           INTEGER       NOT NULL DEFAULT 0,   -- Gesamtpunkte
    richtig         INTEGER       NOT NULL DEFAULT 0,   -- Anzahl richtiger Antworten
    gesamt          INTEGER       NOT NULL DEFAULT 0,   -- Gesamtanzahl Fragen
    prozent         REAL          NOT NULL DEFAULT 0,   -- richtig/gesamt * 100
    streak_max      INTEGER       NOT NULL DEFAULT 0,   -- Höchste Streak in diesem Quiz
    dauer_sekunden  INTEGER,                            -- Gesamtdauer des Quiz
    gespielt_am     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ──────────────────────────────────────────────────────────────
-- TABELLE: quiz_ergebnis_details
-- Einzelne Antworten eines Quiz-Durchlaufs (pro Frage).
-- Ermöglicht gezielte Auswertung: welche Fragen machen Probleme?
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_ergebnis_details (
    id              INTEGER       PRIMARY KEY AUTOINCREMENT,
    ergebnis_id     INTEGER       NOT NULL REFERENCES quiz_ergebnisse(id) ON DELETE CASCADE,
    frage_text      TEXT          NOT NULL,
    gewaehlt_index  INTEGER,                  -- NULL = Timeout
    korrekt_index   INTEGER       NOT NULL,
    ist_korrekt     INTEGER       NOT NULL DEFAULT 0 CHECK (ist_korrekt IN (0,1)),
    ist_timeout     INTEGER       NOT NULL DEFAULT 0 CHECK (ist_timeout IN (0,1)),
    punkte          INTEGER       NOT NULL DEFAULT 0,
    zeit_rest       INTEGER,                  -- Verbleibende Sekunden bei Antwort
    reihenfolge     INTEGER       NOT NULL    -- Position der Frage im Quiz
);

-- ──────────────────────────────────────────────────────────────
-- TABELLE: quiz_codes
-- Generierte 6-stellige Codes, mit denen ein Quiz-Link
-- weitergegeben werden kann (Lehrer → Schüler, Peer-Learning).
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_codes (
    id              INTEGER       PRIMARY KEY AUTOINCREMENT,
    code            TEXT          NOT NULL UNIQUE,       -- 6-stelliger Großbuchstaben+Ziffern-Code
    erstellt_von    INTEGER       REFERENCES users(id) ON DELETE SET NULL,
    beruf           TEXT          NOT NULL,
    pruefung        TEXT          NOT NULL,
    thema_id        TEXT,                                -- NULL = gemischtes Quiz
    nutzungen       INTEGER       NOT NULL DEFAULT 0,   -- Wie oft wurde der Code eingelöst?
    erstellt_am     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gueltig_bis     DATETIME      NOT NULL              -- Standardmäßig 24h nach Erstellung
);

-- ──────────────────────────────────────────────────────────────
-- TABELLE: quiz_code_nutzungen
-- Log: Welcher Nutzer hat wann welchen Code eingelöst?
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_code_nutzungen (
    id              INTEGER       PRIMARY KEY AUTOINCREMENT,
    code_id         INTEGER       NOT NULL REFERENCES quiz_codes(id) ON DELETE CASCADE,
    user_id         INTEGER       REFERENCES users(id) ON DELETE SET NULL,
    eingeloest_am   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ──────────────────────────────────────────────────────────────
-- INDIZES für häufige Abfragen
-- ──────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_settings_user      ON user_settings (user_id, sektion);
CREATE INDEX IF NOT EXISTS idx_fortschritt_user   ON lernfortschritt (user_id, beruf, pruefung);
CREATE INDEX IF NOT EXISTS idx_ergebnisse_user    ON quiz_ergebnisse (user_id, gespielt_am DESC);
CREATE INDEX IF NOT EXISTS idx_ergebnisse_beruf   ON quiz_ergebnisse (beruf, pruefung, thema_id);
CREATE INDEX IF NOT EXISTS idx_codes_code         ON quiz_codes (code);
CREATE INDEX IF NOT EXISTS idx_codes_gueltig      ON quiz_codes (gueltig_bis);

-- ──────────────────────────────────────────────────────────────
-- VIEWS für häufige Auswertungen
-- ──────────────────────────────────────────────────────────────

-- Gesamtstatistik pro Nutzer
CREATE VIEW IF NOT EXISTS v_user_statistik AS
SELECT
    u.id                                            AS user_id,
    u.name,
    u.beruf,
    COUNT(DISTINCT qe.id)                           AS quiz_gesamt,
    COALESCE(AVG(qe.prozent), 0)                   AS schnitt_prozent,
    COALESCE(MAX(qe.score), 0)                     AS highscore,
    COALESCE(SUM(qe.gesamt), 0)                    AS fragen_gesamt,
    COALESCE(SUM(qe.richtig), 0)                   AS fragen_richtig,
    COUNT(DISTINCT lf.thema_id)                     AS themen_besucht,
    COUNT(DISTINCT CASE WHEN lf.gelernt = 1
          THEN lf.thema_id END)                     AS themen_gelernt
FROM users u
LEFT JOIN quiz_ergebnisse qe ON qe.user_id = u.id
LEFT JOIN lernfortschritt lf ON lf.user_id = u.id
GROUP BY u.id;

-- Schwächste Themen eines Nutzers (für gezieltes Üben)
CREATE VIEW IF NOT EXISTS v_schwache_themen AS
SELECT
    user_id,
    beruf,
    pruefung,
    thema_id,
    ROUND(AVG(prozent), 1)  AS avg_prozent,
    COUNT(*)                AS anzahl_versuche
FROM quiz_ergebnisse
WHERE thema_id IS NOT NULL
GROUP BY user_id, beruf, pruefung, thema_id
HAVING avg_prozent < 60
ORDER BY avg_prozent ASC;
