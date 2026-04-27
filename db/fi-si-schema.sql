-- ============================================================
--  SQLite-Schema: Fachinformatiker für Systemintegration
--  3. Normalform (3NF) – OOP-orientierte Tabellenstruktur
--  Jede reale Entität bekommt eine eigene Tabelle,
--  kein Nicht-Schlüssel-Attribut hängt von einem anderen
--  Nicht-Schlüssel-Attribut ab (keine transitiven Abhängigkeiten).
-- ============================================================

PRAGMA foreign_keys = ON;

-- ──────────────────────────────────────────────
--  1. AUSBILDUNGSBERUF
--     Stellt den Beruf dar (Klasse "Beruf")
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ausbildungsberufe (
    id        TEXT PRIMARY KEY,   -- z.B. 'fi-si'
    name      TEXT NOT NULL,      -- 'FI Systemintegration'
    short_name TEXT NOT NULL,     -- 'FI-SI'
    icon      TEXT NOT NULL,      -- Emoji oder SVG-ID
    color     TEXT NOT NULL,      -- Primärfarbe (HEX)
    color2    TEXT NOT NULL       -- Sekundärfarbe (HEX)
);

-- ──────────────────────────────────────────────
--  2. PRUEFUNG
--     AP1 / AP2 – gehört zu einem Ausbildungsberuf
--     (Klasse "Prüfung" mit FK → Beruf)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pruefungen (
    id                  TEXT NOT NULL,   -- 'ap1' | 'ap2'
    ausbildungsberuf_id TEXT NOT NULL,
    name                TEXT NOT NULL,   -- 'AP1'
    full_name           TEXT NOT NULL,   -- 'Abschlussprüfung Teil 1'
    beschreibung        TEXT,
    icon                TEXT,
    PRIMARY KEY (id, ausbildungsberuf_id),
    FOREIGN KEY (ausbildungsberuf_id)
        REFERENCES ausbildungsberufe(id) ON DELETE CASCADE
);

-- ──────────────────────────────────────────────
--  3. THEMA
--     Ein Prüfungsthemenblock (Klasse "Thema")
--     FK → Prüfung + Ausbildungsberuf
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS themen (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    thema_key           TEXT NOT NULL,   -- 'netzwerk', 'hardware', …
    pruefung_id         TEXT NOT NULL,
    ausbildungsberuf_id TEXT NOT NULL,
    name                TEXT NOT NULL,
    icon                TEXT,
    farbe               TEXT,            -- Akzentfarbe des Themas
    UNIQUE (thema_key, pruefung_id, ausbildungsberuf_id),
    FOREIGN KEY (pruefung_id, ausbildungsberuf_id)
        REFERENCES pruefungen(id, ausbildungsberuf_id) ON DELETE CASCADE
);

-- ──────────────────────────────────────────────
--  4. LERNKARTE
--     Eine Karteikarte in einem Thema (Klasse "Lernkarte")
--     Nur skalare Attribute – arrays → eigene Tabellen
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lernkarten (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    thema_id  INTEGER NOT NULL,
    titel     TEXT NOT NULL,
    icon      TEXT,
    body_html TEXT,          -- Erklärungstext (kann HTML enthalten)
    tipp      TEXT,
    reihenfolge INTEGER DEFAULT 0,
    FOREIGN KEY (thema_id) REFERENCES themen(id) ON DELETE CASCADE
);

-- ──────────────────────────────────────────────
--  5. LERNKARTE_KERNPUNKTE
--     Jeder Bullet-Point als eigene Zeile (1NF)
--     (Klasse "Kernpunkt" mit FK → Lernkarte)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lernkarte_kernpunkte (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    lernkarte_id INTEGER NOT NULL,
    position     INTEGER NOT NULL,   -- Reihenfolge innerhalb der Karte
    text         TEXT NOT NULL,
    FOREIGN KEY (lernkarte_id) REFERENCES lernkarten(id) ON DELETE CASCADE
);

