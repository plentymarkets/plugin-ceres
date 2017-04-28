# Ceres – Der neue Webshop für plentymarkets 7

<div class="container-toc"></div>

**Ceres** ist das offizielle Template-Plugin für den Standard-Webshop von plentymarkets 7. Im neuen Webshop für plentymarkets 7 sind Design und Logik voneinander getrennt. Der Webshop wird über zwei Plugins in Ihrem plentymarkets System eingebunden. Das Plugin **Ceres** beinhaltet das Standard-Design des Webshops und kann nach Ihren Wünschen angepasst werden. Das Plugin **Io** beinhaltet die Webshop-Logik, stellt eine allgemeine Grundlage für alle Design-Plugins dar und kann auch von anderen Plugins verwendet werden. In diesem User Guide erfahren Sie, wie Sie <a href="#10.">Ceres einrichten</a> und wie Sie <a href="#20.">Ceres individualisieren</a>.

## Ceres in plentymarkets einrichten<a id="10."></a>

Sie können Einstellungen am Design vornehmen, die keine Programmierkenntnisse voraussetzen. Gehen Sie wie im Folgenden beschrieben vor, um Einstellungen an Ihrem Design vorzunehmen.

<div class="alert alert-danger" role="alert">
    Wenn Sie das Webshop-Plugin <b>Ceres</b> in <b>Productive</b> bereitstellen, ist der normale plentymarkets Webshop nicht mehr erreichbar, da <b>Ceres</b> die URL des Webshops übernimmt.
</div>

### Standard-Startseite deaktivieren

**Ceres** wird mit einer Standard-Startseite ausgeliefert. Deaktivieren Sie diese Startseite, um eigene Inhalte auf der Startseite anzeigen zu können.

##### Standard-Startseite deaktivieren:

1. Öffnen Sie das Menü **Start » Plugins**.<br /> → Die Plugin-Übersicht wird geöffnet.
2. Klicken Sie auf **Ceres**.<br /> → Das Plugin wird in einem neuen Tab geöffnet.
3. Klicken Sie im Verzeichnisbaum auf **Konfiguration**.<br /> → Das Tab **Homepage** ist bereits vorausgewählt.
4. Deaktivieren Sie die Einstellung **Show default homepage**.
5. **Speichern** Sie die Einstellungen.<br /> → Die Standard-Startseite wird deaktiviert.


### Header und Footer anpassen

Individualisieren Sie Header und Footer Ihres Designs. Zeigen Sie Ihr eigenes Logo an und gestalten Sie Footer-Inhalte nach Ihren Wünschen. Mit Webshop-Features z.B. heben Sie Besonderheiten Ihres Webshops wie kostenlosen Versand hervor.

##### Header und Footer anpassen:

1. Öffnen Sie das Menü **Start » Plugins**.<br /> → Die Plugin-Übersicht wird geöffnet.
2. Klicken Sie auf **Ceres**.<br /> → Das Plugin wird in einem neuen Tab geöffnet.
3. Klicken Sie im Verzeichnisbaum auf **Konfiguration**.
4. Wechseln Sie in das Tab **Header** bzw. **Footer**.
5. Nehmen Sie die Einstellungen vor. Beachten Sie dazu die Erläuterungen in Tabelle 1.
6. **Speichern** Sie die Einstellungen.

