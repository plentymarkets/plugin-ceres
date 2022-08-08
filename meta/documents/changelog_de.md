# Release Notes für plentyShop LTS

## v5.0.54 (2022-08-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.53...5.0.54" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Im Plugin IO wurde die neue Route `/contact-mail-api` hinzugefügt. Wenn du das plentyShop Kontaktformular verwendest (egal ob Standard oder per ShopBuilder-Inhalt), stelle sicher, dass diese Route im IO-Plugin aktiviert ist. Öffne dazu die Einstellungen des IO-Plugins in deinem Plugin-Set. Öffne den Reiter **Konfiguration**. Aktiviere in der Einstellung **Routen aktivieren** die Route `/contact-mail-api` und speichere deine Einstellungen. Wenn du das Kontaktformular *nicht* verwendest, stelle sicher, dass diese Route deaktiviert ist.

### Geändert

- Der Standardtext für die Cookiebar wurde angepasst, um der aktuellen Gesetzgebung zu entsprechen. Der Text kann über den Übersetzungsschlüssel `cookieBarHintText` im Menü **CMS » Mehrsprachigkeit** angepasst werden.
- Die Werte für die Übersetzungschlüssel `checkoutChooseOur` und `checkoutCheckAcceptGtc` wurden angepasst, um den Anforderungen von § 305 b BGB gerecht zu werden. Weitere Informationen dazu findest du <a href="https://www.it-recht-kanzlei.de/Die_wichtigsten_AGB-Regularien.html#abschnitt_9" target="_blank">hier</a>.

### Behoben

- Nach dem Bearbeiten einer nicht ausgewählten Adresse im Mein-Konto- oder Kassenbereich wurde diese Adresse nicht korrekt angezeigt. Dies wurde behoben.
- Bei aktivierten Cache-Blöcken konnte es zu fehlerhaften Verlinkungen über die Sprachauswahl kommen. Dieses Verhalten wurde behoben.
- Auf mobilen Geräten konnte es bei der Kombination von Sprachwechsel und ShopBooster dazu kommen, dass die mobile Navigation in der zuvor ausgewählten Sprache angezeigt wurde. Dieses Verhalten wurde behoben.
- Im Checkout konnte es zu Fehlern kommen, wenn kein Versandprofil ausgewählt war. Dies wurde behoben.
- Bei Artikelsets mit Set-Komponenten, die Bestellmerkmale enthalten, kam es zu einer fehlerhaften Darstellung des Warenwerts. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.54 gab es Änderungen an Template-Dateien, die für Theme-Entwickler:innen relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/3319/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3319/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3318/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)

## v5.0.53 (2022-07-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.52...5.0.53" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Die Einstellung **Kunden zur Login-Seite weiterleiten, wenn sie den Link in der Bestellbestätigung klicken** wurde wieder zu den plentyShop LTS-Einstellungen und dem plentyShop-Assistenten hinzugefügt. Diese Einstellungen wurden in der Version 5.0.52 entfernt, was dazu führte, dass die Bestellbestätigung von manuell angelegten Aufträgen nicht zugänglich war. Wir haben diese Änderung daher rückgängig gemacht.

## v5.0.52 (2022-06-29) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.51...5.0.52" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Neu

- Zusätzlich zum Browser-Namen wird nun auch das Betriebssystem als Klasse auf das `<html>`-Objekt gesetzt. Kann kein Betriebssystem oder Browser erkannt werden, werden jeweils eigene Klassen dafür gesetzt. Vielen Dank an @daniel-mannheimer für diesen Beitrag.

### Geändert

- Die Übersetzungsschlüssel `categoryItemFootnote`, `categoryItemFromPrice` und `categoryItemLowestPrice` wurden respektive zu `itemFootnote`, `itemFromPrice` und `itemLowestPrice` umbenannt. Bisher angepasste Übersetzungen werden per Migration für die neuen Schlüssel übernommen.
- Die Komponente `AddressSelect` wurde angepasst, um große Datenmengen performanter anzuzeigen. Die Komponente `DynamicScroller` wrapped nun einzelne Adressen.
- Die Einstellung **Kunden zur Login-Seite weiterleiten, wenn sie den Link in der Bestellbestätigung klicken** wurde aus den plentyShop LTS-Einstellungen und aus dem plentyShop-Assistenten entfernt. Das Standardverhalten ist zukünftig so, dass Kund:innen immer zuerst auf die Login-Seite geleitet werden.
- Die Variable für den Warenkorb wurde aus dem `GlobalContext` entfernt. Beachte dazu <a href="https://forum.plentymarkets.com/t/plentyshop-basket-variable-wird-aus-dem-globalcontext-entfernt-basket-variable-is-removed-from-the-globalcontext/685718" target="_blank">diesen Forumsbeitrag</a>. 

### Behoben

- Bei Bestelleigenschaften vom Typ **Datei** konnte es auf mobilen Endgeräten zu Hydration-Fehlern kommen, wenn die Eigenschaft eine Beschreibung hatte. Dies wurde behoben.
- Das CSRF-Token wird nun nur noch an REST-Calls, die an den eigenen plentyShop gehen, hinzugefügt.
- Im Kontext des Updates auf PHP 8 wurden einige Kompatibilitätsfehler behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.52 gab es Änderungen an Template-Dateien, die für Theme-Entwickler:innen relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/views/Customer/Components/AddressSelect/AddressSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/3290/files#diff-969624803dfeb696a58e16de0d95c285a458ec83a615026882d9b1e65386935b)


## v5.0.51 (2022-05-23) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.50...5.0.51" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Neu

- Es wurde eine Ausgabe des Preises der letzten 30 Tage hinzugefügt. Die Information wird ausgegeben, wenn ein Artikel einen Preis der letzten 30 Tage hat und ein Streichpreis angezeigt wird.
- Für die Kasse wurde das Widget **Zustimmung im Checkout** hinzugefügt.

### Behoben

