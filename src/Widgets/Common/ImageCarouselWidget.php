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
            if (preg_match("/^slide\d+$/", $key) && (isset($value["mobile"]["categoryId"]) || isset($value["mobile"]["variationId"]) || isset($value["mobile"]["customImagePath"])))
            {
                $sliderParams[] = $value["mobile"];
            }
        }

        return [
            "sliderParams" => $sliderParams
        ];
    }
}