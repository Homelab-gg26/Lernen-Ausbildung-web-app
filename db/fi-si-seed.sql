-- ============================================================
--  Seed-Daten: Fachinformatiker für Systemintegration (FI-SI)
--  Alle Inhalte aus js/data-fi-si.js als SQL-INSERT-Statements
--  Reihenfolge: Beruf → Prüfungen → Themen →
--               Lernkarten + Kernpunkte + Diagramme →
--               Fragen + Antwortoptionen
-- ============================================================

PRAGMA foreign_keys = ON;
BEGIN TRANSACTION;

-- ──────────────────────────────────────────────
--  AUSBILDUNGSBERUF
-- ──────────────────────────────────────────────
INSERT INTO ausbildungsberufe (id, name, short_name, icon, color, color2) VALUES
    ('fi-si', 'FI Systemintegration', 'FI-SI', '🖧', '#667eea', '#764ba2');

-- ──────────────────────────────────────────────
--  PRÜFUNGEN (AP1 und AP2)
-- ──────────────────────────────────────────────
INSERT INTO pruefungen (id, ausbildungsberuf_id, name, full_name, beschreibung, icon) VALUES
    ('ap1', 'fi-si', 'AP1', 'Abschlussprüfung Teil 1',
     'Netzwerke, Hardware, Betriebssysteme, Programmierung & Datenbanken', '🖥️'),
    ('ap2', 'fi-si', 'AP2', 'Abschlussprüfung Teil 2 – Systemintegration',
     'Virtualisierung, Cloud, Active Directory, Backup, DSGVO & Projektmanagement', '🖧');

-- ──────────────────────────────────────────────
--  THEMEN – AP1
-- ──────────────────────────────────────────────
INSERT INTO themen (thema_key, pruefung_id, ausbildungsberuf_id, name, icon, farbe) VALUES
    ('netzwerk',        'ap1', 'fi-si', 'Netzwerktechnik',    '🌐', '#4facfe'),
    ('hardware',        'ap1', 'fi-si', 'Hardware & RAID',    '💾', '#fa709a'),
    ('betriebssysteme', 'ap1', 'fi-si', 'Betriebssysteme',    '🐧', '#43e97b'),
    ('sicherheit',      'ap1', 'fi-si', 'IT-Sicherheit',      '🔒', '#f6d365'),
    ('datenbanken',     'ap1', 'fi-si', 'Datenbanken & SQL',  '🗃️', '#a18cd1');

-- ──────────────────────────────────────────────
--  THEMEN – AP2
-- ──────────────────────────────────────────────
INSERT INTO themen (thema_key, pruefung_id, ausbildungsberuf_id, name, icon, farbe) VALUES
    ('virtualisierung',      'ap2', 'fi-si', 'Virtualisierung & Cloud',   '☁️', '#4facfe'),
    ('dsgvo-si',             'ap2', 'fi-si', 'IT-Sicherheit & DSGVO',     '🛡️', '#f6d365'),
    ('server-si',            'ap2', 'fi-si', 'Server & Active Directory', '🖧', '#a18cd1'),
    ('projektmanagement-si', 'ap2', 'fi-si', 'Projektmanagement',         '📋', '#43e97b');

-- ============================================================
--  LERNKARTEN & KERNPUNKTE & DIAGRAMME
-- ============================================================

-- ── AP1 · NETZWERKTECHNIK ────────────────────────────────────

-- Karte 1: Das OSI-Modell
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Das OSI-Modell', '📶',
     'Das <strong>OSI-Modell</strong> (Open Systems Interconnection) teilt die Netzwerkkommunikation in <strong>7 Schichten</strong> auf. Jede Schicht hat eine klar definierte Aufgabe.<br><br>Merkhilfe: <strong>„Alle Priester Saufen Tequila Nach Der Predigt"</strong>',
     'Im Examen wird oft nach der Schicht eines Protokolls gefragt. TCP/UDP = Schicht 4, IP = Schicht 3, Ethernet = Schicht 2.',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'Schicht 1-4: Transportorientiert'),
    (last_insert_rowid(), 2, 'Schicht 5-7: Anwendungsorientiert'),
    (last_insert_rowid(), 3, 'TCP arbeitet auf Schicht 4'),
    (last_insert_rowid(), 4, 'IP arbeitet auf Schicht 3'),
    (last_insert_rowid(), 5, 'Switches arbeiten auf Schicht 2');

INSERT INTO lernkarte_diagramme (lernkarte_id, svg_inhalt) VALUES
    ((SELECT id FROM lernkarten WHERE titel='Das OSI-Modell'),
     '<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#667eea"/><stop offset="100%" stop-color="#764ba2"/></linearGradient></defs><rect x="10" y="10" width="400" height="30" rx="5" fill="url(#g1)" opacity="1"/><text x="20" y="30" fill="white" font-size="12" font-weight="800">Schicht 7: Anwendung</text><text x="260" y="30" fill="rgba(255,255,255,0.85)" font-size="11">HTTP, FTP, SMTP, DNS</text><rect x="10" y="44" width="400" height="30" rx="5" fill="url(#g1)" opacity="0.92"/><text x="20" y="64" fill="white" font-size="12" font-weight="800">Schicht 6: Darstellung</text><text x="260" y="64" fill="rgba(255,255,255,0.85)" font-size="11">SSL/TLS, JPEG, ASCII</text><rect x="10" y="78" width="400" height="30" rx="5" fill="url(#g1)" opacity="0.84"/><text x="20" y="98" fill="white" font-size="12" font-weight="800">Schicht 5: Sitzung</text><text x="260" y="98" fill="rgba(255,255,255,0.85)" font-size="11">NetBIOS, RPC</text><rect x="10" y="112" width="400" height="30" rx="5" fill="url(#g1)" opacity="0.76"/><text x="20" y="132" fill="white" font-size="12" font-weight="800">Schicht 4: Transport</text><text x="260" y="132" fill="rgba(255,255,255,0.85)" font-size="11">TCP, UDP</text><rect x="10" y="146" width="400" height="30" rx="5" fill="url(#g1)" opacity="0.68"/><text x="20" y="166" fill="white" font-size="12" font-weight="800">Schicht 3: Vermittlung</text><text x="260" y="166" fill="rgba(255,255,255,0.85)" font-size="11">IP, ICMP, Router</text><rect x="10" y="180" width="400" height="30" rx="5" fill="url(#g1)" opacity="0.60"/><text x="20" y="200" fill="white" font-size="12" font-weight="800">Schicht 2: Sicherung</text><text x="260" y="200" fill="rgba(255,255,255,0.85)" font-size="11">Ethernet, MAC, Switch</text><rect x="10" y="214" width="400" height="30" rx="5" fill="url(#g1)" opacity="0.52"/><text x="20" y="234" fill="white" font-size="12" font-weight="800">Schicht 1: Bitübertragung</text><text x="260" y="234" fill="rgba(255,255,255,0.85)" font-size="11">Kabel, WLAN, Hub</text></svg>');

-- Karte 2: TCP vs. UDP
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'TCP vs. UDP', '🔄',
     '<strong>TCP</strong> ist verbindungsorientiert: 3-Wege-Handshake (SYN → SYN-ACK → ACK), Fehlerkorrektur und garantierte Reihenfolge.<br><br><strong>UDP</strong> ist verbindungslos: Pakete werden gesendet ohne Bestätigung – schnell, aber unzuverlässig.',
     'Typische Prüfungsfrage: DNS nutzt UDP (Port 53), HTTP nutzt TCP (Port 80).',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'TCP: HTTP, HTTPS, FTP, SSH, SMTP'),
    (last_insert_rowid(), 2, 'UDP: DNS, DHCP, VoIP, Streaming, Gaming'),
    (last_insert_rowid(), 3, 'TCP-Handshake: SYN → SYN-ACK → ACK'),
    (last_insert_rowid(), 4, 'UDP hat keinen Verbindungsaufbau');

