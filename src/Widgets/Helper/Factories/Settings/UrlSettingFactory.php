<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class UrlSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('url');
    }

    /**
     * @param array $internalLinks
     */
    public function withInternalLinks($internalLinks)
    {
        $this->withOption('internalLinks', $internalLinks);
    }

}
