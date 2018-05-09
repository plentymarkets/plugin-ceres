<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class ImageCarouselWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.ImageCarouselWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return [
            "sliderParams" => [
                $widgetSettings["slide1"],
                $widgetSettings["slide2"],
                $widgetSettings["slide3"]
            ]
        ];
    }
}