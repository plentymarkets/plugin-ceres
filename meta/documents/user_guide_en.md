# Ceres – The new online store for plentymarkets 7

<div class="container-toc"></div>

**Ceres** is the official template plugin for the default online store of plentymarkets 7. In the new online store for plentymarkets 7, design and logic are separated from each other. Two plugins are required to integrate the online store into your plentymarkets system. The **Ceres** plugin contains the new standard design of the online store and can be customised to meet your needs. The **Io** plugin contains the logic part of the online store, is a general basis for all design plugins and can also be used by other plugins.

## Setting up Ceres in plentymarkets

You can make changes to your design by carrying out the design settings. No programming experience is required. To carry out the design settings, proceed as follows.

<div class="alert alert-info" role="alert">
    When deploying the online store plugin <b>Ceres</b> in <b>Productive</b>, the normal plentymarkets online store will be unavailable. <b>Ceres</b> will use the URL of the online store.
</div>

### Deactivating the default homepage

**Ceres** comes with a default homepage. Deactivate this page to display your own content on the homepage of your online store.

##### Deactivating the default homepage:

1. Go to **Start » Plugins**.<br /> → The plugin overview will open.
2. Click on **Ceres**.<br /> → The plugin will open in a new tab.
3. Click on **Configuration** in the directory tree.<br /> → The **Homepage** is pre-selected.
4. Deactivate the setting **Show default homepage**.
5. **Save** the settings.<br /> → The default homepage is deactivated.


### Customising the header and footer

Customise the header and the footer of your design. Display your own logo and design the footer content according to your requirements. The store features, for example, are a great way to highlight the advantages of your online store, such as free shipping.

##### Customising the header and footer:

1. Go to **Start » Plugins**.<br /> → The plugin overview will open.
2. Click on **Ceres**.<br /> → The plugin will open in a new tab.
3. Click on **Configuration** in the directory tree.
4. Open the **Header** or the **Footer** tab.
5. Carry out the settings. Pay attention to the information given in table 1.
6. **Save** the settings.

<table>
<thead>
<tr>  
<th>Setting</th>
<th>Explanation</th> 
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" class="th">Tab: Header</td>  
</tr>   
<tr>
<td><b>URL to your company logo</b></td>  
<td>Enter the URL to your company logo. The company logo can be uploaded in the <strong>Documents</strong> tab of a category, for example.</td>
</tr>
<tr>
<td><b>Fix the navigation bar at the top of the page</b></td>  
<td>Activate to fix the navigation bar at the top in your online store.</td>
</tr>
<tr>
<td colspan="2" class="th">Tab: Footer</td>  
</tr>  
<tr>
<td><b>Number of store features</b></td>  
<td>Select the number of features to be displayed in the footer of the online store.<br /> <strong>0</strong> = Do not display any store features.<br /> <strong>1</strong> = Only display the first store feature in the footer.<br /> <strong>2</strong> = Display the first and the second store feature in the footer.<br /> <strong>3</strong> = Display all three store features in the footer.</td>
</tr>
<tr>
<td><b>Text of first store feature</b>;<br /> <b>Text of second store feature</b>;<br /> <b>Text of third store feature</b></td>  
<td>Enter the text for the store feature. The text will be displayed next to a green check mark in the footer.</td>
</tr>
<tr>
<td><b>Number of columns</b></td>  
<td>Select the number of columns to be displayed in the footer of the online store.<br /> <strong>1</strong> = Only display the first column in the footer.<br /> <strong>2</strong> = Display the first and the second column in the footer.<br /> <strong>3</strong> = Display all three columns in the footer.</td>
</tr>
<tr>
<td><b>Title of first column</b></td>  
<td>Enter the title of the first column to be displayed in the footer of the online store.</td>
</tr>
<tr>
<td><b>List of category IDs to display in first column</b></td>  
<td>Enter the IDs of categories of the <strong>Content</strong> type to be displayed in the first footer column of the online store.<br /> <b><i>Note:</i></b> Multiple IDs must be separated by commas.</td>
</tr>
<tr>
<td><b>Title of second column</b></td>  
<td>Enter the title of the second column to be displayed in the footer of the online store.</td>
</tr>
<tr>
<td><b>List of category IDs to display in second column</b></td>  
<td>Enter the IDs of categories of the <strong>Content</strong> type to be displayed in the second footer column of the online store.<br /> <b><i>Note:</i></b> Multiple IDs must be separated by commas.</td>
</tr>
<tr>
<td><b>Title of third column</b></td>  
<td>Enter the title of the third column to be displayed in the footer of the online store.</td>
</tr>
<tr>
<td><b>List of category IDs to display in third column</b></td>  
<td>Enter the IDs of categories of the <strong>Content</strong> type to be displayed in the third footer column of the online store.<br /> <b><i>Note:</i></b> Multiple IDs must be separated by commas.</td>
</tr>
</tbody>
<caption>Table 1: Customising the header and footer</caption> 
</table>

