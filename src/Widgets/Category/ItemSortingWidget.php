<?php

namespace Ceres\Widgets\Category;

use Ceres\Config\CeresSortingConfig;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Helper\SearchOptions;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Plenty\Plugin\Http\Request;

class ItemSortingWidget extends BaseWidget
{
    protected $template = 'Ceres::Widgets.Category.ItemSortingWidget';
    
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ItemSortingWidget')
                                ->withLabel('Widget.itemSortingLabel')
                                ->withPreviewImageUrl('/images/widgets/item-sorting.svg')
                                ->withType(WidgetTypes::TOOLBAR)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(300)
                                ->toArray();
    }
    
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        
        $settings->createCustomClass();
        
        $settings->createCheckboxGroup('itemSortOptions')
                 ->withDefaultValue(
                     [
                         'texts.name1_asc',
                         'texts.name1_desc',
                         'sorting.price.avg_asc',
                         'sorting.price.avg_desc'
                     ]
                 )
                 ->withName('Widget.itemSortingOptionsLabel')
                 ->withTooltip('Widget.itemSortingOptionsTooltip')
                 ->withCheckboxValues(
                     ValueListFactory::make()
                                     ->addEntry('default.recommended_sorting', 'Widget.itemRecommendedSorting')
                                     ->addEntry('texts.name1_asc', 'Widget.itemName_asc')
                                     ->addEntry('texts.name1_desc', 'Widget.itemName_desc')
                                     ->addEntry('sorting.price.avg_asc', 'Widget.itemPrice_asc')
                                     ->addEntry('sorting.price.avg_desc', 'Widget.itemPrice_desc')
                                     ->addEntry('variation.createdAt_desc', 'Widget.itemVariationCreateTimestamp_desc')
                                     ->addEntry('variation.createdAt_asc', 'Widget.itemVariationCreateTimestamp_asc')
                                     ->addEntry('variation.availability.averageDays_asc', 'Widget.itemAvailabilityAverageDays_asc')
                                     ->addEntry('variation.availability.averageDays_desc', 'Widget.itemAvailabilityAverageDays_desc')
                                     ->addEntry('variation.number_asc', 'Widget.itemVariationCustomNumber_asc')
                                     ->addEntry('variation.number_desc', 'Widget.itemVariationCustomNumber_desc')
                                     ->addEntry('variation.updatedAt_asc', 'Widget.itemVariationLastUpdateTimestamp_asc')
                                     ->addEntry('variation.updatedAt_desc', 'Widget.itemVariationLastUpdateTimestamp_desc')
                                     ->addEntry('item.manufacturer.externalName_asc', 'Widget.itemProducerName_asc')
                                     ->addEntry('item.manufacturer.externalName_desc', 'Widget.itemProducerName_desc')
                                     ->addEntry('variation.position_asc', 'Widget.itemVariationTopseller_asc')
                                     ->addEntry('variation.position_desc', 'Widget.itemVariationTopseller_desc')
                                     ->toArray()
                 );
        
        $settings->createSpacing(false, true);
        
        return $settings->toArray();
    }
    
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $itemSortOptions = [];
        $result          = [];
        $translationMap  = SearchOptions::TRANSLATION_MAP;
        /**
         * @var CeresSortingConfig $ceresSortingConfig
         */
        $ceresSortingConfig = pluginApp(CeresSortingConfig::class);
        
        if (array_key_exists('itemSortOptions', $widgetSettings)) {
            $temp = $widgetSettings['itemSortOptions']['mobile'];
            
            // add default from ceres config
            if (!in_array($ceresSortingConfig->defaultSorting, $temp)) {
                array_push($temp, $ceresSortingConfig->defaultSorting);
            }
            
            foreach ($translationMap as $key => $value) {
                if (in_array($key, $temp)) {
                    array_push($itemSortOptions, $key);
                }
            }
        }
        
        $result['itemSortOptions'] = $itemSortOptions;
        $result['translations']    = $translationMap;
        return $result;
    }
    
    protected function getPreviewData($widgetSettings)
    {
        /**
         * @var CeresSortingConfig $ceresSortingConfig
         */
        $ceresSortingConfig = pluginApp(CeresSortingConfig::class);
        return ['itemSorting' => $ceresSortingConfig->defaultSorting];
    }
}
