<?php

namespace Ceres\Builders\EuManufacturer\Address;

//use Ceres\Builders\EuManufacturer\Abstracts\AbstractEuManufacturerBuilder;
use Ceres\ShopBuilder\DataFieldProvider\Item\ManufacturerDataFieldProvider;

class DetailedAddressBuilder
{
    /** @var array */
    public array $results = [];

    /**
     * @return DetailedAddressBuilder
     */
    public function withStreet(): DetailedAddressBuilder
    {
        //$this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_STREET);

        return $this;
    }

    /**
     * @return DetailedAddressBuilder
     */
    public function withHouseNumber(): DetailedAddressBuilder
    {
        //$this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_HOUSE_NO);

        return $this;
    }

    /**
     * @return string
     */
    public function build(): string
    {
        return implode(' ', $this->results);
    }
}
