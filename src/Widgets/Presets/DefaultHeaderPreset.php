<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\PresetHelper;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Application;

/**
 * Class DefaultHeaderPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a default header. It contains:
 * - TopBarWidget
 * - SearchSuggestionItemWidget
 * - NavigationWidget
 * - BreadcrumbWidget
 *
 * @package Ceres\Widgets\Presets
 */
class DefaultHeaderPreset implements ContentPreset
{
    /** @var PresetWidgetFactory */
    private $topBarWidget;
    
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        /** @var CeresConfig $config */
        $config = pluginApp(CeresConfig::class);

        /** @var PresetHelper $preset */
        $preset = pluginApp(PresetHelper::class);

        $this->topBarWidget = $preset->createWidget("Ceres::TopBarWidget")
            ->withSetting("isFixed", $config->header->fixedNavBar)
            ->withSetting("searchStyle", "onDemand")
            ->withSetting("enableLogin", true)
            ->withSetting("enableRegistration", true)
            ->withSetting("enableLanguageSelect", true)
            ->withSetting("enableShippingCountrySelect", true)
            ->withSetting("enableCurrencySelect", true)
            ->withSetting("enableWishList", true)
            ->withSetting("enableBasketPreview", true)
            ->withSetting("basketValues", $config->header->basketValues)
            ->withSetting("showItemImages", false)
            ->withSetting("forwardToSingleItem", $config->search->forwardToSingleItem)
            ->withSetting('customClass', '');

        $this->topBarWidget->createChild('suggestions', 'Ceres::SearchSuggestionItemWidget')
            ->withSetting('customClass', '');

        $preset->createWidget("Ceres::NavigationWidget")
            ->withSetting("isFixed", $config->header->fixedNavBar)
            ->withSetting("navigationStyle", $config->header->megamenuLevels > 1 ? "megaMenu" : "normal")
            ->withSetting("megaMenuLevels", $config->header->megamenuLevels)
            ->withSetting("megaMenuMaxItems.stage1", $config->header->megamenuItemsStage1)
            ->withSetting("megaMenuMaxItems.stage2", $config->header->megamenuItemsStage2)
            ->withSetting("megaMenuMaxItems.stage3", $config->header->megamenuItemsStage3)
            ->withSetting("companyLogoUrl", $config->header->companyLogo)
            ->withSetting('customClass', '');

        $preset->createWidget("Ceres::BreadcrumbWidget")
            ->withSetting("isFixed", false)
            ->withSetting("showOnHomepage", false)
            ->withSetting("showOnMyAccount", false)
            ->withSetting("showOnCheckout", false)
            ->withSetting("showOnContentCategory", false)
            ->withSetting("showOnLegalPages", false)
            ->withSetting('customClass', '');

        return $preset->toArray();
    }
}
