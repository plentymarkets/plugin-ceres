<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ItemListWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.ItemListWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ItemListWidget")
            ->withLabel("Widget.itemListLabel")
            ->withPreviewImageUrl("/images/widgets/item-list.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(700)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createSelect("headlineStyle")
            ->withDefaultValue("default-caption")
            ->withName("Widget.itemListCaptionLabel")
            ->withTooltip("Widget.itemListCaptionTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("default-caption", "Widget.itemListCaptionDefault")
                    ->addEntry("custom-caption", "Widget.itemListCaptionCustom")
                    ->addEntry("no-caption", "Widget.itemListCaptionNoCaption")
                    ->toArray()
            );

        $settings->createSelect("listType")
            ->withDefaultValue("category")
            ->withName("Widget.itemListListTypeLabel")
            ->withTooltip("Widget.itemListListTypeTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("category", "Widget.itemListListTypeCategory")
                    ->addEntry("last_seen", "Widget.itemListListTypeLastseen")
                    ->addEntry("tag_list", "Widget.itemListListTypeTaglist")
                    ->addEntry("manufacturer", "Widget.itemListListTypeManufacturer")
                    ->addEntry("cross_selling", "Widget.itemListListTypeCrossSelling")
                    ->toArray()
            );

        $settings->createManufacturer("manufacturerId")
            ->withCondition("listType === 'manufacturer'")
            ->withDefaultValue("")
            ->withName("Widget.itemListListTypeManufacturer")
            ->withTooltip("Widget.itemListManufacturerTooltip");

        $settings->createCategory("categoryId")
            ->withCondition("listType === 'category'")
            ->withDefaultValue("")
            ->withName("Widget.itemListCategoryIdLabel")
            ->withTooltip("Widget.itemListCategoryIdTooltip");

        $settings->createNumber("tagId")
            ->withCondition("listType === 'tag_list'")
            ->withDefaultValue("")
            ->withName("Widget.itemListTagIdLabel")
            ->withTooltip("Widget.itemListTagIdTooltip");

        $settings->createSelect("crossSellingRelationType")
            ->withCondition("listType === 'cross_selling'")
            ->withDefaultValue("Similar")
            ->withName("Widget.itemListCrossSellingRelation")
            ->withTooltip("Widget.itemListCrossSellingRelationTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("Similar", "Widget.itemListsCrossSellingTypeSimilar")
                    ->addEntry("Accessory", "Widget.itemListsCrossSellingTypeAccessory")
                    ->addEntry("ReplacementPart", "Widget.itemListsCrossSellingTypeReplacementPart")
                    ->addEntry("Bundle", "Widget.itemListsCrossSellingTypeBundle")
                    ->toArray()
            );

        $settings->createSelect("itemSort")
            ->withCondition("listType !== 'last_seen'")
            ->withDefaultValue("texts.name1_asc")
            ->withName("Widget.itemListItemSortLabel")
            ->withTooltip("Widget.itemListItemSortTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("default.recommended_sorting", "Widget.itemRecommendedSorting")
                    ->addEntry("texts.name1_asc", "Widget.itemName_asc")
                    ->addEntry("texts.name1_desc", "Widget.itemName_desc")
                    ->addEntry("sorting.price.avg_asc", "Widget.itemPrice_asc")
                    ->addEntry("sorting.price.avg_desc", "Widget.itemPrice_desc")
                    ->addEntry("variation.createdAt_desc", "Widget.itemVariationCreateTimestamp_desc")
                    ->addEntry("variation.createdAt_asc", "Widget.itemVariationCreateTimestamp_asc")
                    ->addEntry("variation.availability.averageDays_asc", "Widget.itemAvailabilityAverageDays_asc")
                    ->addEntry("variation.availability.averageDays_desc", "Widget.itemAvailabilityAverageDays_desc")
                    ->addEntry("variation.number_asc", "Widget.itemVariationCustomNumber_asc")
                    ->addEntry("variation.number_desc", "Widget.itemVariationCustomNumber_desc")
                    ->addEntry("variation.updatedAt_asc", "Widget.itemVariationLastUpdateTimestamp_asc")
                    ->addEntry("variation.updatedAt_desc", "Widget.itemVariationLastUpdateTimestamp_desc")
                    ->addEntry("item.manufacturer.externalName_asc", "Widget.itemProducerName_asc")
                    ->addEntry("item.manufacturer.externalName_desc", "Widget.itemProducerName_desc")
                    ->addEntry("item.random", "Widget.itemRandom")
                    ->addEntry("variation.position_asc", "Widget.itemVariationTopseller_asc")
                    ->addEntry("variation.position_desc", "Widget.itemVariationTopseller_desc")
                    ->toArray()
            );

        $settings->createNumber("maxItems")
            ->withDefaultValue(4)
            ->withName("Widget.itemListMaxItemsLabel")
            ->withTooltip("Widget.itemListMaxItemsTooltip");

        $settings->createSelect("itemsPerPage")
            ->withDefaultValue(4)
            ->withName("Widget.itemListItemsPerPageLabel")
            ->withTooltip("Widget.itemListItemsPerPageTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(1, "Widget.itemListItemsPerPage1")
                    ->addEntry(2, "Widget.itemListItemsPerPage2")
                    ->addEntry(3, "Widget.itemListItemsPerPage3")
                    ->addEntry(4, "Widget.itemListItemsPerPage4")
                    ->toArray()
            );

        $settings->createSpacing();

        return $settings->toArray();
    }
}
