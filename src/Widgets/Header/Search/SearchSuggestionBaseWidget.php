<?php

namespace Ceres\Widgets\Header\Search;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

abstract class SearchSuggestionBaseWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Header.SearchSuggestionItemsWidget";

    protected $suggestionType = "";

    protected $headline = "Artikel";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::SearchSuggestionItemsWidget")
            ->withLabel("Widget.searchSuggestionItemsLabel")
            ->withPreviewImageUrl("/images/widgets/search-suggestion-items.svg")
            ->withType(WidgetTypes::ITEM_SEARCH)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition(100)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();

        $settingsFactory->createAppearance(true);

        $settingsFactory->createCheckbox("forwardToSingleItem")
            ->withName("Widget.searchSuggestionItemsForwardToSingleItemLabel")
            ->withDefaultValue(false);

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return ['suggestionType' => $this->suggestionType];
    }
}