<table>
<thead>
<tr>  
<th>Einstellung</th>
<th>Erläuterung</th> 
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" class="th">Tab: Header</td>  
</tr>   
<tr>
<td><b>URL to your company logo</b></td>  
<td>URL des Firmenlogos eingeben. Das Firmenlogo kann z.B. im Menü <strong>CMS » Webspace</strong> im Ordner <strong>layout</strong> hochgeladen werden. Alternativ eine http-URL eingeben, die zum Logo-Bild führt.</td>
</tr>
<tr>
<td><b>Name of your store</b></td>  
<td>Namen des Webshops eingeben. Der Name wird als Seitentitel für den Webshop verwendet.</td>
</tr>
<tr>
<td><b>Position of the navigation bar</b></td>  
<td>Position wählen, an der die Navigationsleiste im Webshop angezeigt wird.<br /> <strong>At the top</strong> = Navigationsleiste im Webshop oben anzeigen.<br /> <strong>On the left</strong> = Navigationsleiste im Webshop links anzeigen.<br /> <strong>At the top and on the left</strong> = Navigationsleiste im Webshop oben und links anzeigen.</td>
</tr>
<tr>
<td><b>Fix the navigation bar at the top of the page</b></td>  
<td>Aktivieren, um die Navigationsleiste im Webshop oben zu fixieren.</td>
</tr>
<tr>
<td colspan="2" class="th">Tab: Footer</td>  
</tr>  
<tr>
<td><b>Number of store features</b></td>  
<td>Anzahl der Features wählen, die im Footer des Webshops angezeigt werden.<br /> <strong>0</strong> = Keine Features im Webshop anzeigen.<br /> <strong>1</strong> = Nur das erste Feature im Footer anzeigen.<br /> <strong>2</strong> = Erstes und zweites Feature im Footer anzeigen.<br /> <strong>3</strong> = Alle drei Features im Footer anzeigen.</td>
</tr>
<tr>
<td><b>Text of first store feature</b>;<br /> <b>Text of second store feature</b>;<br /> <b>Text of third store feature</b></td>  
<td>Text für ein Webshop-Feature eingeben, der rechts neben einem grünen Häkchen im Footer angezeigt wird.</td>
</tr>
<tr>
<td><b>Number of columns</b></td>  
<td>Anzahl der Spalten wählen, die im Footer des Webshops angezeigt werden.<br /> <strong>1</strong> = Nur die erste Spalte im Footer anzeigen.<br /> <strong>2</strong> = Erste und zweite Spalte im Footer anzeigen.<br /> <strong>3</strong> = Alle drei Spalten im Footer anzeigen.</td>
</tr>
<tr>
<td><b>Title of first column</b></td>  
<td>Titel der ersten Spalte eingeben, die im Footer des Webshops angezeigt wird.</td>
</tr>
<tr>
<td><b>List of category IDs to display in first column</b></td>  
<td>IDs der Kategorien vom Typ <strong>Content</strong> eingeben, die in der ersten Spalte im Footer des Webshops angezeigt werden.<br /> <b><i>Hinweis:</i></b> Mehrere IDs kommasepariert eingeben.</td>
</tr>
<tr>
<td><b>Title of second column</b></td>  
<td>Titel der zweiten Spalte eingeben, die im Footer des Webshops angezeigt wird.</td>
</tr>
<tr>
<td><b>List of category IDs to display in second column</b></td>  
<td>IDs der Kategorien vom Typ <strong>Content</strong> eingeben, die in der zweiten Spalte im Footer des Webshops angezeigt werden.<br /> <b><i>Hinweis:</i></b> Mehrere IDs kommasepariert eingeben.</td>
</tr>
<tr>
<td><b>Title of third column</b></td>  
<td>Titel der dritten Spalte eingeben, die im Footer des Webshops angezeigt wird.</td>
</tr>
<tr>
<td><b>List of category IDs to display in third column</b></td>  
<td>IDs der Kategorien vom Typ <strong>Content</strong> eingeben, die in der dritten Spalte im Footer des Webshops angezeigt werden.<br /> <b><i>Hinweis:</i></b> Mehrere IDs kommasepariert eingeben.</td>
</tr>
</tbody>
<caption>Tab. 1: Header und Footer anpassen</caption>
</table>

### Artikelansicht anpassen

Im Tab **Item view** passen Sie das Aussehen der Artikelansicht an. Wählen Sie, welcher Artikelname und welche Artikelinformationen im Webshop angezeigt werden. Wählen Sie zudem, welche Artikelvarianten in der Artikelübersicht angezeigt werden.

##### Artikelansicht anpassen:

1. Öffnen Sie das Menü **Start » Plugins**.<br /> → Die Plugin-Übersicht wird geöffnet.
2. Klicken Sie auf **Ceres**.<br /> → Das Plugin wird in einem neuen Tab geöffnet.
3. Wechseln Sie in das Tab **Item view**.
4. Nehmen Sie die Einstellungen vor. Beachten Sie dazu die Erläuterungen in Tabelle 2.
5. **Speichern** Sie die Einstellungen.