-- Karte 3: IP-Adressen & Subnetting
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'IP-Adressen & Subnetting', '📍',
     'Eine <strong>IPv4-Adresse</strong> besteht aus 32 Bit (4 Oktette). Die <strong>Subnetzmaske</strong> teilt die Adresse in Netzanteil und Hostanteil.<br><br>Beispiel: <code>192.168.1.0/24</code> → 254 nutzbare Hosts (256 − 2).',
     'Formel: Anzahl Hosts = 2^(32−Präfix) − 2. Bei /24: 2^8 − 2 = 254.',
     3);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, '/24 = 255.255.255.0 = 254 Hosts'),
    (last_insert_rowid(), 2, '/25 = 255.255.255.128 = 126 Hosts'),
    (last_insert_rowid(), 3, '/26 = 255.255.255.192 = 62 Hosts'),
    (last_insert_rowid(), 4, 'Private Bereiche: 10.x, 172.16-31.x, 192.168.x'),
    (last_insert_rowid(), 5, 'Broadcast = letzte Adresse im Subnetz');

-- ── AP1 · HARDWARE & RAID ────────────────────────────────────

-- Karte 4: RAID-Systeme
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'RAID-Systeme', '🗄️',
     '<strong>RAID</strong> (Redundant Array of Independent Disks) kombiniert mehrere Festplatten für mehr Leistung oder Ausfallsicherheit.<br><br>Die wichtigsten RAID-Level: RAID 0, 1, 5 und 10.',
     'RAID ist kein Backup! Es schützt nur vor Festplattenausfall, nicht vor versehentlichem Löschen.',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'RAID 0: Striping, schnell, KEINE Redundanz, min. 2 Platten'),
    (last_insert_rowid(), 2, 'RAID 1: Mirroring, 50% Kapazität, 1 Ausfall toleriert'),
    (last_insert_rowid(), 3, 'RAID 5: Striping+Parität, min. 3 Platten, 1 Ausfall toleriert'),
    (last_insert_rowid(), 4, 'RAID 10: RAID 1+0, min. 4 Platten, schnell & sicher'),
    (last_insert_rowid(), 5, 'RAID 5 Kapazität: (n-1) × Plattengröße');

INSERT INTO lernkarte_diagramme (lernkarte_id, svg_inhalt) VALUES
    ((SELECT id FROM lernkarten WHERE titel='RAID-Systeme'),
     '<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif"><text x="10" y="20" fill="#fa709a" font-size="13" font-weight="800">RAID 0 – Striping (Geschwindigkeit, keine Redundanz)</text><rect x="30" y="30" width="45" height="50" rx="4" fill="#333" stroke="#fa709a" stroke-width="2"/><text x="52" y="60" text-anchor="middle" fill="#fa709a" font-size="11">HDD1</text><rect x="90" y="30" width="45" height="50" rx="4" fill="#333" stroke="#fa709a" stroke-width="2"/><text x="112" y="60" text-anchor="middle" fill="#fa709a" font-size="11">HDD2</text><text x="160" y="60" fill="#888" font-size="20">→</text><text x="185" y="65" fill="#ccc" font-size="11">Daten verteilt, 2× Speed</text><text x="10" y="110" fill="#4da6ff" font-size="13" font-weight="800">RAID 1 – Mirroring (Spiegelung, 50% Kapazität)</text><rect x="30" y="120" width="45" height="50" rx="4" fill="#333" stroke="#4da6ff" stroke-width="2"/><text x="52" y="150" text-anchor="middle" fill="#4da6ff" font-size="11">Kopie</text><rect x="90" y="120" width="45" height="50" rx="4" fill="#333" stroke="#4da6ff" stroke-width="2"/><text x="112" y="150" text-anchor="middle" fill="#4da6ff" font-size="11">Kopie</text><text x="160" y="150" fill="#888" font-size="20">→</text><text x="185" y="155" fill="#ccc" font-size="11">Identische Daten, 1 Ausfall OK</text></svg>');

-- Karte 5: CPU, RAM & Speicher
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'CPU, RAM & Speicher', '🔧',
     'Die <strong>CPU</strong> führt Befehle aus. Kennzahlen: Taktfrequenz (GHz), Kerne, Cache (L1/L2/L3).<br><br><strong>RAM</strong>: Flüchtiger Arbeitsspeicher (DDR4/DDR5).<br><br><strong>SSD vs. HDD</strong>: SSDs sind schneller (keine beweglichen Teile), HDDs günstiger pro GB.',
     'SSD = keine beweglichen Teile, schneller, teurer. HDD = magnetisch, günstiger pro TB.',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'L1-Cache: Schnellster, kleinster Cache (direkt in CPU)'),
    (last_insert_rowid(), 2, 'DDR5 ist schneller und effizienter als DDR4'),
    (last_insert_rowid(), 3, 'NVMe SSD über PCIe: deutlich schneller als SATA SSD'),
    (last_insert_rowid(), 4, 'HDD: magnetisch, günstiger, aber langsamer und stoßempfindlicher'),
    (last_insert_rowid(), 5, 'ECC-RAM: Fehlerkorrektur, wird in Servern eingesetzt');

-- ── AP1 · BETRIEBSSYSTEME ────────────────────────────────────

-- Karte 6: Linux Grundlagen
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Linux Grundlagen', '🐧',
     'Linux verwendet eine <strong>hierarchische Verzeichnisstruktur</strong> beginnend bei <code>/</code>. Wichtige Verzeichnisse: <code>/etc</code> (Konfiguration), <code>/var</code> (variable Daten), <code>/home</code> (Benutzerverzeichnisse).<br><br><strong>Dateiberechtigungen</strong>: rwxrwxrwx. r=4, w=2, x=1. <code>chmod 755</code> = rwxr-xr-x',
     'chmod 777 = alle Rechte für alle. chmod 644 = lesbar für alle, nur Owner schreibt.',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'ls -la: Dateien mit Berechtigungen anzeigen'),
    (last_insert_rowid(), 2, 'chmod 755: rwxr-xr-x'),
    (last_insert_rowid(), 3, 'chown user:group datei: Eigentümer ändern'),
    (last_insert_rowid(), 4, 'ps aux: Laufende Prozesse anzeigen'),
    (last_insert_rowid(), 5, 'sudo: Befehl als Root ausführen');

-- Karte 7: Dateisysteme
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Dateisysteme', '📁',
     '<strong>FAT32</strong>: Max. 4 GB pro Datei. Kompatibel mit fast allem.<br><strong>NTFS</strong>: Windows-Standard, große Dateien, Zugriffsrechte, Journaling.<br><strong>ext4</strong>: Linux-Standard, Journaling.<br><strong>exFAT</strong>: Für USB-Sticks, keine 4-GB-Grenze.',
     'USB-Stick für Windows UND Mac → exFAT oder FAT32, NICHT NTFS.',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'FAT32: Max. 4 GB pro Datei'),
    (last_insert_rowid(), 2, 'NTFS: Unterstützt ACL-Berechtigungen'),
    (last_insert_rowid(), 3, 'ext4: Standard-Dateisystem unter Linux'),
    (last_insert_rowid(), 4, 'Journaling: Schreiboperationen protokolliert → crash-sicher'),
    (last_insert_rowid(), 5, 'exFAT: Ideal für SD-Karten und USB-Sticks >4 GB');

-- ── AP1 · IT-SICHERHEIT ──────────────────────────────────────

