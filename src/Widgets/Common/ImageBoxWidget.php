<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class ImageBoxWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.ImageBoxWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $urlType = "";
        $urlValue = "";

        if ( array_key_exists("url", $widgetSettings) && $widgetSettings["url"]["value"]["mobile"] )
        {
            $urlType  = $widgetSettings["url"]["type"]["mobile"];
            $urlValue = $widgetSettings["url"]["value"]["mobile"];
        }
        else
        {
            if ( $widgetSettings["categoryId"]["mobile"] )
            {
                $urlType = "category";
                $urlValue = $widgetSettings["categoryId"]["mobile"];
            }
            else
            {
                $urlType = "item";
                $urlValue = $widgetSettings["variationId"]["mobile"];
            }
        }

        return [
            'urlType'  => $urlType,
            'urlValue' => $urlValue
        ];
    }
}
