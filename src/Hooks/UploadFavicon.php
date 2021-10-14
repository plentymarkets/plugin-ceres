<?php

namespace Ceres\Hooks;

use Plenty\Modules\Plugin\Models\Configuration;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\System\Events\AfterPluginSetAssociated;
use Plenty\Modules\System\Models\Webstore;
use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract;

/**
 * Class UploadFavicon
 *
 * Upload the favicon from the plugin configuration to the internal webstore.
 * This is required to make the favicon available at the frontend domain instead of the cdn domain.
 *
 * @package Ceres\Hooks
 */
class UploadFavicon
{
    public function handle(AfterPluginSetAssociated $event)
    {
        self::upload($event->getPluginSet(), $event->getWebstore());
    }

    /**
     * Search plentyShop LTS configuration inside a given plugin set to read the favicon from.
     * Upload the plugin set to a given webstore or to all assigned webstores of the plugin set.
     *
     * @param PluginSet $pluginSet The plugin set to search for favicon config in.
     * @param Webstore|null $webstore The webstore to upload the favicon for.
     */
    public static function upload(PluginSet $pluginSet, Webstore $webstore = null)
    {
        /** @var PluginSetEntry $pluginSetEntry */
        foreach($pluginSet->pluginSetEntries as $pluginSetEntry) {
            // search for plentyShop LTS plugin
            if($pluginSetEntry->plugin->name === 'Ceres') {
                /** @var Configuration $configuration */
                foreach ($pluginSetEntry->configurations()->getResults() as $configuration) {
                    // search for favicon config
                    if($configuration->key === 'global.favicon' && strlen($configuration->value)) {
                        /** @var WebstoreConfigurationRepositoryContract $webstoreConfigRepository */
                        $webstoreConfigRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);
                        if($webstore instanceof Webstore) {
                            $webstoreConfigRepository->setFaviconFromWebspace($webstore->storeIdentifier, $configuration->value);
                        } else {
                            /** @var Webstore $webstore */
                            foreach($pluginSet->webstores as $webstore) {
                                $webstoreConfigRepository->setFaviconFromWebspace($webstore->storeIdentifier, $configuration->value);
                            }
                        }
                        return;
                    }
                }
            }
        }
    }
}
