<?php

namespace Ceres\Widgets\Header\Search;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;

class SearchSuggestionItemWidget extends SearchSuggestionBaseWidget
{
    public $suggestionType = 'item';

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings **/
        $settings = WidgetSettingsFactory::create(parent::getSettings());

        $settings->withPointer('appearance');

        $settings->createCheckbox('showItemImages')
            ->withName('Widget.searchSuggestionItemsShowItemImagesLabel')
            ->withDefaultValue(false);

        return $settings->toArray();
    }
}
