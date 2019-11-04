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
        $temp = [];
        $itemSortOptions = [];
        $result = [];
        $translationMap = SearchOptions::TRANSLATION_MAP;

        if (array_key_exists("itemSortOptions", $widgetSettings))
        {
            $temp = $widgetSettings["itemSortOptions"]["mobile"];

            foreach ($translationMap as $key => $value) {
                if (in_array($key, $temp)) {
                    array_push($itemSortOptions, $key);
                }
            }
        }

        $result["itemSortOptions"] = $itemSortOptions;
        $result["translations"] = $translationMap;
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
