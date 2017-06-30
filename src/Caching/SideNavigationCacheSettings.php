<?php
namespace Ceres\Caching;

use IO\Services\ContentCaching\Contracts\CachingSettings;

/**
 * Created by lmatzen, 29.06.17
 * Class SideNavigationCacheSettings
 * @package Ceres\Caching
 */
class SideNavigationCacheSettings implements CachingSettings
{

    /**
     * @return bool
     */
    public function containsItems(): bool
    {
        return false;
    }

    /**
     * @return array
     */
    public function getData(): array
    {
        return [];
    }
}