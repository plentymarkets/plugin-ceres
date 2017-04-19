# Release Notes für Ceres

## v1.1.1 (2017-04-13)

### Hinzugefügt

- To top button wurde hinzugefügt.

### Behoben

- Das Event `AfterBasketChanged` wird nicht mehr beim Seitenaufruf ausgelöst. 
- Das Event `AfterBasketChanged` wird bei einer Aktualisierung des Warenkorbs nur noch einmalig ausgelöst.
- Wenn die Seitennavigation aktiv ist, werden die Kategorien in Mobile nun richtig angezeigt.
- Die Werte aus der Konfiguration für das ImageCarousel in der Kategorie Ansicht werden nun richtig ausgelesen.
- Es wurde ein Fehler behoben, der dazu führte das Kategorien nicht in anderen Sprachen geladen wurden.
- Artikel-Daten werden nun auch in anderen Sprachen geladen.

### Bekannte Probleme

- Adressen können aktuell durch einen sporadischen Fehler nicht editiert werden.
- Das Bundesland wird an der Adresse falsch gespeichert.
- Es ist bisher kein Lieferland standardmäßig vorausgewählt. Beim Anlegen einer Adresse werden Eingabefelder erst nach Auswahl des Lieferlandes angezeigt.

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