<table>
<thead>
<tr>  
<th>Einstellung</th>
<th>Erläuterung</th> 
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" class="th">Tab: Item view</td>  
</tr> 
<tr>
<td><b>Item name</b></td>  
<td><strong>Name 1</strong>, <strong>Name 2</strong> oder <strong>Name 3</strong> wählen. Texte für die Felder werden im Tab <strong><a href="{% Link(3177) %}#50.">Texte</a></strong> eines Artikels gespeichert. Wenn <strong>Name 2</strong> oder <strong>Name 3</strong> gewählt wurde, aber kein Name im Textfeld gespeichert wurde, wird <strong>Name 1</strong> als Artikelname verwendet.</td>
</tr>
<tr>
<td><b>Show item information</b></td>  
<td>Eine, mehrere oder <strong>ALLE</strong> Artikelinformationen wählen, um die Informationen in der Einzelansicht eines Artikels im Webshop anzuzeigen.<br /> <strong>Condition</strong> = Aktivieren, um den Artikelzustand anzuzeigen.<br /> <strong>Manufacturer</strong> = Aktivieren, um den Hersteller anzuzeigen.<br /> <strong>Manufacturing country</strong> = Aktivieren, um das Herstellungsland anzuzeigen.<br /> <strong>Age rating</strong> = Aktivieren, um die Altersfreigabe anzuzeigen.<br /> <strong>Item ID</strong> = Aktivieren, um die Artikel-ID anzuzeigen.<br /> <strong>Technical data</strong> = Aktivieren, um das Tab <strong>Technische Daten</strong> anzuzeigen. Wenn Sie die Anzeige der <strong>Technischen Daten</strong> aktivieren, aber keinen Text unter <strong>Technische Daten</strong> im Tab <strong><a href="{% Link(3177) %}#50.">Texte</a></strong> eines Artikels speichern, wird das Tab nicht angezeigt.<br /> <strong>Description</strong> = Aktivieren, um das Tab <strong>Beschreibung</strong> anzuzeigen. Wenn Sie die Anzeige der <strong>Beschreibung</strong> aktivieren, aber keinen Text unter <strong>Beschreibung</strong> im Tab <strong><a href="{% Link(3177) %}#50.">Texte</a></strong> eines Artikels speichern, wird das Tab nicht angezeigt.<br /> <strong>Preview text</strong> = Aktivieren, um den Vorschautext anzuzeigen.<br /> <strong>Strikethrough price</strong> = Aktivieren, um den Streichpreis neben dem Artikelpreis anzuzeigen.<br /> <strong>Variation name</strong> = Aktivieren, um den Variantennamen anzuzeigen.<br /><!--strong>Variation number</strong> = Aktivieren, um die Variantennummer anzuzeigen.<br /--> <strong>External variation ID</strong> = Aktivieren, um die externe Varianten-ID anzuzeigen.<br /> <strong>Model</strong> = Aktivieren, um das Modell anzuzeigen.<br /> <strong>Dimensions</strong> = Aktivieren, um die Artikelmaße anzuzeigen.<br /> <strong>Customs tariff number</strong> = Aktivieren, um die Zolltarifnummer anzuzeigen.<br /> <strong>Net weight</strong> = Aktivieren, um das Nettogewicht anzuzeigen.<br /> <strong>Gross weight</strong> = Aktivieren, um das Bruttogewicht anzuzeigen.<br /> <strong>Content</strong> = Aktivieren, um den Artikelinhalt anzuzeigen.</td>
</tr>
<tr>
<td><b>Store specials: Number of decimal places for discounts</b></td>  
<td>Anzahl der Dezimalstellen für den Rabatt wählen, der in der Artikelliste am Artikel angezeigt wird.</td>
</tr>
<tr>
<td><b>Show variations by type</b></td>  
<td>Varianten nach Typ in der Artikelliste einer Kategorie anzeigen.<br /> <strong>All</strong> = Wählen, um Hauptvarianten und Varianten von Artikeln anzuzeigen.<br /> <strong>Only main variations</strong> = Wählen, um nur Hauptvarianten anzuzeigen.<br /> <strong>Only child variations</strong> = Wählen, um nur Varianten anzuzeigen. Hauptvarianten werden ausgeblendet.</td>
</tr>
<tr>
<td><b>Show image carousel dots in category item list</b></td>  
<td>Aktivieren, um unterhalb des Bilderkarussells eines Artikels in der Kategorieansicht Punkte anzuzeigen.</td>
</tr>
<tr>
<td><b>Show image carousel navigation in category item list</b></td>  
<td>Aktivieren, um im Bilderkarussell eines Artikels in der Kategorieansicht Navigationspfeile anzuzeigen.</td>
</tr>
<tr>
<td><b>Loading animation</b></td>  
<td>Ladeanimation für die Kategorieansicht wählen.<br /> <strong>Blur</strong> = Die Kategorieansicht wird beim Laden kurz verschwommen dargestellt.<br /> <strong>Bars</strong> = Beim Laden der Kategorienansicht wird eine Ladeanimation mit Balken angezeigt.<br /> <strong>Spinner</strong> = Beim Laden der Kategorieansicht wird eine Ladeanimation mit Spinner angezeigt.</td>
</tr>
<tr>
<td colspan="2" class="th">Tab: Item lists</td>  
</tr>
 <tr>