-- Karte 8: Verschlüsselungsverfahren
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Verschlüsselungsverfahren', '🔐',
     '<strong>Symmetrische Verschlüsselung</strong>: Ein Schlüssel für Ver- und Entschlüsselung. Schnell. Beispiele: AES, 3DES.<br><br><strong>Asymmetrische Verschlüsselung</strong>: Public Key (Verschlüsseln) + Private Key (Entschlüsseln). Beispiele: RSA, ECC.<br><br><strong>Hybridverschlüsselung</strong>: Kombination beider Verfahren (TLS/HTTPS).',
     'HTTPS = HTTP + TLS. TLS nutzt asymmetrische Verschlüsselung für den Handshake, dann symmetrische für Daten.',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'AES-256: Standard für symmetrische Verschlüsselung'),
    (last_insert_rowid(), 2, 'RSA: Asymmetrisch, typisch 2048 oder 4096 Bit'),
    (last_insert_rowid(), 3, 'TLS: Hybridverfahren'),
    (last_insert_rowid(), 4, 'Hash-Funktionen (SHA-256): Einwegfunktion'),
    (last_insert_rowid(), 5, 'Digitale Signatur: Mit Private Key signieren, Public Key prüfen');

-- Karte 9: Angriffsvektoren & Schutz
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Angriffsvektoren & Schutz', '🛡️',
     '<strong>Phishing</strong>: Gefälschte E-Mails/Webseiten.<br><strong>SQL-Injection</strong>: Einschleusen von SQL-Code.<br><strong>Man-in-the-Middle (MitM)</strong>: Angreifer zwischen Kommunikationspartnern.<br><strong>DoS/DDoS</strong>: Überlastung von Diensten.<br><strong>Brute Force</strong>: Ausprobieren aller Passwortkombinationen.',
     'SQL-Injection Schutz: immer Prepared Statements verwenden, niemals Benutzereingaben direkt in SQL einbauen.',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'Firewall: Filtert Netzwerkpakete'),
    (last_insert_rowid(), 2, 'IDS: erkennt Angriffe'),
    (last_insert_rowid(), 3, 'IPS: blockiert Angriffe aktiv'),
    (last_insert_rowid(), 4, '2FA/MFA: Schutz vor gestohlenen Passwörtern'),
    (last_insert_rowid(), 5, 'Prepared Statements: Schutz vor SQL-Injection'),
    (last_insert_rowid(), 6, 'Backup 3-2-1: 3 Kopien, 2 Medien, 1 externes');

-- ── AP1 · DATENBANKEN & SQL ──────────────────────────────────

-- Karte 10: SQL Grundlagen
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'SQL Grundlagen', '📋',
     '<strong>SQL</strong> (Structured Query Language) ist die Standardsprache für relationale Datenbanken.<br><br><code>SELECT</code> – Daten abfragen<br><code>INSERT INTO</code> – Daten einfügen<br><code>UPDATE</code> – Daten ändern<br><code>DELETE</code> – Daten löschen<br><code>JOIN</code> – Tabellen verknüpfen',
     'INNER JOIN gibt nur Datensätze zurück, die in BEIDEN Tabellen einen Match haben. LEFT JOIN gibt IMMER alle Datensätze der linken Tabelle zurück.',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'PRIMARY KEY: Eindeutiger Schlüssel, darf nicht NULL sein'),
    (last_insert_rowid(), 2, 'FOREIGN KEY: Verweist auf PRIMARY KEY einer anderen Tabelle'),
    (last_insert_rowid(), 3, 'INDEX: Beschleunigt Abfragen'),
    (last_insert_rowid(), 4, 'DISTINCT: Entfernt doppelte Ergebnisse'),
    (last_insert_rowid(), 5, 'COUNT(), SUM(), AVG(), MAX(), MIN(): Aggregatfunktionen');

-- Karte 11: Normalformen
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Normalformen', '📐',
     '<strong>1. NF</strong>: Alle Attribute sind atomar. Keine wiederholenden Gruppen.<br><strong>2. NF</strong>: In 1NF + alle Nicht-Schlüssel-Attribute voll funktional abhängig vom gesamten Primärschlüssel.<br><strong>3. NF</strong>: In 2NF + keine transitiven Abhängigkeiten.',
     'Merkhilfe: 1NF = atomar, 2NF = voll abhängig, 3NF = kein transitives Chaos.',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, '1NF: Keine mehrwertigen Attribute'),
    (last_insert_rowid(), 2, '2NF: Gilt nur bei zusammengesetzten Primärschlüsseln'),
    (last_insert_rowid(), 3, '3NF: Keine Abhängigkeit zwischen Nicht-Schlüssel-Attributen'),
    (last_insert_rowid(), 4, 'BCNF: Verschärfte 3NF');

-- ── AP2 · VIRTUALISIERUNG & CLOUD ───────────────────────────

-- Karte 12: Virtualisierung
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Virtualisierung', '🖥️',
     '<strong>Virtualisierung</strong> ermöglicht den Betrieb mehrerer VMs auf einer physischen Hardware.<br><br><strong>Typ-1-Hypervisor</strong> (Bare Metal): Direkt auf Hardware. Beispiele: VMware ESXi, Hyper-V, KVM.<br><strong>Typ-2-Hypervisor</strong> (Hosted): Auf Betriebssystem. Beispiele: VirtualBox, VMware Workstation.',
     'Container starten in Sekunden, VMs in Minuten. Container sind leichter, aber weniger isoliert.',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'Typ-1: direkt auf Hardware, effizienter (ESXi, Hyper-V)'),
    (last_insert_rowid(), 2, 'Typ-2: auf Betriebssystem (VirtualBox)'),
    (last_insert_rowid(), 3, 'Container teilen OS-Kernel → leichter als VMs'),
    (last_insert_rowid(), 4, 'Docker: Container-Plattform'),
    (last_insert_rowid(), 5, 'Snapshot: Zustandssicherung einer VM');

-- Karte 13: Cloud Computing
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Cloud Computing', '🌥️',
     '<strong>IaaS</strong> (Infrastructure as a Service): Virtuelle Hardware. Beispiel: AWS EC2.<br><strong>PaaS</strong> (Platform as a Service): Entwicklungsplattform. Beispiel: Heroku.<br><strong>SaaS</strong> (Software as a Service): Fertige Anwendungen. Beispiel: Office 365.',
     'IaaS = Server mieten, PaaS = Plattform mieten, SaaS = Software mieten. Je höher, desto weniger Kontrolle.',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'IaaS: Maximale Kontrolle, mehr Verwaltungsaufwand'),
    (last_insert_rowid(), 2, 'PaaS: Entwickler konzentriert sich auf Code'),
    (last_insert_rowid(), 3, 'SaaS: Keine Installation, komplett verwaltet'),
    (last_insert_rowid(), 4, 'Public Cloud: Ressourcen geteilt'),
    (last_insert_rowid(), 5, 'Private Cloud: Eigene Infrastruktur'),
    (last_insert_rowid(), 6, 'Hybrid Cloud: Kombination aus Public und Private');

-- ── AP2 · IT-SICHERHEIT & DSGVO ──────────────────────────────

-- Karte 14: DSGVO Grundlagen
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'DSGVO Grundlagen', '⚖️',
     'Die <strong>DSGVO</strong> gilt seit Mai 2018 in der EU. Grundprinzipien: Rechtmäßigkeit, Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung.<br><br>Datenpanne: Meldung innerhalb <strong>72 Stunden</strong> an Aufsichtsbehörde.',
     '72-Stunden-Frist bei Datenpannen ist eine häufige Prüfungsfrage!',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'Personenbezogene Daten: Name, E-Mail, IP-Adresse'),
    (last_insert_rowid(), 2, 'Recht auf Auskunft'),
    (last_insert_rowid(), 3, 'Recht auf Löschung (Art. 17)'),
    (last_insert_rowid(), 4, 'Datenpanne: 72 Stunden Meldefrist'),
    (last_insert_rowid(), 5, 'Bußgelder bis 20 Mio. € oder 4% des Jahresumsatzes'),
    (last_insert_rowid(), 6, 'AVV bei externen Dienstleistern');

