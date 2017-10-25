# Release Notes für Ceres

## v1.6.2 (2017-10-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.6.1...1.6.2" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- In der Retourenhistorie werden initial nur noch 4 Bilder pro Auftrag angezeigt.
- In der Retourenhistorie wurde ein "Mehr anzeigen"-Button hinzugefügt.
- Wenn Artikel mit Bestellmerkmalen im Warenkorb liegen, wird hinter dem Aufpreis "pro Artikel" angezeigt.
- Nachdem der Kunde eine Retoure angelegt hat, wird er auf eine Bestätigungsseite geleitet.

### Behoben

- Der Retouren-Tab im Mein-Konto-Bereich wird ausgeblendet, wenn der Kunde keine Retouren hat.

## v1.6.1 (2017-10-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.6.0...1.6.1" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Meta-Beschreibungen und Robots-Einstellungen können jetzt für statische Seiten des Webshops im Tab **SEO** in der Konfiguration eingegeben werden. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#201" target="_blank"><b>Einstellungen für Suchmaschinenoptimierung vornehmen</b></a>.

### Geändert

- **Name of your store** and **URL to your company logo** befinden sich nun im Tab **Global** der Konfiguration.
- Die Einstellung **Allow returns** wurde im Tab **Checkout and My account** der Konfiguration hinzugefügt und ersetzt die alte Einstellung zur Aktivierung von Retouren im plentymarkets Backend.

## 1.6.0 (2017-10-16) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.5.1...1.6.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Staffelpreise sind nun in Ceres integriert und werden unterhalb der Bestellmerkmale in der Einzelansicht eines Artikels ausgegeben. Weitere Informationen zu Staffelpreisen finden Sie unter <a href="https://knowledge.plentymarkets.com/artikel/artikel-verwalten#870" target="_blank"><b>Verkaufspreise verwalten</b></a>.

### Geändert

- Der Text von Bestellmerkmalen wird in der Warenkorbvorschau nicht mehr ausgegeben. 
- Bestellmerkmale werden in der Einzelansicht eines Artikels oberhalb der Preise ausgegeben.
- In der Einzelansicht eines Artikels wird der Artikelpreis nun live anhand der Merkmalaufpreise und Staffelpreise berechnet.
- Im Overlay **Zum Warenkorb hinzufügen** wird der Artikelpreis nun korrekt anhand der Merkmalaufpreise und Staffelpreise berechnet.
- Das Uhrensymbol in der Auftragshistorie wurde durch einen Text ersetzt.
- Das Uhrensymbol in der Retourenhistorie wurde durch einen Text ersetzt.

## v1.5.1 (2017-10-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.5.0...1.5.1" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Der Container **Container for customer feedback** wurde hinzugefügt.

### Geändert

- Der Template-Container **Single item: Add detail tabs** beinhaltet nun das aktuelle `Item`-Objekt.
- Der Template-Container **Single item: Add content to detail tabs** beinhaltet nun das aktuelle `Item`-Objekt.

### Behoben

- Die Aufpreise der Bestellmerkmale werden nun im Warenkorb und der Warenkorbvorschau wieder korrekt ausgegeben.
- Im **Mein Konto**-Bereich wird der Hinweis **Zahlungsart kann nicht geändert werden** nicht mehr angezeigt, sobald der Auftrag bezahlt wurde.

## v1.5.0 (2017-09-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.4.7...1.5.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Im **Mein Konto**-Bereich ist es nun möglich Retouren abzuwickeln. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#430" target="_blank"><b>Retouren aktivieren</b></a>.

### Behoben

- Ein Fehler führte dazu, dass auf der Bestellbestätigungsseite das falsche Versanddatum angezeigt. Dies wurde behoben.
- Ein Fehler führte dazu, dass die Auftragsübersicht nicht geladen werden konnte, wenn ein Auftrag mit einer alten Zahlungsart vorhanden war. Dies wurde behoben.
- Durch einen sporadisch auftretenden Fehler wurde die Kaufabwicklung bei Gastbestellungen nicht aufgerufen. Dies wurde behoben.
- Ein Fehler führte dazu, dass die Bildergalerie in der Einzelansicht eines Artikels beim Wechsel der Variante nicht richtig angezeigt wurde. Dies wurde behoben.

## v1.4.7 (2017-09-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.4.6...1.4.7" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Das Event `afterBasketItemRemoved` wurde hinzugefügt. Dieses Event wird ausgelöst, nachdem ein Artikel aus dem Warenkorb entfernt wurde.
- Das Event `afterBasketItemQuantityUpdated` wurde hinzugefügt. Dieses Event wird ausgelöst, nachdem die Anzahl der Artikel im Warenkorb aktualisiert wurde.
- Das Event `afterShippingCountryChanged` wurde hinzugefügt. Dieses Event wird ausgelöst, nachdem in der Kaufabwicklung das Lieferland geändert wurde.

