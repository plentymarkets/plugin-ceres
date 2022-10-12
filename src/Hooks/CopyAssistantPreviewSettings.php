<?php

namespace Ceres\Hooks;

use Ceres\Wizard\ShopWizard\Models\ShopWizardPreviewConfiguration;
use Ceres\Wizard\ShopWizard\Repositories\ShopWizardConfigRepository;
use Plenty\Modules\Plugin\Events\CopyPluginSet;

/**
 * Class CopyAssistantPreviewSettings
 *
 * This class is a hook, which runs after a plugin set has been copied.
 * It handles the creation of the assistant preview settings for the new plugin set according to the source plugin set.
 * @package Ceres\Hooks
 */
class CopyAssistantPreviewSettings
{
    /**
     * Handler function for the CopyPluginSet event.
     * @param CopyPluginSet $copyPluginSetEvent The event thrown after a plugin set has been copied
     */
    public function handle(CopyPluginSet $copyPluginSetEvent)
    {
        $sourcePluginSetId = $copyPluginSetEvent->getSourcePluginSetId();
        $targetPluginSetId = $copyPluginSetEvent->getTargetPluginSetId();

        /** @var ShopWizardConfigRepository $previewConfigRepo */
        $previewConfigRepository = pluginApp(ShopWizardConfigRepository::class);

        $sourceConfigs = $previewConfigRepository->getConfigsForPluginSet($sourcePluginSetId);

        /** @var ShopWizardPreviewConfiguration $sourceConfig */
        foreach ($sourceConfigs as $sourceConfig) {
            $previewConfigRepository->createConfig([
                'pluginSetId' => $targetPluginSetId,
                'webstoreId'  => $sourceConfig->webstoreId,
                'deleted'     => $sourceConfig->deleted
            ]);
        }
    }
}
