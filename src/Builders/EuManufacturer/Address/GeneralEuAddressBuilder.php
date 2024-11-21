<?php

namespace Ceres\Builders\EuManufacturer\Address;

use Ceres\Builders\Abstracts\AbstractBuilderFieldGenerator;
use Ceres\ShopBuilder\DataFieldProvider\Item\ManufacturerDataFieldProvider;

class GeneralEuAddressBuilder extends AbstractBuilderFieldGenerator
{
    /** @var array */
    public array $results = [];

    /**
     * @return $this
     */
    public function withCity(): GeneralEuAddressBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_TOWN);

        return $this;
    }

    /**
     * @return GeneralEuAddressBuilder
     */
    public function withCountry(): GeneralEuAddressBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_COUNTRY);

        return $this;
    }

    /**
     * @return GeneralEuAddressBuilder
     */
    public function withPostCode(): GeneralEuAddressBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_POST_CODE);

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
