-- ══════════════════════════════════════════════════════════════
-- IT-Lernplattform – Beispieldaten (Seed)
-- Datei:   db/seed.sql
-- Zweck:   Initiale Testdaten für Entwicklung und Demo
--          Reihenfolge beachten (FK-Abhängigkeiten)!
-- ══════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────────────────────
-- 1. Nutzer / Profile
-- ──────────────────────────────────────────────────────────────
INSERT INTO users (uuid, name, avatar, beruf, pruefungsjahr, erstellt_am, zuletzt_aktiv) VALUES
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Max Mustermann',  '🧑‍💻', 'fi-si', 2025, '2025-01-10 08:00:00', '2025-04-25 14:30:00'),
  ('a1b2c3d4-0002-0000-0000-000000000002', 'Lena Schmidt',    '👩‍🎓', 'fi-ae', 2025, '2025-01-15 09:15:00', '2025-04-26 11:00:00'),
  ('a1b2c3d4-0003-0000-0000-000000000003', 'Tim Becker',      '🤖', 'fi-si', 2026, '2025-02-01 10:00:00', '2025-04-20 16:45:00'),
  ('a1b2c3d4-0004-0000-0000-000000000004', 'Sara Özdemir',    '🦊', 'fi-ae', 2026, '2025-02-20 12:00:00', '2025-04-27 09:00:00'),
  ('a1b2c3d4-0005-0000-0000-000000000005', 'Jonas Weber',     '🐧', 'wiso',  2025, '2025-03-05 08:30:00', '2025-04-24 13:20:00');

-- ──────────────────────────────────────────────────────────────
-- 2. Einstellungen (user_settings)
-- sektion · schluessel · wert
-- ──────────────────────────────────────────────────────────────

-- Max Mustermann (user_id = 1)
INSERT INTO user_settings (user_id, sektion, schluessel, wert) VALUES
  (1, 'quiz',       'timerSekunden',          '20'),
  (1, 'quiz',       'freiProRunde',            '15'),
  (1, 'quiz',       'zufaelligeReihenfolge',   'true'),
  (1, 'quiz',       'soundEffekte',            'true'),
  (1, 'quiz',       'confetti',                'true'),
  (1, 'lernkarten', 'autoWeiter',              'false'),
  (1, 'lernkarten', 'autoWeiterSekunden',      '5'),
  (1, 'lernkarten', 'schwierigkeitMarkierung', 'true'),
  (1, 'anzeige',    'schriftgroesse',          'normal'),
  (1, 'anzeige',    'animationen',             'true'),
  (1, 'anzeige',    'kompaktModus',            'false'),
  (1, 'datenschutz','fortschrittSpeichern',    'true'),
  (1, 'datenschutz','statistikenSpeichern',    'true'),
  (1, 'datenschutz','analyseErlaubt',          'false');

-- Lena Schmidt (user_id = 2) – bevorzugt kein Timer, kompakt
INSERT INTO user_settings (user_id, sektion, schluessel, wert) VALUES
  (2, 'quiz',       'timerSekunden',          '0'),
  (2, 'quiz',       'freiProRunde',            '10'),
  (2, 'quiz',       'zufaelligeReihenfolge',   'true'),
  (2, 'quiz',       'soundEffekte',            'false'),
  (2, 'quiz',       'confetti',                'true'),
  (2, 'lernkarten', 'autoWeiter',              'true'),
  (2, 'lernkarten', 'autoWeiterSekunden',      '8'),
  (2, 'lernkarten', 'schwierigkeitMarkierung', 'true'),
  (2, 'anzeige',    'schriftgroesse',          'gross'),
  (2, 'anzeige',    'animationen',             'true'),
  (2, 'anzeige',    'kompaktModus',            'true'),
  (2, 'datenschutz','fortschrittSpeichern',    'true'),
  (2, 'datenschutz','statistikenSpeichern',    'false'),
  (2, 'datenschutz','analyseErlaubt',          'true');

