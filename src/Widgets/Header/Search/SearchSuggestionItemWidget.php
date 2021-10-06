<?php

namespace Ceres\Widgets\Header\Search;

class SearchSuggestionItemWidget extends SearchSuggestionBaseWidget
{
    /** @inheritDoc */
    public $suggestionType = 'item';
    
    /** @inheritDoc */
    public $widgetKey = 'Ceres::SearchSuggestionItemWidget';
    
    /** @inheritDoc */
    public $widgetLabel = 'Widget.searchSuggestionItemLabel';
    
    /** @inheritDoc */
    public $previewImageUrl = '/images/widgets/search-suggestion-item.svg';
    
    /** @inheritDoc */
    public $headline = 'Ceres::Template.itemSearchProducts';
    
    /** @inheritDoc */
    public $hasImagesOption = true;
    
    /** @inheritDoc */
    public $hasAdditionalInformationOption = true;
}
