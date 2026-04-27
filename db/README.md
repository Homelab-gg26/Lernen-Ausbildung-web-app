# Datenbankstruktur – IT-Lernplattform

## Verzeichnis-Übersicht

```
db/
├── schema.sql   ← Tabellen, Indizes, Views (CREATE-Statements)
├── seed.sql     ← Beispieldaten (5 Nutzer, Einstellungen, Ergebnisse, Quiz-Codes)
└── README.md    ← Diese Datei
```

## Tabellen

| Tabelle                  | Zweck                                              |
|--------------------------|----------------------------------------------------|
| `users`                  | Nutzerprofile (Name, Avatar, Beruf, Prüfungsjahr)  |
| `user_settings`          | Key-Value-Einstellungen pro Nutzer                 |
| `lernfortschritt`        | Bestscores und Lernstatus pro Thema                |
| `quiz_ergebnisse`        | Log jedes Quiz-Durchlaufs                          |
| `quiz_ergebnis_details`  | Einzelne Fragen eines Durchlaufs                   |
| `quiz_codes`             | Generierte 6-stellige Quiz-Codes                   |
| `quiz_code_nutzungen`    | Log: Wer hat welchen Code wann genutzt             |

## Views

| View                  | Beschreibung                            |
|-----------------------|-----------------------------------------|
| `v_user_statistik`    | Gesamtstatistik pro Nutzer              |
| `v_schwache_themen`   | Themen mit Ø-Score < 60% pro Nutzer     |

## Setup (SQLite – lokal)

```bash
# Datenbank erstellen und Schema anlegen
sqlite3 lernplattform.db < schema.sql

# Beispieldaten einspielen
sqlite3 lernplattform.db < seed.sql

# Statistik prüfen
sqlite3 lernplattform.db "SELECT * FROM v_user_statistik;"
```

## Setup (MySQL / MariaDB)

```sql
CREATE DATABASE lernplattform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lernplattform;
SOURCE schema.sql;
SOURCE seed.sql;
```

## Anbindung ans Frontend

Aktuell nutzt das Frontend `localStorage` als Datenspeicher.
Für eine Backend-Anbindung wäre folgendes nötig:

1. **REST-API** (z.B. Node.js/Express, PHP, Python/FastAPI)
2. **Endpunkte** für:
   - `GET/PUT /api/settings/:userId`
   - `POST /api/quiz-ergebnisse`
   - `GET/POST /api/quiz-codes`
   - `GET /api/lernfortschritt/:userId`
3. **Authentifizierung** (z.B. Session-Cookie oder JWT)

Die `uuid`-Spalte in `users` ist der Brücken-Key zwischen
`localStorage` und der SQL-Datenbank.