-- Karte 15: CIA-Triade & BSI
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'CIA-Triade & BSI', '🔒',
     'Das <strong>IT-Grundschutz-Kompendium</strong> des BSI bietet Leitfäden für IT-Sicherheit.<br><br><strong>CIA-Triade</strong>:<br>• <strong>C</strong>onfidentiality (Vertraulichkeit)<br>• <strong>I</strong>ntegrity (Integrität)<br>• <strong>A</strong>vailability (Verfügbarkeit)',
     'CIA: Vertraulichkeit = Verschlüsselung, Integrität = Hashwert, Verfügbarkeit = Redundanz.',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'Vertraulichkeit: Verschlüsselung'),
    (last_insert_rowid(), 2, 'Integrität: Hashwerte, digitale Signaturen'),
    (last_insert_rowid(), 3, 'Verfügbarkeit: Redundanz, Backups'),
    (last_insert_rowid(), 4, 'Penetrationstest: Autorisierter Angriff'),
    (last_insert_rowid(), 5, 'Zero Trust: Alles muss authentifiziert werden'),
    (last_insert_rowid(), 6, 'Patch Management: Regelmäßige Updates');

-- ── AP2 · SERVER & ACTIVE DIRECTORY ──────────────────────────

-- Karte 16: Active Directory
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Active Directory', '📂',
     '<strong>Active Directory (AD)</strong> verwaltet Benutzer, Gruppen, Computer und Richtlinien zentral.<br><br>• <strong>Domain Controller (DC)</strong>: Server mit AD-Rolle<br>• <strong>GPO</strong>: Group Policy Object<br>• <strong>OU</strong>: Organizational Unit<br>• <strong>LDAP</strong>: Protokoll für Verzeichniszugriff',
     'GPO = zentrale Steuerung von Passwortrichtlinien, Software und Desktop-Einstellungen.',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'DNS ist Voraussetzung für Active Directory'),
    (last_insert_rowid(), 2, 'GPO steuert Computereinstellungen zentral'),
    (last_insert_rowid(), 3, 'RADIUS: Authentifizierung für Netzwerkzugriff'),
    (last_insert_rowid(), 4, 'LDAP Port 389, LDAPS Port 636'),
    (last_insert_rowid(), 5, 'Kerberos: Authentifizierungsprotokoll in AD');

-- Karte 17: Backup & Hochverfügbarkeit
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Backup & Hochverfügbarkeit', '💾',
     '<strong>Vollbackup</strong>: Alle Daten, einfache Wiederherstellung.<br><strong>Differenziell</strong>: Alle Änderungen seit letztem Vollbackup.<br><strong>Inkrementell</strong>: Nur Änderungen seit letztem Backup.<br><br><strong>Hochverfügbarkeit</strong>: Redundante Systeme für minimale Ausfallzeiten.',
     'RPO = wieviel Datenverlust tolerierbar, RTO = wie lange darf System ausfallen.',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, '3-2-1-Regel: 3 Kopien, 2 Medien, 1 extern'),
    (last_insert_rowid(), 2, 'RPO: Maximaler Datenverlust (Zeitpunkt)'),
    (last_insert_rowid(), 3, 'RTO: Maximale Ausfallzeit'),
    (last_insert_rowid(), 4, 'Failover-Cluster: Automatischer Wechsel'),
    (last_insert_rowid(), 5, 'Load Balancer: Verteilt Anfragen');

-- ── AP2 · PROJEKTMANAGEMENT ───────────────────────────────────

-- Karte 18: Vorgehensmodelle
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Vorgehensmodelle', '🔄',
     '<strong>Wasserfallmodell</strong>: Sequenziell. Klare Struktur, wenig Flexibilität.<br><br><strong>Scrum</strong> (agil): Sprints (1-4 Wochen). Rollen: Product Owner, Scrum Master, Dev Team.<br><br><strong>Kanban</strong>: Visualisierung des Arbeitsflusses. To Do → In Progress → Done.',
     'Scrum-Rollen: Product Owner = Produktverantwortlicher, Scrum Master = Moderator.',
     1);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'Wasserfall: Analyse → Design → Implementierung → Test → Betrieb'),
    (last_insert_rowid(), 2, 'Product Owner: Priorisiert Backlog'),
    (last_insert_rowid(), 3, 'Scrum Master: Beseitigt Hindernisse'),
    (last_insert_rowid(), 4, 'Sprint: 1-4 Wochen'),
    (last_insert_rowid(), 5, 'WiP-Limit bei Kanban');

-- Karte 19: Lastenheft & Pflichtenheft
INSERT INTO lernkarten (thema_id, titel, icon, body_html, tipp, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Lastenheft & Pflichtenheft', '📅',
     '<strong>Lastenheft</strong>: Was der Auftraggeber will (WAS).<br><strong>Pflichtenheft</strong>: Wie der Auftragnehmer es umsetzt (WIE).<br><br><strong>Kritischer Pfad</strong>: Längste Abhängigkeitskette ohne Puffer.',
     'Lastenheft = Kunde (WAS), Pflichtenheft = Auftragnehmer (WIE). Klassische Verwechslungsfalle!',
     2);

INSERT INTO lernkarte_kernpunkte (lernkarte_id, position, text) VALUES
    (last_insert_rowid(), 1, 'Gantt-Diagramm: Zeitbalken für Aufgaben'),
    (last_insert_rowid(), 2, 'Kritischer Pfad: Verzögerung = Gesamtprojekt verzögert'),
    (last_insert_rowid(), 3, 'SMART-Ziele: Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert'),
    (last_insert_rowid(), 4, 'Meilenstein: Wichtiges Zwischenziel ohne Dauer');

-- ============================================================
--  FRAGEN & ANTWORTOPTIONEN
-- ============================================================

-- ── AP1 · NETZWERKTECHNIK ────────────────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Auf welcher OSI-Schicht arbeitet ein Switch?',
     'Ein Switch arbeitet auf Schicht 2 (Sicherungsschicht) und leitet Frames anhand von MAC-Adressen weiter.',
     1, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Schicht 1 – Bitübertragung'),
    (last_insert_rowid(), 1, 'Schicht 2 – Sicherungsschicht'),
    (last_insert_rowid(), 2, 'Schicht 3 – Vermittlungsschicht'),
    (last_insert_rowid(), 3, 'Schicht 4 – Transportschicht');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welches Protokoll verwendet TCP?',
     'HTTP nutzt TCP (Port 80). DNS und DHCP nutzen UDP, VoIP meist auch UDP.',
     2, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'DNS'),
    (last_insert_rowid(), 1, 'DHCP'),
    (last_insert_rowid(), 2, 'HTTP'),
    (last_insert_rowid(), 3, 'VoIP');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Wie viele nutzbare Hosts hat ein /26-Netz?',
     '2^(32-26) - 2 = 2^6 - 2 = 64 - 2 = 62 nutzbare Hosts.',
     1, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '30'),
    (last_insert_rowid(), 1, '62'),
    (last_insert_rowid(), 2, '126'),
    (last_insert_rowid(), 3, '254');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist der Zweck des 3-Wege-Handshakes bei TCP?',
     'Der 3-Wege-Handshake (SYN, SYN-ACK, ACK) baut eine zuverlässige TCP-Verbindung auf und synchronisiert Sequenznummern.',
     1, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Datenkomprimierung'),
    (last_insert_rowid(), 1, 'Verbindungsaufbau und Synchronisation'),
    (last_insert_rowid(), 2, 'Verschlüsselung der Daten'),
    (last_insert_rowid(), 3, 'Fehlererkennung im Paket');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welches Protokoll löst Domainnamen in IP-Adressen auf?',
     'DNS (Domain Name System) übersetzt Hostnamen (z.B. google.de) in IP-Adressen.',
     2, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'DHCP'),
    (last_insert_rowid(), 1, 'ARP'),
    (last_insert_rowid(), 2, 'DNS'),
    (last_insert_rowid(), 3, 'SNMP');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist eine MAC-Adresse?',
     'Eine MAC-Adresse ist eine 48-Bit-Hardware-Adresse, die jedem Netzwerkadapter fest zugewiesen ist (Schicht 2).',
     2, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Eine IPv6-Adresse'),
    (last_insert_rowid(), 1, 'Eine logische Netzwerkadresse'),
    (last_insert_rowid(), 2, 'Eine physische Hardware-Adresse'),
    (last_insert_rowid(), 3, 'Eine Subnetzmaske');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welches Gerät verbindet zwei Netzwerke auf Schicht 3?',
     'Ein Router arbeitet auf Schicht 3 (Vermittlungsschicht) und verbindet Netzwerke anhand von IP-Adressen.',
     3, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Hub'),
    (last_insert_rowid(), 1, 'Switch'),
    (last_insert_rowid(), 2, 'Bridge'),
    (last_insert_rowid(), 3, 'Router');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='netzwerk' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welcher private IP-Bereich gehört zur Klasse C?',
     '192.168.0.0/16 ist der private Klasse-C-Bereich. 10.x ist Klasse A, 172.16-31.x ist Klasse B.',
     2, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '10.0.0.0/8'),
    (last_insert_rowid(), 1, '172.16.0.0/12'),
    (last_insert_rowid(), 2, '192.168.0.0/16'),
    (last_insert_rowid(), 3, '169.254.0.0/16');

