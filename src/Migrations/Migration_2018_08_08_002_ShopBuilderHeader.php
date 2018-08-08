<?php

namespace Ceres\Migrations;

use IO\Services\WebstoreConfigurationService;
use Plenty\Modules\Plugin\Models\Plugin;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\ShopBuilder\Contracts\ContentLinkRepositoryContract;
use Plenty\Modules\ShopBuilder\Contracts\ContentRepositoryContract;
use Plenty\Modules\ShopBuilder\Models\Content;
use Plenty\Modules\System\Module\Contracts\PlentyModuleRepositoryContract;

/**
 * Class Migration_2018_08_08_002_ShopBuilderHeader
 * @package Ceres\Migrations
 */
class Migration_2018_08_08_002_ShopBuilderHeader
{
    public function run()
    {
        /** @var ContentRepositoryContract $contentRepository */
        $contentRepository = pluginApp(ContentRepositoryContract::class);

        /** @var ContentLinkRepositoryContract $contentLinkRepository */
        $contentLinkRepository = pluginApp(ContentLinkRepositoryContract::class);


        $widgets = [];

        /** @var Content $content */
        $content = $contentRepository->createContent(
            pluginSetId(),
            [
                'dataProviderName'  => 'Ceres Header',
                'type'              => 'header',
                'widgets'           => $widgets
            ]
        );

        $contentLinkRepository->createContentLink([
            'contentId'         => $content->id,
            'containerName'     => 'Ceres::Header',
            'language'          => '',
            'pluginSetId'       => pluginSetId(),
            'active'            => false
        ]);
    }
}