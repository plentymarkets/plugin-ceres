<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\PresetHelper;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Application;

class DefaultHeaderPreset implements ContentPreset
{
    /**
     * Get the widget configurations of the presets to be assigned to the created content.
     *
     * @return mixed
     */

    /** @var PresetWidgetFactory */
    private $topBarWidget;

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

        $companyLogo = $config->header->companyLogo;
        if ( strpos($companyLogo, 'http') !== 0 && strpos($companyLogo, 'layout/') !== 0 )
        {
            /** @var Application $app */
            $app = pluginApp(Application::class);
            $companyLogo = $app->getUrlPath('Ceres') . '/' . $companyLogo;
        }

        $this->topBarWidget->createChild('suggestions', 'Ceres::SearchSuggestionItemWidget')
            ->withSetting('customClass', '');

        $preset->createWidget("Ceres::NavigationWidget")
            ->withSetting("isFixed", $config->header->fixedNavBar)
            ->withSetting("navigationStyle", $config->header->megamenuLevels > 1 ? "megaMenu" : "normal")
            ->withSetting("megaMenuLevels", $config->header->megamenuLevels)
            ->withSetting("megaMenuMaxItems.stage1", $config->header->megamenuItemsStage1)
            ->withSetting("megaMenuMaxItems.stage2", $config->header->megamenuItemsStage2)
            ->withSetting("megaMenuMaxItems.stage3", $config->header->megamenuItemsStage3)
            ->withSetting("companyLogoUrl", $companyLogo)
            ->withSetting('customClass', '');

        $preset->createWidget("Ceres::BreadcrumbWidget")
            ->withSetting("isFixed", false)
            ->withSetting("showOnHomepage", false)
            ->withSetting("showOnMyAccount", false)
            ->withSetting("showOnCheckout", false)
            ->withSetting("showOnContentCategory", false)
            ->withSetting('customClass', '');

        return $preset->toArray();
    }
}