### Behoben

- Ein Fehler führte dazu, dass die Grundpreisangabe nicht richtig funktionierte. Dies wurde behoben.

## v1.4.6 (2017-09-13) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.4.5...1.4.6" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Im Warenkorb werden nun die Attribute (z.B. Größe) angezeigt.
- In der Kaufabwicklung können nun Auftragsnotizen eingegeben werden.
- In der Kategorieansicht kann nun auch die Kategoriebeschreibung ausgegeben werden. Aktivieren Sie dafür die Einstellung <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#90" target="_blank"><b>Show category description in category view</b></a>.
- Die Suche nach Variantennummern wurde implementiert.

## v1.4.5 (2017-09-06)

### Behoben

- Durch einen Fehler hat die Variantenauswahl in der Einzelansicht eines Artikels manchmal nicht richtig funktioniert. Dies wurde behoben.
- Durch einen Fehler wurden Artikeldaten in der mobilen Navigation manchmal nicht angezeigt. Dies wurde behoben.
- Durch einen Fehler wurde die Artikelanzahl in der Warenkorbvorschau manchmal nicht richtig anzeigt. Dies wurde behoben.

## v1.4.4 (2017-08-30)

### Hinzugefügt

- Es wurde eine Funktion hinzugefügt, damit der Kunde das Passwort zurücksetzen kann.
- Wenn zwischen den Kategorien gewechselt wird, wird in Ceres ein Event mit dem Namen `afterCategoryChanged` ausgelöst, welches die aktuelle Kategorie sowie alle Kategorien mitschickt.
- Der Container `Script.AfterScriptsLoaded` wurde hinzugefügt. Mit diesem Container können z.B. eigene Vue-Komponenten eingefügt und auch alle anderen in Ceres eingebundenen Frameworks benutzt werden.
- Wenn der Kunde die Zahlungsart wechseln möchte, wird ihm die aktuelle Zahlungsart angezeigt.
- Der Kunde erhält eine Warnmeldung, wenn er auf eine Zahlungsart wechseln möchte, von der aus er nicht mehr wechseln kann.

### Behoben

- Die Sortierung nach Preis funktioniert nun wie erwartet.
- Die Variantenauswahl in der Einzelansicht eines Artikels zeigt nun auch die Attribute der Hauptvariante mit ein.

### TODO

- Die Route `password-reset` muss in IO aktiviert werden, um die Funktion **Passwort vergessen** in Ceres zu nutzen.

## v1.4.3 (2017-08-25)

### Behoben

- Der Titel der Suchseite wird nun korrekt angezeigt, wenn eine leere Suche ausgeführt wird.
- In Artikellisten wird nun das Bild mit der niedrigsten Priorität ausgegeben.
- Im Bereich MyAccount wurde ein Fehler bei der Addressauswahl behoben.
- Der Script.Loader Container wurde wieder an seine vorherige Position gesetzt.

### Geändert

- Artikelnamen in der Wunschliste werden nun nach vier Zeilen abgekürzt.

## v1.4.2 (2017-08-23)

### Hinzugefügt

- Das Kontaktformular wurde um Google Maps erweitert.
- Einstellung, um Google Maps in der Mobile-Ansicht anzuzeigen.
- Wenn der Browser beim Registrieren einen Weiterleitungslink hat, wird dieser nach erfolgreichem Registrieren geöffnet. Ansonsten wird auf die Startseite weitergeleitet.
- Wenn der Benutzer sich über das Popup registriert, wird nach erfolgreichem Registrieren die Seite neu geladen.
- Im Kontaktformular gibt es eine Checkbox "Kopie an mich", um es dem Kunden zu ermöglichen, eine Kopie seiner Anfrage zu erhalten.
- Der ScriptLoader-Container wurde an eine Position verschoben, an der alle von uns eingebundenen Frameworks vorhanden sind.

### Behoben

- Sortierung nach neusten und ältesten Artikeln funktioniert nun korrekt.
- Login zu MyAccount bietet keine Möglichkeit mehr, sich als Gast einzuloggen.
- In der Kategorie-Ansicht wurde bei Geräten der mittleren Größe die Margin des Headers und der Breadcrumbs falsch berechnet.
- Nicht übersetzte Kategorien werden nun von der mobilen Navigation ignoriert und verursachen keine JavaScript-Fehler mehr.
- Nicht übersetzte Kategorien werden nun in der Seitennavigation nicht mehr ausgegeben.
- Wenn eine Artikelseite geöffnet wird, wird die aktuelle Kategorie in der Seitennavigation nun korrekt angezeigt.
- Ein Fehler, wenn kein Title-HTML-Tag vorhanden ist, wurde behoben.
- Die Artikelnamen im Basket werden nun wieder in der richtigen Größe angezeigt.
- Javascript-Fehler in älteren Browsern behoben.