### Customising the item view

Customise the design of the item view in the **Item view** tab. Select the item name and item information to be displayed in the online store. Furthermore, select which item variations should be displayed in the item overview.

##### Customising the item view:

1. Go to **Start » Plugins**.<br /> → The plugin overview will open.
2. Click on **Ceres**.<br /> → The plugin will open in a new tab.
3. Click on the **Item view** tab.
4. Carry out the settings. Pay attention to the information given in table 2.
5. **Save** the settings.

<table>
<thead>
<tr>  
<th>Setting</th>
<th>Explanation</th> 
</tr>
</thead>
<tbody>
<tr>
<td><b>Item name</b></td>  
<td>Select <strong>Name 1</strong>, <strong>Name 2</strong> or <strong>Name 3</strong>. Texts for these fields are saved in the <strong><a href="{% Link(3177) %}#50.">Texts</a></strong> tab of the item. If <strong>Name 2</strong> or <strong>Name 3</strong> is selected, but no name was saved in the text field, <strong>Name 1</strong> will be used as the item name.</td>
</tr>
<tr>
<td><b>Show item information</b></td>  
<td>Select one, multiple or <strong>ALL</strong> item information options to be displayed in the item view in the online store.<br /> <strong>Condition</strong> = Activate to display the item condition.<br /> <strong>Manufacturer</strong> = Activate to display the item manufacturer.<br /> <strong>Manufacturing country</strong> = Activate to display the manufacturing country of the item.<br /> <strong>Age rating</strong> = Activate to display the item's age rating.<br /> <strong>Item ID</strong> = Activate to display the item's ID.<br /> <strong>Technical data</strong> = Activate to display the <strong>Technical data</strong> tab. If you activate the display of the <strong>Technical data</strong> without saving a text in the <strong>Technical data</strong> field in the <strong><a href="{% Link(3177) %}#50.">Texts</a></strong> tab of an item, the tab will not be displayed.<br /> <strong>Description</strong> = Activate to display the <strong>Description</strong> tab. If you activate the display of the <strong>Description</strong> without saving a text in the <strong>Description</strong> field in the <strong><a href="{% Link(3177) %}#50.">Texts</a></strong> tab of an item, the tab will not be displayed.<br /> <strong>Preview text</strong> = Activate to display the preview text for the item.<br /> <strong>Strikethrough price</strong> = Activate to show the strikethrough price next to the item price.<br /> <strong>Variation name</strong> = Activate to display the variation name.<br /><!--strong>Variation number</strong> = Aktivieren, um die Variantennummer anzuzeigen.<br /--> <strong>External variation ID</strong> = Activate to display the external variation ID.<br /> <strong>Model</strong> = Activate to display the model.<br /> <strong>Dimensions</strong> = Activate to display the item's dimensions.<br /> <strong>Customs tariff number</strong> = Activate to display the customs tariff number.<br /> <strong>Net weight</strong> = Activate to display the net weight.<br /> <strong>Gross weight</strong> = Activate to display the gross weight.<br /> <strong>Content</strong> = Activate to display the content.</td>
</tr>
<tr>
<td><b>Store specials: Number of decimal places for discounts</b></td>  
<td>Select the number of decimal places for discounts to be displayed for an item in the item list.</td>
</tr>
<tr>
<td><b>Show variations in the category item list</b></td>  
<td>Display variations in the item overview of a category.<br /> <strong>All</strong> = Select to display main variations and variations of items.<br /> <strong>Only main variations</strong> = Select to display only main variations.<br /> <strong>Only child variations</strong> = Select to display only variations. Main variations will not be displayed.</td>
</tr>
</tbody>
<caption>Table 2: Customising the item view</caption>
</table>

