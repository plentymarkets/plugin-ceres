<?php

namespace Ceres\Hooks;

use Plenty\Console\Commands\GenerateShopBuilderPresetsEvent;
use Plenty\Modules\ShopBuilder\Contracts\ContentRepositoryContract;
use Plenty\Plugin\ConfigRepository;

/**
 *
 * @package Ceres\Hooks
 */
class GenerateShopBuilderPresets
{
    private static $configKeys = [
        "IO.routing.category_home" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultHomepagePreset",
            "type" => "content",
            "name" => "Widget.presetHomepageDefault"
        ],
        "IO.routing.category_basket" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultBasketPreset",
            "type" => "content",
            "name" => "Widget.presetBasketDefault"
        ],
        "IO.routing.category_checkout" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultCheckoutPreset",
            "type" => "content",
            "name" => "Widget.presetBasketDefault"
        ],
        "IO.routing.category_my-account" => "Ceres\\Widgets\\Presets\\DefaultMyAccountPreset",
        "IO.routing.category_search" => "Ceres\\Widgets\\Presets\\ItemSearchPreset",
        "IO.routing.category_login" => "Ceres\\Widgets\\Presets\\DefaultLoginPreset",
        "IO.routing.category_register" => "Ceres\\Widgets\\Presets\\RegistrationPreset",
        "IO.routing.category_confirmation" => "Ceres\\Widgets\\Presets\\DefaultOrderConfirmationPreset",
        "IO.routing.category_confirmation-guest" => "Ceres\\Widgets\\Presets\\DefaultOrderConfirmationPreset",
        "IO.routing.category_cancellation-rights" => "Ceres\\Widgets\\Presets\\Legal\\DefaultCancellationRightsPreset",
        "IO.routing.category_cancellation-form" => "Ceres\\Widgets\\Presets\\Legal\\DefaultCancellationFormPreset",
        "IO.routing.category_legal-disclosure" => "Ceres\\Widgets\\Presets\\Legal\\DefaultLegalDisclosurePreset",
        "IO.routing.category_privacy-policy" => "Ceres\\Widgets\\Presets\\Legal\\DefaultPrivacyPolicyPreset",
        "IO.routing.category_gtc" => "Ceres\\Widgets\\Presets\\Legal\\DefaultGTCPreset",
        "IO.routing.category_contact" => "Ceres\\Widgets\\Presets\\DefaultContactPreset",
        "IO.routing.category_wish-list" => "Ceres\\Widgets\\Presets\\WishListPreset",
        "IO.routing.category_change-mail" => "Ceres\\Widgets\\Presets\\DefaultChangeMailPreset",
        "IO.routing.category_password-reset" => "Ceres\\Widgets\\Presets\\ChangePasswordPreset",
        "IO.routing.category_newsletter-opt-out" => "Ceres\\Widgets\\Presets\\DefaultNewsletterUnsubscribePreset",
        "IO.routing.category_order-return" => "Ceres\\Widgets\\Presets\\OrderReturnPreset",
        "IO.routing.category_page-not-found" => "Ceres\\Widgets\\Presets\\DefaultPageNotFoundPreset",
    ];

    public function handle(GenerateShopBuilderPresetsEvent $event)
    {
        self::generatePresets($event);
    }

    public static function generatePresets(GenerateShopBuilderPresetsEvent $event)
    {
        /** @var ConfigRepository $config */
        $config = pluginApp(ConfigRepository::class);
        /** @var ContentRepositoryContract $contentRepository */
        $contentRepository = pluginApp(ContentRepositoryContract::class);

//        foreach (self::$configKeys as $configKey => $presetClass) {
//            $categoryId = $config->get($configKey);
//            echo "$categoryId, $presetClass\n";
//
//            /** @var ContentRepositoryContract $contentRepository */
//            $contentRepository = pluginApp(ContentRepositoryContract::class);
//
//            $contentRepository->createContent($event->getPluginSet()->id, [], 'de');
//        }

        $configData = self::$configKeys["IO.routing.category_checkout"];
        $catId = $config->get("IO.routing.category_checkout");
        if (!$catId) {
            echo "no catid";
            return;
        }
        $data = [
            "presetClass" => $configData["presetClass"],
            "dataProviderName" => $configData["name"], // translation service
            "type" => $configData["type"],
            "link" => [
                "containerName" => "ShopBuilder::Category.$catId",
                "pluginSetId" => $event->getPluginSet()->id,
                "language" => "de",
                "active" => true
            ]
        ];

        echo json_encode($data) . "\n";
        $contentRepository->createContent($event->getPluginSet()->id, $data, 'de');

        echo "generate config \n";
    }
}
