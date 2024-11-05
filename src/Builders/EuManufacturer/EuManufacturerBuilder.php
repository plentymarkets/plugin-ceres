<?php

namespace Ceres\Builders\EuManufacturer;

use Ceres\Builders\EuManufacturer\Abstracts\AbstractEuManufacturerBuilder;
use Ceres\Builders\EuManufacturer\Address\DetailedAddressBuilder;
use Ceres\Builders\EuManufacturer\Address\GeneralAddressBuilder;
use Ceres\ShopBuilder\DataFieldProvider\Item\ManufacturerDataFieldProvider;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;

class EuManufacturerBuilder extends AbstractEuManufacturerBuilder
{
    /** @var array */
    public array $results = [];

    /** @var DetailedAddressBuilder */
    public DetailedAddressBuilder $detailedAddressBuilder;
    /** @var GeneralAddressBuilder */
    public GeneralAddressBuilder $generalAddressBuilder;

    public function __construct() {
        parent::__construct();

        $this->detailedAddressBuilder = pluginApp(DetailedAddressBuilder::class);
        $this->generalAddressBuilder  = pluginApp(GeneralAddressBuilder::class);
    }

    /**
     * @return EuManufacturerBuilder
     */
    public function withName(): EuManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_NAME);

        return $this;
    }

    /**
     * @return EuManufacturerBuilder
     */
    public function withDetailedAddress(): EuManufacturerBuilder
    {
        $this->detailedAddressBuilder->withStreet();
        $this->detailedAddressBuilder->withHouseNumber();
        $this->results[] = $this->detailedAddressBuilder->build();

        return $this;
    }

    /**
     * @return EuManufacturerBuilder
     */
    public function withGeneralAddress(): EuManufacturerBuilder
    {
        $this->generalAddressBuilder->withCity();
        $this->generalAddressBuilder->withCountry();
        $this->generalAddressBuilder->withPostCode();
        $this->results[] = $this->generalAddressBuilder->build();

        return $this;
    }

    /**
     * @return EuManufacturerBuilder
     */
    public function withMail(): EuManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_EMAIL);

        return $this;
    }

    /**
     * @return EuManufacturerBuilder
     */
    public function withPhoneNumber(): EuManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::RESPONSIBLE_PHONE);

        return $this;
    }

    /**
     * @param PresetWidgetFactory $presetWidgetFactory
     * @param string $uuidEuResponsiblePerson
     *
     * @return void
     */
    public function build(PresetWidgetFactory $presetWidgetFactory, string $uuidEuResponsiblePerson): void
    {
        foreach ($this->results as $result) {
            $presetWidgetFactory->createChild($uuidEuResponsiblePerson, 'Ceres::InlineTextWidget')
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