### Customising the shopping cart

Customise the display options of the shopping cart in the **Shopping cart** tab. Select item and price information to be displayed in the shopping cart and customise the shopping cart preview.


##### Customising the shopping cart:

1. Go to **Start » Plugins**.<br /> → The plugin overview will open.
2. Click on **Ceres**.<br /> → The plugin will open in a new tab.
3. Click on the **Shopping cart** tab.
4. Carry out the settings. Pay attention to the information given in table 3.
5. **Save** the settings.

<table>
<thead>
<tr>  
<th>Setting</th>
<th>Explanation</th>
</tr>
 </thead>
 <tbody>
<tr>
<td><b>Show item information</b></td>  
<td>Select one, multiple or <strong>ALL</strong> item information options to be displayed in the item overview of the shopping cart.<br /> <strong>Item ID</strong> = Activate to display the item's ID.<br /><strong>Description</strong> = Activate to display the item description. If you activate the display of the <strong>Description</strong> without saving a text in the <strong>Description</strong> field in the <strong><a href="{% Link(3177) %}#50.">Texts</a></strong> tab of an item, the item description will not be displayed.<br /><strong>Availability</strong> = Activate to display the item availability.<br /><strong>Variation number</strong> = Activate to display the variation number.<br /> <strong>Condition</strong> = Activate to display the item condition.
</tr>
 <tr>
<td><b>Show price information</b></td>  
<td>Select one, multiple or <strong>ALL</strong> price information options to be displayed in the shopping cart.<br /> <strong>Value of items (Gross)</strong> = Activate to display the gross value of items.<br /> <strong>Value of items (Net)</strong> = Activate to display the net value of items.<br /> <strong>Shipping (Gross)</strong> = Activate to display the gross shipping costs.<br /> <strong>Shipping (Net)</strong> = Activate to display the net shipping costs.<br /> <strong>VAT</strong> = Activate to display the VAT.<br /> <strong>Total (Gross)</strong> = Activate to display the gross total sum.<br /> <strong>Total (Net)</strong> = Activate to display the net total sum.</td>
</tr>
<tr>
<td><b>Show basket preview information</b></td>  
<td>Select one, multiple or <strong>ALL</strong> price information options to be displayed in the shopping cart preview.<br /> <strong>Value of items (Gross)</strong> = Activate to display the gross value of items.<br /> <strong>Value of items (Net)</strong> = Activate to display the net value of items.<br /> <strong>Shipping (Gross)</strong> = Activate to display the gross shipping costs.<br /> <strong>Shipping (Net)</strong> = Activate to display the net shipping costs.<br /> <strong>VAT</strong> = Activate to display the VAT.<br /> <strong>Total (Gross)</strong> = Activate to display the gross total sum.<br /> <strong>Total (Net)</strong> = Activate to display the net total sum.</td>
</tr>    
<tr>
<td><b>Show Change variation button</b></td>  
<td>Activate to display the <strong>Change variation</strong> button in the item overview in the shopping cart. By clicking on <strong>Change variation</strong>, customers can change an item's variation in the shopping cart. If you activate the <strong>Change variation</strong> button, but the item has no variations, the button will not be displayed.</td>
</tr>    
 <tr>
<td><b>Add to shopping cart: Show overlay</b></td>  
<td>Activate to show the overlay of the shopping cart after clicking on the <strong>Add to shopping cart</strong> button.</td>
</tr>
</tbody>
<caption>Table 3: Customising the shopping cart</caption>
</table>

### Customising the pagination and sorting

Customise the pagination of the item overview and the online store's item sorting in the **Pagination and sorting** tab.


##### Customising the pagination and sorting:

1. Go to **Start » Plugins**.<br /> → The plugin overview will open.
2. Click on **Ceres**.<br /> → The plugin will open in a new tab.
3. Open the **Pagination and sorting** tab.
4. Carry out the settings. Pay attention to the information given in table 4.
5. **Save** the settings.

