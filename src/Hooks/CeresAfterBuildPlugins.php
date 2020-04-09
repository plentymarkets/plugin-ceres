<?php

namespace Ceres\Hooks;

use Ceres\Helper\BuildHash;
use Plenty\Modules\Plugin\Events\AfterBuildPlugins;
use Plenty\Modules\ContentCache\Contracts\ContentCacheInvalidationRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\ShopBuilder\Contracts\ContentLinkRepositoryContract;
use Plenty\Modules\ShopBuilder\Models\ContentLink;

class CeresAfterBuildPlugins
{
    public function handle(AfterBuildPlugins $afterBuildPlugins)
    {
        $hasCodeChanges = $afterBuildPlugins->sourceHasChanged('Ceres');
        $hasResourceChanges = $afterBuildPlugins->resourcesHasChanged('Ceres');
        $pluginSet = $afterBuildPlugins->getPluginSet();

        if ($hasCodeChanges || $hasResourceChanges) {
            if ($pluginSet instanceof PluginSet) {
                foreach ($pluginSet->webstores as $webstore) {
                    /** @var ContentCacheInvalidationRepositoryContract $contentCacheInvalidationRepo */
                    $contentCacheInvalidationRepo = pluginApp(ContentCacheInvalidationRepositoryContract::class);
                    $contentCacheInvalidationRepo->invalidateAll($webstore->storeIdentifier);
                }
            }
        }

        if ($hasResourceChanges) {
            BuildHash::unset();
        }

        //deactivate all content links for the deprecated shopbuilder homepage
        /** @var ContentLinkRepositoryContract $contentLinkRepository */
        $contentLinkRepository = pluginApp(ContentLinkRepositoryContract::class);
        $homepageContentLinks = $contentLinkRepository->getContentLinksForContainer(
            'Ceres::Homepage',
            $pluginSet->id,
            null,
            null,
            false
        );
        /** @var ContentLink $homepageContentLink */
        foreach ($homepageContentLinks as $homepageContentLink) {
            $contentLinkRepository->updateContentLink($homepageContentLink->id, ['active' => false]);
        }
    }
}