## v1.4.1 (2017-08-11)

### Hinzugefügt
- Der Suchseite wurde eine Überschrift hinzugefügt.
- Es wurde eine aktualisierte Passwort-Überprüfung zur Registrierung hinzugefügt.

### Behoben
- Es gibt es keine Fehlermeldungen mehr beim Wechseln der Kategorie, wenn das Kategoriebild nicht ausgegeben wird.
- Die Größe der Überschrift von Kategorien ist nun korrekt, wenn das Bild der Kategorie ausgegeben wird.
- Die Größe der Bilder in der Wunschliste wird nun korrekt skaliert.
- Das Icon der Wunschliste wird im Header nun neben den Warenkorb gelegt und die Position der Artikel in der Wunschliste wurde auf links neben das Icon geändert.
- Der Zähler für Artikel im Warenkorb wurde optisch leicht angepasst.

## Geändert

- Der Tab **Registration** wurde aus der Config entfernt.
- Das RegEx für E-Mail und Passwort wird jetzt von Ceres vorgegeben.

## v1.4.0 (2017-08-09)

### Hinzugefügt

- Für den Warenkorb im Header können nun die angezeigten Informationen eingestellt werden. Es ist möglich den Warenwert, die Anzahl der Artikel oder Warenwert und die Artikelanzahl im Header anzuzeigen. Weitere Informationen dazu finden Sie im <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#80" target="_blank">Handbuch</a>.
- Ein eigenes Favicon kann für den Webshop hochgeladen werden. Weitere Informationen zum Hochladen des Favicons finden Sie im <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#350" target="_blank">Handbuch</a>.
- Jede Seite hat jetzt einen dynamisch generierten Seitentitel.
- Der Warenbestand von Artikeln wird nun im Webshop berücksichtigt.
- Die Einstellung **Unsichtbar: in Artikelauflistung** im Tab **Einstellungen** einer Variante wird nun im Webshop berücksichtigt.
- Varianten ohne Bestand können nun für das Varianten-Dropdown aktiviert werden. Weitere Informationen dazu finden Sie im <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#90" target="_blank">Handbuch</a>.
- Eine Wunschliste wurde hinzugefügt. **Hinweis:** Um die Wunschliste im Webshop anzuzeigen, muss die Route `/wish-list` im Tab **Routing** in der Konfiguration von **IO** aktiviert werden.
- Die Kontaktseite und das Kontaktformular wurden hinzugefügt. **Hinweis:** Um die Kontaktseite im Webshop anzuzeigen, muss die Route `/contact` im Tab **Routing** in der Konfiguration von **IO** aktiviert werden. Weitere Informationen zum Einrichten der Kontaktseite finden Sie im <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#370" target="_blank">Handbuch</a>.
- Serverseitige Fehlermeldungen werden im Frontend richtig ausgegeben.
- Der Link aus der Bestellbestätigung leitet nun auf die Bestellbestätigungsseite von Ceres weiter.
- Das Bild einer Kategorie kann nun in der Kategorieansicht anzeigt werden. Weitere Informationen dazu finden Sie im <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#100" target="_blank">Handbuch</a>.

## Geändert

- Die Überschriften auf den Seiten des Webshops wurden vergrößert.
- Die Überschriften der Artikellisten wurde von `h1` auf ein `p`-Element geändert.
- Die mobile Navigation wurde grundlegend überarbeitet und zeigt bis zu 6 Unterebenen an.

### Behoben

- Bildpositionen werden nun auch in den Artikellisten berücksichtigt.
- Die Sprachauswahl im Header des Webshops zeigt nun wieder Sprachen an.
- Artikelkategorien wurden auch ohne verknüpfte Artikel im Webshop angezeigt. Dies wurde behoben.
- Wenn ein Artikel öfter in den Warenkorb gelegt wurde, als Warenbestand vorhanden war, kam eine `Bad Params` Fehlermeldung. Dies wurde behoben.

### Entfernt

- Die Komponente `Mobile-Breadcrumbs` wurde entfernt, da die neue mobile Navigation eigene Breadcrumbs enthält.

## v1.3.2 (2017-07-26)

### Hinzugefügt

- In den Adressformularen für die Lieferländer DE und UK wurde das Feld **Telefon** hinzugefügt.

### Geändert

- Das Design für die Liste der Versandarten in der Kaufabwicklung wurde geändert.

### Behoben

