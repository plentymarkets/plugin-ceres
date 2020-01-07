<?php

namespace Ceres\Widgets\Category;

use Ceres\Helper\SearchOptions;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use IO\Services\ItemListService;

class ItemGridWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ItemGridWidget";
    
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ItemGridWidget')
                                ->withLabel('Widget.itemGridLabel')
                                ->withPreviewImageUrl('/images/widgets/item-grid.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(400)
                                ->toArray();
    }
    
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        
        $settings->createCustomClass();
        
        $settings->createAppearance()
                 ->withDefaultValue('primary');
        
        $settings->createSelect('numberOfColumnsDesktop')
                 ->withDefaultValue(4)
                 ->withName('Widget.itemGridNumberOfColumnsDesktopLabel')
                 ->withTooltip('Widget.itemGridNumberOfColumnsDesktopTooltip')
                 ->withListBoxValues(
                     ValueListFactory::make()
                                     ->addEntry(1, 'Widget.widgetNum1')
                                     ->addEntry(2, 'Widget.widgetNum2')
                                     ->addEntry(3, 'Widget.widgetNum3')
                                     ->addEntry(4, 'Widget.widgetNum4')
                                     ->toArray()
                 );
        
        $settings->createSelect('numberOfColumnsTablet')
                 ->withDefaultValue(3)
                 ->withName('Widget.itemGridNumberOfColumnsTabletLabel')
                 ->withTooltip('Widget.itemGridNumberOfColumnsTabletTooltip')
                 ->withListBoxValues(
                     ValueListFactory::make()
                                     ->addEntry(1, 'Widget.widgetNum1')
                                     ->addEntry(2, 'Widget.widgetNum2')
                                     ->addEntry(3, 'Widget.widgetNum3')
                                     ->addEntry(4, 'Widget.widgetNum4')
                                     ->toArray()
                 );
        
        $settings->createSelect('numberOfColumnsMobile')
                 ->withDefaultValue(1)
                 ->withName('Widget.itemGridNumberOfColumnsMobileLabel')
                 ->withTooltip('Widget.itemGridNumberOfColumnsMobileTooltip')
                 ->withListBoxValues(
                     ValueListFactory::make()
                                     ->addEntry(1, 'Widget.widgetNum1')
                                     ->addEntry(2, 'Widget.widgetNum2')
                                     ->toArray()
                 );
        
        $settings->createSpacing();
        
        return $settings->toArray();
    }
    
    /**
     * @inheritdoc
     */
    protected function getPreviewData($widgetSettings)
    {
        //TODO load data from context when its possible
        
        /**
         * @var ItemListService $itemListService
         */
        $itemListService = pluginApp(ItemListService::class);
        
        $itemListOptions = [];
        $itemListOptions = SearchOptions::validateItemListOptions($itemListOptions, SearchOptions::SCOPE_CATEGORY);
        $itemList        = $itemListService->getItemList(
            ItemListService::TYPE_RANDOM,
            null,
            $itemListOptions['sorting'],
            $itemListOptions['itemsPerPage']
        );
        
        return [
            'itemList' => $itemList['documents']
        ];
    }
}