-- ── AP1 · HARDWARE & RAID ────────────────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Wie viele Festplatten werden bei RAID 5 mindestens benötigt?',
     'RAID 5 benötigt mindestens 3 Festplatten. Parität wird auf alle Platten verteilt, 1 Ausfall wird toleriert.',
     1, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '2'),
    (last_insert_rowid(), 1, '3'),
    (last_insert_rowid(), 2, '4'),
    (last_insert_rowid(), 3, '6');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was passiert bei RAID 0, wenn eine Festplatte ausfällt?',
     'Bei RAID 0 gibt es keine Redundanz. Fällt eine Platte aus, sind ALLE Daten verloren.',
     1, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Datenverlust auf dieser Platte'),
    (last_insert_rowid(), 1, 'Alle Daten gehen verloren'),
    (last_insert_rowid(), 2, 'Das System wechselt auf die andere Platte'),
    (last_insert_rowid(), 3, 'Nur neuere Daten gehen verloren');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welche RAID-Variante kombiniert Spiegelung und Striping?',
     'RAID 10 kombiniert Spiegelung (RAID 1) mit Striping (RAID 0) und benötigt mindestens 4 Festplatten.',
     3, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'RAID 2'),
    (last_insert_rowid(), 1, 'RAID 5'),
    (last_insert_rowid(), 2, 'RAID 6'),
    (last_insert_rowid(), 3, 'RAID 10');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist der Unterschied zwischen L1 und L3 Cache?',
     'L1-Cache ist der schnellste aber kleinste Cache, direkt in der CPU. L3 ist größer aber langsamer.',
     1, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'L3 ist schneller und kleiner'),
    (last_insert_rowid(), 1, 'L1 ist schneller und kleiner, direkt an der CPU'),
    (last_insert_rowid(), 2, 'L1 ist langsamer aber größer'),
    (last_insert_rowid(), 3, 'Es gibt keinen Unterschied');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welche Aussage zu SSDs ist korrekt?',
     'SSDs haben keine beweglichen Teile und sind daher stoßunempfindlicher. HDDs sind günstiger pro GB.',
     2, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'SSDs haben bewegliche Teile'),
    (last_insert_rowid(), 1, 'SSDs sind langsamer als HDDs'),
    (last_insert_rowid(), 2, 'SSDs sind stoßunempfindlicher als HDDs'),
    (last_insert_rowid(), 3, 'SSDs sind immer günstiger als HDDs');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was bedeutet ECC bei RAM?',
     'ECC (Error Correcting Code) RAM kann einzelne Bitfehler erkennen und korrigieren. Wird in Servern eingesetzt.',
     1, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Erweiterter Cache Controller'),
    (last_insert_rowid(), 1, 'Error Correcting Code – Fehlerkorrektur'),
    (last_insert_rowid(), 2, 'Enhanced Clock Cycle'),
    (last_insert_rowid(), 3, 'Extended Cache Capacity');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Wie groß ist die nutzbare Kapazität bei RAID 5 mit vier 4-TB-Festplatten?',
     'Bei RAID 5 ist die nutzbare Kapazität (n-1) × Plattengröße = (4-1) × 4 TB = 12 TB.',
     1, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '8 TB'),
    (last_insert_rowid(), 1, '12 TB'),
    (last_insert_rowid(), 2, '16 TB'),
    (last_insert_rowid(), 3, '4 TB');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='hardware' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welcher Speichertyp ist nicht flüchtig?',
     'Eine SSD ist nicht-flüchtig – Daten bleiben ohne Strom erhalten. RAM, Cache und Register verlieren Daten bei Stromverlust.',
     2, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'DDR4 RAM'),
    (last_insert_rowid(), 1, 'L2 Cache'),
    (last_insert_rowid(), 2, 'SSD'),
    (last_insert_rowid(), 3, 'CPU Register');

-- ── AP1 · BETRIEBSSYSTEME ────────────────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was bedeutet chmod 755 unter Linux?',
     'chmod 755: Owner=rwx(7), Gruppe=r-x(5), Andere=r-x(5).',
     1, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Alle dürfen lesen, schreiben und ausführen'),
    (last_insert_rowid(), 1, 'Owner: alles; Gruppe & Andere: lesen und ausführen'),
    (last_insert_rowid(), 2, 'Owner: lesen; alle anderen: schreiben'),
    (last_insert_rowid(), 3, 'Nur der Owner darf die Datei sehen');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'In welchem Verzeichnis liegen unter Linux die Konfigurationsdateien?',
     '/etc enthält systemweite Konfigurationsdateien (z.B. /etc/hosts, /etc/passwd).',
     2, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '/bin'),
    (last_insert_rowid(), 1, '/var'),
    (last_insert_rowid(), 2, '/etc'),
    (last_insert_rowid(), 3, '/usr');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welches Dateisystem hat eine maximale Dateigröße von 4 GB?',
     'FAT32 hat eine Beschränkung von maximal 4 GB pro Datei.',
     3, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'NTFS'),
    (last_insert_rowid(), 1, 'ext4'),
    (last_insert_rowid(), 2, 'exFAT'),
    (last_insert_rowid(), 3, 'FAT32');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welcher Linux-Befehl zeigt laufende Prozesse an?',
     'ps aux zeigt alle laufenden Prozesse mit PID, CPU- und Speichernutzung.',
     2, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'ls -la'),
    (last_insert_rowid(), 1, 'grep'),
    (last_insert_rowid(), 2, 'ps aux'),
    (last_insert_rowid(), 3, 'chmod');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist der Vorteil eines Dateisystems mit Journaling?',
     'Journaling protokolliert Schreiboperationen. Bei einem Absturz kann das Dateisystem konsistent wiederhergestellt werden.',
     1, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Schnellere Schreibgeschwindigkeit'),
    (last_insert_rowid(), 1, 'Dateisystem ist crash-sicherer'),
    (last_insert_rowid(), 2, 'Kleinere Dateigrößen'),
    (last_insert_rowid(), 3, 'Bessere Komprimierung');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was macht "grep -r error /var/log/"?',
     'grep -r sucht rekursiv in allen Unterverzeichnissen nach dem Muster.',
     0, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Sucht rekursiv nach "error" in /var/log/'),
    (last_insert_rowid(), 1, 'Löscht Dateien mit "error" im Namen'),
    (last_insert_rowid(), 2, 'Kopiert Logs'),
    (last_insert_rowid(), 3, 'Zeigt Fehler in Echtzeit');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welches Dateisystem ist der Standard unter modernen Linux-Distributionen?',
     'ext4 ist das Standard-Dateisystem für die meisten Linux-Distributionen.',
     2, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'FAT32'),
    (last_insert_rowid(), 1, 'NTFS'),
    (last_insert_rowid(), 2, 'ext4'),
    (last_insert_rowid(), 3, 'exFAT');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='betriebssysteme' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist der Unterschied zwischen einem Prozess und einem Thread?',
     'Prozesse haben eigene Speicherbereiche. Threads laufen im selben Prozess und teilen den Speicher.',
     1, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Kein Unterschied'),
    (last_insert_rowid(), 1, 'Prozess hat eigenen Speicherbereich, Thread teilt ihn'),
    (last_insert_rowid(), 2, 'Thread ist langsamer'),
    (last_insert_rowid(), 3, 'Prozesse laufen nur auf einem Kern');

