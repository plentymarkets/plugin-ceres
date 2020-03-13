<?php


namespace Ceres\Widgets\Header\Search;

class SearchSuggestionCategoryWidget extends SearchSuggestionBaseWidget
{
    public $suggestionType = 'category';

    public $widgetKey = 'Ceres::SearchSuggestionCategoryWidget';

    public $widgetLabel = 'Widget.searchSuggestionCategoryLabel';

    public $previewImageUrl = '/images/widgets/search-suggestion-category.svg';

    public $headline = 'Ceres::Template.itemSearchCategories';

    public $position = 200;

    public $hasCountOption = true;

    public $hasAdditionalInformationOption = true;
}
