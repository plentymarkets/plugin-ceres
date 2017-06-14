# Release Notes für Ceres

## v1.2.6 (2017-06-14)

### Geändert

- Artikel sowie Kategorien ohne Übersetzung werden bei Auswahl der entsprechenden Sprache nichtmehr auf der Startseite angezeigt.

### Behoben

- Auf der Startseite verlinkt der Button **Alle anzeigen** der ersten Kategorieliste auf die richtige Kategorie.
- Es wurde ein Fehler behoben, der bei der Auswahl des Landes im Formular der Rechnungsadresse das Lieferland wechselt.
- Im Checkout ist die Verlinkung auf die AGB nun korrekt.

### Bekannte Probleme

- Adressen können aktuell durch einen sporadischen Fehler nicht editiert werden.
- Im Adressformular ist bei der Anrede "Herr" vorausgewählt, dies wird im Dropdown aber nicht angezeigt.
- Mit der Suche kann noch nicht nach Variantennummern gesucht werden.
- Nicht aktive Varianten werden in der Einzelansicht des Artikels im Varianten-Dropdown angezeigt, können aber nicht ausgewählt werden.
- Der Name eines Artikels, der in der Kategorieansicht oder in einer Artikelliste angezeigt wird, wird nach 35 Zeichen abgeschnitten und nicht umgebrochen.
- In der mobilen Ansicht bleibt die Navigation geöffnet, wenn man die Kategorie wechselt.
- Artikelkategorien werden auch ohne verküpfte Artikel im Webshop angezeigt.

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