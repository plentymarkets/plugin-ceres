<?php

namespace Ceres\ContentBuilder\Homepage;

use Plenty\Modules\ContentBuilder\Contracts\Widget;
use Plenty\Plugin\Templates\Twig;

class ItemPreview implements Widget
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
			"variationId" => 132,
			"imageUrl" => "http://master.plentymarkets.com/documents/image/i13/132-Zweisitzer-Paradise-Now-rot.jpg"
        ];

        $twig = pluginApp(Twig::class);

        return $twig->render(
            "Ceres::ContentBuilder.Homepage.ItemPreview",
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
        return 'todo';
    }
}
