/* ── Fachinformatiker Systemintegration ─────────────────────────
   AP1 = gemeinsam mit FI-AE (Kernqualifikationen)
   AP2 = FI-SI spezifisch (Server, Netzwerk, Virtualisierung, DSGVO, PM)
   ──────────────────────────────────────────────────────────────── */

const DATA_FI_SI = {
  id: 'fi-si',
  name: 'FI Systemintegration',
  shortName: 'FI-SI',
  icon: '🖧',
  color: '#667eea',
  color2: '#764ba2',

  exams: {
    ap1: {
      id: 'ap1',
      name: 'AP1',
      fullName: 'Abschlussprüfung Teil 1',
      desc: 'Netzwerke, Hardware, Betriebssysteme, Programmierung & Datenbanken',
      icon: '🖥️',
      topics: [
        {
          id: 'netzwerk', name: 'Netzwerktechnik', icon: '🌐', color: '#4facfe',
          cards: [
            {
              title: 'Das OSI-Modell', icon: '📶',
              body: 'Das <strong>OSI-Modell</strong> (Open Systems Interconnection) teilt die Netzwerkkommunikation in <strong>7 Schichten</strong> auf. Jede Schicht hat eine klar definierte Aufgabe.<br><br>Merkhilfe: <strong>„Alle Priester Saufen Tequila Nach Der Predigt"</strong>',
              diagram: `<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
  <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#667eea"/><stop offset="100%" stop-color="#764ba2"/></linearGradient></defs>
  ${[['7','Anwendung','HTTP, FTP, SMTP, DNS'],['6','Darstellung','SSL/TLS, JPEG, ASCII'],['5','Sitzung','NetBIOS, RPC'],['4','Transport','TCP, UDP'],['3','Vermittlung','IP, ICMP, Router'],['2','Sicherung','Ethernet, MAC, Switch'],['1','Bitübertragung','Kabel, WLAN, Hub']].map((l,i)=>`
  <rect x="10" y="${10+i*34}" width="400" height="30" rx="5" fill="url(#g1)" opacity="${1-i*0.08}"/>
  <text x="20" y="${30+i*34}" fill="white" font-size="12" font-weight="800">Schicht ${l[0]}: ${l[1]}</text>
  <text x="260" y="${30+i*34}" fill="rgba(255,255,255,0.85)" font-size="11">${l[2]}</text>`).join('')}
</svg>`,
              keyPoints: ['Schicht 1-4: Transportorientiert','Schicht 5-7: Anwendungsorientiert','TCP arbeitet auf Schicht 4','IP arbeitet auf Schicht 3','Switches arbeiten auf Schicht 2'],
              tip: 'Im Examen wird oft nach der Schicht eines Protokolls gefragt. TCP/UDP = Schicht 4, IP = Schicht 3, Ethernet = Schicht 2.'
            },
            {
              title: 'TCP vs. UDP', icon: '🔄',
              body: '<strong>TCP</strong> ist verbindungsorientiert: 3-Wege-Handshake (SYN → SYN-ACK → ACK), Fehlerkorrektur und garantierte Reihenfolge.<br><br><strong>UDP</strong> ist verbindungslos: Pakete werden gesendet ohne Bestätigung – schnell, aber unzuverlässig.',
              keyPoints: ['TCP: HTTP, HTTPS, FTP, SSH, SMTP','UDP: DNS, DHCP, VoIP, Streaming, Gaming','TCP-Handshake: SYN → SYN-ACK → ACK','UDP hat keinen Verbindungsaufbau'],
              tip: 'Typische Prüfungsfrage: DNS nutzt UDP (Port 53), HTTP nutzt TCP (Port 80).'
            },
            {
              title: 'IP-Adressen & Subnetting', icon: '📍',
              body: 'Eine <strong>IPv4-Adresse</strong> besteht aus 32 Bit (4 Oktette). Die <strong>Subnetzmaske</strong> teilt die Adresse in Netzanteil und Hostanteil.<br><br>Beispiel: <code>192.168.1.0/24</code> → 254 nutzbare Hosts (256 − 2).',
              keyPoints: ['/24 = 255.255.255.0 = 254 Hosts','/25 = 255.255.255.128 = 126 Hosts','/26 = 255.255.255.192 = 62 Hosts','Private Bereiche: 10.x, 172.16-31.x, 192.168.x','Broadcast = letzte Adresse im Subnetz'],
              tip: 'Formel: Anzahl Hosts = 2^(32−Präfix) − 2. Bei /24: 2^8 − 2 = 254.'
            }
          ],
          questions: [
            { q: 'Auf welcher OSI-Schicht arbeitet ein Switch?', options: ['Schicht 1 – Bitübertragung','Schicht 2 – Sicherungsschicht','Schicht 3 – Vermittlungsschicht','Schicht 4 – Transportschicht'], correct: 1, explanation: 'Ein Switch arbeitet auf Schicht 2 (Sicherungsschicht) und leitet Frames anhand von MAC-Adressen weiter.' },
            { q: 'Welches Protokoll verwendet TCP?', options: ['DNS','DHCP','HTTP','VoIP'], correct: 2, explanation: 'HTTP nutzt TCP (Port 80). DNS und DHCP nutzen UDP, VoIP meist auch UDP.' },
            { q: 'Wie viele nutzbare Hosts hat ein /26-Netz?', options: ['30','62','126','254'], correct: 1, explanation: '2^(32-26) - 2 = 2^6 - 2 = 64 - 2 = 62 nutzbare Hosts.' },
            { q: 'Was ist der Zweck des 3-Wege-Handshakes bei TCP?', options: ['Datenkomprimierung','Verbindungsaufbau und Synchronisation','Verschlüsselung der Daten','Fehlererkennung im Paket'], correct: 1, explanation: 'Der 3-Wege-Handshake (SYN, SYN-ACK, ACK) baut eine zuverlässige TCP-Verbindung auf und synchronisiert Sequenznummern.' },
            { q: 'Welches Protokoll löst Domainnamen in IP-Adressen auf?', options: ['DHCP','ARP','DNS','SNMP'], correct: 2, explanation: 'DNS (Domain Name System) übersetzt Hostnamen (z.B. google.de) in IP-Adressen.' },
            { q: 'Was ist eine MAC-Adresse?', options: ['Eine IPv6-Adresse','Eine logische Netzwerkadresse','Eine physische Hardware-Adresse','Eine Subnetzmaske'], correct: 2, explanation: 'Eine MAC-Adresse ist eine 48-Bit-Hardware-Adresse, die jedem Netzwerkadapter fest zugewiesen ist (Schicht 2).' },
            { q: 'Welches Gerät verbindet zwei Netzwerke auf Schicht 3?', options: ['Hub','Switch','Bridge','Router'], correct: 3, explanation: 'Ein Router arbeitet auf Schicht 3 (Vermittlungsschicht) und verbindet Netzwerke anhand von IP-Adressen.' },
            { q: 'Welcher private IP-Bereich gehört zur Klasse C?', options: ['10.0.0.0/8','172.16.0.0/12','192.168.0.0/16','169.254.0.0/16'], correct: 2, explanation: '192.168.0.0/16 ist der private Klasse-C-Bereich. 10.x ist Klasse A, 172.16-31.x ist Klasse B.' }
          ]
        },
        {
          id: 'hardware', name: 'Hardware & RAID', icon: '💾', color: '#fa709a',
          cards: [
            {
              title: 'RAID-Systeme', icon: '🗄️',
              body: '<strong>RAID</strong> (Redundant Array of Independent Disks) kombiniert mehrere Festplatten für mehr Leistung oder Ausfallsicherheit.<br><br>Die wichtigsten RAID-Level: RAID 0, 1, 5 und 10.',
              diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
  <text x="10" y="20" fill="#fa709a" font-size="13" font-weight="800">RAID 0 – Striping (Geschwindigkeit, keine Redundanz)</text>
  ${[0,1].map(i=>`<rect x="${30+i*60}" y="30" width="45" height="50" rx="4" fill="#333" stroke="#fa709a" stroke-width="2"/><text x="${52+i*60}" y="60" text-anchor="middle" fill="#fa709a" font-size="11">HDD${i+1}</text>`).join('')}
  <text x="160" y="60" fill="#888" font-size="20">→</text>
  <text x="185" y="65" fill="#ccc" font-size="11">Daten verteilt, 2× Speed</text>
  <text x="10" y="110" fill="#4da6ff" font-size="13" font-weight="800">RAID 1 – Mirroring (Spiegelung, 50% Kapazität)</text>
  ${[0,1].map(i=>`<rect x="${30+i*60}" y="120" width="45" height="50" rx="4" fill="#333" stroke="#4da6ff" stroke-width="2"/><text x="${52+i*60}" y="150" text-anchor="middle" fill="#4da6ff" font-size="11">Kopie</text>`).join('')}
  <text x="160" y="150" fill="#888" font-size="20">→</text>
  <text x="185" y="155" fill="#ccc" font-size="11">Identische Daten, 1 Ausfall OK</text>
</svg>`,
              keyPoints: ['RAID 0: Striping, schnell, KEINE Redundanz, min. 2 Platten','RAID 1: Mirroring, 50% Kapazität, 1 Ausfall toleriert','RAID 5: Striping+Parität, min. 3 Platten, 1 Ausfall toleriert','RAID 10: RAID 1+0, min. 4 Platten, schnell & sicher','RAID 5 Kapazität: (n-1) × Plattengröße'],
              tip: 'RAID ist kein Backup! Es schützt nur vor Festplattenausfall, nicht vor versehentlichem Löschen.'
            },
            {
              title: 'CPU, RAM & Speicher', icon: '🔧',
              body: 'Die <strong>CPU</strong> führt Befehle aus. Kennzahlen: Taktfrequenz (GHz), Kerne, Cache (L1/L2/L3).<br><br><strong>RAM</strong>: Flüchtiger Arbeitsspeicher (DDR4/DDR5).<br><br><strong>SSD vs. HDD</strong>: SSDs sind schneller (keine beweglichen Teile), HDDs günstiger pro GB.',
              keyPoints: ['L1-Cache: Schnellster, kleinster Cache (direkt in CPU)','DDR5 ist schneller und effizienter als DDR4','NVMe SSD über PCIe: deutlich schneller als SATA SSD','HDD: magnetisch, günstiger, aber langsamer und stoßempfindlicher','ECC-RAM: Fehlerkorrektur, wird in Servern eingesetzt'],
              tip: 'SSD = keine beweglichen Teile, schneller, teurer. HDD = magnetisch, günstiger pro TB.'
            }
          ],
          questions: [
            { q: 'Wie viele Festplatten werden bei RAID 5 mindestens benötigt?', options: ['2','3','4','6'], correct: 1, explanation: 'RAID 5 benötigt mindestens 3 Festplatten. Parität wird auf alle Platten verteilt, 1 Ausfall wird toleriert.' },
            { q: 'Was passiert bei RAID 0, wenn eine Festplatte ausfällt?', options: ['Datenverlust auf dieser Platte','Alle Daten gehen verloren','Das System wechselt auf die andere Platte','Nur neuere Daten gehen verloren'], correct: 1, explanation: 'Bei RAID 0 gibt es keine Redundanz. Fällt eine Platte aus, sind ALLE Daten verloren.' },
            { q: 'Welche RAID-Variante kombiniert Spiegelung und Striping?', options: ['RAID 2','RAID 5','RAID 6','RAID 10'], correct: 3, explanation: 'RAID 10 kombiniert Spiegelung (RAID 1) mit Striping (RAID 0) und benötigt mindestens 4 Festplatten.' },
            { q: 'Was ist der Unterschied zwischen L1 und L3 Cache?', options: ['L3 ist schneller und kleiner','L1 ist schneller und kleiner, direkt an der CPU','L1 ist langsamer aber größer','Es gibt keinen Unterschied'], correct: 1, explanation: 'L1-Cache ist der schnellste aber kleinste Cache, direkt in der CPU. L3 ist größer aber langsamer.' },
            { q: 'Welche Aussage zu SSDs ist korrekt?', options: ['SSDs haben bewegliche Teile','SSDs sind langsamer als HDDs','SSDs sind stoßunempfindlicher als HDDs','SSDs sind immer günstiger als HDDs'], correct: 2, explanation: 'SSDs haben keine beweglichen Teile und sind daher stoßunempfindlicher. HDDs sind günstiger pro GB.' },
            { q: 'Was bedeutet ECC bei RAM?', options: ['Erweiterter Cache Controller','Error Correcting Code – Fehlerkorrektur','Enhanced Clock Cycle','Extended Cache Capacity'], correct: 1, explanation: 'ECC (Error Correcting Code) RAM kann einzelne Bitfehler erkennen und korrigieren. Wird in Servern eingesetzt.' },
            { q: 'Wie groß ist die nutzbare Kapazität bei RAID 5 mit vier 4-TB-Festplatten?', options: ['8 TB','12 TB','16 TB','4 TB'], correct: 1, explanation: 'Bei RAID 5 ist die nutzbare Kapazität (n-1) × Plattengröße = (4-1) × 4 TB = 12 TB.' },
            { q: 'Welcher Speichertyp ist nicht flüchtig?', options: ['DDR4 RAM','L2 Cache','SSD','CPU Register'], correct: 2, explanation: 'Eine SSD ist nicht-flüchtig – Daten bleiben ohne Strom erhalten. RAM, Cache und Register verlieren Daten bei Stromverlust.' }
          ]
        },
        {
          id: 'betriebssysteme', name: 'Betriebssysteme', icon: '🐧', color: '#43e97b',
          cards: [
            {
              title: 'Linux Grundlagen', icon: '🐧',
              body: 'Linux verwendet eine <strong>hierarchische Verzeichnisstruktur</strong> beginnend bei <code>/</code>. Wichtige Verzeichnisse: <code>/etc</code> (Konfiguration), <code>/var</code> (variable Daten), <code>/home</code> (Benutzerverzeichnisse).<br><br><strong>Dateiberechtigungen</strong>: rwxrwxrwx. r=4, w=2, x=1. <code>chmod 755</code> = rwxr-xr-x',
              keyPoints: ['ls -la: Dateien mit Berechtigungen anzeigen','chmod 755: rwxr-xr-x','chown user:group datei: Eigentümer ändern','ps aux: Laufende Prozesse anzeigen','sudo: Befehl als Root ausführen'],
              tip: 'chmod 777 = alle Rechte für alle. chmod 644 = lesbar für alle, nur Owner schreibt.'
            },
            {
              title: 'Dateisysteme', icon: '📁',
              body: '<strong>FAT32</strong>: Max. 4 GB pro Datei. Kompatibel mit fast allem.<br><strong>NTFS</strong>: Windows-Standard, große Dateien, Zugriffsrechte, Journaling.<br><strong>ext4</strong>: Linux-Standard, Journaling.<br><strong>exFAT</strong>: Für USB-Sticks, keine 4-GB-Grenze.',
              keyPoints: ['FAT32: Max. 4 GB pro Datei','NTFS: Unterstützt ACL-Berechtigungen','ext4: Standard-Dateisystem unter Linux','Journaling: Schreiboperationen protokolliert → crash-sicher','exFAT: Ideal für SD-Karten und USB-Sticks >4 GB'],
              tip: 'USB-Stick für Windows UND Mac → exFAT oder FAT32, NICHT NTFS.'
            }
          ],
          questions: [
            { q: 'Was bedeutet chmod 755 unter Linux?', options: ['Alle dürfen lesen, schreiben und ausführen','Owner: alles; Gruppe & Andere: lesen und ausführen','Owner: lesen; alle anderen: schreiben','Nur der Owner darf die Datei sehen'], correct: 1, explanation: 'chmod 755: Owner=rwx(7), Gruppe=r-x(5), Andere=r-x(5).' },
            { q: 'In welchem Verzeichnis liegen unter Linux die Konfigurationsdateien?', options: ['/bin','/var','/etc','/usr'], correct: 2, explanation: '/etc enthält systemweite Konfigurationsdateien (z.B. /etc/hosts, /etc/passwd).' },
            { q: 'Welches Dateisystem hat eine maximale Dateigröße von 4 GB?', options: ['NTFS','ext4','exFAT','FAT32'], correct: 3, explanation: 'FAT32 hat eine Beschränkung von maximal 4 GB pro Datei.' },
            { q: 'Welcher Linux-Befehl zeigt laufende Prozesse an?', options: ['ls -la','grep','ps aux','chmod'], correct: 2, explanation: 'ps aux zeigt alle laufenden Prozesse mit PID, CPU- und Speichernutzung.' },
            { q: 'Was ist der Vorteil eines Dateisystems mit Journaling?', options: ['Schnellere Schreibgeschwindigkeit','Dateisystem ist crash-sicherer','Kleinere Dateigrößen','Bessere Komprimierung'], correct: 1, explanation: 'Journaling protokolliert Schreiboperationen. Bei einem Absturz kann das Dateisystem konsistent wiederhergestellt werden.' },
            { q: 'Was macht "grep -r error /var/log/"?', options: ['Sucht rekursiv nach "error" in /var/log/','Löscht Dateien mit "error" im Namen','Kopiert Logs','Zeigt Fehler in Echtzeit'], correct: 0, explanation: 'grep -r sucht rekursiv in allen Unterverzeichnissen nach dem Muster.' },
            { q: 'Welches Dateisystem ist der Standard unter modernen Linux-Distributionen?', options: ['FAT32','NTFS','ext4','exFAT'], correct: 2, explanation: 'ext4 ist das Standard-Dateisystem für die meisten Linux-Distributionen.' },
            { q: 'Was ist der Unterschied zwischen einem Prozess und einem Thread?', options: ['Kein Unterschied','Prozess hat eigenen Speicherbereich, Thread teilt ihn','Thread ist langsamer','Prozesse laufen nur auf einem Kern'], correct: 1, explanation: 'Prozesse haben eigene Speicherbereiche. Threads laufen im selben Prozess und teilen den Speicher.' }
          ]
        },
        {
          id: 'sicherheit', name: 'IT-Sicherheit', icon: '🔒', color: '#f6d365',
          cards: [
            {
              title: 'Verschlüsselungsverfahren', icon: '🔐',
              body: '<strong>Symmetrische Verschlüsselung</strong>: Ein Schlüssel für Ver- und Entschlüsselung. Schnell. Beispiele: AES, 3DES.<br><br><strong>Asymmetrische Verschlüsselung</strong>: Public Key (Verschlüsseln) + Private Key (Entschlüsseln). Beispiele: RSA, ECC.<br><br><strong>Hybridverschlüsselung</strong>: Kombination beider Verfahren (TLS/HTTPS).',
              keyPoints: ['AES-256: Standard für symmetrische Verschlüsselung','RSA: Asymmetrisch, typisch 2048 oder 4096 Bit','TLS: Hybridverfahren','Hash-Funktionen (SHA-256): Einwegfunktion','Digitale Signatur: Mit Private Key signieren, Public Key prüfen'],
              tip: 'HTTPS = HTTP + TLS. TLS nutzt asymmetrische Verschlüsselung für den Handshake, dann symmetrische für Daten.'
            },
            {
              title: 'Angriffsvektoren & Schutz', icon: '🛡️',
              body: '<strong>Phishing</strong>: Gefälschte E-Mails/Webseiten.<br><strong>SQL-Injection</strong>: Einschleusen von SQL-Code.<br><strong>Man-in-the-Middle (MitM)</strong>: Angreifer zwischen Kommunikationspartnern.<br><strong>DoS/DDoS</strong>: Überlastung von Diensten.<br><strong>Brute Force</strong>: Ausprobieren aller Passwortkombinationen.',
              keyPoints: ['Firewall: Filtert Netzwerkpakete','IDS: erkennt Angriffe','IPS: blockiert Angriffe aktiv','2FA/MFA: Schutz vor gestohlenen Passwörtern','Prepared Statements: Schutz vor SQL-Injection','Backup 3-2-1: 3 Kopien, 2 Medien, 1 externes'],
              tip: 'SQL-Injection Schutz: immer Prepared Statements verwenden, niemals Benutzereingaben direkt in SQL einbauen.'
            }
          ],
          questions: [
            { q: 'Was ist der Hauptunterschied zwischen symmetrischer und asymmetrischer Verschlüsselung?', options: ['Symmetrisch ist sicherer','Symmetrisch nutzt einen Schlüssel, asymmetrisch ein Schlüsselpaar','Asymmetrisch ist schneller','Symmetrisch ist nur für Dateien'], correct: 1, explanation: 'Symmetrisch: ein geteilter Schlüssel. Asymmetrisch: Public Key + Private Key.' },
            { q: 'Welches Protokoll sichert HTTPS-Verbindungen?', options: ['SSL 3.0','IPSec','TLS','AES'], correct: 2, explanation: 'TLS (Transport Layer Security) ist das aktuelle Protokoll hinter HTTPS.' },
            { q: 'Was ist eine digitale Signatur?', options: ['Verschlüsselte E-Mail','Hashwert, verschlüsselt mit dem Private Key des Senders','Verschlüsselung mit dem Public Key','Zertifikat einer CA'], correct: 1, explanation: 'Digitale Signatur = Hashwert, verschlüsselt mit dem Private Key. Der Empfänger prüft mit dem Public Key.' },
            { q: 'Welche Maßnahme schützt am besten vor SQL-Injection?', options: ['Firewall','Prepared Statements','Starke Passwörter','Verschlüsselung'], correct: 1, explanation: 'Prepared Statements trennen SQL-Code von Daten.' },
            { q: 'Was versteht man unter einem Man-in-the-Middle-Angriff?', options: ['Passwörter durch Ausprobieren','Angreifer zwischen zwei Kommunikationspartnern','Überlastung eines Servers','Schadcode in E-Mail-Anhängen'], correct: 1, explanation: 'Bei MitM schaltet sich ein Angreifer unbemerkt zwischen zwei Kommunikationspartner.' },
            { q: 'Was beschreibt die 3-2-1-Backup-Regel?', options: ['3 Backups täglich','3 Kopien, auf 2 Medien, 1 extern','3 Vollbackups, 2 differenziell, 1 inkrementell','3 Backups, 2 verschlüsselt, 1 im Tresor'], correct: 1, explanation: '3 Datenkopien, auf 2 verschiedenen Speichermedien, 1 an einem externen Standort.' },
            { q: 'Was unterscheidet IDS von IPS?', options: ['IDS ist schneller','IDS erkennt Angriffe, IPS erkennt und blockiert aktiv','IPS überwacht nur interne Netze','IDS benötigt mehr Hardware'], correct: 1, explanation: 'IDS erkennt und meldet Angriffe. IPS erkennt und blockiert aktiv.' },
            { q: 'Welches Verfahren verwendet HTTPS für den Schlüsselaustausch?', options: ['Nur AES','Nur RSA','Hybridverfahren','Nur symmetrische Verschlüsselung'], correct: 2, explanation: 'TLS nutzt asymmetrische Verschlüsselung für den Handshake, dann symmetrischen Sitzungsschlüssel (AES).' }
          ]
        },
        {
          id: 'datenbanken', name: 'Datenbanken & SQL', icon: '🗃️', color: '#a18cd1',
          cards: [
            {
              title: 'SQL Grundlagen', icon: '📋',
              body: '<strong>SQL</strong> (Structured Query Language) ist die Standardsprache für relationale Datenbanken.<br><br><code>SELECT</code> – Daten abfragen<br><code>INSERT INTO</code> – Daten einfügen<br><code>UPDATE</code> – Daten ändern<br><code>DELETE</code> – Daten löschen<br><code>JOIN</code> – Tabellen verknüpfen',
              keyPoints: ['PRIMARY KEY: Eindeutiger Schlüssel, darf nicht NULL sein','FOREIGN KEY: Verweist auf PRIMARY KEY einer anderen Tabelle','INDEX: Beschleunigt Abfragen','DISTINCT: Entfernt doppelte Ergebnisse','COUNT(), SUM(), AVG(), MAX(), MIN(): Aggregatfunktionen'],
              tip: 'INNER JOIN gibt nur Datensätze zurück, die in BEIDEN Tabellen einen Match haben. LEFT JOIN gibt IMMER alle Datensätze der linken Tabelle zurück.'
            },
            {
              title: 'Normalformen', icon: '📐',
              body: '<strong>1. NF</strong>: Alle Attribute sind atomar. Keine wiederholenden Gruppen.<br><strong>2. NF</strong>: In 1NF + alle Nicht-Schlüssel-Attribute voll funktional abhängig vom gesamten Primärschlüssel.<br><strong>3. NF</strong>: In 2NF + keine transitiven Abhängigkeiten.',
              keyPoints: ['1NF: Keine mehrwertigen Attribute','2NF: Gilt nur bei zusammengesetzten Primärschlüsseln','3NF: Keine Abhängigkeit zwischen Nicht-Schlüssel-Attributen','BCNF: Verschärfte 3NF'],
              tip: 'Merkhilfe: 1NF = atomar, 2NF = voll abhängig, 3NF = kein transitives Chaos.'
            }
          ],
          questions: [
            { q: 'Was gibt ein INNER JOIN zurück?', options: ['Alle Zeilen der linken Tabelle','Alle Zeilen beider Tabellen','Nur Zeilen mit übereinstimmenden Werten in beiden Tabellen','Alle Zeilen der rechten Tabelle'], correct: 2, explanation: 'INNER JOIN gibt nur Datensätze zurück, für die in beiden Tabellen ein Match gefunden wird.' },
            { q: 'Was beschreibt die erste Normalform (1NF)?', options: ['Keine transitiven Abhängigkeiten','Volle funktionale Abhängigkeit','Alle Attribute sind atomar','Kein Fremdschlüssel nötig'], correct: 2, explanation: '1NF fordert, dass alle Attributwerte atomar sind.' },
            { q: 'Was ist der Unterschied zwischen Primary Key und Foreign Key?', options: ['Kein Unterschied','Primary Key eindeutig in eigener Tabelle; Foreign Key verweist auf anderen Primary Key','Foreign Key ist immer eindeutig','Primary Key kann NULL sein'], correct: 1, explanation: 'PRIMARY KEY: Eindeutiger Identifikator. FOREIGN KEY: Referenz auf PRIMARY KEY einer anderen Tabelle.' },
            { q: 'Was macht der SQL-Befehl GROUP BY?', options: ['Sortiert Ergebnisse','Gruppiert Zeilen für Aggregatfunktionen','Filtert doppelte Einträge','Verbindet zwei Tabellen'], correct: 1, explanation: 'GROUP BY fasst Zeilen mit gleichen Werten zusammen für Aggregatfunktionen.' },
            { q: 'Welche SQL-Klausel filtert Ergebnisse?', options: ['ORDER BY','GROUP BY','HAVING','WHERE'], correct: 3, explanation: 'WHERE filtert Zeilen vor der Gruppierung. HAVING filtert nach GROUP BY.' },
            { q: 'Was ist ein Transaktionsmerkmal von ACID?', options: ['Atomicity: Transaktion ist ganz oder gar nicht ausgeführt','Atomicity: kleinste mögliche Datenmenge','Consistency: alle Tabellen gleichzeitig aktualisiert','Durability: Daten täglich gesichert'], correct: 0, explanation: 'ACID: Atomicity (alles oder nichts), Consistency, Isolation, Durability.' },
            { q: 'Welcher JOIN gibt alle Zeilen der linken Tabelle zurück?', options: ['INNER JOIN','RIGHT JOIN','LEFT JOIN','CROSS JOIN'], correct: 2, explanation: 'LEFT JOIN gibt alle Zeilen der linken Tabelle zurück.' },
            { q: 'Was ist eine transitive Abhängigkeit (3NF-Verletzung)?', options: ['Fremdschlüssel auf sich selbst','Nicht-Schlüssel-Attribut hängt von anderem Nicht-Schlüssel-Attribut ab','Zwei Primärschlüssel','Attribut mit mehreren Werten'], correct: 1, explanation: '3NF wird verletzt, wenn ein Nicht-Schlüssel-Attribut von einem anderen Nicht-Schlüssel-Attribut abhängt.' }
          ]
        }
      ]
    },

    ap2: {
      id: 'ap2',
      name: 'AP2',
      fullName: 'Abschlussprüfung Teil 2 – Systemintegration',
      desc: 'Virtualisierung, Cloud, Active Directory, Backup, DSGVO & Projektmanagement',
      icon: '🖧',
      topics: [
        {
          id: 'virtualisierung', name: 'Virtualisierung & Cloud', icon: '☁️', color: '#4facfe',
          cards: [
            {
              title: 'Virtualisierung', icon: '🖥️',
              body: '<strong>Virtualisierung</strong> ermöglicht den Betrieb mehrerer VMs auf einer physischen Hardware.<br><br><strong>Typ-1-Hypervisor</strong> (Bare Metal): Direkt auf Hardware. Beispiele: VMware ESXi, Hyper-V, KVM.<br><strong>Typ-2-Hypervisor</strong> (Hosted): Auf Betriebssystem. Beispiele: VirtualBox, VMware Workstation.',
              keyPoints: ['Typ-1: direkt auf Hardware, effizienter (ESXi, Hyper-V)','Typ-2: auf Betriebssystem (VirtualBox)','Container teilen OS-Kernel → leichter als VMs','Docker: Container-Plattform','Snapshot: Zustandssicherung einer VM'],
              tip: 'Container starten in Sekunden, VMs in Minuten. Container sind leichter, aber weniger isoliert.'
            },
            {
              title: 'Cloud Computing', icon: '🌥️',
              body: '<strong>IaaS</strong> (Infrastructure as a Service): Virtuelle Hardware. Beispiel: AWS EC2.<br><strong>PaaS</strong> (Platform as a Service): Entwicklungsplattform. Beispiel: Heroku.<br><strong>SaaS</strong> (Software as a Service): Fertige Anwendungen. Beispiel: Office 365.',
              keyPoints: ['IaaS: Maximale Kontrolle, mehr Verwaltungsaufwand','PaaS: Entwickler konzentriert sich auf Code','SaaS: Keine Installation, komplett verwaltet','Public Cloud: Ressourcen geteilt','Private Cloud: Eigene Infrastruktur','Hybrid Cloud: Kombination aus Public und Private'],
              tip: 'IaaS = Server mieten, PaaS = Plattform mieten, SaaS = Software mieten. Je höher, desto weniger Kontrolle.'
            }
          ],
          questions: [
            { q: 'Was ist der Hauptunterschied zwischen Typ-1 und Typ-2 Hypervisor?', options: ['Typ-1 ist langsamer','Typ-1 läuft direkt auf Hardware, Typ-2 auf Host-OS','Typ-2 unterstützt mehr VMs','Typ-1 nur für Windows'], correct: 1, explanation: 'Typ-1 (Bare Metal) läuft direkt auf Hardware – effizienter. Typ-2 auf einem OS – einfacher für Desktop-Tests.' },
            { q: 'Welches Cloud-Modell stellt fertige Anwendungen bereit?', options: ['IaaS','PaaS','SaaS','NaaS'], correct: 2, explanation: 'SaaS liefert fertige Anwendungen. Beispiele: Office 365, Google Docs.' },
            { q: 'Was ist ein Container im Vergleich zu einer VM?', options: ['Container benötigen mehr Ressourcen','Container sind langsamer','Container teilen den OS-Kernel und sind leichter','Container haben mehr Isolation'], correct: 2, explanation: 'Container teilen den Kernel → leichter, schnellerer Start. Aber weniger Isolation als VMs.' },
            { q: 'Was ist ein Snapshot bei Virtualisierung?', options: ['Backup der physischen Hardware','Gespeicherter Zustand einer VM zu einem Zeitpunkt','Kopie des Hypervisors','Netzwerk-Screenshot'], correct: 1, explanation: 'Snapshot speichert Zustand einer VM. Man kann jederzeit zu diesem Zustand zurückkehren.' },
            { q: 'Welches Cloud-Modell kombiniert eigene und öffentliche Infrastruktur?', options: ['Public Cloud','Private Cloud','Hybrid Cloud','Community Cloud'], correct: 2, explanation: 'Hybrid Cloud verbindet Private + Public Cloud.' },
            { q: 'Was bietet IaaS dem Kunden?', options: ['Fertige Software','Eine Entwicklungsplattform','Virtuelle Hardware','Nur Datenbankdienste'], correct: 2, explanation: 'IaaS stellt virtuelle Hardware bereit: Server, Storage und Netzwerk.' },
            { q: 'Was ist Live Migration bei Virtualisierung?', options: ['Daten auf externen Speicher','Verschieben einer laufenden VM ohne Downtime','Backup einer VM','Aktualisierung des Hypervisors'], correct: 1, explanation: 'Live Migration verschiebt eine laufende VM ohne Unterbrechung auf einen anderen Host.' },
            { q: 'Was ist ein Docker-Image?', options: ['Eine laufende Container-Instanz','Ein unveränderlicher Bauplan für einen Container','Ein Snapshot einer VM','Ein Netzwerk-Paket'], correct: 1, explanation: 'Docker-Image ist ein unveränderlicher Bauplan, aus dem Container gestartet werden.' }
          ]
        },
        {
          id: 'dsgvo-si', name: 'IT-Sicherheit & DSGVO', icon: '🛡️', color: '#f6d365',
          cards: [
            {
              title: 'DSGVO Grundlagen', icon: '⚖️',
              body: 'Die <strong>DSGVO</strong> gilt seit Mai 2018 in der EU. Grundprinzipien: Rechtmäßigkeit, Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung.<br><br>Datenpanne: Meldung innerhalb <strong>72 Stunden</strong> an Aufsichtsbehörde.',
              keyPoints: ['Personenbezogene Daten: Name, E-Mail, IP-Adresse','Recht auf Auskunft','Recht auf Löschung (Art. 17)','Datenpanne: 72 Stunden Meldefrist','Bußgelder bis 20 Mio. € oder 4% des Jahresumsatzes','AVV bei externen Dienstleistern'],
              tip: '72-Stunden-Frist bei Datenpannen ist eine häufige Prüfungsfrage!'
            },
            {
              title: 'CIA-Triade & BSI', icon: '🔒',
              body: 'Das <strong>IT-Grundschutz-Kompendium</strong> des BSI bietet Leitfäden für IT-Sicherheit.<br><br><strong>CIA-Triade</strong>:<br>• <strong>C</strong>onfidentiality (Vertraulichkeit)<br>• <strong>I</strong>ntegrity (Integrität)<br>• <strong>A</strong>vailability (Verfügbarkeit)',
              keyPoints: ['Vertraulichkeit: Verschlüsselung','Integrität: Hashwerte, digitale Signaturen','Verfügbarkeit: Redundanz, Backups','Penetrationstest: Autorisierter Angriff','Zero Trust: Alles muss authentifiziert werden','Patch Management: Regelmäßige Updates'],
              tip: 'CIA: Vertraulichkeit = Verschlüsselung, Integrität = Hashwert, Verfügbarkeit = Redundanz.'
            }
          ],
          questions: [
            { q: 'Innerhalb welcher Frist muss eine Datenpanne nach DSGVO gemeldet werden?', options: ['24 Stunden','48 Stunden','72 Stunden','7 Tage'], correct: 2, explanation: 'Nach Art. 33 DSGVO muss eine Datenpanne innerhalb von 72 Stunden gemeldet werden.' },
            { q: 'Was beschreibt das "Recht auf Vergessenwerden" (DSGVO Art. 17)?', options: ['Recht auf Korrektur','Recht auf Löschung','Recht auf Auskunft','Recht auf Übertragung'], correct: 1, explanation: 'Art. 17 gibt Betroffenen das Recht, die Löschung ihrer Daten zu verlangen.' },
            { q: 'Was steht für das "I" in der CIA-Triade?', options: ['Infrastructure','Identity','Integrity','Isolation'], correct: 2, explanation: 'CIA: Confidentiality, Integrity (Integrität), Availability.' },
            { q: 'Was ist ein Auftragsverarbeitungsvertrag (AVV)?', options: ['Vertrag mit dem DSB','Vertrag mit externen Dienstleistern, die Daten verarbeiten','Arbeitsvertrag für IT','Servicevertrag mit ISP'], correct: 1, explanation: 'AVV wird benötigt, wenn externe Dienstleister personenbezogene Daten verarbeiten.' },
            { q: 'Was ist das Prinzip der Datenminimierung?', options: ['Daten müssen verschlüsselt sein','Nur notwendige Daten erheben','Daten täglich sichern','Keine Auslandsübertragung'], correct: 1, explanation: 'Datenminimierung: nur so viele Daten erheben wie für den Zweck notwendig.' },
            { q: 'Was ist ein Penetrationstest?', options: ['Test der Bandbreite','Autorisierter simulierter Angriff','Überprüfung der Datensicherung','Stresstest'], correct: 1, explanation: 'Penetrationstest = autorisierter, simulierter Angriff, um Schwachstellen zu finden.' },
            { q: 'Wie hoch sind maximale DSGVO-Bußgelder?', options: ['1 Mio. € oder 1%','5 Mio. € oder 2%','20 Mio. € oder 4% Jahresumsatz','100 Mio. €'], correct: 2, explanation: 'Bußgelder bis 20 Mio. € oder 4% des weltweiten Jahresumsatzes.' },
            { q: 'Was ist das Zero-Trust-Prinzip?', options: ['Interne Nutzer vertraut','Nichts wird per Default vertraut – alles authentifizieren','Externes Netz nie vertraut','Passwörter nie speichern'], correct: 1, explanation: 'Zero Trust: "Never trust, always verify." Kein Gerät bekommt automatisch Vertrauen.' }
          ]
        },
        {
          id: 'server-si', name: 'Server & Active Directory', icon: '🖧', color: '#a18cd1',
          cards: [
            {
              title: 'Active Directory', icon: '📂',
              body: '<strong>Active Directory (AD)</strong> verwaltet Benutzer, Gruppen, Computer und Richtlinien zentral.<br><br>• <strong>Domain Controller (DC)</strong>: Server mit AD-Rolle<br>• <strong>GPO</strong>: Group Policy Object<br>• <strong>OU</strong>: Organizational Unit<br>• <strong>LDAP</strong>: Protokoll für Verzeichniszugriff',
              keyPoints: ['DNS ist Voraussetzung für Active Directory','GPO steuert Computereinstellungen zentral','RADIUS: Authentifizierung für Netzwerkzugriff','LDAP Port 389, LDAPS Port 636','Kerberos: Authentifizierungsprotokoll in AD'],
              tip: 'GPO = zentrale Steuerung von Passwortrichtlinien, Software und Desktop-Einstellungen.'
            },
            {
              title: 'Backup & Hochverfügbarkeit', icon: '💾',
              body: '<strong>Vollbackup</strong>: Alle Daten, einfache Wiederherstellung.<br><strong>Differenziell</strong>: Alle Änderungen seit letztem Vollbackup.<br><strong>Inkrementell</strong>: Nur Änderungen seit letztem Backup.<br><br><strong>Hochverfügbarkeit</strong>: Redundante Systeme für minimale Ausfallzeiten.',
              keyPoints: ['3-2-1-Regel: 3 Kopien, 2 Medien, 1 extern','RPO: Maximaler Datenverlust (Zeitpunkt)','RTO: Maximale Ausfallzeit','Failover-Cluster: Automatischer Wechsel','Load Balancer: Verteilt Anfragen'],
              tip: 'RPO = wieviel Datenverlust tolerierbar, RTO = wie lange darf System ausfallen.'
            }
          ],
          questions: [
            { q: 'Was ist der Zweck eines GPO?', options: ['Speicherplatzverwaltung','Zentrale Verwaltung von Einstellungen für Benutzer/Computer','Datenbankreplikation','Routing-Konfiguration'], correct: 1, explanation: 'GPOs ermöglichen zentrale Verwaltung von Einstellungen in Active Directory.' },
            { q: 'Unterschied inkrementell vs. differenziell?', options: ['Kein Unterschied','Inkrementell: seit letztem Backup; Differenziell: seit letztem Vollbackup','Differenziell: seit letztem Backup; Inkrementell: seit Vollbackup','Inkrementell sichert nur Systemdateien'], correct: 1, explanation: 'Inkrementell: nur Änderungen seit letztem Backup. Differenziell: alle Änderungen seit letztem Vollbackup.' },
            { q: 'Was bedeutet RTO?', options: ['Maximaler Datenverlust','Maximale tolerierbare Ausfallzeit','Häufigkeit der Backups','Kosten der Wiederherstellung'], correct: 1, explanation: 'RTO = wie lange darf ein System maximal ausfallen. RPO = wie viel Datenverlust ist tolerierbar.' },
            { q: 'Welches Protokoll nutzt Active Directory für Verzeichniszugriffe?', options: ['SNMP','LDAP','FTP','Kerberos'], correct: 1, explanation: 'LDAP wird für Verzeichniszugriffe genutzt. Kerberos ist das Authentifizierungsprotokoll.' },
            { q: 'Was ist ein Load Balancer?', options: ['Prüft Netzwerklast','Verteilt Anfragen auf mehrere Server','Backup-System','Firewall-Typ'], correct: 1, explanation: 'Load Balancer verteilt Netzwerkanfragen auf mehrere Server für Hochverfügbarkeit.' },
            { q: 'Was ist RADIUS?', options: ['Dateisystem','Authentifizierungsprotokoll für Netzwerkzugriff','Routing-Protokoll','Backup-Verfahren'], correct: 1, explanation: 'RADIUS = zentrale Authentifizierung für Netzwerkzugriffe (WLAN, VPN).' },
            { q: 'Was bedeutet die 3-2-1-Backup-Regel?', options: ['3 Vollbackups, 2 diff, 1 inkr.','3 Datenkopien, 2 verschiedene Medien, 1 extern','3 Backups täglich','3 Server, 2 Standby, 1 aktiv'], correct: 1, explanation: '3 Kopien, auf 2 verschiedenen Speichermedien, 1 an einem externen Standort.' },
            { q: 'Was ist ein Failover-Cluster?', options: ['Mehrere Server für Rechenleistung','Automatischer Wechsel auf Backup-System bei Ausfall','RAID-Konfiguration','Netzwerk-Protokoll'], correct: 1, explanation: 'Failover-Cluster: automatischer Wechsel auf Standby-Knoten bei Ausfall des Primärsystems.' }
          ]
        },
        {
          id: 'projektmanagement-si', name: 'Projektmanagement', icon: '📋', color: '#43e97b',
          cards: [
            {
              title: 'Vorgehensmodelle', icon: '🔄',
              body: '<strong>Wasserfallmodell</strong>: Sequenziell. Klare Struktur, wenig Flexibilität.<br><br><strong>Scrum</strong> (agil): Sprints (1-4 Wochen). Rollen: Product Owner, Scrum Master, Dev Team.<br><br><strong>Kanban</strong>: Visualisierung des Arbeitsflusses. To Do → In Progress → Done.',
              keyPoints: ['Wasserfall: Analyse → Design → Implementierung → Test → Betrieb','Product Owner: Priorisiert Backlog','Scrum Master: Beseitigt Hindernisse','Sprint: 1-4 Wochen','WiP-Limit bei Kanban'],
              tip: 'Scrum-Rollen: Product Owner = Produktverantwortlicher, Scrum Master = Moderator.'
            },
            {
              title: 'Lastenheft & Pflichtenheft', icon: '📅',
              body: '<strong>Lastenheft</strong>: Was der Auftraggeber will (WAS).<br><strong>Pflichtenheft</strong>: Wie der Auftragnehmer es umsetzt (WIE).<br><br><strong>Kritischer Pfad</strong>: Längste Abhängigkeitskette ohne Puffer.',
              keyPoints: ['Gantt-Diagramm: Zeitbalken für Aufgaben','Kritischer Pfad: Verzögerung = Gesamtprojekt verzögert','SMART-Ziele: Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert','Meilenstein: Wichtiges Zwischenziel ohne Dauer'],
              tip: 'Lastenheft = Kunde (WAS), Pflichtenheft = Auftragnehmer (WIE). Klassische Verwechslungsfalle!'
            }
          ],
          questions: [
            { q: 'Wer schreibt das Lastenheft?', options: ['Auftragnehmer','Scrum Master','Auftraggeber (Kunde)','Entwicklungsteam'], correct: 2, explanation: 'Lastenheft vom Auftraggeber (WAS). Pflichtenheft vom Auftragnehmer (WIE).' },
            { q: 'Was ist die Aufgabe des Product Owners in Scrum?', options: ['Hindernisse beseitigen','Backlog priorisieren und Produktverantwortung','Team täglich moderieren','Code schreiben'], correct: 1, explanation: 'Product Owner priorisiert den Backlog und trägt Produktverantwortung.' },
            { q: 'Was ist der kritische Pfad?', options: ['Kürzester Weg','Teuerster Teil','Längste Abhängigkeitskette ohne Puffer','Weg mit meisten Aufgaben'], correct: 2, explanation: 'Kritischer Pfad: Jede Verzögerung verzögert das Gesamtprojekt.' },
            { q: 'Was beschreibt ein Sprint in Scrum?', options: ['Wöchentliches Meeting','Fester Zeitraum (1-4 Wochen) für ein Produktinkrement','Finale Abnahme','Notfall-Phase'], correct: 1, explanation: 'Sprint: kurzer Entwicklungszeitraum, an dessen Ende ein nutzbares Inkrement steht.' },
            { q: 'Was ist ein SMART-Ziel?', options: ['Agiles Modell','Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert','PM-Tool','Risikoanalyse'], correct: 1, explanation: 'SMART: Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert.' },
            { q: 'Was unterscheidet Kanban von Scrum?', options: ['Kanban hat keine Sprints und kein festes Team','Kanban immer teurer','Scrum hat keine Rollen','Kanban nutzt User Stories'], correct: 0, explanation: 'Kanban: keine Sprints, keine Rollen, kontinuierlicher Fluss und WiP-Limits.' },
            { q: 'Was visualisiert ein Gantt-Diagramm?', options: ['Netzwerkabhängigkeiten','Projektplan mit zeitlichen Balken','Klassendiagramme','Budget'], correct: 1, explanation: 'Gantt-Diagramm: Aufgaben als horizontale Zeitbalken.' },
            { q: 'Was ist das Daily Scrum?', options: ['Planungstreffen für Sprint','15-minütiges Standup zur Synchronisation','Vorstellung fertiger Features','Retrospektive'], correct: 1, explanation: 'Daily Scrum: tägliches, max. 15-minütiges Standup zur Synchronisation.' }
          ]
        }
      ]
    }
  }
};
