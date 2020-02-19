<?php

namespace Ceres\Widgets\Header\Search;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;

class SearchSuggestionItemWidget extends SearchSuggestionBaseWidget
{
    public $suggestionType = 'item';

    public $widgetKey = 'Ceres::SearchSuggestionItemWidget';

    public $widgetLabel = 'Widget.searchSuggestionItemLabel';

    public $previewImageUrl = '/images/widgets/search-suggestion-item.svg';

    public $headline = 'Ceres::Widget.searchSuggestionItemHeadline';

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings **/
        $settings = WidgetSettingsFactory::create(parent::getSettings());

        $settings->withPointer('appearance');

        $settings->createCheckbox('showItemImages')
            ->withName('Widget.searchSuggestionItemShowItemImagesLabel')
            ->withDefaultValue(false);

        return $settings->toArray();
    }
}
