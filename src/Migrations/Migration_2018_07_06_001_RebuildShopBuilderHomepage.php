<?php

namespace Ceres\Migrations;

use IO\Services\WebstoreConfigurationService;
use Plenty\Modules\Plugin\Models\Plugin;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\ShopBuilder\Contracts\ContentLinkRepositoryContract;
use Plenty\Modules\ShopBuilder\Contracts\ContentRepositoryContract;
use Plenty\Modules\System\Module\Contracts\PlentyModuleRepositoryContract;

/**
 * Class RebuildShopBuilderHomepage
 * @package Ceres\Migrations
 */
class Migration_2018_07_06_001_RebuildShopBuilderHomepage
{
    public function run()
    {
        $pluginSetId = pluginSetId();

        /** @var ContentRepositoryContract $contentRepository */
        $contentRepository = pluginApp( ContentRepositoryContract::class );

        /** @var ContentLinkRepositoryContract $contentLinkRepository */
        $contentLinkRepository = pluginApp( ContentLinkRepositoryContract::class );

        $contentLinks = $contentLinkRepository->getContentLinks( $pluginSetId );
        foreach( $contentLinks as $contentLink )
        {
            $content = $contentRepository->getContent( $contentLink->contentId );
            $contentRepository->updateContent(
                $pluginSetId,
                $content->id,
                [
                    'widgets' => $content->widgets
                ]
            );
        }
    }
}