-- Tim Becker (user_id = 3)
INSERT INTO user_settings (user_id, sektion, schluessel, wert) VALUES
  (3, 'quiz',       'timerSekunden',          '30'),
  (3, 'quiz',       'freiProRunde',            '20'),
  (3, 'quiz',       'zufaelligeReihenfolge',   'false'),
  (3, 'quiz',       'soundEffekte',            'true'),
  (3, 'quiz',       'confetti',                'true'),
  (3, 'anzeige',    'schriftgroesse',          'klein'),
  (3, 'anzeige',    'kompaktModus',            'true'),
  (3, 'datenschutz','fortschrittSpeichern',    'true'),
  (3, 'datenschutz','statistikenSpeichern',    'true'),
  (3, 'datenschutz','analyseErlaubt',          'true');

-- ──────────────────────────────────────────────────────────────
-- 3. Lernfortschritt
-- ──────────────────────────────────────────────────────────────

-- Max Mustermann – FI-SI AP1 (fast durch)
INSERT INTO lernfortschritt (user_id, beruf, pruefung, thema_id, gelernt, best_score, versuche, aktualisiert_am) VALUES
  (1, 'fi-si', 'ap1', 'netzwerk',       1, 87.5, 3, '2025-04-20 10:00:00'),
  (1, 'fi-si', 'ap1', 'hardware',       1, 75.0, 2, '2025-04-21 11:30:00'),
  (1, 'fi-si', 'ap1', 'betriebssysteme',1, 62.5, 2, '2025-04-22 09:00:00'),
  (1, 'fi-si', 'ap1', 'sicherheit',     0, 50.0, 1, '2025-04-23 14:00:00'),
  (1, 'fi-si', 'ap1', 'datenbanken',    0,  0.0, 0, NULL),
  (1, 'fi-si', 'ap2', 'virtualisierung',1, 100.0,4, '2025-04-24 16:00:00'),
  (1, 'fi-si', 'ap2', 'dsgvo-si',       0, 37.5, 1, '2025-04-25 08:30:00');

-- Lena Schmidt – FI-AE AP1 + AP2
INSERT INTO lernfortschritt (user_id, beruf, pruefung, thema_id, gelernt, best_score, versuche, aktualisiert_am) VALUES
  (2, 'fi-ae', 'ap1', 'programmierung-ae', 1, 100.0, 5, '2025-04-15 10:00:00'),
  (2, 'fi-ae', 'ap1', 'datenbanken-ae',    1,  87.5, 3, '2025-04-18 12:00:00'),
  (2, 'fi-ae', 'ap1', 'netzwerk-ae',       0,  62.5, 2, '2025-04-20 09:00:00'),
  (2, 'fi-ae', 'ap1', 'sicherheit-ae',     0,  50.0, 1, '2025-04-22 14:00:00'),
  (2, 'fi-ae', 'ap2', 'softwareentwicklung',1, 75.0, 3, '2025-04-23 11:00:00'),
  (2, 'fi-ae', 'ap2', 'uml',               0,  37.5, 1, '2025-04-25 10:00:00'),
  (2, 'fi-ae', 'ap2', 'datenbankdesign',   0,   0.0, 0, NULL),
  (2, 'fi-ae', 'ap2', 'projektmanagement-ae',0, 0.0, 0, NULL);

-- Tim Becker – FI-SI, noch am Anfang
INSERT INTO lernfortschritt (user_id, beruf, pruefung, thema_id, gelernt, best_score, versuche, aktualisiert_am) VALUES
  (3, 'fi-si', 'ap1', 'netzwerk',       1, 62.5, 2, '2025-04-10 09:00:00'),
  (3, 'fi-si', 'ap1', 'hardware',       0, 37.5, 1, '2025-04-12 10:00:00');

