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
    
    /** @var CeresConfig */
    private $ceresConfig;
    
    /** @var PresetWidgetFactory */
    private $twoColumnWidget;
    
    /** @var PresetWidgetFactory */
    private $stickyContainer;
    
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);
        
        $this->createHeadline();
        
        $this->createTwoColumnWidget();
        
        $this->createAddressWidget('1');
        $this->createAddressWidget('2');
        $this->createShippingProfileWidget();
        $this->createPaymentProviderWidget();
        $this->createContactWishWidget();
        $this->createShippingPrivacyCheckWidget();
        $this->createGtcCheckWidget();
        $this->createAsteriks();
        $this->createBasketWidget();
        $this->createSeparatorWidget('second');
        $this->createCouponWidget();
        $this->createSeparatorWidget('second');
        $this->createStickyContainer();
        $this->createBasketTotalsWidget();
        $this->createPlaceOrderWidget();
        
        return $this->preset->toArray();
    }
    
    private function createAddressWidget($type = '1')
    {
        $addressWidget = $this->twoColumnWidget->createChild('first','Ceres::AddressWidget')->withSetting('addressType', $type);
        
        if($type == '1')
        {
            $addressWidget
                ->withSetting('addressFieldsInvoiceDE', $this->ceresConfig->addresses->billingAddressShow)
                ->withSetting('addressRequiredFieldsInvoiceDE', $this->ceresConfig->addresses->billingAddressRequire)
                ->withSetting('addressFieldsInvoiceGB', $this->ceresConfig->addresses->billingAddressShow_en)
                ->withSetting('addressRequiredFieldsInvoiceGB', $this->ceresConfig->addresses->billingAddressRequire_en);
        }
        elseif($type == '2')
        {
            $addressWidget
                ->withSetting('addressFieldsShippingDE', $this->ceresConfig->addresses->deliveryAddressShow)
                ->withSetting('addressRequiredFieldsShippingDE', $this->ceresConfig->addresses->deliveryAddressRequire)
                ->withSetting('addressFieldsShippingGB', $this->ceresConfig->addresses->deliveryAddressShow_en)
                ->withSetting('addressRequiredFieldsShippingGB', $this->ceresConfig->addresses->deliveryAddressRequire_en);
        }
        
        
    }
    
    private function createBasketTotalsWidget()
    {
        $this->stickyContainer->createChild('sticky','Ceres::BasketTotalsWidget')
            ->withSetting('visibleFields', ["basketValueNet", "basketValueGross", "rebate", "shippingCostsNet", "shippingCostsGross", "totalSumNet", "coupon", "vats", "totalSumGross", "couponDiscount", "openAmount"]);
    }
    
    private function createBasketWidget()
    {
        $this->twoColumnWidget->createChild('second','Ceres::BasketWidget')
            ->withSetting('appearance', 'primary');
    }
    
    private function createContactWishWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::ContactWishWidget')
            ->withSetting('hintText', '');
    }
    
    private function createCouponWidget()
    {
        $this->twoColumnWidget->createChild('second','Ceres::CouponWidget')
            ->withSetting('appearance', 'primary');
    }
    
    private function createGtcCheckWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::GtcCheckWidget')
            ->withSetting('isPreselected', false)
            ->withSetting('isRequired', true);
    }
    
    private function createPaymentProviderWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::PaymentProviderWidget')
            ->withSetting('hintText', '');
    }
    
    private function createPlaceOrderWidget()
    {
        $this->stickyContainer->createChild('sticky','Ceres::PlaceOrderWidget')
            ->withSetting('buttonSize', '');
    }
    
    private function createShippingPrivacyCheckWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::ShippingPrivacyCheckWidget');
    }
    
    private function createShippingProfileWidget()
    {
        $this->twoColumnWidget->createChild('first','Ceres::ShippingProfileWidget')
            ->withSetting('hintText', '');
    }
    
    private function createAsteriks()
    {
        $text = '&#42;)&nbsp;{{ trans("Ceres::Template.contactRequiredField") }}';
        $this->twoColumnWidget->createChild('first','Ceres::TextWidget')
                              ->withSetting("text", $text)
                              ->withSetting("appearance", "none");
    }
    
    private function createHeadline()
    {
        $text = '<h1 class="h2">{{ trans("Ceres::Template.checkout") }}</h1>';
        $this->preset->createWidget('Ceres::TextWidget')
                              ->withSetting("text", $text)
                              ->withSetting("appearance", "none");
        
        $this->preset->createWidget('Ceres::SeparatorWidget')
            ->withSetting('margin', 'auto');
    }
    
    private function createSeparatorWidget($dropZone = 'first')
    {
        $this->twoColumnWidget->createChild($dropZone, 'Ceres::SeparatorWidget')
            ->withSetting('margin', 'auto');
    }
    
    private function createStickyContainer()
    {
        $this->stickyContainer = $this->twoColumnWidget->createChild('second', 'Ceres::StickyContainerWidget');
    }
    
    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'sevenToFive');
    }
}