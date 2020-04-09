<?php

namespace Ceres\Widgets\Header\Search;

class SearchSuggestionSuggestionWidget extends SearchSuggestionBaseWidget
{
    public $suggestionType = 'suggestion';

    public $widgetKey = 'Ceres::SearchSuggestionSuggestionWidget';

    public $widgetLabel = 'Widget.searchSuggestionSuggestionLabel';

    public $previewImageUrl = '/images/widgets/search-suggestion-suggestion.svg';

    public $headline = 'Ceres::Template.itemSearchSuggestion';

    public $position = 300;

    public $hasCountOption = true;
}
