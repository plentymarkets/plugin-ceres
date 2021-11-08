<?php

namespace Ceres\Hooks;

use Plenty\Console\Commands\GenerateShopBuilderPresetsEvent;
use Plenty\Modules\ShopBuilder\Contracts\ContentRepositoryContract;
use Plenty\Plugin\ConfigRepository;
use Plenty\Plugin\Translation\Translator;

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
        "IO.routing.category_my-account" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultMyAccountPreset",
            "type" => "content",
            "name" => "Widget.presetMyAccountDefault"
        ],
        "IO.routing.category_search" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\ItemSearchPreset",
            "type" => "content",
            "name" => "Widget.presetItemSearchDefault"
        ],
        "IO.routing.category_login" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultLoginPreset",
            "type" => "content",
            "name" => "Widget.presetLoginDefault"
        ],
        "IO.routing.category_register" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\RegistrationPreset",
            "type" => "content",
            "name" => "Widget.presetContactDefault"
        ],
        "IO.routing.category_confirmation-guest" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultOrderConfirmationPreset",
            "type" => "content",
            "name" => "Widget.presetOrderConfirmationDefault"
        ],
        "IO.routing.category_cancellation-rights" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\Legal\\DefaultCancellationRightsPreset",
            "type" => "content",
            "name" => "Widget.presetCancellationRightsDefault"
        ],
        "IO.routing.category_cancellation-form" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\Legal\\DefaultCancellationFormPreset",
            "type" => "content",
            "name" => "Widget.presetCancellationFormDefault"
        ],
        "IO.routing.category_legal-disclosure" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\Legal\\DefaultLegalDisclosurePreset",
            "type" => "content",
            "name" => "Widget.presetLegalDisclosureDefault"
        ],
        "IO.routing.category_privacy-policy" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\Legal\\DefaultPrivacyPolicyPreset",
            "type" => "content",
            "name" => "Widget.presetPrivacyPolicyDefault"
        ],
        "IO.routing.category_gtc" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\Legal\\DefaultGTCPreset",
            "type" => "content",
            "name" => "Widget.presetGTCDefault"
        ],
        "IO.routing.category_contact" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultContactPreset",
            "type" => "content",
            "name" => "Widget.presetContactDefault"
        ],
        "IO.routing.category_wish-list" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\WishListPreset",
            "type" => "content",
            "name" => "Widget.presetWishList"
        ],
        "IO.routing.category_change-mail" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultChangeMailPreset",
            "type" => "content",
            "name" => "Widget.presetChangeMailDefault"
        ],
        "IO.routing.category_password-reset" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\ChangePasswordPreset",
            "type" => "content",
            "name" => "Widget.presetChangePassword"
        ],
        "IO.routing.category_newsletter-opt-out" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultNewsletterUnsubscribePreset",
            "type" => "content",
            "name" => "Widget.presetNewsletterUnsubscribe"
        ],
        "IO.routing.category_order-return" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\OrderReturnPreset",
            "type" => "content",
            "name" => "Widget.presetOrderReturn"
        ],
        "IO.routing.category_page-not-found" => [
            "presetClass" => "Ceres\\Widgets\\Presets\\DefaultPageNotFoundPreset",
            "type" => "content",
            "name" => "Widget.presetPageNotFound"
        ]
    ];

    public function handle(GenerateShopBuilderPresetsEvent $event)
    {
        self::generatePresets($event);
    }

    public static function generatePresets(GenerateShopBuilderPresetsEvent $event)
    {
        $translator = pluginApp(Translator::class);
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
            "dataProviderName" => $translator->trans("Ceres::{$configData['name']}"),
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
