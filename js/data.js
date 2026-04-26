const DB = {
  ap1: {
    id: 'ap1', name: 'AP1', fullName: 'Abschlussprüfung Teil 1',
    desc: 'Netzwerke, Hardware, Betriebssysteme, Programmierung, Datenbanken & IT-Sicherheit',
    color: '#667eea', color2: '#764ba2', icon: '🖥️',
    topics: [
      {
        id: 'netzwerk', name: 'Netzwerktechnik', icon: '🌐', color: '#4facfe',
        cards: [
          {
            title: 'Das OSI-Modell', icon: '📶',
            body: 'Das <strong>OSI-Modell</strong> (Open Systems Interconnection) teilt die Netzwerkkommunikation in <strong>7 Schichten</strong> auf. Jede Schicht hat eine klar definierte Aufgabe und kommuniziert nur mit der direkt darüber und darunter liegenden Schicht.<br><br>Merkhilfe: <strong>„Alle Priester Saufen Tequila Nach Der Predigt"</strong>',
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
            body: '<strong>TCP</strong> (Transmission Control Protocol) ist verbindungsorientiert: Es gibt einen 3-Wege-Handshake (SYN → SYN-ACK → ACK), Fehlerkorrektur und garantierte Reihenfolge.<br><br><strong>UDP</strong> (User Datagram Protocol) ist verbindungslos: Pakete werden gesendet ohne Bestätigung – schnell, aber unzuverlässig.',
            diagram: `<svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
  <rect x="10" y="10" width="190" height="140" rx="10" fill="#1368ce" opacity="0.2" stroke="#1368ce" stroke-width="2"/>
  <text x="105" y="35" text-anchor="middle" fill="#4da6ff" font-size="14" font-weight="800">TCP</text>
  ${['✓ Verbindungsorientiert','✓ Fehlerkorrektur','✓ Reihenfolge garantiert','✓ Flusssteuerung','✗ Langsamer'].map((t,i)=>`<text x="20" y="${55+i*20}" fill="#ccc" font-size="11">${t}</text>`).join('')}
  <rect x="220" y="10" width="190" height="140" rx="10" fill="#e21b3c" opacity="0.2" stroke="#e21b3c" stroke-width="2"/>
  <text x="315" y="35" text-anchor="middle" fill="#ff4d6d" font-size="14" font-weight="800">UDP</text>
  ${['✗ Verbindungslos','✗ Keine Fehlerkorrektur','✗ Keine Reihenfolge','✓ Sehr schnell','✓ Streaming, Gaming'].map((t,i)=>`<text x="230" y="${55+i*20}" fill="#ccc" font-size="11">${t}</text>`).join('')}
</svg>`,
            keyPoints: ['TCP: HTTP, HTTPS, FTP, SSH, SMTP','UDP: DNS, DHCP, VoIP, Streaming, Gaming','TCP-Handshake: SYN → SYN-ACK → ACK','UDP hat keinen Verbindungsaufbau'],
            tip: 'Typische Prüfungsfrage: Welches Protokoll nutzt TCP/UDP? DNS nutzt UDP (Port 53), HTTP nutzt TCP (Port 80).'
          },
          {
            title: 'IP-Adressen & Subnetting', icon: '📍',
            body: 'Eine <strong>IPv4-Adresse</strong> besteht aus 32 Bit (4 Oktette). Die <strong>Subnetzmaske</strong> teilt die Adresse in Netzanteil und Hostanteil.<br><br>Beispiel: <code>192.168.1.0/24</code> → Netzanteil 24 Bit, Hostanteil 8 Bit → <strong>254 nutzbare Hosts</strong> (256 − 2, da Netzadresse und Broadcast).',
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
            body: '<strong>RAID</strong> (Redundant Array of Independent Disks) kombiniert mehrere Festplatten für mehr Leistung oder Ausfallsicherheit.<br><br>Die wichtigsten RAID-Level für die Prüfung: RAID 0, 1, 5 und 10.',
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
            tip: 'RAID ist kein Backup! Es schützt nur vor Festplattenausfall, nicht vor versehentlichem Löschen oder Feuer.'
          },
          {
            title: 'CPU, RAM & Speicher', icon: '🔧',
            body: 'Die <strong>CPU</strong> (Central Processing Unit) führt Befehle aus. Wichtige Kennzahlen: Taktfrequenz (GHz), Anzahl Kerne, Cache-Größe (L1/L2/L3).<br><br><strong>RAM</strong>: Flüchtiger Arbeitsspeicher (DDR4/DDR5). Schneller Zugriff, Daten gehen bei Stromverlust verloren.<br><br><strong>SSD vs. HDD</strong>: SSDs sind deutlich schneller (keine beweglichen Teile), HDDs günstiger pro GB.',
            keyPoints: ['L1-Cache: Schnellster, aber kleinster Cache (direkt in CPU)','DDR5 ist schneller und effizienter als DDR4','NVMe SSD über PCIe: deutlich schneller als SATA SSD','HDD: magnetisch, günstiger, aber langsamer und stoßempfindlicher','ECC-RAM: Fehlerkorrektur, wird in Servern eingesetzt'],
            tip: 'Für den Unterschied SSD/HDD: SSD = keine beweglichen Teile, schneller, teurer. HDD = magnetisch, günstiger pro TB.'
          }
        ],
        questions: [
          { q: 'Wie viele Festplatten werden bei RAID 5 mindestens benötigt?', options: ['2','3','4','6'], correct: 1, explanation: 'RAID 5 benötigt mindestens 3 Festplatten. Parität wird auf alle Platten verteilt, 1 Ausfall wird toleriert.' },
          { q: 'Was passiert bei RAID 0, wenn eine Festplatte ausfällt?', options: ['Datenverlust auf dieser Platte','Alle Daten gehen verloren','Das System wechselt auf die andere Platte','Nur neuere Daten gehen verloren'], correct: 1, explanation: 'Bei RAID 0 gibt es keine Redundanz. Fällt eine Platte aus, sind ALLE Daten verloren, da Daten per Striping verteilt sind.' },
          { q: 'Welche RAID-Variante kombiniert Spiegelung und Striping?', options: ['RAID 2','RAID 5','RAID 6','RAID 10'], correct: 3, explanation: 'RAID 10 (auch RAID 1+0) kombiniert Spiegelung (RAID 1) mit Striping (RAID 0) und benötigt mindestens 4 Festplatten.' },
          { q: 'Was ist der Unterschied zwischen L1 und L3 Cache?', options: ['L3 ist schneller und kleiner','L1 ist schneller und kleiner, direkt an der CPU','L1 ist langsamer aber größer','Es gibt keinen Unterschied'], correct: 1, explanation: 'L1-Cache ist der schnellste aber kleinste Cache, direkt in der CPU. L3 ist größer aber langsamer als L1.' },
          { q: 'Welche Aussage zu SSDs ist korrekt?', options: ['SSDs haben bewegliche Teile','SSDs sind langsamer als HDDs','SSDs sind stoßunempfindlicher als HDDs','SSDs sind immer günstiger als HDDs'], correct: 2, explanation: 'SSDs haben keine beweglichen Teile und sind daher stoßunempfindlicher. HDDs sind günstiger pro GB.' },
          { q: 'Was bedeutet ECC bei RAM?', options: ['Erweiterter Cache Controller','Error Correcting Code – Fehlerkorrektur','Enhanced Clock Cycle','Extended Cache Capacity'], correct: 1, explanation: 'ECC (Error Correcting Code) RAM kann einzelne Bitfehler erkennen und korrigieren. Wird in Servern eingesetzt.' },
          { q: 'Wie groß ist die nutzbare Kapazität bei RAID 5 mit vier 4-TB-Festplatten?', options: ['8 TB','12 TB','16 TB','4 TB'], correct: 1, explanation: 'Bei RAID 5 ist die nutzbare Kapazität (n-1) × Plattengröße = (4-1) × 4 TB = 12 TB.' },
          { q: 'Welcher Speichertyp ist nicht flüchtig?', options: ['DDR4 RAM','L2 Cache','SSD','CPU Register'], correct: 2, explanation: 'Eine SSD ist nicht-flüchtig (non-volatile) – Daten bleiben ohne Strom erhalten. RAM, Cache und Register verlieren Daten bei Stromverlust.' }
        ]
      },
      {
        id: 'betriebssysteme', name: 'Betriebssysteme', icon: '🐧', color: '#43e97b',
        cards: [
          {
            title: 'Linux Grundlagen', icon: '🐧',
            body: 'Linux verwendet eine <strong>hierarchische Verzeichnisstruktur</strong> beginnend bei <code>/</code> (Root). Wichtige Verzeichnisse: <code>/etc</code> (Konfiguration), <code>/var</code> (variable Daten), <code>/home</code> (Benutzerverzeichnisse), <code>/bin</code> (Binaries).<br><br><strong>Dateiberechtigungen</strong>: rwxrwxrwx (Owner/Group/Others). r=4, w=2, x=1. Beispiel: <code>chmod 755</code> = rwxr-xr-x',
            keyPoints: ['ls -la: Dateien mit Berechtigungen anzeigen','chmod 755: rwxr-xr-x (Owner alles, andere nur lesen/ausführen)','chown user:group datei: Eigentümer ändern','ps aux: Laufende Prozesse anzeigen','grep "text" datei: Text in Datei suchen','sudo: Befehl als Root ausführen'],
            tip: 'Merke: chmod 777 = alle Rechte für alle. chmod 644 = Datei lesbar für alle, aber nur Owner darf schreiben.'
          },
          {
            title: 'Dateisysteme', icon: '📁',
            body: 'Das <strong>Dateisystem</strong> bestimmt, wie Daten auf einem Datenträger gespeichert werden.<br><br><strong>FAT32</strong>: Max. 4 GB pro Datei, max. 8 TB Partition. Kompatibel mit fast allem.<br><strong>NTFS</strong>: Windows-Standard, große Dateien, Zugriffsrechte, Journaling.<br><strong>ext4</strong>: Linux-Standard, Journaling, große Dateien.<br><strong>exFAT</strong>: Für USB-Sticks, keine 4-GB-Grenze.',
            keyPoints: ['FAT32: Max. 4 GB pro Datei – für USB-Sticks veraltet','NTFS: Unterstützt ACL-Berechtigungen und Komprimierung','ext4: Standard-Dateisystem unter Linux/Ubuntu','Journaling: Schreiboperationen werden protokolliert → crash-sicher','exFAT: Ideal für SD-Karten und USB-Sticks >4 GB'],
            tip: 'Prüfungsfalle: USB-Stick soll für Windows und Mac genutzt werden → exFAT oder FAT32 wählen, NICHT NTFS.'
          }
        ],
        questions: [
          { q: 'Was bedeutet chmod 755 unter Linux?', options: ['Alle dürfen lesen, schreiben und ausführen','Owner: alles; Gruppe & Andere: lesen und ausführen','Owner: lesen; alle anderen: schreiben','Nur der Owner darf die Datei sehen'], correct: 1, explanation: 'chmod 755: Owner=rwx(7), Gruppe=r-x(5), Andere=r-x(5). Also Owner darf alles, alle anderen nur lesen und ausführen.' },
          { q: 'In welchem Verzeichnis liegen unter Linux die Konfigurationsdateien?', options: ['/bin','/var','/etc','/usr'], correct: 2, explanation: '/etc enthält systemweite Konfigurationsdateien (z.B. /etc/hosts, /etc/passwd, /etc/network/).' },
          { q: 'Welches Dateisystem hat eine maximale Dateigröße von 4 GB?', options: ['NTFS','ext4','exFAT','FAT32'], correct: 3, explanation: 'FAT32 hat eine Beschränkung von maximal 4 GB pro Datei und eignet sich daher nicht mehr für moderne Anwendungen.' },
          { q: 'Welcher Linux-Befehl zeigt laufende Prozesse an?', options: ['ls -la','grep','ps aux','chmod'], correct: 2, explanation: 'ps aux zeigt alle laufenden Prozesse mit Benutzer, PID, CPU- und Speichernutzung an.' },
          { q: 'Was ist der Vorteil eines Dateisystems mit Journaling?', options: ['Schnellere Schreibgeschwindigkeit','Dateisystem ist crash-sicherer','Kleinere Dateigrößen','Bessere Komprimierung'], correct: 1, explanation: 'Journaling protokolliert Schreiboperationen in einem Journal. Bei einem Absturz kann das Dateisystem konsistent wiederhergestellt werden.' },
          { q: 'Was macht der Befehl "grep -r error /var/log/"?', options: ['Sucht rekursiv nach "error" in /var/log/','Löscht Dateien mit "error" im Namen','Kopiert Logs in /var/log/','Zeigt Fehlermeldungen in Echtzeit'], correct: 0, explanation: 'grep -r sucht rekursiv in allen Unterverzeichnissen nach dem angegebenen Muster, hier "error" in /var/log/.' },
          { q: 'Welches Dateisystem ist der Standard unter modernen Linux-Distributionen?', options: ['FAT32','NTFS','ext4','exFAT'], correct: 2, explanation: 'ext4 (Fourth Extended Filesystem) ist das Standard-Dateisystem für die meisten Linux-Distributionen.' },
          { q: 'Was ist der Unterschied zwischen einem Prozess und einem Thread?', options: ['Kein Unterschied','Prozess hat eigenen Speicherbereich, Thread teilt ihn','Thread ist langsamer als ein Prozess','Prozesse laufen nur auf einem Kern'], correct: 1, explanation: 'Prozesse haben eigene Speicherbereiche. Threads laufen im selben Prozess und teilen den Speicher – ermöglicht schnelle Kommunikation.' }
        ]
      },
      {
        id: 'programmierung', name: 'Programmierung & Algorithmen', icon: '💻', color: '#f093fb',
        cards: [
          {
            title: 'OOP – Objektorientierung', icon: '🧩',
            body: 'Die <strong>objektorientierte Programmierung (OOP)</strong> basiert auf 4 Grundprinzipien:<br><br><strong>Kapselung</strong>: Daten und Methoden werden in Klassen zusammengefasst. Zugriff nur über definierte Schnittstellen.<br><strong>Vererbung</strong>: Klassen können Eigenschaften anderer Klassen übernehmen.<br><strong>Polymorphismus</strong>: Gleicher Methodenname, unterschiedliches Verhalten.<br><strong>Abstraktion</strong>: Vereinfachung auf das Wesentliche.',
            keyPoints: ['Klasse = Bauplan, Objekt = Instanz einer Klasse','private: nur innerhalb der Klasse zugänglich','public: von überall zugänglich','protected: nur in Klasse und Unterklassen','super(): Konstruktor der Elternklasse aufrufen','Interface vs. abstrakte Klasse: Interface hat keine Implementierung'],
            tip: 'Die 4 OOP-Prinzipien sind prüfungsrelevant. Merke: KAP-VER-POL-ABS (Kapselung, Vererbung, Polymorphismus, Abstraktion).'
          },
          {
            title: 'Datenstrukturen & Algorithmen', icon: '📊',
            body: '<strong>Array</strong>: Feste Größe, wahlfreier Zugriff O(1).<br><strong>Linked List</strong>: Dynamisch, Einfügen O(1), Suchen O(n).<br><strong>Stack</strong>: LIFO (Last In, First Out) – wie ein Stapel.<br><strong>Queue</strong>: FIFO (First In, First Out) – wie eine Warteschlange.<br><br><strong>Big-O-Notation</strong>: Misst die Zeitkomplexität. O(1) = konstant, O(n) = linear, O(n²) = quadratisch.',
            keyPoints: ['Binäre Suche: O(log n) – nur bei sortierten Arrays','Bubblesort: O(n²) – langsam, aber einfach','Quicksort: O(n log n) durchschnittlich','Stack: push() und pop()','Queue: enqueue() und dequeue()','HashMap/Dictionary: O(1) durchschnittlicher Zugriff'],
            tip: 'Für Prüfungen: Binäre Suche funktioniert nur auf sortierten Listen und hat O(log n) Komplexität.'
          }
        ],
        questions: [
          { q: 'Was beschreibt das OOP-Prinzip der Kapselung?', options: ['Eine Klasse erbt von einer anderen','Daten und Methoden werden in einer Klasse zusammengefasst','Eine Methode verhält sich je nach Objekt unterschiedlich','Komplexität wird versteckt'], correct: 1, explanation: 'Kapselung (Encapsulation) fasst Daten und Methoden in einer Klasse zusammen und kontrolliert den Zugriff über Sichtbarkeiten (private/public).' },
          { q: 'Welche Zugriffsmodifikator erlaubt Zugriff nur innerhalb der eigenen Klasse?', options: ['public','protected','private','internal'], correct: 2, explanation: 'private erlaubt Zugriff nur innerhalb der eigenen Klasse. protected erlaubt zusätzlich Zugriff aus Unterklassen.' },
          { q: 'Was ist die Zeitkomplexität einer binären Suche?', options: ['O(1)','O(n)','O(log n)','O(n²)'], correct: 2, explanation: 'Binäre Suche halbiert bei jedem Schritt den Suchbereich, daher O(log n). Voraussetzung: sortiertes Array.' },
          { q: 'Welche Datenstruktur arbeitet nach dem LIFO-Prinzip?', options: ['Queue','Array','Stack','Linked List'], correct: 2, explanation: 'Stack = LIFO (Last In, First Out). Das zuletzt eingefügte Element wird zuerst entnommen – wie ein Tellerstapel.' },
          { q: 'Was ist der Unterschied zwischen einer Klasse und einem Objekt?', options: ['Kein Unterschied','Klasse ist der Bauplan, Objekt ist eine Instanz','Objekt ist der Bauplan, Klasse ist eine Instanz','Klassen haben keine Methoden'], correct: 1, explanation: 'Eine Klasse ist der Bauplan/Template. Ein Objekt ist eine konkrete Instanz dieser Klasse mit eigenen Attributwerten.' },
          { q: 'Welchen Sortieralgorithmus hat die beste durchschnittliche Zeitkomplexität?', options: ['Bubblesort O(n²)','Insertionsort O(n²)','Quicksort O(n log n)','Selectionsort O(n²)'], correct: 2, explanation: 'Quicksort hat O(n log n) im Durchschnitt und ist in der Praxis sehr schnell. Worst-Case ist O(n²), tritt aber selten auf.' },
          { q: 'Was ist Polymorphismus in der OOP?', options: ['Vererbung von Methoden','Eine Klasse erbt von mehreren Klassen','Gleicher Methodenname mit unterschiedlichem Verhalten','Datenkapselung in private Felder'], correct: 2, explanation: 'Polymorphismus erlaubt, dass Methoden mit gleichem Namen je nach Objekt/Klasse unterschiedlich ausgeführt werden (Überschreiben/Überladen).' },
          { q: 'Welche Aussage zu einer Queue ist richtig?', options: ['LIFO – letztes Element zuerst raus','FIFO – erstes Element zuerst raus','Wahlfreier Zugriff per Index','Nur ein Element kann gespeichert werden'], correct: 1, explanation: 'Queue = FIFO (First In, First Out). Das zuerst eingefügte Element verlässt die Queue zuerst – wie eine Warteschlange.' }
        ]
      },
      {
        id: 'sicherheit', name: 'IT-Sicherheit', icon: '🔒', color: '#f6d365',
        cards: [
          {
            title: 'Verschlüsselungsverfahren', icon: '🔐',
            body: '<strong>Symmetrische Verschlüsselung</strong>: Ein Schlüssel für Ver- und Entschlüsselung. Schnell, aber Schlüsselaustausch ist problematisch. Beispiele: AES, 3DES.<br><br><strong>Asymmetrische Verschlüsselung</strong>: Schlüsselpaar aus Public Key (Verschlüsseln) und Private Key (Entschlüsseln). Langsam, aber sicherer Austausch. Beispiele: RSA, ECC.<br><br><strong>Hybridverschlüsselung</strong>: Kombination beider Verfahren (z.B. TLS/HTTPS).',
            keyPoints: ['AES-256: Aktueller Standard für symmetrische Verschlüsselung','RSA: Asymmetrisch, typisch 2048 oder 4096 Bit','TLS: Hybridverfahren (asymmetrisch für Schlüsseltausch, symmetrisch für Daten)','Hash-Funktionen (SHA-256): Einwegfunktion, kein Entschlüsseln möglich','Digitale Signatur: Mit Private Key signieren, Public Key prüfen'],
            tip: 'HTTPS = HTTP + TLS. TLS nutzt zuerst asymmetrische Verschlüsselung für den Handshake, dann symmetrische für den Datentransfer.'
          },
          {
            title: 'Angriffsvektoren & Schutzmaßnahmen', icon: '🛡️',
            body: '<strong>Phishing</strong>: Gefälschte E-Mails/Webseiten zum Diebstahl von Zugangsdaten.<br><strong>SQL-Injection</strong>: Einschleusen von SQL-Code über Eingabefelder.<br><strong>Man-in-the-Middle (MitM)</strong>: Angreifer schaltet sich zwischen Kommunikationspartner.<br><strong>DoS/DDoS</strong>: Überlastung von Diensten durch massenhafte Anfragen.<br><strong>Brute Force</strong>: Ausprobieren aller Passwortkombinationen.',
            keyPoints: ['Firewall: Filtert Netzwerkpakete nach Regeln','IDS: Intrusion Detection System – erkennt Angriffe','IPS: Intrusion Prevention System – blockiert Angriffe aktiv','2FA/MFA: Schutz vor gestohlenen Passwörtern','Prepared Statements: Schutz vor SQL-Injection','Backup 3-2-1: 3 Kopien, 2 Medien, 1 externes'],
            tip: 'SQL-Injection Schutz: immer Prepared Statements/Parameterized Queries verwenden, niemals Benutzereingaben direkt in SQL einbauen.'
          }
        ],
        questions: [
          { q: 'Was ist der Hauptunterschied zwischen symmetrischer und asymmetrischer Verschlüsselung?', options: ['Symmetrisch ist sicherer','Symmetrisch nutzt einen Schlüssel, asymmetrisch ein Schlüsselpaar','Asymmetrisch ist schneller','Symmetrisch ist nur für Dateien'], correct: 1, explanation: 'Symmetrisch: ein geteilter Schlüssel. Asymmetrisch: Public Key (verschlüsseln) + Private Key (entschlüsseln). Asymmetrisch löst das Schlüsselaustausch-Problem.' },
          { q: 'Welches Protokoll sichert HTTPS-Verbindungen?', options: ['SSL 3.0','IPSec','TLS','AES'], correct: 2, explanation: 'TLS (Transport Layer Security) ist das aktuelle Protokoll hinter HTTPS. SSL ist veraltet und unsicher.' },
          { q: 'Was ist eine digitale Signatur?', options: ['Verschlüsselte E-Mail','Hashwert, verschlüsselt mit dem Private Key des Senders','Verschlüsselung mit dem Public Key','Zertifikat einer CA'], correct: 1, explanation: 'Eine digitale Signatur ist ein Hashwert des Dokuments, der mit dem Private Key des Senders verschlüsselt wird. Der Empfänger prüft sie mit dem Public Key.' },
          { q: 'Welche Maßnahme schützt am besten vor SQL-Injection?', options: ['Firewall','Prepared Statements','Starke Passwörter','Verschlüsselung'], correct: 1, explanation: 'Prepared Statements (Parameterized Queries) trennen SQL-Code von Daten und verhindern so das Einschleusen von SQL-Befehlen.' },
          { q: 'Was versteht man unter einem Man-in-the-Middle-Angriff?', options: ['Ein Angriff auf Passwörter durch Ausprobieren','Angreifer positioniert sich zwischen zwei Kommunikationspartner','Überlastung eines Servers','Schadcode in E-Mail-Anhängen'], correct: 1, explanation: 'Bei MitM schaltet sich ein Angreifer unbemerkt zwischen zwei Kommunikationspartner, um Daten abzufangen oder zu manipulieren.' },
          { q: 'Was beschreibt die 3-2-1-Backup-Regel?', options: ['3 Backups täglich, 2 wöchentlich, 1 monatlich','3 Kopien, auf 2 verschiedenen Medien, 1 extern','3 Vollbackups, 2 differenzielle, 1 inkrementell','3 Backups, 2 verschlüsselt, 1 im Tresor'], correct: 1, explanation: '3-2-1-Regel: 3 Datenkopien, auf 2 verschiedenen Speichermedien, davon 1 an einem externen Standort (Schutz vor Feuer, Diebstahl).' },
          { q: 'Was unterscheidet IDS von IPS?', options: ['IDS ist schneller als IPS','IDS erkennt Angriffe, IPS erkennt und blockiert aktiv','IPS überwacht nur interne Netze','IDS benötigt mehr Hardware'], correct: 1, explanation: 'IDS (Intrusion Detection System) erkennt und meldet Angriffe. IPS (Intrusion Prevention System) erkennt und blockiert Angriffe aktiv in Echtzeit.' },
          { q: 'Welches Verfahren verwendet HTTPS für den Schlüsselaustausch?', options: ['Nur AES','Nur RSA','Hybridverfahren (asymmetrisch für Handshake, dann symmetrisch)','Nur symmetrische Verschlüsselung'], correct: 2, explanation: 'TLS (HTTPS) nutzt asymmetrische Verschlüsselung (RSA/ECDH) für den sicheren Schlüsselaustausch, danach wird ein symmetrischer Sitzungsschlüssel (AES) verwendet.' }
        ]
      },
      {
        id: 'datenbanken', name: 'Datenbanken & SQL', icon: '🗃️', color: '#a18cd1',
        cards: [
          {
            title: 'SQL Grundlagen', icon: '📋',
            body: '<strong>SQL</strong> (Structured Query Language) ist die Standardsprache für relationale Datenbanken.<br><br>Wichtige Befehle:<br><code>SELECT</code> – Daten abfragen<br><code>INSERT INTO</code> – Daten einfügen<br><code>UPDATE</code> – Daten ändern<br><code>DELETE</code> – Daten löschen<br><code>WHERE</code> – Bedingung<br><code>JOIN</code> – Tabellen verknüpfen<br><code>GROUP BY</code> – Gruppieren',
            diagram: `<svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
  <text x="10" y="20" fill="#a18cd1" font-size="13" font-weight="800">SQL JOIN Typen</text>
  ${[['INNER JOIN','Nur übereinstimmende Zeilen','#4da6ff'],['LEFT JOIN','Alle links + übereinstimmende rechts','#43e97b'],['RIGHT JOIN','Alle rechts + übereinstimmende links','#f093fb'],['FULL OUTER JOIN','Alle Zeilen beider Tabellen','#ffc93c']].map((j,i)=>`
  <rect x="10" y="${30+i*35}" width="180" height="28" rx="5" fill="${j[2]}" opacity="0.2" stroke="${j[2]}" stroke-width="1.5"/>
  <text x="20" y="${49+i*35}" fill="${j[2]}" font-size="12" font-weight="800">${j[0]}</text>
  <text x="200" y="${49+i*35}" fill="#ccc" font-size="11">${j[1]}</text>`).join('')}
</svg>`,
            keyPoints: ['PRIMARY KEY: Eindeutiger Schlüssel, darf nicht NULL sein','FOREIGN KEY: Verweist auf PRIMARY KEY einer anderen Tabelle','INDEX: Beschleunigt Abfragen, belegt aber Speicher','DISTINCT: Entfernt doppelte Ergebnisse','COUNT(), SUM(), AVG(), MAX(), MIN(): Aggregatfunktionen'],
            tip: 'INNER JOIN gibt nur Datensätze zurück, die in BEIDEN Tabellen einen Match haben. LEFT JOIN gibt IMMER alle Datensätze der linken Tabelle zurück.'
          },
          {
            title: 'Normalformen', icon: '📐',
            body: 'Normalisierung vermeidet Redundanzen und Anomalien in Datenbanken.<br><br><strong>1. NF</strong>: Alle Attribute sind atomar (unteilbar). Keine wiederholenden Gruppen.<br><strong>2. NF</strong>: In 1NF + alle Nicht-Schlüssel-Attribute sind voll funktional abhängig vom gesamten Primärschlüssel.<br><strong>3. NF</strong>: In 2NF + keine transitiven Abhängigkeiten (kein Nicht-Schlüssel hängt von einem anderen Nicht-Schlüssel ab).',
            keyPoints: ['1NF: Keine mehrwertigen Attribute (z.B. kein "Tel: 123, 456")','2NF: Gilt nur bei zusammengesetzten Primärschlüsseln','3NF: Keine Abhängigkeit zwischen Nicht-Schlüssel-Attributen','BCNF: Verschärfte 3NF','Denormalisierung: Bewusste Redundanz für Performance'],
            tip: 'Merkhilfe: 1NF = atomar, 2NF = voll abhängig, 3NF = kein transitives Chaos.'
          }
        ],
        questions: [
          { q: 'Was gibt ein INNER JOIN zurück?', options: ['Alle Zeilen der linken Tabelle','Alle Zeilen beider Tabellen','Nur Zeilen mit übereinstimmenden Werten in beiden Tabellen','Alle Zeilen der rechten Tabelle'], correct: 2, explanation: 'INNER JOIN gibt nur die Datensätze zurück, für die in beiden Tabellen ein übereinstimmender Wert gefunden wird.' },
          { q: 'Was beschreibt die erste Normalform (1NF)?', options: ['Keine transitiven Abhängigkeiten','Volle funktionale Abhängigkeit','Alle Attribute sind atomar (unteilbar)','Kein Fremdschlüssel nötig'], correct: 2, explanation: '1NF fordert, dass alle Attributwerte atomar (unteilbar) sind. Keine Listen oder Mengen in einer Zelle.' },
          { q: 'Was ist der Unterschied zwischen Primary Key und Foreign Key?', options: ['Kein Unterschied','Primary Key ist eindeutig in der eigenen Tabelle; Foreign Key verweist auf Primary Key einer anderen Tabelle','Foreign Key ist immer eindeutig','Primary Key kann NULL sein'], correct: 1, explanation: 'PRIMARY KEY: Eindeutiger Identifikator in der eigenen Tabelle. FOREIGN KEY: Referenz auf den PRIMARY KEY einer anderen Tabelle (Relation).' },
          { q: 'Was macht der SQL-Befehl GROUP BY?', options: ['Sortiert Ergebnisse alphabetisch','Gruppiert Zeilen nach einem Attribut für Aggregatfunktionen','Filtert doppelte Einträge','Verbindet zwei Tabellen'], correct: 1, explanation: 'GROUP BY fasst Zeilen mit gleichen Werten zusammen, sodass Aggregatfunktionen (COUNT, SUM, AVG) pro Gruppe berechnet werden können.' },
          { q: 'Welche SQL-Klausel filtert Ergebnisse?', options: ['ORDER BY','GROUP BY','HAVING','WHERE'], correct: 3, explanation: 'WHERE filtert Zeilen vor der Gruppierung. HAVING filtert nach GROUP BY (filtert Gruppen). ORDER BY sortiert nur.' },
          { q: 'Was ist ein Transaktionsmerkmal von ACID?', options: ['Atomicity: Transaktion ist entweder ganz oder gar nicht ausgeführt','Atomicity: Kleinste mögliche Datenmenge','Consistency: Alle Tabellen werden gleichzeitig aktualisiert','Durability: Daten werden täglich gesichert'], correct: 0, explanation: 'ACID: Atomicity (alles oder nichts), Consistency (Integrität bleibt gewahrt), Isolation (Transaktionen beeinflussen sich nicht), Durability (Persistenz nach Commit).' },
          { q: 'Welcher JOIN gibt alle Zeilen der linken Tabelle zurück?', options: ['INNER JOIN','RIGHT JOIN','LEFT JOIN','CROSS JOIN'], correct: 2, explanation: 'LEFT JOIN gibt alle Zeilen der linken Tabelle zurück. Für nicht übereinstimmende Zeilen der rechten Tabelle werden NULL-Werte eingesetzt.' },
          { q: 'Was ist eine transitive Abhängigkeit (3NF-Verletzung)?', options: ['Ein Fremdschlüssel verweist auf sich selbst','Ein Nicht-Schlüssel-Attribut hängt von einem anderen Nicht-Schlüssel-Attribut ab','Zwei Primärschlüssel in einer Tabelle','Ein Attribut hat mehrere Werte'], correct: 1, explanation: '3NF wird verletzt, wenn ein Nicht-Schlüssel-Attribut von einem anderen Nicht-Schlüssel-Attribut abhängt (transitive Abhängigkeit). Lösung: auslagern in eigene Tabelle.' }
        ]
      }
    ]
  },

  ap2: {
    id: 'ap2', name: 'AP2', fullName: 'Abschlussprüfung Teil 2',
    desc: 'Virtualisierung, Cloud, IT-Sicherheit, DSGVO, Projektmanagement & Server-Dienste',
    color: '#f093fb', color2: '#f5576c', icon: '☁️',
    topics: [
      {
        id: 'virtualisierung', name: 'Virtualisierung & Cloud', icon: '☁️', color: '#4facfe',
        cards: [
          {
            title: 'Virtualisierung', icon: '🖥️',
            body: '<strong>Virtualisierung</strong> ermöglicht den Betrieb mehrerer virtueller Maschinen (VMs) auf einer physischen Hardware.<br><br><strong>Typ-1-Hypervisor</strong> (Bare Metal): Läuft direkt auf der Hardware. Beispiele: VMware ESXi, Hyper-V, KVM. Effizienter.<br><br><strong>Typ-2-Hypervisor</strong> (Hosted): Läuft auf einem Betriebssystem. Beispiele: VMware Workstation, VirtualBox. Für Testzwecke.',
            diagram: `<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
  <text x="10" y="18" fill="#4facfe" font-size="13" font-weight="800">Typ-1 (Bare Metal)</text>
  ${[['Hardware','#555'],['Hypervisor (ESXi/KVM)','#4facfe'],['VM 1','#667eea'],['VM 2','#764ba2']].map((l,i)=>`<rect x="10" y="${25+i*30}" width="170" height="24" rx="4" fill="${l[1]}" opacity="0.3" stroke="${l[1]}" stroke-width="1.5"/><text x="95" y="${41+i*30}" text-anchor="middle" fill="white" font-size="11" font-weight="700">${l[0]}</text>`).join('')}
  <text x="230" y="18" fill="#f093fb" font-size="13" font-weight="800">Typ-2 (Hosted)</text>
  ${[['Hardware','#555'],['Host-OS','#888'],['Hypervisor (VirtualBox)','#f093fb'],['VM 1','#f5576c']].map((l,i)=>`<rect x="225" y="${25+i*30}" width="175" height="24" rx="4" fill="${l[1]}" opacity="0.3" stroke="${l[1]}" stroke-width="1.5"/><text x="312" y="${41+i*30}" text-anchor="middle" fill="white" font-size="11" font-weight="700">${l[0]}</text>`).join('')}
  <text x="10" y="170" fill="#4dcc44" font-size="13" font-weight="800">Container (Docker)</text>
  ${[['Host-OS + Container Engine','#43e97b'],['Container A','#38f9d7'],['Container B','#4facfe']].map((l,i)=>`<rect x="10" y="${180+i*26}" width="400" height="20" rx="3" fill="${l[1]}" opacity="0.25" stroke="${l[1]}" stroke-width="1.5"/><text x="210" y="${194+i*26}" text-anchor="middle" fill="white" font-size="11" font-weight="700">${l[0]}</text>`).join('')}
</svg>`,
            keyPoints: ['Typ-1 Hypervisor: direkt auf Hardware, effizienter (ESXi, Hyper-V)','Typ-2 Hypervisor: auf Betriebssystem, für Desktops (VirtualBox)','Container teilen den OS-Kernel → leichter als VMs','Docker: Container-Plattform, Dockerfile definiert Image','Snapshot: Zustandssicherung einer VM zu einem Zeitpunkt'],
            tip: 'Container starten in Sekunden, VMs in Minuten. Container sind leichter, aber weniger isoliert als VMs.'
          },
          {
            title: 'Cloud Computing', icon: '🌥️',
            body: 'Cloud-Dienste werden in drei Servicemodelle unterteilt:<br><br><strong>IaaS</strong> (Infrastructure as a Service): Virtuelle Hardware (Server, Storage, Netzwerk). Beispiel: AWS EC2, Azure VMs.<br><strong>PaaS</strong> (Platform as a Service): Entwicklungsplattform. Beispiel: Heroku, Google App Engine.<br><strong>SaaS</strong> (Software as a Service): Fertige Anwendungen. Beispiel: Office 365, Google Workspace.',
            keyPoints: ['IaaS: Maximale Kontrolle, aber mehr Verwaltungsaufwand','PaaS: Entwickler konzentriert sich auf Code, kein OS-Management','SaaS: Keine Installation, komplett vom Anbieter verwaltet','Public Cloud: Ressourcen öffentlich geteilt (AWS, Azure, GCP)','Private Cloud: Eigene Infrastruktur, mehr Kontrolle und Sicherheit','Hybrid Cloud: Kombination aus Public und Private'],
            tip: 'Merkhilfe: IaaS = Server mieten, PaaS = Plattform mieten, SaaS = Software mieten. Je höher, desto weniger Kontrolle.'
          }
        ],
        questions: [
          { q: 'Was ist der Hauptunterschied zwischen Typ-1 und Typ-2 Hypervisor?', options: ['Typ-1 ist langsamer','Typ-1 läuft direkt auf Hardware, Typ-2 auf einem Host-OS','Typ-2 unterstützt mehr VMs','Typ-1 ist nur für Windows'], correct: 1, explanation: 'Typ-1 (Bare Metal) läuft direkt auf Hardware – effizienter. Typ-2 läuft auf einem vorhandenen Betriebssystem – einfacher für Desktop-Tests.' },
          { q: 'Welches Cloud-Servicemodell stellt fertige Anwendungen bereit?', options: ['IaaS','PaaS','SaaS','NaaS'], correct: 2, explanation: 'SaaS (Software as a Service) liefert fertige Anwendungen über das Internet. Beispiele: Office 365, Salesforce, Google Docs.' },
          { q: 'Was ist ein Container im Vergleich zu einer VM?', options: ['Container benötigen mehr Ressourcen','Container sind langsamer','Container teilen den OS-Kernel und sind leichter','Container haben mehr Isolation'], correct: 2, explanation: 'Container teilen den Kernel des Host-OS und benötigen kein eigenes Betriebssystem → leichter, schnellerer Start. Aber weniger Isolation als VMs.' },
          { q: 'Was ist ein Snapshot bei Virtualisierung?', options: ['Ein Backup der gesamten physischen Hardware','Ein gespeicherter Zustand einer VM zu einem bestimmten Zeitpunkt','Eine Kopie des Hypervisors','Ein Netzwerk-Screenshot'], correct: 1, explanation: 'Ein Snapshot speichert den aktuellen Zustand einer VM (RAM, Festplatten, Konfiguration). Man kann jederzeit zu diesem Zustand zurückkehren.' },
          { q: 'Welches Cloud-Modell kombiniert eigene und öffentliche Infrastruktur?', options: ['Public Cloud','Private Cloud','Hybrid Cloud','Community Cloud'], correct: 2, explanation: 'Hybrid Cloud verbindet Private Cloud (eigene, kontrollierte Infrastruktur) mit Public Cloud (z.B. AWS für Lastspitzen) – bietet Flexibilität und Kontrolle.' },
          { q: 'Was bietet IaaS dem Kunden?', options: ['Fertige Software','Eine Entwicklungsplattform','Virtuelle Hardware (Server, Speicher, Netzwerk)','Nur Datenbankdienste'], correct: 2, explanation: 'IaaS stellt virtuelle Hardware bereit: Server, Storage und Netzwerk. Der Kunde verwaltet selbst OS und Software.' },
          { q: 'Was ist Live Migration bei Virtualisierung?', options: ['Kopieren von Daten auf externen Speicher','Verschieben einer laufenden VM auf einen anderen Host ohne Downtime','Backup einer VM während des Betriebs','Aktualisierung des Hypervisors'], correct: 1, explanation: 'Live Migration verschiebt eine laufende VM ohne Unterbrechung auf einen anderen physischen Host. Wichtig für Wartungsarbeiten ohne Downtime.' },
          { q: 'Was ist ein Docker-Image?', options: ['Eine laufende Container-Instanz','Ein unveränderlicher Bauplan für einen Container','Ein Snapshot einer VM','Ein Netzwerk-Paket'], correct: 1, explanation: 'Ein Docker-Image ist ein unveränderlicher Bauplan (Template), aus dem Container gestartet werden. Das Dockerfile beschreibt, wie das Image gebaut wird.' }
        ]
      },
      {
        id: 'dsgvo', name: 'IT-Sicherheit & DSGVO', icon: '🛡️', color: '#f6d365',
        cards: [
          {
            title: 'DSGVO Grundlagen', icon: '⚖️',
            body: 'Die <strong>DSGVO</strong> (Datenschutz-Grundverordnung) gilt seit Mai 2018 in der EU. Sie regelt den Umgang mit personenbezogenen Daten.<br><br><strong>Grundprinzipien</strong>: Rechtmäßigkeit, Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität und Vertraulichkeit.<br><br>Ein <strong>Datenschutzbeauftragter</strong> muss ernannt werden, wenn regelmäßig mehr als 20 Personen personenbezogene Daten verarbeiten.',
            keyPoints: ['Personenbezogene Daten: Name, E-Mail, IP-Adresse, etc.','Recht auf Auskunft: Jeder darf fragen, welche Daten gespeichert sind','Recht auf Löschung (Art. 17): "Recht auf Vergessenwerden"','Datenpanne muss innerhalb von 72 Stunden gemeldet werden','Bußgelder bis 20 Mio. € oder 4% des weltweiten Jahresumsatzes','Auftragsverarbeitungsvertrag (AVV) bei externen Dienstleistern'],
            tip: 'Die 72-Stunden-Frist bei Datenpannen ist eine häufige Prüfungsfrage! Meldepflicht gilt bei Datenpannen, die ein Risiko für Betroffene darstellen.'
          },
          {
            title: 'IT-Sicherheitskonzepte', icon: '🔒',
            body: 'Das <strong>IT-Grundschutz-Kompendium</strong> des BSI (Bundesamt für Sicherheit in der Informationstechnik) bietet Leitfäden für IT-Sicherheit.<br><br>Das Schutzziel-Dreieck: <strong>CIA-Triade</strong><br>• <strong>C</strong>onfidentiality (Vertraulichkeit)<br>• <strong>I</strong>ntegrity (Integrität)<br>• <strong>A</strong>vailability (Verfügbarkeit)',
            keyPoints: ['Vertraulichkeit: Unbefugter Zugriff verhindert (Verschlüsselung)','Integrität: Daten unverändert (Hashwerte, digitale Signaturen)','Verfügbarkeit: System erreichbar (Redundanz, Backups)','Penetrationstest: Autorisierter Angriff auf eigene Systeme','Zero Trust: Kein Vertrauen per Default, alles muss authentifiziert werden','Patch Management: Regelmäßige Updates schließen Sicherheitslücken'],
            tip: 'CIA-Triade ist sehr prüfungsrelevant. Vertraulichkeit = Verschlüsselung, Integrität = Hashwert/Signatur, Verfügbarkeit = Redundanz/Backup.'
          }
        ],
        questions: [
          { q: 'Innerhalb welcher Frist muss eine Datenpanne nach DSGVO gemeldet werden?', options: ['24 Stunden','48 Stunden','72 Stunden','7 Tage'], correct: 2, explanation: 'Nach Art. 33 DSGVO muss eine Datenpanne, die ein Risiko für Betroffene darstellt, innerhalb von 72 Stunden nach Bekanntwerden an die Aufsichtsbehörde gemeldet werden.' },
          { q: 'Was beschreibt das "Recht auf Vergessenwerden" (DSGVO Art. 17)?', options: ['Das Recht, falsche Daten zu korrigieren','Das Recht auf Löschung personenbezogener Daten','Das Recht auf Auskunft','Das Recht auf Dateiübertragung'], correct: 1, explanation: 'Art. 17 DSGVO (Recht auf Löschung/"Vergessenwerden") gibt Betroffenen das Recht, die Löschung ihrer personenbezogenen Daten zu verlangen.' },
          { q: 'Was steht für das "I" in der CIA-Triade?', options: ['Infrastructure','Identity','Integrity','Isolation'], correct: 2, explanation: 'CIA: Confidentiality (Vertraulichkeit), Integrity (Integrität – Daten unverändert), Availability (Verfügbarkeit).' },
          { q: 'Was ist ein Auftragsverarbeitungsvertrag (AVV)?', options: ['Ein Vertrag mit dem Datenschutzbeauftragten','Ein Vertrag mit externen Dienstleistern, die personenbezogene Daten verarbeiten','Ein Arbeitsvertrag für IT-Mitarbeiter','Ein Servicevertrag mit dem ISP'], correct: 1, explanation: 'Ein AVV wird benötigt, wenn externe Dienstleister (z.B. Cloud-Anbieter) personenbezogene Daten im Auftrag des Unternehmens verarbeiten.' },
          { q: 'Was ist das Prinzip der Datenminimierung nach DSGVO?', options: ['Daten müssen verschlüsselt gespeichert werden','Es dürfen nur die für den Zweck notwendigen Daten erhoben werden','Daten müssen täglich gesichert werden','Daten dürfen nicht ins Ausland übertragen werden'], correct: 1, explanation: 'Datenminimierung (Art. 5 DSGVO): Es dürfen nur so viele personenbezogene Daten erhoben werden, wie für den jeweiligen Zweck notwendig sind.' },
          { q: 'Was versteht man unter einem Penetrationstest?', options: ['Test der Bandbreite eines Netzwerks','Autorisierter simulierter Angriff auf eigene IT-Systeme','Überprüfung der Datensicherung','Stresstest eines Webservers'], correct: 1, explanation: 'Ein Penetrationstest ist ein autorisierter, simulierter Angriff auf eigene IT-Systeme, um Schwachstellen zu finden, bevor echte Angreifer sie ausnutzen.' },
          { q: 'Wie hoch sind die maximalen DSGVO-Bußgelder?', options: ['1 Mio. € oder 1% des Umsatzes','5 Mio. € oder 2% des Umsatzes','20 Mio. € oder 4% des weltweiten Jahresumsatzes','100 Mio. €'], correct: 2, explanation: 'DSGVO Bußgelder bis zu 20 Mio. € oder 4% des weltweiten Jahresumsatzes (je nachdem, was höher ist) für schwere Verstöße.' },
          { q: 'Was ist das Zero-Trust-Prinzip?', options: ['Alle internen Nutzer werden automatisch vertraut','Kein Nutzer oder System wird per Default vertraut – alles muss authentifiziert werden','Externes Netz wird nie vertraut, internes immer','Passwörter werden nie gespeichert'], correct: 1, explanation: 'Zero Trust: "Never trust, always verify." Kein Nutzer, kein Gerät und kein Netzwerksegment bekommt automatisch Vertrauen – alles muss verifiziert werden.' }
        ]
      },
      {
        id: 'projektmanagement', name: 'Projektmanagement', icon: '📋', color: '#43e97b',
        cards: [
          {
            title: 'Vorgehensmodelle', icon: '🔄',
            body: '<strong>Wasserfallmodell</strong>: Sequenziell, jede Phase muss abgeschlossen sein bevor die nächste beginnt. Klare Struktur, wenig Flexibilität.<br><br><strong>Scrum</strong> (agil): Iterativ in Sprints (1-4 Wochen). Rollen: Product Owner, Scrum Master, Development Team. Events: Sprint Planning, Daily Scrum, Sprint Review, Retrospektive.<br><br><strong>Kanban</strong>: Visualisierung des Arbeitsflusses. Spalten: To Do → In Progress → Done.',
            keyPoints: ['Wasserfall: Phasen = Analyse → Design → Implementierung → Test → Betrieb','Product Owner: Priorisiert den Product Backlog','Scrum Master: Beseitigt Hindernisse, kein klassischer PM','Sprint: Fester Zeitraum (1-4 Wochen) mit definiertem Ziel','User Story: "Als [Nutzer] möchte ich [Funktion], damit [Nutzen]"','WiP-Limit bei Kanban: Begrenzt laufende Arbeiten'],
            tip: 'Scrum-Rollen sind prüfungsrelevant: Product Owner = Produktverantwortlicher, Scrum Master = Moderator, Dev Team = selbstorganisiert.'
          },
          {
            title: 'Projektplanung', icon: '📅',
            body: '<strong>Lastenheft</strong>: Was der Auftraggeber will (Anforderungen des Kunden).<br><strong>Pflichtenheft</strong>: Wie der Auftragnehmer es umsetzen wird (technische Lösung).<br><br><strong>Netzplantechnik</strong>: Zeigt Abhängigkeiten zwischen Aufgaben. Der <strong>kritische Pfad</strong> ist die längste Kette ohne Puffer – jede Verzögerung verzögert das Gesamtprojekt.',
            keyPoints: ['Gantt-Diagramm: Visualisiert Projektplan mit Zeitbalken','Kritischer Pfad: Längste Abhängigkeitskette ohne Puffer','SMART-Ziele: Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert','Meilenstein: Wichtiges Zwischenziel ohne Dauer','Pufferzeit: Zeit, die eine Aufgabe sich verzögern darf ohne Auswirkung auf Gesamtprojekt'],
            tip: 'Lastenheft = Kunde schreibt (WAS), Pflichtenheft = Auftragnehmer schreibt (WIE). Klassische Verwechslungsfalle in der Prüfung!'
          }
        ],
        questions: [
          { q: 'Wer schreibt das Lastenheft?', options: ['Der Auftragnehmer','Der Scrum Master','Der Auftraggeber (Kunde)','Das Entwicklungsteam'], correct: 2, explanation: 'Das Lastenheft wird vom Auftraggeber (Kunde) erstellt und beschreibt, WAS er benötigt. Das Pflichtenheft antwortet mit WIE der Auftragnehmer es umsetzt.' },
          { q: 'Was ist die Aufgabe des Product Owners in Scrum?', options: ['Hindernisse für das Team beseitigen','Den Product Backlog priorisieren und Produktverantwortung tragen','Das Team täglich moderieren','Code schreiben und testen'], correct: 1, explanation: 'Der Product Owner priorisiert den Product Backlog, trägt die Produktverantwortung und versteht die Kundenbedürfnisse.' },
          { q: 'Was ist der kritische Pfad in der Netzplantechnik?', options: ['Der kürzeste Weg durch das Projekt','Der teuerste Teil des Projekts','Die längste Abhängigkeitskette ohne Puffer','Der Weg mit den meisten Aufgaben'], correct: 2, explanation: 'Der kritische Pfad ist die längste Kette von Aufgaben ohne Pufferzeit. Jede Verzögerung einer Aufgabe auf dem kritischen Pfad verzögert das Gesamtprojekt.' },
          { q: 'Was beschreibt ein Sprint in Scrum?', options: ['Ein wöchentliches Meeting','Ein fester Zeitraum (1-4 Wochen) zur Entwicklung eines Produktinkrements','Die finale Abnahme des Projekts','Eine Notfall-Entwicklungsphase'], correct: 1, explanation: 'Ein Sprint ist ein fester, kurzer Entwicklungszeitraum (meist 2 Wochen), an dessen Ende ein fertiges, nutzbares Produktinkrement steht.' },
          { q: 'Was ist ein SMART-Ziel?', options: ['Ein agiles Vorgehensmodell','Ein Ziel, das spezifisch, messbar, attraktiv, realistisch und terminiert ist','Ein Projektmanagement-Tool','Eine Risikoanalyse-Methode'], correct: 1, explanation: 'SMART: Spezifisch (klar definiert), Messbar (Kriterien), Attraktiv (motivierend), Realistisch (erreichbar), Terminiert (mit Deadline).' },
          { q: 'Was unterscheidet Kanban von Scrum?', options: ['Kanban hat keine Sprints und kein festes Team','Kanban ist immer teurer','Scrum hat keine Rollen','Kanban nutzt User Stories, Scrum nicht'], correct: 0, explanation: 'Kanban hat keine festen Sprints, keine vorgegebenen Rollen und keinen festen Rhythmus. Der Fokus liegt auf kontinuierlichem Fluss und WiP-Limits.' },
          { q: 'Was visualisiert ein Gantt-Diagramm?', options: ['Netzwerkabhängigkeiten','Projektplan mit zeitlichen Balken für Aufgaben','Klassendiagramme','Budget-Übersicht'], correct: 1, explanation: 'Ein Gantt-Diagramm zeigt Projektaufgaben als horizontale Zeitbalken auf einer Zeitachse – ideal für die Übersicht über Zeitplanung und Parallelarbeiten.' },
          { q: 'Was ist die tägliche Scrum-Veranstaltung (Daily Scrum)?', options: ['Planungstreffen für den nächsten Sprint','15-minütiges Standup zur Synchronisation des Teams','Vorstellung der fertigen Features dem Kunden','Retrospektive über den vergangenen Sprint'], correct: 1, explanation: 'Das Daily Scrum ist ein tägliches, maximal 15-minütiges Standup-Meeting, bei dem das Team seinen Fortschritt synchronisiert und Hindernisse identifiziert.' }
        ]
      },
      {
        id: 'server', name: 'Server & Netzwerkdienste', icon: '🖧', color: '#a18cd1',
        cards: [
          {
            title: 'Active Directory & Verzeichnisdienste', icon: '📂',
            body: '<strong>Active Directory (AD)</strong> ist Microsofts Verzeichnisdienst für Windows-Netzwerke. Es verwaltet Benutzer, Gruppen, Computer und Richtlinien zentral.<br><br>Wichtige Konzepte:<br>• <strong>Domain Controller (DC)</strong>: Server mit AD-Rolle<br>• <strong>GPO</strong> (Group Policy Object): Einstellungen für Benutzer/Computer<br>• <strong>OU</strong> (Organizational Unit): Ordnerstruktur im AD<br>• <strong>LDAP</strong>: Protokoll für Verzeichniszugriff',
            keyPoints: ['AD DS: Active Directory Domain Services','DNS ist Voraussetzung für Active Directory','Gruppenrichtlinien (GPO) steuern Computereinstellungen zentral','RADIUS: Authentifizierung für Netzwerkzugriff (WLAN, VPN)','LDAP Port 389 (unverschlüsselt), LDAPS Port 636 (verschlüsselt)','Kerberos: Authentifizierungsprotokoll in Active Directory'],
            tip: 'GPO (Group Policy Object) ist sehr prüfungsrelevant: Damit können zentral Passwortrichtlinien, Software und Desktop-Einstellungen verteilt werden.'
          },
          {
            title: 'Backup & Hochverfügbarkeit', icon: '💾',
            body: '<strong>Backuparten</strong>:<br>• <strong>Vollbackup</strong>: Alle Daten werden gesichert. Langsam, aber einfache Wiederherstellung.<br>• <strong>Differenzielles Backup</strong>: Alle Änderungen seit dem letzten Vollbackup.<br>• <strong>Inkrementelles Backup</strong>: Nur Änderungen seit dem letzten Backup (voll oder inkrementell). Schnell, aber komplexe Wiederherstellung.<br><br><strong>Hochverfügbarkeit</strong>: Redundante Systeme (Failover, Load Balancer, Cluster) für minimale Ausfallzeiten.',
            keyPoints: ['3-2-1-Regel: 3 Kopien, 2 Medien, 1 extern','RPO (Recovery Point Objective): Maximaler Datenverlust (bis zu welchem Zeitpunkt)','RTO (Recovery Time Objective): Maximale Ausfallzeit','Failover-Cluster: Automatischer Wechsel auf Backup-System','Load Balancer: Verteilt Anfragen auf mehrere Server','Cold/Warm/Hot Standby: Bereitschaftsgrade des Backup-Systems'],
            tip: 'RPO und RTO verwechseln viele! RPO = wieviel Datenverlust ist tolerierbar (Zeit), RTO = wie lange darf das System ausfallen.'
          }
        ],
        questions: [
          { q: 'Was ist der Zweck eines Group Policy Objects (GPO)?', options: ['Speicherplatzverwaltung','Zentrale Verwaltung von Einstellungen für Benutzer und Computer','Datenbankreplikation','Netzwerk-Routing-Konfiguration'], correct: 1, explanation: 'GPOs ermöglichen die zentrale Verwaltung von Einstellungen (Passwortrichtlinien, Software-Deployment, Desktop-Konfiguration) für Benutzer und Computer in Active Directory.' },
          { q: 'Was ist der Unterschied zwischen inkrementellem und differenziellem Backup?', options: ['Kein Unterschied','Inkrementell: seit letztem Backup; Differenziell: seit letztem Vollbackup','Differenziell: seit letztem Backup; Inkrementell: seit letztem Vollbackup','Inkrementell sichert nur Systemdateien'], correct: 1, explanation: 'Inkrementell: nur Änderungen seit dem letzten Backup (schnell, komplexe Wiederherstellung). Differenziell: alle Änderungen seit dem letzten Vollbackup (mehr Speicher, einfachere Wiederherstellung).' },
          { q: 'Was bedeutet RTO (Recovery Time Objective)?', options: ['Maximaler tolerierbarer Datenverlust','Maximale tolerierbare Ausfallzeit bis zur Wiederherstellung','Häufigkeit der Backups','Kosten der Wiederherstellung'], correct: 1, explanation: 'RTO = wie lange darf ein System maximal ausfallen. RPO = wie viel Datenverlust ist tolerierbar (bis zu welchem Zeitpunkt muss gesichert worden sein).' },
          { q: 'Welches Protokoll nutzt Active Directory für Verzeichniszugriffe?', options: ['SNMP','LDAP','FTP','Kerberos'], correct: 1, explanation: 'LDAP (Lightweight Directory Access Protocol) wird für Verzeichniszugriffe genutzt. Kerberos ist das Authentifizierungsprotokoll in AD.' },
          { q: 'Was ist ein Load Balancer?', options: ['Ein Gerät zum Prüfen der Netzwerklast','Verteilt eingehende Anfragen auf mehrere Server','Ein Backup-System','Ein Firewall-Typ'], correct: 1, explanation: 'Ein Load Balancer verteilt eingehende Netzwerkanfragen auf mehrere Server, um Überlastung zu verhindern und Hochverfügbarkeit sicherzustellen.' },
          { q: 'Was ist RADIUS?', options: ['Ein Dateisystem','Ein Authentifizierungsprotokoll für Netzwerkzugriff','Ein Routing-Protokoll','Ein Backup-Verfahren'], correct: 1, explanation: 'RADIUS (Remote Authentication Dial-In User Service) ist ein Protokoll zur zentralen Authentifizierung, Autorisierung und Accounting (AAA) für Netzwerkzugriffe (WLAN, VPN).' },
          { q: 'Was bedeutet die 3-2-1-Backup-Regel?', options: ['3 Vollbackups, 2 differenziell, 1 inkrementell','3 Datenkopien auf 2 verschiedenen Medien, 1 davon extern','3 Backups täglich, 2 wöchentlich, 1 monatlich','3 Server, 2 in Standby, 1 aktiv'], correct: 1, explanation: '3-2-1: 3 Kopien der Daten, auf 2 verschiedenen Speichermedien, 1 davon an einem externen Standort (Schutz vor Feuer, Diebstahl, Naturkatastrophen).' },
          { q: 'Was ist ein Failover-Cluster?', options: ['Mehrere Server für höhere Rechenleistung','Automatischer Wechsel auf ein Backup-System bei Ausfall des Primärsystems','Eine RAID-Konfiguration','Ein Netzwerk-Protokoll'], correct: 1, explanation: 'Ein Failover-Cluster ermöglicht, dass bei Ausfall des aktiven Knotens automatisch ein Standby-Knoten übernimmt – minimiert Ausfallzeiten (Hochverfügbarkeit).' }
        ]
      }
    ]
  },

  wiso: {
    id: 'wiso', name: 'WiSo', fullName: 'Wirtschafts- und Sozialkunde',
    desc: 'Arbeitsrecht, Sozialversicherungen, Wirtschaft & Berufsausbildung',
    color: '#43e97b', color2: '#38f9d7', icon: '📊',
    topics: [
      {
        id: 'arbeitsrecht', name: 'Arbeitsrecht', icon: '⚖️', color: '#f6d365',
        cards: [
          {
            title: 'Arbeitsvertrag & Kündigung', icon: '📄',
            body: 'Der <strong>Arbeitsvertrag</strong> regelt das Arbeitsverhältnis. Wichtige Inhalte: Tätigkeit, Arbeitszeit, Vergütung, Urlaubsanspruch, Kündigungsfristen.<br><br><strong>Kündigungsfristen</strong> nach § 622 BGB:<br>• Probezeit (bis 6 Monate): 2 Wochen<br>• Bis 2 Jahre: 4 Wochen zum 15. oder Monatsende<br>• Ab 2 Jahre: 1 Monat; ab 5 Jahre: 2 Monate; steigt mit Betriebszugehörigkeit',
            keyPoints: ['Probezeit: max. 6 Monate, Kündigung 2 Wochen','Ordentliche Kündigung: mit Frist','Außerordentliche Kündigung (fristlos): nur bei wichtigem Grund','Aufhebungsvertrag: Einvernehmliche Beendigung','Abmahnung: Vorwarnung vor Kündigung','Betriebsbedingte Kündigung: wirtschaftliche Gründe'],
            tip: 'Die Kündigungsfrist während der Probezeit (2 Wochen) ist eine typische Prüfungsfrage. Nach der Probezeit: 4 Wochen zum 15. oder Ende des Monats.'
          },
          {
            title: 'Arbeitszeit & Urlaub', icon: '🕐',
            body: 'Das <strong>Arbeitszeitgesetz (ArbZG)</strong> regelt:<br>• Max. <strong>8 Stunden</strong> täglich (kann auf 10h erhöht werden, wenn innerhalb von 6 Monaten ausgeglichen)<br>• Mindestens <strong>11 Stunden</strong> Ruhezeit zwischen Arbeitstagen<br>• Keine Arbeit an Sonn- und Feiertagen (Ausnahmen möglich)<br><br><strong>Urlaub</strong>: Gesetzlicher Mindesturlaub = <strong>24 Werktage</strong> (bei 6-Tage-Woche) = 20 Tage bei 5-Tage-Woche.',
            keyPoints: ['Maximale tägliche Arbeitszeit: 8 Stunden (Ausnahme: 10h)','Ruhezeit: mindestens 11 Stunden zwischen Arbeitstagen','Gesetzlicher Mindesturlaub: 24 Werktage = 20 Arbeitstage (5-Tage-Woche)','Urlaub verfällt am 31.3. des Folgejahres (Regel)','Jugendliche (unter 18): max. 8h/Tag, 40h/Woche','Überstunden: Freizeitausgleich oder Vergütung laut Vertrag'],
            tip: '24 Werktage = 20 Arbeitstage! Der Unterschied: Werktage = Mo-Sa, Arbeitstage = Mo-Fr. Wichtig für die Berechnung.'
          }
        ],
        questions: [
          { q: 'Wie lange beträgt die gesetzliche Kündigungsfrist während der Probezeit?', options: ['1 Woche','2 Wochen','4 Wochen','1 Monat'], correct: 1, explanation: 'Während der Probezeit (max. 6 Monate) gilt eine Kündigungsfrist von 2 Wochen (§ 622 Abs. 3 BGB). Nach der Probezeit sind es 4 Wochen.' },
          { q: 'Wie viele Stunden täglich darf man maximal arbeiten (ArbZG)?', options: ['6 Stunden','8 Stunden (Regel), 10 Stunden (Ausnahme)','12 Stunden','10 Stunden immer'], correct: 1, explanation: 'Das Arbeitszeitgesetz sieht max. 8 Stunden täglich vor. Ausnahmsweise darf auf 10 Stunden verlängert werden, wenn innerhalb von 6 Monaten ein Ausgleich erfolgt.' },
          { q: 'Wie viele Werktage Urlaub stehen einem Arbeitnehmer gesetzlich mindestens zu?', options: ['20 Werktage','24 Werktage','28 Werktage','30 Werktage'], correct: 1, explanation: 'Der gesetzliche Mindesturlaub beträgt 24 Werktage (bei 6-Tage-Woche). Bei 5-Tage-Woche sind das 20 Arbeitstage.' },
          { q: 'Was ist eine außerordentliche (fristlose) Kündigung?', options: ['Kündigung ohne Begründung','Kündigung bei wichtigem Grund, ohne Einhaltung einer Frist','Kündigung mit 4-Wochen-Frist','Kündigung durch den Betriebsrat'], correct: 1, explanation: 'Eine fristlose Kündigung ist nur bei einem "wichtigen Grund" möglich (z.B. Diebstahl, Arbeitsverweigerung). Sie beendet das Arbeitsverhältnis sofort.' },
          { q: 'Was regelt das Arbeitszeitgesetz bezüglich der Ruhezeit?', options: ['Mindestens 8 Stunden zwischen Arbeitstagen','Mindestens 11 Stunden Ruhezeit zwischen zwei Arbeitstagen','Mindestens 6 Stunden Schlaf','Mindestens 1 Stunde Pause pro Tag'], correct: 1, explanation: 'Das ArbZG schreibt mindestens 11 Stunden Ruhezeit zwischen zwei Arbeitstagen vor. Ausnahmen gibt es z.B. in der Gastronomie oder Pflege.' },
          { q: 'Was ist ein Aufhebungsvertrag?', options: ['Eine einseitige Kündigung durch den Arbeitgeber','Eine einvernehmliche Beendigung des Arbeitsverhältnisses','Ein befristeter Arbeitsvertrag','Ein Vertrag während der Probezeit'], correct: 1, explanation: 'Ein Aufhebungsvertrag ist eine gemeinsame, einvernehmliche Vereinbarung zwischen Arbeitgeber und Arbeitnehmer zur Beendigung des Arbeitsverhältnisses.' },
          { q: 'Was muss vor einer verhaltensbedingten Kündigung in der Regel erfolgen?', options: ['Ein Betriebsratsgespräch','Eine schriftliche Abmahnung','Ein Kündigungsschutzverfahren','Eine Probezeit-Verlängerung'], correct: 1, explanation: 'Vor einer verhaltensbedingten Kündigung muss in der Regel eine Abmahnung erfolgen. Diese gibt dem Arbeitnehmer die Chance, sein Verhalten zu ändern.' },
          { q: 'Wann darf ein Jugendlicher (unter 18) maximal täglich arbeiten?', options: ['6 Stunden','8 Stunden','10 Stunden','12 Stunden'], correct: 1, explanation: 'Das Jugendarbeitsschutzgesetz (JArbSchG) erlaubt Jugendlichen max. 8 Stunden täglich und 40 Stunden wöchentlich.' }
        ]
      },
      {
        id: 'sozialversicherung', name: 'Sozialversicherungen', icon: '🏥', color: '#4facfe',
        cards: [
          {
            title: 'Die 5 Sozialversicherungszweige', icon: '🛡️',
            body: 'Deutschland hat <strong>5 Sozialversicherungszweige</strong>, die überwiegend paritätisch (je zur Hälfte von AG und AN) finanziert werden:<br><br>1. <strong>Krankenversicherung (KV)</strong>: ~14,6% + Zusatzbeitrag<br>2. <strong>Rentenversicherung (RV)</strong>: 18,6%<br>3. <strong>Arbeitslosenversicherung (AV)</strong>: 2,6%<br>4. <strong>Pflegeversicherung (PV)</strong>: 3,4% (Kinderlose +0,6%)<br>5. <strong>Unfallversicherung (UV)</strong>: Nur vom Arbeitgeber gezahlt',
            diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
  ${[['🏥 Krankenversicherung','~14,6% + ZB','paritätisch','#f093fb'],['🏦 Rentenversicherung','18,6%','paritätisch','#667eea'],['💼 Arbeitslosenversicherung','2,6%','paritätisch','#43e97b'],['🧓 Pflegeversicherung','3,4%','paritätisch','#f6d365'],['⚠️ Unfallversicherung','variabel','nur Arbeitgeber','#fa709a']].map((s,i)=>`
  <rect x="10" y="${5+i*38}" width="400" height="32" rx="6" fill="${s[3]}" opacity="0.15" stroke="${s[3]}" stroke-width="1.5"/>
  <text x="20" y="${25+i*38}" fill="${s[3]}" font-size="12" font-weight="800">${s[0]}</text>
  <text x="260" y="${25+i*38}" fill="#ccc" font-size="11">${s[1]} | ${s[2]}</text>`).join('')}
</svg>`,
            keyPoints: ['Paritätisch = je 50% Arbeitgeber & Arbeitnehmer','Unfallversicherung: 100% Arbeitgeber','Kinderlose zahlen 0,6% mehr Pflegeversicherung','Beitragsbemessungsgrenze: ab hier kein Beitrag mehr','Krankenversicherungspflicht bis 69.300 € Jahresbrutto (2024)','GKV vs. PKV: Ab 69.300 € Jahresbrutto kann in PKV gewechselt werden'],
            tip: 'Die Unfallversicherung wird ausschließlich vom Arbeitgeber bezahlt – das ist eine häufige Prüfungsfalle!'
          }
        ],
        questions: [
          { q: 'Welcher Sozialversicherungszweig wird ausschließlich vom Arbeitgeber bezahlt?', options: ['Krankenversicherung','Rentenversicherung','Unfallversicherung','Pflegeversicherung'], correct: 2, explanation: 'Die gesetzliche Unfallversicherung (Berufsgenossenschaft) wird ausschließlich vom Arbeitgeber finanziert. Alle anderen Zweige werden paritätisch aufgeteilt.' },
          { q: 'Was bedeutet "paritätische Finanzierung" bei Sozialversicherungen?', options: ['Nur der Arbeitnehmer zahlt','Nur der Arbeitgeber zahlt','Je 50% Arbeitgeber und Arbeitnehmer','Der Staat übernimmt die Hälfte'], correct: 2, explanation: 'Paritätisch bedeutet, dass Arbeitgeber und Arbeitnehmer je 50% der Beiträge tragen. Dies gilt für KV, RV, AV und PV (nicht UV).' },
          { q: 'Welchen Beitragssatz hat die gesetzliche Rentenversicherung (2024)?', options: ['14,6%','18,6%','2,6%','3,4%'], correct: 1, explanation: 'Der Beitragssatz der gesetzlichen Rentenversicherung beträgt 18,6% des Bruttogehalts, je zur Hälfte von AG und AN getragen.' },
          { q: 'Wer zahlt einen höheren Pflegeversicherungsbeitrag?', options: ['Alle zahlen gleich','Verheiratete','Kinderlose Arbeitnehmer','Arbeitnehmer über 50'], correct: 2, explanation: 'Kinderlose Arbeitnehmer ab 23 Jahren zahlen einen Beitragszuschlag von 0,6% zur Pflegeversicherung.' },
          { q: 'Was ist die Beitragsbemessungsgrenze?', options: ['Mindestlohn für Sozialversicherungspflicht','Einkommensgrenze, ab der kein Beitrag mehr steigt','Grenze für Steuerbefreiung','Höchstbetrag für Krankenversicherung'], correct: 1, explanation: 'Ab der Beitragsbemessungsgrenze wird kein höherer Sozialversicherungsbeitrag fällig – das Einkommen über dieser Grenze ist beitragsfrei.' },
          { q: 'Ab welcher Gehaltsgrenze (ca.) kann man 2024 in die private KV wechseln?', options: ['40.000 € Jahresbrutto','55.000 € Jahresbrutto','69.300 € Jahresbrutto','100.000 € Jahresbrutto'], correct: 2, explanation: 'Die Versicherungspflichtgrenze (Jahresarbeitsentgeltgrenze) liegt 2024 bei ca. 69.300 € brutto jährlich. Ab diesem Betrag kann man in die PKV wechseln.' },
          { q: 'Was ist Kurzarbeitergeld?', options: ['Lohnzuschuss bei Überstunden','Leistung der AV bei vorübergehend reduzierter Arbeitszeit','Rente für Teilzeitarbeit','Förderung für Auszubildende'], correct: 1, explanation: 'Kurzarbeitergeld wird von der Bundesagentur für Arbeit (Arbeitslosenversicherung) gezahlt, wenn Betriebe die Arbeitszeit vorübergehend reduzieren müssen (z.B. in Krisen).' },
          { q: 'Wie lange hat man Anspruch auf Arbeitslosengeld I (ALG I) nach 2 Jahren Beschäftigung?', options: ['6 Monate','12 Monate','24 Monate','36 Monate'], correct: 1, explanation: 'Nach mindestens 24 Monaten versicherungspflichtiger Beschäftigung hat man Anspruch auf 12 Monate ALG I. Die Bezugsdauer steigt mit der Beschäftigungsdauer.' }
        ]
      },
      {
        id: 'wirtschaft', name: 'Wirtschaft & Betrieb', icon: '📈', color: '#f093fb',
        cards: [
          {
            title: 'Wirtschaftskreislauf', icon: '🔄',
            body: 'Der <strong>einfache Wirtschaftskreislauf</strong> beschreibt den Güter- und Geldstrom zwischen Haushalten und Unternehmen:<br><br>• <strong>Haushalte → Unternehmen</strong>: Arbeit (Produktionsfaktor)<br>• <strong>Unternehmen → Haushalte</strong>: Lohn, Gehalt<br>• <strong>Unternehmen → Haushalte</strong>: Güter und Dienstleistungen<br>• <strong>Haushalte → Unternehmen</strong>: Konsum (Zahlungen)',
            keyPoints: ['Produktionsfaktoren: Arbeit, Kapital, Boden','BIP: Gesamtwert aller in Deutschland produzierten Güter/DL','Inflation: Anhaltender Preisanstieg, Kaufkraftverlust','Deflation: Anhaltender Preisrückgang, Investitionsstillstand','Konjunkturzyklus: Aufschwung → Boom → Abschwung → Rezession','EZB: Europäische Zentralbank, steuert Geldpolitik im Euroraum'],
            tip: 'Im erweiterten Wirtschaftskreislauf kommen Staat, Banken und Ausland hinzu. Die EZB kontrolliert die Geldmenge, nicht der Bundestag!'
          },
          {
            title: 'Rechtsformen von Unternehmen', icon: '🏢',
            body: '<strong>Einzelunternehmen</strong>: 1 Person, unbeschränkte Haftung.<br><strong>GbR</strong>: Gesellschaft bürgerlichen Rechts, mind. 2 Personen, unbeschränkte Haftung.<br><strong>OHG</strong>: Offene Handelsgesellschaft, Kaufleute, unbeschränkte Haftung.<br><strong>GmbH</strong>: Min. 25.000 € Stammkapital, Haftung nur mit Gesellschaftsvermögen.<br><strong>AG</strong>: Min. 50.000 € Grundkapital, Aktien handelbar.',
            keyPoints: ['GmbH: Haftung auf Gesellschaftsvermögen beschränkt','AG: Kapital durch Aktien aufgeteilt, börsennotierbar','Personengesellschaften (GbR, OHG): Gesellschafter haften persönlich','Kapitalgesellschaften (GmbH, AG): beschränkte Haftung','GmbH & Co. KG: Kombination für Steuervorteile','Stammkapital GmbH: min. 25.000 €, AG: min. 50.000 €'],
            tip: 'GmbH vs. AG: Beide haften beschränkt. GmbH min. 25.000 € Stammkapital, AG min. 50.000 € und kann an der Börse gehandelt werden.'
          }
        ],
        questions: [
          { q: 'Was ist das Bruttoinlandsprodukt (BIP)?', options: ['Summe aller Steuereinnahmen eines Landes','Gesamtwert aller in einem Land produzierten Güter und Dienstleistungen eines Jahres','Summe aller Exporte','Gesamtes Vermögen der Bevölkerung'], correct: 1, explanation: 'Das BIP misst den Gesamtwert aller in einem Land innerhalb eines Jahres produzierten Güter und Dienstleistungen – der wichtigste Wohlstandsindikator.' },
          { q: 'Was ist Inflation?', options: ['Sinkende Staatsschulden','Anhaltender Anstieg des allgemeinen Preisniveaus','Steigendes Wirtschaftswachstum','Rückgang der Arbeitslosigkeit'], correct: 1, explanation: 'Inflation bezeichnet einen anhaltenden Anstieg des allgemeinen Preisniveaus, was zu Kaufkraftverlust führt. Gemessen am Verbraucherpreisindex (VPI).' },
          { q: 'Welche Rechtsform hat ein Mindest-Stammkapital von 25.000 €?', options: ['AG','GbR','GmbH','OHG'], correct: 2, explanation: 'Die GmbH (Gesellschaft mit beschränkter Haftung) benötigt ein Mindeststammkapital von 25.000 €. Die AG benötigt 50.000 € Grundkapital.' },
          { q: 'Bei welcher Rechtsform haften die Gesellschafter persönlich und unbeschränkt?', options: ['GmbH','AG','GbR','GmbH & Co. KG'], correct: 2, explanation: 'Bei der GbR (Gesellschaft bürgerlichen Rechts) haften alle Gesellschafter persönlich, unbeschränkt und gesamtschuldnerisch.' },
          { q: 'Was ist die Aufgabe der Europäischen Zentralbank (EZB)?', options: ['EU-Haushaltsplanung','Steuererhebung in der EU','Steuerung der Geldpolitik im Euroraum (Leitzins, Geldmenge)','Kontrolle der nationalen Haushalte'], correct: 2, explanation: 'Die EZB ist für die Geldpolitik im Euroraum zuständig: Sie steuert den Leitzins und die Geldmenge mit dem Ziel, die Inflation stabil bei ca. 2% zu halten.' },
          { q: 'Was beschreibt eine Rezession?', options: ['Wirtschaftliches Wachstum über 2%','Zwei aufeinanderfolgende Quartale mit negativem BIP-Wachstum','Stark steigende Inflation','Rückgang der Exporte'], correct: 1, explanation: 'Eine Rezession liegt vor, wenn das BIP zwei Quartale hintereinander schrumpft. Sie gehört zur Phase "Abschwung" im Konjunkturzyklus.' },
          { q: 'Was ist ein Kartell?', options: ['Eine staatliche Behörde','Absprachen zwischen Unternehmen zur Beschränkung des Wettbewerbs','Ein Handelsabkommen zwischen Ländern','Eine Art Aktiengesellschaft'], correct: 1, explanation: 'Ein Kartell ist eine wettbewerbswidrige Absprache zwischen Unternehmen (z.B. Preisabsprachen). In Deutschland und der EU verboten; das Bundeskartellamt überwacht dies.' },
          { q: 'Was sind Produktionsfaktoren in der Volkswirtschaft?', options: ['Nur Arbeit und Kapital','Arbeit, Kapital und Boden','Nur natürliche Ressourcen','Arbeit, Technologie und Management'], correct: 1, explanation: 'Die klassischen Produktionsfaktoren sind Arbeit, Kapital und Boden. In modernen Theorien wird oft Wissen/Information als vierter Faktor ergänzt.' }
        ]
      },
      {
        id: 'ausbildung', name: 'Berufsausbildung', icon: '🎓', color: '#43e97b',
        cards: [
          {
            title: 'Das duale Ausbildungssystem', icon: '🏫',
            body: 'Das <strong>duale Ausbildungssystem</strong> kombiniert betriebliche Ausbildung und Berufsschule:<br><br>• <strong>Ausbildungsbetrieb</strong>: Praktische Ausbildung, Ausbildungsvertrag, Vergütung<br>• <strong>Berufsschule</strong>: Theoretische Grundlagen, allgemeine Bildung<br><br>Rechtliche Grundlage: <strong>BBiG</strong> (Berufsbildungsgesetz). Aufsicht durch <strong>IHK</strong> oder HWK.',
            keyPoints: ['Ausbildungsvertrag: Pflicht, schriftlich, bei IHK registrieren','Probezeit Ausbildung: 1-4 Monate (gesetzlich)','Ausbildungsvergütung: Angemessen, steigt jährlich','Mindestvergütung seit 2020 gesetzlich geregelt','Abschlussprüfung Teil 1 (AP1) und Teil 2 (AP2)','Zeugnis muss nach der Ausbildung ausgestellt werden'],
            tip: 'Die Probezeit in der Ausbildung beträgt 1-4 Monate (nicht 6 Monate wie beim Arbeitsverhältnis). Unterschied merken!'
          }
        ],
        questions: [
          { q: 'Was ist das BBiG?', options: ['Bundesbank-Gesetz','Berufsbildungsgesetz – Rechtsgrundlage der Ausbildung','Bundesbehörden-Informations-Gesetz','Betriebliches Bildungs-Informations-Gesetz'], correct: 1, explanation: 'Das BBiG (Berufsbildungsgesetz) ist die gesetzliche Grundlage für die Berufsausbildung in Deutschland und regelt u.a. Ausbildungsvertrag, Probezeit und Prüfungen.' },
          { q: 'Wie lange dauert die Probezeit in einer Ausbildung gesetzlich?', options: ['1-4 Monate','3-6 Monate','6-12 Monate','1-2 Monate'], correct: 0, explanation: 'Die Probezeit in der Ausbildung beträgt nach BBiG mindestens 1 Monat und höchstens 4 Monate. Achtung: Im Arbeitsrecht sind es bis zu 6 Monate!' },
          { q: 'Welche Institution ist für die Überwachung der IHK-Ausbildungsberufe zuständig?', options: ['Agentur für Arbeit','Bundesagentur für Bildung','IHK (Industrie- und Handelskammer)','Berufsschule'], correct: 2, explanation: 'Die IHK (Industrie- und Handelskammer) ist für die Überwachung, Registrierung von Ausbildungsverträgen und Durchführung von Abschlussprüfungen in kaufmännischen und technischen Berufen zuständig.' },
          { q: 'Was regelt das duale Ausbildungssystem?', options: ['Nur die schulische Ausbildung','Kombination aus betrieblicher Ausbildung und Berufsschule','Nur die betriebliche Ausbildung','Universitätsstudium und Praktikum'], correct: 1, explanation: 'Das duale System kombiniert die praktische Ausbildung im Betrieb mit dem Unterricht in der Berufsschule – daher "dual" (zwei Lernorte).' },
          { q: 'Wer muss die Ausbildungsvergütung zahlen?', options: ['Die IHK','Die Berufsschule','Der Ausbildungsbetrieb','Die Agentur für Arbeit'], correct: 2, explanation: 'Der Ausbildungsbetrieb ist verpflichtet, dem Auszubildenden eine angemessene Ausbildungsvergütung zu zahlen. Seit 2020 gibt es eine gesetzliche Mindestvergütung.' },
          { q: 'Was passiert, wenn der Ausbildungsbetrieb insolvent wird?', options: ['Die Ausbildung endet sofort','Berufsschule übernimmt die Ausbildung','Man kann in einen anderen Betrieb vermittelt werden oder kündigen','IHK zahlt Vergütung weiter'], correct: 2, explanation: 'Bei Insolvenz des Ausbildungsbetriebs endet das Ausbildungsverhältnis nicht automatisch. Die IHK hilft bei der Vermittlung in einen anderen Betrieb.' },
          { q: 'Welches Recht hat ein Auszubildender bezüglich der Ausbildungsnachweise (Berichtsheft)?', options: ['Er muss sie täglich einreichen','Er muss sie führen und dem Ausbilder vorlegen','Er darf sie ablehnen','Er muss sie digital führen'], correct: 1, explanation: 'Auszubildende sind verpflichtet, Ausbildungsnachweise (Berichtsheft) zu führen und dem Ausbilder regelmäßig zur Kontrolle vorzulegen.' },
          { q: 'Was ist eine überbetriebliche Ausbildung?', options: ['Ausbildung im Ausland','Ergänzende Ausbildung in überbetrieblichen Bildungsstätten (z.B. für kleine Betriebe)','Ausbildung ohne Berufsschule','Fernstudium'], correct: 1, explanation: 'Überbetriebliche Ausbildung ergänzt die betriebliche Ausbildung in spezialisierten Bildungsstätten. Besonders für kleine Betriebe, die nicht alle Inhalte vermitteln können.' }
        ]
      }
    ]
  }
};
