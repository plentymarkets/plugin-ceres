<?php

namespace Ceres\Builders\EuManufacturer\Address;

use Ceres\Builders\Abstracts\AbstractBuilderFieldGenerator;
use Ceres\ShopBuilder\DataFieldProvider\Item\ManufacturerDataFieldProvider;

class DetailedEuAddressBuilder extends AbstractBuilderFieldGenerator
{
    /** @var array */
    public array $results = [];

    /**
     * @return DetailedEuAddressBuilder
     */
    public function withStreet(): DetailedEuAddressBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_STREET);

        return $this;
    }

    /**
     * @return DetailedEuAddressBuilder
     */
    public function withHouseNumber(): DetailedEuAddressBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_HOUSE_NO);

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
