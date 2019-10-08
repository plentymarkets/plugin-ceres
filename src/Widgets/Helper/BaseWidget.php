<?php

namespace Ceres\Widgets\Helper;

use Plenty\Modules\ShopBuilder\Contracts\Widget;
use Plenty\Plugin\Templates\Twig;
use Plenty\Plugin\Log\Loggable;

class BaseWidget implements Widget
{
    use Loggable;

    const TOOLBAR_LAYOUT = [
        "NONE"   => "",
        "INLINE" => "bold,italic,underline,strike|h1,h2,h3|align|translation",
        "ALL"    => "bold,italic,underline,strike|headline|link|align,ul,ol|color,background|translation"
    ];

    public static $mapTypeToTemplate = [
        'singleitem'    => 'tpl.item',
        'content'       => 'tpl.category',
        'myaccount'     => 'tpl.my-account',
        'checkout'      => 'tpl.checkout'
    ];

    /**
     * The template to be used for this widget
     *
     * @var string
     */
    protected $template = "";

    /**
     * @var Twig $twig
     */
    protected $twig = null;

    public function __construct(Twig $twig)
    {
        $this->twig = $twig;
    }

    /**
     * Get the html representation of the widget.
     *
     * @param array $widgetSettings
     * @param array $children
     *
     * @return string
     */
    public function getPreview(
        array $widgetSettings = [],
        array $children = []
    ): string
    {
        $template = $this->renderTemplate(
            $widgetSettings,
            $children,
            true
        );

        try
        {
            $previewData = $this->getPreviewData($widgetSettings);
            return $this->twig->renderString($template, $previewData);
        }
        catch(\Exception $e)
        {
            $this->getLogger(__METHOD__)->error("twig_preview_exception", [
                'message' => $e->getMessage()
            ]);

            return "";
        }
    }

    /**
     * Render the template of the widget.
     * Returns a twig-template which will be included in the frontend
     * or rendered again for generating the preview
     *
     * @param array $widgetSettings
     * @param array $children
     *
     * @return string
     */
    public function render(
        array $widgetSettings = [],
        array $children = []
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
        $template = '';
        if(isset($widgetSettings['template']))
        {
            $template = self::$mapTypeToTemplate[$widgetSettings['template']] ?? '';
            unset($widgetSettings['template']);
        }

        $templateData = $this->getTemplateData($widgetSettings, $isPreview);

        $templateData["widget"] = [
            "settings"      => $widgetSettings
        ];
        $templateData["children"]  = $children;
        $templateData["isPreview"] = $isPreview;
        $templateData["TOOLBAR_LAYOUT"] = self::TOOLBAR_LAYOUT;

        try
        {
            $rendered = $this->twig->render($this->template, $templateData);
        }
        catch(\Exception $e)
        {
            // Twig_Errors (Syntax or Runtime)
            $this->getLogger(__METHOD__)->error("twig_render_exception",
                [
                    'message' => $e->getMessage()
                ]);

            return "";
        }

        if($isPreview && strlen($template))
        {
            $rendered = '{{ services.template.setCurrentTemplate("'. $template .'") }}'. $rendered;
        }

        return $rendered;
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

    /**
     * Get additional data to be passed to the template while rendering the preview markup
     *
     * @param $widgetSettings
     * @return array
     */
    protected function getPreviewData($widgetSettings)
    {
        return [];
    }

    protected function mockPaginatedResult( \Closure $factory, $itemsPerPage = 10, $currentPage = 1, $pages = 5 )
    {
        $entries = [];
        for( $i = 0; $i < $itemsPerPage; $i++ )
        {
            $entries[] = $factory->call($this, $i);
        }

        return [
            "page" => $currentPage,
            "firstOnPage" => (($currentPage - 1) * $itemsPerPage) + 1,
            "lastOnPage" => $currentPage * $itemsPerPage,
            "totalsCount" => $pages * $itemsPerPage,
            "lastPageNumber" => $pages,
            "entries" => $entries
        ];
    }
}
