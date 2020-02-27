<?php

namespace Ceres\Migrations;

use Plenty\Modules\ShopBuilder\Contracts\ContentLinkRepositoryContract;
use Plenty\Modules\ShopBuilder\Contracts\ContentRepositoryContract;

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
