<?php

namespace Ceres\ContentBuilder\Homepage;

use Plenty\Modules\ContentBuilder\Contracts\Widget;
use Plenty\Plugin\Templates\Twig;

class CategoryPreview implements Widget
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
            "itemSort" => "texts.name1_asc"
        ];

        $twig = pluginApp(Twig::class);

        return $twig->render(
            "Ceres::ContentBuilder.Homepage.CategoryPreview",
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
