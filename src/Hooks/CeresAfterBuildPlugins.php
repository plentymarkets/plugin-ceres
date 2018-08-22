<?php

namespace Ceres\Hooks;

use Plenty\Modules\Plugin\Events\AfterBuildPlugins;
use Plenty\Modules\ContentCache\Contracts\ContentCacheInvalidationRepositoryContract;
use Plenty\Plugin\Application;

class CeresAfterBuildPlugins
{
    public function handle(AfterBuildPlugins $afterBuildPlugins)
    {
        $hasCodeChanges = $afterBuildPlugins->sourceHasChanged('Ceres');
        $hasResourceChanges = $afterBuildPlugins->resourcesHasChanged('Ceres');

        if ( $hasCodeChanges || $hasResourceChanges )
        {
            /** @var ContentCacheInvalidationRepositoryContract $contentCacheInvalidationRepo */
            $contentCacheInvalidationRepo = pluginApp(ContentCacheInvalidationRepositoryContract::class);
            $contentCacheInvalidationRepo->invalidateAll(pluginApp(Application::class)->getPlentyId()); // TODO plentyId from event
        }
    }
}