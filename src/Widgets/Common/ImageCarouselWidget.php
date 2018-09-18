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
                && array_key_exists( "mobile", $slide )
                && !is_null( $slide["mobile"] )
                && ( !is_null( $slide["mobile"] ) || !is_null( $slide["mobile"] ) || !is_null( $slide["mobile"] ) )
            )
            {
                $sliderParams[] = [
                    "categoryId"      => $slide["mobile"]["categoryId"],
                    "variationId"     => $slide["mobile"]["variationId"],
                    "customImagePath" => $slide["mobile"]["customImagePath"]
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