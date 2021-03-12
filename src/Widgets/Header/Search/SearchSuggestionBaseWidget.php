<?php

namespace Ceres\Widgets\Header\Search;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

abstract class SearchSuggestionBaseWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Header.SearchSuggestionWidget';

    /** @var string $widgetKey The key of the widget */
    protected $widgetKey = '';

    /** @var string $widgetLabel The label of the widget */
    protected $widgetLabel = '';

    /** @var string $previewImageUrl The url of the preview image */
    protected $previewImageUrl = '';

    /** @var int $position The position of the widget */
    protected $position = 100;

    /** @var string $suggestionType The type of the suggestion widget */
    protected $suggestionType = '';

    /** @var string $headline The headline of the suggestion widget */
    protected $headline = '';

    /** @var string $showHeadline Indicate if the headline should be shown */
    protected $showHeadline = true;

    /** @var bool $hasCountOption Indicate if the suggestion widget has the option to show counts behind the suggestions */
    protected $hasCountOption = false;
    
    /** @var bool $hasImageOption Indicate if the suggestion widget has the option to show images for the suggestions */
    protected $hasImagesOption = false;
    
    /** @var bool $hasAdditionalInformationOption Indicate if the suggestion widget has the option to show additional information for the suggestions */
    protected $hasAdditionalInformationOption = false;
    
    /**
     * @inheritDoc
     */
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
    
    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();

        $settingsFactory->createAppearance(true);

        if ($this->showHeadline) {
            $settingsFactory->createCheckbox('showHeadline')
                ->withName('Widget.searchSuggestionShowHeadlineLabel')
                ->withDefaultValue(true);
        }

        if ($this->hasCountOption) {
            $settingsFactory->createCheckbox('showCount')
                ->withName('Widget.searchSuggestionShowCountLabel')
                ->withDefaultValue(false);
        }

        if ($this->hasImagesOption) {
            $settingsFactory->createCheckbox('showImages')
                ->withName('Widget.searchSuggestionShowImagesLabel')
                ->withDefaultValue(false);
        }

        if ($this->hasAdditionalInformationOption) {
            $settingsFactory->createCheckbox('showAdditionalInformation')
                ->withName('Widget.searchSuggestionShowAdditionalInformationLabel')
                ->withDefaultValue(false);
        }

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
    
    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return [
            'suggestionType' => $this->suggestionType,
            'defaultHeadline' => $this->headline,
        ];
    }
}
