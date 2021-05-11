<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

/**
 * Class ItemCategoryPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for viewing item categories. It contains:
 * - ThreeColumnWidget
 * - BackgroundWidget
 * - InlineTextWidget
 * - CodeWidget
 * - ToolbarWidget
 * - ItemSortingWidget
 * - ItemsPerPageWidget
 * - AttributesPropertiesCharacteristicsFilterWidget
 * - PriceFilterWidget
 * - AvailabilityFilterWidget
 * - ManufacturerFilterWidget
 * - SelectedFilterWidget
 * - PaginationWidget
 * - TwoColumnWidget
 * - NavigationTreeWidget
 * - ItemGridWidget
 *
 * @package Ceres\Widgets\Presets
 */
class ItemCategoryPreset implements ContentPreset
{
    /** @var CeresConfig */
    private $ceresConfig;

    /** @var bool */
    private $showNavigationTree = false;

    /** @var PresetHelper */
    private $preset;

    /** @var PresetWidgetFactory */
    private $backgroundWidget;

    /** @var PresetWidgetFactory */
    private $toolbarWidget;

    /** @var PresetWidgetFactory */
    private $threeColumnWidget;

    /** @var PresetWidgetFactory */
    private $twoColumnWidget;

    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        $this->ceresConfig        = pluginApp(CeresConfig::class);
        $this->showNavigationTree = $this->ceresConfig->header->showNavBars == 'side' || $this->ceresConfig->header->showNavBars == 'both';

        $this->preset = pluginApp(PresetHelper::class);

        $this->createBackgroundWidget();

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

        if ($this->showNavigationTree) {
            $this->createTwoColumnWidget();
            $this->createNavigationTreeWidget();
        }

        $this->createItemGridWidget();

        $this->createInlineTextWidget(false, 'Bottom');

