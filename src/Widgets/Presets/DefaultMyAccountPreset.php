<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Ceres\Widgets\Presets\Helper\HasWhiteBackground;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

/**
 * Class DefaultMyAccountPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page where customers can view and interact with their contact data, orders, and returns. It contains:
 * - TwoColumnWidget
 * - BackgroundWidget
 * - SeparatorWidget
 * - GreetingWidget
 * - AddressWidget
 * - LogoutButtonWidget
 * - AccountSettingsWidget
 * - BankDataSelectWidget
 * - OrderHistoryWidget
 * - OrderReturnHistoryWidget
 * - InlineTextWidget
 *
 * @package Ceres\Widgets\Presets
 */
class DefaultMyAccountPreset implements ContentPreset
{
    use HasWhiteBackground;

    /** @var PresetHelper */
    private $preset;
    
    /** @var CeresConfig */
    private $ceresConfig;
    
    /** @var PresetWidgetFactory */
    private $twoColumnWidgetTop;
    
    /** @var PresetWidgetFactory */
    private $twoColumnWidgetAddresses;
    
    /** @var PresetWidgetFactory */
    private $twoColumnWidgetAccountSettings;
    
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);

        $this->createBackground($this->preset);
        
        $this->createHeadline();
        
        $this->createTwoColumnWidgetAddresses();
        $this->createAddressWidget('1');
        $this->createAddressWidget('2');
        
        $this->createTwoColumnWidgetAccountSettings();
        $this->createAccountSettingsWidget();
        $this->createBankDataSelectWidget();
        
        $this->createOrderHistoryWidget();
        $this->createOrderReturnHistoryWidget();
        
        return $this->preset->toArray();
    }
    
    private function createHeadline()
    {
        $text = '<h1 class="h2">{{ trans("Ceres::Template.myAccount") }}</h1>';
        $this->createWidget('Ceres::InlineTextWidget')
                     ->withSetting("text", $text)
                     ->withSetting("appearance", "none")
                     ->withSetting("customPadding", true)
                     ->withSetting("padding.top.value", 4)
                     ->withSetting("padding.top.unit", null)
                     ->withSetting("padding.bottom.value", 2)
                     ->withSetting("padding.bottom.unit", null)
                     ->withSetting("customMargin", true)
                     ->withSetting("margin.bottom.value", 0)
                     ->withSetting("margin.bottom.unit", null);

        $this->createTwoColumnWidgetTop();
        $this->createGreetingWidget();
        $this->createLogoutButtonWidget();

        $this->createWidget('Ceres::SeparatorWidget')
                     ->withSetting('margin.top', 'auto')
                     ->withSetting('margin.bottom', 'auto');
    }
    
    private function createGreetingWidget()
    {
        $this->twoColumnWidgetTop->createChild('first', 'Ceres::GreetingWidget')
            ->withSetting('salutation', 'firstname_surname');
    }
    
    private function createLogoutButtonWidget()
    {
        $this->twoColumnWidgetTop->createChild('second', 'Ceres::LogoutButtonWidget');
    }
    
    private function createAddressWidget($type = '1')
    {
        if($type == '1')
        {
            $this->twoColumnWidgetAddresses->createChild('first','Ceres::AddressWidget')->withSetting('addressType', $type)
                ->withSetting('addressFieldsInvoiceDE', $this->ceresConfig->addresses->billingAddressShow)
                ->withSetting('addressRequiredFieldsInvoiceDE', $this->ceresConfig->addresses->billingAddressRequire)
                ->withSetting('addressFieldsInvoiceGB', $this->ceresConfig->addresses->billingAddressShow_en)
                ->withSetting('addressRequiredFieldsInvoiceGB', $this->ceresConfig->addresses->billingAddressRequire_en)
                ->withSetting('hintText', '');
        }
        elseif($type == '2')
        {
            $this->twoColumnWidgetAddresses->createChild('second','Ceres::AddressWidget')->withSetting('addressType', $type)
                ->withSetting('addressFieldsShippingDE', $this->ceresConfig->addresses->deliveryAddressShow)
                ->withSetting('addressRequiredFieldsShippingDE', $this->ceresConfig->addresses->deliveryAddressRequire)
                ->withSetting('addressFieldsShippingGB', $this->ceresConfig->addresses->deliveryAddressShow_en)
                ->withSetting('addressRequiredFieldsShippingGB', $this->ceresConfig->addresses->deliveryAddressRequire_en)
                ->withSetting('hintText', '');
        }
    }
    
    private function createAccountSettingsWidget()
    {
        $this->twoColumnWidgetAccountSettings->createChild('first', 'Ceres::AccountSettingsWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('hintText', '');
    }
    
    private function createBankDataSelectWidget()
    {
        $this->twoColumnWidgetAccountSettings->createChild('second', 'Ceres::BankDataSelectWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('hintText', '');
    }
    
    private function createOrderHistoryWidget()
    {
        $this->createWidget('Ceres::OrderHistoryWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('ordersPerPage', $this->ceresConfig->myAccount->ordersPerPage)
            ->withSetting('allowPaymentProviderChange', $this->ceresConfig->myAccount->changePayment)
            ->withSetting('allowReturn', $this->ceresConfig->myAccount->orderReturnActive);
    }
    
    private function createOrderReturnHistoryWidget()
    {
        $this->createWidget('Ceres::OrderReturnHistoryWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('returnsPerPage', 5);
    }
    
    private function createTwoColumnWidgetTop()
    {
        $this->twoColumnWidgetTop = $this->createWidget('Ceres::TwoColumnWidget')->withSetting('layout', 'nineToThree');
    }
    
    private function createTwoColumnWidgetAddresses()
    {
        $this->twoColumnWidgetAddresses = $this->createWidget('Ceres::TwoColumnWidget')->withSetting('layout', 'oneToOne');
    }
    
    private function createTwoColumnWidgetAccountSettings()
    {
        $this->twoColumnWidgetAccountSettings = $this->createWidget('Ceres::TwoColumnWidget')->withSetting('layout', 'oneToOne');
    }
}