<table>
<thead>
<tr>  
<th>Setting</th>
<th>Explanation</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Pagination position</b></td>  
<td>Select the pagination position.<br /> <strong>Top</strong> = Display the pagination on top of the item list.<br /> <strong>Bottom</strong> = Display the pagination on the bottom of the item list.<br /> <strong>Top and bottom</strong> = Display the pagination on the top and bottom of the item list.</td>
</tr>
<tr>
<td><b>Always show first page</b></td>  
<td>Activate to always display the first page in the pagination.</td>
</tr>  
<tr>
<td><b>Always show last page</b></td>  
<td>Activate to always display the last page in the pagination.</td>
</tr>  
<tr>
<td><b>Enable number of items per page</b></td>  
<td>Activate one, multiple or all number values to display the selected values in the <strong>Items per page</strong> drop-down menu in the item overview.</td>
</tr>  
<tr>
<td><b>Default number of items per page</b></td>  
<td>Select the default number of items in the item list.</td>
</tr>  
<tr>
<td><b>Enable item sorting by</b></td>
<td>Activate one, several or <strong>ALL</strong> sorting options for item sorting.<br /> <strong>Item ID (ascending)</strong> = Sort items by item ID in ascending order.<br /> <strong>Item ID (descending)</strong> = Sort items by item ID in descending order.<br /> <strong>Item name (ascending)</strong>  = Sort items in alphabetical order by item name (A-Z).<br /> <strong>Item name (descending)</strong>  = Sort items in alphabetical order by item name (Z-A).<br /> <strong>Item position (ascending)</strong> = Display the item with the highest position number first.<br /> <strong>Item position (descending)</strong> = Display the item with the lowest position number first.<br /> <b><i>Important:</i></b> In order for this function to work, a position number has to be saved for each of the item variations within the variation tab.<br /> <strong>Price (ascending)</strong> = Display the item with the lowest price first.<br /> <strong>Price (descending)</strong> = Display the item with the highest price first.<br /> <strong>Customer feedback (ascending)</strong> = Display the item with the lowest customer feedback first.<br /> <strong>Customer feedback (descending)</strong> = Display the item with the highest customer feedback first.<br /> <strong>Newest variation</strong> = Display the newest item variations first.<br /> <strong>Oldest variation</strong> = Display the oldest item variations first.<br /> <strong>Variation ID (ascending)</strong> = Sort item variations by variation ID in ascending order.<br /> <strong>Variation ID (descending)</strong> = Sort item variations by variation ID in descending order.<br /> <strong>Variation number (ascending)</strong> = Sort item variations by variation number in ascending order.<br /> <strong>Variation number (descending)</strong> = Sort item variations by variation number in descending order.<br /> <strong>Last variation update</strong> = Display the last updated item variation first.<br /> <strong>First variation update</strong> = Display the first updated item variation first.<br /> <strong>Variation name (ascending)</strong> = Sort item variations in alphabetical order by variation name (A-Z).<br /> <strong>Variation name (descending)</strong> = Sort item variations in alphabetical order by variation name (Z-A).<br /> <strong>Variation position (ascending)</strong> = Display the item variation with the highest position number first.<br /> <strong>Variation position (descending)</strong> = Display the item variation with the lowest position number first.<br /> <b><i>Important:</i></b> In order for this function to work, a position number has to be saved for each of the item variations within the variation tab.<br /> <strong>Active variation (ascending)</strong> = Sort active item variations in ascending order.<br /> <strong>Active variation (descending)</strong> = Sort active item variations in descending order.<br /> <strong>Main variation (ascending)</strong> = Sort main item variations in ascending order.<br /> <strong>Main variation (descending)</strong> = Sort main item variations in descending order.<br /> <strong>Manufacturer (ascending)</strong> = Sort items in alphabetical order by manufacturer (A-Z).<br /> <strong>Manufacturer (descending)</strong> = Sort items in alphabetical order by manufacturer (Z-A).<br /> <strong>Random items</strong> = Display items in a different, randomly chosen order every time.
</td>
</tr>
<tr>
<td><b>Default item sorting by</b></td>  
<td>Select the entry that is selected by default for item sorting.</td>
</tr>
</tbody>
<caption>Table 4: Customising the pagination and sorting</caption>
</table>

### Customising the My account area

Carry out settings for the **My account** area of the online store in the **My account** tab.

