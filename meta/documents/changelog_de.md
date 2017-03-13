# Release Notes für Ceres

## v1.0.2 (2017-02-23)

### Behoben

- Fehler beim Anzeigen der Artikelbilder in einer Kategorie

### Bekannte Probleme

- Adressen können aktuell durch einen sporadischen Fehler nicht editiert werden.
- Das Bundesland wird an der Adresse falsch gespeichert.
- Es ist bisher kein Lieferland standardmäßig vorausgewählt. Beim Anlegen einer Adresse werden Eingabefelder erst nach Auswahl des Lieferlandes angezeigt.

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