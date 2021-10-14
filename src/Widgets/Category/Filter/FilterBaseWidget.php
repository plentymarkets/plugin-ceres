<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use IO\Services\ItemSearch\Factories\Faker\FacetFaker;

class FilterBaseWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Category.Filter.FilterBaseWidget';
    
    /** @var array The facet types that are allowed to be displayed by the widget */
    protected $allowedFacetTypes = [];
    
    /** @var string The class name of the filter widget */
    protected $className = '';
    
    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        
        $settings->createCustomClass();
        
        $settings->createAppearance(true)
                 ->withDefaultValue('none');
        
        $spacingContainer = $settings->createVerticalContainer('spacing')
                                     ->withName('Widget.widgetSpacing');
        
        $spacingContainer->children->createCheckbox('customPadding')
                                   ->withName('Widget.widgetCustomPadding');
        
        $spacingContainer->children->createSetting('padding')
                                   ->withType('spacing')
                                   ->withCondition('!!spacing.customPadding')
                                   ->withOption(
                                       'units',
                                       [
                                           'px',
                                           'rem'
                                       ]
                                   )
                                   ->withOption('direction', 'vertical');
        
        $spacingContainer->children->createCheckbox('customMargin')
                                   ->withName('Widget.widgetCustomMargin');
        
        $spacingContainer->children->createSetting('margin')
                                   ->withType('spacing')
                                   ->withCondition('!!spacing.customMargin')
                                   ->withOption(
                                       'units',
                                       [
                                           'px',
                                           'rem'
                                       ]
                                   )
                                   ->withOption('direction', 'all');
        
        return $settings->toArray();
    }
    
    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return ['allowedFacetTypes' => $this->allowedFacetTypes, 'className' => $this->className];
    }
    
    /**
     * @inheritdoc
     */
    protected function getPreviewData($widgetSettings)
    {
        /** @var FacetFaker $facetFaker */
        $facetFaker  = pluginApp(FacetFaker::class);
        $facetResult = $facetFaker->fill([]);

        return [
            'facets' => $facetResult,
            'className' => $this->className
        ];
    }
}