- Die Mengeneingabe in der Einzelansicht eines Artikels, der Warenkorbvorschau und im Warenkorb berücksichtigt nun die Minimal- und Maximalbestellmenge eines Artikels.
- Die Artikelbilder in der Bestellbestätigungsseite werden nun korrekt ausgegeben.

## v1.3.1 (2017-07-24)

### Hinzugefügt

- Das Custom-Event `onVariationChanged` wurde hinzugefügt.
- Bestellmerkmale vom Typ **Text** können nun mit Artikeln verknüpft werden. Diese werden in der Einzelansicht eines Artikels angezeigt (Hinweis: Zurzeit stehen für die Verwendung im Webshop **Ceres** nur Bestellmerkmale vom Typ **Text** zur Verfügung. Auch die Einordnung von Bestellmerkmalen in Merkmalgruppen ist bisher nicht möglich). Weitere Informationen zur Einrichtung von Bestellmerkmalen finden Sie im <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#340" target ="_blank">Handbuch</a> und im <a href="https://forum.plentymarkets.com/t/howto-bestellmerkmale-in-ceres-einrichten/63155" target="_blank">Forum</a>. 
- Beim Anlegen/Editieren von Adressen werden die Felder nun rot markiert, wenn vom Server eine Fehlermeldung für diese Felder kommt. Außerdem werden die Fehler ausgegeben anstatt "Validation errors".

### Behoben

- Wenn im Footer Kategorien verknüpft werden, werden diese nun sprachabhängig geladen.
- Im **Mein Konto**-Bereich wird nun immer die E-Mail-Adresse des eingeloggten Shop-Besuchers angezeigt.

## v1.3.0 (2017-07-13)

### Hinzugefügt

- Die Artikellisten die Ceres bereitstellt, sind nun dynamisch und jede Liste kann frei gesetzt werden.
- Artikel können nun mit Hilfe von Tags in Artikellisten dargestellt werden.
- Cross-Selling-Artikel können nun in Artikellisten dargestellt werden (nur in der Einzelansicht eines Artikels verfügbar).
- In den Adressformularen für die Lieferländer DE und UK wurde das Feld **Titel** hinzugefügt.
- Für die Seitennavigation und die Navigation oben wurde Caching implementiert.
- Es ist nun möglich, den Aufbau der Artikel-URLs analog zum alten Webshop (z.B. Callisto 3.5) anzupassen. Dafür muss die Einstellung **Enable Callisto route pattern for items** im Tab **Global** der Konfiguration von Ceres aktiviert werden.

### Geändert

- Das Design des **In den Warenkorb**-Buttons in der Kategorieansicht wurde geändert.
- Die Suche wird nun mit einer **UND**-Logik ausgeführt und ersetzt damit die vorherige **ODER**-Suche.
- Das Icon für die Suche im Header ändert sich nun zu einem **X**, um dem Webshop-Besucher eindeutiger zu zeigen, wie man die Suche wieder schließt.
- Die mobile Navigation wurde überarbeitet. Sie kann nun leichter bedient werden, da der Button zum Öffnen der Unterkategorien vergrößert wurde.
- Das Addressfeld 2 wurde als Standardwert für das Adressformular des Lieferlandes UK hinzugefügt.
- In der Zahlungsabwicklung wird standardmäßig die erste Adresse aus der Adressliste angezeigt.
- In der Zahlungsabwicklung wird das Lieferland automatisch anhand der Lieferadresse gesetzt.
- In der Zahlungsabwicklung kann man das Lieferland nicht mehr über das Menü im Header ändern.
- Die Kategorieansicht wurde für mobile Geräte überarbeitet.

### Behoben

- Bei Artikeln werden nur noch die für den Mandanten aktivierten Bilder im Webshop angezeigt.
- Die Seitennavigation zeigt nun wieder alle Kategorien sämtlicher Ebenen an.
- In der Zahlungsabwicklung wird beim Wechseln der Lieferadresse nun automatisch die erste erlaubte Zahlungsart gewählt.
- Der Name eines Artikels, der in der Kategorieansicht oder in einer Artikelliste angezeigt wird, wird nicht mehr nach 35 Zeichen abgeschnitten.


## v1.2.10 (2017-07-05)

### Hinzugefügt

