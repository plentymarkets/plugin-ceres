<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresAddressConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getBillingAddressShow()
    {
        return $this->getMultiSelectValue(
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
    }

    public function getBillingAddressShow_en()
    {
        return $this->getMultiSelectValue(
            "billing_address.show",
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
    }

    public function getBillingAddressRequire()
    {
        return $this->getMultiSelectValue(
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
    }

    public function getBillingAddressRequire_en()
    {
        return $this->getMultiSelectValue(
            "billing_address.require",
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
    }

    public function getDeliveryAddressShow()
    {
        return $this->getMultiSelectValue(
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
    }

    public function getDeliveryAddressShow_en()
    {
        return $this->getMultiSelectValue(
            "delivery_address.show",
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
    }

    public function getDeliveryAddressRequire()
    {
        return $this->getMultiSelectValue(
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
    }

    public function getDeliveryAddressRequire_en()
    {
        return $this->getMultiSelectValue(
            "delivery_address.require",
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