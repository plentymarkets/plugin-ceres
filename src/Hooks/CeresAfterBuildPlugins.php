<?php

namespace Ceres\Hooks;

use Ceres\Helper\BuildHash;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\Events\AfterBuildPlugins;
use Plenty\Modules\ContentCache\Contracts\ContentCacheInvalidationRepositoryContract;
use Plenty\Modules\Plugin\Models\Configuration;
use Plenty\Modules\Plugin\Models\Plugin;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\ShopBuilder\Contracts\ContentLinkRepositoryContract;
use Plenty\Modules\ShopBuilder\Models\ContentLink;
use Plenty\Modules\System\Models\Webstore;
use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract;

/**
 * Class CeresAfterBuildPlugins
 *
 * This class is a hook, which runs after the plugin build.
 * It handles the invalidation of the content cache, the generation of a new build hash and the deactivation for deprecated content links.
 * @package Ceres\Hooks
 */
class CeresAfterBuildPlugins
{
    /**
     * Handler function for the AfterBuildPlugins event.
     * @param AfterBuildPlugins $afterBuildPlugins The event thrown after the plugins have been built
     */
    public function handle(AfterBuildPlugins $afterBuildPlugins)
    {
        $pluginSet = $afterBuildPlugins->getPluginSet();

        if ($pluginSet instanceof PluginSet) {
            foreach ($pluginSet->webstores as $webstore) {
                /** @var ContentCacheInvalidationRepositoryContract $contentCacheInvalidationRepo */
                $contentCacheInvalidationRepo = pluginApp(ContentCacheInvalidationRepositoryContract::class);
                $contentCacheInvalidationRepo->invalidateAll($webstore->storeIdentifier);
            }
        }

        // cache busting for js and css files
        BuildHash::unset();

        // deactivate all content links for the deprecated shopbuilder homepage
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

        // Upload favicon from plugin config to internal storage for all linked webstores
        if(count($pluginSet->webstores)) {
            UploadFavicon::upload($pluginSet);
        }
    }
}