- Komplexe Sortierungen von Artikeln sind in Kategorieansicht und Suche über die Einstellung **Empfohlen** möglich. Bis zu drei Sortierwerte können im Tab **Pagination and Sorting** in der Konfiguration von Ceres verkettet werden. Bei aktiver Sortiereinstellung **Recommended** wird im Webshop die empfohlene Sortierung angezeigt.
- Das Design für die Liste der Zahlungsarten in der Kaufabwicklung und beim Ändern der Zahlungsart im **Mein Konto**-Bereich wurde geändert. Eine Zahlungsart kann nun auch einen externen Link anzeigen.
- Der Template-Container `ExtendOverlayButtons` wurde auf dem Overlay des Warenkorbs hinzugefügt.
- Der Template-Container `AdditionalContentAfterButtons` wurde auf der Login-Seite hinzugefügt.
- Der Template-Container `ExtendOverlayButtons` wurde auf dem Overlay der Login-Seite hinzugefügt.

### Geändert

- Im Modal zur Anzeige von Versandkosteninformationen wird nun der Inhalt aus dem Tab **Template** statt des Inhalts aus dem Tab **Beschreibung 1** der verknüpften Kategorie angezeigt. Durch diese Änderung kann nun auch Twig-Code ausgegeben werden.
- In der Artikelansicht werden nun Preise sowie Einheiten nur noch einmal ausgegeben und zur Laufzeit aktualisiert.

### Behoben

- Durch einen Fehler wurde bei automatischer Befüllung des Adressformulars (Browser muss Form Autofill unterstützen) die Hausnummer nicht in das richtige Feld eingetragen.
- Es wurde ein Fehler in der Berechnung von Rabatten behoben.
- Durch einen Formatierungsfehler im Karussell der Vorschaubilder wurde der Rand rechts abgeschnitten. Dies wurde behoben.

## v1.2.9 (2017-06-30)

### Geändert

- Das Design für die Liste der Zahlungsarten in der Kaufabwicklung wurde geändert. Eine Zahlungsart kann nun auch eine Kurzbeschreibung anzeigen.

## v1.2.8 (2017-06-29)

### Hinzugefügt

- Im **Mein Konto**-Bereich kann nun die Zahlungsart eines Auftrags geändert werden, wenn die Zahlungsart dies zulässt.
- Das Bilderkarussell kann nun auch für die Kategorieansicht aktiviert werden.
- Der Template-Container `CategoryItem.SideNavBarBottom` wurde hinzugefügt, um in der Kategorieansicht eigene Inhalte unter der Seitennavigation anzuzeigen.
- Die Artikel werden in der Kategorieansicht mit dem Zusatz "* inkl. ges. MwSt. zzgl. Versandkosten" ausgegeben.
- Ein Modal zur Darstellung der Versandkosten wurde hinzugefügt. Die entsprechende Kategorie kann in der Konfiguration von **Ceres** im Tab **Global** mit dem Modal verknüpft werden.

### Geändert

- Das Bilderkarussell ist in der Einzelansicht eines Artikel nun auch für die Vorschaubilder verfügbar.
- Alle Bilder, die in der Einzelansicht eines Artikels angezeigt werden, werden nun auf eine feste Größe skaliert.
- Artikel sowie Kategorien ohne Übersetzung werden bei Auswahl der entsprechenden Sprache nichtmehr auf der Startseite angezeigt.
- Das Bilderkarussell wurde in der Liste **Zuletzt angesehene Artikel** entfernt.
- Das Bilderkarussell in der Kategorieansicht wird nur noch initialisiert, wenn der Artikel mehr als ein Bild hat.
- Varianten ohne Bestand können nicht mehr in den Warenkorb gelegt werden.
- Varianten ohne Bestand werden beim Aufruf auf die nächste kaufbare Variante umgeleitet.

### Behoben

- In der mobilen Ansicht schließt die Navigation jetzt wenn man die Kategorie wechselt.
- Ein Fehler führte dazu, dass eine gelöschte Adresse nicht aus der Adressliste entfernt wurde. Dies wurde behoben.
- Als Gast kann man im Checkout nur noch eine Rechnungsadresse sowie Lieferadresse speichern.
- In der Einzelansicht werden keine inaktiven Varianten oder Varianten ohne Bestand im Dropdown angezeigt.

## v1.2.7 (2017-06-22)

### Hinzugefügt

- Das Feld **Firma** wird jetzt standardmäßig im Adressformular angezeigt, wenn in der Anrede **Firma** ausgewählt wird.
- Wenn das Feld **Firma** im Tab **Checkout and My account** in der Konfig deaktiviert ist, wird die Option **Firma** in der Anrede ausgeblendet.  

### Geändert

- Die Sortierung nach Preis wurde verbessert.
- Verschiedene Einträge wurden aus den Sortierungsmöglichkeiten der Konfig entfernt.
- Die Bezeichnungen der Sortiermöglichkeiten in der Konfig wurden an die Anzeige im Webshop angepasst.

### Behoben

- Im Adressformular ist bei der Anrede **Herr** vorausgewählt und wird im Dropdown nun auch angezeigt.

## v1.2.6 (2017-06-14)