-- ── AP1 · IT-SICHERHEIT ──────────────────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist der Hauptunterschied zwischen symmetrischer und asymmetrischer Verschlüsselung?',
     'Symmetrisch: ein geteilter Schlüssel. Asymmetrisch: Public Key + Private Key.',
     1, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Symmetrisch ist sicherer'),
    (last_insert_rowid(), 1, 'Symmetrisch nutzt einen Schlüssel, asymmetrisch ein Schlüsselpaar'),
    (last_insert_rowid(), 2, 'Asymmetrisch ist schneller'),
    (last_insert_rowid(), 3, 'Symmetrisch ist nur für Dateien');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welches Protokoll sichert HTTPS-Verbindungen?',
     'TLS (Transport Layer Security) ist das aktuelle Protokoll hinter HTTPS.',
     2, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'SSL 3.0'),
    (last_insert_rowid(), 1, 'IPSec'),
    (last_insert_rowid(), 2, 'TLS'),
    (last_insert_rowid(), 3, 'AES');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist eine digitale Signatur?',
     'Digitale Signatur = Hashwert, verschlüsselt mit dem Private Key. Der Empfänger prüft mit dem Public Key.',
     1, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Verschlüsselte E-Mail'),
    (last_insert_rowid(), 1, 'Hashwert, verschlüsselt mit dem Private Key des Senders'),
    (last_insert_rowid(), 2, 'Verschlüsselung mit dem Public Key'),
    (last_insert_rowid(), 3, 'Zertifikat einer CA');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welche Maßnahme schützt am besten vor SQL-Injection?',
     'Prepared Statements trennen SQL-Code von Daten.',
     1, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Firewall'),
    (last_insert_rowid(), 1, 'Prepared Statements'),
    (last_insert_rowid(), 2, 'Starke Passwörter'),
    (last_insert_rowid(), 3, 'Verschlüsselung');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was versteht man unter einem Man-in-the-Middle-Angriff?',
     'Bei MitM schaltet sich ein Angreifer unbemerkt zwischen zwei Kommunikationspartner.',
     1, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Passwörter durch Ausprobieren'),
    (last_insert_rowid(), 1, 'Angreifer zwischen zwei Kommunikationspartnern'),
    (last_insert_rowid(), 2, 'Überlastung eines Servers'),
    (last_insert_rowid(), 3, 'Schadcode in E-Mail-Anhängen');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was beschreibt die 3-2-1-Backup-Regel?',
     '3 Datenkopien, auf 2 verschiedenen Speichermedien, 1 an einem externen Standort.',
     1, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '3 Backups täglich'),
    (last_insert_rowid(), 1, '3 Kopien, auf 2 Medien, 1 extern'),
    (last_insert_rowid(), 2, '3 Vollbackups, 2 differenziell, 1 inkrementell'),
    (last_insert_rowid(), 3, '3 Backups, 2 verschlüsselt, 1 im Tresor');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was unterscheidet IDS von IPS?',
     'IDS erkennt und meldet Angriffe. IPS erkennt und blockiert aktiv.',
     1, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'IDS ist schneller'),
    (last_insert_rowid(), 1, 'IDS erkennt Angriffe, IPS erkennt und blockiert aktiv'),
    (last_insert_rowid(), 2, 'IPS überwacht nur interne Netze'),
    (last_insert_rowid(), 3, 'IDS benötigt mehr Hardware');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='sicherheit' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welches Verfahren verwendet HTTPS für den Schlüsselaustausch?',
     'TLS nutzt asymmetrische Verschlüsselung für den Handshake, dann symmetrischen Sitzungsschlüssel (AES).',
     2, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Nur AES'),
    (last_insert_rowid(), 1, 'Nur RSA'),
    (last_insert_rowid(), 2, 'Hybridverfahren'),
    (last_insert_rowid(), 3, 'Nur symmetrische Verschlüsselung');

-- ── AP1 · DATENBANKEN & SQL ──────────────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was gibt ein INNER JOIN zurück?',
     'INNER JOIN gibt nur Datensätze zurück, für die in beiden Tabellen ein Match gefunden wird.',
     2, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Alle Zeilen der linken Tabelle'),
    (last_insert_rowid(), 1, 'Alle Zeilen beider Tabellen'),
    (last_insert_rowid(), 2, 'Nur Zeilen mit übereinstimmenden Werten in beiden Tabellen'),
    (last_insert_rowid(), 3, 'Alle Zeilen der rechten Tabelle');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was beschreibt die erste Normalform (1NF)?',
     '1NF fordert, dass alle Attributwerte atomar sind.',
     2, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Keine transitiven Abhängigkeiten'),
    (last_insert_rowid(), 1, 'Volle funktionale Abhängigkeit'),
    (last_insert_rowid(), 2, 'Alle Attribute sind atomar'),
    (last_insert_rowid(), 3, 'Kein Fremdschlüssel nötig');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist der Unterschied zwischen Primary Key und Foreign Key?',
     'PRIMARY KEY: Eindeutiger Identifikator. FOREIGN KEY: Referenz auf PRIMARY KEY einer anderen Tabelle.',
     1, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Kein Unterschied'),
    (last_insert_rowid(), 1, 'Primary Key eindeutig in eigener Tabelle; Foreign Key verweist auf anderen Primary Key'),
    (last_insert_rowid(), 2, 'Foreign Key ist immer eindeutig'),
    (last_insert_rowid(), 3, 'Primary Key kann NULL sein');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was macht der SQL-Befehl GROUP BY?',
     'GROUP BY fasst Zeilen mit gleichen Werten zusammen für Aggregatfunktionen.',
     1, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Sortiert Ergebnisse'),
    (last_insert_rowid(), 1, 'Gruppiert Zeilen für Aggregatfunktionen'),
    (last_insert_rowid(), 2, 'Filtert doppelte Einträge'),
    (last_insert_rowid(), 3, 'Verbindet zwei Tabellen');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welche SQL-Klausel filtert Ergebnisse?',
     'WHERE filtert Zeilen vor der Gruppierung. HAVING filtert nach GROUP BY.',
     3, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'ORDER BY'),
    (last_insert_rowid(), 1, 'GROUP BY'),
    (last_insert_rowid(), 2, 'HAVING'),
    (last_insert_rowid(), 3, 'WHERE');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein Transaktionsmerkmal von ACID?',
     'ACID: Atomicity (alles oder nichts), Consistency, Isolation, Durability.',
     0, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Atomicity: Transaktion ist ganz oder gar nicht ausgeführt'),
    (last_insert_rowid(), 1, 'Atomicity: kleinste mögliche Datenmenge'),
    (last_insert_rowid(), 2, 'Consistency: alle Tabellen gleichzeitig aktualisiert'),
    (last_insert_rowid(), 3, 'Durability: Daten täglich gesichert');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Welcher JOIN gibt alle Zeilen der linken Tabelle zurück?',
     'LEFT JOIN gibt alle Zeilen der linken Tabelle zurück.',
     2, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'INNER JOIN'),
    (last_insert_rowid(), 1, 'RIGHT JOIN'),
    (last_insert_rowid(), 2, 'LEFT JOIN'),
    (last_insert_rowid(), 3, 'CROSS JOIN');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='datenbanken' AND pruefung_id='ap1' AND ausbildungsberuf_id='fi-si'),
     'Was ist eine transitive Abhängigkeit (3NF-Verletzung)?',
     '3NF wird verletzt, wenn ein Nicht-Schlüssel-Attribut von einem anderen Nicht-Schlüssel-Attribut abhängt.',
     1, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Fremdschlüssel auf sich selbst'),
    (last_insert_rowid(), 1, 'Nicht-Schlüssel-Attribut hängt von anderem Nicht-Schlüssel-Attribut ab'),
    (last_insert_rowid(), 2, 'Zwei Primärschlüssel'),
    (last_insert_rowid(), 3, 'Attribut mit mehreren Werten');

