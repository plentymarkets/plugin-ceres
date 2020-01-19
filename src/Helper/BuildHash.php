<?php

namespace Ceres\Helper;

use Plenty\Plugin\CachingRepository;

/**
 * Class BuildHash
 * Helper to store build dependent hash for cache busting.
 *
 * @package Ceres\Helper
 */
class BuildHash
{
    /**
     * Get the current build hash.
     *
     * @return string
     */
    public static function get()
    {
        /** @var CachingRepository $cache */
        $cache = pluginApp(CachingRepository::class);
        $hash = $cache->remember(
            self::class,
            (60 * 24 * 100),
            function() {
                return sha1(microtime(true));
            }
        );
        return $hash;
    }

    /**
     * Unset the current build hash. New hash will be generated on next read request.
     */
    public static function unset()
    {
        /** @var CachingRepository $cache */
        $cache = pluginApp(CachingRepository::class);
        $cache->forget(self::class);
    }
}