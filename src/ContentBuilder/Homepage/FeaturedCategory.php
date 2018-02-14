<?php

namespace Ceres\ContentBuilder\Homepage;

use Plenty\Modules\ContentBuilder\Contracts\Widget;
use Plenty\Plugin\Templates\Twig;

class FeaturedCategory implements Widget
{

    /**
     * Get the html representation of the widget
     *
     * @param int $widgetGridHeight
     * @param int $widgetGridWidth
     * @param array $widgetSettings
     * @return string
     */
    public function getPreview(int $widgetGridHeight = 0, int $widgetGridWidth = 0, array $widgetSettings = []): string
    {
        $widgetSettings = [
            "categoryId" => 19,
            "aspectRatioXSWidth" => "6",
            "aspectRatioXSHeight" => "4",
            "aspectRatioMDWidth" => "3",
            "aspectRatioMDHeight" => "1",
            "aspectRatioLGWidth" => "3",
            "aspectRatioLGHeight" => "1",
            "aspectRatioXLWidth" => "3",
            "aspectRatioXLHeight" => "1",
        ];

        $twig = pluginApp(Twig::class);

        return $twig->render(
            "Ceres::ContentBuilder.Homepage.FeaturedCategory",
            [
                "widgetSettings" => $widgetSettings
            ]
        );
    }

    /**
     * Render the widget
     * @param int $widgetGridPosX
     * @param int $widgetGridPosY
     * @param int $widgetGridHeight
     * @param int $widgetGridWidth
     * @param array $widgetSettings
     * @return string
     */
    public function render(
        int $widgetGridPosX = 0,
        int $widgetGridPosY = 0,
        int $widgetGridHeight = 0,
        int $widgetGridWidth = 0,
        array $widgetSettings = []
    ): string
    {
        return 'number input twig';
    }
}

?>