<td><b>Number of last seen items</b></td>  
<td>Anzahl der zuletzt gesehenen Artikel wählen.</td>
</tr>
</tbody>
<caption>Tab. 2: Artikelansicht anpassen</caption>
</table>

### Warenkorb anpassen

Im Tab **Shopping cart** nehmen Sie Änderungen an den Anzeigeoptionen des Warenkorbs vor. Wählen Sie Artikel- und Preisinformationen, die im Warenkorb angezeigt werden, und passen Sie die Warenkorbvorschau an.


##### Warenkorb anpassen:

1. Öffnen Sie das Menü **Start » Plugins**.<br /> → Die Plugin-Übersicht wird geöffnet.
2. Klicken Sie auf **Ceres**.<br /> → Das Plugin wird in einem neuen Tab geöffnet.
3. Wechseln Sie in das Tab **Shopping cart**.
4. Nehmen Sie die Einstellungen vor. Beachten Sie dazu die Erläuterungen in Tabelle 3.
5. **Speichern** Sie die Einstellungen.

<table>
<thead>
<tr>  
<th>Einstellung</th>
<th>Erläuterung</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Show item information</b></td>  
<td>Eine, mehrere oder <strong>ALLE</strong> Artikelinformationen wählen, um die Informationen in der Artikelübersicht im Warenkorb anzuzeigen.<br /> <strong>Item ID</strong> = Aktivieren, um die Artikel-ID anzuzeigen.<br /> <strong>Description</strong> = Aktivieren, um die Artikelbeschreibung anzuzeigen. Wenn Sie die Anzeige der <strong>Beschreibung</strong> aktivieren, aber keinen Text unter <strong>Beschreibung</strong> im Tab <strong><a href="{% Link(3177) %}#50.">Texte</a></strong> eines Artikels speichern, wird die Artikelbeschreibung nicht angezeigt.<br /> <strong>Availability</strong> = Aktivieren, um die Verfügbarkeit anzuzeigen.<br /> <strong>Variation number</strong> = Aktivieren, um die Variantennummer anzuzeigen.<br /> <strong>Condition</strong> = Aktivieren, um den Artikelzustand anzuzeigen.
</tr>
 <tr>
<td><b>Show price information</b></td>  
<td>Eine, mehrere oder <strong>ALLE</strong> Preisinformationen wählen, um die Informationen im Warenkorb anzuzeigen.<br />
<strong>Value of items (Gross)</strong> = Aktivieren, um den Bruttowarenwert anzuzeigen.<br /> <strong>Value of items (Net)</strong> = Aktivieren, um den Nettowarenwert anzuzeigen.<br /> <strong>Shipping (Gross)</strong> = Aktivieren, um die Brutto-Versandkosten anzuzeigen.<br /> <strong>Shipping (Net)</strong> = Aktivieren, um die Netto-Versandkosten anzuzeigen.<br /> <strong>VAT</strong> = Aktivieren, um die Mehrwertsteuer anzuzeigen.<br /> <strong>Total (Gross)</strong> = Aktivieren, um die Brutto-Gesamtsumme anzuzeigen.<br /> <strong>Total (Net)</strong> = Aktivieren, um die Netto-Gesamtsumme anzuzeigen.</td>
</tr>
<tr>
<td><b>Show basket preview information</b></td>  
<td>Eine, mehrere oder <strong>ALLE</strong> Preisinformationen wählen, um die Informationen in der Warenkorbvorschau anzuzeigen.<br /> <strong>Value of items (Gross)</strong> = Aktivieren, um den Bruttowarenwert anzuzeigen.<br /> <strong>Value of items (Net)</strong> = Aktivieren, um den Nettowarenwert anzuzeigen.<br /> <strong>Shipping (Gross)</strong> = Aktivieren, um die Brutto-Versandkosten anzuzeigen.<br /> <strong>Shipping (Net)</strong> = Aktivieren, um die Netto-Versandkosten anzuzeigen.<br /> <strong>VAT</strong> = Aktivieren, um die Mehrwertsteuer anzuzeigen.<br /> <strong>Total (Gross)</strong> = Aktivieren, um die Brutto-Gesamtsumme anzuzeigen.<br /> <strong>Total (Net)</strong> = Aktivieren, um die Netto-Gesamtsumme anzuzeigen.</td>
</tr>    
<tr>
<td><b>Show Change variation button</b></td>  
<td>Aktivieren, um den <strong>Variante ändern</strong>-Button in der Artikelübersicht im Warenkorb anzuzeigen. Beim Klick auf <strong>Variante ändern</strong> können Kunden die Artikelvariante im Warenkorb ändern. Wenn Sie den <strong>Variante ändern</strong>-Button aktivieren, aber keine Varianten des Artikels vorhanden sind, wird der Button nicht angezeigt.</td>
</tr>    
 <tr>
