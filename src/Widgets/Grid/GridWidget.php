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
                    "col-md-6",
                    "col-md-6"
                ],
                "twoToOne" => [
                    "col-md-8 widget-prop-2-1",
                    "col-md-4 widget-prop-auto"
                ],
                "oneToTwo" => [
                    "col-md-4 widget-prop-auto",
                    "col-md-8 widget-prop-2-1"
                ],
                "fiveToSeven" => [
                    "col-md-5 widget-prop-auto",
                    "col-md-7 widget-prop-2-1"
                ],
                "sevenToFive" => [
                    "col-md-7 widget-prop-2-1",
                    "col-md-5 widget-prop-auto"
                ],
                "nineToThree" => [
                    "col-md-9 widget-prop-2-1",
                    "col-md-3 widget-prop-auto"
                ],                
                "oneToOneToOne" => [
                    "col-md-4 widget-prop-3-2",
                    "col-md-4 widget-prop-3-2",
                    "col-md-4 widget-prop-3-2"
                ],
                "oneToOneToTwo" => [
                    "col-md-3 widget-prop-auto",
                    "col-md-3 widget-prop-auto",
                    "col-md-6 widget-prop-2-1"
                ],
                "oneToTwoToOne" => [
                    "col-md-3 widget-prop-auto",
                    "col-md-6 widget-prop-2-1",
                    "col-md-3 widget-prop-auto"
                ],
                "twoToOneToOne" => [
                    "col-md-6 widget-prop-2-1",
                    "col-md-3 widget-prop-auto",
                    "col-md-3 widget-prop-auto"
                ],
                "oneStackedToTwo" => [
                    "col-md-4 widget-prop-auto",
                    "col-md-8 widget-prop-3-2"
                ],
                "twoToOneStacked" => [
                    "col-md-8 widget-prop-3-2",
                    "col-md-4 widget-prop-auto"
                ],
                "oneToOneToOneToOne" => [
                    "col-md-3 widget-prop-1-1",
                    "col-md-3 widget-prop-1-1",
                    "col-md-3 widget-prop-1-1",
                    "col-md-3 widget-prop-1-1"
                ]
            ]
        ];
    }
}