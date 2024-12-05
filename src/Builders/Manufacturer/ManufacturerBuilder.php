<?php

namespace Ceres\Builders\Manufacturer;

use Ceres\Builders\Abstracts\AbstractBuilderFieldGenerator;
use Ceres\Builders\Manufacturer\Address\DetailedAddressBuilder;
use Ceres\Builders\Manufacturer\Address\GeneralAddressBuilder;
use Ceres\ShopBuilder\DataFieldProvider\Item\ManufacturerDataFieldProvider;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;

class ManufacturerBuilder extends AbstractBuilderFieldGenerator
{
    /** @var array */
    public array $results = [];

    /** @var DetailedAddressBuilder */
    public DetailedAddressBuilder $detailedAddressBuilder;
    /** @var GeneralAddressBuilder */
    public GeneralAddressBuilder $generalAddressBuilder;

    /**
     * @param DetailedAddressBuilder $detailedAddressBuilder
     * @param GeneralAddressBuilder $generalAddressBuilder
     */
    public function __construct(DetailedAddressBuilder $detailedAddressBuilder,
                                GeneralAddressBuilder $generalAddressBuilder
    ) {
        $this->detailedAddressBuilder = $detailedAddressBuilder;
        $this->generalAddressBuilder  = $generalAddressBuilder;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withName(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::NAME);

        return $this;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withLegalName(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::LEGAL_NAME);

        return $this;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withHomepage(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::HOMEPAGE);

        return $this;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withDetailedAddress(): ManufacturerBuilder
    {
        $this->detailedAddressBuilder->withStreet();
        $this->detailedAddressBuilder->withHouseNumber();
        $this->results[] = $this->detailedAddressBuilder->build();

        return $this;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withGeneralAddress(): ManufacturerBuilder
    {
        $this->generalAddressBuilder->withPostCode();
        $this->generalAddressBuilder->withCity();
        $this->generalAddressBuilder->withCountry();
        $this->results[] = $this->generalAddressBuilder->build();

        return $this;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withPhoneNumber(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::PHONE);

        return $this;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withFaxNumber(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::FAX_NO);

        return $this;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withContactUrl(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::CONTACT_URL);

        return $this;
    }

    /**
     * @return ManufacturerBuilder
     */
    public function withEmail(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::EMAIL);

        return $this;
    }

    /**
     * @param PresetWidgetFactory $presetWidgetFactory
     * @param string $uuidManufacturer
     *
     * @return void
     */
    public function build(PresetWidgetFactory $presetWidgetFactory, string $uuidManufacturer): void
    {
        foreach ($this->results as $result) {
            $presetWidgetFactory->createChild($uuidManufacturer, 'Ceres::InlineTextWidget')
                ->withSetting('appearance','none')
                ->withSetting('spacing.customPadding', true)
                ->withSetting('spacing.padding.left.value', 0)
                ->withSetting('spacing.padding.left.unit', null)
                ->withSetting('spacing.padding.right.value', 0)
                ->withSetting('spacing.padding.right.unit', null)
                ->withSetting('spacing.padding.top.value', 0)
                ->withSetting('spacing.padding.top.unit', null)
                ->withSetting('spacing.padding.bottom.value', 0)
                ->withSetting('spacing.padding.bottom.unit', null)
                ->withSetting(
                    'text',
                    $result
                );
        }
    }
}