<td><b>Add to shopping cart: Show overlay</b></td>  
<td>Aktivieren, um ein Overlay des Warenkorbs nach Klick auf den <strong>In den Warenkorb</strong>-Button anzuzeigen.</td>
</tr>
</tbody>
<caption>Tab. 3: Warenkorb anpassen</caption>
</table>

### Paginierung und Sortierung anpassen

Im Tab **Pagination and sorting** passen Sie die Paginierung der Artikelübersicht und die Sortierung von Artikeln im Webshop an.


##### Paginierung und Sortierung anpassen:

1. Öffnen Sie das Menü **Start » Plugins**.<br /> → Die Plugin-Übersicht wird geöffnet.
2. Klicken Sie auf **Ceres**.<br /> → Das Plugin wird in einem neuen Tab geöffnet.
3. Wechseln Sie in das Tab **Pagination and sorting**.
4. Nehmen Sie die Einstellungen vor. Beachten Sie dazu die Erläuterungen in Tabelle 4.
5. **Speichern** Sie die Einstellungen.

<table>
<thead>
<tr>  
<th>Einstellung</th>
<th>Erläuterung</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Pagination position</b></td>  
<td>Position für die Paginierung wählen.<br /> <strong>Top</strong> = Paginierung oberhalb der Artikelliste anzeigen.<br /> <strong>Bottom</strong> = Paginierung unterhalb der Artikelliste anzeigen.<br /> <strong>Top and bottom</strong> = Paginierung oberhalb und unterhalb der Artikelliste anzeigen.</td>
</tr>
<tr>
<td><b>Always show first page</b></td>  
<td>Aktivieren, um die erste Seite in der Paginierung immer anzuzeigen.</td>
</tr>  
<tr>
<td><b>Always show last page</b></td>  
<td>Aktivieren, um die letzte Seite in der Paginierung immer anzuzeigen.</td>
</tr>
<tr>
<td><b>Columns per page</b></td>  
<td>Anzahl der Spalten wählen, die als Berechnungsgrundlage für das Dropdown-Menü <strong>Artikel pro Seite</strong> genutzt wird.</td>
</tr>  
<tr>
<td><b>Rows per page</b></td>  
<td>Einen, mehrere oder alle Zahlenwerte aktivieren. Die aktivierten Werte werden mit den Spalten multipliziert und im Dropdown-Menü <strong>Artikel pro Seite</strong> in der Artikelübersicht angezeigt.</td>
</tr>  
<tr>
<td><b>Enable item sorting by</b></td>
<td>Eine, mehrere oder <strong>ALLE</strong> Sortieroptionen für die Artikelsortierung aktivieren.<br /> <strong>Item ID (ascending)</strong> = Artikel aufsteigend nach Artikel-ID sortieren.<br /> <strong>Item ID (descending)</strong> = Artikel absteigend nach Artikel-ID sortieren.<br /> <strong>Item name (ascending)</strong> = Artikel alphabetisch aufsteigend nach Artikelname sortieren.<br /> <strong>Item name (descending)</strong> = Artikel alphabetisch absteigend nach Artikelname sortieren.<br /> <strong>Item position (ascending)</strong> = Artikel mit der höchsten Positionsnummer zuerst anzeigen.<br /> <strong>Item position (descending)</strong> = Artikel mit der niedrigsten Positionsnummer zuerst anzeigen.<br /> <b><i>Wichtig</i></b>: Eine Bedingung für die Funktion ist, dass bei den Artikelvarianten jeweils eine Position im Tab der Variante hinterlegt ist.<br /> <strong>Price (ascending)</strong> = Artikel mit dem niedrigsten Preis zuerst anzeigen.<br /> <strong>Price (descending)</strong> = Artikel mit dem höchsten Preis zuerst anzeigen.<br /> <strong>Customer feedback (ascending)</strong> = Artikel mit der niedrigsten Kundenbewertung zuerst anzeigen.<br /> <strong>Customer feedback (descending)</strong> = Artikel mit der höchsten Kundenbewertung zuerst anzeigen.<br /> <strong>Newest variation</strong> = Neueste Artikelvarianten zuerst anzeigen.<br /> <strong>Oldest variation</strong> = Älteste Artikelvarianten zuerst anzeigen.<br /> <strong>Variation ID (ascending)</strong> = Artikelvarianten aufsteigend nach Varianten-ID sortieren.<br /> <strong>Variation ID (descending)</strong> = Artikelvarianten absteigend nach Varianten-ID sortieren.<br /> <strong>Variation number (ascending)</strong> = Artikelvarianten aufsteigend nach Variantennummer sortieren.<br /> <strong>Variation number (descending)</strong> = Artikelvarianten absteigend nach Variantennummer sortieren.<br /> <strong>Last variation update</strong> = Zuletzt aktualisierte Artikelvariante zuerst anzeigen.<br /> <strong>First variation update</strong> = Zuerst aktualisierte Artikelvariante zuerst anzeigen.<br /> <strong>Variation name (ascending)</strong> = Artikelvarianten alphabetisch aufsteigend nach Name sortieren.<br /> <strong>Variation name (descending)</strong> = Artikelvarianten alphabetisch absteigend nach Name sortieren.<br /> <strong>Variation position (ascending)</strong> = Artikelvariante mit der höchsten Positionsnummer zuerst anzeigen.<br /> <strong>Variation position (descending)</strong> = Artikelvariante mit der niedrigsten Positionsnummer zuerst anzeigen.<br /> <b><i>Wichtig</i></b>: Eine Bedingung für die Funktion ist, dass bei den Artikelvarianten jeweils eine Position im Tab der Variante hinterlegt ist.<br /> <strong>Active variation (ascending)</strong> = Aktive Artikelvarianten aufsteigend sortieren.<br /> <strong>Active variation (descending)</strong> = Aktive Artikelvarianten absteigend sortieren.<br /> <strong>Main variation (ascending)</strong> = Hauptvarianten aufsteigend sortieren.<br /> <strong>Main variation (descending)</strong> = Hauptvarianten absteigend sortieren.<br /> <strong>Manufacturer (ascending)</strong> = Artikel alphabetisch aufsteigend nach Hersteller sortieren.<br /> <strong>Manufacturer (descending)</strong> = Artikel alphabetisch absteigend nach Hersteller sortieren.<br /> <strong>Random items</strong> = Artikel bei jedem Aufruf in einer anderen, zufälligen Sortierung anzeigen.
</td>
</tr>
<tr>
<td><b>Default item sorting by</b></td>  
<td>Eintrag wählen, der standardmäßig bei der Artikelsortierung voreingestellt ist.</td>
</tr>
</tbody>
<caption>Tab. 4: Paginierung und Sortierung anpassen</caption>
</table>

