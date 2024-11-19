<?php

namespace Ceres\Builders\Manufacturer\Address;

use Ceres\Builders\Abstracts\AbstractBuilderFieldGenerator;
use Ceres\ShopBuilder\DataFieldProvider\Item\ManufacturerDataFieldProvider;

class GeneralAddressBuilder extends AbstractBuilderFieldGenerator
{
    /** @var array */
    public array $results = [];

    /**
     * @return $this
     */
    public function withCity(): GeneralAddressBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::TOWN);

        return $this;
    }

    /**
     * @return GeneralAddressBuilder
     */
    public function withCountry(): GeneralAddressBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::COUNTRY);

        return $this;
    }

    /**
     * @return GeneralAddressBuilder
     */
    public function withPostCode(): GeneralAddressBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::POST_CODE);

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
