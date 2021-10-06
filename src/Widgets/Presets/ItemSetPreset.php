<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

/**
 * Class ItemSetPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for viewing single item sets. It contains:
 * - TwoColumnWidget
 * - ItemImageWidget
 * - BackgroundWidget
 * - InlineTextWidget
 * - SeparatorWidget
 * - ItemPriceWidget
 * - ItemAvailabilityWidget
 * - AddToWishListWidget
 * - ItemSetWidget
 * - ThreeColumnWidget
 * - AttributeWidget
 * - OrderPropertyWidget
 * - AddToBasketWidget
 *
 * @package Ceres\Widgets\Presets
 */
class ItemSetPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var CeresConfig */
    private $ceresConfig;

    /** @var Translator */
    private $translator;

    /** @var PresetWidgetFactory */
    private $twoColumnWidget;

    /** @var PresetWidgetFactory */
    private $secondTwoColumnWidget;

    /** @var PresetWidgetFactory */
    private $setItemBackgroundWidget;

    /** @var PresetWidgetFactory */
    private $setComponentWidget;

    /** @var PresetWidgetFactory */
    private $setComponentThreeColumnWidget;

    /** @var PresetWidgetFactory */
    private $setComponentBackgroundWidget;

    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->translator = pluginApp(Translator::class);

        $this->createTwoColumnWidget();

        $this->createItemImageWidget();

        $this->createSetItemBackgroundWidget();

        $this->createNameHeader();
        $this->createNameSeparatorWidget();
        $this->createManufacturer();
        $this->createSetDescriptionWidget();
        $this->createSetDescriptionSeparatorWidget();
        $this->createSetPriceWidget();
        $this->createItemAvailabilityWidget();
        $this->createItemWishListWidget();

        $this->createSetComponentWidget();
        $this->createSetComponentBackgroundWidget();
        $this->createSetComponentThreeColumnWidget();

        $this->createSetComponentItemName();
        $this->createSetComponentDescriptionWidget();

        $this->createSetComponentImageWidget();

        $this->createSetComponentAttributeSelectWidget();
        $this->createOrderPropertyWidget();
        $this->createSetComponentQuantityAndPriceWidget();
        $this->createSetComponentAvailabilityWidget();
        $this->createSetComponentWishList();

        $this->createSecondTwoColumnWidget();
        $this->createSecondSetPriceWidget();
        $this->createLegalInformation();
        $this->createAddToBasketWidget();

        return $this->preset->toArray();
    }

    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'sevenToFive')
            ->withSetting('customClass','mt-5');
    }

    private function createItemImageWidget()
    {
        $this->twoColumnWidget->createChild('first', 'Ceres::ItemImageWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('maxQuantity', 10)
            ->withSetting('imageSize', 'urlMiddle')
            ->withSetting('showThumbs', true)
            ->withSetting('showDots', true)
            ->withSetting('preloadImage', true);
    }

    private function createSetItemBackgroundWidget()
    {
        $this->setItemBackgroundWidget = $this->twoColumnWidget->createChild('second', 'Ceres::BackgroundWidget')
            ->withSetting('customClass', '')
            ->withSetting('opacity', 100)
            ->withSetting('fullWidth', false)
            ->withSetting('backgroundFixed', true)
            ->withSetting('backgroundRepeat', false)
            ->withSetting('backgroundSize', 'bg-cover')
            ->withSetting('sourceType', 'none')
            ->withSetting('hugeFont', false)
            ->withSetting('colorPalette', 'custom')
            ->withSetting('customColor', '#FFFFFF')
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 4)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 4)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 4)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 4)
            ->withSetting('spacing.padding.bottom.unit', null);
    }

    private function createNameHeader()
    {
        switch($this->ceresConfig->item->itemName)
        {
            case 0;
                $itemName = 'name1';
                break;
            case 1;
                $itemName = 'name2';
                break;
            case 2;
                $itemName = 'name3';
                break;
            default;
                $itemName = 'name1';
        }
        $dataProvider = $this->getShopBuilderDataFieldProvider("TextsDataFieldProvider::$itemName",array("texts.$itemName"));
        $this->setItemBackgroundWidget->createChild('background', 'Ceres::InlineTextWidget')
            ->withSetting('customClass', 'title-outer')
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 0)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 0)
            ->withSetting('spacing.padding.bottom.unit', null)
            ->withSetting('text', "<h1>$dataProvider</h1>")
            ->withSetting('appearance','none');
    }

    private function createNameSeparatorWidget()
    {
        $this->setItemBackgroundWidget->createChild('background', 'Ceres::SeparatorWidget')
            ->withSetting('customClass','');
    }

    private function createManufacturer()
    {
        $dataProvider = $this->getShopBuilderDataFieldProvider('ManufacturerDataFieldProvider::externalName',array('item.manufacturer.externalName'));

        $this->setItemBackgroundWidget->createChild('background', 'Ceres::InlineTextWidget')
            ->withSetting('appearance','none')
            ->withSetting('customClass', 'producertag h6 producer text-muted')
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 0)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 2)
            ->withSetting('spacing.padding.bottom.unit', null)
            ->withSetting('text', $dataProvider);
    }

    private function createSetDescriptionWidget()
    {
        $this->setItemBackgroundWidget->createChild('background', 'Ceres::InlineTextWidget')
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
            ->withSetting('text', $this->getShopBuilderDataFieldProvider('TextsDataFieldProvider::description',array('texts.description', null, null)));
    }

    private function createSetDescriptionSeparatorWidget()
    {
        $this->setItemBackgroundWidget->createChild('background', 'Ceres::SeparatorWidget')
            ->withSetting('customClass','');
    }

    private function createSetPriceWidget()
    {
        $this->setItemBackgroundWidget->createChild('background', 'Ceres::ItemPriceWidget')
            ->withSetting('showCrossPrice', false)
            ->withSetting('appearance', 'none');
    }

    private function createItemAvailabilityWidget()
    {
        $this->setItemBackgroundWidget->createChild('background', 'Ceres::ItemAvailabilityWidget')
            ->withSetting('customClass','');
    }

    private function createItemWishListWidget()
    {
        $this->setItemBackgroundWidget->createChild('background', 'Ceres::AddToWishListWidget')
            ->withSetting('customClass','');
    }

    private function createSetComponentWidget()
    {
        $this->setComponentWidget = $this->preset->createWidget('Ceres::ItemSetWidget')
            ->withSetting('customClass', '')
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 0)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 0)
            ->withSetting('spacing.padding.bottom.unit', null)
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.bottom.value', 3)
            ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function createSetComponentBackgroundWidget()
    {
        $this->setComponentBackgroundWidget = $this->setComponentWidget->createChild('itemSet', 'Ceres::BackgroundWidget')
            ->withSetting('customClass', '')
            ->withSetting('opacity', 100)
            ->withSetting('fullWidth', false)
            ->withSetting('backgroundFixed', true)
            ->withSetting('backgroundRepeat', false)
            ->withSetting('backgroundSize', 'bg-cover')
            ->withSetting('sourceType', 'none')
            ->withSetting('hugeFont', false)
            ->withSetting('colorPalette', 'custom')
            ->withSetting('customColor', '#FFFFFF')
            ->withSetting('height.top.value', 4)
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 4)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 4)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 4)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 4)
            ->withSetting('spacing.padding.bottom.unit', null);
    }

    private function createSetComponentThreeColumnWidget()
    {
        $this->setComponentThreeColumnWidget = $this->setComponentBackgroundWidget->createChild('background', 'Ceres::ThreeColumnWidget')
            ->withSetting('layout', 'oneToOneToOne')
            ->withSetting('customClass','mb-0');
    }

    private function createSetComponentItemName()
    {
        switch($this->ceresConfig->item->itemName)
        {
            case 0;
                $itemName = 'name1';
                break;
            case 1;
                $itemName = 'name2';
                break;
            case 2;
                $itemName = 'name3';
                break;
            default;
                $itemName = 'name1';
        }

        $dataProvider = $this->getShopBuilderDataFieldProvider("TextsDataFieldProvider::$itemName",array("texts.$itemName"));
        $this->setComponentThreeColumnWidget->createChild('first', 'Ceres::InlineTextWidget')
            ->withSetting('customClass', 'title-outer')
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 0)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 0)
            ->withSetting('spacing.padding.bottom.unit', null)
            ->withSetting('text', "<h1>$dataProvider</h1>")
            ->withSetting('appearance','none');
    }

    private function createSetComponentDescriptionWidget()
    {
        $this->setComponentThreeColumnWidget->createChild('first', 'Ceres::InlineTextWidget')
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
            ->withSetting('text', $this->getShopBuilderDataFieldProvider('TextsDataFieldProvider::description',array('texts.description', null, null)));
    }

    private function createSetComponentImageWidget()
    {
        $this->setComponentThreeColumnWidget->createChild('second', 'Ceres::ItemImageWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('maxQuantity', 10)
            ->withSetting('imageSize', 'urlMiddle')
            ->withSetting('showThumbs', true)
            ->withSetting('showDots', true);
    }

    private function createSetComponentAttributeSelectWidget()
    {
        $this->setComponentThreeColumnWidget->createChild('third', 'Ceres::AttributeWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('forceContent', false);
    }

    private function createOrderPropertyWidget()
    {
        $this->setComponentThreeColumnWidget->createChild('third', 'Ceres::OrderPropertyWidget')
            ->withSetting('appearance', 'none');
    }

    private function createSetComponentQuantityAndPriceWidget()
    {
        $grid = $this->setComponentThreeColumnWidget->createChild('third', 'Ceres::TwoColumnWidget')
            ->withSetting('layout', 'threeToNine')
            ->withSetting('layoutTablet', 'stackedTablet')
            ->withSetting('layoutMobile', 'stackedMobile');

        $grid->createChild('first', 'Ceres::QuantityInputWidget')
            ->withSetting('appearance', 'none')
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.bottom.value', 0)
            ->withSetting('spacing.margin.bottom.unit', null);

        $grid->createChild('second', 'Ceres::ItemPriceWidget')
            ->withSetting('showCrossPrice', false)
            ->withSetting('appearance', 'none')
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.top.value', 2)
            ->withSetting('spacing.margin.top.unit', null)
            ->withSetting('spacing.margin.bottom.value', 0)
            ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function createSetComponentAvailabilityWidget()
    {
        $this->setComponentThreeColumnWidget->createChild('third', 'Ceres::ItemAvailabilityWidget')
            ->withSetting('customClass','')
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.top.value', 3)
            ->withSetting('spacing.margin.top.unit', null)
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.bottom.value', 0)
            ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function createSetComponentWishList()
    {
        $this->setComponentThreeColumnWidget->createChild('third', 'Ceres::AddToWishListWidget')
            ->withSetting('customClass','');
    }

    private function createSecondTwoColumnWidget()
    {
        $this->secondTwoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'oneToOne')
            ->withSetting('customClass','mt-5');
    }

    private function createSecondSetPriceWidget()
    {
        $this->secondTwoColumnWidget->createChild('first', 'Ceres::ItemPriceWidget')
            ->withSetting('showCrossPrice', false)
            ->withSetting('appearance', 'none');
    }

    private function createLegalInformation()
    {
        $text ="* {% if services.customer.showNetPrices() %}{{ trans(\"Ceres::Template.singleItemExclVAT\") }}{% else %}{{ trans(\"Ceres::Template.singleItemInclVAT\") }}{% endif %} {{ trans(\"Ceres::Template.singleItemExclusive\") }}";
        $text .="<a {% if ceresConfig.global.shippingCostsCategoryId > 0 %} data-toggle=\"modal\" href=\"#shippingscosts\"{% endif %} title=\"{{ trans(\"Ceres::Template.singleItemShippingCosts\") }}\"> {{ trans(\"Ceres::Template.singleItemShippingCosts\") }}</a>";
        $this->secondTwoColumnWidget->createChild('first', 'Ceres::CodeWidget')
            ->withSetting('customClass', 'vat small text-muted')
            ->withSetting('text', "<span>$text</span>")
            ->withSetting('appearance', 'none');
    }

    private function createAddToBasketWidget()
    {
        $this->secondTwoColumnWidget->createChild('second', 'Ceres::AddToBasketWidget')
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.bottom.value', 3)
            ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function getShopBuilderDataFieldProvider($provider,$itemDataFields)
    {
        $query = "{# SHOPBUILDER:DATA_FIELD Ceres\\ShopBuilder\\DataFieldProvider\\Item\\$provider #}";
        $dataFields = implode(",", $itemDataFields);
        $query .= "{{ item_data_field($dataFields)}}";
        return $query;
    }
}
