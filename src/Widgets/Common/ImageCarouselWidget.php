<?php

namespace Ceres\Widgets\Common;

use Plenty\Modules\ContentBuilder\Contracts\Widget;
use Plenty\Plugin\Templates\Twig;

class ImageCarouselWidget implements Widget
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
        $sliderParams = [];

        foreach ($widgetSettings as $key => $value)
        {
            if (preg_match("/^slide\d+$/", $key) && (isset($value["categoryId"]) || isset($value["variationId"]) || isset($value["customImagePath"])))
            {
                $sliderParams[] = $value;
            }
        }

        $twig = pluginApp(Twig::class);

        return $twig->render(
            "Ceres::Widgets.Common.ImageCarouselWidget",
            [
                "widgetSettings" => $widgetSettings,
                "sliderParams" => $sliderParams
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
