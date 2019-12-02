<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

class DefaultItemSearchPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;
    
    /** @var PresetWidgetFactory */
    private $toolbarWidget;

    /** @var PresetWidgetFactory */
    private $threeColumnWidget;

    /** @var PresetWidgetFactory */
    private $twoColumnWidget;

    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);

        $this->createHeadline();

        $this->createToolbarWidget();
        $this->createItemSortingWidget();
        $this->createItemsPerPageWidget();
        $this->createThreeColumnWidget();

        $this->createAttributesPropertiesCharacteristicsFilterWidget();
        $this->createPriceFilterWidget();
        $this->createAvailabilityFilterWidget();
        $this->createManufacturerFilterWidget();

        $this->selectedFilterWidget();
        $this->paginationWidget();
        $this->createItemGridWidget();

        return $this->preset->toArray();
    }

    private function createHeadline()
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting('spacing.customPadding', true)
            ->withSetting('customClass', 'h2')
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 0)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 0)
            ->withSetting('spacing.padding.bottom.unit', null)
            ->withSetting('text', '<h1>{{ trans("Ceres::Template.itemSearchResults") }}</h1>')
            ->withSetting('appearance','none');
    }
    
    private function createToolbarWidget()
    {
        $this->toolbarWidget = $this->preset->createWidget('Ceres::ToolbarWidget')
            ->withSetting('customClass', '')
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 4)
            ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function createItemSortingWidget()
    {
        $this->toolbarWidget->createChild("toolbar", "Ceres::ItemSortingWidget")
            ->withSetting('customClass', '')
            ->withSetting('itemSortOptions', ["texts.name1_asc", "texts.name1_desc", "sorting.price.avg_asc", "sorting.price.avg_desc"]);
    }

    private function createItemsPerPageWidget()
    {
        $this->toolbarWidget->createChild("toolbar", "Ceres::ItemsPerPageWidget")
             ->withSetting('customClass', '');
    }

    private function createThreeColumnWidget()
    {
        $this->threeColumnWidget = $this->toolbarWidget->createChild("collapsable", "Ceres::ThreeColumnWidget")
            ->withSetting('customClass', '')
            ->withSetting('layout', 'oneToOneToOne');
    }

    private function createAttributesPropertiesCharacteristicsFilterWidget()
    {
        $this->threeColumnWidget->createChild("first", "Ceres::AttributesPropertiesCharacteristicsFilterWidget")
            ->withSetting('customClass', '');
    }
    private function createPriceFilterWidget()
    {
        $this->threeColumnWidget->createChild("second", "Ceres::PriceFilterWidget")
            ->withSetting('customClass', '')
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 4)
            ->withSetting("spacing.margin.bottom.unit", null);
    }
    private function createAvailabilityFilterWidget()
    {
        $this->threeColumnWidget->createChild("second", "Ceres::AvailabilityFilterWidget")
            ->withSetting('customClass', '');
    }
    private function createManufacturerFilterWidget()
    {
        $this->threeColumnWidget->createChild("third", "Ceres::ManufacturerFilterWidget")
            ->withSetting('customClass', '');
    }

    private function selectedFilterWidget()
    {
        $this->preset->createWidget("Ceres::SelectedFilterWidget")
            ->withSetting('customClass', '')
            ->withSetting('appearance', 'primary')
            ->withSetting('alignment', 'right')
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 2)
            ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function paginationWidget()
    {
        $this->preset->createWidget("Ceres::PaginationWidget")
            ->withSetting('alignment', 'right');
    }

    private function createItemGridWidget()
    {
        $this->preset->createWidget("Ceres::ItemGridWidget")
            ->withSetting('numberOfColumns', 4)
            ->withSetting('customClass', '');
    }
}
