<?php

namespace Ceres\Widgets\Category;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Helper\SearchOptions;

class ItemSortingWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ItemSortingWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $itemSortOptions = [];
        $result = [];
        if (array_key_exists("itemSortOptions", $widgetSettings))
        {
            $itemSortOptions = $widgetSettings["itemSortOptions"]["mobile"];
        }

        $result["itemSortOptions"] = $itemSortOptions;
        return $result;
    }

    protected function getPreviewData($widgetSettings)
    {
        /**
         * @var CeresConfig $config
         */

        $searchOptions = SearchOptions::get(SearchOptions::SCOPE_CATEGORY);
        
        $config = pluginApp(CeresConfig::class);
        return ["itemSorting" => $config->sorting->defaultSorting,
                "searchOptions" => $searchOptions];

    }
}
