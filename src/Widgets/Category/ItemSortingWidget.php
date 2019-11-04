<?php

namespace Ceres\Widgets\Category;

use Ceres\Config\CeresSortingConfig;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Helper\SearchOptions;
use Plenty\Plugin\Http\Request;

class ItemSortingWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ItemSortingWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $itemSortOptions = [];
        $result = [];
        $translationMap = SearchOptions::TRANSLATION_MAP;
        /**
         * @var CeresSortingConfig $ceresSortingConfig
         */
        $ceresSortingConfig = pluginApp(CeresSortingConfig::class);

        if (array_key_exists("itemSortOptions", $widgetSettings))
        {
            $temp = $widgetSettings["itemSortOptions"]["mobile"];

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

        $request = pluginApp(Request::class);
        $sorting = $request->get('sorting', null);
        if (!is_null($sorting) && in_array($sorting, $itemSortOptions))
        {
            $result["itemSorting"] = $sorting;
        }
        else
        {
            $result["itemSorting"] = $ceresSortingConfig->defaultSorting;
        }

        $result["itemSortOptions"] = $itemSortOptions;
        $result["translations"] = $translationMap;
        return $result;
    }

    protected function getPreviewData($widgetSettings)
    {
        /**
         * @var CeresSortingConfig $ceresSortingConfig
         */
        $ceresSortingConfig = pluginApp(CeresSortingConfig::class);
        return ["itemSorting" => $ceresSortingConfig->defaultSorting];
    }
}
