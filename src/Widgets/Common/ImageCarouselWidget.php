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
            if (preg_match("/^slide\d+$/", $key) && (!empty($value["categoryId"]["mobile"]) || !empty($value["variationId"]["mobile"]) || !empty($value["customImagePath"]["mobile"])))
            {
                $sliderParams[] = [
                    "categoryId" => $value["categoryId"]["mobile"],
                    "variationId" => $value["variationId"]["mobile"],
                    "customImagePath" => $value["customImagePath"]["mobile"]
                ];
            }
        }

        return [
            "sliderParams" => $sliderParams
        ];
    }
}