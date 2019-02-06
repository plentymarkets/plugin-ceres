<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

class DefaultCheckoutPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;
    
    /** @var CeresConfig */
    private $ceresConfig;
    
    /** @var Translator */
    private $translator;
    
    /** @var PresetWidgetFactory */
    private $twoColumnWidget;
    
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->translator = pluginApp(Translator::class);
        
        $this->createTwoColumnWidget();
        
        $this->createAddressWidget();
        $this->createShippingProfileWidget();
        $this->createPaymentProviderWidget();
        $this->createContactWishWidget();
        $this->createShippingPrivacyCheckWidget();
        $this->createGtcCheckWidget();
        $this->createBasketWidget();
        $this->createCouponWidget();
        $this->createBasketTotalsWidget();
        $this->createPlaceOrderWidget();
        
        return $this->preset->toArray();
    }
    
    private function createAddressWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::AddressWidget');
    }
    
    private function createBasketTotalsWidget()
    {
        $this->twoColumnWidget->createChild('second','Ceres::BasketTotalsWidget');
    }
    
    private function createBasketWidget()
    {
        $this->twoColumnWidget->createChild('second','Ceres::BasketWidget');
    }
    
    private function createContactWishWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::ContactWishWidget');
    }
    
    private function createCouponWidget()
    {
        $this->twoColumnWidget->createChild('second','Ceres::CouponWidget');
    }
    
    private function createGtcCheckWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::GtcCheckWidget');
    }
    
    private function createPaymentProviderWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::PaymentProviderWidget');
    }
    
    private function createPlaceOrderWidget()
    {
        $this->twoColumnWidget->createChild('second','Ceres::PlaceOrderWidget');
    }
    
    private function createShippingPrivacyCheckWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::ShippingPrivacyCheckWidget');
    }
    
    private function createShippingProfileWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::ShippingProfileWidget');
    }
    
    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'oneToOne'); //TODO checkout grid size
    }
}