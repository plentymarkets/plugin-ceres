<?php

namespace Ceres\Widgets\Header\Search;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

abstract class SearchSuggestionBaseWidget extends BaseWidget
{
    protected $template = 'Ceres::Widgets.Header.SearchSuggestionWidget';

    protected $widgetKey = '';

    protected $widgetLabel = '';

    protected $previewImageUrl = '';

    protected $position = 100;

    protected $suggestionType = '';

    protected $headline = '';

    public function getData()
    {
        return WidgetDataFactory::make($this->widgetKey)
            ->withLabel($this->widgetLabel)
            ->withPreviewImageUrl($this->previewImageUrl)
            ->withType(WidgetTypes::ITEM_SEARCH)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition($this->position)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();

        $settingsFactory->createAppearance(true);

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return ['suggestionType' => $this->suggestionType, 'headline' => $this->headline];
    }
}