        return $this->preset->toArray();
    }

    private function createBackgroundWidget()
    {
        if ($this->ceresConfig->item->showCategoryImage) {
            $this->backgroundWidget = $this->preset->createWidget('Ceres::BackgroundWidget')
                                                   ->withSetting('customClass', 'align-items-end')
                                                   ->withSetting('spacing.customMargin', true)
                                                   ->withSetting('spacing.margin.bottom.value', 3)
                                                   ->withSetting('spacing.margin.bottom.unit', null)
                                                   ->withSetting('opacity', 100)
                                                   ->withSetting('fullWidth', true)
                                                   ->withSetting('backgroundFixed', true)
                                                   ->withSetting('backgroundRepeat', false)
                                                   ->withSetting('backgroundSize', 'bg-cover')
                                                   ->withSetting('sourceType', 'category-image1')
                                                   ->withSetting('hugeFont', true)
                                                   ->withSetting('colorPalette', 'none')
                                                   ->withSetting('height.top.value', 4)
                                                   ->withSetting('preloadImage', true);

            $this->createInlineTextWidget();
        } else {
            $this->createInlineTextWidget(false);
        }
    }

    private function createInlineTextWidget($asChild = true, $descriptionSettingKey = 'Top')
    {
        $text = '{% if category is not empty %}
                    {% set categoryName = category.details[0].name %}
                    {% set categoryDescription = category.details[0].description %}
                    {% set categoryDescription2 = category.details[0].description2 %}
                {% else %}
                   {% set categoryName = trans("Ceres::Widget.backgroundPreviewTextCategoryName") %}
                   {% set categoryDescription = trans("Ceres::Widget.backgroundPreviewTextCategoryDescription") ~ " 1" %}
                   {% set categoryDescription2 = trans("Ceres::Widget.backgroundPreviewTextCategoryDescription") ~ " 2" %}
                {% endif %}

                {% set descriptionSetting = ceresConfig.item.showCategoryDescription' . $descriptionSettingKey . ' %}';

        if ($descriptionSettingKey == 'Top') {
            $text .= '<h1 class="pt-4 category-title">{{ categoryName }}</h1>';
        }

        $text .= '
                {% if descriptionSetting == "both" %}
                     <div class="category-description mb-3">{{ categoryDescription | raw }}</div>
                     <div class="category-description mb-3">{{ categoryDescription2 | raw }}</div>
                {% else %}
                    <div class="category-description mb-3">{% if descriptionSetting == "description1" %}{{ categoryDescription | raw }}{% elseif descriptionSetting == "description2" %}{{ categoryDescription2 | raw }}{% endif %}</div>
                {% endif %}';

        $codeWidget = $asChild
        ? $this->backgroundWidget->createChild('background', 'Ceres::CodeWidget')
        : $this->preset->createWidget('Ceres::CodeWidget');

        $codeWidget->withSetting('spacing.customPadding', true)
                   ->withSetting('spacing.padding.left.value', 0)
                   ->withSetting('spacing.padding.left.unit', null)
                   ->withSetting('spacing.padding.right.value', 0)
                   ->withSetting('spacing.padding.right.unit', null)
                   ->withSetting('spacing.padding.top.value', 0)
                   ->withSetting('spacing.padding.top.unit', null)
                   ->withSetting('spacing.padding.bottom.value', 0)
                   ->withSetting('spacing.padding.bottom.unit', null)
                   ->withSetting('spacing.customMargin', true)
                   ->withSetting('spacing.margin.bottom.value', 0)
                   ->withSetting('spacing.margin.bottom.unit', null)
                   ->withSetting('text', $text);

        if ($descriptionSettingKey == 'Top') {
            $codeWidget->withSetting('customClass', 'text-white text-shadow');
        }
        else
        {
            $codeWidget->withSetting('customClass', '');
        }
    }

    private function createToolbarWidget()
    {
        $this->toolbarWidget = $this->preset->createWidget('Ceres::ToolbarWidget')
                                            ->withSetting('customClass', '')
                                            ->withSetting('spacing.customMargin', true)
                                            ->withSetting('spacing.margin.bottom.value', 4)
                                            ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function createItemSortingWidget()
    {
        $this->toolbarWidget->createChild('toolbar', 'Ceres::ItemSortingWidget')
                            ->withSetting('customClass', '')
                            ->withSetting('itemSortOptions',
                                          [
                                              'texts.name1_asc',
                                              'texts.name1_desc',
                                              'sorting.price.avg_asc',
                                              'sorting.price.avg_desc'
                                          ]
                            );
    }

    private function createItemsPerPageWidget()
    {
        $this->toolbarWidget->createChild('toolbar', 'Ceres::ItemsPerPageWidget')
                            ->withSetting('customClass', '')
                            ->withSetting('entries', [
                                ['text' => '20'],
                                ['text' => '40'],
                                ['text' => '100']
                            ]);
    }

    private function createThreeColumnWidget()
    {
        $this->threeColumnWidget = $this->toolbarWidget->createChild('collapsable', 'Ceres::ThreeColumnWidget')
                                                       ->withSetting('customClass', '')
                                                       ->withSetting('layout', 'oneToOneToOne');
    }

    private function createAttributesPropertiesCharacteristicsFilterWidget()
    {
        $this->threeColumnWidget->createChild('first', 'Ceres::AttributesPropertiesCharacteristicsFilterWidget')
                                ->withSetting('customClass', '');
    }

    private function createPriceFilterWidget()
    {
        $this->threeColumnWidget->createChild('second', 'Ceres::PriceFilterWidget')
                                ->withSetting('appearance', 'primary')
                                ->withSetting('customClass', '')
                                ->withSetting('spacing.customMargin', true)
                                ->withSetting('spacing.margin.bottom.value', 4)
                                ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function createAvailabilityFilterWidget()
    {
        $this->threeColumnWidget->createChild('second', 'Ceres::AvailabilityFilterWidget')
                                ->withSetting('customClass', '');
    }

    private function createManufacturerFilterWidget()
    {
        $this->threeColumnWidget->createChild('third', 'Ceres::ManufacturerFilterWidget')
                                ->withSetting('customClass', '');
    }

    private function selectedFilterWidget()
    {
        $this->preset->createWidget('Ceres::SelectedFilterWidget')
                     ->withSetting('customClass', '')
                     ->withSetting('appearance', 'primary')
                     ->withSetting('alignment', 'right')
                     ->withSetting('spacing.customMargin', true)
                     ->withSetting('spacing.margin.bottom.value', 2)
                     ->withSetting('spacing.margin.bottom.unit', null);
    }

    private function paginationWidget()
    {
        $this->preset->createWidget('Ceres::PaginationWidget')
                     ->withSetting('alignment', 'right');
    }

    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
                                              ->withSetting('layout', 'threeToNine')
                                              ->withSetting('layoutTablet', 'stackedTablet')
                                              ->withSetting('layoutMobile', 'stackedMobile');
    }

    private function createNavigationTreeWidget()
    {
        $this->twoColumnWidget->createChild('first', 'Ceres::NavigationTreeWidget')
                              ->withSetting('customClass', '')
                              ->withSetting('expandableChildren', true)
                              ->withSetting('showItemCount', true);
    }

    private function createItemGridWidget()
    {
        if ($this->showNavigationTree) {
            $this->twoColumnWidget->createChild('second', 'Ceres::ItemGridWidget')
                                  ->withSetting('numberOfColumnsDesktop', 3)
                                  ->withSetting('numberOfColumnsTablet', 2)
                                  ->withSetting('numberOfColumnsMobile', 1)
                                  ->withSetting('customClass', '');
        } else {
            $this->preset->createWidget('Ceres::ItemGridWidget')
                         ->withSetting('numberOfColumnsDesktop', 4)
                         ->withSetting('numberOfColumnsTablet', 3)
                         ->withSetting('numberOfColumnsMobile', 1)
                         ->withSetting('customClass', '');
        }
    }
}
