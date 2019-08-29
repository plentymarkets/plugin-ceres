<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

class DefaultCheckoutPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;
    
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        
        $this->createThreeColumnWidgets();

        $this->createLoginWidget();
        $this->createSeparatorWidget();
        $this->createGuestLoginWidget();
        $this->createRegisterLinkWidget();
        
        return $this->preset->toArray();
    }
    
    private function createThreeColumnWidget()
    {
        $row_1 = $this->preset->createWidget("Ceres::ThreeColumnWidget")
                              ->withSetting("layout", "oneToTwoToOne");
    }

    private function createLoginWidget()
    {
        $row_1->createChild("second", "Ceres::LoginWidget");
    }

    private function createSeparatorWidget()
    {
        $row_1->createChild("second", "Ceres::SeparatorWidget");
    }

    private function createGuestLoginWidget()
    {
        $row_1->createChild("second", "Ceres::GuestLoginWidget");
    }

    private function createRegisterLinkWidget()
    {
        $row_1->createChild("second", "Ceres::LinkWidget");
    }
}