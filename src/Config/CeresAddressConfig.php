<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresAddressConfig extends PluginConfig
{
    public $defaultSalutation;
    public $billingAddressShow;
    public $billingAddressShow_en;
    public $billingAddressRequire;
    public $billingAddressRequire_en;
    public $deliveryAddressShow;
    public $deliveryAddressShow_en;
    public $deliveryAddressRequire;
    public $deliveryAddressRequire_en;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
        
        $this->defaultSalutation = $this->getTextValue('addresses.defaultSalutation');
        
        $this->billingAddressShow = $this->getMultiSelectValue(
            "billing_address.show",
            [
                "billing_address.name1",
                "billing_address.vatNumber",
                "billing_address.salutation",
                "billing_address.title",
                "billing_address.birthday",
                "billing_address.name4",
                "billing_address.address3",
                "billing_address.address4",
                "billing_address.stateId",
                "billing_address.phoneNumber"
            ],
            [
                "billing_address.name1",
                "billing_address.salutation"
            ]
        );

        $this->billingAddressShow_en = $this->getMultiSelectValue(
            "billing_address.en.show",
            [
                "billing_address.name1",
                "billing_address.vatNumber",
                "billing_address.salutation",
                "billing_address.title",
                "billing_address.birthday",
                "billing_address.name4",
                "billing_address.address2",
                "billing_address.address3",
                "billing_address.address4",
                "billing_address.phoneNumber"
            ],
            [
                "billing_address.name1",
                "billing_address.address2",
                "billing_address.salutation"
            ]
        );

        $this->billingAddressRequire = $this->getMultiSelectValue(
            "billing_address.require",
            [
                "billing_address.name1",
                "billing_address.vatNumber",
                "billing_address.salutation",
                "billing_address.title",
                "billing_address.birthday",
                "billing_address.name4",
                "billing_address.address3",
                "billing_address.address4",
                "billing_address.stateId",
                "billing_address.phoneNumber"
            ],
            []
        );

        $this->billingAddressRequire_en = $this->getMultiSelectValue(
            "billing_address.en.require",
            [
                "billing_address.name1",
                "billing_address.vatNumber",
                "billing_address.salutation",
                "billing_address.title",
                "billing_address.birthday",
                "billing_address.name4",
                "billing_address.address2",
                "billing_address.address3",
                "billing_address.address4",
                "billing_address.phoneNumber"
            ],
            []
        );

        $this->deliveryAddressShow = $this->getMultiSelectValue(
            "delivery_address.show",
            [
                "delivery_address.name1",
                "delivery_address.salutation",
                "delivery_address.title",
                "delivery_address.name4",
                "delivery_address.address3",
                "delivery_address.address4",
                "delivery_address.stateId",
                "delivery_address.phoneNumber"
            ],
            [
                "delivery_address.name1",
                "delivery_address.salutation"
            ]
        );

        $this->deliveryAddressShow_en = $this->getMultiSelectValue(
            "delivery_address.en.show",
            [
                "delivery_address.name1",
                "delivery_address.salutation",
                "delivery_address.title",
                "delivery_address.name4",
                "delivery_address.address2",
                "delivery_address.address3",
                "delivery_address.address4",
                "delivery_address.phoneNumber"
            ],
            [
                "delivery_address.name1",
                "delivery_address.salutation"
            ]
        );

        $this->deliveryAddressRequire = $this->getMultiSelectValue(
            "delivery_address.require",
            [
                "delivery_address.name1",
                "delivery_address.salutation",
                "delivery_address.title",
                "delivery_address.name4",
                "delivery_address.address3",
                "delivery_address.address4",
                "delivery_address.stateId",
                "delivery_address.phoneNumber"
            ],
            []
        );

        $this->deliveryAddressRequire_en = $this->getMultiSelectValue(
            "delivery_address.en.require",
            [
                "delivery_address.name1",
                "delivery_address.salutation",
                "delivery_address.title",
                "delivery_address.name4",
                "delivery_address.address2",
                "delivery_address.address3",
                "delivery_address.address4",
                "delivery_address.phoneNumber"
            ],
            []
        );
    }
}