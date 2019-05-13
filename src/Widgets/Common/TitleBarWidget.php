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
            $text = "<h1 class='align-center'>" . $widgetSettings["text"]["mobile"] . "</h1>";
        }
        return [
            "text" => $text
        ];
    }
}