### Mein Konto anpassen

Im Tab **My account** nehmen Sie Einstellungen für den **Mein Konto**-Bereich des Webshops vor.

##### Mein Konto anpassen:

1. Öffnen Sie das Menü **Start » Plugins**.<br /> → Die Plugin-Übersicht wird geöffnet.
2. Klicken Sie auf **Ceres**.<br /> → Das Plugin wird in einem neuen Tab geöffnet.
3. Wechseln Sie in das Tab **My account**.
4. Geben Sie die Anzahl von Aufträgen an, die Sie in der Auftragshistorie pro Seite darstellen wollen.
5. **Speichern** Sie die Einstellungen.

### Einstellungen für Plugin-Entwickler

In den Tabs **Registration** und **Logging and performance** stehen insbesondere für Plugin-Entwickler Einstellungsmöglichkeiten zur Verfügung. Hier stellen Sie beispielsweise ein, welche Informationen bei der Plugin-Entwicklung protokolliert werden sollen und welchen Modus Sie für den Webshop verwenden möchten.

##### Einstellungen für die Plugin-Entwicklung vornehmen:

1. Öffnen Sie das Menü **Start » Plugins**.<br /> → Die Plugin-Übersicht wird geöffnet.
2. Klicken Sie auf **Ceres**.<br /> → Das Plugin wird in einem neuen Tab geöffnet.
3. Wechseln Sie in das Tab **Registration** bzw. **Logging and performance**.
4. Nehmen Sie die Einstellungen vor. Beachten Sie dazu die Erläuterungen in Tabelle 5.
5. **Speichern** Sie die Einstellungen.

