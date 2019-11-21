<?php

namespace Ceres\Widgets\Grid;

use Ceres\Widgets\Helper\BaseWidget;

class GridWidget extends BaseWidget
{
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return [
            "gridLayouts" => [
                "oneToOne" => [
                    "col-md-6 widget-prop-md-3-1",
                    "col-md-6 widget-prop-md-3-1"
                ],
                "twoToOne" => [
                    "col-md-8 widget-prop-md-2-1",
                    "col-md-4 widget-prop-md-auto"
                ],
                "oneToTwo" => [
                    "col-md-4 widget-prop-md-auto",
                    "col-md-8 widget-prop-md-2-1"
                ],
                "fiveToSeven" => [
                    "col-md-5 widget-prop-md-auto",
                    "col-md-7 widget-prop-md-2-1"
                ],
                "sevenToFive" => [
                    "col-md-7 widget-prop-md-2-1",
                    "col-md-5 widget-prop-md-auto"
                ],
                "nineToThree" => [
                    "col-md-9 widget-prop-md-2-1",
                    "col-md-3 widget-prop-md-auto"
                ],
                "threeToNine" => [
                    "col-md-3 widget-prop-md-auto",
                    "col-md-9 widget-prop-md-2-1"
                ],
                "stacked" => [
                    "col-md-12 widget-prop-md-3-1 widget-stacked",
                    "col-md-12 widget-prop-md-3-1"
                ],                  
                "stackedTablet" => [
                    "col-md-12 widget-prop-md-3-1 widget-stacked-tablet",
                    "col-md-12 widget-prop-md-3-1"
                ],                  
                "stackedMobile" => [
                    "col-md-12 widget-prop-md-3-1 widget-stacked-mobile",
                    "col-md-12 widget-prop-md-3-1"
                ],                  
                "oneToOneToOne" => [
                    "col-md-4 widget-prop-md-3-2",
                    "col-md-4 widget-prop-md-3-2",
                    "col-md-4 widget-prop-md-3-2"
                ],
                "oneToOneToTwo" => [
                    "col-md-3 widget-prop-md-auto",
                    "col-md-3 widget-prop-md-auto",
                    "col-md-6 widget-prop-md-2-1"
                ],
                "oneToTwoToOne" => [
                    "col-md-3 widget-prop-md-auto",
                    "col-md-6 widget-prop-md-2-1",
                    "col-md-3 widget-prop-md-auto"
                ],
                "twoToOneToOne" => [
                    "col-md-6 widget-prop-md-2-1",
                    "col-md-3 widget-prop-md-auto",
                    "col-md-3 widget-prop-md-auto"
                ],
                "oneStackedToTwo" => [
                    "col-md-4 widget-prop-md-auto",
                    "col-md-8 widget-prop-md-3-2"
                ],
                "twoToOneStacked" => [
                    "col-md-8 widget-prop-md-3-2",
                    "col-md-4 widget-prop-md-auto"
                ],
                "oneToOneToOneToOne" => [
                    "col-md-3 widget-prop-md-1-1",
                    "col-md-3 widget-prop-md-1-1",
                    "col-md-3 widget-prop-md-1-1",
                    "col-md-3 widget-prop-md-1-1"
                ]
            ]
        ];
    }
}