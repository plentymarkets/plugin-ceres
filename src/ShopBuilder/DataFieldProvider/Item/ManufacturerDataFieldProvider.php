<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class ManufacturerDataFieldProvider
 *
 * This class is a data field provider centered on the topic of manufacturers.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class ManufacturerDataFieldProvider extends DataFieldProvider
{
    /** @var string */
    public const RESPONSIBLE_NAME      = 'responsibleName';
    /** @var string */
    public const RESPONSIBLE_STREET    = 'responsibleStreet';
    /** @var string */
    public const RESPONSIBLE_HOUSE_NO  = 'responsibleHouseNo';
    /** @var string */
    public const RESPONSIBLE_POST_CODE = 'responsiblePostCode';
    /** @var string */
    public const RESPONSIBLE_TOWN      = 'responsibleTown';
    /** @var string */
    public const RESPONSIBLE_COUNTRY   = 'responsibleCountry';
    /** @var string */
    public const RESPONSIBLE_EMAIL     = 'responsibleEmail';

        /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addField("name", "Ceres::Widget.dataFieldManufacturerName", "item_data_field('item.manufacturer.name')");
        $this->addField("externalName", "Ceres::Widget.dataFieldManufacturerExternalName", "item_data_field('item.manufacturer.externalName')");
        $this->addField("logo", "Ceres::Widget.dataFieldManufacturerLogo", "item_data_field('item.manufacturer.logo', null, 'src', 'img')");

        $this->addField(self::RESPONSIBLE_NAME, "Ceres::Widget.dataFieldManufacturerResponsibleName", "item_data_field('item.manufacturer.responsibleName')");
        $this->addField(self::RESPONSIBLE_STREET, "Ceres::Widget.dataFieldManufacturerResponsibleStreet", "item_data_field('item.manufacturer.responsibleStreet')");
        $this->addField(self::RESPONSIBLE_HOUSE_NO, "Ceres::Widget.dataFieldManufacturerResponsibleHouseNo", "item_data_field('item.manufacturer.responsibleHouseNo')");
        $this->addField(self::RESPONSIBLE_POST_CODE, "Ceres::Widget.dataFieldManufacturerResponsiblePostCode", "item_data_field('item.manufacturer.responsiblePostCode')");
        $this->addField(self::RESPONSIBLE_TOWN, "Ceres::Widget.dataFieldManufacturerResponsibleTown", "item_data_field('item.manufacturer.responsibleTown')");
        $this->addField(self::RESPONSIBLE_COUNTRY, "Ceres::Widget.dataFieldManufacturerResponsibleCountry", "item_data_field('item.manufacturer.responsibleCountry')");
        $this->addField(self::RESPONSIBLE_EMAIL, "Ceres::Widget.dataFieldManufacturerResponsibleEmail", "item_data_field('item.manufacturer.responsibleEmail')");
    }
}
