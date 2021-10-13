<?php

namespace Ceres\Widgets\Category;

use Ceres\Config\CeresSortingConfig;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Helper\SearchOptions;
use Ceres\Widgets\Helper\Factories\Settings\ItemSortValueListFactory;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use IO\Services\ItemService;
use Plenty\Plugin\Http\Request;

class ItemSortingWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Category.ItemSortingWidget';

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ItemSortingWidget')
                                ->withLabel('Widget.itemSortingLabel')
                                ->withPreviewImageUrl('/images/widgets/item-sorting.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(300)
                                ->withSearchKeyWords([
                                    "item", "artikel", "article", "produkt", "sorting", "sortierung", "category", "kategorie"
                                ])
                                ->toArray();
    }

    /**
     * @inheritDoc
     */
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
                     ItemSortValueListFactory::make()->toArray()
                 );

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }

    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $itemSortOptions = [];
        $result          = [];
        $translationMap  = SearchOptions::TRANSLATION_MAP;
        $translationMap = array_map(function($value) { return 'Ceres::Template.'.$value; }, $translationMap);

        /**
         * @var CeresSortingConfig $ceresSortingConfig
         */
        $ceresSortingConfig = pluginApp(CeresSortingConfig::class);

        if (array_key_exists('itemSortOptions', $widgetSettings)) {
            $temp = $widgetSettings['itemSortOptions']['mobile'];

            // add default from plentyShop LTS config
            if (!in_array($ceresSortingConfig->defaultSorting, $temp)) {
                array_push($temp, $ceresSortingConfig->defaultSorting);
            }

            foreach ($translationMap as $key => $value) {
                if (in_array($key, $temp)) {
                    array_push($itemSortOptions, $key);
                }
            }
        }

        /** @var ItemService $itemService */
        $itemService = pluginApp(ItemService::class);
        $additionalItemSortings = $itemService->getAdditionalItemSorting();
        foreach($additionalItemSortings as $additionalItemSortingKey => $additionalItemSortingTranslation) {
            $itemSortOptions[] = $additionalItemSortingKey;
            $translationMap[$additionalItemSortingKey] = $additionalItemSortingTranslation;
        }

        $result['itemSortOptions'] = $itemSortOptions;
        $result['translations']    = $translationMap;

        return $result;
    }

    /**
     * @inheritDoc
     */
    protected function getPreviewData($widgetSettings)
    {
        /**
         * @var CeresSortingConfig $ceresSortingConfig
         */
        $ceresSortingConfig = pluginApp(CeresSortingConfig::class);
        return ['itemSorting' => $ceresSortingConfig->defaultSorting];
    }
}