-- Jonas Weber – WiSo
INSERT INTO lernfortschritt (user_id, beruf, pruefung, thema_id, gelernt, best_score, versuche, aktualisiert_am) VALUES
  (5, 'wiso', 'wiso', 'arbeitsrecht',     1, 87.5, 3, '2025-04-18 09:00:00'),
  (5, 'wiso', 'wiso', 'sozialversicherung',1,75.0, 2, '2025-04-20 10:30:00'),
  (5, 'wiso', 'wiso', 'wirtschaft',       0, 62.5, 2, '2025-04-22 14:00:00'),
  (5, 'wiso', 'wiso', 'ausbildung',       1,100.0, 4, '2025-04-23 11:00:00'),
  (5, 'wiso', 'wiso', 'steuern',          0,  0.0, 0, NULL);

-- ──────────────────────────────────────────────────────────────
-- 4. Quiz-Ergebnisse (Durchläufe)
-- ──────────────────────────────────────────────────────────────

-- Max: Netzwerk 3 Versuche
INSERT INTO quiz_ergebnisse (user_id, beruf, pruefung, thema_id, score, richtig, gesamt, prozent, streak_max, dauer_sekunden, gespielt_am) VALUES
  (1, 'fi-si', 'ap1', 'netzwerk', 120, 5, 8, 62.5,  3, 95,  '2025-04-18 10:05:00'),
  (1, 'fi-si', 'ap1', 'netzwerk', 160, 6, 8, 75.0,  4, 82,  '2025-04-19 11:10:00'),
  (1, 'fi-si', 'ap1', 'netzwerk', 210, 7, 8, 87.5,  6, 74,  '2025-04-20 10:00:00'),
-- Max: Virtualisierung (AP2), Bestleistung
  (1, 'fi-si', 'ap2', 'virtualisierung', 240, 8, 8, 100.0, 8, 68, '2025-04-24 16:00:00'),
-- Max: DSGVO schwach
  (1, 'fi-si', 'ap2', 'dsgvo-si', 80, 3, 8, 37.5, 2, 110, '2025-04-25 08:30:00'),
-- Max: Gemischtes Quiz AP1
  (1, 'fi-si', 'ap1', NULL, 310, 11, 15, 73.3, 5, 180, '2025-04-26 14:00:00');

-- Lena: Programmierung Profi
INSERT INTO quiz_ergebnisse (user_id, beruf, pruefung, thema_id, score, richtig, gesamt, prozent, streak_max, dauer_sekunden, gespielt_am) VALUES
  (2, 'fi-ae', 'ap1', 'programmierung-ae', 280, 8, 8, 100.0, 8, 60, '2025-04-15 10:00:00'),
  (2, 'fi-ae', 'ap1', 'programmierung-ae', 310, 8, 8, 100.0, 8, 55, '2025-04-18 09:00:00'),
  (2, 'fi-ae', 'ap1', 'datenbanken-ae',    210, 7, 8, 87.5,  5, 88, '2025-04-18 12:00:00'),
  (2, 'fi-ae', 'ap1', 'sicherheit-ae',      90, 4, 8, 50.0,  2, 120,'2025-04-22 14:00:00'),
  (2, 'fi-ae', 'ap2', 'softwareentwicklung',180,6, 8, 75.0,  4, 95, '2025-04-23 11:00:00');

-- Tim: Anfänger
INSERT INTO quiz_ergebnisse (user_id, beruf, pruefung, thema_id, score, richtig, gesamt, prozent, streak_max, dauer_sekunden, gespielt_am) VALUES
  (3, 'fi-si', 'ap1', 'netzwerk', 80, 4, 8, 50.0, 2, 140, '2025-04-08 10:00:00'),
  (3, 'fi-si', 'ap1', 'netzwerk',120, 5, 8, 62.5, 3, 115, '2025-04-10 09:00:00');

