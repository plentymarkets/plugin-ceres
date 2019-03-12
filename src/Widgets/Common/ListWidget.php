<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class ListWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.ListWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $listEntries = [];

        if ( array_key_exists("entries", $widgetSettings) )
        {
            $listEntries = $widgetSettings["entries"]["mobile"];
        }
        else
        {
            foreach( $widgetSettings["texts"]["mobile"] as $text )
            {
                $listEntries[] = [
                    "text" => $text,
                    "url"  => ""
                ];
            }
        }

        foreach( $listEntries as $i => $listEntry )
        {
            if ( is_string($listEntry["url"]) )
            {
                $listEntries[$i]["url"] = [
                    "type" => "external",
                    "value" => $listEntry["url"]
                ];
            }
        }

        return [
            "listEntries"   => $listEntries,
            "isLinkList"    => false
        ];
    }
}
