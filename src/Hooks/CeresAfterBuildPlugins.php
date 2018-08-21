<?php

namespace Ceres\Hooks;

use Plenty\Modules\Plugin\Events\AfterBuildPlugins;

class CeresAfterBuildPlugins
{
    public function handle(AfterBuildPlugins $afterBuildPlugins)
    {
        $hasCodeChanges = $afterBuildPlugins->sourceHasChanged('Ceres');
        $hasResourceChanges = $afterBuildPlugins->resourcesHasChanged('Ceres');

        if ( $hasCodeChanges || $hasResourceChanges )
        {
            // TODO: Invalidate content cache
        }
    }
}