-- ── AP2 · VIRTUALISIERUNG & CLOUD ───────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist der Hauptunterschied zwischen Typ-1 und Typ-2 Hypervisor?',
     'Typ-1 (Bare Metal) läuft direkt auf Hardware – effizienter. Typ-2 auf einem OS – einfacher für Desktop-Tests.',
     1, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Typ-1 ist langsamer'),
    (last_insert_rowid(), 1, 'Typ-1 läuft direkt auf Hardware, Typ-2 auf Host-OS'),
    (last_insert_rowid(), 2, 'Typ-2 unterstützt mehr VMs'),
    (last_insert_rowid(), 3, 'Typ-1 nur für Windows');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Welches Cloud-Modell stellt fertige Anwendungen bereit?',
     'SaaS liefert fertige Anwendungen. Beispiele: Office 365, Google Docs.',
     2, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'IaaS'),
    (last_insert_rowid(), 1, 'PaaS'),
    (last_insert_rowid(), 2, 'SaaS'),
    (last_insert_rowid(), 3, 'NaaS');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein Container im Vergleich zu einer VM?',
     'Container teilen den Kernel → leichter, schnellerer Start. Aber weniger Isolation als VMs.',
     2, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Container benötigen mehr Ressourcen'),
    (last_insert_rowid(), 1, 'Container sind langsamer'),
    (last_insert_rowid(), 2, 'Container teilen den OS-Kernel und sind leichter'),
    (last_insert_rowid(), 3, 'Container haben mehr Isolation');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein Snapshot bei Virtualisierung?',
     'Snapshot speichert Zustand einer VM. Man kann jederzeit zu diesem Zustand zurückkehren.',
     1, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Backup der physischen Hardware'),
    (last_insert_rowid(), 1, 'Gespeicherter Zustand einer VM zu einem Zeitpunkt'),
    (last_insert_rowid(), 2, 'Kopie des Hypervisors'),
    (last_insert_rowid(), 3, 'Netzwerk-Screenshot');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Welches Cloud-Modell kombiniert eigene und öffentliche Infrastruktur?',
     'Hybrid Cloud verbindet Private + Public Cloud.',
     2, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Public Cloud'),
    (last_insert_rowid(), 1, 'Private Cloud'),
    (last_insert_rowid(), 2, 'Hybrid Cloud'),
    (last_insert_rowid(), 3, 'Community Cloud');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was bietet IaaS dem Kunden?',
     'IaaS stellt virtuelle Hardware bereit: Server, Storage und Netzwerk.',
     2, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Fertige Software'),
    (last_insert_rowid(), 1, 'Eine Entwicklungsplattform'),
    (last_insert_rowid(), 2, 'Virtuelle Hardware'),
    (last_insert_rowid(), 3, 'Nur Datenbankdienste');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist Live Migration bei Virtualisierung?',
     'Live Migration verschiebt eine laufende VM ohne Unterbrechung auf einen anderen Host.',
     1, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Daten auf externen Speicher'),
    (last_insert_rowid(), 1, 'Verschieben einer laufenden VM ohne Downtime'),
    (last_insert_rowid(), 2, 'Backup einer VM'),
    (last_insert_rowid(), 3, 'Aktualisierung des Hypervisors');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='virtualisierung' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein Docker-Image?',
     'Docker-Image ist ein unveränderlicher Bauplan, aus dem Container gestartet werden.',
     1, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Eine laufende Container-Instanz'),
    (last_insert_rowid(), 1, 'Ein unveränderlicher Bauplan für einen Container'),
    (last_insert_rowid(), 2, 'Ein Snapshot einer VM'),
    (last_insert_rowid(), 3, 'Ein Netzwerk-Paket');

-- ── AP2 · IT-SICHERHEIT & DSGVO ──────────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Innerhalb welcher Frist muss eine Datenpanne nach DSGVO gemeldet werden?',
     'Nach Art. 33 DSGVO muss eine Datenpanne innerhalb von 72 Stunden gemeldet werden.',
     2, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '24 Stunden'),
    (last_insert_rowid(), 1, '48 Stunden'),
    (last_insert_rowid(), 2, '72 Stunden'),
    (last_insert_rowid(), 3, '7 Tage');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was beschreibt das "Recht auf Vergessenwerden" (DSGVO Art. 17)?',
     'Art. 17 gibt Betroffenen das Recht, die Löschung ihrer Daten zu verlangen.',
     1, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Recht auf Korrektur'),
    (last_insert_rowid(), 1, 'Recht auf Löschung'),
    (last_insert_rowid(), 2, 'Recht auf Auskunft'),
    (last_insert_rowid(), 3, 'Recht auf Übertragung');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was steht für das "I" in der CIA-Triade?',
     'CIA: Confidentiality, Integrity (Integrität), Availability.',
     2, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Infrastructure'),
    (last_insert_rowid(), 1, 'Identity'),
    (last_insert_rowid(), 2, 'Integrity'),
    (last_insert_rowid(), 3, 'Isolation');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein Auftragsverarbeitungsvertrag (AVV)?',
     'AVV wird benötigt, wenn externe Dienstleister personenbezogene Daten verarbeiten.',
     1, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Vertrag mit dem DSB'),
    (last_insert_rowid(), 1, 'Vertrag mit externen Dienstleistern, die Daten verarbeiten'),
    (last_insert_rowid(), 2, 'Arbeitsvertrag für IT'),
    (last_insert_rowid(), 3, 'Servicevertrag mit ISP');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist das Prinzip der Datenminimierung?',
     'Datenminimierung: nur so viele Daten erheben wie für den Zweck notwendig.',
     1, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Daten müssen verschlüsselt sein'),
    (last_insert_rowid(), 1, 'Nur notwendige Daten erheben'),
    (last_insert_rowid(), 2, 'Daten täglich sichern'),
    (last_insert_rowid(), 3, 'Keine Auslandsübertragung');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein Penetrationstest?',
     'Penetrationstest = autorisierter, simulierter Angriff, um Schwachstellen zu finden.',
     1, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Test der Bandbreite'),
    (last_insert_rowid(), 1, 'Autorisierter simulierter Angriff'),
    (last_insert_rowid(), 2, 'Überprüfung der Datensicherung'),
    (last_insert_rowid(), 3, 'Stresstest');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Wie hoch sind maximale DSGVO-Bußgelder?',
     'Bußgelder bis 20 Mio. € oder 4% des weltweiten Jahresumsatzes.',
     2, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '1 Mio. € oder 1%'),
    (last_insert_rowid(), 1, '5 Mio. € oder 2%'),
    (last_insert_rowid(), 2, '20 Mio. € oder 4% Jahresumsatz'),
    (last_insert_rowid(), 3, '100 Mio. €');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='dsgvo-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist das Zero-Trust-Prinzip?',
     'Zero Trust: "Never trust, always verify." Kein Gerät bekommt automatisch Vertrauen.',
     1, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Interne Nutzer vertraut'),
    (last_insert_rowid(), 1, 'Nichts wird per Default vertraut – alles authentifizieren'),
    (last_insert_rowid(), 2, 'Externes Netz nie vertraut'),
    (last_insert_rowid(), 3, 'Passwörter nie speichern');

