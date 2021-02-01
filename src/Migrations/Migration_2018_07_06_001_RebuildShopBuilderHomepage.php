<?php

namespace Ceres\Migrations;

use Plenty\Modules\ShopBuilder\Contracts\ContentLinkRepositoryContract;
use Plenty\Modules\ShopBuilder\Contracts\ContentRepositoryContract;

/**
 * Class RebuildShopBuilderHomepage
 *
 * This migration is used for re-rendering all contents.
 * Migrations are referenced in the 'runOnBuild' section of the plugin.json and run exactly once.
 * @package Ceres\Migrations
 */
class Migration_2018_07_06_001_RebuildShopBuilderHomepage
{
    /**
     * Hook for running the migration.
     */
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
