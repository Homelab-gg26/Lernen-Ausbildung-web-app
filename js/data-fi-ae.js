/* ── Fachinformatiker Anwendungsentwicklung ──────────────────────
   AP1 = gemeinsam mit FI-SI (Kernqualifikationen, gleiche Basis)
   AP2 = FI-AE spezifisch (OOP, Datenbanken, Softwareentwicklung)
   ──────────────────────────────────────────────────────────────── */

const DATA_FI_AE = {
  id: 'fi-ae',
  name: 'FI Anwendungsentwicklung',
  shortName: 'FI-AE',
  icon: '💻',
  color: '#f093fb',
  color2: '#f5576c',

  exams: {
    ap1: {
      id: 'ap1',
      name: 'AP1',
      fullName: 'Abschlussprüfung Teil 1',
      desc: 'Netzwerke, Hardware, Programmierung, Datenbanken & IT-Sicherheit',
      icon: '💻',
      topics: [
        {
          id: 'programmierung-ae', name: 'Programmierung & OOP', icon: '🧩', color: '#f093fb',
          cards: [
            {
              title: 'OOP – Objektorientierung', icon: '🧩',
              body: 'Die <strong>objektorientierte Programmierung (OOP)</strong> basiert auf 4 Grundprinzipien:<br><br><strong>Kapselung</strong>: Daten und Methoden in Klassen zusammengefasst.<br><strong>Vererbung</strong>: Klassen übernehmen Eigenschaften anderer Klassen.<br><strong>Polymorphismus</strong>: Gleicher Methodenname, unterschiedliches Verhalten.<br><strong>Abstraktion</strong>: Vereinfachung auf das Wesentliche.',
              keyPoints: ['Klasse = Bauplan, Objekt = Instanz','private: nur innerhalb der Klasse','public: von überall zugänglich','protected: in Klasse und Unterklassen','super(): Konstruktor der Elternklasse','Interface vs. abstrakte Klasse'],
              tip: 'Die 4 OOP-Prinzipien: KAP-VER-POL-ABS (Kapselung, Vererbung, Polymorphismus, Abstraktion).'
            },
            {
              title: 'Datenstrukturen & Algorithmen', icon: '📊',
              body: '<strong>Array</strong>: Feste Größe, wahlfreier Zugriff O(1).<br><strong>Stack</strong>: LIFO (Last In, First Out).<br><strong>Queue</strong>: FIFO (First In, First Out).<br><strong>Linked List</strong>: Dynamisch, Einfügen O(1), Suchen O(n).<br><br><strong>Big-O-Notation</strong>: O(1) = konstant, O(n) = linear, O(n²) = quadratisch.',
              keyPoints: ['Binäre Suche: O(log n) – nur bei sortierten Arrays','Bubblesort: O(n²)','Quicksort: O(n log n) durchschnittlich','Stack: push() und pop()','Queue: enqueue() und dequeue()','HashMap: O(1) durchschnittlicher Zugriff'],
              tip: 'Binäre Suche funktioniert nur auf sortierten Listen und hat O(log n).'
            },
            {
              title: 'Pseudocode & Struktogramme', icon: '📝',
              body: '<strong>Pseudocode</strong> beschreibt Algorithmen in verständlicher, sprachunabhängiger Form.<br><br><strong>Struktogramm (Nassi-Shneiderman)</strong>: Grafische Darstellung von Algorithmen mit Blöcken für Sequenz, Entscheidung und Schleife.<br><br>Wichtige Kontrollstrukturen: IF-THEN-ELSE, FOR, WHILE, DO-WHILE.',
              keyPoints: ['Sequenz: Befehle nacheinander','Selektion: IF-THEN-ELSE (Entscheidung)','Iteration: FOR, WHILE, DO-WHILE (Schleife)','Struktogramm: visuelle Darstellung, kein GOTO möglich','Ablaufdiagramm (Flowchart): Alternative mit Pfeilen'],
              tip: 'In Prüfungen oft: Pseudocode oder Struktogramm lesen und Ergebnis ermitteln. Schrittweise durchlaufen!'
            }
          ],
          questions: [
            { q: 'Was beschreibt das OOP-Prinzip der Kapselung?', options: ['Eine Klasse erbt von einer anderen','Daten und Methoden in einer Klasse zusammengefasst','Methode verhält sich je nach Objekt unterschiedlich','Komplexität wird versteckt'], correct: 1, explanation: 'Kapselung fasst Daten und Methoden in einer Klasse zusammen und kontrolliert den Zugriff.' },
            { q: 'Welcher Zugriffsmodifikator erlaubt Zugriff nur innerhalb der eigenen Klasse?', options: ['public','protected','private','internal'], correct: 2, explanation: 'private erlaubt Zugriff nur innerhalb der eigenen Klasse.' },
            { q: 'Was ist die Zeitkomplexität einer binären Suche?', options: ['O(1)','O(n)','O(log n)','O(n²)'], correct: 2, explanation: 'Binäre Suche halbiert bei jedem Schritt den Suchbereich: O(log n).' },
            { q: 'Welche Datenstruktur arbeitet nach dem LIFO-Prinzip?', options: ['Queue','Array','Stack','Linked List'], correct: 2, explanation: 'Stack = LIFO (Last In, First Out).' },
            { q: 'Was ist der Unterschied zwischen Klasse und Objekt?', options: ['Kein Unterschied','Klasse ist Bauplan, Objekt ist Instanz','Objekt ist Bauplan, Klasse ist Instanz','Klassen haben keine Methoden'], correct: 1, explanation: 'Klasse = Bauplan/Template. Objekt = konkrete Instanz.' },
            { q: 'Welcher Sortieralgorithmus hat die beste durchschnittliche Komplexität?', options: ['Bubblesort O(n²)','Insertionsort O(n²)','Quicksort O(n log n)','Selectionsort O(n²)'], correct: 2, explanation: 'Quicksort hat O(n log n) im Durchschnitt.' },
            { q: 'Was ist Polymorphismus in der OOP?', options: ['Vererbung von Methoden','Klasse erbt von mehreren','Gleicher Methodenname, unterschiedliches Verhalten','Datenkapselung'], correct: 2, explanation: 'Polymorphismus: Methoden mit gleichem Namen, je nach Klasse unterschiedlich ausgeführt.' },
            { q: 'Welche Aussage zu einer Queue ist richtig?', options: ['LIFO','FIFO – erstes Element zuerst raus','Wahlfreier Zugriff','Nur ein Element speicherbar'], correct: 1, explanation: 'Queue = FIFO (First In, First Out).' }
          ]
        },
        {
          id: 'datenbanken-ae', name: 'Datenbanken & SQL', icon: '🗃️', color: '#a18cd1',
          cards: [
            {
              title: 'SQL Grundlagen', icon: '📋',
              body: '<strong>SQL</strong> ist die Standardsprache für relationale Datenbanken.<br><br><code>SELECT</code> – Abfragen<br><code>INSERT INTO</code> – Einfügen<br><code>UPDATE</code> – Ändern<br><code>DELETE</code> – Löschen<br><code>JOIN</code> – Tabellen verknüpfen',
              keyPoints: ['PRIMARY KEY: Eindeutig, nicht NULL','FOREIGN KEY: Verweist auf anderen PRIMARY KEY','INDEX: Beschleunigt Abfragen','GROUP BY: Zeilen gruppieren','HAVING: Gruppen filtern (nach GROUP BY)'],
              tip: 'INNER JOIN: nur Matches. LEFT JOIN: immer alle der linken Tabelle.'
            },
            {
              title: 'Normalformen', icon: '📐',
              body: '<strong>1. NF</strong>: Alle Attribute atomar.<br><strong>2. NF</strong>: In 1NF + volle Abhängigkeit vom gesamten Schlüssel.<br><strong>3. NF</strong>: In 2NF + keine transitiven Abhängigkeiten.',
              keyPoints: ['1NF: Keine mehrwertigen Attribute','2NF: Gilt bei zusammengesetzten Primärschlüsseln','3NF: Keine Abhängigkeit zwischen Nicht-Schlüssel-Attributen'],
              tip: '1NF = atomar, 2NF = voll abhängig, 3NF = kein transitives Chaos.'
            },
            {
              title: 'ER-Modell & Beziehungen', icon: '🔗',
              body: 'Das <strong>Entity-Relationship-Modell (ERM)</strong> modelliert Daten und ihre Beziehungen.<br><br><strong>Kardinalitäten</strong>:<br>• 1:1 – Ein Mitarbeiter hat einen Arbeitsplatz<br>• 1:n – Ein Kunde hat mehrere Bestellungen<br>• m:n – Schüler belegen mehrere Kurse',
              keyPoints: ['Entität: Objekt der realen Welt (z.B. Kunde)','Attribut: Eigenschaft einer Entität (z.B. Name)','Primärschlüssel: Eindeutiger Identifikator','1:n ist häufigste Beziehung','m:n wird durch Zwischentabelle aufgelöst'],
              tip: 'm:n Beziehungen werden in SQL durch eine Zwischentabelle mit 2 Fremdschlüsseln gelöst.'
            }
          ],
          questions: [
            { q: 'Was gibt ein INNER JOIN zurück?', options: ['Alle Zeilen links','Alle Zeilen beider Tabellen','Nur übereinstimmende Zeilen beider Tabellen','Alle Zeilen rechts'], correct: 2, explanation: 'INNER JOIN gibt nur Datensätze zurück, die in beiden Tabellen einen Match haben.' },
            { q: 'Was beschreibt die erste Normalform (1NF)?', options: ['Keine transitiven Abhängigkeiten','Volle funktionale Abhängigkeit','Alle Attribute sind atomar','Kein Fremdschlüssel'], correct: 2, explanation: '1NF: Alle Attributwerte müssen atomar (unteilbar) sein.' },
            { q: 'Was ist der Unterschied zwischen Primary Key und Foreign Key?', options: ['Kein Unterschied','Primary Key eindeutig in eigener Tabelle; Foreign Key verweist auf anderen','Foreign Key immer eindeutig','Primary Key kann NULL sein'], correct: 1, explanation: 'PRIMARY KEY: eindeutiger Identifikator. FOREIGN KEY: Referenz auf anderen PRIMARY KEY.' },
            { q: 'Was macht GROUP BY?', options: ['Sortiert Ergebnisse','Gruppiert Zeilen für Aggregatfunktionen','Filtert Duplikate','Verbindet Tabellen'], correct: 1, explanation: 'GROUP BY fasst Zeilen zusammen für Aggregatfunktionen (COUNT, SUM, AVG).' },
            { q: 'Was ist eine m:n Beziehung im ER-Modell?', options: ['Ein Objekt zu einem anderen','Ein Objekt zu vielen','Viele Objekte zu vielen anderen','Kein Bezug'], correct: 2, explanation: 'Bei m:n können viele Entitäten mit vielen anderen verbunden sein (z.B. Schüler und Kurse).' },
            { q: 'Wie wird eine m:n Beziehung in SQL umgesetzt?', options: ['Direkt als Fremdschlüssel','Durch eine Zwischentabelle mit 2 Fremdschlüsseln','Durch eine VIEW','Durch einen INDEX'], correct: 1, explanation: 'm:n wird durch eine Zwischentabelle mit jeweils einem Fremdschlüssel auf beide Tabellen aufgelöst.' },
            { q: 'Was ist ACID bei Datenbanken?', options: ['Atomicity, Consistency, Isolation, Durability','A Consistent Integrated Database','Automatische Daten-Indexierung','Asynchrone Container-Integration'], correct: 0, explanation: 'ACID: Atomicity (alles oder nichts), Consistency, Isolation, Durability (Persistenz).' },
            { q: 'Was bewirkt HAVING in SQL?', options: ['Filtert Zeilen vor GROUP BY','Filtert Gruppen nach GROUP BY','Sortiert Ergebnisse','Verbindet Tabellen'], correct: 1, explanation: 'HAVING filtert Gruppen nach GROUP BY (wie WHERE, aber für Aggregate).' }
          ]
        },
        {
          id: 'netzwerk-ae', name: 'Netzwerktechnik', icon: '🌐', color: '#4facfe',
          cards: [
            {
              title: 'OSI-Modell', icon: '📶',
              body: 'Das <strong>OSI-Modell</strong> teilt Netzwerkkommunikation in <strong>7 Schichten</strong> auf.<br><br>Merkhilfe: <strong>„Alle Priester Saufen Tequila Nach Der Predigt"</strong>',
              keyPoints: ['Schicht 7: Anwendung (HTTP, FTP, DNS)','Schicht 4: Transport (TCP, UDP)','Schicht 3: Vermittlung (IP, Router)','Schicht 2: Sicherung (Ethernet, Switch)','Schicht 1: Bitübertragung (Kabel, Hub)'],
              tip: 'TCP/UDP = Schicht 4, IP = Schicht 3, Ethernet = Schicht 2.'
            },
            {
              title: 'TCP/IP & Protokolle', icon: '🔄',
              body: '<strong>TCP</strong>: verbindungsorientiert, zuverlässig (HTTP, FTP, SSH).<br><strong>UDP</strong>: verbindungslos, schnell (DNS, VoIP, Streaming).<br><br>Wichtige Ports: HTTP 80, HTTPS 443, SSH 22, FTP 21, DNS 53, SMTP 25.',
              keyPoints: ['HTTP: Port 80, HTTPS: Port 443','SSH: Port 22, FTP: Port 21','DNS: Port 53 (UDP)','SMTP: Port 25, IMAP: Port 143','RDP: Port 3389'],
              tip: 'Ports auswendig lernen: 80/443 (Web), 22 (SSH), 21 (FTP), 53 (DNS), 25 (SMTP).'
            }
          ],
          questions: [
            { q: 'Auf welcher OSI-Schicht arbeitet ein Switch?', options: ['Schicht 1','Schicht 2','Schicht 3','Schicht 4'], correct: 1, explanation: 'Switch = Schicht 2 (MAC-Adressen).' },
            { q: 'Welches Protokoll nutzt TCP?', options: ['DNS','DHCP','HTTP','VoIP'], correct: 2, explanation: 'HTTP nutzt TCP (Port 80).' },
            { q: 'Welchen Port nutzt HTTPS?', options: ['80','443','22','21'], correct: 1, explanation: 'HTTPS läuft über Port 443.' },
            { q: 'Welches Protokoll löst Domainnamen auf?', options: ['DHCP','ARP','DNS','SNMP'], correct: 2, explanation: 'DNS übersetzt Hostnamen in IP-Adressen (UDP Port 53).' },
            { q: 'Was ist der 3-Wege-Handshake bei TCP?', options: ['Datenkomprimierung','Verbindungsaufbau SYN→SYN-ACK→ACK','Verschlüsselung','Fehlererkennung'], correct: 1, explanation: 'TCP-Handshake baut Verbindung auf: SYN, SYN-ACK, ACK.' },
            { q: 'Welchen Port nutzt SSH?', options: ['21','22','23','25'], correct: 1, explanation: 'SSH läuft über Port 22.' },
            { q: 'Was ist eine MAC-Adresse?', options: ['IPv6-Adresse','Logische Netzwerkadresse','Physische Hardware-Adresse','Subnetzmaske'], correct: 2, explanation: 'MAC-Adresse = 48-Bit Hardware-Adresse auf Schicht 2.' },
            { q: 'Was macht DHCP?', options: ['Löst Domains auf','Vergibt IP-Adressen automatisch','Verschlüsselt Verbindungen','Filtert Pakete'], correct: 1, explanation: 'DHCP vergibt automatisch IP-Adressen, Subnetzmaske, Gateway und DNS an Clients.' }
          ]
        },
        {
          id: 'sicherheit-ae', name: 'IT-Sicherheit', icon: '🔒', color: '#f6d365',
          cards: [
            {
              title: 'Verschlüsselung & Signaturen', icon: '🔐',
              body: '<strong>Symmetrisch</strong>: Ein Schlüssel (AES). Schnell.<br><strong>Asymmetrisch</strong>: Public/Private Key (RSA). Sicher für Austausch.<br><strong>Hash</strong>: Einwegfunktion (SHA-256). Kein Entschlüsseln.<br><br><strong>Digitale Signatur</strong>: Hash mit Private Key verschlüsselt.',
              keyPoints: ['AES: symmetrisch, schnell','RSA: asymmetrisch, Schlüsselaustausch','SHA-256: Hashfunktion','TLS: Hybridverfahren','Zertifikate: PKI-Infrastruktur'],
              tip: 'HTTPS = TLS: asymmetrisch für Handshake, symmetrisch für Daten.'
            },
            {
              title: 'Web-Sicherheit & OWASP', icon: '🛡️',
              body: '<strong>OWASP Top 10</strong> – häufigste Web-Schwachstellen:<br>• SQL Injection<br>• Cross-Site Scripting (XSS)<br>• Broken Authentication<br>• Sensitive Data Exposure<br>• Security Misconfiguration',
              keyPoints: ['SQL-Injection: Prepared Statements als Schutz','XSS: Input validieren, Output escapen','CSRF: CSRF-Token einsetzen','HTTPS: Pflicht für alle Formulare','Content Security Policy (CSP)'],
              tip: 'OWASP Top 10 ist prüfungsrelevant für FI-AE. SQL-Injection und XSS sind am häufigsten.'
            }
          ],
          questions: [
            { q: 'Was ist der Hauptunterschied sym./asym. Verschlüsselung?', options: ['Symmetrisch sicherer','Symmetrisch ein Schlüssel, asymmetrisch Schlüsselpaar','Asymmetrisch schneller','Symmetrisch nur für Dateien'], correct: 1, explanation: 'Symmetrisch = ein geteilter Schlüssel. Asymmetrisch = Public + Private Key.' },
            { q: 'Was schützt am besten vor SQL-Injection?', options: ['Firewall','Prepared Statements','Starke Passwörter','Verschlüsselung'], correct: 1, explanation: 'Prepared Statements trennen SQL-Code von Daten.' },
            { q: 'Was ist XSS (Cross-Site Scripting)?', options: ['SQL-Code in Formulare','Schadcode in Webseiten einschleusen, der beim Nutzer ausgeführt wird','Angriff auf Passwörter','Überlastung des Servers'], correct: 1, explanation: 'XSS: Schadcode wird in die Webseite injiziert und im Browser anderer Nutzer ausgeführt.' },
            { q: 'Was ist TLS?', options: ['Nur für E-Mails','Verschlüsselungsprotokoll für Web (HTTPS)','Firewall-Protokoll','Datenbank-Protokoll'], correct: 1, explanation: 'TLS (Transport Layer Security) sichert HTTPS-Verbindungen.' },
            { q: 'Was ist eine Hash-Funktion?', options: ['Verschlüsselung mit Schlüssel','Einwegfunktion, nicht umkehrbar','Symmetrische Verschlüsselung','Komprimierungsalgorithmus'], correct: 1, explanation: 'Hashfunktion ist eine Einwegfunktion: aus Eingabe → fester Hashwert, nicht rückgängig zu machen.' },
            { q: 'Was ist CSRF?', options: ['SQL-Angriff','Cross-Site Request Forgery: ungewollte Aktionen im Namen des Nutzers','XSS-Variante','DDoS-Angriff'], correct: 1, explanation: 'CSRF täuscht den Browser, im Namen des angemeldeten Nutzers Anfragen zu senden.' },
            { q: 'Was bedeutet HTTPS gegenüber HTTP?', options: ['Schneller','Verschlüsselte Übertragung per TLS','Ohne Zertifikat','Port 80 statt 443'], correct: 1, explanation: 'HTTPS = HTTP + TLS-Verschlüsselung. Daten werden verschlüsselt übertragen.' },
            { q: 'Was ist eine digitale Signatur?', options: ['Verschlüsselte E-Mail','Hashwert mit Private Key verschlüsselt','Public-Key-Verschlüsselung','CA-Zertifikat'], correct: 1, explanation: 'Digitale Signatur = Hash mit Private Key verschlüsselt. Empfänger prüft mit Public Key.' }
          ]
        }
      ]
    },

    ap2: {
      id: 'ap2',
      name: 'AP2',
      fullName: 'Abschlussprüfung Teil 2 – Anwendungsentwicklung',
      desc: 'Softwareentwicklung, Testing, UML, Datenbankdesign & Projektmanagement',
      icon: '💻',
      topics: [
        {
          id: 'softwareentwicklung', name: 'Softwareentwicklung', icon: '⚙️', color: '#f093fb',
          cards: [
            {
              title: 'Softwarelebenszyklus & Vorgehensmodelle', icon: '🔄',
              body: '<strong>Wasserfallmodell</strong>: Sequenziell. Anforderung → Design → Implementierung → Test → Wartung.<br><br><strong>Scrum</strong>: Iterativ, Sprints 1-4 Wochen. Product Owner, Scrum Master, Dev Team.<br><br><strong>Extreme Programming (XP)</strong>: Pair Programming, Test-Driven Development (TDD).',
              keyPoints: ['Wasserfall: Phasen strikt nacheinander','Scrum: Sprint Planning, Daily, Review, Retrospective','TDD: Test erst schreiben, dann Code','Continuous Integration (CI): Automatischer Build nach jedem Commit','DevOps: Kombination Entwicklung & Betrieb'],
              tip: 'TDD-Zyklus: Red (Test schlägt fehl) → Green (Code implementieren) → Refactor.'
            },
            {
              title: 'Versionsverwaltung mit Git', icon: '🌿',
              body: '<strong>Git</strong> ist das Standard-Versionsverwaltungssystem.<br><br>Wichtige Befehle:<br><code>git init</code> – Repository anlegen<br><code>git clone</code> – Repository kopieren<br><code>git commit</code> – Änderungen speichern<br><code>git push/pull</code> – Remote synchronisieren<br><code>git merge/rebase</code> – Branches zusammenführen',
              keyPoints: ['Branch: Parallele Entwicklungslinie','Merge: Branches zusammenführen','Rebase: Commits neu aufbauen','Pull Request/Merge Request: Code-Review vor Merge','GitFlow: main, develop, feature, hotfix Branches'],
              tip: 'git commit -m "message" sichert lokale Änderungen. git push überträgt auf den Server.'
            },
            {
              title: 'Testing & Qualitätssicherung', icon: '🧪',
              body: '<strong>Unit Test</strong>: Testet einzelne Funktionen/Klassen.<br><strong>Integrationstest</strong>: Testet Zusammenspiel mehrerer Komponenten.<br><strong>Systemtest</strong>: Testet das komplette System.<br><strong>Akzeptanztest</strong>: Testet aus Nutzerperspektive (UAT).',
              keyPoints: ['Testpyramide: viele Unit Tests, wenig Systemtests','Code Coverage: Prozentsatz getesteten Codes','Black-Box-Test: ohne Kenntnis des Codes','White-Box-Test: mit Kenntnis der Implementierung','Regression: Sicherstellen, dass alte Tests noch passen'],
              tip: 'Testpyramide: Unten viele schnelle Unit Tests, oben wenige langsame Systemtests (Pyramidenform).'
            }
          ],
          questions: [
            { q: 'Was ist Test-Driven Development (TDD)?', options: ['Testen nach dem Deployment','Test wird geschrieben bevor der Code implementiert wird','Testen durch externe Teams','Automatisches Testen nach jedem Commit'], correct: 1, explanation: 'TDD: Erst Test schreiben (schlägt fehl), dann Code implementieren (Test besteht), dann refaktorieren.' },
            { q: 'Was macht "git push"?', options: ['Lokale Änderungen speichern','Lokale Commits auf Remote-Repository übertragen','Repository klonen','Branches zusammenführen'], correct: 1, explanation: 'git push überträgt lokale Commits auf das Remote-Repository.' },
            { q: 'Was ist ein Unit Test?', options: ['Test des gesamten Systems','Test einzelner Funktionen oder Klassen','Test aus Nutzerperspektive','Test des Zusammenspiels mehrerer Komponenten'], correct: 1, explanation: 'Unit Tests testen einzelne Einheiten (Funktionen, Methoden) isoliert.' },
            { q: 'Was ist Continuous Integration?', options: ['Manuelle Code-Überprüfung','Automatischer Build und Test nach jedem Commit','Wöchentliche Releases','Testen im Produktionssystem'], correct: 1, explanation: 'CI automatisiert Build, Test und Integration nach jedem Code-Commit.' },
            { q: 'Was ist ein Branch in Git?', options: ['Gespeicherter Commit','Parallele Entwicklungslinie','Remote-Repository','Merge-Konflikt'], correct: 1, explanation: 'Ein Branch ist eine parallele Entwicklungslinie, die unabhängig vom Hauptzweig entwickelt werden kann.' },
            { q: 'Was ist der Unterschied zwischen Black-Box und White-Box-Test?', options: ['Kein Unterschied','Black-Box: ohne Codekenntnis, White-Box: mit Codekenntnis','White-Box: schneller','Black-Box: nur für UI'], correct: 1, explanation: 'Black-Box testet ohne Kenntnis der Implementierung. White-Box testet mit Kenntnis des Codes.' },
            { q: 'Was ist ein Pull Request?', options: ['Daten vom Server laden','Code-Review-Anfrage vor dem Merge in den Hauptbranch','Neues Repository anlegen','Konflikte auflösen'], correct: 1, explanation: 'Pull Request = Anfrage, einen Branch zu mergen. Ermöglicht Code-Review vor der Integration.' },
            { q: 'Was beschreibt GitFlow?', options: ['Ein Git-GUI-Tool','Branching-Strategie mit main, develop, feature, hotfix Branches','Ein Testing-Framework','CI/CD-Pipeline'], correct: 1, explanation: 'GitFlow ist eine Branching-Strategie: main (stabil), develop (Integration), feature (neue Features), hotfix (Bugfixes).' }
          ]
        },
        {
          id: 'uml', name: 'UML & Modellierung', icon: '📐', color: '#667eea',
          cards: [
            {
              title: 'UML-Diagramme', icon: '📊',
              body: '<strong>UML</strong> (Unified Modeling Language) – Standardsprache für Software-Modellierung.<br><br>Wichtige Diagramme:<br>• <strong>Klassendiagramm</strong>: Klassen, Attribute, Methoden, Beziehungen<br>• <strong>Use-Case-Diagramm</strong>: Akteure und ihre Aktionen<br>• <strong>Sequenzdiagramm</strong>: Zeitlicher Ablauf von Nachrichten<br>• <strong>Aktivitätsdiagramm</strong>: Ablauf (wie Flowchart)',
              keyPoints: ['Klassendiagramm: Struktur des Systems','Use-Case: Anforderungen aus Nutzersicht','Sequenzdiagramm: Kommunikation zwischen Objekten','Zustandsdiagramm: Mögliche Zustände eines Objekts','Komponentendiagramm: Systemarchitektur'],
              tip: 'Klassendiagramm: Oben Name, Mitte Attribute, Unten Methoden. Vererbung = offener Pfeil, Komposition = gefüllte Raute.'
            },
            {
              title: 'Entwurfsmuster (Design Patterns)', icon: '🏗️',
              body: '<strong>Singleton</strong>: Nur eine Instanz einer Klasse.<br><strong>Factory</strong>: Objekte erstellen ohne konkrete Klasse zu kennen.<br><strong>Observer</strong>: Objekte werden bei Änderungen benachrichtigt.<br><strong>MVC</strong>: Model-View-Controller Trennung.',
              keyPoints: ['Singleton: eine Instanz, global zugänglich','Factory Method: Objekte flexibel erstellen','Observer: Event-basierte Benachrichtigung','MVC: Model (Daten), View (UI), Controller (Logik)','Repository Pattern: Datenbankzugriff abstrahieren'],
              tip: 'MVC ist das häufigste Pattern in Web-Frameworks (Laravel, Django, ASP.NET).'
            }
          ],
          questions: [
            { q: 'Was zeigt ein Use-Case-Diagramm?', options: ['Datenbankstruktur','Klassen und ihre Beziehungen','Akteure und ihre Aktionen mit dem System','Zeitlichen Ablauf von Nachrichten'], correct: 2, explanation: 'Use-Case-Diagramm zeigt, welche Akteure welche Aktionen mit dem System durchführen können.' },
            { q: 'Was ist das Singleton-Pattern?', options: ['Klasse, die nichts erbt','Muster für exakt eine Instanz einer Klasse','Factory für viele Objekte','Observer-Muster'], correct: 1, explanation: 'Singleton stellt sicher, dass von einer Klasse nur eine einzige Instanz existiert.' },
            { q: 'Was trennt MVC?', options: ['Frontend und Backend','Model (Daten), View (UI), Controller (Logik)','Datenbank und Anwendung','Client und Server'], correct: 1, explanation: 'MVC: Model = Daten/Logik, View = Darstellung, Controller = Vermittler.' },
            { q: 'Was zeigt ein Sequenzdiagramm?', options: ['Klassenstruktur','Datenbankschema','Zeitlichen Ablauf von Nachrichten zwischen Objekten','Akteure im System'], correct: 2, explanation: 'Sequenzdiagramm zeigt, wie Objekte zeitlich miteinander kommunizieren.' },
            { q: 'Was ist das Observer-Pattern?', options: ['Nur eine Instanz','Objekte werden bei Änderungen benachrichtigt','Objekte erstellen','Datenbankzugriff'], correct: 1, explanation: 'Observer: Wenn ein Objekt sich ändert, werden alle abhängigen Objekte automatisch benachrichtigt.' },
            { q: 'Was zeigt ein Klassendiagramm?', options: ['Akteure','Zeitlichen Ablauf','Klassen, Attribute, Methoden und Beziehungen','Systemzustände'], correct: 2, explanation: 'Klassendiagramm zeigt Struktur: Klassen mit Attributen und Methoden sowie ihre Beziehungen.' },
            { q: 'Was bedeutet Vererbung im UML-Klassendiagramm?', options: ['Gefüllte Raute','Offener Pfeil vom Kind zur Elternklasse','Gestrichelte Linie','Kreuz am Ende'], correct: 1, explanation: 'Vererbung im UML = offener (hohler) Pfeil zeigt von der Unterklasse zur Oberklasse.' },
            { q: 'Was ist das Factory Pattern?', options: ['Singleton-Variante','Objekte erstellen ohne konkrete Klasse zu kennen','Datenbankzugriff','Observer-Benachrichtigung'], correct: 1, explanation: 'Factory Method: Objekte werden über eine Factory-Methode erstellt, ohne die konkrete Klasse direkt zu instanziieren.' }
          ]
        },
        {
          id: 'datenbankdesign', name: 'Datenbankdesign & ORM', icon: '🗃️', color: '#43e97b',
          cards: [
            {
              title: 'Datenbankdesign', icon: '📐',
              body: 'Gutes Datenbankdesign vermeidet Redundanzen durch <strong>Normalisierung</strong>.<br><br>Schritte: Anforderungsanalyse → ER-Modell → Relationenmodell → Implementierung (SQL).<br><br><strong>Indizes</strong> beschleunigen Abfragen erheblich.',
              keyPoints: ['ER-Modell: konzeptionell','Relationenmodell: logisch (Tabellen)','Normalisierung: 1NF, 2NF, 3NF','Index auf häufig gesuchte Spalten','Composite Key: mehrere Spalten als Schlüssel'],
              tip: 'Indizes beschleunigen SELECT, verlangsamen aber INSERT/UPDATE/DELETE.'
            },
            {
              title: 'ORM & Datenbankzugriff', icon: '🔗',
              body: '<strong>ORM</strong> (Object-Relational Mapper) abstrahiert Datenbankzugriffe in Objekte.<br><br>Beispiele: Hibernate (Java), Entity Framework (.NET), SQLAlchemy (Python).<br><br><strong>N+1 Problem</strong>: Schleife, die für jeden Datensatz eine separate Anfrage auslöst. Lösung: Eager Loading.',
              keyPoints: ['ORM bildet Tabellen auf Klassen ab','Lazy Loading: Daten erst bei Bedarf laden','Eager Loading: Verwandte Daten direkt laden (JOIN)','Migration: Datenbankschema versionieren','Repository Pattern: Abstraktionsschicht für DB-Zugriff'],
              tip: 'N+1-Problem erkennen: Schleife mit DB-Abfrage → immer Eager Loading verwenden!'
            }
          ],
          questions: [
            { q: 'Was ist ein ORM?', options: ['Datenbankverwaltungssystem','Abstraktionsschicht, die Tabellen auf Objekte mappt','SQL-Optimierer','Backup-Werkzeug'], correct: 1, explanation: 'ORM (Object-Relational Mapper) bildet Datenbankzeilen auf Objekte ab, ohne direktes SQL zu schreiben.' },
            { q: 'Was ist das N+1-Problem?', options: ['Zu viele Normalisierungsschritte','Pro Datensatz wird eine extra Datenbankabfrage ausgelöst','Verbindungsfehler','Zu viele Indizes'], correct: 1, explanation: 'N+1: Für eine Liste von N Objekten wird 1 + N Abfragen ausgeführt. Lösung: Eager Loading.' },
            { q: 'Was macht ein Index in einer Datenbank?', options: ['Verschlüsselt Daten','Beschleunigt SELECT-Abfragen auf Kosten von INSERT-Geschwindigkeit','Erstellt Backups','Normalisiert die Tabelle'], correct: 1, explanation: 'Index beschleunigt Abfragen, braucht aber Speicher und verlangsamt Schreiboperationen.' },
            { q: 'Was ist Lazy Loading?', options: ['Langsame Abfragen','Verwandte Daten direkt beim ersten Load laden','Daten werden erst bei tatsächlichem Zugriff geladen','Caching-Strategie'], correct: 2, explanation: 'Lazy Loading: Verwandte Daten werden erst geladen, wenn tatsächlich darauf zugegriffen wird.' },
            { q: 'Was sind Datenbankmigrationen?', options: ['Datentransfer zwischen Servern','Versionierung und Verwaltung von Schemaänderungen','Backup-Prozess','Performance-Optimierung'], correct: 1, explanation: 'Migrationen versionieren Datenbankschemaänderungen, sodass sie reproduzierbar und rückgängig gemacht werden können.' },
            { q: 'Was ist ein Composite Key?', options: ['Verschlüsselter Primärschlüssel','Primärschlüssel aus mehreren Spalten zusammengesetzt','Fremdschlüssel','Index auf mehrere Spalten'], correct: 1, explanation: 'Composite Key: Primärschlüssel wird aus mehreren Spalten zusammengesetzt (z.B. MatrNr + KursID).' },
            { q: 'Was ist der Unterschied zwischen Eager und Lazy Loading?', options: ['Kein Unterschied','Eager: sofort laden; Lazy: erst bei Bedarf','Lazy: schneller','Eager: nur für Caching'], correct: 1, explanation: 'Eager Loading lädt alle verwandten Daten sofort (JOIN). Lazy Loading erst bei Zugriff.' },
            { q: 'Was beschreibt das Repository Pattern?', options: ['Git-Strategie','Abstraktionsschicht für Datenbankzugriffe','Singleton-Variante','Test-Methode'], correct: 1, explanation: 'Repository Pattern abstrahiert den Datenbankzugriff hinter einer Schnittstelle – erleichtert Tests und Austausch.' }
          ]
        },
        {
          id: 'projektmanagement-ae', name: 'Projektmanagement', icon: '📋', color: '#f6d365',
          cards: [
            {
              title: 'Agile Methoden für Entwicklung', icon: '🔄',
              body: '<strong>Scrum</strong>: Sprints, Rollen (PO, SM, Dev Team), Artefakte (Backlog, Sprint Backlog, Increment).<br><br><strong>User Story</strong>: "Als [Rolle] möchte ich [Ziel], damit [Nutzen]."<br><br><strong>Definition of Done (DoD)</strong>: Kriterien, wann eine User Story fertig ist.',
              keyPoints: ['Product Backlog: Alle Anforderungen priorisiert','Sprint Backlog: Aufgaben für diesen Sprint','Velocity: Durchschnittlich erledigte Story Points','Story Points: Schätzung des Aufwands','Burndown Chart: Verbleibende Arbeit im Sprint'],
              tip: 'User Story: Als [Nutzer] möchte ich [Was], damit [Warum]. Akzeptanzkriterien definieren die Definition of Done.'
            },
            {
              title: 'Aufwandsschätzung', icon: '📊',
              body: 'Methoden zur <strong>Aufwandsschätzung</strong>:<br><br><strong>Story Points</strong>: Relative Schätzung (Fibonacci: 1,2,3,5,8,13)<br><strong>Planning Poker</strong>: Team schätzt gleichzeitig<br><strong>Function Points</strong>: Basierend auf Funktionen und Daten<br><strong>Drei-Punkte-Schätzung</strong>: (Best + 4×Likely + Worst) / 6',
              keyPoints: ['Fibonacci-Skala: 1,2,3,5,8,13,21','Planning Poker: verhindert Anker-Effekt','PERT: Drei-Punkte-Schätzung','Bottom-Up: Einzelteile schätzen und summieren','Top-Down: Gesamtaufwand aufteilen'],
              tip: 'Drei-Punkte-Schätzung (PERT): (Best + 4×Likely + Worst) / 6 = erwarteter Aufwand.'
            }
          ],
          questions: [
            { q: 'Was ist eine User Story?', options: ['Technische Dokumentation','Anforderung aus Nutzerperspektive: Als [Rolle] möchte ich [Ziel]','Testfall','Bugbericht'], correct: 1, explanation: 'User Story beschreibt Anforderungen aus Nutzersicht: "Als X möchte ich Y, damit Z."' },
            { q: 'Was ist die Definition of Done (DoD)?', options: ['Projektabschluss','Kriterien, wann eine User Story als fertig gilt','Backlog-Priorisierung','Sprint-Ende'], correct: 1, explanation: 'DoD definiert Qualitätskriterien (z.B. Tests bestanden, Code reviewt), wann eine Story fertig ist.' },
            { q: 'Was ist Planning Poker?', options: ['Spiel für das Team','Simultane Schätzung durch alle Teammitglieder (verhindert Anker-Effekt)','Backlog-Priorisierung','Release-Planung'], correct: 1, explanation: 'Planning Poker: Alle schätzen gleichzeitig mit Karten, um Beeinflussung zu vermeiden.' },
            { q: 'Was sind Story Points?', options: ['Zeitschätzung in Stunden','Relative Schätzung des Aufwands einer User Story','Anzahl der Tests','Anzahl der Codezeilen'], correct: 1, explanation: 'Story Points = relative Schätzung des Aufwands/Komplexität, keine absolute Zeit.' },
            { q: 'Was zeigt ein Burndown Chart?', options: ['Codekomplexität','Verbleibende Arbeit im Sprint über Zeit','Budget-Übersicht','Team-Auslastung'], correct: 1, explanation: 'Burndown Chart zeigt, wie viele Story Points noch offen sind – Trend zeigt Sprint-Gesundheit.' },
            { q: 'Wie ist die Fibonacci-Skala für Story Points?', options: ['1,2,4,8,16','1,2,3,5,8,13,21','1,3,5,7,9','10,20,30,40'], correct: 1, explanation: 'Fibonacci: 1,2,3,5,8,13,21... Größere Lücken bei höheren Werten spiegeln wachsende Unsicherheit.' },
            { q: 'Was ist Velocity in Scrum?', options: ['Sprint-Geschwindigkeit in km/h','Durchschnittlich erledigte Story Points pro Sprint','Anzahl der Teammitglieder','Code-Coverage-Wert'], correct: 1, explanation: 'Velocity = durchschnittliche Story Points, die das Team pro Sprint abschließt. Grundlage für Planung.' },
            { q: 'Was ist die PERT-Schätzformel?', options: ['(Best + Worst) / 2','(Best + 4×Likely + Worst) / 6','Best × 1.5','Worst - Best'], correct: 1, explanation: 'PERT-Drei-Punkte-Schätzung: (Optimistisch + 4×Wahrscheinlichste + Pessimistisch) / 6.' }
          ]
        }
      ]
    }
  }
};
