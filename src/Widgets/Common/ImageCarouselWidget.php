<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class ImageCarouselWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.ImageCarouselWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $sliderParams = [];

        foreach (["slide1", "slide2", "slide3"] as $slideName)
        {
            $slide = $widgetSettings[$slideName];

            if (!empty($slide))
            {
                $sliderParams[] = [
                    "categoryId"      => $slide["categoryId"]["mobile"],
                    "variationId"     => $slide["variationId"]["mobile"],
                    "customImagePath" => $slide["customImagePath"]["mobile"]
                ];
            }
        }

        if (count($sliderParams) > 0)
        {
            return [
                "sliderParams" => [
                    "mobile"       => $sliderParams,
                    "tablet"       => $sliderParams,
                    "desktop"      => $sliderParams,
                    "largeDesktop" => $sliderParams
                ]
            ];
        }
            
        return null;
    }
}