##### Customising the My account area:

1. Go to **Start » Plugins**.<br /> → The plugin overview will open.
2. Click on **Ceres**.<br /> → The plugin will open in a new tab.
3. Click on the **My account** tab.
4. Enter the number of orders to be displayed per page in the order history.
5. **Save** the settings.

### Settings for plugin developers

Settings specifically aimed at plugin developers are available in the **Registration** and **Logging and performance** tabs. Here, you can set the information to be logged during plugin development and the performance mode for the online store.

##### Carrying out settings for plugin development:

1. Go to **Start » Plugins**.<br /> → The plugin overview will open.
2. Click on **Ceres**.<br /> → The plugin will open in a new tab.
3. Click on the **Registration** or **Logging and performance** tab.
4. Carry out the settings. Pay attention to the information given in table 5.
5. **Save** the settings.

<table>
<thead>
<tr>  
<th>Setting</th>
<th>Explanation</th> 
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" class="th">Tab: Registration</td>  
</tr> 
<tr>
<td><b>The RegEx used for the email</b></td>  
<td>Enter regular expressions for email validation.</td>
</tr>
<tr>
<td><b>The RegEx used for the password</b></td>  
<td>Enter regular expressions for password validation.</td>
</tr>
<tr>
<td colspan="2" class="th">Tab: Logging and performance</td>  
</tr> 
<tr>
<td><b>Enable logging options</b></td>  
<td>Activate one, multiple or <strong>ALL</strong> logging options.<br /> <strong>Print errors</strong> = Display error messages in the online store.<br /> <strong>Print success</strong> = Display success messages in the online store.<br /> <strong>Print warnings</strong> = Display warnings in the online store.<br /> <strong>Print information</strong> = Display information in the online store.<br /> <strong>Print stack trace</strong> = Display the stack trace.<br /> <strong>Log messages</strong> = Log messages.<br /> <strong>Show error codes</strong> = Display error codes.</td>
</tr>
<tr>
<td><b>Performance level</b></td>  
<td>Select a performance level.<br /> <strong>Live</strong> = Select the live mode when using the online store as a productive system. Files will be minified and bundled.<br /> <strong>Development</strong> = Select the development mode to use debugging functionality. Files will not be minified and bundled.</td>
</tr>
</tbody>
<caption>Table 5: Carrying out settings for plugin development</caption>
</table>

### Setting online store languages

By default, **Ceres** will be available in German and English. Select these languages in the header area of your online store. **Ceres** supports all languages available in plentymarkets. You can translate your online store and your items into other languages. Carry out language settings in the plentymarkets back end.

##### Setting online store languages:

1. Go to **Settings » Client (store) » Standard » Online store » Multilingualism**.
2. Select additional languages under **Languages** by holding the Shift key.
3. **Save** the settings.<br /> → The selected languages will be displayed in the language selection of your online store.

### Saving legal information

Specific templates for legal information are available in Ceres. You can save and display your legal information in different languages. In the **Legal information** menu, you can save your **terms and conditions**, **cancellation rights**, **privacy policy** and **legal disclosure** for your online store. 

##### Entering the terms and conditions in clear text:

1. Go to **Settings » Client (store) » Standard » Online store » Legal information**.
2. Expand a **language**.
3. Click on the **Terms and conditions** tab.
4. Click on the **Text** tab.
5. Enter the text for your terms and conditions.
6. **Save** the settings.

Alternatively, save your legal texts in HTML format. For this purpose, use the features of the HTML editor or enter the HTML as **Source code**.

##### Entering the terms and conditions in HTML format:

1. Go to **Settings » Client (store) » Standard » Online store » Legal information**.
2. Expand a **language**.
3. Click on the **Terms and conditions** tab.
4. Click on the **HTML** tab.
5. If you want to enter your text as HTML code, click on **Source code**. 
6. Enter the formatted text for your terms and conditions. 
7. **Save** the settings.

Enter the texts for the **cancellation rights**, the **privacy policy** and the **legal disclosure** for your online store in the desired languages. These texts will be displayed on the respective pages in **Ceres**.

## License

This project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE. – find further information in the [LICENSE.md](https://github.com/plentymarkets/plugin-ceres/blob/stable/LICENSE.md).
