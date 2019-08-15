<?php

namespace Ceres\Hooks;

use Ceres\Helper\BuildHash;
use Plenty\Modules\Plugin\Events\AfterBuildPlugins;
use Plenty\Modules\ContentCache\Contracts\ContentCacheInvalidationRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;

class CeresAfterBuildPlugins
{
    public function handle(AfterBuildPlugins $afterBuildPlugins)
    {
        $hasCodeChanges = $afterBuildPlugins->sourceHasChanged('Ceres');
        $hasResourceChanges = $afterBuildPlugins->resourcesHasChanged('Ceres');

        if ( $hasCodeChanges || $hasResourceChanges )
        {
            $pluginSet = $afterBuildPlugins->getPluginSet();
            if($pluginSet instanceof PluginSet)
            {
                foreach($pluginSet->webstores as $webstore)
                {
                    /** @var ContentCacheInvalidationRepositoryContract $contentCacheInvalidationRepo */
                    $contentCacheInvalidationRepo = pluginApp(ContentCacheInvalidationRepositoryContract::class);
                    $contentCacheInvalidationRepo->invalidateAll($webstore->storeIdentifier);
                }
            }
        }

        if ( $hasResourceChanges )
        {
            BuildHash::unset();
        }
    }
}