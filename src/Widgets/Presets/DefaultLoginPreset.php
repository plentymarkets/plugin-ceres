<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use IO\Extensions\Constants\ShopUrls;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

class DefaultLoginPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var PresetHelper */
    private $structurWidget;

    /** @var ShopUrls */
    private $shopUrls;

    /** @var Translator */
    private $translator;
    
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->translator = pluginApp(Translator::class);
        
        $this->shopUrls = pluginApp(ShopUrls::class);
        
        $this->createThreeColumnWidget();

        $this->createLoginWidget();
        $this->createSeparatorWidget();
        $this->createGuestLoginWidget();
        $this->createTextWidget();
        $this->createRegisterLinkWidget();
        
        return $this->preset->toArray();
    }
    
    private function createThreeColumnWidget()
    {
        $this->structurWidget = $this->preset->createWidget("Ceres::ThreeColumnWidget")
                                             ->withSetting("layout", "oneToTwoToOne");
    }

    private function createLoginWidget()
    {
        $this->structurWidget->createChild("second", "Ceres::LoginWidget")
        ->withSetting("customClass","");
    }

    private function createSeparatorWidget()
    {
        $this->structurWidget->createChild("second", "Ceres::SeparatorWidget")
        ->withSetting("customClass","");
    }

    private function createGuestLoginWidget()
    {
        $this->structurWidget->createChild("second", "Ceres::GuestLoginWidget");
    }

    private function createTextWidget()
    {
        $this->structurWidget->createChild("second", "Ceres::InlineTextWidget")
                             ->withSetting("text", "<h1 class=\"h2\">{{ trans(\"Ceres::Template.loginCallToAction\") }}</h1>")
                             ->withSetting("appearance", "none")
                             ->withSetting("spacing.customPadding", true)
                             ->withSetting("spacing.padding.top.value", 0)
                             ->withSetting("spacing.padding.top.unit", null)
                             ->withSetting("spacing.padding.bottom.value", 0)
                             ->withSetting("spacing.padding.bottom.unit", null)
                             ->withSetting("spacing.padding.left.value", 0)
                             ->withSetting("spacing.padding.left.unit", null)
                             ->withSetting("spacing.customMargin", true)
                             ->withSetting("spacing.margin.bottom.value", 0)
                             ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function createRegisterLinkWidget()
    {
        $this->structurWidget->createChild("second", "Ceres::LinkWidget")
                             ->withSetting("customClass","")
                             ->withSetting("block", "true")
                             ->withSetting("text", $this->translator->trans("Ceres::Template.loginRegister"))
                             ->withSetting("url.type", "external")
                             ->withSetting("url.value", $this->shopUrls->registration);
    }
}