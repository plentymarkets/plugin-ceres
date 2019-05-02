<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class NewsletterWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.NewsletterWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $hintText = "";

        if ( array_key_exists("hintText", $widgetSettings) && !empty($widgetSettings["hintText"]["mobile"]) )
        {
            $hintText = $widgetSettings["hintText"]["mobile"];
        }
        else
        {
            if ( array_key_exists("title", $widgetSettings) && !empty($widgetSettings["title"]["mobile"]) )
            {
                $hintText = "<h4>" . $widgetSettings["title"]["mobile"] . "</h4>";
            }

            if ( array_key_exists("subTitle", $widgetSettings) && !empty($widgetSettings["subTitle"]["mobile"]) )
            {
                $hintText .= "<p>" . $widgetSettings["subTitle"]["mobile"] . "</p>";
            }
        }

        return [
            "hintText" => $hintText
        ];
    }
}