<table>
<thead>
<tr>  
<th>Einstellung</th>
<th>Erläuterung</th> 
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" class="th">Tab: Registration</td>  
</tr> 
<tr>
<td><b>The RegEx used for the email</b></td>  
<td>Reguläre Ausdrücke für E-Mail-Validierung eingeben.</td>
</tr>
<tr>
<td><b>The RegEx used for the password</b></td>  
<td>Reguläre Ausdrücke für Passwort-Validierung eingeben.</td>
</tr>
<tr>
<td colspan="2" class="th">Tab: Logging and performance</td>  
</tr> 
<tr>
<td><b>Enable logging options</b></td>  
<td>Eine, mehrere oder <strong>ALLE</strong> Logging-Optionen aktivieren.<br /> <strong>Print errors</strong> = Fehlermeldungen im Webshop ausgeben.<br /> <strong>Print success</strong> = Erfolgsmeldungen im Webshop ausgeben.<br /> <strong>Print warnings</strong> = Warnungen im Webshop ausgeben.<br /> <strong>Print information</strong> = Informationen im Webshop ausgeben.<br /> <strong>Print stack trace</strong> = Stack trace ausgeben.<br /> <strong>Log messages</strong> = Meldungen loggen.<br /> <strong>Show error codes</strong> = Fehler-Codes anzeigen.</td>
</tr>
<tr>
<td><b>Performance level</b></td>  
<td>Performance-Level wählen.<br /> <strong>Live</strong> = Live-Modus wählen, wenn der Webshop produktiv verwendet wird. Dateien werden minimiert und gebündelt.<br /> <strong>Development</strong> = Entwicklungsmodus wählen, um Debugging-Funktionen nutzen zu können. Dateien werden nicht minimiert und gebündelt.</td>
</tr>
</tbody>
<caption>Tab. 5: Einstellungen für die Plugin-Entwicklung vornehmen</caption>
</table>

### Artikellisten verknüpfen

Artikellisten, wie z.B. **Zuletzt gesehene Artikel**, verknüpfen Sie bequem über Template-Container an der gewünschten Stelle in Ihrem Webshop. Gehen Sie wie im Folgenden beschrieben vor, um die Artikelliste für zuletzt gesehene Artikel in der Einzelansicht eines Artikels im Webshops zu verknüpfen.

##### Artikelliste verknüpfen:

1. Klicken Sie auf **Start » Plugins**.
2. Wechseln Sie in das Tab **Content**. 
3. Wählen Sie den Bereich **Last seen items**.
4. Wählen Sie einen, mehrere oder **ALLE** Container, in denen Sie die Artikelliste anzeigen möchten, z.B. **Single item: Container for item lists**.
5. **Speichern** Sie die Einstellungen.<br /> → Die Artikelliste wird im gewählten Container im Webshop angezeigt.

### Webshop-Sprachen einstellen

**Ceres** steht standardmäßig in Deutsch und Englisch zur Verfügung. Diese Sprachen wählen Sie im Header-Bereich des Webshops aus. **Ceres** unterstützt zudem alle plentymarkets Systemsprachen. So können Sie Ihren Webshop und Ihre Artikel in weitere Sprachen übersetzen. Spracheinstellungen nehmen Sie im plentymarkets Backend vor.

##### Webshop-Sprachen einstellen:

1. Öffnen Sie das Menü **Einstellungen » Mandant (Shop) » Standard » Webshop » Multilingualismus**.
2. Wählen Sie unter **Sprachen** weitere Sprachen mit gedrückter Umschalt-Taste.
3. **Speichern** Sie die Einstellungen. <br /> → Die gewählten Sprachen werden in der Sprachauswahl Ihres Webshops angezeigt.

### Rechtliche Angaben speichern

Für rechtliche Angaben stehen Ihnen in Ceres passende Templates zur Verfügung, in denen Sie Rechtstexte in den verschiedenen Sprachen anzeigen können. Unter **Rechtliche Angaben** speichern Sie Ihre **AGB**, die **Widerrufsbelehrung**, die **Datenschutzerklärung** und das **Impressum** für Ihren Webshop. 

##### AGB als Klartext eingeben:

1. Öffnen Sie das Menü **Einstellungen » Mandant (Shop) » Standard » Webshop » Rechtliche Angaben**.
2. Klappen Sie die **Sprache** auf.
3. Wechseln Sie in das Tab **AGB**.
4. Öffnen Sie das Tab **Text**.
5. Geben Sie den Text für Ihre AGB ein.
6. **Speichern** Sie die Einstellungen.

Alternativ speichern Sie Ihre Rechtstexte im HTML-Format. Nutzen Sie hierfür die Funktionen des HTML-Editors oder geben Sie das HTML als **Quellcode** ein.

