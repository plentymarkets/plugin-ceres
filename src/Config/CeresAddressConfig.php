<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresAddressConfig
 *
 * PluginConfig class, including all plugin settings for the addresses.
 *
 * @package Ceres\Config
 */
class CeresAddressConfig extends PluginConfig
{
    /**
     * @var string $defaultSalutation Preselected salutation in the address modal.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $defaultSalutation;

    /**
     * @var array $billingAddressShow Visible input fields of the billing address.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $billingAddressShow;

    /**
     * @var array $billingAddressShow_en Visible input fields of the billing address in UK format.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $billingAddressShow_en;

    /**
     * @var array $billingAddressRequire Required input fields of the billing address.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $billingAddressRequire;

    /**
     * @var array $billingAddressRequire_en Required input fields of the billing address in UK format.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $billingAddressRequire_en;

    /**
     * @var array $deliveryAddressShow Visible input fields of the delivery address.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $deliveryAddressShow;

    /**
     * @var array $deliveryAddressShow_en Visible input fields of the delivery address in UK format.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $deliveryAddressShow_en;

    /**
     * @var array $deliveryAddressRequire Required input fields of the delivery address.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $deliveryAddressRequire;

    /**
     * @var array $billingAddressRequire_en Required input fields of the delivery address in UK format.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $deliveryAddressRequire_en;

    /**
     * @inheritDoc
     */
    protected function getPluginName() :string
    {
        return 'Ceres';
    }

    /**
     * @inheritDoc
     */
    protected function load()
    {
        $this->defaultSalutation = $this->getTextValue('addresses.defaultSalutation');

        $this->billingAddressShow = $this->getMultiSelectValue(
            'billing_address.show',
            [
                'billing_address.name1',
                'billing_address.email',
                'billing_address.vatNumber',
                'billing_address.salutation',
                'billing_address.title',
                'billing_address.birthday',
                'billing_address.name4',
                'billing_address.address3',
                'billing_address.address4',
                'billing_address.stateId',
                'billing_address.phoneNumber'
            ],
            [
                'billing_address.name1',
                'billing_address.salutation'
            ]
        );

        $this->billingAddressShow_en = $this->getMultiSelectValue(
            'billing_address.en.show',
            [
                'billing_address.name1',
                'billing_address.email',
                'billing_address.vatNumber',
                'billing_address.salutation',
                'billing_address.title',
                'billing_address.birthday',
                'billing_address.name4',
                'billing_address.address2',
                'billing_address.address3',
                'billing_address.address4',
                'billing_address.phoneNumber'
            ],
            [
                'billing_address.name1',
                'billing_address.address2',
                'billing_address.salutation'
            ]
        );

        $this->billingAddressRequire = $this->getMultiSelectValue(
            'billing_address.require',
            [
                'billing_address.name1',
                'billing_address.email',
                'billing_address.vatNumber',
                'billing_address.salutation',
                'billing_address.title',
                'billing_address.birthday',
                'billing_address.name4',
                'billing_address.address3',
                'billing_address.address4',
                'billing_address.stateId',
                'billing_address.phoneNumber'
            ],
            []
        );

        $this->billingAddressRequire_en = $this->getMultiSelectValue(
            'billing_address.en.require',
            [
                'billing_address.name1',
                'billing_address.email',
                'billing_address.vatNumber',
                'billing_address.salutation',
                'billing_address.title',
                'billing_address.birthday',
                'billing_address.name4',
                'billing_address.address2',
                'billing_address.address3',
                'billing_address.address4',
                'billing_address.phoneNumber'
            ],
            []
        );

        $this->deliveryAddressShow = $this->getMultiSelectValue(
            'delivery_address.show',
            [
                'delivery_address.name1',
                'delivery_address.email',
                'delivery_address.salutation',
                'delivery_address.title',
                'delivery_address.name4',
                'delivery_address.address3',
                'delivery_address.address4',
                'delivery_address.stateId',
                'delivery_address.phoneNumber'
            ],
            [
                'delivery_address.name1',
                'delivery_address.salutation'
            ]
        );

        $this->deliveryAddressShow_en = $this->getMultiSelectValue(
            'delivery_address.en.show',
            [
                'delivery_address.name1',
                'delivery_address.email',
                'delivery_address.salutation',
                'delivery_address.title',
                'delivery_address.name4',
                'delivery_address.address2',
                'delivery_address.address3',
                'delivery_address.address4',
                'delivery_address.phoneNumber'
            ],
            [
                'delivery_address.name1',
                'delivery_address.salutation'
            ]
        );

        $this->deliveryAddressRequire = $this->getMultiSelectValue(
            'delivery_address.require',
            [
                'delivery_address.name1',
                'delivery_address.email',
                'delivery_address.salutation',
                'delivery_address.title',
                'delivery_address.name4',
                'delivery_address.address3',
                'delivery_address.address4',
                'delivery_address.stateId',
                'delivery_address.phoneNumber'
            ],
            []
        );

        $this->deliveryAddressRequire_en = $this->getMultiSelectValue(
            'delivery_address.en.require',
            [
                'delivery_address.name1',
                'delivery_address.email',
                'delivery_address.salutation',
                'delivery_address.title',
                'delivery_address.name4',
                'delivery_address.address2',
                'delivery_address.address3',
                'delivery_address.address4',
                'delivery_address.phoneNumber'
            ],
            []
        );
    }
}
