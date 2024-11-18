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
    public const HOMEPAGE   = 'homepage';
    /** @var string */
    public const STREET     = 'street';
    /** @var string */
    public const HOUSE_NO   = 'houseNo';
    /** @var string */
    public const POST_CODE  = 'postcode';
    /** @var string */
    public const TOWN       = 'town';
    /** @var string */
    public const COUNTRY    = 'country';
    /** @var string */
    public const PHONE      = 'phoneNumber';
    /** @var string */
    public const FAX_NO     = 'faxNumber';
    /** @var string */
    public const EMAIL      = 'email';

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
    /** @var string */
    public const RESPONSIBLE_PHONE     = 'responsiblePhoneNo';

        /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addField("name", "Ceres::Widget.dataFieldManufacturerName", "item_data_field('item.manufacturer.name')");
        $this->addField("externalName", "Ceres::Widget.dataFieldManufacturerExternalName", "item_data_field('item.manufacturer.externalName')");
        $this->addField("logo", "Ceres::Widget.dataFieldManufacturerLogo", "item_data_field('item.manufacturer.logo', null, 'src', 'img')");

        $this->addField(self::HOMEPAGE, "Ceres::Widget.dataFieldManufacturerHomepage", "item_data_field('item.manufacturer.url')");
        $this->addField(self::STREET, "Ceres::Widget.dataFieldManufacturerStreet", "item_data_field('item.manufacturer.street')");
        $this->addField(self::HOUSE_NO, "Ceres::Widget.dataFieldManufacturerHouseNo", "item_data_field('item.manufacturer.houseNo')");
        $this->addField(self::POST_CODE, "Ceres::Widget.dataFieldManufacturerPostCode", "item_data_field('item.manufacturer.postcode')");
        $this->addField(self::TOWN, "Ceres::Widget.dataFieldManufacturerTown", "item_data_field('item.manufacturer.town')");
        $this->addField(self::COUNTRY, "Ceres::Widget.dataFieldManufacturerCountry", "item_data_field('item.manufacturer.countryObject.name')");
        $this->addField(self::PHONE, "Ceres::Widget.dataFieldManufacturerPhoneNo", "item_data_field('item.manufacturer.phoneNumber')");
        $this->addField(self::FAX_NO, "Ceres::Widget.dataFieldManufacturerFaxNo", "item_data_field('item.manufacturer.faxNumber')");
        $this->addField(self::EMAIL, "Ceres::Widget.dataFieldManufacturerEmail", "item_data_field('item.manufacturer.email')");

        $this->addField(self::RESPONSIBLE_NAME, "Ceres::Widget.dataFieldManufacturerResponsibleName", "item_data_field('item.manufacturer.responsibleName')");
        $this->addField(self::RESPONSIBLE_STREET, "Ceres::Widget.dataFieldManufacturerResponsibleStreet", "item_data_field('item.manufacturer.responsibleStreet')");
        $this->addField(self::RESPONSIBLE_HOUSE_NO, "Ceres::Widget.dataFieldManufacturerResponsibleHouseNo", "item_data_field('item.manufacturer.responsibleHouseNo')");
        $this->addField(self::RESPONSIBLE_POST_CODE, "Ceres::Widget.dataFieldManufacturerResponsiblePostCode", "item_data_field('item.manufacturer.responsiblePostCode')");
        $this->addField(self::RESPONSIBLE_TOWN, "Ceres::Widget.dataFieldManufacturerResponsibleTown", "item_data_field('item.manufacturer.responsibleTown')");
        $this->addField(self::RESPONSIBLE_COUNTRY, "Ceres::Widget.dataFieldManufacturerResponsibleCountry", "item_data_field('item.manufacturer.responsibleCountryObject.name')");
        $this->addField(self::RESPONSIBLE_EMAIL, "Ceres::Widget.dataFieldManufacturerResponsibleEmail", "item_data_field('item.manufacturer.responsibleEmail')");
        $this->addField(self::RESPONSIBLE_PHONE, "Ceres::Widget.dataFieldManufacturerResponsiblePhoneNo", "item_data_field('item.manufacturer.responsiblePhoneNo')");
    }

    public static function getEuResponsibleFields(): array
    {
        return [
            self::RESPONSIBLE_NAME,
            self::RESPONSIBLE_STREET,
            self::RESPONSIBLE_HOUSE_NO,
            self::RESPONSIBLE_POST_CODE,
            self::RESPONSIBLE_TOWN,
            self::RESPONSIBLE_COUNTRY,
            self::RESPONSIBLE_EMAIL,
            self::RESPONSIBLE_PHONE,
        ];
    }
}
