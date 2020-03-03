<?php


namespace Ceres\Widgets\Header\Search;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;

class SearchSuggestionCategoryWidget extends SearchSuggestionBaseWidget
{
    public $suggestionType = 'category';

    public $widgetKey = 'Ceres::SearchSuggestionCategoryWidget';

    public $widgetLabel = 'Widget.searchSuggestionCategoryLabel';

    public $previewImageUrl = '/images/widgets/search-suggestion-category.svg';

    public $headline = 'Ceres::Template.itemSearchCategories';

    public $position = 200;

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings * */
        $settings = WidgetSettingsFactory::create(parent::getSettings());

        $settings->withPointer('appearance');

        $settings->createCheckbox('showCount')
            ->withName('Widget.searchSuggestionShowCountLabel')
            ->withDefaultValue(false);

        return $settings->toArray();
    }
}
