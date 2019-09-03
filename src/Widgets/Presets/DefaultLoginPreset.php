<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

class DefaultLoginPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var PresetHelper */
    private $structurWidget;
    
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        
        $this->createThreeColumnWidget();

        $this->createLoginWidget();
        $this->createSeparatorWidget();
        $this->createGuestLoginWidget();
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
        $this->structurWidget->createChild("second", "Ceres::LoginWidget");
    }

    private function createSeparatorWidget()
    {
        $this->structurWidget->createChild("second", "Ceres::SeparatorWidget");
    }

    private function createGuestLoginWidget()
    {
        $this->structurWidget->createChild("second", "Ceres::GuestLoginWidget");
    }

    private function createRegisterLinkWidget()
    {
        $this->structurWidget->createChild("second", "Ceres::LinkWidget");
    }
}