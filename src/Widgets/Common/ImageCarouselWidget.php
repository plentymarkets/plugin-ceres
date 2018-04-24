<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class ImageCarouselWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.ImageCarouselWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $sliderParams = [];

        foreach ($widgetSettings as $key => $value)
        {
            if (preg_match("/^slide\d+$/", $key) && (isset($value["categoryId"]) || isset($value["variationId"]) || isset($value["customImagePath"])))
            {
                $sliderParams[] = $value;
            }
        }

        return [
            "sliderParams" => $sliderParams
        ];
    }
}