### Geändert

- Artikel sowie Kategorien ohne Übersetzung werden bei Auswahl der entsprechenden Sprache nichtmehr auf der Startseite angezeigt.

### Behoben

- Auf der Startseite verlinkt der Button **Alle anzeigen** der ersten Kategorieliste auf die richtige Kategorie.
- Es wurde ein Fehler behoben, der bei der Auswahl des Landes im Formular der Rechnungsadresse das Lieferland wechselt.
- Im Checkout ist die Verlinkung auf die AGB nun korrekt.

## v1.2.5 (2017-06-08)

### Hinzugefügt

- In der Auftragsübersicht wird jetzt die Zahlungsart und der Zahlungsstatus angezeigt.
- Es wurde der Template-Container `MyAccount.OrderHistoryPaymentInformation` hinzugefügt, um in der Auftragsübersicht im **Mein Konto**-Bereich zusätzliche Informationen anzuzeigen.

### Geändert

- Das Registrierungs-Overlay schließt sich nun im Fehlerfall nicht mehr.
- In Ceres sind jetzt standardmäßig Webshop-Benachrichtigungen aktiviert.
- Die Optionen der Sortierung für die Kategorieansicht haben neue Übersetzungen.
- Wenn ein Overlay mit Benutzerdaten erneut geöffnet wird, wird die Validierung zurückgesetzt.
- Kategorien ohne Übersetzung werden bei Auswahl der entsprechenden Sprache nicht mehr ausgegeben.

### Behoben

- In der Auftragsübersicht wird der Auftragsstatus wieder angezeigt.
- Es wurde ein Fehler behoben, der in einigen Fällen das Laden von Artikelbildern in der Kategorie-Ansicht verhindert hat.
- Es wurde ein Fehler behoben, der dazu führte, dass die Validierung beim Anlegen einer Adresse nicht durchgeführt wurde.

## v1.2.4 (2017-06-02)

### Hinzugefügt

- In der Kategorieansicht wird bei Artikeln mit Varianten anstatt des "Warenkorb"-Buttons ein Button mit einem Pfeil angezeigt, der in die Einzelansicht des Artikels führt.
- Ein Template-Container wurde hinzugefügt, um die komplette Bestellbestätigungsseite zu überschreiben.
- Der "Nach oben"-Button kann nun unten rechts oder unten mittig angezeigt werden.
- Im Warenkorb kann nun auch der Vorschautext eines Artikels angezeigt werden.
- Ein Template-Container wurde hinzugefügt, um in der Einzelansicht eines Artikels neben der Beschreibung und den technischen Daten weitere Tabs mit Beschreibungstexten oder anderen Inhalten zu ergänzen.
- Die Felder des Adressformulars für das Lieferland **Vereinigtes Königreich** können nun individuell angezeigt und validiert werden.
- Anstelle des angezeigten Overlays nach Klick auf **Zum Warenkorb hinzufügen** kann nun auch die Warenkorbvorschau eingeblendet werden.

### Geändert

- In der Filteransicht wurde das Icon des "Schließen"-Buttons zu einem "x" geändert.
- Die maximale Größe der Anzeige von Artikelinformationen im Warenkorb wurde erhöht ("Mehr"-Button).
- Optionale Adressfelder der Adressformulare sind nicht mehr standardmäßig aktiviert.
- Im Webshop wird nicht mehr der interne Herstellername, sondern der externe Herstellername angezeigt.
- Wenn ein Kunde in den Kassenbereich navigiert und noch keine Adresse hinterlegt hat, öffnet sich automatisch ein Overlay für die Adresseingabe.

### Behoben

- Die Artikelinformationen im Warenkorb wurden nicht angezeigt. Dies wurde behoben.
- Namen von Unterkategorien werden umgebrochen, wenn der Name länger ist, als der Name der Oberkategorie.
- Aufgrund eines Fehlers wurde die Übersetzung des "Mehr/Weniger"-Buttons im Warenkorb nicht angezeigt. Dies wurde behoben.
- Der Abstand zwischen den Hauptkategorien in der Navigation wurde entfernt.
- Auf der Startseite wird in Artikelvorschauen das Bild mit der Position 0 ausgegeben.

### To do

- Um den Herstellernamen im Webshop anzuzeigen, muss bei den Herstellern das Feld **Externer Name** im Menü **Einstellungen » Artikel » Hersteller** befüllt werden.

## v1.2.3 (2017-05-19)

### Hinzugefügt

