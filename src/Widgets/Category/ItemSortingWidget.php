<?php

namespace Ceres\Widgets\Category;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Helper\SearchOptions;

class ItemSortingWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ItemSortingWidget";
    
    /** @var CeresConfig $ceresConfig  */
    private $ceresConfig = null;

    public function __constructor(){
        $this->ceresConfig = pluginApp(CeresConfig::class);
    }

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $itemSortOptions = [];
        $result = [];
        $translationMap = SearchOptions::TRANSLATION_MAP;

        if (array_key_exists("itemSortOptions", $widgetSettings))
        {
            $temp = $widgetSettings["itemSortOptions"]["mobile"];

            // add default from ceres config
            if (!in_array($this->ceresConfig->sorting->defaultSorting, $temp)) {
                array_push($temp, $this->ceresConfig->sorting->defaultSorting);
            }

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
        return ["itemSorting" => $this->ceresConfig->sorting->defaultSorting];
    }
}
