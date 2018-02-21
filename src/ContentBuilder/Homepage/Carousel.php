<?php

namespace Ceres\ContentBuilder\Homepage;

use Plenty\Modules\ContentBuilder\Contracts\Widget;
use Plenty\Plugin\Templates\Twig;

class Carousel implements Widget
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
        $slides = [
            [
                "variationId" => 1063,
                "customImagePath" => "https://i.imgur.com/qvkyZk1.jpg"
            ],
            [
                "variationId" => 1064,
                "customImagePath" => "https://i.imgur.com/m4ELeiO.jpg"
            ],
            [
                "variationId" => 1065,
                "customImagePath" => "https://i.imgur.com/gsRayfj.jpg"
            ]
        ];

        $twig = pluginApp(Twig::class);

        return $twig->render(
            "Ceres::ContentBuilder.Homepage.Carousel",
            [
                "widgetSettings" => $widgetSettings,
                "slides" => $slides
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
