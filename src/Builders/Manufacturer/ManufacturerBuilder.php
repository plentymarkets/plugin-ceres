<?php

namespace Ceres\Builders\Manufacturer;

use Ceres\Builders\Abstracts\AbstractBuilderFieldGenerator;
use Ceres\ShopBuilder\DataFieldProvider\Item\ManufacturerDataFieldProvider;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;

class ManufacturerBuilder extends AbstractBuilderFieldGenerator
{
    /** @var array */
    public array $results = [];

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
    public function withStreet(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::STREET);

        return $this;
    }
    /**
     * @return ManufacturerBuilder
     */
    public function withHouseNumber(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::HOUSE_NO);

        return $this;
    }
    /**
     * @return ManufacturerBuilder
     */
    public function withPostCode(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::POST_CODE);

        return $this;
    }
    /**
     * @return ManufacturerBuilder
     */
    public function withTown(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::TOWN);

        return $this;
    }
    /**
     * @return ManufacturerBuilder
     */
    public function withCountry(): ManufacturerBuilder
    {
        $this->results[] = $this->getShopBuilderDataFieldProvider(ManufacturerDataFieldProvider::COUNTRY);

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