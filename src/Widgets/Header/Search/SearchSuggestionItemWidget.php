<?php

namespace Ceres\Widgets\Header\Search;

class SearchSuggestionItemWidget extends SearchSuggestionBaseWidget
{
    public $suggestionType = 'item';

    public $widgetKey = 'Ceres::SearchSuggestionItemWidget';

    public $widgetLabel = 'Widget.searchSuggestionItemLabel';

    public $previewImageUrl = '/images/widgets/search-suggestion-item.svg';

    public $headline = 'Ceres::Template.itemSearchProducts';

    public $hasImagesOption = true;

    public $hasAdditionalInformationOption = true;
}
