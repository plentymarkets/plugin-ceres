<?php

namespace Ceres\Widgets\Grid;

use Plenty\Modules\ContentBuilder\Contracts\Widget;
use Plenty\Plugin\Templates\Twig;

class ThreeColumnWidget implements Widget
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
        $twig = pluginApp(Twig::class);

        return $twig->render(
            "Ceres::Widgets.Grid.ThreeColumnWidget",
            [
                "widgetSettings" => $widgetSettings
            ]
        );
    }

    /**
     * Render the widget
     * @param array $widgetGridHeight
     * @param array $widgetGridWidth
     * @param array $widgetSettings
     * @return string
     */
    public function render(
        array $widgetGridHeight = [],
        array $widgetGridWidth = [],
        array $widgetSettings = []
    ): string
    {
        return $this->getPreview($widgetGridHeight['mobile'], $widgetGridWidth['mobile'], $widgetSettings);
    }
}

?>