##### AGB im HTML-Format eingeben:

1. Öffnen Sie das Menü **Einstellungen » Mandant (Shop) » Standard » Webshop » Rechtliche Angaben**.
2. Klappen Sie die **Sprache** auf.
3. Wechseln Sie in das Tab **AGB**.
4. Öffnen Sie das Tab **HTML**.
5. Wenn Sie den Text als HTML-Code eingeben möchten, klicken Sie auf **Quellcode**.
5. Geben Sie den formatierten Text für Ihre AGB ein.
6. **Speichern** Sie die Einstellungen.

Geben Sie die Texte für die **Widerrufsbelehrung**, die **Datenschutzerklärung** und das **Impressum** analog in den gewünschten Sprachen ein. Die Texte werden in **Ceres** auf den zugehörigen Seiten angezeigt.

### Filter einrichten

Im Webshop **Ceres** richten Sie Filter für die Suche sowie für die Kategorie-Ansicht mit Hilfe von Facetten vom Typ **Attribut/Merkmal** ein.

Richten Sie dazu zunächst Attribute und Merkmale ein und verknüpfen diese mit Ihren Artikeln. Weitere Informationen zu Attributen finden Sie unter [Attribute verwalten](https://www.plentymarkets.eu/handbuch/artikel/artikel-verwalten/#1).
Weitere Informationen zu Merkmalen finden Sie unter [Merkmale verwalten](https://www.plentymarkets.eu/handbuch/artikel/artikel-verwalten/#2).

Anschließend erstellen Sie passende Facetten für Attribute und Merkmale. Weitere Informationen zu Facetten finden Sie unter [Facetten anlegen](https://www.plentymarkets.eu/handbuch/mandant-shop/globale-einstellungen/externe-dienste/facettensuche/#2-1).
Eine ausführliche Anleitung zur Einrichtung von Filtern finden Sie auch in unserem [Forum](https://forum.plentymarkets.com/t/howto-filter-in-ceres-einrichten/46679).

## Ceres individualisieren<a id="20."></a>

Ihnen stehen verschiedene Möglichkeiten zur Verfügung, um das Template-Plugin **Ceres** zu individualisieren und an Ihre Bedürfnisse anzupassen.

### Eigenes Template erstellen

**Ceres** steht als öffentliches Projekt auf [GitHub](https://github.com/plentymarkets/plugin-ceres) zur Verfügung. Den Plugin-Code können Sie als Vorlage nutzen, um Ihr eigenes Template-Plugin zu erstellen. Beachten Sie folgende Punkte, um ein eigenes Template auf Basis von **Ceres** zu erstellen:
 
* Bei [GitHub](https://github.com/join?source=header-home) registrieren
* Projekt [Ceres](https://github.com/plentymarkets/plugin-ceres) öffnen
* Eigenen Fork des Projekts erstellen
* Quellcode anpassen
 
 Wie Sie den Quellcode anpassen, erfahren Sie in unserem [Template Guide](https://developers.plentymarkets.com/dev-doc/template-plugins).
 
<div class="alert alert-warning" role="alert">
    Beachten Sie, dass Sie Ihr eigenes Template manuell aktualisieren müssen, wenn Sie Funktionen aus einer neuen Version des Plugins <strong>Ceres</strong> nutzen möchten. Automatische Plugin-Aktualisierungen stehen in plentymarkets nur für Plugins von plentyMarketplace zur Verfügung.
</div>

### Theme in plentyMarketplace kaufen

Theme-Plugins bieten eine einfachere Möglichkeit **Ceres** nach Ihren Wünschen optisch anzupassen. In plentyMarketplace finden Sie bereits verschiedene [Themes](https://marketplace.plentymarkets.com/plugins/themes), die das Aussehen von **Ceres** verändern. Anpassungen am Theme-Plugin wirken sich nicht auf Aktualisierungen des Template-Plugins **Ceres** aus. 

### Eigenes Theme erstellen

In unserem [Theme Guide](https://developers.plentymarkets.com/dev-doc/theme-plugins) finden Sie ausführliche Infomationen darüber, wie Sie Ihr eigenes Theme-Plugin erstellen und **Ceres** damit vollständig individualisieren. 

## Lizenz

Das gesamte Projekt unterliegt der GNU AFFERO GENERAL PUBLIC LICENSE – weitere Informationen finden Sie in der [LICENSE.md](https://github.com/plentymarkets/plugin-ceres/blob/stable/LICENSE.md).
