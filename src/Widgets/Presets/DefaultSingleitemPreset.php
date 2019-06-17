<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

class DefaultSingleitemPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var CeresConfig */
    private $ceresConfig;

    /** @var PresetWidgetFactory */
    private $twoColumnWidget;

    /** @var PresetWidgetFactory */
    private $stickyContainer;

    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->createTwoColumnWidget();
        $this->createItemImageWidget();
        $this->createStickyContainer();
        $this->createManufacturer();
        $this->createNameHeader();
        $this->createSeparatorWidget();
        $this->createItemVariationNumber();
        $this->createGraduatedPriceWidget();
        $this->createItemPriceWidget();
        $this->createItemAvailabilityWidget();
        $this->createAddToBasketWidget();
        $this->createAddToWishListWiget();
        $this->createSeparatorWidget();
        $this->createLegalInformation();

        return $this->preset->toArray();
    }

    private function createStickyContainer()
    {
        $this->stickyContainer = $this->twoColumnWidget->createChild('second', 'Ceres::StickyContainerWidget');
    }

    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')->withSetting('layout', 'sevenToFive');
    }

    private function createManufacturer()
    {
        $this->stickyContainer->createChild('sticky','Ceres::InlineTextWidget')
            ->withSetting('appearance','none')
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('text',"{# SHOPBUILDER:DATA_FIELD Ceres\\ShopBuilder\\DataFieldProvider\\Item\\ManufacturerDataFieldProvider::externalName #}{{ item_data_field('item.manufacturer.externalName') }}");
    }
    private function createNameHeader()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::InlineTextWidget')
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 0)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 0)
            ->withSetting('spacing.padding.bottom.unit', null)
            ->withSetting('text', "<h1>{# SHOPBUILDER:DATA_FIELD Ceres\\ShopBuilder\\DataFieldProvider\\Item\\TextsDataFieldProvider::name1 #}{{ item_data_field('texts.name1') }}</h1>")
            ->withSetting('appearance','none');
    }

    private function createAddToBasketWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::AddToBasketWidget')
            ->withSetting('buttonSize', 'lg')
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.top.value', 4)
            ->withSetting('spacing.margin.top.unit', null)
            ->withSetting('spacing.margin.bottom.value', 4)
            ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function createItemAvailabilityWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::ItemAvailabilityWidget');
    }

    private function createAddToWishListWiget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::AddToWishListWidget');
    }

    private function createItemPriceWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::ItemPriceWidget')
            ->withSetting('showCrossPrice', true)
            ->withSetting('appearance', 'primary');
    }

    private function createItemVariationNumber()
    {
        $text = '';
        $text .= "<b>{{ trans(\"Ceres::Template.singleItemNumber\") }}</b> &nbsp;&nbsp;";
        $text .= "{# SHOPBUILDER:DATA_FIELD Ceres\\ShopBuilder\\DataFieldProvider\\Item\\VariationGlobalDataFieldProvider::number #}";
        $text .= "{{ item_data_field('variation.number') }}";

        $this->stickyContainer->createChild('sticky', 'Ceres::InlineTextWidget')
            ->withSetting('appearance', 'none')
            ->withSetting('text', $text)
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null);
    }

    private function createItemImageWidget()
    {
        $this->twoColumnWidget->createChild('first', 'Ceres::ItemImageWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('maxQuantity', 10)
            ->withSetting('imageSize', 'urlMiddle')
            ->withSetting('showThumbs', true)
            ->withSetting('showDots', true);
    }

    private function createSeparatorWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::SeparatorWidget')
            ->withSetting('customMargin', true)
            ->withSetting('margin.top.value', 0)
            ->withSetting('margin.top.unit', null)
            ->withSetting('margin.bottom.value', 0)
            ->withSetting('margin.bottom.unit', null);
    }

    private function createLegalInformation()
    {
        $text = `* {% if services.customer.showNetPrices() %}{{ trans("Ceres::Template.singleItemExclVAT") }}{% else %}{{ trans("Ceres::Template.singleItemInclVAT") }}{% endif %} {{ trans("Ceres::Template.singleItemExclusive") }}
                <a {% if ceresConfig.global.shippingCostsCategoryId > 0 %} data-toggle="modal" href="#shippingscosts"{% endif %} title="{{ trans("Ceres::Template.singleItemShippingCosts") }}">{{ trans("Ceres::Template.singleItemShippingCosts") }}</a>`;
        $this->stickyContainer->createChild('second', 'Ceres::TextWidget')
            ->withSetting('text', $text)
            ->withSetting('appearance', 'none');
    }

    private function createGraduatedPriceWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::GraduatedPriceWidget')
            ->withSetting('appearance', 'primary');
    }
}