- Eine konfigurierbare Startseite wurde hinzugefügt. Im Tab **Homepage** der Config von Ceres kann die Startseite eingerichtet werden.
- Die Startseite wurde zudem um 10 Template-Container erweitert, die die Anzeige von eigenen Inhalten ermöglichen. Weitere Informationen zu den Containern unter [Containers on the homepage](http://developers.plentymarkets.com/dev-doc/template-containers#container-homepage).
- Die Adressfelder der Adressformulare in der Kaufabwicklung können einzeln ein- und ausgeblendet sowie validiert werden. Im Tab **Checkout and My account** der Config von Ceres können die Adressfelder eingerichtet werden.

### Behoben

- Es wurde ein Fehler behoben, wodurch die Breadcrumbs/Menüpunkte nicht korrekt funktioniert hatten.
- Es wurde ein Fehler behoben, der dazu führte, dass Artikelbilder nicht richtig nach Position sortiert wurden, wenn eine Variante eigene Bilder hat.

## v1.2.2 (2017-05-11)

### Hinzugefügt

- Die Artikelbilder werden nach ihrer im Backend [festgelegten Position](https://www.plentymarkets.eu/handbuch/artikel/artikel-verwalten/#14-8) sortiert. 

### Behoben

- In einigen Systemen wurde die Gruppierung nach Haupt- und Untervarianten in der Kategorieansicht ignoriert. Dieser Fehler wurde behoben.
- Es wurde ein Fehler behoben, der die Breadcrumbs betraf und in der Browser-Konsole angezeigt wurde.
- Manchmal konnten Benachrichtigungen und Meldungen nicht richtig ausgegeben werden. Dieser Fehler wurde behoben.
- Die Bilder in der Warenkorbvorschau werden nun wieder richtig dargestellt.
- Die Vorschläge der Autovervollständigung von Suchbegriffen berücksichtigen nun die Einstellung der Variantengruppierung.

## v1.2.1 (2017-05-08)

### Hinzugefügt

- Es wurde ein Template-Container hinzugefügt, um das komplette CSS von Ceres zu überschreiben (Template: Override style).

### Geändert

- Die Navigationsleiste oben wurde hinsichtlich Performance und SEO überarbeitet.
- Die Navigationsleiste links wurde hinsichtlich Performance und SEO überarbeitet.
- Die Breadcrumbs wurden hinsichtlich Performance und SEO überarbeitet.
- Die Kategorien wurden weiter für Suchmaschinen optimiert und enthalten nun gültige Informationen über die Paginierung.

### Behoben

- Das Shop-Logo kann wieder angeklickt werden.
- Auftrags- und Zahlungsstatus werden in der Auftragsübersicht wieder angezeigt.
- Die Liste der Filter wird wieder korrekt angezeigt.
- Die Kategorien werden nun mit der korrekten Standardsortierung geöffnet.
- Die Navigation wird nun korrekt ausgegeben, wenn eine Kategorie nur eine Unterkategorie hat.

## v1.2.0 (2017-04-28)

### Hinzugefügt

- Breadcrumbs in der Artikelansicht hinzugefügt.
- Microdata Scheme hinzugefügt.
- OG-Tags hinzugefügt für Social Media, IMessage etc.
- Alternativtexte für Bilder hinzugefügt.

### Behoben

- Artikelverfügbarkeiten werden beim Wechseln der Variante korrekt angezeigt.
- Inhalte auf statischen Seiten laufen nicht mehr aus der Seite raus.
- Artikelnamen werden wieder im Warenkorb angezeigt.
- Filter zeigen wieder Namen an.
- Die Autovervollständigung in der Suche geht wieder.
- Registrierungen mit einer E-Mail-Adresse, für die bereits ein Konto existiert, sind nun nicht mehr möglich.

## v1.1.3 (2017-04-25)

### Behoben

- Artikelverfügbarkeiten funktionieren wieder.

## v1.1.2 (2017-04-24)

### Hinzugefügt

- Ein Back-to-top-Button wurde hinzugefügt.
- Zuletzt gesehene Artikel wurden hinzugefügt und können optional über einen Template-Container verknüpft werden.
- In den Einstellungen im Tab **Item view** unter **Show variations by type** ist es nun möglich, nur Untervarianten von Hauptvarianten anzuzeigen.

### Behoben

- Die Kategorien werden nun für jeden Mandant (Shop) richtig angezeigt.
- Die Kategorien werden in der mobilen Ansicht nun auch in der linken Navigationsleiste korrekt angezeigt.
- Die Einstellungen für das Bilderkarussell in der Kategorieansicht werden nun richtig ausgelesen.
- Es wurde ein Fehler behoben, der dazu führte, dass Kategorien nicht in anderen Sprachen geladen wurden.
- Artikeldaten werden nun auch in anderen Sprachen geladen.
- Die Technischen Daten eines Artikels werden nun richtig ausgegeben.
- Es wird nun der in den Einstellungen gewählte Artikelname (Name 1 bis 3) verwendet.
- In der Artikel-URL wird die Kategorie korrekt ausgegeben.
- Die Warenkorb-Seite zeigt wieder Artikel an.
- Das Styling der Seite **Passwort ändern** wurde an den von Ceres angepasst.
- Beim Laden des Webshops wird der Header nicht mehr ungewöhnlich groß.
- Das Gruppieren nach der Hauptvariante funktioniert nun wieder.
- Kleinere Performance-Verbesserungen.

## v1.1.1 (2017-04-13)

### Behoben

- Das Event `AfterBasketChanged` wird nicht mehr beim Seitenaufruf ausgelöst.
- Das Event `AfterBasketChanged` wird bei einer Aktualisierung des Warenkorbs nur noch einmalig ausgelöst.

## v1.1.0 (2017-04-12)

### Hinzugefügt

- Die Hauptkategorie in der Navigationsleiste ist nun ebenfalls verlinkt und leitet auf die Kategorieansicht weiter.
- Ein Kategoriebaum wurde hinzugefügt, der optional links im Webshop angezeigt werden kann. Diese Einstellung befindet sich in der **Config** im Tab **Header**.
- Verschiedene Ladeanimationen für die Kategorieansicht wurden hinzugefügt. Diese Einstellung befindet sich in der **Config** im Tab **Item view**.

### Geändert

- Die Performance der Kategorien wurde verbessert.
- Das Styling der Kategorien wurde überarbeitet.
- Die Kategorien werden nun in der Kategorieansicht neu geladen ohne die Seite neuzuladen.
- Die Paginierung wurde überarbeitet. In den Einstellungen im Tab **Pagination and sorting** kann man nun die Zeilen und die Reihen wählen der Kategorieansicht wählen. Die Anzeigewerte werden automatisch berechnet und angezeigt. 

## v1.0.5 (2017-04-07)

### Hinzugefügt

- Unterschiedliche Quellen für Firmenlogo hinzugefügt.

## v1.0.4 (2017-04-06)

### Hinzugefügt

- Dateien im Produktivmodus **Productive** werden ab sofort von CloudFront geladen.
- Dateien im Vorschaumodus **Stage** werden nicht mehr gecacht. Weitere Informationen im [Forum](https://forum.plentymarkets.com/t/ladezeiten-verbessert-und-workflow-optimiert/48990).

### Behoben

- Firmenlogo wird nun richtig eingebunden.

## v1.0.3 (2017-03-24)

### Hinzugefügt

- Filter in Suche und Kategorie-Ansicht
- Template-Container **Script.Loader**, um Events und JS zu laden
- Erhalt des Google-Rankings durch Mapping von bestehenden Callisto 3.5-URLs auf die neue **Ceres**-URL-Struktur (Canonical-Tags)

### Geändert

- Neues Image Carousel für Kategorie-Ansicht (konfigurierbar)
- Neues Image Carousel für Artikel-Einzelansicht

### Behoben

- Das Overlay **AddToBasketOverlay** zeigt nun die richtigen Vorschaubilder für Varianten an
- Warenkorb und Warenkorbvorschau zeigen nun die richtigen Vorschaubilder für Varianten an
- Nach dem Wechsel von der Kategorie-Ansicht in eine Artikelansicht werden nun die richtigen Daten gesendet, sobald ein Artikel in den Warenkorb gelegt wird
- Cross-Seller-Verknüpfungen am Artikel verursachen nun keinen internen Fehler mehr
- Ein Fehler in den Template-Containern der Auftragsübersicht wurde behoben

## v1.0.2 (2017-02-23)

### Behoben

- Fehler beim Anzeigen der Artikelbilder in einer Kategorie

## v1.0.1 (2017-02-22)

### Geändert

- Route für Standard-Startseite in `HomepageContent.json` angepasst.
- Die Auftragshistorie wird ausgeblendet, wenn keine Aufträge vorhanden sind.

### Behoben

- Fehler beim Erweitern der Shop-Sprachen behoben. Wenn zusätzliche Sprachdateien im Ordner `resources/lang` [erstellt](https://developers.plentymarkets.com/dev-doc/template-plugins#design-lang) und per [Gulp kompiliert](https://developers.plentymarkets.com/dev-doc/template-plugins#gulp-ceres) wurden, wird das Template nun auch in der gewählten Sprache angezeigt.

## v1.0.0 (2017-02-20)

### Funktionen
- Nutzung moderner Web-Technologien
- zeitgemäßes Design
- extrem schnell
- Integration von ElasticSearch
- kontinuierliche Weiterentwicklung
- beliebig erweiterbar durch Plugins
- frei konfigurierbar