<?php


namespace Ceres\Widgets\Header\Search;

class SearchSuggestionCategoryWidget extends SearchSuggestionBaseWidget
{
    /** @inheritDoc */
    public $suggestionType = 'category';
    
    /** @inheritDoc */
    public $widgetKey = 'Ceres::SearchSuggestionCategoryWidget';
    
    /** @inheritDoc */
    public $widgetLabel = 'Widget.searchSuggestionCategoryLabel';
    
    /** @inheritDoc */
    public $previewImageUrl = '/images/widgets/search-suggestion-category.svg';
    
    /** @inheritDoc */
    public $headline = 'Ceres::Template.itemSearchCategories';
    
    /** @inheritDoc */
    public $position = 200;
    
    /** @inheritDoc */
    public $hasCountOption = true;
    
    /** @inheritDoc */
    public $hasAdditionalInformationOption = true;
}
