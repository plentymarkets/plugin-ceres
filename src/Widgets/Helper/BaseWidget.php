<?php

namespace Ceres\Widgets\Helper;

use Plenty\Modules\ShopBuilder\Contracts\BaseWidget as InternalBaseWidget;
use Plenty\Plugin\Log\Loggable;

class BaseWidget extends InternalBaseWidget
{
    use Loggable;

    protected $template = "";

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

    public function getTemplate()
    {
        return $this->template;
    }

    public function getData()
    {
        return [];
    }

    public function getSettings()
    {
        return [];
    }

    protected function renderTemplate(
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

        $rendered = parent::renderTemplate($widgetSettings, $children, $isPreview);

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
        $templateData = parent::getTemplateData($widgetSettings, $isPreview);
        $templateData['TOOLBAR_LAYOUT'] = self::TOOLBAR_LAYOUT;
        return $templateData;
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