-- ──────────────────────────────────────────────
--  6. LERNKARTE_DIAGRAMME
--     SVG-Diagramm zu einer Lernkarte (optional)
--     Ausgelagert, weil nicht jede Karte ein Diagramm hat
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lernkarte_diagramme (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    lernkarte_id INTEGER NOT NULL UNIQUE,   -- max. 1 Diagramm pro Karte
    svg_inhalt   TEXT NOT NULL,
    FOREIGN KEY (lernkarte_id) REFERENCES lernkarten(id) ON DELETE CASCADE
);

-- ──────────────────────────────────────────────
--  7. FRAGE
--     Eine Quiz-Frage innerhalb eines Themas
--     (Klasse "Frage" mit FK → Thema)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fragen (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    thema_id      INTEGER NOT NULL,
    fragetext     TEXT NOT NULL,
    erklaerung    TEXT,              -- Erklärung nach Antwort
    korrekt_index INTEGER NOT NULL,  -- 0-basierter Index der richtigen Antwortoption
    reihenfolge   INTEGER DEFAULT 0,
    FOREIGN KEY (thema_id) REFERENCES themen(id) ON DELETE CASCADE
);

-- ──────────────────────────────────────────────
--  8. ANTWORTOPTION
--     Jede Antwortmöglichkeit als eigene Zeile (1NF)
--     (Klasse "Antwortoption" mit FK → Frage)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS antwortoptionen (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    frage_id  INTEGER NOT NULL,
    position  INTEGER NOT NULL,   -- 0, 1, 2, 3
    text      TEXT NOT NULL,
    FOREIGN KEY (frage_id) REFERENCES fragen(id) ON DELETE CASCADE
);

-- ──────────────────────────────────────────────
--  INDIZES für häufige Abfragen
-- ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_themen_pruefung
    ON themen(pruefung_id, ausbildungsberuf_id);

CREATE INDEX IF NOT EXISTS idx_lernkarten_thema
    ON lernkarten(thema_id);

CREATE INDEX IF NOT EXISTS idx_kernpunkte_lernkarte
    ON lernkarte_kernpunkte(lernkarte_id, position);

CREATE INDEX IF NOT EXISTS idx_fragen_thema
    ON fragen(thema_id);

CREATE INDEX IF NOT EXISTS idx_antwortoptionen_frage
    ON antwortoptionen(frage_id, position);

-- ──────────────────────────────────────────────
--  VIEWS
-- ──────────────────────────────────────────────

-- Vollständige Übersicht: Beruf → Prüfung → Thema → Anzahl Karten/Fragen
CREATE VIEW IF NOT EXISTS v_themen_uebersicht AS
SELECT
    b.short_name                              AS beruf,
    p.name                                    AS pruefung,
    t.thema_key,
    t.name                                    AS thema,
    COUNT(DISTINCT lk.id)                     AS anzahl_lernkarten,
    COUNT(DISTINCT f.id)                      AS anzahl_fragen
FROM themen t
JOIN ausbildungsberufe b ON b.id = t.ausbildungsberuf_id
JOIN pruefungen p        ON p.id = t.pruefung_id
                        AND p.ausbildungsberuf_id = t.ausbildungsberuf_id
LEFT JOIN lernkarten lk ON lk.thema_id = t.id
LEFT JOIN fragen f      ON f.thema_id = t.id
GROUP BY t.id;

-- Alle Fragen mit zugehörigen Antwortoptionen (als JSON-Array)
CREATE VIEW IF NOT EXISTS v_fragen_mit_optionen AS
SELECT
    f.id                                                             AS frage_id,
    t.name                                                           AS thema,
    f.fragetext,
    f.korrekt_index,
    f.erklaerung,
    GROUP_CONCAT(ao.text, '||' ORDER BY ao.position)                AS optionen_concat
FROM fragen f
JOIN themen t          ON t.id = f.thema_id
JOIN antwortoptionen ao ON ao.frage_id = f.id
GROUP BY f.id;
