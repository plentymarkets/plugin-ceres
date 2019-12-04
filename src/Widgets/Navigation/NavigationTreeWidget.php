<?php

namespace Ceres\Widgets\Navigation;

use Ceres\Widgets\Helper\BaseWidget;

class NavigationTreeWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Navigation.NavigationTreeWidget";

    public function getTemplateData($widgetSettings, $isPreview)
    {
        $customEntries = $widgetSettings["customEntries"]["mobile"];

        usort(
            $customEntries,
            function($entryA, $entryB)
            {
                return $entryA["position"] - $entryB["position"];
            }
        );

        return ["customEntries" => $customEntries];
    }
}
