<?php

namespace Ceres\Widgets\Category;

use Ceres\Helper\SearchOptions;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use IO\Services\ItemSearch\Factories\VariationSearchResultFactory;
use Plenty\Modules\Webshop\ItemSearch\Helpers\ResultFieldTemplate;
use Plenty\Modules\Webshop\ItemSearch\Services\ItemSearchService;
use Plenty\Modules\ShopBuilder\Helper\ShopBuilderRequest;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\VariationList;


class ItemGridWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Category.ItemGridWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ItemGridWidget')
            ->withLabel('Widget.itemGridLabel')
            ->withPreviewImageUrl('/images/widgets/item-grid.svg')
            ->withType(WidgetTypes::CATEGORY_ITEM)
            ->withCategory(WidgetTypes::CATEGORY_ITEM)
            ->withPosition(400)
            ->withSearchKeyWords([
                                     "item",
                                     "artikel",
                                     "article",
                                     "produkt",
                                     "ansicht",
                                     "category",
                                     "kategorie"
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

        $settings->createCheckbox('noVat')
            ->withDefaultValue(false)
            ->withName('Widget.itemGridNoVatLabel')
            ->withTooltip('Widget.itemGridNoVatTooltip');


        $settings->createCheckbox('grayBackground')
        ->withDefaultValue(false)
        ->withName('Widget.itemGridGrayBackgroundLabel')
        ->withTooltip('Widget.itemGridGrayBackgroundTooltip');

        $settings->createSpacing();

        return $settings->toArray();
    }

    /**
     * @inheritdoc
     */
    protected function getPreviewData($widgetSettings)
    {
        $itemListOptions = [];
        $itemListOptions = SearchOptions::validateItemListOptions($itemListOptions, SearchOptions::SCOPE_CATEGORY);
        // limit the maximum of items to 8, to prevent memory exhaustion errors
        $itemListOptions['itemsPerPage'] = min(8, $itemListOptions['itemsPerPage']);

        /** @var ItemSearchService $searchService */
        $searchService = pluginApp(ItemSearchService::class);
        $searchFactory = null;

        $searchFactory = VariationList::getSearchFactory(
            [
                'sorting' => $itemListOptions['sorting'],
                'itemsPerPage' => $itemListOptions['itemsPerPage'],
                'withoutAdditionalResultFields' => true
            ]
        );

        $searchFactory->withResultFields(ResultFieldTemplate::get(ResultFieldTemplate::TEMPLATE_LIST_ITEM));

        if (is_null($searchFactory)) {
            return null;
        }

        if ($itemListOptions['itemsPerPage'] > 0) {
            $searchFactory->setPage(1, $itemListOptions['itemsPerPage']);
        }

        $itemListResult = $searchService->getResult($searchFactory);

        /** @var ShopBuilderRequest $shopBuilderRequest */
        $shopBuilderRequest = pluginApp(ShopBuilderRequest::class);

        if ($shopBuilderRequest->isShopBuilder()) {
            /** @var VariationSearchResultFactory $searchResultFactory */
            $searchResultFactory = pluginApp(VariationSearchResultFactory::class);
            $itemListResult = $searchResultFactory->fillSearchResults(
                $itemListResult,
                ResultFieldTemplate::get(ResultFieldTemplate::TEMPLATE_LIST_ITEM)
            );
        }

        return [
            'itemList' => $itemListResult['documents']
        ];
    }
}
