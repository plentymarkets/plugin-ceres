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
     * @param array $widgetSettings
     *
     * @return string
     */
    public function getPreview(
        $widgetSettings = [],
        $children = []
    ): string
    {
        $twig = pluginApp(Twig::class);
        $template = $this->renderTemplate(
            $widgetSettings,
            $children,
            true
        );

        return $twig->renderString($template);
    }

    /**
     * Render the template of the widget.
     * Returns a twig-template which will be included in the frontend
     * or rendered again for generating the preview
     *
     * @param array $widgetSettings
     *
     * @return string
     */
    public function render(
        $widgetSettings = [],
        $children = []
    ): string
    {
        return $this->renderTemplate(
            $widgetSettings,
            $children
        );
    }

    private function renderTemplate(
        $widgetSettings = [],
        $children = [],
        $isPreview = false
    )
    {
        $twig = pluginApp(Twig::class);
        $templateData = $this->getTemplateData($widgetSettings, $isPreview);
        $templateData["widget"] = [
            "settings" => $widgetSettings
        ];
        $templateData["children"]  = $children;
        $templateData["isPreview"] = $isPreview;

        return $twig->render($this->template, $templateData);
    }

    /**
     * Get additional data to be passed to the template while rendering
     *
     * @param $widgetSettings
     * @param $isPreview
     * @return array
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return [];
    }
}