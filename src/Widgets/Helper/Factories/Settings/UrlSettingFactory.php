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
     * @return UrlSettingFactory
     */
    public function withInternalLinks($internalLinks)
    {
        return $this->withOption('internalLinks', $internalLinks);
    }
}
