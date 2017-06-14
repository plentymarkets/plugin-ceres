<?php
namespace Ceres\Caching;

use IO\Services\ContentCaching\Contracts\CachingSettings;

/**
 * Created by ptopczewski, 14.06.17 16:01
 * Class HomepageCacheSettings
 * @package Ceres\Caching
 */
class HomepageCacheSettings implements CachingSettings
{

    /**
     * @return bool
     */
    public function containsItems(): bool
    {
        return true;
    }

    /**
     * @return string
     */
    public function getIdentifier(): string
    {
        return 'foobar';
    }
}