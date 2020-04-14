# Release Notes für Ceres

## v5.0.0 (2020-04-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.6.0...5.0.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Themes und Plugins, die mit älteren Ceres-Versionen kompatibel waren, müssen ggf. aktualisiert werden. Weitere Informationen zum Aktualisieren von Themes und Plugins findest du in der <a href="https://developers.plentymarkets.com/dev-doc/ceres-5" target="_blank" rel="noopener"><b>Entwicklerdokumentation</b></a>.
- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu bereitstellen** aktualisiert werden.
- Nutzer, die bisher die Kategorie **Startseite (veraltet) (Ceres)** im ShopBuilder verwendet haben, müssen eine neue Startseiten-Kategorie anlegen und verknüpfen. Vor dem Update auf Version 5.0 sollte eine Plugin-Set-Kopie gemacht werden, sodass Inhalte der Kategorie **Startseite (veraltet) (Ceres)** später aus dieser Plugin-Set-Kopie in die neu erstellte Startseiten-Kategorie des Ceres 5 Plugin-Sets dupliziert werden können. Andernfalls ist es nicht möglich, auf die bestehenden Startseiten-Inhalte zuzugreifen, ohne die Ceres-Version herabzusetzen.
- Um die "Meinten Sie...?"-Suche nutzen zu können, sollten Nutzer einen neuen Inhalt für Suchergebnisse mithilfe der **Suchergebnisse-Vorlage** des ShopBuilders erstellen und verknüpfen.
- In den Inhalten **Warenkorb**, **Checkout**, **Kontaktseite**, **Mein Konto**, **Bestellbestätigung**, **Retourenseite** und **Wunschliste** wurde der weiße Standard-Hintergrund entfernt. Für diese Inhalte sollten Nutzer jeweils ein weißes Hintergrundbild-Widget hinzufügen, um den vorherigen Stand abzubilden.

### Hinzugefügt

- Diese Version unterstützt <a href="https://knowledge.plentymarkets.com/artikel/anwendungsfaelle/multipacks-pakete-sets#3000" target="_blank">Sets</a>. Das Widget **Bestandteile für Artikelsets** wurde zum ShopBuilder hinzugefügt. Dieses Widget dient dazu, Artikelset-Seiten über den ShopBuilder zu bearbeiten. Die Funktion wird als Beta-Version bereitgestellt.
- Diese Version unterstützt <a href="https://knowledge.plentymarkets.com/auftraege/gutscheine" target="_blank">Verkaufsgutscheine</a>. Verkaufsgutscheine können auf der Bestellbestätigungsseite personalisiert und als PDF-Datei heruntergeladen werden.
- Die drei Widgets **Suchvorschläge**, **Suchergebnisse: Kategorien** und **Suchergebnisse: Artikel** wurden zum ShopBuilder hinzugefügt. Diese können im Suchbereich des Top Bar-Widgets im Header platziert werden.
- Die Schaltfläche für die Suche im Top Bar-Widget kann nun im ShopBuilder geklickt werden, um einen Bereich auszuklappen, in welchem Widgets platziert werden können.
- Bei falsch geschriebenen Suchbegriffen wird nun eine zusätzliche Suche ausgeführt. Auf der Suchergebnisseite wird nun ein alternativer Suchbegriff unter "Meinten Sie...?" vorgeschlagen.
- Die beiden Template-Container `SingleItem.AfterScriptsLoaded` und `SingleItem.Styles` wurden hinzugefügt. Diese können dafür genutzt werden, um Skripte und Stylesheets nur auf der Artikelansicht einzubinden.
- Die beiden Template-Container `Checkout.AfterScriptsLoaded` und `Checkout.Styles` wurden hinzugefügt. Diese können dafür genutzt werden, um Skripte und Stylesheets nur auf Checkout-, Warenkorb-, Mein Konto-, Bestellbestätigungs- und Retourenseiten einzubinden.
- Im Auftragshistorie-Widget wurde eine Schaltfläche hinzugefügt, über die man die Bestellbestätigungsseite des jeweiligen Auftrags öffnen kann. Dadurch ist es möglich, Artikel einer Bestellung auch aus dem Mein Konto-Bereich zu bewerten.
- Auf der Artikeleinzelansicht wird nun das Feld "url" in den Mikrodaten befüllt.
- Die Sortierung der Varianten auf der Artikelkachel in Artikellisten und der Kategorieansicht kann nun über den Ceres-Assistenten eingestellt werden. 
- Der Eintrag **categoryItemFromPrice** wurde zur Mehrsprachigkeits-Oberfläche hinzugefügt. Mit diesem kann in Artikellisten ein "ab" vor dem Preis angezeigt werden, wenn die Artikelkachel die billigste Variante anzeigt und es mehr als eine kaufbare Variante gibt. 

### Geändert