-- ── AP2 · SERVER & ACTIVE DIRECTORY ──────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist der Zweck eines GPO?',
     'GPOs ermöglichen zentrale Verwaltung von Einstellungen in Active Directory.',
     1, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Speicherplatzverwaltung'),
    (last_insert_rowid(), 1, 'Zentrale Verwaltung von Einstellungen für Benutzer/Computer'),
    (last_insert_rowid(), 2, 'Datenbankreplikation'),
    (last_insert_rowid(), 3, 'Routing-Konfiguration');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Unterschied inkrementell vs. differenziell?',
     'Inkrementell: nur Änderungen seit letztem Backup. Differenziell: alle Änderungen seit letztem Vollbackup.',
     1, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Kein Unterschied'),
    (last_insert_rowid(), 1, 'Inkrementell: seit letztem Backup; Differenziell: seit letztem Vollbackup'),
    (last_insert_rowid(), 2, 'Differenziell: seit letztem Backup; Inkrementell: seit Vollbackup'),
    (last_insert_rowid(), 3, 'Inkrementell sichert nur Systemdateien');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was bedeutet RTO?',
     'RTO = wie lange darf ein System maximal ausfallen. RPO = wie viel Datenverlust ist tolerierbar.',
     1, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Maximaler Datenverlust'),
    (last_insert_rowid(), 1, 'Maximale tolerierbare Ausfallzeit'),
    (last_insert_rowid(), 2, 'Häufigkeit der Backups'),
    (last_insert_rowid(), 3, 'Kosten der Wiederherstellung');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Welches Protokoll nutzt Active Directory für Verzeichniszugriffe?',
     'LDAP wird für Verzeichniszugriffe genutzt. Kerberos ist das Authentifizierungsprotokoll.',
     1, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'SNMP'),
    (last_insert_rowid(), 1, 'LDAP'),
    (last_insert_rowid(), 2, 'FTP'),
    (last_insert_rowid(), 3, 'Kerberos');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein Load Balancer?',
     'Load Balancer verteilt Netzwerkanfragen auf mehrere Server für Hochverfügbarkeit.',
     1, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Prüft Netzwerklast'),
    (last_insert_rowid(), 1, 'Verteilt Anfragen auf mehrere Server'),
    (last_insert_rowid(), 2, 'Backup-System'),
    (last_insert_rowid(), 3, 'Firewall-Typ');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist RADIUS?',
     'RADIUS = zentrale Authentifizierung für Netzwerkzugriffe (WLAN, VPN).',
     1, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Dateisystem'),
    (last_insert_rowid(), 1, 'Authentifizierungsprotokoll für Netzwerkzugriff'),
    (last_insert_rowid(), 2, 'Routing-Protokoll'),
    (last_insert_rowid(), 3, 'Backup-Verfahren');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was bedeutet die 3-2-1-Backup-Regel?',
     '3 Kopien, auf 2 verschiedenen Speichermedien, 1 an einem externen Standort.',
     1, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, '3 Vollbackups, 2 diff, 1 inkr.'),
    (last_insert_rowid(), 1, '3 Datenkopien, 2 verschiedene Medien, 1 extern'),
    (last_insert_rowid(), 2, '3 Backups täglich'),
    (last_insert_rowid(), 3, '3 Server, 2 Standby, 1 aktiv');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='server-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein Failover-Cluster?',
     'Failover-Cluster: automatischer Wechsel auf Standby-Knoten bei Ausfall des Primärsystems.',
     1, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Mehrere Server für Rechenleistung'),
    (last_insert_rowid(), 1, 'Automatischer Wechsel auf Backup-System bei Ausfall'),
    (last_insert_rowid(), 2, 'RAID-Konfiguration'),
    (last_insert_rowid(), 3, 'Netzwerk-Protokoll');

-- ── AP2 · PROJEKTMANAGEMENT ───────────────────────────────────

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Wer schreibt das Lastenheft?',
     'Lastenheft vom Auftraggeber (WAS). Pflichtenheft vom Auftragnehmer (WIE).',
     2, 1);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Auftragnehmer'),
    (last_insert_rowid(), 1, 'Scrum Master'),
    (last_insert_rowid(), 2, 'Auftraggeber (Kunde)'),
    (last_insert_rowid(), 3, 'Entwicklungsteam');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist die Aufgabe des Product Owners in Scrum?',
     'Product Owner priorisiert den Backlog und trägt Produktverantwortung.',
     1, 2);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Hindernisse beseitigen'),
    (last_insert_rowid(), 1, 'Backlog priorisieren und Produktverantwortung'),
    (last_insert_rowid(), 2, 'Team täglich moderieren'),
    (last_insert_rowid(), 3, 'Code schreiben');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist der kritische Pfad?',
     'Kritischer Pfad: Jede Verzögerung verzögert das Gesamtprojekt.',
     2, 3);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Kürzester Weg'),
    (last_insert_rowid(), 1, 'Teuerster Teil'),
    (last_insert_rowid(), 2, 'Längste Abhängigkeitskette ohne Puffer'),
    (last_insert_rowid(), 3, 'Weg mit meisten Aufgaben');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was beschreibt ein Sprint in Scrum?',
     'Sprint: kurzer Entwicklungszeitraum, an dessen Ende ein nutzbares Inkrement steht.',
     1, 4);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Wöchentliches Meeting'),
    (last_insert_rowid(), 1, 'Fester Zeitraum (1-4 Wochen) für ein Produktinkrement'),
    (last_insert_rowid(), 2, 'Finale Abnahme'),
    (last_insert_rowid(), 3, 'Notfall-Phase');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist ein SMART-Ziel?',
     'SMART: Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert.',
     1, 5);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Agiles Modell'),
    (last_insert_rowid(), 1, 'Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert'),
    (last_insert_rowid(), 2, 'PM-Tool'),
    (last_insert_rowid(), 3, 'Risikoanalyse');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was unterscheidet Kanban von Scrum?',
     'Kanban: keine Sprints, keine Rollen, kontinuierlicher Fluss und WiP-Limits.',
     0, 6);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Kanban hat keine Sprints und kein festes Team'),
    (last_insert_rowid(), 1, 'Kanban immer teurer'),
    (last_insert_rowid(), 2, 'Scrum hat keine Rollen'),
    (last_insert_rowid(), 3, 'Kanban nutzt User Stories');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was visualisiert ein Gantt-Diagramm?',
     'Gantt-Diagramm: Aufgaben als horizontale Zeitbalken.',
     1, 7);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Netzwerkabhängigkeiten'),
    (last_insert_rowid(), 1, 'Projektplan mit zeitlichen Balken'),
    (last_insert_rowid(), 2, 'Klassendiagramme'),
    (last_insert_rowid(), 3, 'Budget');

INSERT INTO fragen (thema_id, fragetext, erklaerung, korrekt_index, reihenfolge) VALUES
    ((SELECT id FROM themen WHERE thema_key='projektmanagement-si' AND pruefung_id='ap2' AND ausbildungsberuf_id='fi-si'),
     'Was ist das Daily Scrum?',
     'Daily Scrum: tägliches, max. 15-minütiges Standup zur Synchronisation.',
     1, 8);
INSERT INTO antwortoptionen (frage_id, position, text) VALUES
    (last_insert_rowid(), 0, 'Planungstreffen für Sprint'),
    (last_insert_rowid(), 1, '15-minütiges Standup zur Synchronisation'),
    (last_insert_rowid(), 2, 'Vorstellung fertiger Features'),
    (last_insert_rowid(), 3, 'Retrospektive');

COMMIT;
