<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class NewsletterUnsubscribeWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.NewsletterUnsubscribeWidget";

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
                $hintText = "<h3>" . $widgetSettings["title"]["mobile"] . "</h3>";
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
