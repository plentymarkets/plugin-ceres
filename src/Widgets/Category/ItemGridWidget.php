<?php

namespace Ceres\Widgets\Category;

use Ceres\Helper\SearchOptions;
use Ceres\Widgets\Helper\BaseWidget;
use IO\Services\ItemListService;

class ItemGridWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ItemGridWidget";

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
        $itemList = $itemListService->getItemList(ItemListService::TYPE_RANDOM, null, $itemListOptions['sorting'], $itemListOptions['itemsPerPage']);

        return [
            'itemList' => $itemList['documents']
        ];

    }
}
