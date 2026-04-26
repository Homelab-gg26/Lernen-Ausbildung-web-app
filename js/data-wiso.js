/* ── Wirtschafts- und Sozialkunde (WiSo) ────────────────────────
   Gilt für alle IT-Ausbildungsberufe (FI-SI, FI-AE, u.a.)
   ──────────────────────────────────────────────────────────────── */

const DATA_WISO = {
  id: 'wiso',
  name: 'WiSo',
  shortName: 'WiSo',
  icon: '📊',
  color: '#43e97b',
  color2: '#38f9d7',

  exams: {
    wiso: {
      id: 'wiso',
      name: 'WiSo',
      fullName: 'Wirtschafts- und Sozialkunde',
      desc: 'Arbeitsrecht, Sozialversicherungen, Wirtschaft, Rechtsformen & Berufsausbildung',
      icon: '📊',
      topics: [
        {
          id: 'arbeitsrecht', name: 'Arbeitsrecht', icon: '⚖️', color: '#f6d365',
          cards: [
            {
              title: 'Arbeitsvertrag & Kündigung', icon: '📄',
              body: 'Der <strong>Arbeitsvertrag</strong> regelt das Arbeitsverhältnis. Inhalte: Tätigkeit, Arbeitszeit, Vergütung, Urlaubsanspruch, Kündigungsfristen.<br><br><strong>Kündigungsfristen</strong> nach § 622 BGB:<br>• Probezeit (bis 6 Monate): 2 Wochen<br>• Bis 2 Jahre: 4 Wochen zum 15. oder Monatsende<br>• Ab 2 Jahre: 1 Monat; ab 5 Jahre: 2 Monate',
              keyPoints: ['Probezeit: max. 6 Monate, Kündigung 2 Wochen','Ordentliche Kündigung: mit Frist','Außerordentliche Kündigung (fristlos): nur bei wichtigem Grund','Aufhebungsvertrag: Einvernehmliche Beendigung','Abmahnung: Vorwarnung vor Kündigung','Betriebsbedingte Kündigung: wirtschaftliche Gründe'],
              tip: 'Kündigungsfrist während Probezeit = 2 Wochen. Nach Probezeit: 4 Wochen zum 15. oder Ende des Monats.'
            },
            {
              title: 'Arbeitszeit & Urlaub', icon: '🕐',
              body: 'Das <strong>Arbeitszeitgesetz (ArbZG)</strong>:<br>• Max. <strong>8 Stunden</strong> täglich (Ausnahme: 10h bei Ausgleich)<br>• Mindestens <strong>11 Stunden</strong> Ruhezeit<br>• Keine Arbeit an Sonn- und Feiertagen<br><br><strong>Urlaub</strong>: Gesetzlicher Mindesturlaub = <strong>24 Werktage</strong> (6-Tage-Woche) = 20 Tage (5-Tage-Woche).',
              keyPoints: ['Max. tägl. Arbeitszeit: 8h (Ausnahme 10h)','Ruhezeit: mind. 11h zwischen Arbeitstagen','Mindesturlaub: 24 Werktage = 20 Arbeitstage','Urlaub verfällt am 31.3. des Folgejahres','Jugendliche: max. 8h/Tag, 40h/Woche'],
              tip: '24 Werktage = 20 Arbeitstage! Werktage = Mo-Sa, Arbeitstage = Mo-Fr.'
            },
            {
              title: 'Betriebsrat & Mitbestimmung', icon: '🏛️',
              body: 'Der <strong>Betriebsrat</strong> vertritt die Interessen der Arbeitnehmer.<br><br>Ab <strong>5 Arbeitnehmern</strong> kann ein Betriebsrat gewählt werden.<br><br>Mitbestimmungsrechte:<br>• <strong>Erzwingbare Mitbestimmung</strong>: Einigung nötig (z.B. Arbeitszeit, Lohnformen)<br>• <strong>Informationsrecht</strong>: BR muss informiert werden',
              keyPoints: ['Betriebsrat ab 5 ständigen Arbeitnehmern möglich','BR-Mitglieder sind unkündbar (Sonderkündigungsschutz)','Mitbestimmung bei Arbeitszeit, Überstunden, Urlaub','Informationsrecht bei Personalplanung','Zustimmungsverweigerung bei Einstellungen möglich'],
              tip: 'Betriebsrat hat bei SOZIALEN Angelegenheiten erzwingbare Mitbestimmung (z.B. Lage der Arbeitszeit).'
            }
          ],
          questions: [
            { q: 'Wie lange beträgt die Kündigungsfrist während der Probezeit?', options: ['1 Woche','2 Wochen','4 Wochen','1 Monat'], correct: 1, explanation: 'Während der Probezeit (max. 6 Monate) gilt eine Kündigungsfrist von 2 Wochen (§ 622 Abs. 3 BGB).' },
            { q: 'Wie viele Stunden täglich darf man maximal arbeiten (ArbZG)?', options: ['6h','8h (Regel), 10h (Ausnahme)','12h','10h immer'], correct: 1, explanation: 'Max. 8h täglich. Ausnahmsweise 10h, wenn innerhalb 6 Monaten ausgeglichen.' },
            { q: 'Wie viele Werktage Urlaub stehen gesetzlich mindestens zu?', options: ['20 Werktage','24 Werktage','28 Werktage','30 Werktage'], correct: 1, explanation: 'Gesetzlicher Mindesturlaub: 24 Werktage (6-Tage-Woche) = 20 Arbeitstage (5-Tage-Woche).' },
            { q: 'Was ist eine außerordentliche (fristlose) Kündigung?', options: ['Kündigung ohne Begründung','Kündigung bei wichtigem Grund ohne Frist','Kündigung mit 4-Wochen-Frist','Kündigung durch Betriebsrat'], correct: 1, explanation: 'Fristlose Kündigung nur bei wichtigem Grund (z.B. Diebstahl, Arbeitsverweigerung).' },
            { q: 'Was regelt das ArbZG bezüglich der Ruhezeit?', options: ['Min. 8h','Min. 11h zwischen zwei Arbeitstagen','Min. 6h','Min. 1h Pause'], correct: 1, explanation: 'Mindestens 11h Ruhezeit zwischen zwei Arbeitstagen nach ArbZG.' },
            { q: 'Was ist ein Aufhebungsvertrag?', options: ['Einseitige Kündigung durch AG','Einvernehmliche Beendigung des Arbeitsverhältnisses','Befristeter Arbeitsvertrag','Probezeit-Verlängerung'], correct: 1, explanation: 'Aufhebungsvertrag = gemeinsame, einvernehmliche Vereinbarung zur Beendigung.' },
            { q: 'Was muss vor einer verhaltensbedingten Kündigung erfolgen?', options: ['Betriebsratsgespräch','Schriftliche Abmahnung','Kündigungsschutzverfahren','Probezeit-Verlängerung'], correct: 1, explanation: 'Vor verhaltensbedingter Kündigung muss eine Abmahnung erfolgen.' },
            { q: 'Ab wie vielen Arbeitnehmern kann ein Betriebsrat gewählt werden?', options: ['3','5','10','20'], correct: 1, explanation: 'Ein Betriebsrat kann ab 5 ständigen wahlberechtigten Arbeitnehmern gewählt werden.' }
          ]
        },
        {
          id: 'sozialversicherung', name: 'Sozialversicherungen', icon: '🏥', color: '#4facfe',
          cards: [
            {
              title: 'Die 5 Sozialversicherungszweige', icon: '🛡️',
              body: 'Deutschland hat <strong>5 Sozialversicherungszweige</strong>, überwiegend paritätisch finanziert:<br><br>1. <strong>Krankenversicherung (KV)</strong>: ~14,6% + Zusatzbeitrag<br>2. <strong>Rentenversicherung (RV)</strong>: 18,6%<br>3. <strong>Arbeitslosenversicherung (AV)</strong>: 2,6%<br>4. <strong>Pflegeversicherung (PV)</strong>: 3,4% (Kinderlose +0,6%)<br>5. <strong>Unfallversicherung (UV)</strong>: Nur vom Arbeitgeber',
              diagram: `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
  ${[['🏥 Krankenversicherung','~14,6%','paritätisch','#f093fb'],['🏦 Rentenversicherung','18,6%','paritätisch','#667eea'],['💼 Arbeitslosenversicherung','2,6%','paritätisch','#43e97b'],['🧓 Pflegeversicherung','3,4%','paritätisch','#f6d365'],['⚠️ Unfallversicherung','variabel','nur Arbeitgeber','#fa709a']].map((s,i)=>`
  <rect x="10" y="${5+i*38}" width="400" height="32" rx="6" fill="${s[3]}" opacity="0.15" stroke="${s[3]}" stroke-width="1.5"/>
  <text x="20" y="${25+i*38}" fill="${s[3]}" font-size="12" font-weight="800">${s[0]}</text>
  <text x="270" y="${25+i*38}" fill="#ccc" font-size="11">${s[1]} | ${s[2]}</text>`).join('')}
</svg>`,
              keyPoints: ['Paritätisch = je 50% Arbeitgeber & Arbeitnehmer','Unfallversicherung: 100% Arbeitgeber','Kinderlose zahlen 0,6% mehr Pflegeversicherung','Beitragsbemessungsgrenze: ab hier kein Beitrag mehr','GKV vs. PKV: ab ~69.300 € Jahresbrutto PKV möglich'],
              tip: 'Unfallversicherung wird AUSSCHLIESSLICH vom Arbeitgeber bezahlt – häufige Prüfungsfalle!'
            },
            {
              title: 'Leistungen der Sozialversicherungen', icon: '💊',
              body: '<strong>Krankenversicherung</strong>: Arztbesuche, Krankenhaus, Krankengeld (ab 6. Woche).<br><strong>Rentenversicherung</strong>: Altersrente, Erwerbsminderungsrente, Reha.<br><strong>Arbeitslosenversicherung</strong>: ALG I (nach Einzahlung), Kurzarbeitergeld.<br><strong>Pflegeversicherung</strong>: Pflegeleistungen bei Pflegegrad 1-5.',
              keyPoints: ['Lohnfortzahlung: AG zahlt 6 Wochen bei Krankheit','Krankengeld: danach KV zahlt (ca. 70% Brutto)','ALG I: 60% (67% mit Kindern) des letzten Nettoentgelts','Wartezeit Rente: mind. 5 Jahre Beitragszeit','Pflegegrade 1-5: steigender Pflegebedarf'],
              tip: 'Lohnfortzahlung = AG zahlt volle 6 Wochen. Danach Krankengeld von der KV (~70%).'
            }
          ],
          questions: [
            { q: 'Welcher Sozialversicherungszweig wird ausschließlich vom Arbeitgeber bezahlt?', options: ['Krankenversicherung','Rentenversicherung','Unfallversicherung','Pflegeversicherung'], correct: 2, explanation: 'Gesetzliche Unfallversicherung wird ausschließlich vom Arbeitgeber finanziert.' },
            { q: 'Was bedeutet "paritätische Finanzierung"?', options: ['Nur AN zahlt','Nur AG zahlt','Je 50% AG und AN','Staat übernimmt die Hälfte'], correct: 2, explanation: 'Paritätisch = AG und AN tragen je 50% der Beiträge.' },
            { q: 'Welchen Beitragssatz hat die gesetzliche Rentenversicherung?', options: ['14,6%','18,6%','2,6%','3,4%'], correct: 1, explanation: 'Rentenversicherung: 18,6% des Bruttogehalts, je zur Hälfte von AG und AN.' },
            { q: 'Wer zahlt einen höheren Pflegeversicherungsbeitrag?', options: ['Alle gleich','Verheiratete','Kinderlose Arbeitnehmer','Arbeitnehmer über 50'], correct: 2, explanation: 'Kinderlose AN ab 23 Jahren zahlen 0,6% mehr Pflegeversicherung.' },
            { q: 'Was ist die Beitragsbemessungsgrenze?', options: ['Mindestlohn','Einkommensgrenze, ab der kein Beitrag mehr steigt','Steuerbefreiungsgrenze','KV-Höchstbetrag'], correct: 1, explanation: 'Ab der Beitragsbemessungsgrenze wird kein höherer SV-Beitrag mehr fällig.' },
            { q: 'Was ist Kurzarbeitergeld?', options: ['Lohnzuschuss bei Überstunden','Leistung der AV bei vorübergehend reduzierter Arbeitszeit','Rente für Teilzeit','Förderung für Azubis'], correct: 1, explanation: 'Kurzarbeitergeld zahlt die Bundesagentur für Arbeit bei vorübergehend reduzierter Arbeitszeit.' },
            { q: 'Wie lange zahlt der Arbeitgeber Lohn im Krankheitsfall?', options: ['2 Wochen','4 Wochen','6 Wochen','3 Monate'], correct: 2, explanation: 'Lohnfortzahlung durch AG: 6 Wochen. Danach zahlt die Krankenkasse Krankengeld.' },
            { q: 'Wie viel Prozent des letzten Nettos ist ALG I (ohne Kinder)?', options: ['40%','50%','60%','70%'], correct: 2, explanation: 'ALG I beträgt 60% des letzten Nettoentgelts (67% für AN mit Kindern).' }
          ]
        },
        {
          id: 'wirtschaft', name: 'Wirtschaft & Betrieb', icon: '📈', color: '#f093fb',
          cards: [
            {
              title: 'Wirtschaftskreislauf & Konjunktur', icon: '🔄',
              body: 'Der <strong>Wirtschaftskreislauf</strong>: Güter- und Geldstrom zwischen Haushalten und Unternehmen.<br><br><strong>Konjunkturzyklus</strong>: Aufschwung → Boom → Abschwung → Rezession<br><br><strong>Inflation</strong>: Anhaltender Preisanstieg → Kaufkraftverlust.<br><strong>Deflation</strong>: Anhaltender Preisrückgang → Investitionsstillstand.',
              keyPoints: ['Produktionsfaktoren: Arbeit, Kapital, Boden','BIP: Gesamtwert aller produzierten Güter/DL in Deutschland','Inflation: gemessen am Verbraucherpreisindex (VPI)','Rezession: 2 Quartale negatives BIP-Wachstum','EZB steuert Geldpolitik im Euroraum'],
              tip: 'EZB kontrolliert die Geldmenge und den Leitzins – NICHT der Bundestag!'
            },
            {
              title: 'Rechtsformen von Unternehmen', icon: '🏢',
              body: '<strong>Einzelunternehmen</strong>: 1 Person, unbeschränkte Haftung.<br><strong>GbR</strong>: Mind. 2 Personen, unbeschränkte Haftung.<br><strong>OHG</strong>: Kaufleute, unbeschränkte Haftung.<br><strong>GmbH</strong>: Min. 25.000 € Stammkapital, beschränkte Haftung.<br><strong>AG</strong>: Min. 50.000 € Grundkapital, Aktien handelbar.',
              diagram: `<svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
  ${[['Einzelunternehmen','1 Person','unbeschränkt','#fa709a'],['GbR / OHG','min. 2 Personen','unbeschränkt','#f093fb'],['GmbH','min. 25.000 € Kapital','beschränkt','#43e97b'],['AG','min. 50.000 € Kapital','beschränkt, börsennotiert','#667eea']].map((r,i)=>`
  <rect x="10" y="${10+i*40}" width="400" height="34" rx="6" fill="${r[3]}" opacity="0.15" stroke="${r[3]}" stroke-width="1.5"/>
  <text x="20" y="${31+i*40}" fill="${r[3]}" font-size="12" font-weight="800">${r[0]}</text>
  <text x="180" y="${31+i*40}" fill="#bbb" font-size="10">${r[1]}</text>
  <text x="300" y="${31+i*40}" fill="#bbb" font-size="10">${r[2]}</text>`).join('')}
</svg>`,
              keyPoints: ['GmbH: Haftung auf Gesellschaftsvermögen beschränkt','AG: Kapital durch Aktien aufgeteilt','Personengesellschaften (GbR, OHG): persönliche Haftung','Kapitalgesellschaften (GmbH, AG): beschränkte Haftung','Stammkapital GmbH: 25.000 €, AG: 50.000 €'],
              tip: 'GmbH vs. AG: Beide beschränkt haftend. GmbH = 25.000 €, AG = 50.000 € und börsennotierbar.'
            },
            {
              title: 'Marktformen & Wettbewerb', icon: '📉',
              body: '<strong>Marktformen</strong> nach Anzahl der Anbieter/Nachfrager:<br>• <strong>Monopol</strong>: Ein Anbieter<br>• <strong>Oligopol</strong>: Wenige Anbieter (z.B. Automobilmarkt)<br>• <strong>Polypol</strong>: Viele Anbieter (z.B. Lebensmittelmarkt)<br><br><strong>Kartell</strong>: Wettbewerbswidrige Absprachen (verboten!)',
              keyPoints: ['Bundeskartellamt: überwacht Wettbewerb in Deutschland','GWB: Gesetz gegen Wettbewerbsbeschränkungen','Kartell verboten in Deutschland und EU','Marktversagen: wenn Markt kein optimales Ergebnis liefert','Staatliche Eingriffe bei Marktversagen'],
              tip: 'Kartelle sind in Deutschland und der EU VERBOTEN. Bundeskartellamt ist die Aufsichtsbehörde.'
            }
          ],
          questions: [
            { q: 'Was ist das BIP?', options: ['Summe aller Steuereinnahmen','Gesamtwert aller in einem Land produzierten Güter und DL eines Jahres','Summe aller Exporte','Gesamtvermögen der Bevölkerung'], correct: 1, explanation: 'BIP = Gesamtwert aller in Deutschland produzierten Güter und Dienstleistungen in einem Jahr.' },
            { q: 'Was ist Inflation?', options: ['Sinkende Staatsschulden','Anhaltender Anstieg des allgemeinen Preisniveaus','Steigendes Wirtschaftswachstum','Rückgang der Arbeitslosigkeit'], correct: 1, explanation: 'Inflation = anhaltender Preisanstieg → Kaufkraftverlust.' },
            { q: 'Welche Rechtsform hat ein Mindest-Stammkapital von 25.000 €?', options: ['AG','GbR','GmbH','OHG'], correct: 2, explanation: 'GmbH benötigt Mindeststammkapital von 25.000 €. AG benötigt 50.000 € Grundkapital.' },
            { q: 'Bei welcher Rechtsform haften Gesellschafter persönlich und unbeschränkt?', options: ['GmbH','AG','GbR','GmbH & Co. KG'], correct: 2, explanation: 'GbR: alle Gesellschafter haften persönlich, unbeschränkt und gesamtschuldnerisch.' },
            { q: 'Was ist die Aufgabe der EZB?', options: ['EU-Haushaltsplanung','Steuererhebung','Steuerung der Geldpolitik im Euroraum','Kontrolle nationaler Haushalte'], correct: 2, explanation: 'EZB steuert Leitzins und Geldmenge mit Ziel ~2% Inflation.' },
            { q: 'Was beschreibt eine Rezession?', options: ['Wachstum über 2%','Zwei Quartale mit negativem BIP-Wachstum','Stark steigende Inflation','Rückgang der Exporte'], correct: 1, explanation: 'Rezession: BIP schrumpft zwei Quartale hintereinander.' },
            { q: 'Was ist ein Kartell?', options: ['Staatliche Behörde','Wettbewerbswidrige Absprachen zwischen Unternehmen','Handelsabkommen','Art von AG'], correct: 1, explanation: 'Kartell = wettbewerbswidrige Absprachen (z.B. Preisabsprachen). In Deutschland und EU verboten.' },
            { q: 'Was sind die drei klassischen Produktionsfaktoren?', options: ['Nur Arbeit und Kapital','Arbeit, Kapital und Boden','Nur natürliche Ressourcen','Arbeit, Technologie, Management'], correct: 1, explanation: 'Klassische Produktionsfaktoren: Arbeit, Kapital und Boden.' }
          ]
        },
        {
          id: 'ausbildung', name: 'Berufsausbildung', icon: '🎓', color: '#43e97b',
          cards: [
            {
              title: 'Das duale Ausbildungssystem', icon: '🏫',
              body: 'Das <strong>duale Ausbildungssystem</strong> kombiniert betriebliche Ausbildung und Berufsschule:<br><br>• <strong>Ausbildungsbetrieb</strong>: Praktische Ausbildung, Ausbildungsvertrag, Vergütung<br>• <strong>Berufsschule</strong>: Theoretische Grundlagen<br><br>Rechtliche Grundlage: <strong>BBiG</strong> (Berufsbildungsgesetz). Aufsicht durch <strong>IHK</strong>.',
              keyPoints: ['Ausbildungsvertrag: schriftlich, bei IHK registrieren','Probezeit Ausbildung: 1-4 Monate','Ausbildungsvergütung: angemessen, steigt jährlich','Mindestvergütung seit 2020 gesetzlich','AP1 und AP2 (gestrecktes Prüfungsverfahren)'],
              tip: 'Probezeit Ausbildung: 1-4 Monate (NICHT 6 Monate wie im Arbeitsverhältnis!)'
            },
            {
              title: 'Rechte und Pflichten in der Ausbildung', icon: '📋',
              body: '<strong>Pflichten des Auszubildenden</strong>: Lernpflicht, Berichtsheft führen, Weisungen befolgen, Schweigepflicht.<br><br><strong>Pflichten des Ausbilders</strong>: Ausbildung durchführen, Vergütung zahlen, Ausbildungsmittel bereitstellen, Beurteilung ausstellen.<br><br>Kündigung in Ausbildung: In Probezeit jederzeit. Danach nur fristlos bei wichtigem Grund.',
              keyPoints: ['AN kann nach Probezeit nur fristlos kündigen (wichtiger Grund)','AG kann nach Probezeit nur fristlos kündigen','Berichtsheft = Pflicht für Azubi','Zeugnis nach Ausbildungsende = Pflicht des AG','Übernahme nach Ausbildung: kein Rechtsanspruch'],
              tip: 'Nach der Probezeit: Azubi kann mit 4 Wochen Frist zur Ausbildungsaufgabe kündigen ODER fristlos.'
            }
          ],
          questions: [
            { q: 'Was ist das BBiG?', options: ['Bundesbank-Gesetz','Berufsbildungsgesetz – Rechtsgrundlage der Ausbildung','Bundesbehörden-Informations-Gesetz','Bildungs-Informations-Gesetz'], correct: 1, explanation: 'BBiG (Berufsbildungsgesetz) ist die gesetzliche Grundlage für Berufsausbildung in Deutschland.' },
            { q: 'Wie lange dauert die Probezeit in einer Ausbildung?', options: ['1-4 Monate','3-6 Monate','6-12 Monate','1-2 Monate'], correct: 0, explanation: 'Probezeit Ausbildung: mind. 1 Monat, höchstens 4 Monate. Im Arbeitsrecht sind es bis zu 6 Monate!' },
            { q: 'Welche Institution überwacht IHK-Ausbildungsberufe?', options: ['Agentur für Arbeit','Bundesagentur für Bildung','IHK','Berufsschule'], correct: 2, explanation: 'Die IHK überwacht, registriert Ausbildungsverträge und führt Abschlussprüfungen durch.' },
            { q: 'Was regelt das duale Ausbildungssystem?', options: ['Nur schulische Ausbildung','Kombination betriebliche Ausbildung + Berufsschule','Nur betriebliche Ausbildung','Universitätsstudium'], correct: 1, explanation: 'Dual = zwei Lernorte: Betrieb (praktisch) und Berufsschule (theoretisch).' },
            { q: 'Wer zahlt die Ausbildungsvergütung?', options: ['IHK','Berufsschule','Ausbildungsbetrieb','Agentur für Arbeit'], correct: 2, explanation: 'Der Ausbildungsbetrieb zahlt die Ausbildungsvergütung. Seit 2020 gibt es eine gesetzliche Mindestvergütung.' },
            { q: 'Was ist eine Pflicht des Auszubildenden?', options: ['Überstunden ablehnen','Berichtsheft führen und vorlegen','Ausbildungsplan erstellen','Vergütung festlegen'], correct: 1, explanation: 'Auszubildende sind verpflichtet, Ausbildungsnachweise (Berichtsheft) zu führen und vorzulegen.' },
            { q: 'Hat ein Azubi nach der Ausbildung Anspruch auf Übernahme?', options: ['Ja, immer','Ja, nach 2 Jahren','Nein, kein gesetzlicher Anspruch','Ja, bei guten Noten'], correct: 2, explanation: 'Es gibt keinen gesetzlichen Anspruch auf Übernahme nach der Ausbildung.' },
            { q: 'Wann kann ein Azubi nach der Probezeit kündigen?', options: ['Jederzeit ohne Frist','Mit 4-Wochen-Frist zur Berufsaufgabe oder fristlos bei wichtigem Grund','Nur zum Monatsende','Nur mit Betriebsrat-Zustimmung'], correct: 1, explanation: 'Nach der Probezeit: Kündigung mit 4 Wochen Frist wenn Beruf aufgegeben wird, oder fristlos bei wichtigem Grund.' }
          ]
        },
        {
          id: 'steuern', name: 'Steuern & Entgelt', icon: '💰', color: '#a18cd1',
          cards: [
            {
              title: 'Lohn- und Gehaltsabrechnung', icon: '📊',
              body: '<strong>Bruttolohn</strong> − Steuern − Sozialversicherungsbeiträge = <strong>Nettolohn</strong>.<br><br>Abzüge:<br>• Lohnsteuer (nach Steuerklasse I-VI)<br>• Solidaritätszuschlag (ab 2021 für die meisten weggefallen)<br>• Kirchensteuer (8-9%)<br>• Sozialversicherungsbeiträge (KV, RV, AV, PV)',
              keyPoints: ['Steuerklasse I: Alleinstehende','Steuerklasse III: Verheiratete (Besserverdienender)','Steuerklasse IV: Verheiratete (gleich)','Steuerklasse VI: Zweitjob','Freibeträge reduzieren das zu versteuernde Einkommen'],
              tip: 'Steuerklasse III hat den günstigsten Steuersatz (für Besserverdienenden in Ehe), Klasse VI den höchsten (Zweitjob).'
            },
            {
              title: 'Steuern im Überblick', icon: '🏦',
              body: '<strong>Direkte Steuern</strong>: Direkt an Finanzamt (Lohnsteuer, Körperschaftsteuer, Gewerbesteuer).<br><strong>Indirekte Steuern</strong>: Im Preis enthalten (Umsatzsteuer/MwSt., Mineralölsteuer).<br><br><strong>Mehrwertsteuer (MwSt.)</strong>: 19% (Regelsteuersatz), 7% (ermäßigt: Lebensmittel, Bücher).',
              keyPoints: ['MwSt. 19%: Standard','MwSt. 7%: Lebensmittel, Bücher, ÖPNV','Vorsteuer: Unternehmen können MwSt. verrechnen','Körperschaftsteuer: Steuer auf GmbH/AG-Gewinne (15%)','Gewerbesteuer: Steuer auf Gewerbeertrag'],
              tip: 'MwSt. 19% Standard, 7% ermäßigt (Lebensmittel, Bücher). Unternehmen zahlen Körperschaftsteuer (15%).'
            }
          ],
          questions: [
            { q: 'Was ist der Unterschied zwischen Brutto- und Nettolohn?', options: ['Kein Unterschied','Brutto = vor Abzügen; Netto = nach Steuern und SV-Beiträgen','Netto = vor Abzügen','Brutto ist immer höher wegen Überstunden'], correct: 1, explanation: 'Bruttolohn - Lohnsteuer - Sozialversicherungsbeiträge = Nettolohn.' },
            { q: 'Welche Steuerklasse hat den günstigsten Steuersatz?', options: ['Klasse I','Klasse III','Klasse IV','Klasse VI'], correct: 1, explanation: 'Steuerklasse III hat den günstigsten Steuersatz (für Besserverdienenden in einer Ehe).' },
            { q: 'Wie hoch ist der Standard-MwSt.-Satz in Deutschland?', options: ['7%','16%','19%','21%'], correct: 2, explanation: 'Regelsteuersatz: 19%. Ermäßigter Satz: 7% (Lebensmittel, Bücher, ÖPNV).' },
            { q: 'Was ist eine direkte Steuer?', options: ['Im Preis enthalten','Direkt an das Finanzamt gezahlt (z.B. Lohnsteuer)','Wird nur von Unternehmen gezahlt','Steuer auf Konsum'], correct: 1, explanation: 'Direkte Steuer wird direkt ans Finanzamt gezahlt (Lohnsteuer, Körperschaftsteuer). Indirekte Steuer ist im Preis enthalten (MwSt.).' },
            { q: 'Welche Steuerklasse gilt für einen Zweitjob?', options: ['Klasse I','Klasse III','Klasse IV','Klasse VI'], correct: 3, explanation: 'Steuerklasse VI gilt für Zweitjobs und hat den höchsten Steuersatz.' },
            { q: 'Was ist die Körperschaftsteuer?', options: ['Steuer auf Arbeitnehmergehälter','Steuer auf Gewinne von Kapitalgesellschaften (GmbH, AG) – 15%','Steuer auf Immobilien','Steuer auf Erbschaften'], correct: 1, explanation: 'Körperschaftsteuer = 15% auf Gewinne von Kapitalgesellschaften (GmbH, AG).' },
            { q: 'Was ist die Gewerbesteuer?', options: ['Steuer auf Privateinkommen','Gemeindesteuer auf Gewerbeertrag von Unternehmen','Steuer auf Importe','MwSt.-Variante'], correct: 1, explanation: 'Gewerbesteuer ist eine Gemeindesteuer auf den Gewerbeertrag von gewerblichen Unternehmen.' },
            { q: 'Was ist Vorsteuer?', options: ['Steuer vor dem Jahresabschluss','Von Unternehmen gezahlte MwSt., die mit Umsatzsteuer verrechnet werden kann','Lohnsteuer-Vorauszahlung','Körperschaftsteuer-Vorauszahlung'], correct: 1, explanation: 'Unternehmen zahlen MwSt. beim Einkauf (Vorsteuer) und erhalten diese vom Finanzamt zurück, verrechnet mit der Umsatzsteuer.' }
          ]
        }
      ]
    }
  }
};
