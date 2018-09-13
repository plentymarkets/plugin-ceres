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

            if (
                !is_null($slide)
                && (
                    (array_key_exists( "categoryId", $slide ) && !is_null( $slide["categoryId"]["mobile"]) )
                    || (array_key_exists( "variationId", $slide ) && !is_null( $slide["variationId"]["mobile"]) )
                    || (array_key_exists( "customImagePath", $slide ) && !is_null( $slide["customImagePath"]["mobile"]) )
                )
            )
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