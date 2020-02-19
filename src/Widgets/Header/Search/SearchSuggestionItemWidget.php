<?php

namespace Ceres\Widgets\Header\Search;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;

class SearchSuggestionItemWidget extends SearchSuggestionBaseWidget
{
    public $suggestionType = "item";

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCheckbox("showItemImages")
            ->withName("Widget.searchSuggestionItemsShowItemImagesLabel")
            ->withDefaultValue(false);

        $parentSettings = parent::getSettings();

        return array_merge($parentSettings, $settingsFactory->toArray());
    }
}
