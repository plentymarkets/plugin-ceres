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
        $result["translations"] = SearchOptions::TRANSLATION_MAP;
        return $result;
    }

    protected function getPreviewData($widgetSettings)
    {
        /**
         * @var CeresConfig $config
         */
        
        $config = pluginApp(CeresConfig::class);
        return ["itemSorting" => $config->sorting->defaultSorting];
    }
}