-- Jonas: WiSo
INSERT INTO quiz_ergebnisse (user_id, beruf, pruefung, thema_id, score, richtig, gesamt, prozent, streak_max, dauer_sekunden, gespielt_am) VALUES
  (5, 'wiso', 'wiso', 'arbeitsrecht',     180, 6, 8, 75.0,  4, 90, '2025-04-16 09:00:00'),
  (5, 'wiso', 'wiso', 'arbeitsrecht',     210, 7, 8, 87.5,  5, 80, '2025-04-18 09:00:00'),
  (5, 'wiso', 'wiso', 'sozialversicherung',180,6, 8, 75.0,  4, 92, '2025-04-20 10:30:00'),
  (5, 'wiso', 'wiso', 'ausbildung',       280, 8, 8,100.0,  8, 62, '2025-04-23 11:00:00'),
  (5, 'wiso', 'wiso', NULL,               420,12,15, 80.0,  6,175, '2025-04-24 14:00:00');

-- ──────────────────────────────────────────────────────────────
-- 5. Quiz-Codes
-- ──────────────────────────────────────────────────────────────
INSERT INTO quiz_codes (code, erstellt_von, beruf, pruefung, thema_id, nutzungen, erstellt_am, gueltig_bis) VALUES
  ('NETZ42', 1, 'fi-si', 'ap1', 'netzwerk',       3, '2025-04-26 08:00:00', '2025-04-27 08:00:00'),
  ('VIRT88', 1, 'fi-si', 'ap2', 'virtualisierung',1, '2025-04-26 10:00:00', '2025-04-27 10:00:00'),
  ('PROG99', 2, 'fi-ae', 'ap1', 'programmierung-ae',2,'2025-04-25 09:00:00', '2025-04-26 09:00:00'),
  ('WISO01', 5, 'wiso',  'wiso', NULL,             4, '2025-04-24 14:00:00', '2025-04-25 14:00:00'),
  ('MIXABC', 1, 'fi-si', 'ap1', NULL,              0, '2025-04-27 07:00:00', '2025-04-28 07:00:00');

-- ──────────────────────────────────────────────────────────────
-- 6. Quiz-Code-Nutzungen
-- ──────────────────────────────────────────────────────────────
INSERT INTO quiz_code_nutzungen (code_id, user_id, eingeloest_am) VALUES
  (1, 3, '2025-04-26 09:00:00'),
  (1, 4, '2025-04-26 10:30:00'),
  (1, 5, '2025-04-26 12:00:00'),
  (2, 2, '2025-04-26 11:00:00'),
  (3, 4, '2025-04-25 10:00:00'),
  (3, 3, '2025-04-25 11:30:00'),
  (4, 1, '2025-04-24 15:00:00'),
  (4, 2, '2025-04-24 15:30:00'),
  (4, 3, '2025-04-24 16:00:00'),
  (4, 4, '2025-04-24 16:45:00');

-- ──────────────────────────────────────────────────────────────
-- Abfrage-Beispiele (auskommentiert – zum Testen)
-- ──────────────────────────────────────────────────────────────

-- Alle Nutzer mit Statistik:
-- SELECT * FROM v_user_statistik;

-- Schwächste Themen aller Nutzer:
-- SELECT * FROM v_schwache_themen;

-- Bestenliste (Highscore, gemischtes Quiz):
-- SELECT u.name, u.avatar, MAX(qe.score) AS highscore
-- FROM quiz_ergebnisse qe
-- JOIN users u ON u.id = qe.user_id
-- WHERE qe.thema_id IS NULL
-- GROUP BY qe.user_id
-- ORDER BY highscore DESC;

-- Fortschritt eines Nutzers:
-- SELECT beruf, pruefung, thema_id, best_score, versuche, gelernt
-- FROM lernfortschritt WHERE user_id = 1 ORDER BY aktualisiert_am DESC;

-- Einstellungen auslesen (als JSON-ähnliche Struktur):
-- SELECT sektion, schluessel, wert FROM user_settings WHERE user_id = 1 ORDER BY sektion, schluessel;

-- Aktive Codes prüfen:
-- SELECT code, beruf, pruefung, thema_id, nutzungen, gueltig_bis
-- FROM quiz_codes WHERE gueltig_bis > CURRENT_TIMESTAMP;
