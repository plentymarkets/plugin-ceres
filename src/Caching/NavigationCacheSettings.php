<?php
namespace Ceres\Caching;

use IO\Services\ContentCaching\Contracts\CachingSettings;

/**
 * Created by ptopczewski, 16.06.17 11:26
 * Class NavigationCacheSettings
 * @package Ceres\Caching
 */
class NavigationCacheSettings implements CachingSettings
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