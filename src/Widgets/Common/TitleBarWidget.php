<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class TitleBarWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.TitleBarWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $text = $widgetSettings["content"]["mobile"];
        if ( strlen($widgetSettings["text"]["mobile"]) && !strlen($text) )
        {
            $text = $widgetSettings["text"]["mobile"];
        }
        return [
            "text" => $text
        ];
    }
}
