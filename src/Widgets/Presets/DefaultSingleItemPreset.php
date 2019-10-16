<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;
use IO\Extensions\Functions\UniqueId;

class DefaultSingleItemPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var CeresConfig */
    private $ceresConfig;

    /** @var PresetWidgetFactory */
    private $twoColumnWidget;

    /** @var PresetWidgetFactory */
    private $secondTwoColumnWidget;

    /** @var PresetWidgetFactory */
    private $stickyContainer;

    /** @var PresetWidgetFactory */
    private $tabWidget;

    /** @var Translator */
    private $translator;

    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->translator = pluginApp(Translator::class);

        $this->createTwoColumnWidget();
        $this->createSecondTwoColumnWidget();
        $this->createItemImageWidget();
        $this->createTabWidget();
        $this->createStickyContainer();
        $this->createManufacturer();
        $this->createNameHeader();
        $this->createSeparatorWidget();
        $this->createItemVariationNumber();
        $this->createItemBundleWidget();
        $this->createOrderPropertyWidget();
        $this->createAttributeWidget();
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
        $this->stickyContainer = $this->twoColumnWidget->createChild('second', 'Ceres::StickyContainerWidget')
            ->withSetting('stickTo', 'stickToParent');
    }

    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'sevenToFive')
            ->withSetting('customClass','mt-5');
    }

    private function createSecondTwoColumnWidget()
    {
        $this->secondTwoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'sevenToFive');
    }

    private function createManufacturer()
    {
        $dataProvider = $this->getShopBuilderDataFieldProvider('ManufacturerDataFieldProvider::externalName',array('item.manufacturer.externalName'));

        $this->stickyContainer->createChild('sticky','Ceres::InlineTextWidget')
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
    private function createNameHeader()
    {
        $itemName = '';
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
        $this->stickyContainer->createChild('sticky', 'Ceres::InlineTextWidget')
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

    private function createAddToBasketWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::AddToBasketWidget')
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.top.value', 3)
            ->withSetting('spacing.margin.top.unit', null)
            ->withSetting('spacing.margin.bottom.value', 3)
            ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function createItemAvailabilityWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::ItemAvailabilityWidget')
            ->withSetting('customClass','');
    }

    private function createAddToWishListWiget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::AddToWishListWidget')
            ->withSetting('customClass','');
    }

    private function createItemPriceWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::ItemPriceWidget')
            ->withSetting('showCrossPrice', true)
            ->withSetting('appearance', 'none');
    }

    private function createItemVariationNumber()
    {
        $text = '';
        $text .= '<b>{{ trans("Ceres::Template.singleItemNumber") }}&nbsp;</b>';
        $text .= $this->getShopBuilderDataFieldProvider('VariationGlobalDataFieldProvider::number',array('variation.number'));


        $this->stickyContainer->createChild('sticky', 'Ceres::InlineTextWidget')
            ->withSetting('appearance', 'none')
            ->withSetting('customClass', 'articlenumber small text-muted')
            ->withSetting('text', $text)
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
            ->withSetting('spacing.margin.bottom.value', 5)
            ->withSetting('spacing.margin.bottom.unit', null);
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
            ->withSetting('customClass','');
    }

    private function createLegalInformation()
    {
        $text ="* {% if services.customer.showNetPrices() %}{{ trans(\"Ceres::Template.singleItemExclVAT\") }}{% else %}{{ trans(\"Ceres::Template.singleItemInclVAT\") }}{% endif %} {{ trans(\"Ceres::Template.singleItemExclusive\") }}";
        $text .="<a {% if ceresConfig.global.shippingCostsCategoryId > 0 %} data-toggle=\"modal\" href=\"#shippingscosts\"{% endif %} title=\"{{ trans(\"Ceres::Template.singleItemShippingCosts\") }}\"> {{ trans(\"Ceres::Template.singleItemShippingCosts\") }}</a>";
        $this->stickyContainer->createChild('sticky', 'Ceres::CodeWidget')
            ->withSetting('customClass', 'vat small text-muted')
            ->withSetting('text', "<span>$text</span>")
            ->withSetting('appearance', 'none');
    }

    private function createGraduatedPriceWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::GraduatedPriceWidget')
            ->withSetting('appearance', 'primary');
    }

    private function createOrderPropertyWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::OrderPropertyWidget')
            ->withSetting('appearance', 'none');
    }

    private function createItemBundleWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::ItemBundleWidget')
            ->withSetting('appearance', 'primary');
    }

    private function createTabWidget()
    {
        $uuidGenerator = pluginApp(UniqueId::class);
        $uuidTabDescription  = $uuidGenerator->generateUniqueId();
        $uuidTabTechData     = $uuidGenerator->generateUniqueId();
        $uuidTabMoreDetails  = $uuidGenerator->generateUniqueId();
        $titleTabDescription = $this->translator->trans("Ceres::Template.singleItemDescription");
        $titleTabTechData    = $this->translator->trans("Ceres::Widget.dataFieldTextsTechnicalData");
        $titleTabMoreDetails = $this->translator->trans("Ceres::Template.singleItemMoreDetails");
        $tabs = array(array('title' => $titleTabDescription,'uuid' => $uuidTabDescription),
                      array('title' => $titleTabTechData, 'uuid' => $uuidTabTechData),
                      array('title' => $titleTabMoreDetails, 'uuid' => $uuidTabMoreDetails));

        $this->tabWidget = $this->secondTwoColumnWidget->createChild('first', 'Ceres::TabWidget')
            ->withSetting('tabs', $tabs)
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.bottom.value', 5)
            ->withSetting('spacing.margin.bottom.unit', null)
            ->withSetting('spacing.margin.top.value', 5)
            ->withSetting('spacing.margin.top.unit', null);

        $this->tabWidget->createChild($uuidTabDescription, 'Ceres::InlineTextWidget')
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

        $this->tabWidget->createChild($uuidTabTechData, 'Ceres::InlineTextWidget')
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
            ->withSetting('text',$this->getShopBuilderDataFieldProvider('TextsDataFieldProvider::technicalData',array('texts.technicalData', null, null)));

        $this->tabWidget->createChild($uuidTabMoreDetails, 'Ceres::ItemDataTableWidget')
            ->withSetting('itemInformation',
                            array("item.id",
                                "item.condition.names.name",
                                "item.ageRestriction",
                                "variation.externalId",
                                "variation.model",
                                "item.manufacturer.externalName",
                                "item.producingCountry.names.name",
                                "unit.names.name",
                                "variation.weightG",
                                "variation.weightNetG",
                                "item.variationDimensions",
                                "item.customsTariffNumber"));
    }

    private function createAttributeWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::AttributeWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.bottom.value', 3)
            ->withSetting('spacing.margin.bottom.unit', null)
            ->withSetting('forceContent', false);
    }

    private function getShopBuilderDataFieldProvider($provider,$itemDataFields)
    {
        $query = "{# SHOPBUILDER:DATA_FIELD Ceres\\ShopBuilder\\DataFieldProvider\\Item\\$provider #}";
        $dataFields = implode(",", $itemDataFields);
        $query .= "{{ item_data_field($dataFields)}}";
        return $query;
    }
}