- Das JavaScript und CSS des Webshops wurde in separate Dateien für Kategorie-, Artikel- und Checkout-Seiten aufgeteilt, um die Performance der einzelnen Seiten zu verbessern.
- Um die Ladezeit der Variantenauswahl zu optimieren, werden die Daten der Variantenauswahl ab einer gewissen Anzahl an Varianten nachträglich geladen.
- Die Performance des Sticky Container-Widgets wurde verbessert.
- Die Bibliothek **Moment.js** wurde durch **Day.js** ersetzt, um die Dateigröße zu minimieren.
- Die verwendete Bootstrap-Version wurde auf Version 4.4.1 angehoben.
- Das Webshop-Design wurde an den Bootstrap-Standard angeglichen, um eigene Style-Definitionen zu reduzieren.
- Es wurden veraltete SCSS-Variablen entfernt oder ersetzt. [In unserer Entwicklerdokumentation](https://developers.plentymarkets.com/dev-doc/ceres-5#scss) sind alle Änderungen aufgelistet.
- Die Hilfsklasse **widget-fw** hat nun keine Auswirkungen mehr auf Widgets, die sich innerhalb eines anderen Widgets befinden.
- Das Verhalten des Canonical-Tags und der Robots-Informationen auf Kategorie- und Suchergebnisseiten wurde überarbeitet.
- Wenn eine Variante gewechselt wird, für die bereits Bestellmerkmale ausgewählt wurden, werden diese Bestellmerkmale bei einem erneuten Wechsel zur ursprünglich gewählten Variante wieder automatisch ausgewählt. Dies gilt nicht für Bestellmerkmale des Typs **Datei**.
- Standard-Vorlagen für Webshop-Seiten, die bisher über CSS mit einem weißen Hintergrund versehen wurden, wurden um ein entsprechendes Hintergrund-Widget erweitert, um das vorherige Erscheinungsbild abzubilden.
- Varianteneigenschaften werden nun auf der Bestellbestätigungseite ausgegeben.
- Die Einstellungen **Punkte unterhalb des Bilderkarussells in der Kategorieansicht anzeigen** und **Navigationspfeile im Bilderkarussell in der Kategorieansicht anzeigen** wurden als deprecated markiert, da diese nun über den Ceres-Assistenten vorgenommen werden. Die Einstellungen im Assistenten wurden zusätzlich auf Artikellisten ausgeweitet.
- Die Filter-Toolbar ist nun ausgeklappt, nachdem der Nutzer einen Filter auswählt und die Seite dadurch neu geladen wird.
- Die Einstellung **Artikelbilder in Suchvorschlägen anzeigen** des Top Bar-Widgets wurde in die Einstellungen des neuen Widgets **Suchergebnisse: Artikel** ausgelagert.
- Die Einstellung **Artikelsuche: zur Artikelansicht weiterleiten** des Top Bar-Widgets wurde entfernt.
- Die Länderflaggen und Icons im Webshop werden jetzt nachträglich geladen, um die Ladezeit des Webshops zu verbessern.
- Die Komponente **contact-map** wurde entfernt und durch die **google-maps** Komponente ersetzt.
- Die Direktive `v-waiting-animation` wurde als deprecated markiert. Stattdessen wurde die neue Icon-Komponente `icon` zur Verfügung gestellt.
- Alle Inhalte der ShopBuilder-Kategorie **Startseite (veraltet) (Ceres)** wurden inaktiv gesetzt.
- Das Feld **Name des Webshops** wurde aus dem Ceres-Assistenten entfernt.
- Eigenschaften wurden aus den Result Fields für Artikellisten und Kategorieseiten entfernt.

### Behoben

- Bilder im Hintergrundbild-Widget wurden automatisch wiederholt, selbst wenn die Option **Bild wiederholen** nicht aktiv war. Dies wurde behoben.
- In der Step-by-Step-Navigation liefen sehr lange Kategorienamen über die Grenzen des Widgets hinaus. Kategorienamen werden nun entsprechend gekürzt.
- Auftragsdokumente vom Typ **Rücksendeschein** werden nun in der Bestellbestätigung und in der Bestellhistorie im Mein Konto-Bereich angezeigt und können dort heruntergeladen werden.
- Bei Artikelbildern in einem Bilderkarussell oder einer Bilderbox kam es unter bestimmten Umständen zu einem Fehlverhalten, sodass Bilder nicht korrekt geladen werden konnten. Dies wurde behoben.
- Durch einen Fehler wurden die strukturierten Daten nicht richtig ausgegeben. Dies wurde behoben.
- Die Option **Schriftgröße erhöhen** des Hintergrundbild-Widgets wirkte sich auf alle Widgets aus, die Texte enthielten und in einem Hintergrundbild-Widget platziert wurden. Die Option wurde nun auf das Text- und Code-Widget beschränkt.
- Das Sticky Container-Widget verursachte Darstellungsfehler beim Ändern der Fenstergröße. Dies wurde behoben.
- Die Navigationspunkte des Bilderkarussell-Widgets funktionieren auf der Artikelansicht wieder wie beabsichtigt.
- Durch einen Fehler wurde das unsichtbare Eingabefeld der Newsletter-Anmeldung, welches dazu dient, Bots abzuwehren, von bestimmten Browsern automatisch ausgefüllt. Dies wurde behoben.
- Adressen, die aus einer anderen Quelle als Ceres stammen, werden nun beim Bearbeiten der Adresse in das ISO-Format umgewandelt.
- Die Navigationspfeile des Bilderkarussell-Widgets funktionieren in Artikellisten und in der Kategorieansicht wieder wie beabsichtigt.
- Wenn im Retouren-Widget keine Option für die Einstellung **Angezeigte Artikelinformationen** aktiviert war, wurde fälschlicherweise die Artikelverfügbarkeit ausgegeben. Dies wurde behoben.
- Im Bilderbox-Widget wurde fett formatierter Text nicht korrekt ausgegeben. Dies wurde behoben.
- Artikelkacheln in Artikellisten enthalten nun das Pfeil-Icon anstatt des Warenkorb-Icons, wenn der Artikel mehr als 2 kaufbare Varianten hat. Nutzer werden nach Klick auf das Pfeil-Icon auf die Artikelansicht geleitet.
- Bei externen Suchanbietern kam es unter gewissen Umständen zu einer fehlerhaften Darstellung der Suchergebnisseite. Dieses Verhalten wurde behoben.
- Manche Kombinationen aus Hintergrundbild-Widget, Raster-Widgets und der Hilfsklasse **widget-fw** konnten zu Darstellungsfehlern führen. Dieses Verhalten wurde behoben.
- Unter bestimmten Bedingungen überlagerte das Hintergrundbild-Widget den Inhalt der darin enthaltenen Widgets. Dies wurde behoben.
- Unter bestimmten Umständen wurden Artikellisten vom Typ **Zuletzt angesehen** nicht korrekt angezeigt. Dies wurde behoben.

## v4.6.0 (2020-02-17) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.5.2...4.6.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte für Artikelansichten im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu bereitstellen** aktualisiert werden.
- Google reCAPTCHA wird ab sofort erst nach der Zustimmung zur Verwendung der entsprechenden Cookies durch den Webshop-Besucher ausgeführt. Demzufolge können Formulare, die über das reCAPTCHA abgesichert sind, erst nach Zustimmung des Benutzers abgeschickt werden. Dazu zählen das Kontaktformular und die Kundenregistrierung.

### Hinzugefügt

- Das Ihr Zeichen-Widget wurde zum ShopBuilder hinzugefügt.
- Das Widget Step-By-Step-Navigation wurde zum ShopBuilder hinzugefügt.
- Dem Google Maps-Widget wurden Einstellungen für eigene CSS-Klassen und Abstände hinzugefügt.
- Der Assistent enthält nun eine Einstellung mit der man die Umsatzsteueridentifikationsnummerprüfung für die Anlage/Änderung von Addressen und den Bestellabschluss aktivieren kann.

### Geändert

- Filter vom Typ Kategorie sind nun auch in der Kategorieansicht verfügbar.
- Das Navigationsbaum-Widget wird auf Displaygrößen, auf denen die mobile Navigation verwendet wird, nicht angezeigt. Im ShopBuilder wird ein entsprechender Hinweis angezeigt.
- Eigenschaften werden in den Datensätzen für Artikellisten nicht mehr ausgegeben, um die Datenmenge zu reduzieren.
- Das Kategoriebild wird nun aus Gründen der Performance per Lazy Load nachgeladen, wenn es im sichtbaren Bereich ist.
- Das Bild des Hintergrundbild-Widgets wird nun per Lazy Load nachgeladen.
- Die übertragenen Daten bei Artikeln mit Bestellmerkmalen wurden optimiert.
- E-Mails werden ab sofort in der ausgewählten Shop-Sprache versendet.
- Die Einstellung für den Google Maps API-Schlüssel wurde aus dem Google Maps-Widget in die Ceres-Einstellungen überführt. Die Checkbox für die Google Maps-Cookies in der CookieBar wird erst angezeigt, sobald dort ein Schlüssel hinterlegt wurde.
- Der Text der Verlinkung zu Informationsseiten von Zahlungsanbietern wurde in die Sprachpakete für Mehrsprachigkeit aufgenommen. Der betreffende Eintrag ist "checkoutPaymentMethodDetailsLink".
- Für Bilderbox-, Artikelbild- und Bilderkarussell-Widgets werden nun die am Artikelbild hinterlegten Namen als Titel verwendet.
- Das Type-Attribut von `<script2>`-Tags wird nun nicht mehr automatisch auf "text/javascript" umgewandelt.

### Behoben

- Durch einen Fehler konnte die USt-IdNr. im Adressauswahl-Widget nicht ausgeblendet werden. Dies wurde behoben.
- script2- und style2-Tags werden nun nicht mehr als Klartext angezeigt, bevor sie in native Tags umgewandelt werden.
- Im JSON für Schema.org werden Grundpreise nun korrekt ausgegeben.
- Im Internet Explorer wurden die Vorschaubilder des Bilderkarussells nicht angezeigt. Dies wurde behoben.
- Im Internet Explorer wurden Kindelemente des Navigationsbaum-Widgets nicht angezeigt. Dies wurde behoben.
- Unter bestimmten Umständen wurde eine horizontale Scrollbar im ShopBuilder angezeigt. Dies wurde behoben.
- Durch einen Fehler konnten Webshop-Besucher Unterkategorien der aktuellen Kategorie im Navigationsbaum-Widget nicht aufklappen. Dies wurde behoben.
- Erstellte ShopBuilder-Inhalte für die Retourenseite wurden im Webshop nicht ausgegeben. Dies wurde behoben.
- Im Bilderbox- und Bilderkarusell-Widget werden ungültige Elemente aus angepassten Überschriften jetzt herausgefiltert, um Fehler beim Inline-Editing zu vermeiden.
- Im Bilderkarussell-Widget wurden Bilder bei jeder Mausbewegung über eine Bedienfläche neu geladen. Dies wurde behoben.
- Tabs des Tab-Widgets werden jetzt auch nachträglich sichtbar, wenn der darin enthaltene Inhalt zeitverzögert oder durch Benutzerinteraktion sichtbar wird.
- Das Feld für eigene CSS-Klassen wurde bei Widgets auf der Kontaktseite nicht berücksichtigt. Dies wurde behoben.
- Die Übersetzungen für Shop-Aktionen werden wieder korrekt ausgegeben.
- Die Bedienbarkeit des Toolbar-Widgets im ShopBuilder wurde verbessert.
- Der konfigurierte Auftragsstatus für Retouren wird vor Anlage der Retoure geprüft. Im Fehlerfall wird der Standardstatus für Retouren (9.0) verwendet.
- Registrierte Kunden können ab sofort Retouren über den Bestellbestätigungslink anlegen, ohne angemeldet zu sein.
- In den strukturierten Daten eines Artikels kam es zu einen Fehler bei der Umwandlung von Sonderzeichen im Feld "category". Dies wurde behoben.
- Im Feld "Inhalt" im Tab "Weitere Details" des Tab-Widgets wurde kein Wert vor der Einheit angezeigt. Dies wurde behoben.
- Durch einen Fehler wurde das Google reCAPTCHA auf allen Seiten geladen. Dies wurde behoben.
- Im Lieferadressen-Widget des Mein Konto-Bereichs wurde die Checkbox für Paketstation/Postfiliale nicht angezeigt. Dies wurde behoben.
- Im Live-Shopping-Widget konnte die Laufzeitanzeige nicht mehr als 30 Tage darstellen. Dies wurde behoben.
- Die Widgets Artikel pro Seite und Artikelsortierung konnten nur in das Toolbar-Widget gezogen werden. Dies wurde behoben.
- Im Navigationsbaum-Widget wurden die Einstellungen für Innenabstände nicht auf nachgeladene Listenelemente angewendet. Dies wurde behoben.
- Durch einen Fehler wurde der Backlink des Link-Widgets fälschlicherweise an Registrierungs- und Login-Seiten weitergereicht. Dies wurde behoben.
- Es werden nun keine Kategorien mehr in der Navigationsleiste ausgegeben, wenn alle Kategorietypen in der Ceres-Einstellung **Kategorietypen, die in der Navigationsleiste angezeigt werden** deaktiviert sind.
- Das potentialAction-Element in den strukturierten Daten wird nun nur noch auf der Startseite ausgegeben.
- Kategorien, deren URL-Name bereits für systeminterne URLs in Verwendung ist, sind ab sofort erreichbar, wenn für diese systeminternen URLs eine alternative Kategorie im ShopBuilder verknüpft ist.
- Die Einstellung **Slash (/) am Ende von URLs** wird jetzt auch bei Seiten, die über den **Mehr**-Button in der Navigation aufgerufen werden, berücksichtigt.
- Aufträge vom Typ Gewährleistung werden jetzt im Mein Konto-Bereich angezeigt und können retourniert werden.
- Seiten, die aufgrund der automatischen Erkennung der Browsersprache in einer anderen Sprache angezeigt werden, als in der URL angegeben ist, werden nicht mehr im ShopBooster-Cache gespeichert.

## v4.5.2 (2020-01-24) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.5.1...4.5.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen am Auftragsdaten-Widget müssen die ShopBuilder-Inhalte vom Typ Bestellbestätigung im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu bereitstellen** aktualisiert werden.

### Behoben

- Bei Lieferaufträgen und anderen Auftragstypen, die keine Zahlung erfordern, werden Zahlungsinformationen und der Bezahlen-Button nicht mehr in der Bestellbestätigung angezeigt.

## v4.5.1 (2020-01-06) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.5.0...4.5.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler wurden Varianteneigenschaften bei einem Variantenwechsel nicht korrekt aktualisiert. Dies wurde behoben.
- Durch einen Fehler wurden Artikelbilder bei einem Variantenwechsel nicht korrekt aktualisiert. Dies wurde behoben.

## v4.5.0 (2019-12-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.4.2...4.5.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Um die Weiterleitung von Tags auf verlinkte Artikel nutzen zu können, muss die Route **Tags** im Menü **Routing » Routen aktivieren** der **IO**-Konfiguration aktiviert werden.
- Da Tags nun in der Artikeleinzelansicht sichtbar sind, sollten Tag-Namen und -Verlinkungen im Menü **Einrichtung » Einstellungen » Tags** überprüft werden, um die Anzeige von ungewolltem Inhalt zu vermeiden.
- Falls "Ab"-Preise in der Artikeleinzelansicht verwendet werden sollen, muss der Übersetzungseintrag "dynamicVariationPrice" unter **Template** im Menü **CMS » Mehrsprachigkeit** angepasst werden.
- Der Filter für Artikelbewertungen wurde in das Plugin **Kunden-Feedback** ausgelagert. Für die Einbindung eines Artikelbewertungs-Filter muss dieses Plugin auf die aktuelle Version 3.3 angehoben werden.

### Hinzugefügt

- Der Ceres-Assistent enthält jetzt Einstellungen für die Variantenauswahl, mit welchen die "Bitte wählen"-Option hinzugefügt und vorausgewählt werden kann.
- In der Artikeleinzelansicht können nun "Ab"-Preise angezeigt werden, wenn die Option "Bitte wählen" für die Variantenauswahl aktiviert ist. Hierfür muss der Übersetzungswert "dynamicVariationPrice" unter **Template** im Menü **CMS » Mehrsprachigkeit** angepasst werden.
- Die folgenden Widgets wurden zum ShopBuilder hinzugefügt, um die Kategorieansicht abbilden zu können: Seitennummerierung, Artikel pro Seite, Toolbar, Artikelraster, Artikelsortierung, Verfügbarkeitsfilter, Filter für Attribute, Eigenschaften und Merkmale, Preisfilter, Kategoriefilter, Herstellerfilter, Navigationsbaum, Hintergrundbild.
- Das Tags-Widget für den ShopBuilder wurde hinzugefügt, mit welchem Tags in der Artikeleinzelansicht dargestellt werden können. Tags werden im Menü **Einrichtung » Einstellungen » Tags** eingerichtet.
- Im Artikelraster-Widget kann die Spaltenanzahl nun abhängig vom Viewport eingestellt werden. Wir bedanken uns bei @daniel-mannheimer für den Beitrag.
- Inhalte vom Typ **Artikelkategorie** werden nun in der Kategorieansicht berücksichtigt.
- Die Vorlagen für die Artikelkategorie and die Suchergebnisse-Seite wurden hinzugefügt.
- Es wurden Hilfsklassen hinzugefügt, um Widget-Einstellungen einfacher definieren zu können.
- Facettendaten werden jetzt über die neue Funktion `addFacets()` anstatt `setFacets()` im ItemListModule in den Vue Store geschrieben, um doppelte Daten zu vermeiden. Die Funktion `setFacets()` wurde als `deprecated` markiert.

### Geändert

- Die Einstellungen "Position der Paginierung", "Erste Seite immer anzeigen" und "Letzte Seite immer anzeigen" wurden als `deprecated` gekennzeichnet und werden nun über den ShopBuilder vorgenommen.
- Die Bezeichnung "Bitte wählen" in der Variantenauswahl wurde in "Keine Auswahl" geändert, um kenntlich zu machen, dass die gewählte Variante ein wählbarer Artikel ist, auch ohne ausgewähltem Attribut.
- Die Bilder der Warenkorbartikel und der Artikeleinzelansicht werden nun nachgeladen, sobald sie sichtbar werden.
- Icons von Versandprofilen werden ab sofort im Checkout angezeigt, sofern das Plugin der jeweiligen Versandart ein Icon zur Verfügung stellt.
- Inhalte des Code-Widgets werden im abgesicherten Modus ab sofort als Klartext ausgegeben, damit diese bei fehlerhaften Eingaben weiterhin bearbeitet werden können.
- Es wurde eine neue Einstellung zum Bilderbox- und Bilderkarussell-Widget hinzugefügt, mit der Bilder erst geladen werden, wenn diese sichtbar sind. Dadurch wird die Performance verbessert.
- Die Sortierung der Facetten wurde aus Ceres entfernt und nach IO ausgelagert. Die Facetten kommen nun sortiert vom Server.
- Die Vue-Komponente `contact-map` wurde als `deprecated` markiert.
- Das Google Maps-Widget loggt nun Fehler.
- Die folgenden Einstellungen zur Kategorieansicht wurden als `deprecated` markiert: "Kategoriebeschreibung über Artikelliste anzeigen", "Kategoriebeschreibung unter Artikelliste anzeigen" und "Kategorien als Filteroption bei Suchergebnissen anzeigen".

### Behoben

- Es kam zu Javascript-Fehlern, wenn ein Artikel in den Warenkorb gelegt wurde, der sich bereits im Warenkorb befand. Dieses Verhalten wurden behoben.
- Die Layout-Container "Shopping cart: Before basket totals" und "Shopping cart: After basket totals" werden nun korrekt im Summen-Widget ausgegeben, wenn sich dieses nicht im Checkout befindet.
- Im Microsoft Edge-Browser kam es beim Hinzufügen von Artikeln zum Warenkorb zu einem Javascript Fehler, der dazu führte, dass das "AddToBasket"-Overlay nicht angezeigt wurde. Dies wurde behoben.
- Im Artikelbild-Widget wurde der Layout-Container "ImageCarouselOverride" nicht korrekt ausgegeben. Dies wurde behoben.
- Das Überschreiben von Styles im Code-Widget durch ein Theme führte zu unleserlicher Syntax. Dieses Verhalten wurde behoben.
- Das Seitenverhältnis des Artikelbild-Widgets ändert sich nun nicht mehr bei verschiedenen Spaltenbreiten.
- Layout-Container, die über den ShopBuilder nicht mehr ausgegeben werden, wurden als `deprecated` markiert.
- Bei einem erneuten Durchlaufen des Ceres-Assistenten wurde der zuvor eingestellte Wert für die Anzeige von Artikelpaketen nicht richtig angezeigt. Dies wurde behoben.
- Durch einen Fehler wurden unter bestimmten Umständen falsche Daten an Google Analytics gegeben. Dieses Verhalten wurde behoben.
- Durch einen Fehler konnten Telefonnummer und Umsatzsteuer-ID nicht mehr aus einer Adresse entfernt werden. Dies wurde behoben.
- Durch einen Fehler wurde die Shop-Aktion bei Liveshopping-Artikeln nicht ausgegeben. Dies wurde behoben. Vielen Dank an @Lauflust für diesen Beitrag.
- Beim Öffnen eines Modals in Safari auf mobilen Endgeräten scrollte die Seite zum Seitenanfang. Dies wurde behoben.
- Wenn der Button "Alle akzeptieren" in der CookieBar ein zweites Mal geklickt wurde, ohne dass zuvor die Seite erneut geladen wurde, konnte die CookieBar nicht mehr geschlossen werden. Dieses Verhalten wurde behoben.
- Bei einer Gastbestellung war die Eingabe der E-Mail-Adresse nicht möglich, falls bereits eine E-Mail-Adresse eingetragen war. Dieses Verhalten wurde behoben.
- Fehlermeldungen im Warenkorb waren aufgrund eines CSS-Fehlers unsichtbar. Dies wurde behoben.

## v4.4.2 (2019-11-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.4.1...4.4.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Bei Aufpreisen für Bestellmerkmale, die am Artikel geflegt wurden, kam es in der Artikelliste zu Anzeigefehlern. Dieses Verhalten wurde behoben.
- Durch einen Fehler wurden Attribute nicht auf der Bestellbestätigungsseite angezeigt, wenn diese mit dem ShopBuilder erstellt wurde. Dies wurde behoben.

## v4.4.1 (2019-11-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.4.0...4.4.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben 

- Bestellmerkmale wurden im Warenkorb und im Checkout erst nach einem erneuten Laden der Seite angezeigt und nicht am Auftrag mitgegeben. Dieses Verhalten wurde behoben.
- Im Mein Konto-Bereich konnten Auftragsdetails nicht mehr eingesehen werden, sofern dieser nicht mit dem ShopBuilder erstellt wurde. Dies wurde behoben. 

## v4.4.0 (2019-11-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.4...4.4.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Der Standardwert für die Einstellung "Kategorieebenen des Kategoriebaums" wurde auf 4 Ebenen festgelegt. Um weiterhin alle 6 Ebenen zu laden, muss die Einstellung angepasst werden. Dies hat unter Umständen negative Auswirkungen auf die Performance des Webshops.

### Hinzugefügt

- Es wurde ein CookieBar-Widget zum ShopBuilder hinzugefügt.
- Es wurde ein Datenschutzeinstellungen-Widget zum ShopBuilder hinzugefügt.
- Mit dem Widget "Weitere Informationen" wurde ein neues Strukturelement hinzugefügt, um Inhalte in einem Popover darstellen zu können.
- Es wurde eine Ceres-Einstellung hinzugefügt, um nicht notwendige Cookies zu blockieren, bis der Benutzer der Verwendung zugestimmt hat.
- Es wurde eine Ceres-Einstellung hinzugefügt, um die Anzahl der Ebenen für die Kategorie-Navigation festzulegen.
- Die CSS-Klasse .widget-fw wurde hinzugefügt. Mit dieser Klasse können ShopBuilder-Widgets über die gesamte Bildschirmbreite skaliert werden.
- Die CSS-Klasse .unfixed wurde hinzugefügt. Mit dieser Klasse können ShopBuilder-Widgets im Header gelöst werden, sodass diese beim Scrollen mitlaufen.
- Es wurde ein abgesicherter Modus eingeführt, um Ceres ohne Änderungen durch Themes oder externe Plugins anzuzeigen.
- Die Sprachdateien des Webshops sind nun in den Sprachen Französisch, Niederländisch und Polnisch verfügbar.
- Das Datenfeld "Einheit" wurde zur Datenfeld-Auswahl im ShopBuilder hinzugefügt.
- Über den ShopBuilder ist es nun möglich, Eigenschaften vom Typ Datei in der Artikelansicht anzuzeigen.

### Geändert
- In der Lieferlandauswahl wurden die Flaggen für die kanarischen Inseln, die niederländischen Antillen und Ceuta ergänzt.
- Der **Mehr**-Button in der Auflistung einzelner Artikel im Warenkorb wird nun wieder dargestellt.
- In den Summen im Warenkorb und Checkout werden Verkaufsgutscheine jetzt oberhalb der Gesammtsumme (Netto) angezeigt.
- GoogleMaps wird nun erst nach Zustimmung durch den Seitenbesucher geladen.
- Das Logging von Twig-Fehlern wurde verbessert.
- Das Layout des Headers wird nun unabhängig von Breakpoints berechnet.
- Die Standardeinstellung für das Scroll-Verhalten des Sticky-Widgets wurde auf **Scrollt nur innerhalb des Strukturelements** gesetzt.
- Für die ShopBuilder-Kategorie "Startseite" wird nun bevorzugt der Meta-Titel als Tab-Titel verwendet, sofern dieser hinterlegt ist.
- Nicht ausgefüllte Felder im Registrierungsformular werden nun in einer Fehlermeldung ausgegeben.

### Behoben

- Durch Änderungen an Filter-, Sortier- oder Artikel pro Seite-Einstellungen auf der mobilen Kategorieansicht wurde das Länderkürzel aus der URL entfernt. Dieses Verhalten wurde behoben.
- Artikel, für die die Einstellung **Aktionsgutschein/POS-Rabatt: Nur mit Gutschein kaufbar** aktiv ist, können nun nicht mehr gekauft werden, wenn kein Aktionsgutschein eingelöst wurde.
- Die Artikel-ID von Artikeln im Warenkorb wird nun korrekt ausgegeben.
- Struktur-Widgets wurden im Header unter bestimmten Umständen nicht korrekt dargestellt. Dieses Verhalten wurde behoben.
- Bestellmerkmale wurden nach einem Seitenwechsel nicht mehr im Warenkorb angezeigt. Dies wurde behoben.
- Es wurden Rundungsfehler bei der Preisformatierung behoben.
- Durch einen Fehler wurde der Preis am Artikel im Warenkorb beim Wechsel zwischen Brutto- und Nettopreis nicht aktualisiert. Dies wurde behoben.
- Beim Generieren von Artikel- und Varianten-URLs kam es zu Fehlern, wenn die Kategorie des Artikels nicht mehr existierte. Dieses Verhalten wurde behoben.
- Bei der Verwendung von mehreren FAQ-Widgets auf einer Seite werden die strukturierten Daten nun korrekt zusammengefasst.
- Durch einen Fehler funktionierte die Weiterleitung des Registrieren-Widgets nicht korrekt. Dies wurde behoben.
- Beim Hinzufügen eines Artikels aus der Wunschliste zum Warenkorb funktioniert die Mengenangabe nun korrekt.
- Für Artikelpakete wurde in der Kategorie- und Listenansicht eine prozentuale Ersparnis anstelle des Artikepaket-Badges angezeigt. Dies wurde behoben.
- Die Preise von Live-Shopping-Artikeln werden nun wieder korrekt angezeigt, wenn weder Angebotspreis noch UVP hinterlegt sind.
- Auf der Bestellbestätigungsseite kam es teilweise zu falschen Berechnungen. Dies wurde behoben.
- Durch einen Fehler wurde das Top Bar-Widget nicht mehr angezeigt, wenn alle Bestandteile in den Widget-Einstellungen ausgeblendet wurden. Dies wurde behoben.
- Durch einen Fehler wurden prozentuale Bestellmerkmale nicht richtig ausgegeben. Dies wurde behoben.
- Der Button zur Anlage einer Retoure wurde im Mein Konto-Bereich nicht angezeigt, wenn dieser nicht mit dem ShopBuilder erstellt wurde. Das Verhalten wurde behoben.
- Beim AddToBasketOverlay konnte es zu JavaScript-Fehlern kommen. Dieses Verhalten wurde behoben.
- Bei einem Lieferlandwechsel öffnete sich die Warenkorbvorschau, auch wenn sich der Nutzer bereits im Warenkorb befand. Dieses Verhalten wurde behoben.

## v4.3.4 (2019-10-17) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.3...4.3.4" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO 

- Für die Verwendung von Ceres Version 4.3.4 muss das Plugin IO auf die aktuelle Version 4.3.3 aktualisiert werden.

### Behoben

- Der Wert von Bestellmerkmalen vom Typ "Auswahl" wird wieder korrekt im Warenkorb dargestellt.
- Veraltete Einstellungen für Button-Größen werden wieder korrekt interpretiert.
- Auftragsdokumente konnten bei Gastbestellungen nicht angezeigt werden. Dies wurde behoben.
- Nach dem Hinzufügen von Artikeln mit Bestellmerkmalen wird das Bestätigungs-Overlay wieder korrekt angezeigt.
- Der Assistent hat einen ungültigen Wert für die Option zur Position der Warenkorbvorschau gespeichert. Dies wurde behoben.
- Im Assistenten werden die Standardwerte für Einstellungen nun korrekt geladen.
- Beim Aufsplitten von Artikelpaketen kam es zu einer fehlerhaften Anzeige. Dies wurde behoben.

## v4.3.3 (2019-10-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.2...4.3.3" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Ein Fehler führte dazu, dass Varianteneigenschaften ohne Gruppen im Warenkorb nicht mehr angezeigt wurden. Dies wurde behoben.
- Ein Fehler führte dazu, dass die Layout-Container im Auftragsdaten-Widget nicht korrekt mit Daten befüllt wurden. Dies wurde behoben.
- Der LayoutContainer `Ceres::Scripts.AfterScriptsLoaded` wurde vor die Initalisierung von Vue.js verschoben, um das Registrieren eigener Vue-Komponenten wieder zu ermöglichen.
- Ein Fehler führte dazu, dass keine ShopBuilder-Inhalte mehr angezeigt wurden, wenn das Datenschutz-Widget auf einer Seite platziert wurde. Dies wurde behoben.

## v4.3.2 (2019-10-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.1...4.3.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler war die Registrierungsseite nicht mehr über den Header des Shops erreichbar. Dies wurde behoben.
- Durch einen Fehler konnten Skripte nicht mehr mit `<script2>`-Tags ausgegeben werden. Dies wurde behoben.
- Durch einen Fehler wurden auch im Live-Modus die Vue-Devtools angezeigt. Dies wurde behoben.

## v4.3.1 (2019-10-01) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.0...4.3.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Die Ladezeit des **Assistenten** im plentymarkets Backend wurde verbessert.
- Durch einen Fehler wurde die Sprache nicht richtig in die URL der mobilen Navigation eingefügt. Dies wurde behoben.

## v4.3.0 (2019-09-26) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.2.1...4.3.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu bereitstellen** aktualisiert werden.
- Für die Verwendung der Zahlungsart **Nachnahme** muss das Nachnahme-Plugin auf Version 1.0.8 aktualisiert werden.

#### Hinzugefügt

- Bei einer Ausfuhrlieferung wird nun eine Meldung unterhalb der Warenkorbsummen angezeigt, welche den Nutzer über potentielle zusätzliche Kosten informiert. Die Meldung kann ausgeblendet werden, indem der Wert "basketExportDeliveryWarning" im Menü **CMS » Mehrsprachigkeit** leer gespeichert wird.
- Das ShopBuilder-Widget "Auftragsdokumente" wurde für die Kategorie "Bestellbestätigung" hinzugefügt. Darüber können Kunden Dokumente wie Rechnung, externe Rechnung, Lieferschein, Auftragsbestätigung, Abhollieferschein oder Stornobeleg runterladen.
- Die folgenden Widgets wurden zum ShopBuilder hinzugefügt: Auftragsdaten, Auftragssummen, gekaufte Artikel, Registrierung, Login, Gastbestellung, Lieferland-Auswahl, Wunschliste, Newsletter abmelden, Retourenformular, Passwort ändern-Formular, E-mail ändern-Formular.
- Die folgenden Vorlagen wurden zum ShopBuilder hinzugefügt: Bestellbestätigung, 404-Seite, Login, Registrierung, Newsletter-Abmeldung, Wunschliste, Retourenformular, Passwort ändern, E-Mail ändern, Warenkorb.  
- Das Link-Button-Widget wurde zum ShopBuilder hinzugefügt. Dieses stellt Links zu Retouren und Sendungsverfolgung als Schaltflächen zur Verfügung.

### Geändert

- **Eigene Überschriften** des Artikellisten-Widgets werden nicht mehr in Großbuchstaben ausgegeben.
- Die Artikelinformationen in der Bestellbestätigung beinhalten nun Attribute.
- Die Attribute der Variante werden nun im Retouren-Widget des ShopBuilders ausgegeben.
- Die Attribute der Variante werden nun im Auftragsdaten-Widget des ShopBuilders ausgegeben.
- Die Menge der übertragenen Daten beim Bearbeiten des Warenkorbs wurde minimiert, um die Performance des Webshops zu verbessern.
- Über **pluginApp** erzeugte Objekte werden nun vor der weiteren Verwendung in eigene Variablen gespeichert. Die direkte Verwendung neuer Instanzen führte in einzelnen Fällen zu Fehlern während der Plugin-Bereitstellung.
- Wenn die Option "Auswahl des Inhalts immer anzeigen" im Attributauswahl-Widget inaktiv ist, wird die Inhaltsangabe in der Attributauswahl nun ausgeblendet, falls die Kombination der gewählten Attribute keine Variante ergibt.
- Bestellmerkmale im Warenkorb werden nun nach ihrer Position sortiert.
- Die strukturierten Daten auf Artikelseiten wurden überarbeitet.
- Der Hinweistext auf dem "In den Warenkorb"-Button wurde für nicht verfügbare Artikel angepasst.
- Parameter für Suchanfragen und für die Kategorieansicht werden nun validiert.
- Die Einstellung "Callisto-URL-Struktur für Artikel aktivieren" wurde erweitert, sodass ab sofort die Einstellungen "Aufbau Artikel-URL" unter **Einrichtung » Mandant » Mandant wählen » SEO » URL-Aufbau » Artikel** berücksichtig wird.
- Die Auswahl von Zahlungs- und Versandarten wurde angepasst. Ausgewählte Zahlungs- und Versandarten können einander nicht mehr ausschließen. Bei Auswahl einer inkompatiblen Kombination wird ein Hinweis eingeblendet und Zahlungs- und Versandart können neu gewählt werden.
- Die Wunschlistenansicht wird nun vom ShopBooster gecached.
- Das Registrierungsformular wird ab sofort auch über Google reCAPTCHA geprüft, sofern entsprechende Zugangsdaten in den Ceres-Einstellungen hinterlegt sind.
- Dem Warenkorbinhalts-Widget wurden Einstellungen hinzugefügt, um Artikeldaten anzuzeigen.
- Die Newsletter-Abmeldung meldet den Kunden nicht mehr aus allen Newslettern gleichzeitig ab, sondern nur aus dem, der angefordert wurde.
- Um Fehler zu vermeiden, werden Lieferländer nun initial geladen, unabhängig davon, ob ein Widget die Lieferlandauswahl enthält.
- Widget-Platzhalter im ShopBuilder werden nun innerhalb eines Strukturelements kleiner dargestellt, um den Text lesbarer zu machen.

### Behoben 

- Aufgrund von fehlender Mindesthöhe konnte das Code-Widget im ShopBuilder nicht mehr bearbeitet werden. Dies wurde behoben.
- Wenn im ShopBuilder eine Kategorie für die Startseite verknüpft und die Startseite aufgerufen wurde, wurde der Name der Kategorie als Titel des Browser-Tabs verwendet, sofern kein Metatitel hinterlegt war. Ab sofort wird nur noch der Metatitel ausgegeben. Ist kein Metatitel hinterlegt, wird nichts ausgegeben.
- Die Bestellmerkmale werden nun korrekt im Retouren-Widget des ShopBuilders ausgegeben.
- Die Mindestgröße des Bilderkarussells konnte auf kleinen Displaygrößen zum Beschneiden des Bildes führen. Diese wurde entfernt.
- Beim Verwenden von SVG-Dateien wurde das Shop-Logo im Internet Explorer 11 zu groß dargestellt. Dies wurde behoben.
- Durch einen Fehler wurden Kategoriebilder auf iOS Geräten inkorrekt dargestellt. Dies wurde behoben.
- Die Darstellung von Widgets im Header war auf mobilen Geräten fehlerhaft. Dies wurde behoben.
- Bei der Weiterleitung von systeminternen URLs auf mehrsprachige Kategorien des ShopBuilders kam es zu Problemen. Dies wurde behoben.
- In der Einzelartikelansicht wird die Anzahleingabe nun nach einem Wechsel der Variante zurückgesetzt.
- Bei Bildern aus dem Webspace wird nun im Bilderbox-Widget der hinterlegte Alternativtext ausgegeben.
- Die Standardsprache für Suchmaschinen wird jetzt korrekt übermittelt.
- Der Layout-Container im Auftragsdaten-Widget für das Überschreiben von Versandprofilen war fehlerhaft. Dies wurde behoben.
- Durch einen Fehler wurde die Sprache nicht richtig in die URL der mobilen Navigation eingefügt. Dies wurde behoben.
- Unter bestimmten Umständen wurde ein leeres `<title>`-Tag ausgegeben. Das Verhalten wurde behoben.
- Durch einen Fehler wurde die Liste der zuletzt gesehenen Artikel innerhalb eines Tab-Widgets nicht geladen. Dies wurde behoben.
- In einzelnen Fällen kam es zu Rundungsfehlern bei Preisangaben. Dies wurde behoben.
- In den Auftragsdetails konnte es zu einer fehlerhaften Darstellung der Zwischensumme kommen. Dieses Verhalten wurde behoben.
- Artikellisten, die über den ShopBuilder angelegt wurden, erhalten nur noch den "Alle ansehen"-Link wenn sie vom Typ "Kategorie" sind.
- Durch einen Fehler wurde die Artikelansicht des ShopBuilders nicht im Internet Explorer geladen. Dies wurde behoben.
- Durch einen Fehler konnten manche Attribute in der Artikelansicht nicht ausgewählt werden. Dies wurde behoben.
- Der Übersetzungsschlüssel "orderConfirmationItemDiscount" war nicht in Englisch hinterlegt. Dies wurde behoben.
- Die Postnummer wird nun auch im Mein Konto-Bereich und der Bestellbestätigung angezeigt.

## v4.2.1 (2019-09-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.2.0...4.2.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Header und Footer können nun im ShopBuilder individuell für Kategorien und Inhaltstypen gestaltet werden.
- Eigenschaften sind nun im Bestellvorgang nicht mehr auf den Typ "Kein" beschränkt. Zudem werden Eigenschaften nun im Warenkorb ausgegeben.

### Behoben 

- Durch einen Fehler wurden Hashes an der URL beim Seitenaufruf abgeschnitten. Dies wurde behoben.
- Durch einen Fehler wurden die Daten der mobilen Navigation in Kategorien, die als Startseite verknüpft sind, nicht geladen. Dies wurde behoben.

## v4.2.0 (2019-08-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.1.2...4.2.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- ShopBuilder-Startseiten werden ab sofort über eine eigene Kategorie im ShopBuilder abgebildet. Um die Startseite in Zukunft weiter verwenden zu können, muss eine neue Content-Kategorie angelegt und in der Verknüpfungsoberfläche des ShopBuilders verknüpft werden. Hierfür können Inhalte des Startseiten-Containers in die erstellte Kategorie kopiert werden. Der Container "Startseite" wie voraussichtlich mit Ceres 5.0.0 entfernt werden.

### Hinzugefügt

- Der Ceres Assistent ist jetzt im Menü **System » Assistenten** verfügbar.
- Folgende Widgets wurden hinzugefügt, um eigene Kontaktformulare im ShopBuilder erstellen zu können: E-Mail-Formular, Textfeld (einzeilig), Textfeld (mehrzeilig), E-Mail-Feld, Auswahl, reCaptcha.
- Es wurde eine ShopBuilder-Vorlage für die Standard-Kontaktseite hinzugefügt.
- Das Widget "GoogleMaps" wurde nach Ceres überführt und um eine Einstellung für den Kartentyp erweitert: Es ist nun möglich die Karte als Straßenkarte, Satellitenkarte, Hybridkarte oder Terrainkarte anzuzeigen.
- Das Widget "Kontaktdaten" wurde hinzugefügt.
- Im Sticky-Widget ist jetzt einstellbar, ob das Widget innerhalb seines Strukturelements oder über den gesamten Seiteninhalt scrollen soll.
- Die statischen Seiten für Widerrufsformular, Widerrufsrecht, AGB, Datenschutzerklärung und Impressum können nun mit dem ShopBuilder erstellt und bearbeitet werden.
- Das Widget "Rechtliche Texte" wurde hinzugefügt. Dieses ermöglicht die Anzeige der rechtlichen Texte, die unter **System » Systemeinstellungen » Mandant » [Mandant Name] » Webshop » Rechtliches** hinterlegt sind.
- Das Widget "Drucken" wurde hinzugefügt. Dieses öffnet den Druckdialog des Browsers.
- Die ShopBuilder-Vorlagen für Widerrufsformular, Widerrufsrecht, AGB, Datenschutzerklärung und Impressum wurden hinzugefügt.
- Das Herstellerlogo steht nun als Datenfeld im Inline-Editor der Artikeleinzelansicht zur Verfügung.
- Die Widgets Bilderkarussell und Artikelbild wurden um eine Option zur Auswahl der Animation erweitert.
- .css- und .js-Dateien erhalten ein dynamisches Suffix, um diese nach der Bereitstellung der Plugins aus Browser-Caches zu entfernen (Cache-Busting).
- Es wird nun eine Warnung ausgegeben, wenn ein Artikel ohne Bestandsbegrenzung in einer Menge in den Warenkorb gelegt wird, die nicht vom Bestand gedeckt ist. Der hinzugefügte Wert im Menü **CMS » Mehrsprachigkeit** lautet "notificationsWarningOverselling".

### Geändert

- Um die Performance zu verbessern werden Kategorien für die mobile Navigation nun erst nachgeladen, wenn eine Auflösung erreicht ist, auf der diese auch angezeigt werden.
- Die Einstellungen des Tabs "Kontaktformular" in der Ceres Konfiguration wurden als deprecated markiert und entfernt. Das Kontaktformular wird nun standardmäßig über den ShopBuilder eingerichtet.
- Die Attributauswahl wurde um die Option "Auswahl des Inhalts immer anzeigen" erweitert. Wenn diese Option aktiv ist, wird die Inhaltsauswahl für Varianten immer angezeigt, wenn es mehr als einen Inhalt gibt.
- Der ShopBuilder-Container "Startseite" wurde als deprecated markiert. Ab sofort muss eine eigene Kategorie angelegt werden, um die Startseite abzubilden.
- Die Schaltfläche "In den Warenkorb" ist nun in der Artikelansicht deaktiviert, wenn die ausgewählte Variante nicht kaufbar ist.
- Artikel, die mit einer leeren Artikelvorlage verknüpft sind, werden mit dem Layout der Standard-Artikelansicht von Ceres ausgegeben.
- Beim Aufbau der Seitennavigation werden nur noch aktuell sichtbare Kategorien an den Browser übertragen, um Datenaufkommen zu sparen.
- Die mobile Navigation zeigt nun auf Artikelseiten initial die Standardkategorie des Artikels an.

### Behoben

- Rabatte auf den Warenwert werden in Zwischensummen nun korrekt berücksichtigt.
- Auf der Bestellbestätigungsseite und in der Auftragshistorie werden Rabatte auf einzelne Artikel jetzt ausgegeben.
- Auf mobilen Endgeräten kam es bei der Verwendung der Vorlage für Artikelseiten zu Fehlern. Dies wurde behoben.
- Durch einen Fehler funktionierte der Timer des Warenkorb-Modals nicht wie beabsichtigt. Dies wurde behoben.
- Wenn ein Artikel mit einer Artikelvorlage verknüpft wurde, für deren Kategorie keinen Inhalt im Tab Template hinterlegt war, kam es zu TWIG-Fehlern beim Öffnen der Einzelansicht des Artikels. Dies wurde behoben.
- Die Überschrift des Bilderbox-Widget wurde auf mobilen Geräten fehlerhaft dargestellt, wenn die Option "Bild und Text (vollbreite Fußzeile)" ausgewählt war. Dies wurde behoben.
- Im Titelleisten-Widget wurde unter gewissen Umständen ein zusätzliches, leeres `<h1>`-Tag ausgegeben. Dies wurde behoben.
- Durch einen Fehler wurde die Artikel-URL nicht richtig dargestellt, wenn die Option **Slash(/) am Ende von URLs** aktiviert war. Dies wurde behoben.
- Durch Rundungsfehler kam es unter bestimmten Bedingungen zu fehlerhaften Preisdarstellungen. Dies wurde behoben.
- Es wurde ein Fehler beim Newsletter-Widget behoben, durch welchen fälschlicherweise Fehlermeldungen in der Entwicklerkonsole des Browsers auftauchten.
- Bei Artikeln mit der Shop-Aktion "Sonderangebot" im Zusammenhang mit einem aktiven Aktionspreis wurde der Rabatt falsch berechnet. Dies wurde behoben.
- Die "In den Warenkorb"-Schaltfläche ist nun sichtlich deaktiviert, wenn ein Artikel nicht kaufbar ist, aber im Shop angezeigt wird.
- Der Wert 'isVariationSelected' innerhalb der SingleItem-Komponente wird nun korrekt an das VueX-Modul gebunden.
- Im `<title>`-Tag wurden Sonderzeichen nicht korrekt ausgegeben. Dies wurde behoben.
- Auf Kategorieseiten kam es beim Auswählen von Filtern zu einem Fehler. Dies wurde behoben.
- Die Benennungen der Artikelsortierungswerte "Zuerst aktualisierte Variante zuerst" und "Zuletzt aktualisierte Variante zuerst" waren vertauscht. Dies wurde behoben.
- Durch einen Fehler wurden keine Fehlermeldungen in der Warenkorbvorschau angezeigt. Dies wurde behoben.
- Die Abmeldung vom Newsletter funktionierte nicht, wenn die Option **Slash(/) am Ende von URLs** aktiviert war. Dies wurde behoben.
- Die Einstellungen zu automatischen Erkennung der Browser-Sprache werden jetzt korrekt berücksichtigt.
- Für die Gutscheineingabe kann jetzt im Menü ***CMS » Mehrsprachigkeit* ein Text gepflegt werden, welcher angezeigt wird, wenn der Kunde sich im **read-only-Checkout** befindet. Der enstprechende Eintrag heißt "couponReadonlyInfoText".

## v4.1.2 (2019-07-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.1.1...4.1.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Artikel mit vielen Varianten und Bildern konnten nicht korrekt geladen werden. Dies wurde behoben.
- Sonderzeichen in URL-Parametern werden nun korrekt interpretiert.

## v4.1.1 (2019-07-16) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.1.0...4.1.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Attribute von Varianten ohne Bestand werden nun angezeigt, wenn an der Variante die Optionen "Automatisch verfügbar, wenn Netto-WB positiv" und "Automatisch nicht verfügbar, wenn kein Netto-WB" deaktiviert sind.
- Die Kategorien für die mobile Navigation werden nun erst geladen, wenn die Bildschirmauflösung einen Breakpoint erreicht, bei dem die Kategorien angezeigt werden.

### Behoben

- Das Session-Flag für den read-only-Checkout wird nun auch bis in die IO-Methode `executePayment()` weitergereicht.
- Bei bestimmten Artikeleinstellungen wurde die Meldung "Inhalt nicht verfügbar" bei der Auswahl von Attributen ausgegeben. Dies wurde behoben.
- Durch einen Fehler wurde die Attributauswahl bei Varianten, die sich nur durch ihren Inhalt unterscheiden, nicht korrekt dargestellt. Dies wurde behoben.
- In der Variantenauswahl wurden Artikelbilder auf die Größe der Kachel skaliert. Artikelbilder werden nun in ihrem ursprünglichen Seitenverhältnis angezeigt.

## v4.1.0 (2019-07-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.0.2...4.1.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Durch Änderungen an Widgets sollten ShopBuilder-Inhalte über die Schaltfläche **Inhalte neu generieren** erneut bereitgestellt werden.
- Das Widget "Artikeldaten-Tabelle" stellt standardmäßig 12 Artikeldatenfelder dar, insofern diese am Artikel gepflegt sind. Daher sollten die angezeigten Artikelinformationen in den Widget-Einstellungen des Widgets "Artikeldaten-Tabelle" überprüft werden, um zu vermeiden, dass ungewünschte Informationen dargestellt werden.
- Bei der Verwendung der ShopBuilder-Vorlage für die Artikeleinzelansicht müssen Artikellisten der Seite manuell hinzugefügt werden.

### Hinzugefügt

- Es ist jetzt möglich Formulare im Webshop mit der Eingabetaste abzuschicken.
- Varianteneigenschaften lassen sich nun über den ShopBuilder in der Artikeleinzelansicht hinzufügen.
- Die ShopBuilder-Vorlage für die Artikeleinzelansicht wurde hinzugefügt.
- Die Variantenauswahl kann nun Attribute vom Typ Box und Bild ausgeben. Attribute und Attributwerte werden nach Position sortiert.
- Die Einstellungen für Innen- und Außenabstände wurden dem Tab-Widget hinzugefügt.
- Die ceres-legacy.css wird jetzt durch Preloading früher geladen. Wir bedanken uns bei @JVolke für diesen Beitrag.
- Bei der Kundenregistrierung kann nun eine Checkbox zur Einwilligung der Datenschutzerklärung angezeigt werden.
- Im Warenkorb und in der Warenkorbvorschau wird jetzt die Lieferlandauswahl angezeigt. Die Anzeige kann im Tab **Warenkorb** in der Ceres-Konfiguration deaktiviert werden.
- Es wurden 6 neue Icons im Listen-Widget hinzugefügt.
- Für das Breadcrumbs- und FAQ-Widget wurden Rich Snippet-Daten hinterlegt.
- Jedes Widget wird nun mit einem Feld für eine individuelle CSS-Klasse ausgestattet, um individuelles Styling hinzuzufügen. Wir bedanken uns bei @xnaff für den Beitrag.
- Die folgenden Widgets wurden dem ShopBuilder hinzugefügt: Attributauswahl, In den Warenkorb, Auf die Wunschliste, Artikelverfügbarkeit, Artikelbild, Bestellmerkmale, Artikelpaket, Staffelpreise, Artikeldatentabelle.

### Geändert

- Die Variantenauswahl in der Artikeleinzelansicht wurde auf die ElasticSearch-Technologie umgebaut, um bessere Performance zu erzielen.
- Die E-Mail für die Registrierung im Webshop unterstützt nun Umlaute.
- Die "Passwort ändern"-Funktion des Mein Konto-Bereichs validiert nun das Passwort entlang unserer Vorgaben.
- Die Fehlermeldung, die bei Nichterreichen des Mindestbestellwerts angezeigt wird, wurde um den benötigten Wert erweitert.
- In den Widgets Bilderbox und Bilderkarussell wird der Alternativtext der Bilder nun korrekt ausgegeben.
- Die Wunschlisten-Ansicht hat nun eine eigene CSS Klasse. Wir bedanken uns bei @daniel-mannheimer für den Beitrag.
- Im Warenkorb-Overlay, auf der Bestellbestätigungsseite und im Mein Konto-Bereich wird bei Bestellmerkmalen vom Typ **Auswahl** nun der Name der Auswahl anstatt der ID angezeigt.
- Die Fehlermeldung, die erscheint, wenn ein Kunde sich mit einer bereits registrierten E-Mail-Adresse im Webshop registrieren will, wird nun länger angezeigt.
- Es ist jetzt möglich, eine Umsatzsteuer-Identifikationsnummer für Lieferadressen einzugeben.
- Folgende Einstellungen wurden in der Ceres-Konfiguration als `deprecated` markiert und sind in den entsprechenden Widget-Einstellungen zu finden: **Angezeigte Artikelinformationen**, sämtliche Einstellungen im Bereich **Artikellisten**.
- Die Einstellung **Variantenauswahl für Varianten ohne Bestand in der Varianten-Dropdown-Liste aktivieren** wurde als `deprecated` markiert.

### Behoben

- Das plentymarkets Logo in der Footer-Vorlage wird nun über das Code-Widget und nicht mehr über das Text-Widget eingebunden.
- Die Werte von Bestellmerkmalen vom Typ "kein" werden auf der Auftragsbestätigungsseite nun nicht mehr als "true" ausgegeben.
- Durch einen Fehler konnte der Browser abstürzen, wenn die Einstellungen des Widgets Top Bar bearbeitet wurden. Dies wurde behoben.
- Durch das Ändern der Fensterbreite konnten Header-Widgets den Seiteninhalt überdecken. Dieses Verhalten wurde behoben.
- Die beiden Parameter **items** und **page** der Paginierung erlauben jetzt ausschließlich Zahlenwerte.
- Die Option "Alle Bestellmerkmale erfordern, bevor ein Artikel in den Warenkorb gelegt werden kann" in der Ceres-Konfiguration validierte keine Bestellmerkmale vom Typ **Datei**. Dies wurde behoben.
- Raster-Widgets im Header wurden nicht korrekt dargestellt. Dies wurde behoben.
- Der :hyphen Platzhalter steht nun für die Übersetzungsschlüssel für AGB (footerGtc) und Impressum (footerLegalDisclosure) zur Verfügung.
- Durch einen Fehler wurden Vorschaubilder in der Artikelsuche nicht angezeigt. Dies wurde behoben.
- Das Eingabefeld für Datum wird nun korrekt validiert.
- Die Darstellung der Artikelansicht auf mobilen Geräten wurde korrigiert.
- Bestellmerkmale in Merkmalgruppen mit prozentualem Aufpreis werden nun korrekt in der Artikeleinzelansicht ausgegeben. Dafür wurden Daten in den ResultField-Dateien ergänzt.
- Die Felder "USt.-Nr."" und "Firmenname" werden wieder korrekt angezeigt, wenn UK als Lieferland gewählt ist.
- Live-Shopping-Angebote ohne Angebotspreis werden jetzt korrekt dargestellt.
- Bei Bestellmerkmalen mit prozentualem Aufpreis, für die am Artikel ein pauschaler Aufpreis hinterlegt war, wurde der Aufpreisfälschlicherweise  prozentual berechnet. Dies wurde behoben.
- Durch einen Fehler konnten Inhalte im Sticky Container-Widget von anderen Widgets überlagert werden. Dies wurde behoben.
- Bei Gastbestellungen konnte man bei Bestellmerkmalen vom Typ **Datei** den Vorschau-Link in der Bestellbestätigung nicht klicken. Dies wurde behoben.
- Durch einen Fehler wurde die Newslettereingabe im Internet Explorer nicht korrekt validiert, was dazu führte, dass keine Anmeldung möglich war. Dies wurde behoben.
- Das Eingabefeld für die Newsletteranmeldung hat durch das Betätigen der Eingabetaste die Seite neu geladen. Dies wurde behoben.
- Die Warenkorbvorschau wurde bei einem Mouseover über einen darin enthaltenen Tooltip geschlossen. Dies wurde behoben.
- In der Kategorieansicht wurde der "Zum Warenkorb hinzufügen"-Button angezeigt, wenn an den Varianten eine Mindestbestellmenge und eine Intervalbestellmenge hinterlegt war. Das Verhalten wurde behoben.
- Das Eingabefeld für die Bestellmenge wurde nicht immer korrekt gesetzt, wenn eine Mindestbestellmenge hinterlegt war. Das Verhalten wurde behoben.
- Das "Hinweise zur Registrierung" Pop-up wurde auf mobilen Geräten nicht korrekt dargestellt. Dies wurde behoben.
- Bei bestimmten Layout-Optionen des Widgets "Raster mit 3 Spalten" kam es zu Darstellungsfehlern. Dies wurde behoben.
- Beim Berechnen des oberen Abstandes des Sticky Container-Widgets werden nun unfixierte Header-Widgets ignoriert.
- In einem auf zwei Zeilen vergrößerten Megamenü war es nicht möglich, die Menüpunkte der oberen Links zu öffnen. Dies wurde behoben.
- In den Tabs der Artikelbeschreibungen konnte übergroßer Inhalt nicht gescrollt werden. Dies wurde behoben.
- Die Bezeichnungen von Bestellmerkmalen werden nun in der richtigen Sprache ausgegeben.
- In einigen Overlays im Webshop konnten Fehlermeldungen nicht geschlossen werden. Die Fehlermeldungen liegen nun über anderen Elementen und können dadurch geklickt werden.
- Die Position von Merkmalen wurde nicht berücksichtigt. Dieses Verhalten wurde behoben.
- Bei der normalen Kategorienavigation im Header wurde kein Hover-Effekt angezeigt. Dies wurde behoben.
- Unter bestimmten Bedingungen war es nicht möglich, die Adresseingabe im Checkout abzuschließen, wenn der Shop über eine Werbeanzeige innerhalb des Facebook-Browsers aufgerufen wurde. Dies wurde behoben.
- Unter bestimmten Umständen konnte das Sticky Container-Widget im Internet Explorer vom Header überdeckt werden. Dies wurde behoben.
- Wenn nach dem Abschließen eines Auftrags während der Zahlung ein Fehler auftritt, kann der Auftrag erst nach 30 Sekunden erneut abgeschlossen werden. Dies verhindert das Anlegen von doppelten und somit ungültigen Aufträgen.
- Durch einen Fehler wurden keine Länder gesetzt, wenn im Top Bar-Widget die Länderauswahl deaktiviert wurde. Dies wurde behoben.
- Bei leeren Artikellisten wird nun kein leeres `<ul>`-Tag ausgegeben. Wir bedanken uns bei @daniel-mannheimer für den Beitrag.
- Es wurde ein Fehler behoben, der die Weiterleitung von den Routen /checkout und /my-account auf den entprechenden ShopBuilder-Inhalt verhinderte.
- Durch einen Fehler war im Tab-Widget nicht immer ein Tab vorausgewählt. Dies wurde behoben.
- Durch einen Fehler wurden die Attribute eines Artikels in der Variantenauswahl nicht angezeigt, wenn für diesen Artikel nur ein Staffelpreis eingestellt war. Dies wurde behoben.

## v4.0.2 (2019-06-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.0.1...4.0.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch ein fehlerhaft generiertes Auftragshistorien-Widget konnte es vorkommen, dass der Mein Konto-Bereich im ShopBuilder nicht korrekt angezeigt wurde. Dies wurde behoben.

## v4.0.1 (2019-05-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.0.0...4.0.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Der Button "E-Mail-Adresse ändern" im Mein Konto-Bereich wird nun ausgeblendet, wenn die Route "/change-mail" in IO nicht aktiv ist.
- Inhalte eines Titelleisten-Widgets, die vor Ceres 4.0.0 erstellt wurden, wurden im ShopBuilder nicht korrekt ausgelesen. Dadurch wurde der Standardtext angezeigt. Dieses Verhalten wurde behoben.

## v4.0.0 (2019-05-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.2.2...4.0.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Über den Mein Konto-Bereich ist es angemeldeten Kunden jetzt möglich, ihre E-Mail-Adresse zu ändern. Hierfür müssen Änderungen in den E-Mail-Einstellungen unter **System » Systemeinstellungen » Mandant » Mandant wählen » E-Mail** getätigt werden. Unter **Vorlagen** erstellen Sie hierfür eine neue E-Mail-Vorlage. In dieser Vorlage muss der Platzhalter "$NewCustomerEmail" verwendet werden. Dieser Platzhalter enthält einen Bestätigungslink. Verknüpfen Sie diese Vorlage unter **Automatischer Versand** mit dem Ereignis **Kunde möchte E-Mail-Adresse ändern**.
- Um das Ändern der E-Mail-Adresse im Mein-Konto-Bereich zu ermöglichen, muss die Route "/change-mail" in den Einstellungen des Plugins IO aktiviert werden.
- Durch Änderungen am Eingabefeld "Ansprechpartner" in der Adressauswahl werden im Ceres-Standard bei Firmenkunden nun die Felder Vor- und Nachname angezeigt. Diese sind standardmäßig kein Pflichtfeld. Nehmen Sie Änderungen an der Adressauswahl direkt im Widget "Adressauswahl" vor.
- Durch Änderungen in Ceres muss das plentymarkets Plugin "Kunden-Feedback" auf Version 2.0.0 aktualisiert werden, damit dieses weiterhin verwendet werden kann.

### Hinzugefügt

- Kunden können ihre E-Mail-Adresse jetzt im Mein-Konto-Bereich ändern.
- Das Widget "Kauf abbrechen" für den Checkout wurde hinzugefügt. Dieses bricht einen verifizierten Kauf von Payment-Plugins (wie z.B. PayPal) ab.
- Es wurde eine Schnittstelle geschaffen, um relevante Eingaben im Checkout für Payment-Plugins zu sperren, die keine Änderung an diesen Daten erlauben.
- Das Tab-Widget wurde als neues Struktur-Widget hinzugefügt. Dieses dient dazu, Tabs bereitzustellen, welche mit weiteren Widgets befüllt werden können.
- Seiten können jetzt über eine Klasse im <body>-Tag identifiziert werden.
- Die Texte folgender Widgets sind ab sofort über **Inline editing** direkt in der Vorschau des ShopBuilders editierbar: Text, Bilderbox, Artikelliste, Titelleiste, Newsletter, Versandartauswahl, Zahlungsartauswahl, Hinweise und Wünsche, Adressauswahl, Kontoeinstellungen, Bankdaten, Auftragshistorie und Retourenhistorie.
- In der Ceres-Konfiguration und in den Einstellungen des Adressauswahl-Widgets kann nun einhestellt werden, welche Anrede bei der Registrierung und Adresseingabe vorausgewählt sein soll.
- Bei der Registrierung und der Adresseingabe kann nun "Person" als Anrede ausgewählt werden, um eine Anrede für die Geschlechteroption "Divers" bereitzustellen.
- Am Versandprofil wird nun die maximale Lieferzeit angezeigt. Diese wird aus der Verfügbarkeit mit der höchsten Lieferzeit der Artikel im Warenkorb und der Lieferfrist am Versandprofil berechnet.
- Der Layout-Container **Checkout: Override headline** wurde hinzugefügt. Dieser überschreibt die Standardüberschrift des Kassenbereichs.
- Die Innen- und Außenabstände aller Widgets, die keine Raster sind, können nun individuell am Widget eingestellt werden.
- Das Code-Widget mit **Inline editing** wurde hinzugefügt. Dieses Widget macht es möglich, Code direkt in der ShopBuilder-Vorschau zu bearbeiten.
- Das Text-Widget mit **Inline editing** wurde hinzugefügt. Dieses Widget macht es möglich, Text direkt in der ShopBuilder-Vorschau zu bearbeiten. Das alte Text-Widget wurde als deprecated markiert und ist nicht mehr in der Widget-Auswahl verfügbar.
- Für das Kontaktformular können jetzt zusätzliche CC- und BCC-Adressen hinterlegt werden. Vielen Dank @Lauflust für diesen Beitrag.
- Der Betreff für E-Mails, die über das Kontaktformular verschickt werden, kann ab sofort über das Menü **CMS » Mehrsprachigkeit** erweitert werden. Vielen Dank @Lauflust für diesen Beitrag.

### Geändert

- Für das Adressfeld "Ansprechpartner" für Firmenkunden ist nun einstellbar, ob das Eingabefeld Ansprechpartner oder Vor- und Nachname angezeigt wird. Ebenso kann man bestimmen, ob diese Felder Pflichtfelder sein sollen.
- Die Typangaben der Funktionen `isActive()`, `isOpen()` und `isCurrent()` im CategoryService wurden angepasst, um auch aus Twig-Templates heraus aufgerufen werden zu können.
- Beim Wechsel der Anrede, des Landes und beim Wechsel zwischen Adresse und Packstation/Postfiliale werden angezeigte Fehler in der Validierung der Adresseingabefelder nun zurückgesetzt.
- Artikellisten und Kategorien enthalten jetzt Verlinkungen zu den einzelnen Artikeln, die auch ohne aktives JavaScript ausgegeben werden.
- Die Twig-Funktion "queryString" kann jetzt auch mehrdimensionale Arrays verarbeiten. Vielen Dank an @wladi0097 für diesen Beitrag.
- Veraltete sprachspezifische Einstellungen wurden aus Gründen der Übersichtlichkeit aus der Ceres-Konfiguration entfernt. Die Einträge wurden mit der Einführung des Menüs **CMS » Mehrsprachigkeit** in die Sprachdateien von Ceres überführt und in der Konfiguration als deprecated markiert.
- Die Syntax für Slots wurde aktualisiert und verwendet nun die mit Vue.js v2.6.0 eingeführte `v-slot` Direktive.
- Das Linklisten-Widget des ShopBuilders wurde als deprecated markiert und ist nicht mehr in der Widget-Auswahl verfügbar. Das Widget wird durch das Listen-Widget ersetzt, welches die gleiche Funktionalität bietet.
- In einigen Komponenten wurden Properties auf den json_data-Filter überführt, um die Dokumentengröße zu minimieren und die Initialisierung von Vue.js zu beschleunigen. Eine Auflistung der vorgenommenen Änderungen finden Sie [in unserer Entwicklerdokumentation](https://developers.plentymarkets.com/dev-doc/theme-plugins#ceres-4-update).

### Behoben

- Durch einen Fehler wurden in Kategorien mehr Seiten ausgegeben, als von ElasticSearch verarbeitet werden können. Die maximale Anzahl an Artikeln pro Kategorie wurde auf 10.000 gesetzt.
- Hreflang-Attribute verwenden jetzt die korrekten ISO-Codes für die aktivierten Sprachen.
- Für das Bankdaten-Widget wurden falsche Übersetzungsschlüssel verwendet. Dies wurde behoben.
- Unter bestimmten Umständen konnten sich Header-Widgets überlagern. Dies wurde behoben.
- Durch einen Fehler wurden die Eingabefelder der Registrierung im Internet Explorer 11 zu klein dargestellt. Dies wurde behoben.
- Durch einen Fehler konnte eine Bestellung an eine Packstation/Postfiliale gesendet werden, selbst wenn das ausgewählte Versandprofil dies nicht unterstützte. Dies wurde behoben.
- Durch einen Fehler im Layout der Navigation wurden Menüpunkte teilweise vom Firmenlogo verdeckt. Dies wurde behoben.
- In der mobilen Ansicht des Firefox Browsers konnte das Megamenü nicht geöffnet werden. Dies wurde behoben.
- Bei der Option "Bild und Text (vollbreite Fußzeile)" in den Einstellungen des Bilderbox-Widgets wurde der Link nicht über die volle Breite angezeigt. Dies wurde behoben.
- Fehlerhinweise konnten unter bestimmten Umständen von anderen Elementen überlagert werden. Dies wurde behoben.
- Durch einen Fehler wurde der Vorschautext eines Artikels nicht im Warenkorb ausgegeben, wenn am Artikel kein Artikeltext gepflegt wurde. Dies wurde behoben.
- Beim Wechseln von Varianten wurde die Anzeige des Artikelpakets nicht ausgeblendet, selbst wenn diese Variante kein Artikelpaket war. Dieses Verhalten wurden behoben.
- Unter gewissen Umständen wurden Eingabefelder im Google Chrome Browser mit der E-Mail des Benutzers vorausgefüllt. Dies wurde behoben.
- Beim Navigieren zu URLs, die Parameter enthalten, werden nun ungültige Werte herausgefiltert.
- Durch einen Fehler konnten Adressen nicht mehr gelöscht werden. Dies wurde behoben.
- Durch einen Fehler wurde die Einstellung zur Anzeige und Validierung der Bundeslandauswahl nicht immer berücksichtigt. Dies wurde behoben.
- Die Postnummer in den Adressdaten für Packstation/Postfiliale wird nun nicht mehr aus dem Eingabefeld "Adresse 3", sondern aus dem Eingabefeld "Postnummer" gelesen.
- Beim Versenden des Links zum Zurücksenden des Passworts wird jetzt die URL des jeweiligen Mandanten verwendet.
- Durch einen Fehler wurde die Cross-Selling-Artikelliste in der Artikeleinzelansicht in bestimmten Fällen nicht beim ersten Seitenaufruf geladen. Dies wurde behoben.
- Durch einen Fehler beinflusste die Sortierung der Kategorie auch die Sortierung einzelner Artikel, wenn für die Einstellung **Varianten nach Typ anzeigen** die Option "dynamisch" gewählt war. Ab sofort wird bei einzelnen Artikeln immer die Variante mit dem niedrigsten Preis angezeigt.
- Unter bestimmten Umständen konnte Inhalt im rechten Bereich der Artikeleinzelansicht unter den Footer scrollen. Dies wurde behoben.
- Durch einen Fehler funktionierten Bestellmerkmale vom Typ "Auswahl" nicht wie intendiert. Dies wurde behoben.

## v3.2.2 (2019-04-10) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.2.1...3.2.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Alle globalen Daten werden nun wieder standardmäßig geladen, falls kein expliziter Kontext angegeben ist.
- Durch einen Fehler ragten einige Widgets über die Grenzen der Raster-Widgets hinaus. Dies wurde behoben.
- Durch einen Fehler wurden keine Kategorien in der Kategorie-Navigation des ShopBuilder-Headers ausgegeben. Dies wurde behoben.

## v3.2.1 (2019-04-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.2.0...3.2.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler wurde variablen Benutzern das Auftragshistorie-Widget nicht angezeigt. Dies wurde behoben.

## v3.2.0 (2019-03-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.1.3...3.2.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Bestellmerkmale vom Typ **Auswahl** werden nun unterstützt und die Beschreibung des Merkmals im Frontend ausgegeben. Die **Beschreibung** der Merkmale sollten dahingehend überprüft werden, ob der eingegebene Text im Webshop angezeigt werden soll.
- Falls das Markup nicht korrekt angezeigt wird, kann der Button **Inhalte neue generieren** verwendet werden.

### Hinzugefügt

- Das Widget "Raster mit 2 Spalten" kann jetzt für verschiedene Displaygrößen unterschiedlich angeordnet werden.
- Im Bilderkarussell-Widget des ShopBuilders kann nun das Seitenverhältnis der Bilder eingestellt werden.
- Im Bilderbox-Widget des ShopBuilders kann nun das Seitenverhältnis des Bildes eingestellt werden.
- Der Layout-Container **Basket.ExtendOverlayButtons** wurde hinzugefügt.
- Die im Backend eingestellten Sichtbarkeiten für Auftragsstatus werden nun bei der Ausgabe in Ceres berücksichtigt.
- Bestellmerkmale vom Typ **Auswahl** werden nun unterstützt.

### Geändert

- In den Adressinformationen der Bestellbestätigungsseite wird jetzt die Ansprechpartner ausgegeben, wenn es sich um eine Firmenadresse handelt.
- Im Header können jetzt alle Widgets des ShopBuilders verwendet werden, die auch für statische Seiten zur Verfügung stehen.
- Folgende Einstellungen wurden `deprecated` gesetzt und aus dem Bereich **Kaufabwicklung und Mein Konto** der Ceres-Konfiguration entfernt: Anzahl der Aufträge pro Seite in der Auftragshistorie, Retourenabwicklung im Mein-Konto-Bereich zulassen, Änderung der Zahlungsart durch den Kunden zulassen. Diese Einstellungen sind nun im ShopBuilder-Widget **Auftragshistorie** zu finden.
- Zum Ändern des Passworts im Mein-Konto-Bereich ist jetzt die Eingabe des bisherigen Passworts erforderlich.
- Das Laden des Kategoriebaums wurde überarbeitet und ist nun deutlich performanter.
- Der Suche wurden Hinweistexte für **Suchergebnise gefunden** und **keine Suchergebnisse** hinzugefügt

### Behoben

- Durch einen Fehler wurde der Abstand zwischen Page-Body und -Header falsch berechnet. Dies wurde behoben.
- Artikelpakete wurden nicht angezeigt, wenn die Einstellung **Artikelpaket durch Basisartikel ersetzen** gewählt wurde. Dies wurde behoben.
- Durch einen Fehler wurden Bilder im Internet Explorer 11 nicht korrekt geladen. Dies wurde behoben.
- Wenn in der Beschreibung der strukturierten Daten auf der Artikeleinzelansicht Tabstopps vorkamen, führte dies zu Fehlern. Dieses Verhalten wurde behoben.
- Die Einstellung für die Anzahl der Nachkommastellen wird jetzt wieder korrekt ausgewertet.
- Merkmale an Artikeln verhindern nicht mehr das Hinzufügen zum Warenkorb aus Artikellisten heraus.
- Es werden keine leeren Meldungen mehr angezeigt.
- Die Verknüpfung zwischen Verfügbarkeiten im Backend und den für Suchmaschinen benötigten Verfügbarkeiten war fehlerhaft. Das Verhalten wurde behoben.
- Durch einen Fehler in den Varianteneigenschaften wurde der Warenkorb im Checkout nicht mehr gerendert. Dies wurde behoben.
- Die Kategorie-Option "Sichtbar: Nach Login" wird nun berücksichtigt. Kategorien, für die diese Option aktiv ist, werden erst nach Login in der Navigation angezeigt. Ein direkter Aufruf der URL leitet auf die Login-Seite.
- Im Adressfeld konnten keine Eingaben gemacht werden, die ein Apostroph enthalten. Dieser Fehler wurde behoben.

## v3.1.3 (2019-03-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.1.2...3.1.3" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Es wurden Kompatibilitätsprobleme im Zusammenhang mit dem Internet Explorer und der Artikelseite behoben.


## v3.1.2 (2019-03-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.1.1...3.1.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Checkout und Warenkorb können Wunschmaß-Artikel jetzt korrekt darstellen und verarbeiten.

## v3.1.1 (2019-03-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.1.0...3.1.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Im Bilderbox-Widget werden Varianten wieder korrekt dargestellt. Danke an daniel-mannheimer.
- Durch einen Fehler konnten Artikel unter gewissen Umständen nicht in den Warenkorb gelegt werden. Dies wurde behoben.

## v3.1.0 (2019-02-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.0.2...3.1.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Für eine sichere Verwendung des Google reCAPTCHA im Kontaktformular sollte der von Google bereitgestellte geheime Webseiten-Schlüssel in den Ceres-Einstellungen hinterlegt werden.

### Hinzugefügt

- Der Komponente SingleItem wurde eine berechnete Eigenschaft hinzugefügt um Varianteneigenschaften eines Artikels auszulesen. Dadurch können diese beispielsweise in einem Theme ausgegeben werden.
- Varianteneigenschaften vom Typ **Keine** können nun im Bestellprozess am Warenkorb angezeigt werden.
- Die URL-Picker-Komponente kann nun in ShopBuilder-Widgets verwendet werden. Dadurch können beispielsweise Linkziele für Artikelbilder definiert werden. Der URL-Picker steht für die Bilderbox, das Bilderkarussell und die Linkliste zur Verfügung.
- Die Abstände des Trennlinien-Widgets können jetzt eingestellt werden.
- Es wurde eine Checkout-Vorlage für den ShopBuilder erstellt, die alle für den Bestellvorgang nötigen Widgets beinhaltet und das Design der Ceres-Kaufabwicklung abbildet.
- Das Shop-Builder Widget für Artikellisten kann nun Artikel nach Hersteller filtern.

### Geändert

- ShopBuilder-Inhalte der Kategorie für Versandinformationen werden jetzt auch im entsprechenden Overlay auf Artikel- und Kategorieseiten angezeigt.
- Die Einstellung zum Verknüpfen einer Kategorie zur Darstellung von zusätzlichen Versandinformationen wurde in die globalen Einstellungen des ShopBuilders überführt.
- Es wurden Übersetzungen hinzugefügt, um die Formatierung von Streichpreisen einstellbar zu machen.
- Vor dem Senden des Kontaktformulars wird das Google reCAPTCHA über den geheimen Webseiten-Schlüssen verifiziert.

### Behoben

- Durch einen Fehler wurden artikelabhängige Gutscheine nicht entfernt wenn der betreffende Artikel aus dem Warenkorb entfernt wurde. Dies wurde behoben.
- Die URLs in der Sidebar-Navigation werden jetzt in allen Sprachen korrekt generiert.
- Wenn aufgrund von Beschränkungen kein Versandprofil ausgewählt werden kann, wird nun eine entsprechende Fehlermeldung im Checkout ausgegeben und der Bestellabschluss verhindert.
- Durch einen Fehler wurde die Anrede in der Adresseingabe für verschiedene Lieferländer synchron dargestellt, obwohl sie für diese unterschiedlich konfiguriert wurde. Dies wurde behoben.
- Durch einen Fehler wurde die Höhe des Headers für mobile Geräte nicht korrekt berechnet. Dies wurde behoben.
- Durch einen Darstellungsfehler wurde der Bestell-Button im Checkout überlagert. Dies wurde behoben.
- Durch einen Darstellungsfehler wurde das Bilderbox-Widget im Internet Explorer fehlerhaft dargestellt. Dies wurde behoben.
- Durch einen Fehler funktionierte die Seitennummerierung im MyAccount-Bereich nicht richtig. Dies wurde behoben.
- Bei zusätzlichen Mandanten kam es zu Fehlern bei der Seitennummerierung von Kategorieseiten. Dieses Verhalten wurde behoben.
- Auf Touch-Geräten wurden Klicks auf Links im Megamenü nicht registriert. Dieses Verhalten wurde behoben.
- Durch einen Fehler führten Ladeanimationen zum Einblenden des Scrollbalkens. Dies wurde behoben.
- Beim Wechsel der Variante in der Artikelansicht wurden Änderungen an der Minimal- und Maximalbestellmenge nicht übernommen. Dies wurde behoben.
- Nach dem Absenden des Kontaktformulars wird die Google reCAPTCHA-Abfrage nun zurückgesetzt, um ein erneutes Senden des Formulars zu ermöglichen.
- Es können nun Kategorien in der Vorschau angezeigt werden, die nicht mit dem Mandanten verknüpft sind.
- Das Bestellmerkmal vom Typ **Kommazahl** funktionierte nicht korrekt. Dieses Verhalten wurde behoben.
- Durch einen Fehler wurde der Name einer Kategorie auf der Kategorieseite zu weit links angezeigt. Dies wurde behoben.
- Durch einen Fehler wurden Kategoriebilder auf iOS-Endgeräten zu groß dargestellt. Dies wurde behoben.
- Artikel ohne Preis können in der Admin-Vorschau nicht mehr in den Warenkorb gelegt werden.

## v3.0.2 (2019-02-07) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.0.1...3.0.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Verkaufspreise werden in der Kategorieansicht und in der Artikeleinzelansicht jetzt nicht mehr zusätzlich über ElasticSearch geladen.
- Die minimale und maximale Anzahl an Artikeln und Varianten führte teilweise bei Änderungen an Artikeln im Warenkorb zu Fehlern. Dieses Verhalten wurde behoben.

## v3.0.1 (2019-01-24) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.0.0...3.0.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler wurden keine Artikellisten der Typen Cross-Selling und Tags auf der Artikelseite ausgegeben. Dies wurde behoben.
- Auf Kategorieseiten wurden die Kategoriebeschreibungen 1 und 2 nicht richtig ausgegeben. Dieses Verhalten wurde behoben.
- Auf der Artikeleinzelansicht kam es vor, dass die Auswahl "Bitte wählen" nicht angezeigt wurde. Das Verhalten wurde behoben.

## v3.0.0 (2019-01-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.17.1...3.0.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Durch Änderungen am Markup der ShopBuilder-Widgets müssen nach dem Update die ShopBuilder-Seiten neu generiert werden. Die Seiten können im Menü **CMS » ShopBuilder** über den Button **Inhalte neu generieren** links in der Werkzeugleiste generiert werden.
- Themes, die mit älteren Ceres-Versionen kompatibel waren, müssen ggf. aktualisiert werden. Weitere Informationen zum Aktualisieren von Themes findest du im <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/referenz/ceres-3-update" target="_blank" rel="noopener"><b>Handbuch</b></a>.

### Hinzugefügt

- Artikel, die aufgrund ihrer Einstellungen (z.B. kein Preis für den Webshop) nicht im Shop angezeigt werden würden, werden nun im Vorschaumodus des Webshops angezeigt.
- Das FAQ-Widget für den ShopBuilder wurde hinzugefügt. Mithilfe des Widgets lässt sich eine FAQ-Seite im Webshop pflegen.
- Es wurden 4 neue Layout-Container hinzugefügt: **Basket.BeforeBasketTotals**, **Basket.AfterBasketTotals**, **BasketPreview.BeforeBasketTotals** und **BasketPreview.AfterBasketTotals**.
- Adressen für Firmenkunden haben nun anstelle der Felder für Vor- und Nachname ein Feld für die Ansprechpartner.
- Die Gültigkeit der Kaufabwicklungs-URL kann nun in der Ceres-Konfiguration festgelegt werden.

### Geändert

- Bootstrap wurde auf Version 4.2.1 aktualisiert. Weitere Informationen zu Bootstrap und zum Aktualisieren von Themes findest du im <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/referenz/ceres-3-update" target="_blank" rel="noopener"><b>Handbuch</b></a>.
- Die ShopBuilder-Widgets werden ab sofort gruppiert dargestellt.
- Die dynamische Darstellung von Varianten berücksichtigt jetzt die Einstellung **Gruppierbar in Artikellisten** für Attribute.
- Das TopBar-Widget wird jetzt auf kleinen Bildschirmgrößen optimiert dargestellt.
- Auf iOS-Geräten wird der Zoom verhindert, wenn man auf Eingabefelder wie z.B. Texte in der Adresseingabe tippt.
- Die Texte für die Altersfreigabe von Artikeln wurden für die Artikeleinzelansicht überarbeitet.
- Die Einstellung zum Beschränken der zuletzt gesehenen Artikel wurde als **deprecated** markiert.
- Wenn eine Artikelliste als Karrussell dargestellt wird, werden auf mobilen Endgeräten die Artikelbilder nicht länger als Karussell dargestellt.
- Die Darstellung von Buttons in der Kaufabwicklung und im Mein-Konto-Bereich wurde für kleine Displaygrößen überarbeitet.
- In Artikellisten werden neben dem Artikelnamen jetzt auch die Attribute der jeweiligen Variante ausgegeben.
- Die Ladeanimation **Blur** wurde entfernt.
- Die Darstellung von Listen- und Newsletter-Widgets wurde vereinheitlicht.
- Das Mega-Menü wurde überarbeitet und wird jetzt konsistenter auf verschiedenen Browsern dargestellt.
- Auf kleinen Geräten mit einer Auflösung zwischen 768px und 992px werden ab sofort nur noch bis zu 3 Artikel nebeneinander dargestellt. Vielen Dank an <a href="https://github.com/lkreimann" target="_blank" rel="noopener"><b>@lkreimann</b></a> für diese Änderung.
- Die Darstellung der Artikel im Warenkorb, in der Warenkorbvorschau und im Kassenbereich wurden für den Internet Explorer überarbeitet und vereinheitlicht.
- Der **Neue Adresse**-Button in der Kaufabwicklung passt sich jetzt der Breite des enthaltenen Textes an.
- Tags für Shop-Aktionen werden jetzt auch bei Artikelpaketen angezeigt.
- Die Darstellung von Artikel-Informationen im Warenkorb, in der Warenkorbvorschau und im Kassenbereich wurde optimiert.
- Das in der Kaufabwicklung angegebene Geburtsdatum wird jetzt validiert.

### Behoben

- Es wurde ein Fehler bei der Sortierung und dem Filtern nach Preisen behoben.
- Es wurde ein Darstellungsfehler des Listen-Widgets im Footer für mobile Endgeräte behoben.
- Ein Darstellungsfehler, durch den die Warenkorbvorschau beim Internet Explorer nicht in der korrekten Höhe dargestellt wird, wurde behoben.
- Die **Bitte wählen**-Option der Attributauswahl wird ausgeblendet, wenn die Hauptvariante nicht aktiv ist.
- Im Live-Shopping-Widget wurden die Texte "Tage", "Stunden", "Minuten" und "Sekunden" nicht korrekt übersetzt. Dies wurde behoben.
- Die Postnummer wird jetzt beim Versand an eine Packstation/Postfiliale an der Adresse angezeigt.
- Durch einen Fehler funktionierte der Layout-Container **RegistrationOverlay.ExtendOverlay** nicht richtig. Dies wurde behoben.
- Es wurden Probleme bei der Darstellung von Struktur-Widgets behoben.
- Die Links auf die vorherige bzw. die folgende Kategorie-Seite werden jetzt korrekt ausgegeben.
- Durch einen Fehler wurde das Bilderbox-Widget des ShopBuilders auf mobilen Endgeräten unter bestimmten Umständen nicht vollständig angezeigt. Dies wurde behoben.
- Texte für Shop-Aktionen können nun über im Menü **CMS » Mehrsprachigkeit** übersetzt werden.
- Durch einen Fehler konnten bei einer Gastbestellung Adressen ohne E-Mail-Adresse angelegt werden. Dies wurde behoben.
- Durch einen Fehler wurden in den Filtern einer Kategorie die Kategorien angezeigt, welche nur in der Suche ausgegeben werden sollen. Dies wurde behoben.
- Durch einen Fehler wurde der Back-To-Top-Button im Footer des ShopBuilders nicht angezeigt. Dies wurde behoben.
- Apostrophen waren im Titel eines Widgets nicht zulässig. Dies wurde behoben.
- Durch einen Fehler funktionierte die Währungsumrechnung im Live-Shopping-Widget nicht. Dies wurde behoben.
- Die Rabattwerte wurden auf der Bestellbestätigung teilweise fehlerhaft dargestellt. Das Verhalten wurde behoben.

## v2.17.1 (2018-12-03) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.17.0...2.17.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler konnten Hauptvarianten mit Attributverknüpfung nicht in den Warenkorb gelegt werden. Dies wurde behoben.

## v2.17.0 (2018-11-27) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.16.3...2.17.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Durch die Umstellung auf den automatischen E-Mail-Versand in Ceres, muss die "Passwort vergessen" E-Mail-Vorlage in das Menü **System » Mandant » Mandant wählen » E-Mail » Vorlagen** überführt werden.
- Durch die Umstellung auf den automatischen E-Mail-Versand in Ceres muss die Ereignisaktion für das Versenden der Bestellbestätigung gelöscht werden, da sonst 2 Mails verschickt werden.

### Hinzugefügt

- Die Konfiguration der Kategoriebeschreibungen wurde angepasst und ermöglicht es nun, Kategoriebeschreibung 1 und 2 auf den Kategorieseiten auszugeben und diese über oder unter der Artikelliste zu positionieren.
- Auf der Bestellbestätigungsseite wurde ein neuer Layout-Container hinzugefügt. Dieser befindet sich unterhalb des Textes "Ihre Bestellung wird bearbeitet."
- Es wurde ein neues Widget hinzugefügt, um Live-Shopping-Angebote im ShopBuilder zu platzieren.

### Geändert

- Der Konfigurationswert: "Variante-ändern-Button anzeigen" wurde deprecated.
- Fehlermeldungen im Frontend werden jetzt responsive mit einheitlicher Breite dargestellt.
- Preisangaben in strukturierten Daten werden jetzt auf zwei Stellen gerundet.
- Die Position des Layout-Containers "LoginOverlay.ExtendOverlayButtons" wurde angepasst, sodass Inhalte wieder an der erwarteten Stelle ausgegeben werden.

### Behoben

- Es wurde ein Darstellungsfehler behoben, durch den Bilder in Slidern im Internet Explorer 11 verzerrt dargestellt wurden.
- Es wurde ein Darstellungsfehler behoben, durch den im Warenkorb der Gesamtpreis und der Löschen-Button im Internet Explorer 11 abgeschnitten wurden.
- Es wurde ein Darstellungsfehler behoben, durch den in der Sprachauswahl des Headers nicht alle Sprachen angezeigt wurden.
- Es wurde ein Darstellungsfehler behoben, durch den Texte auf kleinen Bildschirmen im Slider-Widget abgeschnitten wurden.
- Es wurde ein Darstellungsfehler behoben, durch den Artikelinformationen in der Bestellbestätigung im Internet Explorer 11 falsch dargestellt wurden.
- Im ShopBuilder-Widget für rechtliche Informationen können ab sofort .pdf-Dateien hochgeladen werden.
- Bestellmerkmale vom Typ **Keine** zeigen nun den Tooltip mit der Beschreibung korrekt an.
- Wenn die Kategorie-Navigation keine Kategorien enthält, wird nun eine Mindesthöhe gesetzt.
- Bei Artikeln mit Varianten wurde bei einem Variantenwechsel der eingetragende Wert der Bestellmerkmale nicht berechnet. Dies wurde behoben.
- Artikel werden nun aus dem Warenkorb entfernt, wenn diese zwischenzeitlich, beispielsweise aufgrund eines Sprachwechsels, nicht mehr verfügbar sind.
- Cross-Selling-Artikel vom Typ **Paket** werden nun korrekt angezeigt.
- Die URLs für Bestellmerkmale vom Typ **Datei** wurden teilweise als 404-Seite ausgegeben. Das Verhalten wurde behoben.
- Es kam zu Fehlern, wenn man auf einer Kategorieseite war, die nicht in der Linkliste angezeigt wurde und die Seite oder Sortierung gewechselt hat. Dieses Verhalten wurde behoben.
- Es wurde in Fehler behoben, durch den die Höhe des Headers falsch berechnet wurde, wenn das Webshop-Logo aus dem Cache geladen wurde.
- Hauptvarianten mit inaktiven Varianten zeigen in der Kategorieansicht nun den "In den Warenkorb" Button an. Vorher wurde der Pfeil "Zum Artikel" angezeigt.


## v2.16.3 (2018-11-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.16.2...2.16.3" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Das Wechseln der Währung über die Top Bar des ShopBuilders war nicht möglich. Dies wurde behoben.
- Es wurde ein Fehler behoben, durch welchen die Artikelsuche auf bestimmten Android-Endgeräten nicht funktionierte.

## v2.16.2 (2018-11-07) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.16.1...2.16.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler war es im Mozilla Firefox Browser nicht möglich, in der Warenkorbvorschau zu scrollen. Dies wurde behoben.
- Es wurde ein Fehler behoben, durch den die Inhaltsauswahl in der Artikeleinzelansicht angezeigt wurde, obwohl diese nicht benötigt wurde.
- Es wurde ein Fehler behoben, durch welchen der Warenkorb-Button beim Aufrufen einer nicht kaufbaren Hauptvariante nicht ausgegraut wurde.

## v2.16.1 (2018-10-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.16.0...2.16.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler im Newsletter-Widget wurden die Eingaben bei der Registrierung zum Newsletter nicht validiert. Dies wurde behoben.
- Es wurde ein Fehler bei der Variantenauswahl behoben, der dazu führte, dass Artikel mit bestimmten Attributkombinationen nicht mehr kaufbar waren.
- Durch einen Fehler wurde die Suche bei einem Klick auf einen Suchvorschlag ausgeblendet. Dies wurde behoben.

## v2.16.0 (2018-10-23) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.15.0...2.16.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Das Newsletter-Widget für den ShopBuilder wurde zu Ceres hinzugefügt.
- Es wurden 2 neue Layout-Container in der Artikelliste im Warenkorb hinzugefügt.
- Es wurde ein neuer Layout-Container hinzugefügt, der es ermöglicht das Bilderkarussell auf der Artikeleinzelansicht auszutauschen.
- Bei Formularen in Ceres wird nun initial immer das erste Feld fokussiert.
- Es wurde ein EventListener hinzugefügt, über welchen man Benachrichtigungen in Ceres ausgeben kann.
- Dem Breadcrumb-Widget des ShopBuilders wurde die Option "Auf Content-Kategorien anzeigen" hinzugefügt, über welche man die Breadcrumbs auf Content-Kategorien ein- und ausblenden kann.
- Alle Vuex-Mutationen werden nun als JavaScript CustomEvent realisiert, damit andere Plugins/Themes besser auf Änderungen im Webshop reagieren können.

### Geändert

- Die Warenkorbvorschau wurde überarbeitet, um auf mobilen Endgeräten besser zu funktionieren. Eine neue Landscape-Ansicht wurde hinzugefügt.
- Bevor der Titel einer Kategorie beim Wechseln aktualisiert wird, wird das Element auf seine Existenz hin geprüft. Hierdurch werden eventuelle Fehler auf Content-Kategorien ausgeschlossen.
- Der Login-Bereich in Ceres wurde leicht angepasst, um sich der gesamtheitlichen Gestaltung von Ceres anzupassen.
- Die Felder für die maximale Kategorieanzahl des Navigations-Widgets werden nun auf Standardwerte gesetzt, falls diese unausgefüllt sind. Hierdurch soll verhindert werden, dass Kategorien in der Navigation fehlen.
- Die Datenstrukturen für die Kategorie-Navigation wurden minimiert, um die Ladezeit zu verbessern.
- Breadcrumbs werden nun auf Content-Kategorien ausgegeben, auch wenn diese nicht in der Navigation angezeigt werden.
- Die Darstellung von Rabatten wurde angepasst.
- Es wurden neue JavaScript-Events hinzugefügt, um Änderungen am Browserverlauf, die Benutzerregistrierung und das Senden eines Kontaktformulares registrieren zu können. Wir bedanken uns bei @felixries für die Hilfe.
- Änderungen der Filter, der Sortierung oder der Seite werden nun als Eintrag im Browserverlauf hinzugefügt. Wir bedanken uns bei @felixries für die Hilfe.
- In IO ist es nun möglich, während eines REST-Aufrufs das derzeitige Template auszulesen.

### Behoben

- Durch einen Fehler wurden Suchbegriffe auf der Suchseite nicht richtig dargestellt. Dies wurde behoben.
- Durch einen Fehler wurde die Einwilligung zur Datenübermittlung bei bestimmten Versandprofilen nicht angezeigt. Dies wurde behoben.
- Im Bereich der Rich Snippets kam es zu einem fehlerhaften Aufruf. Dieses Verhalten wurde behoben. Wir bedanken uns bei @Lauflust für die Hilfe.
- Durch einen Fehler konnten bestimmte Kategorie-Seiten vom Typ **Content** nicht aufgerufen werden. Dies wurde behoben.
- Auf der Login-Seite kam es zu Konsolenfehlern. Diese wurden behoben.
- Durch einen Fehler ließ sich die PayPal PLUS-Wall auf mobilen Endgeräten nicht richtig bedienen. Dies wurde behoben.
- Die Hintergrundfarbe des Such-Icons in der Top-Bar nutzt nun die korrekte SCSS-Variable.
- Durch einen Fehler wurden die Felder **Straße** und **Hausnummer** in der Adresseingabe bei einem Wechsel des Landes zurückgesetzt. Dies wurde behoben.
- Durch einen Fehler wurden keine Artikel auf der Retourenseite dargestellt. Dies wurde behoben.
- Durch einen Fehler wurden Icons von Zahlungsanbietern in der Bestellbestätigung nicht angezeigt. Dies wurde behoben.
- Durch einen Fehler wurde der Seitentitel auf Contentseiten nicht korrekt gefüllt. Dies wurde behoben.
- Durch einen Fehler wurde die Beschreibung einer Merkmalgruppe nicht komplett angezeigt. Dies wurde behoben.
- Beim Navigieren im Kategoriebaum wurde der alte Konfigurationswert für den Seitentitel ausgelesen und nicht der Wert aus der Mehrsprachigkeits-UI. Dieses Verhalten wurde behoben.
- Beim Aufrufen der Retourenübersicht kam es zu JavaScript-Fehlern. Dieses Verhalten wurde behoben.
- Bei der Validierung von Gutscheinen wurde anstatt des konkreten Fehlercodes der allgemeine Fehlercode ausgegeben. Dieses Verhalten wurde behoben.
- Es wurden verschiedene SEO-relevante Anpassungen durchgeführt.
- Durch einen Fehler wurden nicht alle Artikel in die **Zuletzt gesehen**-Artikelliste aufgenommen. Dies wurde behoben.
- Durch einen Fehler wurde die Auswahl einer Rechnungsadresse nicht korrekt gespeichert. Dies wurde behoben.
- Bei mehreren Bestellmerkmalen vom Typ Text wurden nicht alle Werte in den Warenkorb übernommen. Dieses Verhalten wurde behoben.
- Durch einen Fehler funktionierte der Wechsel zwischen Content-Kategorien auf Touch-Geräten nicht richtig. Dies wurde behoben.
- Durch einen Fehler verdeckte der Header einen Teil des Webshops. Dies wurde behoben.
- Es wurde ein Fehler behoben, durch den die Auswahl einer Variante in der Einzelansicht nicht möglich war, wenn mindestens 2 Varianten aus derselben Attributkombination bestanden oder keine Attribute hatten. In solchen Fällen kann die Auswahl nun über die Dropdown-Liste Inhalt getroffen werden.
- Durch einen Fehler wurden die Kategoriefilter bei einem Wechsel der Kategorien ausgegeben. Dies wurde behoben.
- Es wurde ein Fehler behoben, durch welchen bei Merkmalen, die als Checkbox im Shop angezeigt wurden, der Wert "True" im Warenkorb angezeigt wurde.
- Durch einen Fehler verhinderte das ShopBuilder Widget **Rechtliche Informationen** das Scrollen im Firefox Browser. Dies wurde behoben. Das Widget muss gegebenenfalls erneut im ShopBuilder gespeichert werden.
- Durch einen Fehler im Zusammenhang mit Kategoriebildern wurde die Scrollfunktion des Safari-Browsers beeinträchtigt. Dies wurde behoben.

## v2.15.0 (2018-09-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.14.0...2.15.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### ToDo

- Im Zuge eines Bugfixes für das Bilderkarussell des Shop Builders wurde die Struktur der Einstellungen angepasst. Bilderkarussells, die vor der Version 2.15 erstellt wurden, funktionieren weiterhin, können jedoch nicht mehr bearbeitet werden. Sollten Sie Änderungen an diesem Widget vornehmen wollen, erstellen Sie bitte ein neues Bilderkarussell.

### Hinzugefügt

- Dem SEO-Tab der Ceres-Konfiguration wurde ein Mapping hinzugefügt, durch welches Schema.org Verfügbarkeiten auf plentymarkets Verfügbarkeiten übertragen werden können.
- Die folgenden Shop Builder Widgets wurden hinzugefügt: Top-Bar (Header), Kategorie-Navigation (Header), Breadcrumb-Navigation (Header), Rechtliche Informationen (Footer), Liste, Linkliste, Trennlinie.
- Die Slides des Shop Builder Bilderkarussels können nun durch zusätzliche Slides erweitert werden.
- Die Bildüberschriften von Slides im Bilderkarussell des Shop Builders können jetzt bearbeitet und ausgeblendet werden.
- Der Titel der Shop Builder Bilderbox kann jetzt bearbeitet werden.
- Die Überschrift von Artikellisten im Shop Builder kann nun bearbeitet und ausgeblendet werden.
- Es wurden Vorlagen für Header, Footer und Startseite hinzugefügt, welche im Shop Builder verwendet werden können.

### Geändert

- In der Kaufabwicklung wurden Events hinzugefügt, die auf Änderungen an der ausgewählten Adresse hinweisen.
- Die Fehlermeldungen auf der Kontaktseite werden jetzt analog zu Fehlermeldungen auf anderen Seiten dargestellt.
- Die Fehlermeldungen der Kaufabwicklung wurden dahingehend verbessert, dass ungültige Eingabefelder hervorgehoben werden.
- Die Fehlermeldungen der Adresseingabe wurden dahingehend verbessert, dass ungültige Eingabefelder hervorgehoben werden.
- Die Anzahl der sichtbaren Artikel einer Artikelliste ist nun wählbar.

### Behoben

- Die am Kunden hinterlegte Login-URL funktioniert nun auch für Ceres.
- Durch einen Fehler wurde das Hinzufügen zur Wunschliste durch Klick auf den Wunschlisten-Button nicht immer registriert. Dies wurde behoben.
- Die Höhe von Widgets in einem Shop Builder Strukturelement mit vier Spalten wird nun korrekt berechnet.
- Die maximale Anzahl der Artikel wird nun in der "Zuletzt angesehen"-Artikelliste des Shop Builders beachtet.

## v2.14.0 (2018-08-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.13.0...2.14.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Es wurden zwei zusätzliche Layout-Container hinzugefügt, um Header und Footer des Shop Builders anzeigen zu können.
- Kategorien wurden als Filteroptionen bei Suchergebnissen hinzugefügt.
- Artikellisten und Suchergebnisse können jetzt zufällig sortiert werden.
- Es wurde ein neuer Hook hinzugefügt, über welchen auf das Ereignis Plugin-Bau reagiert werden kann. Dadurch wird die Invalidierung des Content Caches für das gebaute Plugin-Set ermöglicht.
- Es wurde eine Checkbox zur Adresseingabe hinzugefügt, über welche die Lieferung an eine Packstation/Postfiliale in Deutschland aktiviert werden kann. Bei der Aktivierung der Checkbox passen sich die Eingabefelder an den Typ des Lieferorts an.
- Es wurde eine neue Option zum Tab Paginierung und Sortierung der Ceres Konfiguration hinzugefügt. Diese bestimmt, ab welcher Seitenzahl der Wert **noindex** für SEO robots gesetzt wird.

### Geändert

- Die Einträge von Artikellisten füllen jetzt die gesamte Breite der Liste aus.
- Die Livesuche im Header und die Suchseite wurden aneinander angepasst, sodass sie nun die gleichen Suchergebnisse liefern.

### Behoben

- Durch einen Fehler konnten am Artikel keine Varianten ausgewählt werden, wenn der Attributname zu lang war. Dies wurde behoben.
- Cross-Site-Scripting wird jetzt in der Suche unterbunden.
- Die Mengeneingabe im Warenkorb berücksichtigt jetzt das in IO konfigurierte Dezimaltrennzeichen.
- Die Option "Navigationsleiste oben fixieren" im Tab Header funktioniert jetzt wieder wie gedacht.
- Durch einen Fehler ist der Login-Button bei der Anzeige auf mobilen Geräten rechts aus dem Bildschirm gerückt. Dies wurde behoben.
- Durch einen Fehler konnte man im Warenkorb die Menge der Artikel nicht ändern, wenn der Artikelname zu lang war. Dies wurde behoben.
- Durch einen Fehler ist der Browser bei einem Wechsel zwischen Kategorien nicht automatisch zurück nach oben gescrollt. Dies wurde behoben.
- Ein Fehler wurde behoben, durch den keine aussagekräftige Fehlermeldung ausgegeben wurde, wenn man versucht hat, einen Artikel ohne Warenbestand in den Warenkorb zu legen.
- Im Zusammenhang mit Artikelpaketen kam es zu JavaScript-Fehlern. Dieses Verhalten wurden behoben.
- In Callisto Shops mit eingebundenem Ceres Checkout kam es bei Auftragsanlagen, die Artikel mit Live-Shopping-Preisen beinhalteten, zu Fehlern. Dieses Verhalten wurde behoben.
- Um die Suchmaschinenoptimierung zu verbessern, wurden fehlende Title- und Alt-Tags hinzugefügt.
- Durch einen Fehler kam es bei Preisen zu Rundungsfehlern. Dies wurde behoben.

## v2.13.0 (2018-07-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.12.0...2.13.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### ToDo

- Falls nach dem Update auf Version 2.13 Artikellisten nicht auf der mit dem Shop Builder erstellten Startseite angezeigt werden, muss die Shop Builder Startseite erneut gespeichert werden.

### Hinzugefügt

- Es wurde ein neuer Layout-Container unterhalb der Bestelldetails auf der Bestellbestätigungsseite hinzugefügt.

### Geändert

- Der Grundpreis wurde für die Stückzahl 1 nicht ausgegeben. Dies wurde behoben. Die Anzeige des Grundpreises wird nun ausschließlich durch den an der Variante hinterlegten Wert bestimmt.
- Bei einem Wechsel der Kategorie scrollt der Browser nun automatisch zurück nach oben.
- Die Dropdown-Liste der Adressauswahl hat nun eine maximale Höhe. Hierdurch wird verhindert, dass bei einer großen Anzahl von Adressen eine Adressauswahl nicht mehr möglich ist.
- Es wird nun zwischen Verkaufs- und Aktionsgutscheinen unterschieden. Die Anordnung der Gutscheine wurde entsprechend angepasst.

### Behoben

- In der Navigation wurden alle Kategorien ausgegeben. Dieses Verhalten wurde behoben, sodass jetzt unterschiedliche Navigationen abhängig von Kundenklassen ausgegeben werden können.
- Es wurde ein Fehler behoben, durch den Ceres-Shops auf Microsoft Edge Browsern nicht richtig funktionierten.
- Durch einen Fehler kam es zu Rundungsfehlern in der Artikeldetailansicht. Dieser wurde behoben.
- Es wurde ein Fehler behoben durch welchen Artikelpakete unter bestimmten Umständen zu Vue.js-Fehlern im Webshop führen konnten.
- Der Fehler "No 'Access-Control-Allow-Origin' header is present on the requested resource" tritt nun nicht mehr auf.
- Durch einen Fehler wurde die Umsatzsteuer-ID auf der Registrierungsseite auch bei Nutzern validiert, die keine Firmenkunden sind. Dies wurde behoben.
- Wenn die "Passwort zurücksetzen"-E-Mail mit einem E-Mail-Client geöffnet wurde, wurde der Link nicht erkannt. Dieser Fehler wurde behoben.
- In der .twig-Datei der dritten Artikelliste wurden teilweise falsche IDs genutzt. Dieser Fehler wurde behoben.
- Die CDN-URLs für Artikelbilder werden nun korrekt mandantenabhängig geladen.
- Durch einen Fehler wurden keine Artikel zur **Zuletzt angesehen**-Liste hinzugefügt, wenn diese nicht auf der Artikelansicht verknüpft war. Dies wurde behoben.
- Durch einen Fehler wurden bestimmte Artikel auf der Bestellbestätigungsseite nicht ausgegeben, wenn sie Teil eines Artikelpakets waren. Dies wurde behoben.

## v2.12.0 (2018-07-10) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.11.0...2.12.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Artikelpakete können jetzt im Webshop dargestellt werden.
- Es wurde ein neues Widget für den Shop Builder hinzugefügt, welches Freitext und HTML darstellt.

### Geändert

- Benutzerspezifische Daten wie Warenkorb, Anmeldeinformationen und Wunschliste werden jetzt nachträglich geladen.
- Die Liste der zuletzt gesehenen Artikel wird jetzt nachträglich geladen.

### Behoben

- Diverse fehlerhafte Verlinkungen wurden behoben.
- Durch einen Fehler wurde die Artikel-ID im Warenkorb nicht angezeigt. Dies wurde behoben.
- Durch einen Fehler wurde unter Artikeln "inkl. Mwst." anstatt "zzgl. Mwst." angezeigt. Dies wurde behoben.
- Der Name des Webshops wird nun für die Seiten Warenkorb, Content-Kategorien, Kategorieseiten, Artikelansicht und Artikelsuche korrekt aus den Übersetzungen geladen.
- Wenn ein Kunde keinen Namen gespeichert hatte, wurde im Header manchmal eine falsche Begrüßung angezeigt. Dies wurde behoben.
- Durch einen Fehler konnten Artikel mit einem bestimmten Intervall im Warenkorb nicht korrekt bearbeitet werden. Dies wurde behoben.
- Der Wert für den Artikelnamen wird nun korrekt aus den Ceres-Dateien geladen.
- Es wurden fehlende Farben für die Artikelverfügbarkeiten 6-10 hinzugefügt.

## v2.11.0 (2018-06-26) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.10.0...2.11.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### ToDo

- Wenn die Social Media Bibliothek **Shariff** in einem Plugin verwendet wurde, muss diese ab sofort in diesem Plugin selbst integriert werden.

### Geändert

- Die Social Media Bibliothek **Shariff** wurde aus Ceres entfernt, da sie nicht mehr benötigt wird, seitdem das Social Media Plugin nicht mehr nativ in Ceres integriert ist.

### Behoben

- Der Name des Webshops im Titellisten-Widget des Shop Builders wird nun korrekt aus den Übersetzungen der Mehrsprachigkeitsoberfläche geladen.
- Der Alternativtext des Firmenlogos wird nun korrekt aus den Übersetzungen der Mehrsprachigkeitsoberfläche geladen.
- Der Seitentitel wird nun korrekt aus den Übersetzungen der Mehrsprachigkeitsoberfläche geladen.
- Für die Standardsprache wurde das Länderkürzel in der URL entfernt. Andere Sprachen werden mit Länderkürzeln in der URL erreicht.

## v2.10.0 (2018-06-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.9.1...2.10.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Die Ceres-Konfiguration wurde ins Deutsche übersetzt.
- Das Favicon kann nun direkt in der Ceres-Konfiguration über eine Dateiauswahl gewählt werden. Sollte hier kein Favicon gesetzt sein, greift das Favicon aus den alten Einstellungen im Menü **System » Mandant » Mandant wählen » Webshop » Einstellungen**.

### Geändert

- Die Konfiguration für das Shop- und Firmenlogo erfolgt nun über eine Dateiauswahl und nicht mehr über ein Textfeld.
- Die Konfiguration für das PDF des Widerrufsformulars erfolgt nun über eine Dateiauswahl und nicht mehr über ein Textfeld.
- Es ist nun möglich die Bestelldetails in der Auftragshistorie mit einem Theme zu überschreiben, da die Auftragshistorie-Komponente jetzt einen zweiten Parameter annimmt, welcher das Template für die Bestelldetails beinhaltet.
- Der Link zum Forum auf der "Vue.js konnte nicht initialisiert werden"-Fehlerseite besitzt nun ein nofollow-Tag.
- In der Kaufabwicklung wurden die Buttons zum Anlegen einer neuen Adresse für die mobile Ansicht optimiert und verdecken nun keine Elemente mehr.
- Wenn ein Kundenkonto gesperrt ist, erhält der Kunde jetzt eine entsprechende Nachricht.
- Auf der Bestellbestätigungsseite werden nun Netto- oder Bruttosummen hervorgehoben, abhängig von dem am Auftrag mitgegebenen Flag.
- Auf der Bestellbestätigungsseite wird nun das Lieferland an den Adressen ausgegeben.

### Behoben

- Durch einen Fehler wurden Warnhinweise nicht dargestellt. Dies wurde behoben.
- Durch einen Fehler wurde die gegenwärtige Seite beim Klick auf einen Link neu geladen. Dies wurde behoben.
- Durch einen Fehler wurde ein falsches Bild im Warenkorb-Overlay angezeigt. Dies wurde behoben.
- Wenn es für einen Artikel einen gesonderten Aufpreis für ein Bestellmerkmal gibt, wird dieser nun korrekt in der Artikelansicht angezeigt.
- Es gab einen Fehler im Zusammenhang von Bestellmerkmalen und normalen Merkmalen. Dieser wurde behoben.
- Durch einen Fehler wechselten die Summen in der Kaufabwicklung und im Warenkorb bei Änderungen nicht unmittelbar zwischen Netto- und Bruttosummen. Dies wurde behoben.
- Durch einen Fehler wechselte die Summenanzeige im Header nach Änderungen nicht direkt zwischen Brutto- und Nettosummen. Dies wurde behoben.

## v2.9.1 (2018-06-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.9.0...2.9.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler konnten Plugins mit eigener Kaufabwicklung keine Aufträge mehr anlegen. Dies wurde behoben.
- Durch einen Fehler wurden einstellige Nachkommastellen bei Preisen als zweistellige Nachkommastelle ausgegeben. Dies wurde behoben.

## v2.9.0 (2018-05-24) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.8.1...2.9.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Das Event **afterBasketItemAdded** wurde hinzugefügt, welches ausgelöst wird, sobald ein neuer Artikel in den Warenkorb gelegt wurde.
- Es wurde eine Checkbox hinzugefügt, mit der Kunden der Weitergabe ihrer Daten an Versanddienstleister zustimmen können.

### Geändert

- Sprachabhängige Konfigurationseinträge wurden aus der Ceres Konfiguration entfernt und in .properties Dateien ausgelagert, um über das Mehrsprachigkeits-Interface bearbeitet werden zu können.
- Die Anzeige für Brutto- und Netto-Preise sorgt nun dafür, dass der entsprechende Preis als fett dargestellt wird.
- Die Auswahl des Lieferlandes ist nun deaktiviert wenn der Shop-Besucher bereits eine Adresse gespeichert hat. In diesem Fall wird der Nutzer per Tooltip auf eine Änderung der Adresse hingewiesen.
- Der Name auf dem Kontaktformular ist nun kein Pflichtfeld mehr.

### Behoben

- Es wurden Anpassungen vorgenommen, um Webseitenübergreifendes Scripting zu unterbinden.
- Durch einen Fehler wurden die Trailing Slashes der Breadcrumb-Navigation und der Sprachauswahl nicht richtig gesetzt. Dies wurde behoben.
- Durch einen Fehler wurde die Überschrift der Artikelliste in der Artikeleinzelansicht nicht angezeigt. Dies wurde behoben.
- Durch einen Fehler wurden die Buttons zum Löschen und Bearbeiten der Bankdaten nicht richtig angezeigt. Dies wurde behoben.
- Durch einen Fehler wurde die Artikelansicht beim Auswählen der Suchvorschläge mit "Enter" nicht geöffnet. Dies wurde behoben.

## v2.8.1 (2018-05-16) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.8.0...2.8.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler wurden die Einstellungen des Bilderkarussell-Widgets des Shop Builders nicht korrekt ausgegeben. Dies wurde behoben.
- Durch einen Fehler konnte im Checkout nicht auf die Verlinkung zur Widerrufsbelehrung geklickt werden. Dies wurde behoben.

## v2.8.0 (2018-05-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.7.0...2.8.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### ToDo

- Plugins und Themes, die auf Übersetzungstexte in Ceres .properties Dateien zugreifen, müssen gegebenenfalls überarbeitet werden. Weitere Informationen unter: https://forum.plentymarkets.com/t/ankuendigung-anpassung-der-properties-dateien-in-ceres/340077
- Wenn die Artikelsortierung nach Preis aktiv ist, muss sie in der Ceres Konfiguration unter "Paginating and Sorting » Enable item sorting by" neu ausgewählt und erneut gespeichert werden.

### Hinzugefügt

- Die Elemente der Startseite wurden in editierbare Elemente für den Shop Builder ausgelagert.
- Es wurde ein Container hinzugefügt, um die Suchfilter zu überschreiben.
- Es wurden Facetten vom Typ: Preis hinzugefügt.
- Bei der Generierung von URLs wird nun die Einstellung zum Anhängen von Trailing-Slashes berücksichtigt.

### Geändert

- Die Konfiguration der Startseite wurde in den Shop Builder überführt.
- Externe URLs werden nun über das Attribut rel="noopener" aufgerufen.
- Ceres reagiert nun auf das Event "afterPaymentMethodChanged" und lädt bei Änderung der Zahlungsart die Daten vom Warenkorb erneut.
- In einer Kategorie wird nun der Meta-Titel als Titel verwendet. Sollte dieser nicht vorhanden sein, wird der Name der Kategorie verwendet.
- Die sprachabhängigen Texte in Ceres wurden neu sortiert und umbenannt, um sie auf die Veröffentlichung der Mehrsprachigkeitsfunktionen vorzubereiten.
- Die Sortierung nach Preis nutzt nun den durchschnittlichen Preis einer Variante anstatt des minimalen und maximalen Werts.

### Behoben

- Es wurden Fehler behoben, die in Firefox bei schnellen Wechseln zwischen Kategorien zu Problemen geführt hatten.
- Durch einen Fehler wurde das Event "afterPaymentMethodChanged" direkt nach dem Klick zum Wechsel der Zahlungsart ausgelöst. Nun wird das Event erst nach erfolgreicher Antwort vom Server ausgelöst.
- Durch einen Fehler wurde das Event "afterShippingProfileChanged" direkt nach dem Klick zum Wechsel des Versandprofils ausgelöst. Nun wird das Event erst nach erfolgreicher Antwort vom Server ausgelöst.
- Durch einen Fehler wurden Merkmale, welche nicht als Bestellmerkmale angelegt wurden, als solche in der Artikelansicht ausgegeben. Dies wurde behoben.
- Daten aus dem GlobalContext von Ceres wurden nicht geladen, wenn man über eine Route aus einem anderen Plugin kam. Dies wurde behoben.
- Bei der Benutzung von Ceres und IO auf einem weiteren Mandanten konnte es dazu kommen, dass Kategoriedetails vom Hauptmandanten geladen wurden. Dies wurde behoben.
- Es wurde ein Fehler behoben wodurch Seitennavigation und Breadcrumbs auf Touch-Geräten nicht bedienbar waren.
- Durch einen Fehler wurde die verlinkte Versandkostenkategorie nicht in der Artikelübersicht angezeigt. Dies wurde behoben.
- Es wurden verschiedene CSS-Fehler im Bilderkarrussell behoben.
- Wenn man zwischen Kategorien navigiert, ist der Browserverlauf nun normal bedienbar.

## v2.7.0 (2018-04-13) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.6.0...2.7.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Bei Artikeln ohne Bilder wird jetzt das konfigurierte Platzhalter-Bild im Webshop dargestellt.
- Der Tab "Design" und dessen zugehörige Einstellungen wurden zur Ceres Konfiguration hinzugefügt.
- Bestellmerkmale vom Typ Datei können jetzt verarbeitet werden.
- Eine Checkbox wurde zur Kontaktseite hinzugefügt, durch die der Nutzer das Lesen der Datenschutzerklärung bestätigen muss.
- Es wurde ein neuer Wert in der Konfiguration hinzugefügt, mit der die Checkbox für das Zustimmen der Datenschutzerklärung aktiviert oder deaktiviert wird.
- Auf der Kontaktseite wird dem Nutzer nun eine Fehlermeldung angezeigt, wenn dieser versucht das Formular abzuschicken, ohne dass alle Pflichtfelder ausgefüllt sind.

### Geändert

- Bilder in der Artikelbeschreibung verhalten sich jetzt responsive und brechen nicht mehr aus dem Layout der Seite aus.
- Die Meldung "Vue.js konnte nicht initialisiert werden" wird nun als span-Element und nicht mehr als h1-Überschrift angezeigt.
- In der Auswahl für Staaten und Bundesländer steht nun standardmäßig "Bitte wählen".
- Die Kontaktdaten vom Kunden im System sind nun mit der ersten angelegten Rechnungsadresse synchronisiert.
- Auf der Kontaktseite wurde ein Hinweis hinzufügt, dass Pflichtfelder durch "*" markiert sind.
- Die Kontaktseite wurde überarbeitet und hat nun das selbe optische Erscheinungsbild wie die restlichen Seiten.

### Behoben

- Durch einen Fehler haben die Buttons der Mengeneingabe in der Artikeleinzelansicht die Anzahl nicht mehr hoch- und runtergerechnet wenn das Bestellintervall des Artikels 0 war. Dies wurde behoben.
- Durch einen Fehler hat die Konfiguration für die Positionierung der Pagination nicht funktioniert. Dies wurde behoben.
- In der Bestellbestätigung wurde die aktuelle Zahlungsart nicht initial im Overlay angezeigt. Dies wurde behoben.
- Durch einen Fehler funktionierte die Touch-Navigation nicht richtig, wenn keine Unterkategorien vorhanden waren. Dies wurde behoben.
- Durch einen Fehler wurde die Anrede nicht korrekt gespeichert. Dies wurde behoben.
- Unter Umständen wurden bestimmte Script- und Style-Tags mehr als einmal gerendert. Dies wurde behoben.
- Durch einen Fehler wurden Meta-Informationen für Shop-Aktionen in der Artikeleinzelansicht nicht korrekt ausgegeben. Dies wurde behoben.
- Durch einen Fehler wurden Preisangaben in einigen Sprachen nicht korrekt formatiert. Dies wurde behoben.
- Ein überflüssiges Umwandeln in das json-Format sorgte dafür, dass in Kategorien vom Typ **Content** die *Umlaute* in Meta-Informationen falsch dargestellt wurden. Dies wurde behoben.
- Wenn ein Nutzer eine Adresse löscht oder editiert, wird die vom Server selektierte Adresse nun in der Benutzeroberfläche als ausgewählte Adresse angezeigt.
- Die im System hinterlegten Kontaktdaten beinhalten nun das in der ersten Rechnungsadresse angegebene Geburtsdatum.


## v2.6.0 (2018-04-03) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.5.2...2.6.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- IO kann jetzt auf die Generierung der Sitemap reagieren und seine eigenen Muster zur Erzeugung der URLs vorgeben.

### Geändert

- Im Warenkorb wird nun der Aufpreis von Bestellmerkmalen mit dem Vorwort "inkl." angezeigt.
- Die Intervall-Bestellmenge eines Artikels wird jetzt bei der Mengeneingabe berücksichtigt.
- Die Plugin-Konfiguration wird jetzt generisch an JavaScript übergeben und ist als globales Objekt verfügbar.
- Ab sofort können auch dezimale Mengen von Artikeln gekauft werden.
- Im Checkout wurde die Checkbox für die AGB, Widerrufsrecht und Datenschutzerklärung auf die linke Seite verschoben. Dadurch befindet sich der Kaufen-Button direkt unterhalb der Gesamtsumme.
- Der Vorschautext eines Artikels in der Artikeleinzelansicht unterstützt nun HTML-Elemente.
- In der Artikelansicht ist der Wert "Bitte wählen" in der Attributauswahl der Variante nun immer wählbar. Hierdurch wird verhindert, dass die Auswahl eines Attributs jegliche andere Auswahl in der Dropdown-Liste verhindert. Außerdem kann der Nutzer hierdurch die Hauptvariante auswählen, insofern sie aktiv und mit keinem Attribut verknüpft ist.
- Im Warenkorb wird nun der Aufpreis eines Bestellmerkmals in den Gesamtpreis des Artikelpostens einkalkuliert.

### Behoben

- Unter gewissen Umständen wurde der Button zum Ändern der Zahlungsart auf der Auftragsbestätigungsseite nicht angezeigt.
- Ein Fehler führte dazu, dass man nach einem Kauf mit Paypal auf eine 404 Seite anstatt auf die Auftragsbestätigungsseite geleitet wurde. Dies wurde behoben.
- Im Warenkorb wird nun die Position der Artikelbilder berücksichtigt und das Bild mit der niedrigsten Position wird ausgegeben.
- Bei Artikeln mit ausgefülltem Bestellmerkmal wurde bisher immer der Aufpreis des Merkmals angezeigt. Jetzt wird überprüft, ob es für den Artikel einen gesonderten Aufpreis gibt. Wenn ja, wird dieser angezeigt.

## v2.5.2 (2018-03-26) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.5.1...2.5.2" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler wurden gelöschte Lieferadressen weiterhin in der Oberfläche angezeigt. Dies wurde behoben.
- Durch einen Fehler wurde man beim Klick auf die Navigationspfeile im Bilderkarrussel der Kategorieübersicht zu dem Artikel weitergeleitet. Dies wurde behoben.
- Durch einen Fehler konnten zusätzliche Inhalte von Zahlungs-Plugins im Checkout nicht korrekt angezeigt werden. Dies wurde behoben.

## v2.5.1 (2018-03-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.5.0...2.5.1" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler wurden bei einer Anfrage an ElasticSearch alle Artikeldaten zurückgeliefert.
- Die mobile Navigation funktioniert nun wieder auf allen Touch-Endgeräten.
- Durch einen Fehler wurder der Webshop nicht richtig geladen wenn er über eine App wie Facebook oder Instagram geöffnet wurde. Dies wurde behoben.

## v2.5.0 (2018-03-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.4.0...2.5.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Es wurden Context-Klassen hinzugefügt, die für zugehörige Twig-Templates Daten zur Verfügung stellen.
- Ceres kann nun auf alle Typen von Benachrichtigungs-Codes, die vom Server kommen, reagieren. Vorher konnten nur Codes vom Typ Fehlermeldung abgefangen werden.

### Geändert

- In der Wunschliste wurden überflüssige Style-Anweisungen entfernt.
- Wenn ein Nutzer im Kassenbereich alle Artikel aus dem Warenkorb entfernt, wird er nun zur Warenkorbansicht geleitet.
- Die Schriftfarbe der Variantenauswahl wurde abgedunkelt. Dadurch wird eine bessere Lesbarkeit für deaktivierte Werte in Dropdown-Listen auf Firefox Browsern gewährleistet.
- Die nicht mobile Shop-Navigation wurde für Touch-Devices optimiert.

### Behoben

- Durch einen Fehler wurde das Tooltip für die Wunschliste nicht korrekt übersetzt. Dies wurde behoben.
- Durch einen Fehler wurden mehrere HTML-Elemente mit derselben ID versehen. Dies wurde behoben.
- Durch einen Fehler wurde eine falsche Anzahl von Bildern in der Bild-Vorschau der Artikelseite angezeigt. Dies wurde behoben.
- Durch einen Fehler wurde das Kontaktformular nicht richtig ausgegeben wenn die Postleitzahl in den Stammdaten nicht ausgefüllt war. Dies wurde behoben.
- Wenn man den Tab Beschreibung in der Einzelartikelansicht deaktiviert hat, wurde das nächste verfügbare Tab nicht selektiert. Dies wurde behoben.
- Durch einen Fehler war die Artikelansicht leer, wenn in den Daten keine Verfügbarkeit enthalten war. Dies wurde behoben.
- Die Hierarchie von Überschriften wurde auf der Kategorieseite optimiert.
- Die URL des Firmenlogos im Footer wird nun von Suchmaschinen ignoriert.
- Der Wert eines Bestellmerkmals verlief ab einer bestimmten Größe über den Rand hinaus. Dies wurde behoben.
- Deaktivierte Tooltips führen nun nicht mehr dazu, dass HTML-Titles angezeigt werden.
- Die Ansicht der Sprachen und Lieferländer wurde leicht angepasst, um die volle Funktionalität auch bei vielen aktiven Sprachen und Lieferländern zu gewährleisten.

## v2.4.0 (2018-03-06) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.3.2...2.4.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Die Plugin-Konfiguration wurde in entsprechende Hilfsklassen ausgelagert.
- Es wurde eine Konfigurationsmöglichkeit hinzugefügt, um beim Klicken auf vorgeschlagene Artikel direkt zum Artikel weitergeleitet zu werden.
- Für eine bessere Performance werden mehrfache Aufrufe einer Funktion im Cache gehalten.
- Das Design für den Warenkorb wurde von Grund auf neu gestaltet. Hierbei wurden Fehler der alten Version behoben, dass z.B. Text ineinander gerutscht ist und der Inhalt kaputt ging.

### Geändert

- Die im Warenkorb befindlichen Artikel werden nun nach dem Laden des Shops asynchron nachgeladen. Dies führt zu einem schnelleren Ausliefern der Seite.
- Die Hinweisetexte für sichere Passwörter in der Registrierung wurden angepasst.
- Die Einträge der Währungsauswahl wurden angepasst, um Suchmaschinen daran zu hindern, dieselbe Seite mehrfach zu crawlen.

### Behoben

- Durch einen Fehler wurde das Layout für Adresseingaben beim Bearbeiten von Adressen nicht an das ausgewählte Land angepasst. Dies wurde behoben.
- Durch einen Fehler wurden durch den Wechsel der Währung bereits vorhandene URL-Parameter überschrieben. Dies wurde behoben.
- Wenn im **Checkout** die Validierung der Eingabefelder durchgeführt wurde und ein unausgefülltes Feld rot markiert wurde, wurde die Einfärbung nach erfolgreicher Nutzereingabe nicht entfernt. Dieser Fehler wurde behoben.
- Wenn man unter Adresseingaben die Option Firma ausgewählt hat, wurde das Feld nicht angezeigt. Dies wurde behoben.

## v2.3.2 (2018-02-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.3.1...2.3.2" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- User Guide Kapitel zur EHI-Zertifizierung

### Behoben

- Der Betreff der "Passwort vergessen" Email wird nun aus den Sprachdateien von Ceres geladen.
- Durch einen Fehler wurden über die mobile Navigation falsche Kategorien geöffnet. Dies wurde behoben.
- Wenn eine Kategorie nicht in der Navigation angezeigt wurde, funktionierten Elemente wie Paginierung, Artikel pro Seite und Sortierung nicht. Dies wurde behoben.
- Werte von Bestellmerkmalen werden nun zurückgesetzt wenn der Nutzer eine andere Variante des Artikels auswählt. Sollte diese Variante vorher bereits ausgewählt worden sein, wird der vorherige Wert des Bestellmerkmals geladen.
- Durch einen Fehler wurde man in der Kategorieansicht beim Klick auf Buttons des Bilderkarussells direkt zum Artikel geleitet. Dieser Fehler wurde behoben.

## v2.3.1 (2018-02-26) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.3.0...2.3.1" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Gutscheinrabatte werden nun auf der Auftragsbestätigungsseite und in den Auftragsdetails im MyAccount-Bereich angezeigt.
- Die Retourenbestätigungsseite wird nun nach Anlage einer Retoure wieder angezeigt. (Die Route muss in IO config aktiviert sein)
- Auf der Seite zur Retourenanlage werden nur noch Artikel angezeigt, die auch retourniert werden können. (Keine Versandkosten, Gutscheinpositionen etc.)
- Durch einen Fehler wurden Ländernamen immer in Englisch dargestellt. Dies wurde behoben.
- Durch einen Fehler wurde beim Wechseln der Sprache auf falsche URLs geleitet. Dies wurde behoben.
- Für die Sprachen Dänisch und Norwegisch waren keine Icons verfügbar. Dies wurde behoben.
- In der Last seen Liste werden nun keine zufälligen Artikel mehr angezeigt, wenn vorher noch kein Artikel im Shop angeschaut wurde.

## v2.3.0 (2018-02-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.2.2...2.3.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Hinweistexte in der Registrierung und Verwendungszweck wurden hinzugefügt (EHI).
- Es wurde ein Container auf der OrderConfirmation Seite hinzugefügt, damit Shipping-Plugins zusätzliche Inhalte darstellen können.
- Die Einstellung **Name of an item to display** wurde auf dem Tab **Item view** hinzugefügt. Mit diesem Wert wird festgelegt, ob im Webshop der Artikelname, der Variantenname (sofern verfügbar) oder eine Kombination aus beiden Namen angezeigt wird. Weitere Informationen unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#90" target="_blank">Artikelansicht anpassen</a>.
- Kategorien vom Typ **Content** können nun in der Navigationsleiste angezeigt werden. Hierfür wurde in der Ceres-Konfiguration die Einstellung **Type of categories rendered in the navigation** im Tab **Header** hinzugefügt. Weitere Informationen unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#70" target="_blank">Header und Footer anpassen</a>.

### Behoben

- Durch einen Fehler konnten Artikel die nicht auf der Kategorieseite angezeigt wurden nicht in den Warenkorb gelegt werden. Dies wurde behoben.
- Durch einen Fehler wurde auch wenn man keine Artikel im Warenkorb hatte versucht ein Auftrag anzulegen. Dies wurde behoben.

## v2.2.2 (2018-02-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.2.1...2.2.2" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Ein Fehler führte dazu, dass gelegentlich in der Artikelansicht eine 404-Seite angezeigt wurde, wenn man diese ohne Varianten-ID in der URL aufrief. Dies wurde behoben, indem auch in der Artikelansicht die Einstellung **Show variations by type** berücksichtigt wird.
- Durch einen Fehler wurden Artikellisten nicht angezeigt, die Artikel mit mehreren Bildern enthielten. Dies wurde behoben.
- Durch einen Fehler konnten Plugins auf der Artikelseite keine Tabs mehr hinzufügen. Dies wurde behoben.

## v2.2.1 (2018-02-07) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.2.0...2.2.1" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Die Sortierung der Suchergebnisse wurde verbessert.
- Die Einstellungen für das Google reCAPTCHA aus dem Menü **System » Mandant »Mandant wählen » Webshop » Einstellungen** wurde in die Ceres-Konfiguration in das Tab **Global** verschoben.
- Die Einstellungen für die aktiven Webshop-Sprachen aus dem Menü **System » Mandant » Mandant wählen » Webshop » Multilingual** wurden in die Ceres-Konfiguration in das Tab **Languages** verschoben.

## v2.2.0 (2018-02-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.5...2.2.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Es wurde eine Service-Klasse eingeführt, die Übersetzungen nun auch per JavaScript ermöglicht, analog zum Server-seitigen Umgang von Übersetzungen durch Laravel.
- Texte in unterschiedlichen Sprachen werden nun direkt vom Server geladen. Es ist nicht länger notwendig sprachabhängige JavaScript-Dateien lokal zu kompilieren.
- Ein Widerrufsformular wurde hinzugefügt. Sie können entweder ein Formular über die rechtlichen Angaben im Backend erstellen oder ein PDF-Dokument zum Download im Tab **Footer** der Ceres-Konfiguration angeben. Weitere Informationen dazu finden Sie unter [Rechtliche Angaben speichern](https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#300).

### Geändert

- In der Addresseingabe wird nun bei Auswahl von **Firma** im Feld **Anrede** das Feld **Umsatzsteuer-ID** eingeblendet.
- Der Button im Kontaktformular hat nun dieselbe Ladeanimation wie die restlichen Buttons im Webshop.
- Die Performance des **Mein Konto**-Bereichs wurde verbessert.
- Die Elemente in der **Kaufabwicklung** wurden nun in 2 optisch voneinander getrennten Spalten angeordnet, um rechtliche Anforderungen zu erfüllen.
- Das Eingabefeld für Kundenwünsche in der **Kaufabwicklung** befindet sich nun unterhalb der Auswahl für die Zahlungsarten.
- Die Checkbox für die rechtlichen Angaben, sowie der **Kaufen**-Button befinden sich in der **Kaufabwicklung** nun unterhalb der Warenkorbsumme.

### Behoben

- Durch einen Fehler wurde die Relevanz eines Artikels bei der Artikelsuche und -sortierung nicht richtig berücksichtigt. Dies wurde behoben.
- Durch einen Fehler wurde das Feld **Firma** in der Registrierung nicht korrekt eingeblendet, wenn man unter **Anrede** den Wert **Firma** gewählt hat. Dies wurde behoben.
- Durch einen Fehler wurden nicht übersetzte Kategorien ohne Inhalt in der Navigation oder den Breadcrumbs ausgegeben. Dies wurde behoben.
- Durch einen Fehler konnten nicht übersetzte Kategorien im Megamenü per Hover geöffnet werden. Dies wurde behoben.
- Durch einen Fehler funktionierte die Paginierung der Auftragshistorie nicht korrekt. Dies wurde behoben.


## v2.1.5 (2018-02-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.4...2.1.5" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Ein Fehler führte dazu, dass die Paginierung bei verwendeter Einstellung **Show variations by type: Dynamically** nicht korrekt dargestellt wurde. Dies wurde behoben.
- Durch einen Fehler waren die Links im Footer des Webshops in der mobilen Ansicht nicht klickbar. Dies wurde gefixt.
- Durch fehlende Unterstützung benötigter JavaScript-Funktionen kam es zu Einschränkungen im Internet Explorer. Dies wurde behoben.
- Durch ein von anderen Browsern abweichendes Verhalten des Internet Explorers war es nicht möglich bei einer Adresse das Land zu speichern. Zudem gab es ein Fehlverhalten, wenn man unter **Anrede** den Wert **Firma** ausgewählt hat. Dies wurde behoben.

## v2.1.4 (2018-01-29) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.3...2.1.4" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Ein Fehler führte dazu, dass das Megamenü in Firefox nicht korrekt dargestellt wurde. Dies wurde behoben.

## v2.1.3 (2018-01-23) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.2...2.1.3" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Der Sortierungswert **Item position** im Tab **Item view** wurde aus der empfohlenen Sortierung entfernt. Die Sortierung nach Position wird nun über die Positionsnummer der Variante gelöst.

### Behoben

- Durch einen Fehler wurde die Wunschliste nicht richtig initialisiert. Dies wurde behoben.

## v2.1.2 (2018-01-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.1...2.1.2" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Die Einstellung **Combine variations** im Tab **Item view** der Konfiguration wurde umbenannt in **Dynamically**.

### Behoben

- Die Versandkosten in der Versandartenauswahl der Kaufabwicklung werden nun aktualisiert.
- Das vorraussichtliche Lieferdatum in der **Bestellübersicht** wird nun nicht mehr ausgegeben, wenn das Datum nicht in den Auftragsdaten vorhanden ist.
- Durch einen Fehler wurde der Back-to-top-Button ständig neu berechnet. Dies wurde behoben.
- Durch einen Fehler wurde bei fehlenden Artikelinformationen die Artikelansicht nicht korrekt dargestellt. Dies wurde behoben.

## v2.1.1 (2018-01-09) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.0...2.1.1" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Es wurde ein Fehler behoben, bei dem Artikel-URLs ohne definierten URL-Pfad nicht korrekt generiert werden konnten.

## v2.1.0 (2018-01-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.0.3...2.1.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- **SEO:** Auf der Startseite wird nun der Webshop-Name als H1-Überschrift ausgegeben.

### Geändert

- In den Dropdown-Menüs der Adresskomponenten werden keine Adressen mehr angezeigt, die nicht ausgewählt werden können.
- Das Overlay zum Löschen von Adressen wurde angepasst, um moderner zu wirken.
- Für Artikelbilder, die im Warenkorb, auf der Kategorieseite und in der Artikelansicht angezeigt werden, werden die im Backend eingestellten alternativen Texte der Bilder gesetzt.
- Artikellisten zeigen nun je nach aktueller Auflösung dynamisch unterschiedlich viele Artikel an.
- **SEO:** Die Überschriften diverser Seiten wurden in eine korrekte Hierarchie gebracht.
- Die Schriftgröße der Zahlen in den Filtern wurde erhöht um besser lesbar zu sein.

### Behoben

- Im Checkout werden die Adresseingaben wieder korrekt validiert.
- Bilder in den Artikellisten werden nun korrekt geladen, sobald sie sichtbar werden.
- Die Artikel im Slider auf der Startseite werden nun korrekt ausgegeben.
- Ein Fehler führte dazu, dass Filter nicht gerendert wurden. Dies wurde behoben.
- Ein Fehler führte dazu, dass die Artikelansicht für Artikel ohne Artikelvorlagen nicht angezeigt werden konnte. Dies wurde behoben.

### TODO

- Durch Anpassungen an der Suchlogik müssen Facettenverknüpfungen für den Mandanten gesetzt werden. Öffnen Sie im zentralen Login das Menü **System » Mandant » Mandant wählen » Dienste » Facettenverknüpfungen**. Wählen Sie eine Facette und klicken Sie auf **Facette verknüpfen**.

## v2.0.3 (2017-12-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.0.2...2.0.3" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Im **Checkout** gibt es nun die Möglichkeit, dass ein Bezahl-Plugin sich selbst deaktivieren kann.
- Wenn man sich mit einer E-Mail registriert, die bereits existiert, bleibt das Overlay nun geöffnet und man sieht die Fehlermeldung besser.
- Artikel und Varianten können nun dynamisch angezeigt werden. Weitere Informationen unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#90" target="_blank">Artikelansicht anpassen</a>.

### Behoben

- In der **Wunschliste** werden Bilder von Varianten nun korrekt ausgegeben.
- Der Button, um einen Artikel aus der **Wunschliste** zu entfernen, wird nun mittig angezeigt.
- Auf iOS-Geräten sollte nun der Cursor in Modalen nicht mehr verrutschen. iOS [Bug-Report](https://bugs.webkit.org/show_bug.cgi?id=176896).
- Es wurde ein Fehler behoben, wobei sich die **Warenkorbvorschau** manchmal nicht geöffnet hat bei Klick auf den entsprechenden Button.
- Es wurde ein Fehler behoben, wobei sich die **Warenkorbvorschau** nicht geöffnet hat, nachdem ein Artikel in den Warenkorb gelegt wurde (insofern konfiguriert).
- In der Artikelansicht werden die Versandkosten nun wieder korrekt verlinkt (wenn konfiguriert).
- Es wurde ein Fehler behoben, der dazu führte, dass manche Seite nicht die maximale Höhe genommen haben (weißer Rand unten).
- Die Styles in Firefox werden nun wieder korrekt dargestellt.

## v2.0.2 (2017-12-13) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.0.1...2.0.2" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Die Öffnungszeiten können jetzt für die Sprachen Deutsch und Englisch angegeben werden.

### Geändert

- Die Adressenauswahl wurde leicht überarbeitet, um für den Shop-Besucher noch deutlicher zu wirken.

### Behoben

- Das Mega-Menü zeigt jetzt alle Kategorien an, ohne sie abzuschneiden.
- Durch einen Fehler wurden die Metadaten in Anführungszeichen ausgegeben. Dies wurde behoben.
- Durch einen Fehler wurde die E-Mail-Adresse bei Gastbestellungen nicht validiert. Dies wurde behoben.
- Durch einen Fehler wurde das Land in der Registrierung nicht korrekt vorausgewählt. Dies wurde behoben.
- Durch einen Fehler wurde die Kategorieansicht nicht mehr angezeigt, wenn ein Artikel keine Bild hatte. Dies wurde behoben.
- Durch einen Fehler hat das Such-Icon keine SCSS-Variablen für Farbcodes genutzt. Dies wurde behoben.

## v2.0.1 (2017-12-06) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.0.0...2.0.1" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Das Twig-Template `SingleItemWrapper` wurde hinzugefügt. Dieses Template ermöglicht die Nutzung von <a href="https://knowledge.plentymarkets.com/artikel/artikel-verwalten#720" target="_blank"><b>Artikelvorlagen</b></a> in Ceres.

### Behoben

- Die Grundpreise werden in der Einzelansicht eines Artikels wieder korrekt ausgegeben, wenn diese am Artikel konfiguriert wurden.
- Durch einen Fehler wurden im **Checkout** die Warenkorbsummen auf der linken Seite angezeigt, wenn die Liste der Artikel länger war, als die der Zahlungsarten. Die Summen werden nun immer auf der rechten Seite dargestellt.
- Durch einen Fehler konnte die Artikelansicht nicht angezeigt werden, wenn der Artikel nicht mit einem Hersteller verknüpft war. Dies wurde behoben.
- Das Warenkorb-Overlay addiert die Timer nicht mehr, sondern es kann nach dem ersten Klick wieder geöffnet werden.
- Der Header ist nun wieder voll responsive.
- Durch einen Fehler wurden manche Bilder in den Artikellisten nicht ausgegeben. Dies wurde behoben.

## v2.0.0 (2017-11-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.7.2...2.0.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Die Version des JavaScript-Frameworks wurde von Vue1 auf Vue2 aktualisiert. Weitere Informationen dazu finden Sie im <a href="https://forum.plentymarkets.com/t/news-technologie-update-in-ceres-vue2-und-vuex/77116" target="_blank"><b>Forum</b></a>.
- Die Technologie VueX wurde in den Webshop integriert.
- Der Template-Container `SingleItem.AdditionalContentAfterVAT` wurde hinzugefügt, um zusätzlichen Inhalt hinter der Mehrwehrtsteuer in der Einzelansicht eines Artikels anzuzeigen (Vielen Dank <a href="https://github.com/jalie" target="_blank"><b>@jalie</b></a>).
- Der Template-Container `RegistrationOverlay.ExtendOverlayButtons` wurde hinzugefügt, um zusätzlichen Inhalt im Registrierungs-Overlay anzuzeigen (Vielen Dank <a href="https://github.com/mkreusch" target="_blank"><b>@mkreusch</b></a>).
- Der Navigation wurde ein Mega-Menü hinzugefügt. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#80" target="_blank"><b>Header und Footer anpassen</b></a>.
- In Ceres kann nun eine Standardkundenklasse für B2B-Kunden eingestellt werden. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#45" target="_blank"><b>Globale Einstellungen vornehmen</b></a>.
- Über die **Empfohlene Artikelsortierung** können Artikel in der Kategorieansicht nun auch nach Bestand sortiert werden. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#200" target="_blank"><b>Paginierung und Sortierung anpassen</b></a>.
- Zahlungsarten können nun auch bei Gastbestellungen auf der Auftragsbestätigungsseite geändert werden.
- Aufträge können nun auch bei Gastbestellungen nachträglich bezahlt werden, z.B. wenn die Zahlungsart geändert wird.
- Eine Fehlermeldung wurde hinzugefügt, die angezeigt wird, wenn beim Hinzufügen von Artikeln zum Warenkorb Fehler auftreten.
- In Ceres können nun Währungseinstellungen vorgenommen werden. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/omni-channel/online-shop/ceres-einrichten#203" target="_blank"><b>Währungseinstellungen vornehmen</b></a>.
- Es wurden diverse Ladeanimationen auf den Buttons hinzugefügt, um dem Benutzer ein besseres Feedback zu geben, wann etwas geladen wird.
- Wenn sich innerhalb des Warenkorbs etwas aktualisiert, wird dies nun über eine Aktualisierungsanimation dargestellt.
- Wenn sich im **Mein Konto**-Bereich die Adressen ändern, dann werden die Eingabefelder deaktiviert, bis die Adressdaten vom Server geladen wurden, um Fehlverhalten auszuschließen.
- Wenn sich im Checkout die Zahlungs- oder Versandarten ändern, werden die Elemente deaktiviert, bis die Daten vom Server geladen wurden, um Fehlverhalten auszuschließen.

### Behoben

- Fehlermeldungen, die in der Warenkorbvorschau ausgelöst werden, werden nun besser dargestellt und nicht mehr hinter der Vorschau geladen.
- Es wurden diverse Styling-Fehler im CSS behoben.
- Ein Fehler führte dazu, dass der Artikelzustand auf der Einzelansicht eines Artikels nicht angezeigt wurde. Dies wurde behoben.
- Durch einen Fehler konnte der **Mein Konto**-Bereich nicht geladen werden, wenn die Aufträge eines Kunden geladen wurden. Dies wurde behoben.
- Durch einen Fehler wurden Preise mit verschiedenen Mehrwertsteuersätzen nicht korrekt angezeigt. Dies wurde behoben.
- Summen auf der Auftragsseite für manuell erstellte Aufträge werden nun korrekt angezeigt.
- Ein Fehler führte dazu, dass die Bestandsprüfung im Warenkorb nicht richtig funktionierte. Dies wurde behoben.
- Eine leere Suche kann nun nicht mehr ausgeführt werden.

### Geändert

- Die Buttons zum Ändern der Artikelmenge oder zum Löschen von Artikeln im Warenkorb werden deaktiviert, wenn ein Request noch nicht vom Server zurückgekommen ist, um Fehlverhalten auszuschließen.
- Jedes Overlay besitzt jetzt einen Footer, in dem die Buttons dargestellt werden.
- Das Menü im Header, das angezeigt wird, nachdem man eingeloggt ist, hat ein neues Styling bekommen, um dem gesamten Style des Headers zu entsprechen.
- Das Suche-Symbol zeigt nun deutlicher, dass die suche nach einem Klick wieder geschlossen werden kann.
- Alle Menüs im Header können nun geschlossen werden, wenn man an eine andere Stelle im Webshop klickt.
- Die Buttons zum Hinzufügen, Bearbeiten und Löschen von Adressen wurden angepasst, um für den Benutzer sichtbarer zu sein.
- Allen Buttons in Ceres wurde ein eindeutiges Symbol hinzugefügt, um diese verständlicher zu machen.
- In der mobilen Navigation wurde ein **Zurück**-Button auf die Oberkategorie hinzugefügt.

## v1.7.2 (2017-11-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.7.1...1.7.2" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Events aus plentymarkets oder aus anderen Plugins können jetzt direkt in Ceres verarbeitet werden.
- Server-Benachrichtigungen werden jetzt direkt in Ceres ausgegeben, wodurch Plugin-Entwickler einfacher auf Benachrichtigungen von Ceres zugreifen können.

### Behoben

- Durch einen Fehler wurden in der Detailansicht eines Auftrags oder auf der Auftragsbestätigungsseite die Versandkosten nicht korrekt angezeigt. Dies wurde behoben.
- Durch einen Fehler wurden zusätzliche Artikeldaten im Warenkorb nicht geladen, wenn sich mehr als 10 verschiedene Artikel im Warenkorb befanden. Dies wurde behoben.


## v1.7.1 (2017-11-17) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.7.0...1.7.1" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler wurde die Einstellung zum Anzeigen des Grundpreises eines Artikels ignoriert. Dies wurde behoben.
- Durch einen Fehler wurde trotz aktivierter Einstellung das Herstellungsland nicht in den Details auf der Artikelansicht angezeigt. Dies wurde behoben.
- Durch einen Fehler wurde die Stückzahl eines Artikels in der Kategorieansicht nicht angezeigt. Dies wurde behoben.
- Ein Fehler führte dazu, dass das Passwort im **Mein Konto**-Bereich nicht geändert werden konnte. Dies wurde behoben.
- Ein Fehler führte dazu, dass für Kunden mit einer bestimmten Kundenklasse Staffelpreise angezeigt wurden, auch wenn diese Preise nicht für die Kundenklasse freigeschaltet waren. Dies wurde behoben.
- Es wurde ein Fehler behoben, der Staffelpreise ab Menge 1 angezeigt hatte.


### Geändert

- In den Artikeldetails auf der Artikelansicht wurde das Feld **Externe Varianten-ID** in **Varianten-ID** umbenannt.

## v1.7.0 (2017-11-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.6.3...1.7.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Kundenklassen werden nun bei der Anzeige von Artikeldaten berücksichtigt.

### Behoben

- Die Einstellung an der Variante für die Grundpreisangabe **Grundpreis anzeigen** wird nun berücksichtigt. Wenn diese Einstellung deaktiviert ist, wird der Grundpreis im Webshop nicht angezeigt.

### Known issues

- Bei der Berechnung von Staffelpreisen werden keine Rabatte berücksichtigt, die an der Kundenklasse definiert werden.
- Die für eine Kundenklasse definierte Mindestbestellmenge wird in der Einzelansicht eines Artikels noch nicht dargestellt.
- Artikel, die nur für eine bestimmte Kundenklasse verfügbar sind, werden trotzdem in der Variantenauswahl bei allen Kundenklassen angezeigt. Diese Artikel können dennoch nur von der entsprechenden Kundenklasse gekauft werden.

## v1.6.3 (2017-11-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.6.2...1.6.3" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Die Bestellmerkmale werden in der Einzelansicht eines Artikels nicht mehr doppelt ausgegeben.

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
