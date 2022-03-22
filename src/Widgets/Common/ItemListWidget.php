<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ItemSortValueListFactory;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ItemListWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Common.ItemListWidget';

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ItemListWidget')
            ->withLabel('Widget.itemListLabel')
            ->withPreviewImageUrl('/images/widgets/item-list.svg')
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(700)
            ->withSearchKeyWords([
                "artikel", "artikelliste", "article", "item", "list"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createSelect('headlineStyle')
            ->withDefaultValue('default-caption')
            ->withName('Widget.itemListCaptionLabel')
            ->withTooltip('Widget.itemListCaptionTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('default-caption', 'Widget.itemListCaptionDefault')
                    ->addEntry('custom-caption', 'Widget.itemListCaptionCustom')
                    ->addEntry('no-caption', 'Widget.itemListCaptionNoCaption')
                    ->toArray()
            );

        $settings->createSelect('listType')
            ->withDefaultValue('category')
            ->withName('Widget.itemListListTypeLabel')
            ->withTooltip('Widget.itemListListTypeTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('all', 'Widget.itemListListTypeAllItems')
                    ->addEntry('category', 'Widget.itemListListTypeCategory')
                    ->addEntry('last_seen', 'Widget.itemListListTypeLastseen')
                    ->addEntry('tag_list', 'Widget.itemListListTypeTaglist')
                    ->addEntry('manufacturer', 'Widget.itemListListTypeManufacturer')
                    ->addEntry('cross_selling', 'Widget.itemListListTypeCrossSelling')
                    ->toArray()
            );

        $settings->createManufacturer('manufacturerId')
            ->withCondition('listType === "manufacturer"')
            ->withDefaultValue('')
            ->withName('Widget.itemListListTypeManufacturer')
            ->withTooltip('Widget.itemListManufacturerTooltip');

        $settings->createCategory('categoryId')
            ->withCondition('listType === "category"')
            ->withDefaultValue('')
            ->withName('Widget.itemListCategoryIdLabel')
            ->withTooltip('Widget.itemListCategoryIdTooltip');

        $settings->createNumber('tagId')
            ->withCondition('listType === "tag_list"')
            ->withDefaultValue('')
            ->withName('Widget.itemListTagIdLabel')
            ->withTooltip('Widget.itemListTagIdTooltip');

        $settings->createSelect('crossSellingRelationType')
            ->withCondition('listType === "cross_selling"')
            ->withDefaultValue('Similar')
            ->withName('Widget.itemListCrossSellingRelation')
            ->withTooltip('Widget.itemListCrossSellingRelationTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('Similar', 'Widget.itemListsCrossSellingTypeSimilar')
                    ->addEntry('Accessory', 'Widget.itemListsCrossSellingTypeAccessory')
                    ->addEntry('ReplacementPart', 'Widget.itemListsCrossSellingTypeReplacementPart')
                    ->addEntry('Bundle', 'Widget.itemListsCrossSellingTypeBundle')
                    ->toArray()
            );

        $settings->createSelect('itemSort')
            ->withCondition('listType !== "last_seen"')
            ->withDefaultValue('texts.name1_asc')
            ->withName('Widget.itemListItemSortLabel')
            ->withTooltip('Widget.itemListItemSortTooltip')
            ->withListBoxValues(
                ItemSortValueListFactory::make(true)->toArray()
            );

        $settings->createNumber('maxItems')
            ->withDefaultValue(4)
            ->withName('Widget.itemListMaxItemsLabel')
            ->withTooltip('Widget.itemListMaxItemsTooltip');

        $settings->createSelect('itemsPerPage')
            ->withDefaultValue(4)
            ->withName('Widget.itemListItemsPerPageLabel')
            ->withTooltip('Widget.itemListItemsPerPageTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(1, 'Widget.itemListItemsPerPage1')
                    ->addEntry(2, 'Widget.itemListItemsPerPage2')
                    ->addEntry(3, 'Widget.itemListItemsPerPage3')
                    ->addEntry(4, 'Widget.itemListItemsPerPage4')
                    ->toArray()
            );

        $settings->createCheckbox('preloadImage')
            ->withName('Widget.preloadImageLabel')
            ->withTooltip('Widget.preloadImageTooltip')
            ->withCondition('listType !== "last_seen" && listType !== "cross_selling"');

        $settings->createSelect('maxPreload')
            ->withName('Widget.maxPreloadLabel')
            ->withTooltip('Widget.maxPreloadTooltip')
            ->withDefaultValue(3)
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(1, 'Widget.itemListItemsPerPage1')
                    ->addEntry(2, 'Widget.itemListItemsPerPage2')
                    ->addEntry(3, 'Widget.itemListItemsPerPage3')
                    ->addEntry(4, 'Widget.itemListItemsPerPage4')
                    ->toArray()
            )
            ->withCondition("preloadImage");

        $settings->createCheckbox('noVat')
            ->withDefaultValue(false)
            ->withName('Widget.itemListNoVatLabel')
            ->withTooltip('Widget.itemListNoVatTooltip');

        $settings->createCheckbox('grayBackground')
            ->withDefaultValue(false)
            ->withName('Widget.itemListGrayBackgroundLabel')
            ->withTooltip('Widget.itemListGrayBackgroundTooltip');

        $settings->createCheckbox('outline')
            ->withDefaultValue(false)
            ->withName('Widget.itemListOutlineLabel')
            ->withTooltip('Widget.itemListOutlineTooltip');

        $settings->createSpacing();

        return $settings->toArray();
    }
}
