<?php

namespace Ceres\Widgets\Header\Search;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;

class SearchSuggestionItemWidget extends SearchSuggestionBaseWidget
{
    public $suggestionType = 'item';

    public $widgetKey = 'Ceres::SearchSuggestionItemWidget';

    public $widgetLabel = 'Widget.searchSuggestionItemLabel';

    public $previewImageUrl = '/images/widgets/search-suggestion-item.svg';

    public $headline = 'Ceres::Template.itemSearchProducts';

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings **/
        $settings = WidgetSettingsFactory::create(parent::getSettings());

        $settings->withPointer('appearance');

        $settings->createCheckbox('showImages')
            ->withName('Widget.searchSuggestionShowImagesLabel')
            ->withDefaultValue(false);

        return $settings->toArray();
    }
}