- Die Schaltfläche zum Anzeigen von mehr Artikelinformationen überlagert nicht mehr das Mega-Menü überlagert.
- Auf der Bestellbestätigungsseite wurde in der Artikelliste teilweise ein Gesamtrabatt von 0,00€ ausgewiesen. Das wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.51 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/3275/files#diff-49e9a28ec33181e8fd3720d39345363b8b0614f2bf29ceb66b403ef22c18bd4d)
- [resources/views/MyAccount/Partials/OrderHistoryListItemDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/3275/files#diff-dcc9c181484eba069617434b9c7c20b7906e9ab74907f134720e220a818c968a)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3275/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)

## v5.0.50 (2022-05-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.49...5.0.50" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Auf der Bestellbestätigungsseite wird nun der bereits bezahlte Betrag angezeigt.
- Auf der Bestellbestätigungsseite können nun mehrere eingelöste Gutscheinwerte aufgelistet werden.
- Das plentyShop LTS-Plugin ist nun kompatibel mit PHP 8.
- Bestelleigenschaften und Merkmale, die als Zusatzkosten konfiguriert wurden, werden jetzt als seperate Posten in den Summen dargestellt.
- Für Bestelleigenschaften und Merkmale wird nun auf der Artikeleinzelansicht, im Warenkorb und auf der Bestellbestätigung angezeigt, ob es sich um inklusive oder zusätzliche Kosten handelt.
- Verpflichtende, vorausgewählte Bestelleigenschaften, die als Zusatzkosten konfiguriert wurden, werden nun ohne Checkbox unter dem Artikelpreis auf der Artikeleinzelansicht dargestellt.

### Behoben

- Beim Hinzufügen eines Artikels zum Warenkorb wurde der Grundpreis fehlerhaft angezeigt, wenn durch das Hinzufügen die Artikelmenge für einen Staffelpreis erreicht wurde. Dieses Verhalten wurde behoben.
- Wenn bei einem Tag der Tag-Name für die im Shop gewählte Sprache nicht hinterlegt war, konnte es zu Javascript-Fehlern kommen. Dies wurde behoben. 

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.50 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/views/Checkout/Macros/OrderTotals.twig](https://github.com/plentymarkets/plugin-ceres/pull/3246/files#diff-8ea271aa9d97b46230e0f009330b3da0be4020cf00d5e8f214bcfb05425186d2)

## v5.0.49 (2022-04-11) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.48...5.0.49" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Das Berücksichtigen von Staffelpreisen in den **Ab Preisen** der Kategorieansicht ist jetzt konfigurierbar. Die Einstellungen hierzu findet sich im Assistenten unter **Angezeigte Informationen**. Diese Einstellung ist standardmäßig deaktiviert.
- Merkmale vom Typ "kein" mit Zusatzkosten werden jetzt unterhalb vom Artikelpreis angezeigt.

### Behoben

- Die Grundpreisanzeige auf der Kategorieseite wurde falsch berechnet, wenn Staffelpreise am Artikel hinterlegt waren. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.49 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/js/src/app/components/itemList/CategoryItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3265/files#diff-4c35af622ef09ba8949eb1c47557e3e6651b088291a0d2e2463c9244007b5516)

## v5.0.48 (2022-03-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.47...5.0.48" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### ToDo

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.

### Hinzugefügt

- Dem Artikelraster-Widget und dem Artikellisten-Widget wurden eine Option hinzugefügt, mit der der Hinweis auf die Mehrwertsteuer ausgeblendet werden kann.
- Dem Artikelraster-Widget und dem Artikellisten-Widget wurden eine Option hinzugefügt, mit der der Hintergrund der Artikelkacheln grau eingefärbt werden kann.
- Im Newsletter-Widget wurde ein Text zur Beschreibung der Pflichtangaben hinzugefügt. Dieser lässt sich über den Übersetzungschlüssel **newsletterIsRequired** in Menü **CMS » Mehrsprachigkeit** anpassen.
- Dem Widget Bilderkarussell wurde eine neue Option hinzugefügt, mit der Bilder auf die gesamte Bildschirmbreite skaliert werden können.
- Die Widgets Bilderbox, Bilderkarussell und Hintergrundbild enthalten nun die Option, Bilder auf die volle Bildschirmhöhe zu skalieren.
- Die Widgets Gutscheineingabe, Artikelliste, Artikelraster, Toolbar, Auftragsdaten und Auftragshistorie enthalten nun die Option, Schaltflächen als umrandete Buttons anzuzeigen. Für die Artikelliste und das Artikelraster betrifft dies nur die Darstellung auf mobilen Endgeräten.
- Für den Soft-Login ist es jetzt möglich, im ShopBuilder einen Inhalt vom Typ **Softlogin** mit dem dazugehörigen Softlogin-Widget zu erstellen.

### Geändert

- Die Bestelleigenschaften-Option **Vorausgewählt** wird jetzt von Checkboxen verwendet. Bei Bestelleigenschaften vom Typ **kein**, für die die Bestelloptionen **Verpflichtend** und **Vorausgewählt** aktiviert sind, wird im Shop keine Checkbox angezeigt.
- Die URL, von der das Standardfirmenlogo und das Standard-Footerlogo bezogen wurden, wurde geändert.

### Behoben

- Das standardmäßige Tagging von Cache-Blöcken, welche Kategoriebaum- oder Artikeldaten enthalten, funktioniert nun wie beabsichtigt.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.48 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/views/Widgets/Category/ItemGridWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3232/files#diff-f0aaf1ea155523f16c664c97d4b8877ad9db66f705f85a59ebffc0a3834f2456)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3232/files#diff-56e4aca5195c81e2f933daaf2a1d1397fcd1e72844a24d75155dcab09e4cb0ee)
- [resources/js/src/app/components/newsletter/NewsletterInput.vue](https://github.com/plentymarkets/plugin-ceres/pull/3235/files#diff-b0d8af375291becdbc1a0f4d1a4cee18317d747dc3bd044270ff390cdf4b1fa6)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3233/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3213/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)
- [resources/views/Widgets/Common/ImageBoxWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3213/files#diff-9f438954b9f177761379a8b382eea014077ec743060583796ac4f9aaed3d3003)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3213/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/MyAccount/OrderHistoryWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3256/files#diff-f196d6bb6f33571742988039f2a995b8bb5b7e2b8e217ba7ddb9a6ebde4ada85)
- [resources/views/Widgets/OrderConfirmation/OrderDataWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3256/files#diff-82affb09026a21fd94995e057ae7214f6751cf84dfed718216f4760865567c33)
- [resources/views/Widgets/Basket/CouponWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3243/files#diff-1510e82d2597eb5bd730a313495e2f99bf742edc008f1d1e367fe7541e0e14e2)
- [resources/views/Widgets/Category/ItemGridWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3243/files#diff-f0aaf1ea155523f16c664c97d4b8877ad9db66f705f85a59ebffc0a3834f2456)
- [resources/views/Widgets/Category/ToolbarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3243/files#diff-cfedbade4ecd9f8d924f41e488e7d75c9b3273dbc2e422fe3f3238ea03b0d3ea)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3243/files#diff-56e4aca5195c81e2f933daaf2a1d1397fcd1e72844a24d75155dcab09e4cb0ee)

## v5.0.47 (2022-02-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.46...5.0.47" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Das Sortieren von Artikeln nach Preis führte unter gewissen Umständen zu Fehlern. Dies wurde behoben.

## v5.0.46 (2022-02-24) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.45...5.0.46" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.
- Standardmäßig werden Staffelpreise auf Kategorieseiten jetzt mit einem "ab" davor angezeigt. Nutzer:innen können das "ab" im Menü **CMS » Mehrsprachigkeit** entfernen. Der entsprechende Übersetzungsschlüssel ist **itemFromPrice**.

### Hinzugefügt

- ShopBooster unterstützt nun blockweises Cachen von Shop-Inhalten. Im plentyShop LTS-Standard werden Header, Footer und Artikelkacheln (bspw. in Artikellisten) als Blöcke in den Cache geschrieben. Dadurch erhöht sich die Cache-Abdeckung des ShopBoosters. 
- Die ShopBuilder-Vorlage für die Startseite wurde grundlegend überarbeitet. Sie enthält jetzt Demobilder, Demotexte und eine Zusammenstellung verschiedener Widgets.
- Die Asterisk-Zeichen für Fußnoten auf der Artikeleinzelansicht, Kategorieseite und Liveshopping-Seite sind jetzt über das Menü **CMS » Mehrsprachigkeit** anpassbar. Die entsprechenden Übersetzungsschlüssel sind **singleItemFootnote1**, **itemFootnote** und **liveShoppingFootnote**.

### Geändert

- Vor- und Nachname werden jetzt in der Newsletter-Anmeldung auf unzulässige Zeichen geprüft, um Spam von Bots zu verhindern.
- Wenn der CSRF-Token bei sensiblen REST-Aufrufen nicht übereinstimmt, wird der Client neu geladen und gibt eine entsprechende Meldung aus. Nutzer:innen werden in diesem Fall zur Anmeldeseite weitergeleitet.
- Das Lupen-Icon in der Suchleiste wird nun zu einer Ladeanimation, während die Daten angefordert werden.

### Behoben

- In der Kategorieansicht wird jetzt der hinterlegte Staffelpreis angezeigt und mit einem "ab" gekennzeichnet. Der dazugehörige Übersetzungsschlüssel ist **itemFromPrice**.
- Das Template der **Zur Wunschliste**-Komponente wurde von einem `a-tag` in ein `button-tag` geändert.
- Die Option **Kategorien als Filteroptionen bei Suchergebnissen anzeigen** wurde umbenannt. Weiterhin wurde ein Fehler beim Speichern dieser Option behoben.
- Unter gewissen Umständen konnte das Sticky-Container-Widget die Warenkorbvorschau überlagern. Dies wurde behoben.
- In der ShopBuilder-Vorlage **Footer** wurde ein ungültiger Parameterwert für die Cookie-Bar übergeben. Dies wurde behoben.
- Das Widget **Ausgewählte Filter** produziert nun keine Fehler mehr im serverseitigen Render-Prozess (SSR), wenn es auf einer Seite über der Filterauswahl platziert wird.
- Die Warenkorbvorschau wurde auf iOS-Geräten erst beim zweiten Tippen geöffnet. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.46 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/js/src/app/components/basket/AddToBasket.vue](https://github.com/plentymarkets/plugin-ceres/pull/3112/files#diff-460828a2142adb35f926ca9c28a7d0c1c4eb9a2d127e2fafce1de5bceb925598)
- [resources/js/src/app/components/itemList/CategoryItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3112/files#diff-4c35af622ef09ba8949eb1c47557e3e6651b088291a0d2e2463c9244007b5516)
- [resources/js/src/app/components/item/AddToWishList.vue](https://github.com/plentymarkets/plugin-ceres/pull/3217/files#diff-ca84d4fb86526c6d5ab30af678de22127f6721548962854510cf3fc42d36352e)
- [resources/js/src/app/components/item/ItemPrice.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-eed3a26bc24bb9bbfd91d04e54f17d682022d8a9b1918fe760fe93d366beed22)
- [resources/js/src/app/components/item/SetPrice.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-30614b885f8e0ea365fe8fbf3186a95f79a6a4b519e7d26f53c371301a0db3c1)
- [resources/js/src/app/components/item/SingleItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-24dd25ca458027f998950fb4b48c9908ba241ac54bcf94c6de48c26107d86c15)
- [resources/js/src/app/components/itemList/CategoryItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-4c35af622ef09ba8949eb1c47557e3e6651b088291a0d2e2463c9244007b5516)
- [resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-c2a08d86ac9eeeb7f4ba9b1855dc844c4e03a6446fd422d637f686975465ed3b)

## v5.0.45 (2022-01-18) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.44...5.0.45" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Da die Option **Kund:innen müssen alle Bestellmerkmale ausfüllen, bevor sie einen Artikel in den Warenkorb legen können.** im Schritt **Angezeigte Informationen** des plentyShop-Assistenten ab sofort nicht mehr für Bestelleigenschaften gilt, müssen Händler:innen für Bestelleigenschaften im Menü **Einrichtung » Einstellungen » Eigenschaften » Konfiguration » (Eigenschaft wählen) » Optionen » Bestelloptionen** die Option **Verpflichtend** aktivieren, sofern die jeweilige Bestelleigenschaft verpflichtend sein soll.

### Hinzugefügt

- Die Sichtbarkeit der angezeigten Summen in der Warenkorbvorschau lässt sich jetzt auch über den plentyShop-Assistenten im Schritt **Angezeigte Informationen** einstellen.

### Geändert

- Bestelleigenschaften und Bestellmerkmale wurden nun auch angezeigt wenn die Variante nicht kaufbar ist.

### Behoben

- Das Styling von abgeschlossenen Live-Shopping-Angeboten wurde dem von noch laufenden Live-Shopping-Angeboten angeglichen.
- Es war möglich eine Newsletter-Anmeldung ohne reCAPTCHA abzuschicken, wenn der dazugehörige Cookie nicht akzeptiert wurde. Dies wurde behoben.
- Im plentyShop-Assistenten wurden keine Standardwerte für globale Werte angezeigt. Das wurde behoben.
- Durch einen Fehler wurde der eingegebene Suchbegriff nicht richtig an die URL angehangen. Dies wurde behoben.
- Die Option **Kund:innen müssen alle Bestellmerkmale ausfüllen, bevor sie einen Artikel in den Warenkorb legen können.** im plentyShop-Assistenten wird nun nicht mehr für Bestelleigenschaften berücksichtigt.
- Durch einen Fehler wurden Änderungen an den Einstellungen des Cookie-Bar-Widgets nicht übernommen. Dies wurde behoben.
- Bestelleigenschaften vom Typ **Kein** in einer Gruppe vom Typ **Select** funktionieren nun korrekt, wenn für sie die Option **Verpflichtend** aktiv ist.
- Bestellmerkmale vom Typ **Kein** in einer Gruppe vom Typ **Einfachauswahl** funktionieren nun wieder korrekt, wenn im plentyShop-Assistenten die Option **Kund:innen müssen alle Bestellmerkmale ausfüllen, bevor sie einen Artikel in den Warenkorb legen können.** aktiv ist.

## v5.0.44 (2021-12-27) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.43...5.0.44" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Die Einstellung **Preisinformation in der Warenkorbvorschau anzeigen** im Menü **Plugins » plentyShop LTS » Warenkorb** greift nun wieder. Überprüfe, ob du die dort angehakten Preisinformationen in der Warenkorbvorschau anzeigen willst. Passe die Einstellungen gegebenenfalls an.
- Aufgrund von Änderungen am CookieBar Widget müssen die betroffenen ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.

### Hinzugefügt

- Es ist jetzt möglich, die Suche nach Variantennamen zu priorisieren. Du findest die Einstellung im plentyShop-Assistenten im Schritt **Suche**.
- Es ist jetzt möglich, die Reihenfolge der Schaltflächen der Cookie-Bar in den Widget-Einstellungen festzulegen. Zusätzlich lässt sich die **Alle ablehnen**-Schaltfläche ausblenden.
- Die Beschreibungen von Bestelleigenschaften und Bestellmerkmalen lassen sich jetzt auf mobilen Geräten über eine Schaltfläche anzeigen.
- Es ist jetzt möglich, die angezeigten Preisinformationen in der Warenkorbvorschau ein- oder auszublenden. Du findest den Punkt in den plentyShop LTS Einstellungen unter **Warenkorb » Preisinformationen in der Warenkorbvorschau anzeigen**. Diese Funktionalität steht nur in ShopBuilder-Headern zur Verfügung.
- Bestelleigenschaften mir der Option **Verpflichtend** werden jetzt unterstützt.
- Die Symbole für Fußnoten auf der Artikeldetailseite sind jetzt über die Multilingualität anpassbar. Die entsprechenden Übersetzungsschlüssel sind: **singleItemFootnote1**, **singleItemFootnote2**, **singleItemFootnote12**

### Geändert

- Die Farbeinstellungen im Tab **Design** der plentyShop LTS-Konfiguration sind jetzt deprecated. Diese Einstellungen finden sich jetzt nur noch in den Designeinstellungen des ShopBuilders. Die bisher ausgewählten Farben bleiben erhalten.
- Während die Warenkorbvorschau geöffnet ist, wird nun die Scrollbar des Shops ausgeblendet. Wir bedanken uns bei User @MaxBentz für den Beitrag.

### Behoben

- Das Artikelraster-Widget erzeugte eine zu große Datenmenge in der ShopBuilder-Vorschau und vergrößerte beim Speichern die Dateigröße. Dies wurde behoben.
- Die Cookiebar lehnte bei Klick auf **Alle ablehnen** auch essenzielle Cookies ab. Dies wurde behoben.
- Zukünftige Liveshopping-Artikel, die keinen Streichpreis haben, zeigen nun wieder den Normalpreis an.
- Die automatische Telefonnummerkennung im Safari-Browser konnte in Kombination mit SSR zu Hydration-Fehlern führen. Sie ist jetzt standardmäßig deaktiviert.
- Die Tooltips des Zur-Wunschliste-hinzufügen-Widgets wurden nicht angezeigt. Dies wurde behoben.
- Im plentyShop LTS-Assistenten wurde der Backend-Name von Versandprofilen nicht angezeigt. Dies wurde behoben.
- Für die Tag-Liste wurde ein HTML-Element ausgegeben, auch wenn kein Tag am Artikel vorhanden war. Dies wurde behoben. Wir bedanken uns bei User @Lauflust für den Beitrag.
- Die Validierung von Bestellmerkmalen und Bestelleigenschaften vom Typ **Datei** findet jetzt nur noch serverseitig statt.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.44 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/js/src/app/components/pageDesign/CookieBar.vue](https://github.com/plentymarkets/plugin-ceres/pull/3133/files#diff-07203a2a14f4fdfe0285c115db84358b9b18bbe84d3ab3536f80b667529b7392)
- [resources/views/Widgets/Footer/CookieBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3133/files#diff-c05849d77ed56c7c3fe936d53064ffa075171ba20822d0448e351ee940c1dc59)
- [resources/views/PageDesign/Partials/Head.twig](https://github.com/plentymarkets/plugin-ceres/pull/3109/files#diff-33a10158d672d50c9bc1c0e8a46fbd8edb701925dcb3f619c6ff6f8ca11e45ee)
- [resources/js/src/app/components/item/AddToWishList.vue](https://github.com/plentymarkets/plugin-ceres/pull/3110/files#diff-ca84d4fb86526c6d5ab30af678de22127f6721548962854510cf3fc42d36352e)
- [resources/js/src/app/components/item/OrderPropertyListGroup.vue](https://github.com/plentymarkets/plugin-ceres/pull/3115/files#diff-66d47567497f0cc8e0143d9f963d8c812092114dd774e63ccae91fe1179330ba)
- [resources/js/src/app/components/item/OrderPropertyListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3115/files#diff-38e564e102ed3a17d36a85e7a337ea233f1fba3a1e43d95808c20dde2484f1c9)
- [resources/js/src/app/components/basket/BasketPreview.vue](https://github.com/plentymarkets/plugin-ceres/pull/3104/files#diff-21af208d0ab5bd9055fcd8ca0bda5d6c0770336ed010aa788a2f0c1d7222e2b6)
- [resources/js/src/app/components/basket/BasketTotals.vue](https://github.com/plentymarkets/plugin-ceres/pull/3104/files#diff-74c12ada105a013f79bbea3a162d3e4358d1afa3f38c3e9e00894a3ab6ad01c1)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3104/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/js/src/app/components/item/TagList.vue](https://github.com/plentymarkets/plugin-ceres/pull/3134/files#diff-1b324b2465d4c6e8aefae057e8d7e36990efbd9e72f3beee9c61149d8bbc7e00)
- [resources/js/src/app/components/item/OrderPropertyListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3123/files#diff-38e564e102ed3a17d36a85e7a337ea233f1fba3a1e43d95808c20dde2484f1c9)


## v5.0.43 (2021-11-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.42...5.0.43" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Es wurden `aria-label` für alle **Schließen**-Schaltflächen hinzugefügt. Wir möchten uns bei @MaxBentz für diesen Beitrag bedanken!
- Für die Cookie-Bar-Schaltfläche **Alle ablehnen** wurde der Eintrag `cookieBarDenyAll` in der Mehrsprachigkeitsoberfläche hinzugefügt.

### Geändert

- Die standardmäßige Cookie-Bar enthält nun die drei Schaltflächen **Auswahl akzeptieren**, **Alle akzeptieren** und **Alle ablehnen**.
- Alle Schaltflächen der Cookie-Bar haben nun die gleiche Farbe.

### Behoben

- Die Standardlogos für plentyShop LTS und plentymarkets wurden nicht korrekt angezeigt. Dies wurde behoben.
- Zahlungsarten mit viel beschreibendem Text wurden im Checkout auf kleinen Display-Größen nicht richtig dargestellt. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.43 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/js/src/app/components/basket/AddItemToBasketOverlay.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-311f3a2f3e02a8f6bb38785576b25dc75bf8b3e56a36a8cc2e4ae474745266b5)
- [resources/js/src/app/components/basket/BasketPreview.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-21af208d0ab5bd9055fcd8ca0bda5d6c0770336ed010aa788a2f0c1d7222e2b6)
- [resources/js/src/app/components/customer/login/ForgotPassword.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-44987529408a4046ff667225875e66b190a54913180f2aadcb986f8c349e1a33)
- [resources/js/src/app/components/customer/login/LoginView.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-00501fd1757fdacd13f2da43432cb2de657278d7db72c324b8317160a0ece5d3)
- [resources/js/src/app/components/myAccount/EditCouponOverlay.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-3385c5d0e4771710be00b0a70811ac5b8018e23b7da889cb9923959dbb8a9a29)
- [resources/js/src/app/components/orderReturn/OrderReturn.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-971e659557f3b0f7e6b0d68a65d9a3f7fba777397bc842f3ecf77313d54857f1)
- [resources/js/src/app/components/pageDesign/Notifications.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-aaca879a460ddd8b7177f493c43c224bf1589a43cdf0e284069d25656f0e93c8)
- [resources/views/Customer/Components/AddressSelect/AddressSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-969624803dfeb696a58e16de0d95c285a458ec83a615026882d9b1e65386935b)
- [resources/views/MyAccount/Components/AccountSettings.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-f99642810d726bab73f9000f541ceebf82d6470974403d0c6693ea16ed9a47a4)
- [resources/views/MyAccount/Components/BankDataSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-1f3a9b0d80f77b92422277ac44697c3af03430626f4bbc8afc281c5b66ec0b1f)
- [resources/views/MyAccount/Components/ChangePaymentMethod.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-eb7c6713f77e2474d697d9c61965c24b43696f444a9d6cc11fc93428da719535)
- [resources/views/MyAccount/Components/OrderHistory.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-a4e17105e37f62c4fbc0b52da6bbcc7b5d0f134fd425f71b536e95e4ea565f5b)
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)


## v5.0.42 (2021-11-15) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.41...5.0.42" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### ToDo

- Themes und eigenes CSS müssen hinsichtlich `<span>`-Elementen überprüft werden. Wir haben alle `<span>`-Elemente, die Block-Level-Elemente enthielten, entweder entfernt oder in `<div>`-Elemente umgewandelt, um invalides HTML zu verhindern. Überprüfe, ob du in deinen Selektoren auf die betroffenen `<span>`-Elemente zugreifst und passe deine Stilanweisungen gegebenenfalls an. Die betroffenen Dateien findest du im Abschnitt **Angepasste Templates**.

### Geändert

- Beim Aktualisieren der Adresse wird nun geprüft, ob das Geburtsdatum valide ist, auch wenn der Eingabewert nicht sichtbar ist.
- In den ShopBuilder-Vorlagen für die Bereiche **Checkout** und **Mein Konto** werden nun Inline Text-Widgets anstatt Text-Widgets verwendet.
- Für die SEO-Einstellung im Bereich SKU wurde die Option **Artikel-ID** hinzugefügt.

### Behoben

- Die Einstellung **Bei Mouse-Over über dem Warenkorbsymbol im Header einblenden** für die Anzeige der Warenkorbvorschau funktionierte nicht wie gewünscht. Dies wurde behoben.
- Das Öffnen und Schließen der mobilen Navigation passiert nun über eine zentrale Stelle. Dadurch kann es nicht mehr zu unterschiedlichen Ständen der CSS-Klassen kommen, die den Zustand der Navigation darstellen.
- Chunks des JS-Bundles wurden bei aktivierten Server-side Rendering ohne den Buildhash geladen und wurden daher teilweise veraltet aus dem Browsercache ausgeliefert. Dies wurde behoben.
- Beim Speichern des plentyShop-Assistenten wird jetzt nicht mehr der gesamte ShopBooster-Cache invalidiert. Bei Einstellungen, die nur Werte aus der Plugin-Konfiguration betreffen (Vorschaumodus), werden nur betroffene Seiten im Cache invalidiert.
- Nach dem Anlegen einer Retoure wird man nun je nach Login-Status auf den **Mein Konto**-Bereich oder auf die Bestellbestätigungsseite weitergeleitet und nicht mehr auf die Startseite.
- Die fehlende Übersetzung für die Währung Antillen-Gulden und die dazugehörige Einstellung in der Plugin-Konfiguration wurden ergänzt.
- Beim Lieferlandwechsel wurden ungültig Artikel nicht aus dem Warenkorb entfernt. Dies wurde behoben.
- `<span>`-Elemente dürfen keine Block-Level Elemente enthalten. Diese `<span>`-Elemente wurden entweder entfernt oder zu `<div>`-Elementen umgewandelt, um invalides HTML zu verhindern. Wir bedanken uns bei @MaxBentz für den Beitrag.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.42 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in den entsprechenden Dateien.
- [resources/views/Customer/Components/AddressSelect/AddressSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/2880/files#diff-969624803dfeb696a58e16de0d95c285a458ec83a615026882d9b1e65386935b)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-49e9a28ec33181e8fd3720d39345363b8b0614f2bf29ceb66b403ef22c18bd4d)
- [resources/views/MyAccount/Components/BankDataSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-1f3a9b0d80f77b92422277ac44697c3af03430626f4bbc8afc281c5b66ec0b1f)
- [resources/views/Widgets/Contact/ContactDetailsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-b7d6f7d1aeff7c602684070225c40c435e3de1caed65ca3df51fdd554a994e33)
- [resources/views/Widgets/OrderConfirmation/OrderDataWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-82affb09026a21fd94995e057ae7214f6751cf84dfed718216f4760865567c33)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)

## v5.0.41 (2021-10-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.40...5.0.41" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

* Der LayoutContainer "Ceres::PageDesign.AfterOpeningHeadTag" wurde hinzugefügt. @FelixRies

### Geändert

* Rebranding: **Ceres** wird jetzt unter **plentyShop LTS** beworben.

### Behoben

* Im Standard Login-Template wurde der Input des Gastlogin-Modals nach dem Öffnen nicht fokussiert. Dies wurde behoben.
* Im Assistenten wurde nicht dargestellt, wenn die Bestelleigenschaften aktiviert wurden. Das wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.41 gab es Änderungen an einer Template-Datei, die für Theme-Entwickler relevant ist. Die Verlinkung führt direkt zu der umgesetzten Änderung in der entsprechenden Datei.
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/3051/files#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)

## v5.0.40 (2021-10-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.39...5.0.40" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

* plentyShop LTS unterstützt jetzt Bestelleigenschaften. Um Bestelleigenschaften zu nutzen, aktiviere die Einstellung **Nutzung von Bestelleigenschaften (beta)** im Schritt **Webshop** des plentyShop LTS-Assistenten. **Achtung:** Dadurch werden Bestellmerkmale deaktiviert.

### Geändert

* Im ShopBuilder wurden maximal 250 Eigenschaften angezeigt, wenn man versucht hat, über den Datenfeldpicker in einem Textfeld auf Eigenschaften zuzugreifen. Dieses Verhalten wurde angepasst und die Zahl der maximal angezeigten Eigenschaften auf 1500 erhöht.
* plentyShop LTS kann jetzt auf eine zukünftige Auftragseinstellung reagieren, mit der Präfixe für Artikelpakete und Komponenten angepasst werden können. Beachte, dass es bei Änderungen an diesen Präfixen zu einer fehlerhaften Darstellugn von älteren Aufträgen kommen kann.
* Die maximale Menge der angezeigten Artikel in der Vorschau des Artikelraster-Widgets im ShopBuilder wurde auf 50 begrenzt.

### Behoben

* Artikellisten vom Typ **Zuletzt gesehen** funktionierten teilweise nicht korrekt wenn Server-Side Rendering inaktiv war. Dieses Verhalten wurde behoben.
* Wenn die Einstellung **Nicht akzeptierte Cookies blockieren** inaktiv war, konnte durch das Akzeptieren der Cookies ein reCAPTCHA-Fehler ausgelöst werden. Dies wurde behoben.
* Die Option **Kategorien als Filteroptionen bei Suchergebnissen anzeigen**, die zur Anzeige des Kategorie-Filter-Widgets benötigt wird, wurde zum Assistenten hinzugefügt.

## v5.0.39 (2021-09-13) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.38...5.0.39" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Das Kontaktformular lässt sich nun bei aktiviertem reCaptcha nicht mehr absenden, wenn der entsprechende Cookie nicht akzeptiert wurde.

### Behoben

- Die Mengeneingabe auf der Artikelansicht ignoriert nun den Mindestbestellwert, falls der betreffende Artikel bereits im Warenkorb vorhanden ist.
- Tabs werden wieder richtig angezeigt, auch wenn sie nur ein Bilder-Widget enthalten.
- Wenn Eigenschaften mehreren Gruppen zugeordnet waren, kam es zu Problemen wenn diese über die Datenfeldauswahl in die ShopBuilder-Vorlage eingebaut wurden. Dieses Verhalten wurde behoben.

## v5.0.38 (2021-08-31) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.37...5.0.38" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Zum Ändern der Zahlungsart wird nun zusätzlich der `accessKey` für den Auftrag übergeben.

### Behoben

- Die Intervallbestellmenge in der Mengeneingabe wird nun aktualisiert, sobald die Variante gewechselt wird.
- Bei der Verwendung von externen Suchanbietern konnte es bei einem Fehlerfall auf externer Seite zu fehlerhaften Darstellung im Frontend kommen. Dies wurde behoben.
- Im Internet Explorer 11 wurden unter bestimmten Umständen Bilder nicht angezeigt. Dies wurde behoben.
- Die Platzhalter für "Artikeltext", "Technische Daten" und für Texteigenschaften werden nun vom ShopBuilder als Block-Elemente ausgegeben und erzeugen so kein ungültiges HTML mehr.

## v5.0.37 (2021-08-17) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.36...5.0.37" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.

### Behoben

- Es wurden fälschlicherweise Zeilenumbrüche in den Inline-Styles des Hintergrundbild-Widgets eingefügt. Diese wurden entfernt.
- Bei aktivem Server-Side Rendering konnte die Filter-Toolbar auf einer Kategorieseite, die nicht über den ShopBuilder gebaut wurde, nicht geöffnet werden. Dies wurde behoben.
- Bei aktivem Server-Side Rendering ließ sich die Cookie Bar in bestimmten Fällen nicht benutzen. Dies wurde behoben.
- Es können jetzt alle Werte der Eigenschaften vom Typ **Mehrfachauswahl** im plentyShop angezeigt werden.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.37 gab es Änderungen an einer Template-Datei, die für Theme-Entwickler relevant ist. Die Verlinkung führt direkt zu der umgesetzten Änderung in der entsprechenden Datei.
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2995/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)
- [resources/js/src/app/components/itemList/filter/ItemFilterList.vue](https://github.com/plentymarkets/plugin-ceres/pull/3000/files#diff-e9e66af238168dbc3f834944944094a491bee28d6d7016c8e9365b673872a82b)
- [resources/js/src/app/components/pageDesign/CookieBar.vue](https://github.com/plentymarkets/plugin-ceres/pull/3000/files#diff-07203a2a14f4fdfe0285c115db84358b9b18bbe84d3ab3536f80b667529b7392)


## v5.0.36 (2021-08-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.35...5.0.36" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Das Laden von Kundendaten, Warenkorb und Warenkorb-Artikeln wurde unter einer Abfrage zusammengefasst.
- Varianteneigenschaften auf der Artikeldetailseite werden nun im ShopBuilder und im plentyShop über die neuen Repositories für Varianteneigenschaften geladen.

### Behoben

- Beim Ändern des Lieferlands im Header wurde die Auswahl nicht gespeichert. Dies wurde behoben.
- Wenn die Währungsauswahl im plentyShop Ceres-Assistenten deaktiviert wurde, wurden alle verfügbaren Währungen für den Webshop deaktiviert. Dies wurde behoben.
- Bei plentyShops, bei denen Server-Side Rendering inaktiv war, wurden Bilder, die in inaktiven Tabs eines Tab-Widgets positioniert waren und für die die Option **Nur sichtbare Inhalte laden** aktiviert war, direkt beim Seitenaufruf geladen. Dies wurde behoben.

## v5.0.35 (2021-07-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.34...5.0.35" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.
- Die Einstellung **Nicht akzeptiere Cookies blockieren** in den Ceres-Einstellungen wurde für alle Systeme, für die die Ceres-Einstellungen noch nie gespeichert wurden, aktiviert. Falls du Cookies, die durch Besucher:innen nicht akzeptiert wurden, nicht blockieren möchtest, überprüfe die Einstellung im Menü **Plugins » Plugin-Set-Übersicht »** *Plugin-Set wählen* **» Ceres » Konfiguration » Tab: Global** und deaktiviere sie, falls nötig. 

### Geändert

- Die Einstellung **Nicht akzeptiere Cookies blockieren** in den Ceres-Einstellungen ist nun standardmäßig aktiv.

### Behoben

- Durch einen Fehler war es nicht möglich, die Kategorienavigation so einzustellen, dass keine Kategorien in Ebene 2 angezeigt werden. Dieses Verhalten wurde behoben.
- Im HTML-Markup wurde ein falscher `prev`-Link gesetzt, wenn man auf der zweiten Seite einer Kategorie war. Dies wurde behoben.
- Das Wechseln zwischen Artikelvarianten konnte auf mobilen Geräten dazu führen, dass zu einer anderen Stelle der Seite gescrollt wurde. Dies wurde behoben.
- Auf der Artikeleinzelansicht wurden Datenfelder in Text-Widgets bei einem Wechsel der Variante nicht aktualisiert. Dies wurde behoben.
- Mit aktiven Server-Side Rendering (SSR), war es für externe Plugins nicht möglich Vue-Komponenten in Ceres zu überschreiben. Dies wurde behoben.
- Der erlaubte Maximalwert für die Mengeneingabe eines Artikel wurde beim Wechsel einer Variante nicht aktualisiert. Dies wurde behoben.
- Der Tooltip der den Maximalwert an der Mengeneingabe eines Artikels anzeigt gibt jetzt den korrekt Wert aus.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.35 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in der entsprechenden Datei.
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2960/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/views/Category/Item/CategoryItem.twig](https://github.com/plentymarkets/plugin-ceres/pull/2949/files#diff-6e3fe08ffe8086b5176c1c0451cb0c0034b99195843630994e5e79347f8d1158)

## v5.0.34 (2021-06-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.33...5.0.34" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Um eine rechtssichere Bearbeitung der Kontaktdaten im Checkout zu gewährleisten, ist es notwendig, am Adressauswahl-Widget im Checkout die Option **E-Mail** für die Einstellungen **Rechnungsadressfelder anzeigen** und **Lieferadressfelder anzeigen** zu aktivieren.
- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.

### Hinzugefügt

- Am Adressauswahl-Widget wurde die Option **E-Mail** für die Einstellungen **Rechnungsadressfelder anzeigen/Lieferadressfelder anzeigen** hinzugefügt. Dadurch können Shop-Besucher:innen die E-Mail-Adresse ändern, an die die Bestellbestätigung und andere Informationen gesendet werden.
- Die E-Mail, die Besucher:innen zur Anmeldung im plentyShop nutzen, wird nun automatisch an Rechnungs- und Lieferadresse hinterlegt.
- In den SEO-Einstellungen des plentyShop-Assistenten und des Ceres-Plugins kann jetzt das Mapping für den GTIN-Barcode und den Herstellernamen für die Rich Snippets der Artikelseite aktiviert werden. Weiterhin kann die externe Varianten-ID für MPN-Barcodes hinzugefügt werden.
- Das Widget **Spracherkennung** wurde zum ShopBuilder hinzugefügt. Dieses bietet Nutzer:innen einen Wechsel der Inhalte auf die erkannte Browser-Sprache unter Berücksichtigung der konfigurierten Weiterleitungen im Backend an.

### Geändert

- Die Bedienbarkeit der Auswahl für Rechnungs- und Lieferadressen wurde überarbeitet.
- Die Cookie Bar wurde so angepasst, dass kein Cumulative Layout Shift (Google Core Web Vitals) mehr erzeugt wird, wenn Besucher:innen die Seite mit akzeptierten Cookies erneut laden.
- Beim erfolgreichen Versenden des Kontaktformulars wird nun ein `contactFormSent`-Event ausgelöst.
- Beim Einbinden zusätzlicher Instanzen von jQuery werden nun zuvor registrierte Plugins übernommen und ein entsprechender Warnhinweis ausgegeben.

### Behoben

- Wenn im Navigation-Widget viele Kategorien angezeigt wurden, wurde das Shop-Logo zu klein dargestellt. Dies wurde behoben.
- Es wird nun sichergestellt, dass bei eigenen Schriftarten der Text während des Ladevorgangs der Schriftart sichtbar bleibt.
- Die **Zum Warenkorb hinzufügen**-Schaltfläche auf Artikellisten konnte das Mega-Menü überlagern. Dies wurde behoben.
- Die fehlende Ausgabe des SEO-Attributs `priceValidUntil` bei gruppierten Varianteneigenschaften am Artikel wurde hinzugefügt.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.34 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in der entsprechenden Datei.
- [resources/views/Checkout/CheckoutView.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-c74596cdf6d6196e3b9c8563916151e3a08a5edfa026845503c9169a0fcd8252)
- [resources/views/Customer/Components/AddressSelect/AddressHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-30379d1768fe8165edaa8801437dacdd43b91106c90a543bde299bdfa82b2be4)
- [resources/views/Customer/Components/AddressSelect/AddressSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-969624803dfeb696a58e16de0d95c285a458ec83a615026882d9b1e65386935b)
- [resources/views/MyAccount/Components/BankDataSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-1f3a9b0d80f77b92422277ac44697c3af03430626f4bbc8afc281c5b66ec0b1f)
- [resources/views/MyAccount/MyAccountView.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-dbc71118894a6415be3f82e4ee31dc1e6b7c3160b45b887ccce71f6620824d7c)
- [resources/views/Widgets/Basket/BasketTotalsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-eb6a01e8f34626aab363899d6e2363283e62f314ef3f9f7f56638ab93cb11026)
- [resources/views/Widgets/Customer/AddressWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-47efd06234499d9fa52810e58ce5e6d9983e522de814c92e8ff66f4b010f0db5)

## v5.0.33 (2021-06-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.32...5.0.33" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Im Bilderkarussell-Widget ist es nun möglich, die beiden Optionen **Nur sichtbare Inhalte laden** und **Bild vorladen** zu kombinieren.
- Die Widgets Titelleiste und Text haben den Cumulative Layout Shift (Google Core Web Vitals) negativ beeinflusst, da die enthaltenen Texte erst auf dem Client angezeigt wurden. Dies wurde geändert.
- Aus dem SSR-Bundle wurden nicht benötigte Komponenten für den Mein-Konto-Bereich und den Checkout entfernt, um die Dateigröße zu minimieren. Vielen Dank an @JVolke für den Beitrag.
- Die Überschrift vom Navigations-Widget wird nun wieder auf dem Server gerendert (SSR). Dadurch wird der Cumulative Layout Shift-Wert der Google Core Web Vitals verbessert.
- Die Komponente `user-login-handler` wird nun erst auf dem Client gerendert. Dadurch werden Hydration-Fehler bei aktivem Server-Side Rendering (SSR) verhindert.
- In den Einstellungen der Widgets Liste und Link können nun Relationship-Attribute gesetzt werden.

### Behoben 

- Im ShopBuilder konnte es dazu kommen, dass bei Änderungen am **Erscheinungsbild** von Text-Widgets der Text nicht mehr angezeigt wurde. Dies wurde behoben.
- Im Suchfeld kann jetzt ein alternativer Text als Platzhalter gesetzt werden. Dazu kann in der Mehrsprachigkeit der Eintrag "headerSearchPlaceholder" befüllt werden.
- Im Bilderkarussell-Widget wurden keine Bilder für Artikelvarianten angezeigt. Dies wurde behoben.
- Vuex war im Window nicht verfügbar, wenn Server-Side Rendering aktiv war. Dies wurde behoben.
- Es wurde ein Fehler in der Artikelliste vom Typ **Zuletzt gesehen** behoben, durch den diese Listen bei aktivem Server-Side Rendering nicht korrekt hydriert wurden.
- Durch ein fehlendes Anführungszeichen wurde die Variable `priceValidUntil` in den strukturierten Daten nicht erkannt. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.33 gab es Änderungen an Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in der entsprechenden Datei.
- [resources/views/Widgets/Common/InlineTextWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2906/files#diff-e7dc3611e423358f168f99f3a60b6bfa3d2af686cfee952aca2e93ca91a3be62)
- [resources/views/Widgets/Common/TitleBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2906/files#diff-91d4a3578417267035536ce9c72ca096a438ce5e7936d8edb1e0d3187bb69865)
- [resources/views/Widgets/Navigation/NavigationTreeWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2906/files#diff-d694b4ace865b8e05bdad90a07c80f0687d865e0d3d1a82f8ffa614bee809157)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2908/files?diff=unified&w=1#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/Common/LinkWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2903/files#diff-374f59a54ec3fcbe1d2444facbddd25c4f8a114e71b7576c9c34d7a20a2d122b)
- [resources/views/Widgets/Common/ListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2903/files#diff-52efec59835d97dc6c2ed6ae7c8b639056ccfaac681c3e425090d53796b13423)

## v5.0.32 (2021-06-01) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.31...5.0.32" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Im plentyShop-Assistenten kann jetzt die Gültigkeit des Session-Cookies zusätzlich auf eine Stunde oder einen Tag eingestellt werden.
- In den SEO-Einstellungen des plentyShop-Assistenten und des Ceres-Plugins kann jetzt das Mapping verschiedener Barcodes (GTIN-8, GTIN-13, ISBN und MPN) sowie die Preisgültigkeit (priceValidUntil) und die SKU für die Rich Snippets der Artikelseite aktiviert werden.

### Geändert

- Fehler beim serverseitigen Rendern der Vue.js-App können jetzt abgefangen und die Seite clientseitig gerendert werden.
- Im Bilderkarussell-Widget wurde die Performance beim Laden von verknüpften Artikelvarianten verbessert.
  
### Behoben

- Der Inhalt eines Text-Widgets wird nun nicht mehr auf der Seite des Servers gerendert (SSR), um Hydration-Fehlern vorzubeugen.
- Die Logik zum Scrollen fixierter Elemente im Header wurde angepasst. Dies verbessert den Wert 'Cumulative Shift Layout' (CLS) der Google Core Web Vitals.
- Das Artikellisten-Widget hat unter bestimmte Umständen im ShopBuilder keine Bilder angezeigt. Dies wurde behoben.
- Durch einen Fehler konnten serverseitig verschachtelte Komponenten nicht über `data-component` überschrieben werden was zu Hydration-fehlern geführt hat. Dies wurde behoben.
- Um den Ceres-Assistenten zu durchlaufen sind für den plentymarkets-Benutzer ab sofort keine Berechtigungen mehr für die Bereiche "Buchhaltung" und "Auftragsstatus" erforderlich.
- Durch einen Fehler konnte im AfterScriptsLoaded-Container nicht mehr auf `window.ceresStore` zugegriffen werden. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.32 gab es Änderungen an einer Template-Datei, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in der entsprechenden Datei.
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2874/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/PageDesign/Partials/Header/Header.twig](https://github.com/plentymarkets/plugin-ceres/pull/2874/files#diff-f2a11c8bc92192c490363ceeb2b7e9a02819568c77971a10e43eedc93270014f)
- [resources/views/Widgets/Category/ItemGridWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2881/files#diff-f0aaf1ea155523f16c664c97d4b8877ad9db66f705f85a59ebffc0a3834f2456)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2875/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Item/SingleItemWrapper.twig](https://github.com/plentymarkets/plugin-ceres/pull/2879/files#diff-192a8837dba88964356b7ecd49003fe083ed719e2c601b9623e6dd4b24be9326)

## v5.0.31 (2021-05-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.30...5.0.31" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Das Bilderbox-Widget besitzt nun eine weitere Option der Einstellung Seitenverhältnis: "Seitenverhältnis beibehalten". Mit dieser Option behält das Widget das Seitenverhältnis des Bildes.
- Am Auswahlfeld-Widget des Kontaktformulars lässt sich jetzt beim Auswahltyp "Mehrfachauswahl" in Kombination mit der Option "Pflichtfeld" die Minimal- und Maximalmenge der auszuwählenden Optionen einstellen.
- Das Artikellisten-Widget unterstützt nun das Vorladen von Bildern.

### Geändert

- Die QuantityInput-Komponente wird nun gemeinsam mit der AddToBasket-Komponente geladen. Dies verringert die Ladezeit in der Artikelansicht. Danke an @naturdrogerie
- Die ShippingCountrySelect-Komponente im Header wird nun von Intersect anstatt von Lazy-Hydrate abgedeckt. Danke an @MaxBentz!

### Behoben

- Die Einstellung zum Aktivieren von Vue-SSR im Assistenten konnte in Konfigurationen im Vorschaumodus nicht angezeigt werden. Dies wurde behoben.
- Templates von verschachtelten Komponenten, die nicht über Vue.component() registriert wurden, werden serverseitig berücksichtigt.
- Die Trennzeichen in überschriebenen Komponenten-Templates werden von SSR korrekt interpretiert.
- In der LazyLoad-Komponente konnte es zu NullPointerExceptions kommen. Das Verhalten wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.31 gab es Änderungen an einer Template-Datei, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in der entsprechenden Datei.
  
- [resources/views/Widgets/Common/ImageBoxWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2856/files#diff-9f438954b9f177761379a8b382eea014077ec743060583796ac4f9aaed3d3003)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2862/files#diff-56e4aca5195c81e2f933daaf2a1d1397fcd1e72844a24d75155dcab09e4cb0ee)
- [resources/views/Widgets/Form/SelectionWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2855/files#diff-87084c109a175d99c3284c8dc3de606d3ef045d10aa519da1acf7530c5b36fc0)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2851/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66) 
- [resources/views/Widgets/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2851/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)

## v5.0.30 (2021-05-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.29...5.0.30" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- `vueEventHub` wurde für aktives Server-Side Rendering (SSR) Client-seitig wieder hinzugefügt. Dadurch kann das Blog-Plugin in Version 2.0.0 in Kombination mit SSR fehlerfrei genutzt werden.
- Im PageDesign.twig wurden der Layout-Container **AfterOpeningBodyTag** und der Block **PartialFooter** ergänzt.

### Behoben

- Im ShopBuilder wurde die Größe des Bodies bei Änderungen nicht neu berechnet. Dies wurde behoben.
- Überschriebene Komponenten-Templates können nun serverseitig korrekt gerendert werden.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.30 gab es Änderungen an einer Template-Datei, die für Theme-Entwickler relevant sind. Die Verlinkung führt direkt zu der umgesetzten Änderung in der entsprechenden Datei.
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/2857/files#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)

## v5.0.29 (2021-05-10) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.28...5.0.29" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Die Ceres-Einstellungen und der plentyShop-Assistent enthalten nun im Bereich Performance die neue Einstellung **Vue Server-Side Rendering aktivieren**, mit der Server-Side Rendering aktiviert werden kann, um Markup serverseitig zu generieren. Dies verbessert die Shop-Performance. Diese Einstellung ist standardmäßig inaktiv.
- Die Ceres-Einstellungen und der plentyShop-Assistent enthalten nun im Bereich Performance die neue Einstellung **State Cloning für Event Propagation in VueX aktivieren**, mit der State Cloning aktiviert und deaktiviert werden kann. Das Deaktivieren des State Clonings erhöht die Shop-Performance, kann aber dazu führen, dass es zu Fehlern in Verbindung mit externen Plugins kommt. Diese Einstellung ist standardmäßig aktiv.
- Die Widgets Bilderbox, Bilderkarussell, Hintergrundbild und Artikelbild wurden um die Einstellungen **Bild vorladen** erweitert. Diese Einstellung dient dazu, die Shop-Performance in Kombination mit Server-Side Rendering zu verbessern. Weitere Informationen zur Verwendung dieser Einstellung findest du [hier](https://knowledge.plentymarkets.com/de-de/manual/main/webshop/best-practices.html#_bilder_widgets_optimal_einstellen).
- Zur Verbesserung der Barrierefreiheit der Mengenangabe für Artikel wurden `aria-label` hinzugefügt. Wir möchten uns bei @MaxBentz für diesen Beitrag bedanken!
- In den SEO-Einstellungen des Ceres-Plugins und im plentyShop-Assistenten kann jetzt das Mapping der Marke (Brand) und des Herstellers (Manufacturer) für die Rich Snippets der Artikelseite aktiviert werden.
- Die ClientOnly-Komponente wurde hinzugefügt. Diese ermöglicht externen Entwickler:innen Komponenten, die nicht mit Vue Server-Side Rendering kompatibel sind, zu wrappen, damit diese Komponenten nur auf der Client-Seite ausgeführt werden.

### Geändert

- Bilder im Hintergrundbild-Widget können nun über die Widget-Einstellung **Hintergrundbild nachladen** zu einem späterem Zeitpunkt nachgeladen werden. Weitere Informationen zur Verwendung dieser Einstellung findest du [hier](https://knowledge.plentymarkets.com/de-de/manual/main/webshop/best-practices.html#_bilder_widgets_optimal_einstellen).
- Im Mein-Konto-Bereich können Versandadressen an Postfilialen oder Packstationen nur noch dann angelegt werden, wenn mindestens ein Versandprofil mit der jeweiligen Option verfügbar ist.
- Die Länderauswahl hat nun eine eindeutige ID. Dadurch werden zwei Konsolenwarnungen im Checkout entfernt. Wir möchten uns bei @jvolke für den Beitrag bedanken!
- Der LazyImg-Komponente wurde ein Slot hinzugefügt, damit zusätzliche Bilderquellen hinzugefügt werden können.

### Behoben

- Die Übersetzung für die Consent-Gruppe der Zahlungsanbieter wurde nicht korrekt ausgelesen. Das wurde behoben.
- Im Warenkorb-Widget können nun alle zusätzlichen Artikeldaten ausgeblendet werden.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.29 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien. Diese Version enthält mehr Template-Anpassungen als sonst, um plentyShops auf das Google Core Web Vitals Update vorzubereiten. Wir haben die Template-Änderungen nach Wichtigkeit sortiert im Folgenden aufgelistet.

#### Notwendige Template-Anpassungen

- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)
- [resources/views/PageDesign/Partials/Header/Breadcrumb.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-1419cc783c69f7d9ffa8a59dfa07c63a77d349711edb01dd573f8119d0a5946d)
- [resources/js/src/app/components/customer/login/Login.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-2f9c77c26769ad83744b9004d9455b7db47a08d018f960672d2feaa51e1ce476)

#### Wichtige Template-Anpassungen für Performance

- [resources/js/src/app/components/containers/LastSeenItemList.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-19af7c40623f40d850c291ad2b4077e5a6bb4357fd778719bf996871d8739a17)
- [resources/js/src/app/components/item/ItemImageCarousel.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-78484b68defc6a9839cc69c5f3f9fc8bef2d0641a6db41ab6e68f58665f48912)
- [resources/js/src/app/components/item/VariationSelect.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-3bf7e50898b2d79d717300fe7c276487aea49cb917f014bf3f8ea27c6b392149)
- [resources/js/src/app/components/itemList/CategoryImageCarousel.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-449e63fc921701c277c047250ed882be5e7039c498efa513e1469dffd8ff818f)
- [resources/views/Widgets/Common/ImageBoxWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-9f438954b9f177761379a8b382eea014077ec743060583796ac4f9aaed3d3003)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/Item/AttributeWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-3e6df11a97d5ae968dcaa110652d41aed6e5098612223d0f18030946b7a58bb9)
- [resources/views/Widgets/Item/ItemImageWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-e9d44ad6d7ca6325b265745487a158c45e697741e7ec84b86b338ecbfd511e98)
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)

#### Weitere Template-Anpassungen für Performance

- [resources/views/Widgets/Header/NavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-d9d8d5418b1e74986dcb27dfa315d297f65a5f90efed0734e8ab495651cab594)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/views/Widgets/Item/AddToBasketWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-130e6f2327939a6da964755351a1ae84298251d3c24de27e53214e91775dca4e)
- [resources/views/Category/Item/CategoryItem.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-6e3fe08ffe8086b5176c1c0451cb0c0034b99195843630994e5e79347f8d1158)
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/PageDesign/Partials/Header/Header.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-f2a11c8bc92192c490363ceeb2b7e9a02819568c77971a10e43eedc93270014f)
- [resources/views/Widgets/Category/Filter/SelectedFilterWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-bb4d6cc6416dadd32734558f042315abb70692052e3f4eeda9018bc1b293b375)
- [resources/views/Widgets/Category/ItemGridWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-1419cc783c69f7d9ffa8a59dfa07c63a77d349711edb01dd573f8119d0a5946d)

#### Sonstige Änderungen

- [resources/js/src/app/components/customer/AddressInputGroup.vue](https://github.com/plentymarkets/plugin-ceres/pull/2782/files#diff-5445acdb5dffc6cd08b75fb1bf432147c3f133b8de32af76563a4c97a544474a)
- [resources/views/MyAccount/MyAccountView.twig](https://github.com/plentymarkets/plugin-ceres/pull/2782/files#diff-dbc71118894a6415be3f82e4ee31dc1e6b7c3160b45b887ccce71f6620824d7c)
- [resources/views/Widgets/Customer/AddressWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2782/files#diff-47efd06234499d9fa52810e58ce5e6d9983e522de814c92e8ff66f4b010f0db5)
- [resources/views/Widgets/Basket/BasketWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2798/files#diff-a04406229e93c83b77582c9ca6224de6a07407290c3de61766703547c259a9f3)
- [resources/js/src/app/components/customer/CountrySelect.vue](https://github.com/plentymarkets/plugin-ceres/pull/2821/files#diff-d522167cca732f4be9af95ab75e109d08edeaeda8b145a0f17a97113c67374e9)
- [resources/js/src/app/components/item/QuantityInput.vue](https://github.com/plentymarkets/plugin-ceres/pull/2828/files#diff-3023cfd864b216b918be19d49ca9b82e9eadb47d5efc185483630cdd3f54c82a)
- [resources/views/Item/SingleItemWrapper.twig](https://github.com/plentymarkets/plugin-ceres/pull/2804/files#diff-192a8837dba88964356b7ecd49003fe083ed719e2c601b9623e6dd4b24be9326)
- [resources/views/Widgets/MyAccount/GreetingWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2779/files#diff-c428531b614621aa7ec1fe56507582fcd923aeae8342bfb3c0d2bbbe650c69be)

## v5.0.28 (2021-04-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.27...5.0.28" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Die Ausrichtung des Textes im Begrüßung-Widget kann jetzt über die Widget-Einstellungen bestimmt werden.
- Im Schritt Webshop des plentyShop-Assistenten kannst du nun wählen, mit welchem Status Aufträge angelegt werden, für die die Prüfung der Umsatzsteuer-Identifikationsnummer nicht abgeschlossen werden konnte.

### Geändert

- Einige Bedienelemente wurden um ARIA-Attribute erweitert. Wir möchten uns bei @cerwantes für diesen Beitrag bedanken!
- Das Favicon wird nun beim Speichern des plentyShop-Assistenten in den internen Webspace hochgeladen. Es ist somit nicht mehr notwendig, das Plugin-Set bereitzustellen, damit Änderungen am Favicon wirksam werden.
- Die Stabilität des Kontaktformulares wurde verbessert.
- Das Eingabefeld für die Umsatzsteuer-Identifikationsnummer enthält nun das länderspezifische Präfix.

### Behoben

- Solange kein Favicon in den Ceres-Einstellungen hinterlegt ist, wird nun das Favicon aus den veralteten Einstellungen des Mandanten verwendet.
- Das Home-Icon in den Breadcrumbs wurde zusätzlich mit einem aria-label versehen. Dessen Wert kann über die Mehrsprachigkeitsoberfläche über den Eintrag `headerBreadcrumbHome` angegeben werden. Wir möchten uns bei @cerwantes für den Beitrag bedanken!
- Aus Gründen der Rechtssicherheit wird nun in der Auflistung der Staffelpreise auf der Artikelansicht auch der Grundpreis angezeigt, falls die Grundpreisanzeige am Artikel aktiviert ist.
- Im Header wurde ein fehlerhaftes `<img>`-Tag angezeigt, wenn kein Firmenlogo in den Ceres-Einstellungen hinterlegt war. Dieses Verhalten wurde behoben.
- Zahlungsartenrabatte und -aufschläge werden jetzt bei einer nachträglichen Änderung der Zahlungsart eines bestehenden Auftrags berücksichtigt.
- Unter bestimmten Umständen wurde die Währung in der Auftragsübersicht im Mein Konto-Bereich falsch angezeigt. Dieses Verhalten wurde behoben.
- Durch einen Fehler konnte pro Plugin nur eine Übersetzungsdatei im Frontend verwendet werden. Dies wurde behoben.
- Die Mindestbestellmenge eines Artikels oder eines Preises wird nun bei der Mengeneingabe berücksichtigt.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.28 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/views/Widgets/MyAccount/GreetingWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2779/files#diff-c428531b614621aa7ec1fe56507582fcd923aeae8342bfb3c0d2bbbe650c69be)
- [resources/js/src/app/components/item/GraduatedPrices.vue](https://github.com/plentymarkets/plugin-ceres/pull/2765/files#diff-57df8453013ee1dd0821c871b25d89e42eb2ff2ed7d491f2141aacb299ada6b9)


## v5.0.27 (2021-04-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.26...5.0.27" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Das Favicon aus den Plugin-Einstellungen wird angezeigt, solange kein Favicon in den internen Webspace hochgeladen wurde.
- Unter bestimmten Umständen erzeugte die Store Special-Komponente einen JavaScript-Fehler in der Konsole. Dies wurde behoben.

## v5.0.26 (2021-04-06) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.25...5.0.26" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Der plentyShop-Assistent enthält nun eine Einstellung, mit der bestimmt werden kann, wie sich der Kund:innen-Login bei Systemen mit mehreren Mandanten verhalten soll. Weitere Informationen dazu findet ihr in [diesem Forenbeitrag](https://forum.plentymarkets.com/t/mehrere-kontakte-mit-der-selben-e-mail-adresse-koennen-sich-bei-unterschiedlichen-mandanten-einloggen-multiple-contacts-with-the-same-email-address-can-log-into-different-clients/630567).

### Geändert

- Die eingestellte CSS-Klasse für Facetten und Facettenwerte wird jetzt im Frontend ausgegeben.
- Die Anzahl der maximal ausgegebenen Kategorien der zweiten Ebene können nun auch für das normale Menü in den Widget-Einstellungen im ShopBuilder festgelegt werden.
- Das hinterlegte Favicon wird nach dem Bereitstellen des Plugin-Sets unter der jeweiligen Webshop-Domain hochgeladen und wird somit nun auch von der mobilen Google-Suche berücksichtigt. **Hinweis** Änderungen am Favicon werden dadurch erst nach erneutem Bereitstellen des Plugin-Sets wirksam!
- Im Warenkorb sowie in der Wunschliste verlinken Artikelbilder jetzt auf die jeweilige Variantenseite. Wir möchten uns bei @cerwantes für den Beitrag bedanken!
- Für externe Suchanbieter besteht jetzt die Möglichkeit, direkt die gesamten Artikeldaten zurückzugeben, um die Performance der externen Suche zu verbessern. Dafür müssen die Artikeldaten in der richtigen Datenstruktur zurückgegeben werden.
- Die Berechnung von fixierten Elementen erfolgt nicht mehr, wenn diese deaktiviert sind.

### Behoben

- In der Desktop-Ansicht des Safari-Browsers wurden bei bestimmten Cursor-Bewegungen Einträge aus der Navigation fälschlicherweise ausgeklappt. Dies wurde behoben.
- Die "mehr..."-Schaltfläche in der Navigation wurde nicht korrekt angezeigt. Dies wurde behoben.
- Im plentyShop-Assistenten wurden im Schritt **Standardeinstellungen** bei der Einstellung **Standardzahlungsart** nicht alle Plugin-Zahlungsarten angezeigt. Dies wurde behoben.
- Artikel auf der Wunschliste, die eine Intervallbestellmenge über oder unter 1 oder eine Mindestbestellmenge von 0 hatten, konnten nicht direkt in den Warenkorb gelegt werden. Dies wurde behoben.
- Beim Aktualisieren eines Warenkorbartikels wird nun der Grundpreis ebenfalls aktualisiert.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.26 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/js/src/app/components/itemList/filter/ItemFilter.vue](https://github.com/plentymarkets/plugin-ceres/pull/2753/files#diff-eab69464064e5200e309de7a80e4fa43773919c60a5f31d5997058b8f7e2f478
- [resources/views/PageDesign/Partials/Head.twig](https://github.com/plentymarkets/plugin-ceres/pull/2697/files#diff-33a10158d672d50c9bc1c0e8a46fbd8edb701925dcb3f619c6ff6f8ca11e45ee)
- [resources/js/src/app/components/basket/list/BasketListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/2754/files#diff-2e0729c79085beac37d2ad03e5d1a25ddec4020ecf8e3551d50e64a6cf5f91d3)
- [resources/js/src/app/components/wishList/WishListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/2754/files#diff-be8788b59e5887730f9bb4aa5a12d093908265ff19c26bb5ddca99485e7d7621)

## v5.0.25 (2021-03-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.24...5.0.25" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert
- Der letzte Paragraph des Text-Widgets zum Inline-Editing besaß einen Außenabstand nach unten. Hierdurch war es nicht möglich, ein Text-Widget ohne unteren Abstand zu platzieren. Dieser wurde daher entfernt.
- Bei der Ausgabe der Übersetzungen für "Brutto" (Ceres::Template.checkoutGross) und "Netto" (Ceres::Template.checkoutNet) wurden in den Summen Klammern angezeigt, die sich nicht entfernen ließen. Die Klammern wurden in die Übersetzung überführt und können zukünftig entfernt werden.
-Beim Wechsel der Anrede in der Adressauswahl werden die Felder nur noch geleert, wenn man zwischen einer Personen-Anrede und einer Firma wechselt.

### Behoben
- Die Variantenauswahl reagierte nicht auf Nutzereingaben, wenn alle wählbaren Varianten nicht kaufbar sind.
- Auf den Standardseiten der Rechtstexte haben Abstände gefehlt. Diese wurden ergänzt.

## v5.0.24 (2021-03-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.23...5.0.24" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt 

- In Widgets für die Suchergebnisse ist es jetzt möglich, die Überschrift auszublenden.

### Geändert

- Bei der Ausgabe der Übersetzungen für "Brutto" `(Ceres::Template.basketGross)` und "Netto" `(Ceres::Template.basketNet)` in den Summen wurden Klammern angezeigt, die sich nicht entfernen ließen. Die Klammern wurden in die Übersetzung überführt und können zukünftig entfernt werden.
- Im ShopBuilder wird jetzt aus Kompatibilitätsgründen unabhängig von der Route die `ceres-checkout.scss` geladen.

### Behoben

- Die Einstellungen im Navigations-Widget für Darstellungstyp "MegaMenu" hatten fälschlicherweise einen Einfluss auf den Darstellungstyp "Normal". Dies wurde behoben.
- In der Vorlage für Footer konnte für den ersten Eintrag des hinterlegten Listen-Widgets keine URL eingegeben werden. Dies wurde behoben.
- Das Overlay zum Ändern des Passworts wird beim Aufruf des Passwort-Vergessen-Links aus E-Mails wieder direkt geöffnet.
- Wurde das "Rechtliche Texte"-Widget als letztes Element im Footer platziert, wurde eine zweite Scrollbar angezeigt. Dies wurde behoben.
- Die klickbare Fläche von Select-Boxen wurde vergrößert. Diese kann man nun über das Label öffnen. Des Weiteren wurden fehlende for-Attribute für diese hinzugefügt.
- Die Route auf der Seite zur Bestellbestätigung für hinterlegte Bestellmerkmale vom Typ Datei war fehlerhaft. Das Verhalten wurde behoben.
- Im Kontaktformular wurde eine Fehlermeldung nicht ausgegeben, wenn der E-Mail-Versand nicht eingerichtet war.
- Ein leeres Ergebnis bei der Nutzung von externen Suchen hat zur Erhöhung der TTFB geführt. Das Problem wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.24 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/views/Widgets/Header/NavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2687/files#diff-d9d8d5418b1e74986dcb27dfa315d297f65a5f90efed0734e8ab495651cab594)
- [resources/js/src/app/components/basket/BasketTotals.vue](https://github.com/plentymarkets/plugin-ceres/pull/2698/files#diff-74c12ada105a013f79bbea3a162d3e4358d1afa3f38c3e9e00894a3ab6ad01c1)
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/2682/files#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)
- [resources/views/Widgets/Header/SearchSuggestionWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2695/files#diff-4213d7ceb8c8a526388dda36535e762c171c37147183856d9801b5f8b18f6c34)

## v5.0.23 (2021-02-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.22...5.0.23" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt 

- Das Artikellisten-Widget enthält nun die Option, eine Liste anzulegen, die Artikel des kompletten Sortiments enthält.
- Für das Lieferland Nordirland wird jetzt die passende Flagge angezeigt.

### Geändert

- Die Factory-Klassen zum Generieren von Widget-Einstellungen wurden in das ShopBuilder-Modul überführt. Die Klassen aus Ceres sind ab sofort als **deprecated** markiert.
- Die Sortierung der Lieferländer wird nun serverseitig gerendert.

### Behoben

- Durch einen Syntaxfehler im Top-Bar-Widget konnte es beim Anzeigen der Schaltfläche für die Währungsauswahl zu Darstellungsfehlern kommen. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.23 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2664/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2664/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)

## v5.0.22 (2021-02-11) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.21...5.0.22" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler verhinderte reCAPTCHA das Absenden eines Kontaktformulars mit Dateianhang. Dies wurde behoben.
- Die Dateiauswahl des Widgets E-Mail-Anhang kann nun durch Klick auf das Eingabefeld geöffnet werden.
- Ausgewählte Dateien im Widget E-Mail-Anhang können nun wieder gelöscht werden.
- Unter bestimmten Umständen konnten manche Honeypots in Chrome durch Autovervollständigung befüllt werden. Dies wurde behoben.

## v5.0.21 (2021-02-09) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.20...5.0.21" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Das Widget E-Mail-Anhang wurde zum ShopBuilder hinzugefügt. Es wird damit ermöglicht, Dateien an E-Mails anzuhängen, die über das Kontaktformular versendet werden.
- Aria-Labels für Barrierefreiheit wurden hinzugefügt.

### Geändert

- Bilder, die in der Kategoriebeschreibung ausgegeben werden, haben nun eine maximale Breite.
- Auf `<picture>`-Elementen werden nun keine `<alt>`- und `<title>`- Attribute mehr gesetzt. Das `<title>`-Attribut wird jetzt mit auf das `<img>`-Element gesetzt.
- Der geheime Google reCAPTCHA Schlüssel wurde aus dem globalen Konfigurationsobjekt entfernt.
- Das Icon für das Löschen von Adressen im ShopBuilder wurde von einem X zu einem Mülleimer geändert. Vielen Dank an @daniel-mannheimer für den Beitrag.
- Das Widget für Datenschutzeinstellungen wurde um Schaltflächen zum Speichern der Auswahl erweitert.

### Behoben

- Im Checkout konnte es beim Ändern von Adressen zu Fehlern kommen. Dies wurde behoben.
- Die Schaltfläche für die Kategorienavigation konnte auf mobilen Displaygrößen vom Firmenlogo überlagert werden. Dies wurde behoben.
- Auf kleinen Displaygrößen konnte ein Klick auf die Attributauswahl eines Artikels dazu führen, dass die Scroll-Position zurückgesetzt wurde. Dies wurde behoben.
- Durch einen Fehler wurden Nutzer:innen zurück zum Checkout mit leerem Warenkorb geleitet, wenn sie die Bezahlung bei einem externen Zahlungsanbieter (z.B. PayPal) durch Klick auf die Zurück-Schaltfläche im Browser abgebrochen haben. Stattdessen werden sie nun auf die Bestellbestätigung weitergeleitet. Der angelegte Auftrag hat den Status "Nicht bezahlt".

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.21 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2629/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2629/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/views/PageDesign/Partials/Footer.twig](https://github.com/plentymarkets/plugin-ceres/pull/2623/files#diff-8c1bbe12524104daee76bd9f9f8adbfa1e77c0c4bb3c44fc2cf9b762750b1f13)
- [resources/views/Widgets/Footer/LegalInformationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2623/files#diff-a517288701fc39e24858ace7b40583eb007661e59be3298d5c4ada425898dcfc)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2622/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2621/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)
- [resources/views/PageDesign/Partials/Header/Navigation.twig](https://github.com/plentymarkets/plugin-ceres/pull/2625/files#diff-88b04651d27953ff32bd22a1b7764d7a9b470277695ccefb7c9b2fa07ad4aab7)
- [resources/views/Widgets/Header/NavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2625/files#diff-d9d8d5418b1e74986dcb27dfa315d297f65a5f90efed0734e8ab495651cab594)
- [resources/views/Widgets/Common/PrivacySettingsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2646/files#diff-75c3277b48fbbac401ca5a942e7bea618e94fcfda96c19d2c5e83375e82f25d7)

## v5.0.20 (2021-01-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.19...5.0.20" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Falls dein Theme die CSS-Eigenschaft `position:sticky` verwendet, musst du die `overflow-x: hidden` Eigenschaft im `.app` Container überschreiben, um die Funktion der Sticky-Eigenschaft zu erhalten. plentyShops ohne eigenes Theme sind hiervon nicht betroffen.

### Geändert

- Bilder im Hintergrund-Widget haben jetzt barrierefreie Alternativtexte.
- Der horizontale Overflow wird im `.app` Container jetzt durch `overflow-x: hidden` verhindert. Dadurch verliert die CSS-Eigenschaft `position:sticky`ihre Funktion.

### Behoben 

- Durch eine fehlerhafte Einstellung bezüglich der Anzahl der Artikel pro Seite kam es zu einer falschen Darstellung. Dieses Verhalten wurde behoben.
- Im Mein-Konto-Bereich und auf der Bestellbestätigung wurden Artikel und Summen in unterschiedlichen Währungen dargestellt, wenn eine Währung ausgewählt war, die nicht der Systemwährung entspricht. Dieses Verhalten wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.20 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2606/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2611/files#diff-49e9a28ec33181e8fd3720d39345363b8b0614f2bf29ceb66b403ef22c18bd4d)
- [resources/views/MyAccount/Partials/OrderHistoryListItemDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2613/files#diff-dcc9c181484eba069617434b9c7c20b7906e9ab74907f134720e220a818c968a)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2613/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)


## v5.0.19 (2021-01-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.18...5.0.19" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Durch einen Fehler wurden auch Bestellmerkmale mit der Option **Als Zusatzkosten darstellen** in den Summen im Warenkorb und auf der Bestellbestätigung angezeigt. Dies wurde behoben.

## v5.0.18 (2021-01-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.17...5.0.18" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt 

- Im Schritt **Suche** des Assistenten kann nun eingestellt werden, ob die Webshop-Suche einen **Und**- oder einen **Oder**-Suchoperator verwendet.

### Geändert 

- Die Summen im Warenkorb und auf der Auftragsbestätigung zeigen nun Zusatzkosten an. Die Darstellung von Zusatzkosten kann in den Einstellungen des Summen-Widgets aktiviert werden.

### Behoben

- Das Sticky Container-Widget wurde unter gewissen Umständen beim Scrollen direkt wieder auf seine ursprüngliche Position zurückgesetzt, was zu einer zitternden Darstellung geführt hat. Dies wurde behoben.
- Bilder, die über ein Datenfeld innerhalb eines Text-Widgets ausgegeben werden, haben jetzt eine maximale Breite.

## v5.0.17 (2020-12-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.16...5.0.17" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Artikellisten, die über die Plugin-Einstellungen konfiguriert und über Layout-Container in die Seite eingebunden sind, sind jetzt auf maximal 50 Artikel beschränkt.

### Behoben

- Wenn beim Hochladen eines Bildes als Bestelleigenschaft die maximale Dateigröße überschritten wurde, wurde keine Fehlermeldung ausgeben. Dies wurde behoben. Der Text dieser Fehlermeldung kann in der Mehrsprachigkeitsoberfläche unter dem Eintrag **errorPostTooLarge** angepasst werden.
- Im Hintergrundbild-Widget wird jetzt der Alternativtext eines Bildes genutzt, wenn das Bild aus dem Webspace geladen wird.
- Über den Übersetzungsschlüssel **basketRebateSign** kann jetzt ein Vorzeichen vor den Rabattwert in der Warenkorbvorschau platziert werden.
- Im Navigationsbaum-Widget wurden benutzerdefinierte Einträge nicht richtig kodiert, wenn diese Umlaute enthielten. Das Verhalten wurde behoben.
- Im Kontaktformular wurde das Feld für Blindkopien nicht gesetzt. Dies wurde behoben.
- Die fehlenden Übersetzungen der Lightbox wurden hinzugefügt.
- Der Ceres-Assistent leitet nun in das Plugin-Set und nicht mehr in den Einrichtungsassistenten, wenn eine Zahlungsart bereits installiert, aber noch inaktiv ist.
- Artikellisten laufen nicht mehr über die Begrenzung der Seite hinaus.

## v5.0.16 (2020-12-01) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.15...5.0.16" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Um bei Live-Shopping-Angeboten auf der Artikelansicht einen Text vor dem Streichpreis anzuzeigen, muss der Übersetzungsschlüssel **crossPriceSpecialOffer** in der Mehrsprachigkeitsoberfläche entsprechend ausgefüllt werden.

### Hinzugefügt

- Das Newsletter-Widget verwendet jetzt Google reCAPTCHA.

### Behoben

- Wenn mehrere personalisierbare Gutscheine im Warenkorb lagen, konnte nur einer dieser Gutscheine bearbeitet werden. Dies wurde behoben.
- Im Breadbrumb-Widget wurde für das Startseiten-Symbol kein Link-Text erkannt. In der Mehrsprachigkeitsoberfläche kann nun ein Link-Text über den Übersetzungsschlüssel **headerBreadcrumbHome** hinterlegt werden.
- Bei Live-Shopping-Angeboten wird nun auf der Artikelansicht der normale Verkaufspreis als der Streichpreis dargestellt.
- Auf der Bestellbestätigung konnte es zu Rundungsfehlern kommen. Dieses Verhalten wurde behoben.
- Änderungen an der Höhe des Sticky-Container-Widgets wurden nur beim Ändern der Fenstergröße und beim Scrollen aktualisiert. Dieses Verhalten wurde behoben.
- Unter bestimmten Umständen wurden Icons nicht angezeigt. Dies wurde behoben.
- Die Twig-Funktion `queryString` formatiert Query-Parameter jetzt nach dem Standard RFC 3986.
- Durch einen Fehler wurde nicht immer die korrekte URL auf dem Bild des Live-Shopping-Widgets hinterlegt. Dies wurde behoben.
- Durch einen Fehler wurde beim Aktualisieren der URL-Parameter nicht immer die aktuelle URL gesetzt. Dies wurde behoben.
- Der CSRF-Token wurde in manchen Kombination mit Drittanbieter-Plugins nicht korrekt gesendet. Dies wurde behoben.
- Es wurde eine eigene Gruppe für Zahlungsanbieter-Cookies in der Cookie Bar ergänzt.
- Die Übersicht der Konfigurationen des Assistenten zeigt nun auch die Einträge für inaktive Plugin-Sets an.
- In einem mehrsprachigen Webshop wurden Gast-Accounts auf die Startseite der Standardsprache weitergeleitet, wenn sie zum Checkout navigierten, ohne dass sich Artikel im Warenkorb befanden. Nun werden Gast-Accounts auf die Startseite der ausgewählten Sprache weitergeleitet.
- Die Einstellung **CSS-Klasse** des Widgets Datenschutzerklärungs-Checkbox hatte keine Funktion. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.16 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/js/src/app/components/myAccount/EditCouponOverlay.vue](https://github.com/plentymarkets/plugin-ceres/pull/2537/files#diff-3385c5d0e4771710be00b0a70811ac5b8018e23b7da889cb9923959dbb8a9a29)
- [resources/views/Widgets/Header/BreadcrumbWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2528/files#diff-130e6f2327939a6da964755351a1ae84298251d3c24de27e53214e91775dca4e)
- [resources/js/src/app/components/item/ItemPrice.vue](https://github.com/plentymarkets/plugin-ceres/pull/2533/files#diff-eed3a26bc24bb9bbfd91d04e54f17d682022d8a9b1918fe760fe93d366beed22)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2521/files#diff-49e9a28ec33181e8fd3720d39345363b8b0614f2bf29ceb66b403ef22c18bd4d)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2521/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)
- [resources/views/Widgets/Form/AcceptPrivacyPolicyWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2548/files#diff-accd1ccbc275c3ac061bf4ac777378fe335097303db30e1d9594c514d7c143b4)

## v5.0.15 (2020-11-09) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.14...5.0.15" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Die Inhalte in der Variantenauswahl werden nun sortiert dargestellt.

### Behoben

- Die Performanz des Scrollens von Widgets im Header wurde verbessert.
- Wenn im **Weitere Informationen**-Widget die Option **Mittel** oder **Groß** für die Einstellung **Größe** gewählt wurde, konnte das dazugehörige Overlay des Widgets nicht mehr geschlossen werden. Dies wurde behoben.
- Durch einen Fehler wurde auf Artikelkategorieseiten in seltenen Fällen der Standard-Header anstatt des Shopbuilder-Headers ausgegeben. Dies wurde behoben.
- In der Variantenauswahl werden Attribute von nicht verfügbaren Varianten nun analog zu Attributen von nicht existierenden Kombinationen ausgegraut und durchgestrichen dargestellt.
- Die Empfohlen-Sortierung für die Suchergebnisseite hat als dritte Priorität einen falschen Wert genutzt. Dieses Verhalten wurde behoben.
- Artikelnamen auf der Bestellbestätigung wurden auf maximal zwei Zeilen begrenzt. Dadurch wurden lange Artikelnamen abgeschnitten dargestellt. Dies wurde behoben.
- Durch einen Fehler wurden die Bestellmengen beim Variantenwechsel nicht korrekt aktualisiert. Dies wurde behoben.
- Prozentuale Aufpreise von Bestellmerkmalen haben Staffelpreise nicht korrekt berücksichtigt. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.15 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/js/src/app/components/item/VariationSelect.vue](https://github.com/plentymarkets/plugin-ceres/pull/2432/files#diff-3bf7e50898b2d79d717300fe7c276487aea49cb917f014bf3f8ea27c6b392149)

## v5.0.14 (2020-10-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.13...5.0.14" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### ToDo

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.
- Benutzer, die das Text-Widget angepasst haben (beispielsweise durch eigenes CSS), sollten die Darstellung von Text-Widgets hinsichtlich der Abstände überprüfen.

### Geändert

- Es wurde überflüssiges JavaScript für die Bildersortierung aus den Komponenten `CategoryImageCarousel.vue` und `ItemImageCarousel.vue` entfernt.
- Die Währung KES (Kenia-Schilling) wurde für die verfügbaren Währungen ergänzt.
- Zusätzliche Sortierungen aus externen Plugins werden nun im Sortierungs-Widget angezeigt.
- Bei Klick auf die "Kaufen"-Schaltfläche im Checkout werden die Eingaben des Nutzers nun sofort geprüft, bevor der Client mit dem Server interagiert.

### Behoben

- Die Darstellung von Währungen als Währungssymbol wurde an einigen Stellen nicht berücksichtigt. Dies wurde behoben.
- Icons für Zahlungsarten und Versandarten wurden im Safari-Browser verzerrt dargestellt. Dies wurde behoben.
- In der Kategorieansicht wurde das Meta-Tag `og:image` nicht korrekt befüllt. Dieses Verhalten wurde behoben.
- Es kam zu einer falschen Darstellung der Summen, wenn sich ein inaktiver Artikel im Warenkorb befand. Dieses Verhalten wurde behoben.
- Durch einen Fehler wurden bei verschiedenen Sortierungen im Live-Shopping-Widget immer die selben Daten angezeigt. Dies wurde behoben.
- In der ShopBuilder-Vorlage für die Artikelansicht wurde für den mehrsprachigen Eintrag "Technische Daten" der Schlüssel `Ceres::Widget.dataFieldTextsTechnicalData` anstatt `Ceres::Template.singleItemTechnicalData` genutzt. Dies wurde behoben.
- Die einstellbaren Außenabstände des Text-Widgets wurden auf den inneren Container des Widgets angewendet. Hierdurch verhielten sich Außen- und Innenabstände identisch. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.14 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/views/Widgets/Category/ItemSortingWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2418/files#diff-457d3c37f4e91ce7e9b896280e97de47)
- [src/Widgets/Category/ItemSortingWidget.php](https://github.com/plentymarkets/plugin-ceres/pull/2418/files#diff-b29141ef191aa2121e0995f64cf05edc)
- [resources/views/Widgets/Common/InlineTextWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2445/files#diff-e7dc3611e423358f168f99f3a60b6bfa3d2af686cfee952aca2e93ca91a3be62)

## v5.0.13 (2020-09-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.12...5.0.13" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Dem Breadcrumb-Widget wurde die Einstellung **Auf rechtlichen Seiten anzeigen** hinzugefügt. Diese Einstellung betrifft nur rechtliche Seiten, die im Shopbuilder erstellt wurden.
- Die Daten für die Breadcrumbs werden nun immer geladen, wenn man sich auf einer mit dem ShopBuilder verknüften Artikel- oder Content-Kategorieseite befindet. Dadurch kann das Breadcrumb-Widget immer den Pfad zur aktuellen Kategorie anzeigen.
- Die Performance für Webshops, die eine externe Suche einsetzen, wurde verbessert.
- Im Widget Artikeldaten-Tabelle wurde eine ungenutzte Einstellung entfernt.

### Behoben

- In der Mehrsprachigkeitsoberfläche war das Feld `addressFieldName1` doppelt vorhanden. Dies wurde behoben. Wir bedanken uns bei @Lauflust für den Beitrag.
- Das Sticky Container-Widget wurde unter bestimmten Umständen beim Scrollen direkt wieder auf seine ursprüngliche Position zurückgesetzt, was zu einer zitternden Darstellung führte. Dieses Verhalten wurde behoben.
- Das Eingabefeld im Gastbestellungs-Widget wurde nicht automatisch fokussiert. Dies wurde behoben.
- Es kam zu Fehlern in der `normalizeUrl` Funktion, wenn die Option **Slash am Ende von URLs** inaktiv war, die Seite aber mit einem Slash am Ende der URL aufgerufen wurde. Dieses Verhalten wurde behoben.
- Beim Laden weiterer Kategorien in der Step-By-Step-Navigation wurde keine Ladeanimation angezeigt. Dies wurde behoben.
- Im Navigationsbaum wird jetzt auf die Existenz untergeordneter Kategorien geprüft, auch wenn die nächste Ebene des Kategoriebaums nicht mehr geladen wurde.
- Unter bestimmten Umständen kam es zu Fehlern, wenn kein API-Schlüssel für Google reCAPTCHA hinterlegt war. Dies wurde behoben.
- In der Kategorieansicht wurde das Meta-Tag `og:image` nicht korrekt befüllt. Dieses Verhalten wurde behoben.
- In einem Standard-Mein-Konto-Bereich war es möglich, Retouren anzulegen, obwohl die dazugehörige Einstellung in der Ceres-Konfiguration inaktiv war. Diese Einstellung wird nun wieder korrekt berücksichtigt.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.13 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/scss/ceres/components/_sticky-element.scss](https://github.com/plentymarkets/plugin-ceres/pull/2378/files#diff-5e661ae82cc538fe6612799243d943ad)
- [resources/js/src/app/components/category/StepByStepNavigation.vue](https://github.com/plentymarkets/plugin-ceres/pull/2374/files#diff-50c90a6655c0e7cbcf03de0a7b2c1e66)
- [resources/views/Widgets/Navigation/StepByStepNavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2374/files#diff-d3ea59b4c6ebb4395ce978e00fc64e0b)
- [resources/views/Widgets/Item/ItemDataTableWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2380/files#diff-be40dbd506648d6e32e18e5b8c819461)
- [resources/views/Category/Macros/CategoryTree.twig](https://github.com/plentymarkets/plugin-ceres/pull/2356/files#diff-09d849cf28f22de603fc51c7165ab279)
- [resources/views/ResultFields/CategoryTree.fields.json](https://github.com/plentymarkets/plugin-ceres/pull/2356/files#diff-aadbcb4d0f3fe3e283b2f032903fb518)

## v5.0.12 (2020-09-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.11...5.0.12" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Die Auswahl des Inhalts hat nun in der Variantenauswahl eine geringere Gewichtung, um sicherzustellen, dass die Attributauswahl nicht mehr durch den Inhalt blockiert werden kann.

### Behoben

- Unter bestimmten Umständen wurde bei Aufträgen mit Fremdwährung in der Auftragshistorie nicht die korrekte Währung angezeigt. Das Verhalten wurde behoben.
- Beim Anlegen eines Auftrags wurde der Kundenwunsch nicht korrekt weitergereicht, wenn die PayPal-Zahlung abgebrochen wurde. Dieses Verhalten wurde behoben.
- Ab sofort wird ein entsprechender Hinweis eingeblendet, nachdem ein ungültiger Gutschein aus dem Warenkorb entfernt wurde.
- Unter bestimmten Umständen wurden SingleItem-Templates nicht richtig erkannt, was zu Darstellungsfehlern führen konne. Dies wurde behoben.
- Die Vorauswahl der Anrede in der Adresseingabe war teilweise fehlerhaft. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.12 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/js/src/app/components/checkout/ContactWishInput.js](https://github.com/plentymarkets/plugin-ceres/pull/2365/files#diff-37b747947d823f75ad5cb175e3859af1)
- [resources/js/src/app/store/modules/CheckoutModule.js](https://github.com/plentymarkets/plugin-ceres/pull/2365/files#diff-02fceefaae66ccd08f2719a2a46c5a8d)
- [resources/views/Checkout/Components/ContactWishInput.twig](https://github.com/plentymarkets/plugin-ceres/pull/2365/files#diff-2e1a9880a29ff28bfdedc4293681a690)
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/2368/files#diff-63ac11bb178e21fa2fb744ce21e2cf5f)
- [resources/views/PageDesign/Partials/Header/Header.twig](https://github.com/plentymarkets/plugin-ceres/pull/2368/files#diff-3184d75e16637b83c7f23fae7d39854d)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2368/files#diff-15057fa07b52305012c24a8812db234e)

## v5.0.11 (2020-09-01) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.10...5.0.11" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Die ShopBuilder-Vorlage für Artikelsets enthält nun die Hinweistexte zur Mehrwertsteuer und zu den Versandkosten.

## v5.0.10 (2020-08-27) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.9...5.0.10" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- Auf der Startseite wurde durch einen Fehler immer der Wert "NOINDEX, NOFOLLOW" für das Meta-Attribut "robots" ausgegeben. Dies wurde behoben.

## v5.0.9 (2020-08-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...5.0.9" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO
- Die Einstellungen der Kategorie Startseite für die Meta-Beschreibung und -Keywords werden jetzt berücksichtigt und müssen ggf. aus dem Bereich **CMS » Mehrsprachigkeit** übernommen werden.
- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.
- Wenn der Platzhalter für die Zolltarifnummer auf der Artikelansicht im ShopBuilder verwendet wird, muss dieser einmal entfernt und erneut eingefügt werden.

### Geändert

- Die Komponente für die Einstellungen in der Cookiebar zur Privatsphäre wird nun nachträglich geladen.
- Widgets innerhalb der aufklappbaren Dropzone des Filter-Toolbar-Widgets können sich jetzt automatisch verteilen lassen.
- Der Meta-Titel für die Artikelansicht kann jetzt mit einer neuen Einstellung im Ceres-Assistenten auf einen der 3 Artikelnamen festgelegt werden. Diese Einstellung steuert auch, welcher der Artikelnamen beim Generieren der Artikel-URL verwendet wird.

### Behoben

- Bei der Tag-Suche wurden die Filter nicht angezeigt. Zudem hat die Sortierung nicht korrekt funktioniert. Dies wurde behoben.
- Die Meta-Beschreibung und -Keywords der Startseite werden jetzt aus den Kategorie-Einstellungen verwendet, wenn eine Kategorie im Shop-Builder als Startseite verknüpft ist.
- Bei dem Widget **Artikelbild** wurde der Pfad nicht zur Laufzeit geladen. Dies wurde behoben. 
- Die Daten eines Benutzers waren nicht verfügbar, wenn kein Top Bar-Widget verwendet wurde oder die Einstellung **Kunden-Login anzeigen** nicht aktiv war. Dies wurde behoben.
- Das Widget **Step-by-Step-Navigation** kann jetzt fehlerfrei auf der Kategorie für die Startseite verwendet werden.
- Im Widget **Auftragsdaten** wurde trotz gesetzter Einstellung am Widget die Kundennummer nicht ausgegeben. Dies wurde behoben.
- Die Zolltarifnummer wurde im Widget **Tabellendaten** und als Platzhalter in Text-Widgets nicht korrekt angezeigt. Das Verhalten wurde behoben.
- Wenn auf der Kategorieseite kein Sortierungs-Widget hinterlegt war, wurde beim Wechsel der Anzahl der Artikel die Sortierung auf **Name A-Z** gesetzt. Das Verhalten wurde behoben.
- Auf der Artikelseite wurde bei **Bitte wählen** auch die Übersetzung für **Ab Preis** verwendet, auch wenn nicht die billigste Variante angezeigt wurde. Das Verhalten wurde behoben.
- Durch einen Fehler wurde auf der Kontaktseite und bei der Registrierung Google reCAPTCHA v2 nicht richtig zurückgesetzt. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.9 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/js/src/app/components/item/SingleItem.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-f4088e12496aa3b97ca8c8f2e6a1305c)
- [resources/js/src/app/components/pageDesign/CookieBar.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-1160de3ac277adf2c7bf4aaa280eaf1a)
- [resources/views/Homepage/Homepage.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-3411adc67bf663071159e94df552304d)
- [resources/views/Item/SingleItemWrapper.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-1cafcbdef6141f616d753d275daa9fa7)
- [resources/views/Widgets/Category/ToolbarWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-b0944a30c51905fae124c198cd99d045)
- [resources/views/Widgets/Item/ItemImageWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-8cf79fbacbbb5d468da56a6c071c7b24)
- [resources/views/Widgets/OrderConfirmation/OrderDataWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-fce7fd292bcaa8f8d9b62bd5d19557c7)

## v5.0.8 (2020-08-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...5.0.8" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.

### Hinzugefügt

- Die Einstellungen für Außenabstände wurden zum Weitere Details-Widget hinzugefügt.

### Geändert

- Der Layout-Container `Checkout` für das Überschreiben des Checkouts kann nun auch für ShopBuilder-Inhalte genutzt werden.
- Die Änderung zur **Mindesthöhe** von Hintergrundbild-Widgets, die in Version 5.0.7 enthalten war, wurde rückgängig gemacht, da sie zu Fehlern im Layout des Webshops führen konnte.

### Behoben

- Bei der Einbindung des Datenfelds **Altersfreigabe** über den ShopBuilder wurde ein falscher Wert für den Eintrag **Altersfreigabe 18** ausgegeben. Dieses Verhalten wurde behoben.
- Das Widget Step-By-Step-Navigation rendert nun keine Platzhalter mehr, wenn keine Kinderelemente vorhanden sind.
- Bei der Option **Dropdown-Liste** im Auswahlfeld-Widget fand keine Validierung des ausgewählten Werts statt. Dies wurde behoben.
- Die Adresse für das Google Maps-Widget wird jetzt clientseitig codiert, sodass der Google API-Schlüssel bei der Generierung auf die Webshop-Domain beschränkt werden kann.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.8 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
-[resources/views/Checkout/CheckoutCategory.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-500f84701cb3bec84b3253ca4fc12310)
- [resources/views/Widgets/Common/GoogleMapsWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-34a9c4fdd67b5eafe0fe676146a2d341)
- [resources/views/Widgets/Grid/AdditionalInformationWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-ce1d0ae261c2326eb512546452d84cce)
- [resources/views/Widgets/Helper/WidgetHelper.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-fe76ce66af52961ed5cbcd984b98681e)
- [resources/views/Widgets/Navigation/StepByStepNavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-d3ea59b4c6ebb4395ce978e00fc64e0b)

## v5.0.7 (2020-07-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.6...5.0.7" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.
- Aufgrund von Änderungen am Hintergrundbild-Widget kann es zu Verschiebungen im Layout des Webshops kommen. Prüfe dein Layout und setze gegebenenfalls die Einstellung **Mindesthöhe** in verwendeten Hintergrundbild-Widgets auf die Option **Ohne**.

### Geändert

- Sehr lange Links konnten das Layout des Webshops beeinflussen. Diese brechen jetzt standardmäßig um.
- Die Media-Breakpoints für die CSS-Klasse `.alert` gelten nun nur noch für die Eltern-Klasse `.notification-wrapper`, da sie das Layout des Webshops beeinflussen konnten.
- Das Widget Step-By-Step-Navigation zeigt nun zur besseren Lesbarkeit auf mobilen Geräten standardmäßig maximal 2 Kategorien an.
- Die Option **Auto** für die Einstellung **Mindesthöhe** im Hintergrundbild-Widget wurde überarbeitet. Wenn dieses Widget in ein Raster-Widget eingebettet ist, sorgt die Option **Auto** dafür, dass das Hintergrundbild-Widget auf die Höhe des höchsten Widgets im gleichen Raster skaliert.

### Behoben

- Durch einen Fehler wurde der ShopBuilder-Header unter bestimmten Umständen nicht korrekt ausgegeben. Dies wurde behoben.
- Die "Nach oben"-Schaltfläche wurde angezeigt, selbst wenn sich der Nutzer am oberen Ende der Seite befand. Dies wurde behoben.
- Das "Passwort vergessen"-Modal wurde erst beim zweiten Aufruf angezeigt, wenn sich der Nutzer auf der Login-Route befand. Dies wurde behoben.
- Beim Login-Widget konnte es im Zusammenhang mit dem `layoutContainer`-Makro zu einem Fehler kommen. Dies wurde behoben.
- Das Hintergrundbild-Widget konnte unter bestimmten Umständen von eigenem CSS überdeckt werden. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.7 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/views/PageDesign/Partials/Footer.twig](https://github.com/plentymarkets/plugin-ceres/pull/2323/files#diff-47994aea903bc5cda6db336417059b47)
- [resources/views/PageDesign/Partials/PageMetadata.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.6...stable#diff-2043824c28b2ea46b69dc85c42439175)
- [resources/views/Widgets/Login/LoginWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.6...stable#diff-03fa829aa8eb859e9c0be49e489497d5)
- [resources/views/Widgets/Navigation/StepByStepNavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.6...stable#diff-d3ea59b4c6ebb4395ce978e00fc64e0b)

## v5.0.6 (2020-07-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.5...5.0.6" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Wenn fehlerhafter Code im FAQ-Widget hinterlegt wurde, konnten das FAQ-Widget und ggf. nachfolgende Widgets nicht mehr bearbeitet werden. In diesem Fall kann jetzt der abgesicherte Modus genutzt werden, um den Code zu korrigieren.
- Die Event-Listener für Scrollen wurden beim Sticky Container-Widget auf passiv gesetzt, wodurch die clientseitige Performance verbessert wurde.
- Die Zeit bis eine Anfrage für Suchvorschläge gesendet wird wurde von 500 Millisekunden auf 200 Millisekunden gesenkt, um die Suche reaktionsschneller zu machen.
- Im Ceres-Assistenten wurden die beiden Schalter "Möchtest du Google reCAPTCHA verwenden?" und "Ich möchte, dass sich die Sprache im Webshop der Browsersprache anpasst." entfernt, da diese lediglich weitere Einstellungen im Assistenten sichtbar schalteten. Die betreffenden Einstellungen sind nun automatisch sichtbar.

### Behoben

- Die dynamische Berechnung eines Set-Preises wurde unter bestimmten Umständen inkorrekt ausgeführt. Dies wurde behoben.
- Im Top Bar-Widget funktionierte die Einstellung **Kunden-Registrierung anzeigen** nicht, wenn die Einstellung **Kunden-Login anzeigen** nicht ebenfalls aktiv war. Dies wurde behoben.
- Im Artikellisten-Widget hatte die Option **Keine Überschrift** für die Einstellung **Art der Überschrift** keine Auswirkung. Dies wurde behoben.
- Im Safari-Browser konnten die Warenkorb- und Kasse-Schaltflächen in der Warenkorbvorschau abgeschnitten werden. Dies wurde behoben.
- Das im Bilderkarussell verwendete Owl Carousel hat einen bekannten Darstellungsfehler, der dazu führt, dass ein weiße Linie auf der linken Seite der Bilder sichtbar sein kann. Dies wurde in Ceres behoben.
- Bei Ausfuhrlieferungen wurden auf der Bestellbestätigung unterschiedliche Versandkosten für Brutto- und Nettosummen angezeigt. Dies wurde behoben.
- In dem Widget Artikeldaten-Tabelle wurde der Eintrag **Ohne Altersbeschränkung** nicht ausgegeben. Dies wurde behoben.
- Für Aufträge, die per Vorkasse abgeschlossen wurden und für die der Auftragstyp **Vorbestellung** eingestellt war, wurden keine Bankdaten in der Bestellbestätigung angezeigt. Dies wurde behoben.
- Das HTML-Markup im Textfeld für Varianteneigenschaften wurde in der Bestellbestätigung nicht korrekt ausgegeben. Dies wurde behoben.
- Der Layout-Container `LoginOverlay.ExtendOverlayButtons` funktionierte im Login-Widget nicht wie beabsichtigt. Dies wurde behoben.
- Der Tooltip-Popper auf der Registrierungsseite, der über das Informations-Icon geöffnet werden kann, wurde in der mobilen Ansicht außerhalb des sichtbaren Bereichs dargestellt. Dies wurde behoben.
- Deaktivierte Länder in der Lieferlandauswahl im Top Bar-Widget wurden nicht als inaktiv dargestellt. Dies wurde behoben.
- Wenn die Toolbar für ausgewählte Filter nach dem Neuladen automatisch geöffnet wurde, wurden beim manuellen Schließen und erneutem Öffnen die jQuery-Klassen `class="collapsed"` und `aria-espanded="true"` nicht richtig umgeschaltet. Dies wurde behoben.
- Im Ceres-Assistenten konnten Optionen, die per Checkbox-Gruppe auswählbar sind, nicht leer gespeichert werden. Das wurde behoben.
- Das Label-Tag der Facetten aus der Komponente `ItemFilter.vue` wurden um eine CSS-Klasse erweitert, die sich aus dem String "option-" und der ID der Facette zusammensetzt. Dies stellt erweiterte Styling-Möglichkeiten wieder her, die durch eine frühere Version entfernt wurden.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.6 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/js/src/app/components/customer/login/UserLoginHandler.vue](https://github.com/plentymarkets/plugin-ceres/pull/2288/files#diff-2ebcb5967c7916456a856707903d3e9e)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2288/files#diff-f16a56b62b13bd773d56c1b4d739dfe4)
- [resources/views/Checkout/Macros/OrderTotals.twig](https://github.com/plentymarkets/plugin-ceres/pull/2293/files#diff-b38340ae49c1aec8f7f5c17e150d35f8)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2289/files#diff-b71a6feed738cf93712cc1a55102b6d6)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2298/files#diff-b71a6feed738cf93712cc1a55102b6d6)
- [resources/views/Widgets/OrderConfirmation/OrderDataWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2289/files#diff-fce7fd292bcaa8f8d9b62bd5d19557c7)
- [resources/views/Widgets/Login/LoginWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2302/files#diff-03fa829aa8eb859e9c0be49e489497d5)
- [resources/views/Widgets/Common/CollapseWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2303/files#diff-7e8dd5f9ec03fca667d172a097ecd5e4)
- [resources/js/src/app/components/pageDesign/ShippingCountrySelect.vue](https://github.com/plentymarkets/plugin-ceres/pull/2306/files#diff-1b041b3611e8e3f27f418054f87356c2)


## v5.0.5 (2020-06-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.4...5.0.5" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Die nicht mehr benötigten und veralteten Buildfiles **ceres.js.map**, **ceres.min.js** und **ceres.min.js.map** wurden entfernt.
- Bei der Darstellung von Attributen als Bild kann jetzt ein zusätzlicher Tooltip dargestellt werden. Dazu kann in der Mehrsprachigkeits-Oberfläche unter **Ceres » Artikelansicht » singleItemAttributeTooltip** der Text des Tooltips hinterlegt werden. Hier stehen die Variablen **:attribute** und **:value** zur Verfügung, um den Namen des jeweiligen Attributs bzw. der einzelnen Werte anzuzeigen.

### Behoben

- Die Schriftartdateien von FontAwesome wurden aktualisiert.
- Bei über 500 Varianten werden die nachträglich geladenen Varianten bei der Berechnung der verfügbaren Kombinationen nun korrekt berücksichtigt.
- Bestellmerkmale im Warenkorb und in der Warenkorbvorschau werden jetzt vollständig angezeigt.
- Für einige Sprachen konnte in der Sprachauswahl nicht die korrekte URL ermittelt werden. Dies wurde behoben.
- Durch einen Fehler in der PrivacySettings-Komponente wurden die Toggle-Schaltflächen für Cookies immer als deaktiviert dargestellt. Dies wurde behoben.
- Lange Kategorienamen in der Überschrift des Artikellisten-Widgets konnten den Seiteninhalt auf kleineren Display-Größen verschieben und dadurch Darstellungsfehler verursachen. Dies wurde behoben.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.5 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/js/src/app/components/basket/AddItemToBasketOverlay.vue](https://github.com/plentymarkets/plugin-ceres/pull/2276/files#diff-70d685498d2b1326481b12a924516e4d)
- [resources/js/src/app/components/basket/list/BasketListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/2276/files#diff-c2e68222922bdd120e1bb3e918794353)
- [resources/js/src/app/components/basket/list/SetComponentItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/2276/files#diff-dac784083959e603cf52f3496e646b6c)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2279/files#diff-f16a56b62b13bd773d56c1b4d739dfe4)
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2279/files#diff-19096cb359da1fa955ee575070b6a121)

## v5.0.4 (2020-06-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.3...5.0.4" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Behoben

- In den Sprachen Französisch und Niederländisch kam es zu einer fehlerhaften Ausgabe des Datumsformats. Dieses Verhalten wurde behoben.
- Die URL in den strukturierten Daten wurde fehlerhaft enkodiert. Dies wurde behoben.
- Durch eine fehlerhafte CSS-Anpassung wurde die PayPal-Wall nicht angezeigt. Dies wurde behoben.

## v5.0.3 (2020-06-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Die Einstellung **Vorausgewählte Anrede** wurde dem Registrierungs-Widget hinzugefügt.
- Die Performance des ShopBuilders wurde für eine größere Anzahl an Eigenschaften optimiert.
- Auf dem umschließenden Element der Artikeleinheit auf der Artikeleinzelansicht wird nun die CSS-Klasse `.is-single-piece` verwendet, wenn es sich um die Einheit "1 Stück" handelt.

### Behoben

- Die Lebensdauer des Consent-Cookies wird jetzt entsprechend der Systemeinstellung angegeben.
- Wenn Widgets mit aufklappbaren Elementen, wie z.B. das Toolbar-Widget, im Hintergrundbild-Widget platziert wurden, konnte es dazu kommen, dass die aufklappbaren Elemente nicht vollständig angezeigt wurden. Dies wurde behoben.
- Durch einen Fehler wurden Suchvorschläge in der Desktop-Ansicht zu früh geschlossen, sodass der angeklickte Suchvorschlag nicht geöffnet wurde. Dies wurde behoben.
- Bei der Lightbox fehlten Navigationspfeile und die Schließen-Schaltfläche. Diese wurden hinzugefügt.
- Bilder, die im Bilderbox- und Bilderkarussel-Widget als Fallback hinterlegt wurden, wurden immer geladen. Dieses Verhalten wurde behoben.
- Das Hintergrundbild-Widget konnte von HTML-Elementen mit angepasster Hintergrundfarbe überlagert werden. Dies wurde behoben.
- Im Firefox Browser war es nicht möglich, Zeilenumbrüche oder mehrere aufeinander folgende Leerzeichen in Freitextfeldern zu verwenden. Dies wurde behoben. Vielen Dank an @daniel-mannheimer für diesen Beitrag.
- Das Sticky Container-Widget überlagerte den ausklappbaren Bereich des Toolbar-Widgets. Dies wurde behoben.
- Bei externen Suchanbietern kam es unter gewissen Umständen zu einer fehlerhaften Darstellung der Suchergebnisseite, wenn ein Artikel nicht mehr sichtbar war. Dieses Verhalten wurde behoben.
- Im Mein-Konto-Bereich wurde die Verlinkung auf die Bestellbestätigungsseite falsch gesetzt, wenn die Bestellbestätigungsseite nicht über den ShopBuilder erstellt wurde. Dies wurde behoben.
- Die Mehrsprachigkeitseinträge **myAccountChangeEmailInfoText**, **myAccountRepeatEmail** und **myAccountRepeatPassword** wurden korrigiert.

### Angepasste Templates

- Im Zuge des Releases von Ceres 5.0.3 gab es Änderungen an den im Folgenden aufgelisteten Template-Dateien, die für Theme-Entwickler relevant sind. Die Verlinkungen führen direkt zu den umgesetzten Änderungen in den entsprechenden Dateien.
- [resources/js/src/app/components/common/LazyImg.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-14e714eb9949801b5edce557d611bd37)
- [resources/js/src/app/components/item/ItemPrice.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-f166cdc8c3dee1b7f98ecbe2460d8fcb)
- [resources/js/src/app/components/itemList/ItemSearch.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-11d254ed1e8752285c36e305f9e2f8b3)
- [resources/js/src/app/components/itemList/SearchSuggestionItem.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-522119f0fcf0c45d09b5f571158e678e)
- [resources/js/src/app/components/pageDesign/PrivacySettings.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-f587df95a339e7022c1f7d1493a6cdfe)
- [resources/views/MyAccount/Components/OrderHistoryListItem.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-8eae4ababd4bb1b589bc6b60b0e69262)
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-63ac11bb178e21fa2fb744ce21e2cf5f)
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-ea4ec8873ffd72f60669593c7bbcc48d)
- [resources/views/Widgets/Common/ImageBoxWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-010b99ceca9e67e975342d0ee3966a3b)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-d4896f7591c4817ccd9887e8b0c17a67)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-15057fa07b52305012c24a8812db234e)
- [resources/views/Widgets/Login/RegistrationWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-a6656b1994026a00e7ade5a7ab9457c0)

## v5.0.2 (2020-05-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.1...5.0.2" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### Geändert

- Der Getter `currentItemVariation` und die Variable `mainItemId` wurden zum BaseItemModule hinzugefügt, um den Datenzugriff zu vereinfachen.

### Behoben

- Im Safari-Browser wurden Bilder des Hintergrundbild-Widgets nicht geladen. Dies wurde behoben.
- Die Höhe von Widgets mit der Einstellung **Seitenverhältnis** wurde unter bestimmten Umständen falsch berechnet, wenn sie in einem Raster-Widget platziert wurden. Dieses Verhalten wurde behoben.
- Das Verwenden der internen Links **Retoure aufgeben** und **Sendungsverfolgung** im Link-Widget konnte dazu führen, dass kein Inhalt auf der Retourenseite angezeigt wurde. Dies wurde behoben.
- Bei Webshop-Sprachen, die nicht die Standardsprache waren, hat die Step-by-Step-Navigation nicht die Sprache in der URL gesetzt. Dies wurde behoben.
- Es kam zu JavaScript-Problemen beim Verwenden der neuen Layout-Container für Checkout und Artikelansicht. Dies wurde behoben.
- Beim Aufrufen einer über den ShopBuilder erstellten Seite zum Ändern der E-Mail-Adresse oder des Passworts wurde der Kunde nicht automatisch ausgeloggt, wodurch Eingabefelder nicht angezeigt wurden. Dies wurde behoben.
- Die Werte von Varianteneigenschaften wurden nicht in der Wunschliste angezeigt. Dies wurde behoben.
- Objekte innerhalb der Trennzeichen in Vue-Templates führten zu Fehlern beim Interpretieren der Templates. Dies wurde behoben.
- Durch einen Fehler wurden Suchvorschläge in der Desktop-Ansicht zu früh geschlossen, sodass angeklickte Suchvorschläge nicht geöffnet wurden. Dies wurde behoben.
- Durch einen Fehler wurde ein Warnhinweis auf der "Passwort ändern"-Seite nicht korrekt ausgegeben. Dies wurde behoben.

## v5.0.1 (2020-04-27) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.0...5.0.1" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.

### Hinzugefügt

- Die Einstellungen für Abstände wurden zum Widget Step-by-Step-Navigation hinzugefügt.

### Geändert

- Die Mengeneingabe auf der Artikeleinzelansicht wird nun deaktiviert, wenn der Artikel nicht verfügbar ist. Die Mengeneingabe ist ebenfalls so lange deaktiviert, bis notwendige Artikeldaten nachgeladen werden.
- Das JavaScript für das Owl Carousel ist nun wieder im gesamten Webshop verfügbar. 

### Behoben

- Durch einen Fehler wurden Artikellisten vom Typ **Zuletzt angesehen** nicht dargestellt. Dies wurde behoben.
- Bilderkarussells in Artikellisten wurden nicht korrekt angezeigt. Dies wurde behoben.
- Der Wert der SCSS-Variable `$yiq-contrasted-threshold` wurde auf 186 zurückgesetzt.
- Unter bestimmten Umständen waren Dialogfenster nicht bedienbar. Dies wurde behoben.
- Bei leeren Wunschlisten wurde die Ladeanimation durchgängig angezeigt. Dies wurde behoben.
- Es wurde ein fehlerhaftes Verhalten beim Variantenwechsel behoben. Wenn eine Variante gewechselt wird, für die bereits Bestellmerkmale ausgewählt wurden, werden diese Bestellmerkmale bei einem erneuten Wechsel zur ursprünglich gewählten Variante wieder automatisch ausgewählt. Dies gilt nicht für Bestellmerkmale des Typs **Datei**.
- Bei der Einbindung mehrerer Google Maps-Widgets auf einer Seite wurde nur das erste Google Maps-Widget korrekt geladen. Dieses Verhalten wurde behoben.
- Im Mein Konto-Bereich fehlten die Auswahlmöglichkeiten für das Versenden an Packstationen und Postfilialen. Dies wurde behoben.
- Auf der Auftragsbestätigungsseite wurden bei Aufträgen mit eingelösten Aktionsgutscheinen teilweise falsche Werte berechnet. Dieses Verhalten wurde behoben.
- Das Nachladen von Bildern funktionierte nicht im Internet Explorer 11. Dies wurde behoben.
- In den Daten für Schema.org wurde ein fehlendes Anführungszeichen für den Eintrag "URL" ergänzt.
- Durch fehlende Daten für die Schema.org Datenstruktur für Breadcrumbs kam es zu Fehlern bei SEO-Tools. Dies wurde behoben.
- Wenn das Top Bar-Widget an unterster Stelle im Header platziert wurde, wurde die Warenkorbvorschau unter bestimmten Bedingungen von anderen Widgets überlagert. Dieses Verhalten wurde behoben.
- Texte in der Step-by-Step-Navigation werden jetzt zentriert dargestellt.
- Durch einen Fehler wurde die Step-by-Step-Navigation nicht auf der Artikeleinzelansicht angezeigt. Dies wurde behoben.
- Ungültige Farbwerte in den Design-Einstellungen des ShopBuilders werden jetzt abgefangen und durch Standard-Farbwerte ersetzt.
- Auf Retourenseiten, die nicht mit dem ShopBuilder erstellt wurden, konnten nicht eingeloggte Benutzer keine Retouren anlegen. Dieses Verhalten wurde behoben.
- Im Retourenformular und in der Retourenhistorie wurden Namen von Bestellmerkmalen nicht korrekt angezeigt. Dieses Verhalten wurde behoben.
- Elemente, die über die beiden Layout-Container "BasketPreview.BeforeCheckoutButton" und "BasketPreview.AfterCheckoutButton" eingebunden wurden, wurden zu klein dargestellt. Dies wurde behoben.

## v5.0.0 (2020-04-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.6.0...5.0.0" target="_blank" rel="noopener"><b>Übersicht aller Änderungen</b></a>

### TODO

- Themes und Plugins, die mit älteren Ceres-Versionen kompatibel waren, müssen ggf. aktualisiert werden. Weitere Informationen zum Aktualisieren von Themes und Plugins findest du in der <a href="https://developers.plentymarkets.com/dev-doc/ceres-5" target="_blank" rel="noopener"><b>Entwicklerdokumentation</b></a>.
- Aufgrund von Änderungen an bestehenden Widgets müssen die ShopBuilder-Inhalte im Menü **CMS » ShopBuilder** über die Schaltfläche **Inhalte neu generieren** aktualisiert werden.
- Nutzer, die bisher die Kategorie **Startseite (veraltet) (Ceres)** im ShopBuilder verwendet haben, müssen eine neue Startseiten-Kategorie anlegen und verknüpfen. Vor dem Update auf Version 5.0 sollte eine Plugin-Set-Kopie gemacht werden, sodass Inhalte der Kategorie **Startseite (veraltet) (Ceres)** später aus dieser Plugin-Set-Kopie in die neu erstellte Startseiten-Kategorie des Ceres 5 Plugin-Sets dupliziert werden können. Andernfalls ist es nicht möglich, auf die bestehenden Startseiten-Inhalte zuzugreifen, ohne die Ceres-Version herabzusetzen.
- Um die "Meinten Sie...?"-Suche nutzen zu können, sollten Nutzer einen neuen Inhalt für Suchergebnisse mithilfe der **Suchergebnisse-Vorlage** des ShopBuilders erstellen und verknüpfen.
- In den Inhalten **Warenkorb**, **Checkout**, **Kontaktseite**, **Mein Konto**, **Bestellbestätigung**, **Retourenseite** und **Wunschliste** wurde der weiße Standard-Hintergrund entfernt. Für diese Inhalte sollten Nutzer jeweils ein weißes Hintergrundbild-Widget hinzufügen, um den vorherigen Stand abzubilden.

### Hinzugefügt

- Diese Version unterstützt <a href="https://knowledge.plentymarkets.com/de-de/manual/main/artikel/multipacks-pakete-sets-verwalten.html#3000" target="_blank">Sets</a>. Das Widget **Bestandteile für Artikelsets** wurde zum ShopBuilder hinzugefügt. Dieses Widget dient dazu, Artikelset-Seiten über den ShopBuilder zu bearbeiten. Die Funktion wird als Beta-Version bereitgestellt.
- Diese Version unterstützt <a href="https://knowledge.plentymarkets.com/de-de/manual/main/auftraege/gutscheine.html" target="_blank">Mehrzweckgutscheine</a>. Mehrzweckgutscheine können auf der Bestellbestätigungsseite personalisiert und als PDF-Datei heruntergeladen werden.
- Die drei Widgets **Suchvorschläge**, **Suchergebnisse: Kategorien** und **Suchergebnisse: Artikel** wurden zum ShopBuilder hinzugefügt. Diese können im Suchbereich des Top Bar-Widgets im Header platziert werden.
- Die Schaltfläche für die Suche im Top Bar-Widget kann nun im ShopBuilder geklickt werden, um einen Bereich auszuklappen, in welchem Widgets platziert werden können.
- Bei falsch geschriebenen Suchbegriffen wird nun eine zusätzliche Suche ausgeführt. Auf der Suchergebnisseite wird nun ein alternativer Suchbegriff unter "Meinten Sie...?" vorgeschlagen.
- Die beiden Template-Container `SingleItem.AfterScriptsLoaded` und `SingleItem.Styles` wurden hinzugefügt. Diese können dafür genutzt werden, um Skripte und Stylesheets nur auf der Artikelansicht einzubinden.
- Die beiden Template-Container `Checkout.AfterScriptsLoaded` und `Checkout.Styles` wurden hinzugefügt. Diese können dafür genutzt werden, um Skripte und Stylesheets nur auf Checkout-, Warenkorb-, Mein Konto-, Bestellbestätigungs- und Retourenseiten einzubinden.
- Im Auftragshistorie-Widget wurde eine Schaltfläche hinzugefügt, über die man die Bestellbestätigungsseite des jeweiligen Auftrags öffnen kann. Dadurch ist es möglich, Artikel einer Bestellung auch aus dem Mein Konto-Bereich zu bewerten.
- Auf der Artikeleinzelansicht wird nun das Feld "url" in den Mikrodaten befüllt.
- Die Sortierung der Varianten auf der Artikelkachel in Artikellisten und der Kategorieansicht kann nun über den Ceres-Assistenten eingestellt werden. 
- Der Eintrag **itemFromPrice** wurde zur Mehrsprachigkeits-Oberfläche hinzugefügt. Mit diesem kann in Artikellisten ein "ab" vor dem Preis angezeigt werden, wenn die Artikelkachel die billigste Variante anzeigt und es mehr als eine kaufbare Variante gibt. 

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
- Themes, die mit älteren Ceres-Versionen kompatibel waren, müssen ggf. aktualisiert werden. Weitere Informationen zum Aktualisieren von Themes findest du im <a href=https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-3-update.html" target="_blank" rel="noopener"><b>Handbuch</b></a>.

### Hinzugefügt

- Artikel, die aufgrund ihrer Einstellungen (z.B. kein Preis für den Webshop) nicht im Shop angezeigt werden würden, werden nun im Vorschaumodus des Webshops angezeigt.
- Das FAQ-Widget für den ShopBuilder wurde hinzugefügt. Mithilfe des Widgets lässt sich eine FAQ-Seite im Webshop pflegen.
- Es wurden 4 neue Layout-Container hinzugefügt: **Basket.BeforeBasketTotals**, **Basket.AfterBasketTotals**, **BasketPreview.BeforeBasketTotals** und **BasketPreview.AfterBasketTotals**.
- Adressen für Firmenkunden haben nun anstelle der Felder für Vor- und Nachname ein Feld für die Ansprechpartner.
- Die Gültigkeit der Kaufabwicklungs-URL kann nun in der Ceres-Konfiguration festgelegt werden.

### Geändert

- Bootstrap wurde auf Version 4.2.1 aktualisiert. Weitere Informationen zu Bootstrap und zum Aktualisieren von Themes findest du im <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-3-update.html" target="_blank" rel="noopener"><b>Handbuch</b></a>.
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
- Die Einstellung **Name of an item to display** wurde auf dem Tab **Item view** hinzugefügt. Mit diesem Wert wird festgelegt, ob im Webshop der Artikelname, der Variantenname (sofern verfügbar) oder eine Kombination aus beiden Namen angezeigt wird. Weitere Informationen unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#90" target="_blank">Artikelansicht anpassen</a>.
- Kategorien vom Typ **Content** können nun in der Navigationsleiste angezeigt werden. Hierfür wurde in der Ceres-Konfiguration die Einstellung **Type of categories rendered in the navigation** im Tab **Header** hinzugefügt. Weitere Informationen unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#70" target="_blank">Header und Footer anpassen</a>.

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
- Ein Widerrufsformular wurde hinzugefügt. Sie können entweder ein Formular über die rechtlichen Angaben im Backend erstellen oder ein PDF-Dokument zum Download im Tab **Footer** der Ceres-Konfiguration angeben. Weitere Informationen dazu finden Sie unter [Rechtliche Angaben speichern](https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#300).

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
- Artikel und Varianten können nun dynamisch angezeigt werden. Weitere Informationen unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#90" target="_blank">Artikelansicht anpassen</a>.

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

- Das Twig-Template `SingleItemWrapper` wurde hinzugefügt. Dieses Template ermöglicht die Nutzung von <a href="https://knowledge.plentymarkets.com/de-de/manual/main/artikel/callisto-vorlagen.html" target="_blank"><b>Artikelvorlagen</b></a> in Ceres.

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
- Der Navigation wurde ein Mega-Menü hinzugefügt. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#80" target="_blank"><b>Header und Footer anpassen</b></a>.
- In Ceres kann nun eine Standardkundenklasse für B2B-Kunden eingestellt werden. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#45" target="_blank"><b>Globale Einstellungen vornehmen</b></a>.
- Über die **Empfohlene Artikelsortierung** können Artikel in der Kategorieansicht nun auch nach Bestand sortiert werden. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#200" target="_blank"><b>Paginierung und Sortierung anpassen</b></a>.
- Zahlungsarten können nun auch bei Gastbestellungen auf der Auftragsbestätigungsseite geändert werden.
- Aufträge können nun auch bei Gastbestellungen nachträglich bezahlt werden, z.B. wenn die Zahlungsart geändert wird.
- Eine Fehlermeldung wurde hinzugefügt, die angezeigt wird, wenn beim Hinzufügen von Artikeln zum Warenkorb Fehler auftreten.
- In Ceres können nun Währungseinstellungen vorgenommen werden. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#203" target="_blank"><b>Währungseinstellungen vornehmen</b></a>.
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

- Meta-Beschreibungen und Robots-Einstellungen können jetzt für statische Seiten des Webshops im Tab **SEO** in der Konfiguration eingegeben werden. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#201" target="_blank"><b>Einstellungen für Suchmaschinenoptimierung vornehmen</b></a>.

### Geändert

- **Name of your store** and **URL to your company logo** befinden sich nun im Tab **Global** der Konfiguration.
- Die Einstellung **Allow returns** wurde im Tab **Checkout and My account** der Konfiguration hinzugefügt und ersetzt die alte Einstellung zur Aktivierung von Retouren im plentymarkets Backend.

## 1.6.0 (2017-10-16) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.5.1...1.6.0" target="_blank"><b>Übersicht aller Änderungen</b></a>

### Hinzugefügt

- Staffelpreise sind nun in Ceres integriert und werden unterhalb der Bestellmerkmale in der Einzelansicht eines Artikels ausgegeben. Weitere Informationen zu Staffelpreisen finden Sie unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/artikel/preise.html" target="_blank"><b>Verkaufspreise verwalten</b></a>.

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

- Im **Mein Konto**-Bereich ist es nun möglich Retouren abzuwickeln. Weitere Informationen finden Sie unter <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#430" target="_blank"><b>Retouren aktivieren</b></a>.

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
- In der Kategorieansicht kann nun auch die Kategoriebeschreibung ausgegeben werden. Aktivieren Sie dafür die Einstellung <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#90" target="_blank"><b>Show category description in category view</b></a>.
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

- Für den Warenkorb im Header können nun die angezeigten Informationen eingestellt werden. Es ist möglich den Warenwert, die Anzahl der Artikel oder Warenwert und die Artikelanzahl im Header anzuzeigen. Weitere Informationen dazu finden Sie im <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#80" target="_blank">Handbuch</a>.
- Ein eigenes Favicon kann für den Webshop hochgeladen werden. Weitere Informationen zum Hochladen des Favicons finden Sie im <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#350" target="_blank">Handbuch</a>.
- Jede Seite hat jetzt einen dynamisch generierten Seitentitel.
- Der Warenbestand von Artikeln wird nun im Webshop berücksichtigt.
- Die Einstellung **Unsichtbar: in Artikelauflistung** im Tab **Einstellungen** einer Variante wird nun im Webshop berücksichtigt.
- Varianten ohne Bestand können nun für das Varianten-Dropdown aktiviert werden. Weitere Informationen dazu finden Sie im <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#90" target="_blank">Handbuch</a>.
- Eine Wunschliste wurde hinzugefügt. **Hinweis:** Um die Wunschliste im Webshop anzuzeigen, muss die Route `/wish-list` im Tab **Routing** in der Konfiguration von **IO** aktiviert werden.
- Die Kontaktseite und das Kontaktformular wurden hinzugefügt. **Hinweis:** Um die Kontaktseite im Webshop anzuzeigen, muss die Route `/contact` im Tab **Routing** in der Konfiguration von **IO** aktiviert werden. Weitere Informationen zum Einrichten der Kontaktseite finden Sie im <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#370" target="_blank">Handbuch</a>.
- Serverseitige Fehlermeldungen werden im Frontend richtig ausgegeben.
- Der Link aus der Bestellbestätigung leitet nun auf die Bestellbestätigungsseite von Ceres weiter.
- Das Bild einer Kategorie kann nun in der Kategorieansicht anzeigt werden. Weitere Informationen dazu finden Sie im <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#100" target="_blank">Handbuch</a>.

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
- Bestellmerkmale vom Typ **Text** können nun mit Artikeln verknüpft werden. Diese werden in der Einzelansicht eines Artikels angezeigt (Hinweis: Zurzeit stehen für die Verwendung im Webshop **Ceres** nur Bestellmerkmale vom Typ **Text** zur Verfügung. Auch die Einordnung von Bestellmerkmalen in Merkmalgruppen ist bisher nicht möglich). Weitere Informationen zur Einrichtung von Bestellmerkmalen finden Sie im <a href="https://knowledge.plentymarkets.com/de-de/manual/main/webshop/ceres-einrichten.html#340" target ="_blank">Handbuch</a> und im <a href="https://forum.plentymarkets.com/t/howto-bestellmerkmale-in-ceres-einrichten/63155" target="_blank">Forum</a>.
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
