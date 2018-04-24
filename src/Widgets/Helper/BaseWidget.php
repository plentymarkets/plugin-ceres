<?php

namespace Ceres\Widgets\Helper;

use Plenty\Modules\ContentBuilder\Contracts\Widget;
use Plenty\Plugin\Templates\Twig;

class BaseWidget implements Widget
{
    /**
     * The template to e used for this widget
     *
     * @var string
     */
    protected $template = "";

    /**
     * Get the html representation of the widget.
     *
     * @param int $widgetGridHeight
     * @param int $widgetGridWidth
     * @param array $widgetSettings
     *
     * @return string
     */
    public function getPreview(
        int $widgetGridHeight = 0,
        int $widgetGridWidth = 0,
        array $widgetSettings = []
    ): string
    {
        $twig = pluginApp(Twig::class);
        $template = $this->renderTemplate(
            ['mobile' => $widgetGridHeight],
            ['mobile' => $widgetGridWidth],
            $widgetSettings,
            true
        );

        return $twig->renderString($template);
    }

    /**
     * Render the template of the widget.
     * Returns a twig-template which will be included in the frontend
     * or rendered again for generating the preview
     *
     * @param array $widgetGridHeight
     * @param array $widgetGridWidth
     * @param array $widgetSettings
     *
     * @return string
     */
    public function render(
        array $widgetGridHeight = [],
        array $widgetGridWidth = [],
        array $widgetSettings = []
    ): string
    {
        return $this->renderTemplate(
            $widgetGridHeight,
            $widgetGridWidth,
            $widgetSettings
        );
    }

    private function renderTemplate(
        $widgetGridHeight = [],
        $widgetGridWidth = [],
        $widgetSettings = [],
        $isPreview = false
    )
    {
        $twig = pluginApp(Twig::class);
        $templateData = $this->getTemplateData();
        $templateData["widget"] = [
            "settings" => $widgetSettings,
            "width"    => $widgetGridWidth,
            "height"   => $widgetGridHeight
        ];
        $templateData["isPreview"] = $isPreview;

        return $twig->render($this->template, $templateData);
    }

    /**
     * Get additional data to be passed to the template while rendering
     *
     * @return array
     */
    protected function getTemplateData()
    {
        return [];
    }
}