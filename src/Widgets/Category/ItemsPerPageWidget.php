<?php

namespace Ceres\Widgets\Category;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\BaseWidget;

class ItemsPerPageWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ItemsPerPageWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $listEntries = [];
        $itemsPerPage = [];
        $result = [];
        if (array_key_exists("entries", $widgetSettings))
        {
            $listEntries = $widgetSettings["entries"]["mobile"];
        }

        foreach ($listEntries as $i => $listEntry)
        {
            if (is_int((int)$listEntry["text"]))
            {
                $itemsPerPage[] = (int)$listEntry["text"];
            }
        }

        $result["itemsPerPageEntries"] = $itemsPerPage;
        return $result;
    }

    protected function getPreviewData($widgetSettings)
    {
        /**
         * @var CeresConfig $config
         */
        $config = pluginApp(CeresConfig::class);
        return ["itemsPerPage" => $config->pagination->itemsPerPage];
    }
}
