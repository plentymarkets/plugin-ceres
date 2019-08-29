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
    
    /** @var PresetWidgetFactory */
    private $twoColumnWidget;
    
    /** @var PresetWidgetFactory */
    private $stickyContainer;
    
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        
        $this->createLoginWidget();
        $this->createGuestLoginWidget();
        $this->createRegisterLinkWidget();
        
        return $this->preset->toArray();
    }
    
    private function createLoginWidget()
    {
        $this->preset->createWidget('Ceres::LoginWidget');
    }

    private function createGuestLoginWidget()
    {
        $this->preset->createWidget('Ceres::GuestLoginWidget')
    }

    private function createRegisterLinkWidget()
    {
        $this->preset->createWidget('Ceres::LinkWidget');
    }
}