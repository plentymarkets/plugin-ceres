<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;
use IO\Extensions\Functions\UniqueId;

class DefaultItemCategoryPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var CeresConfig */
    private $ceresConfig;

    /** @var PresetWidgetFactory */
    private $twoColumnWidget;

    /** @var PresetWidgetFactory */
    private $toolbarWidget;

    /** @var Translator */
    private $translator;

    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->translator = pluginApp(Translator::class);

        $this->createHeadline();
        $this->createToolbarWidget();
        $this->selectedFilterWidget();
        $this->paginationWidget();
        $this->createTwoColumnWidget();
        $this->createNavigationTreeWidget();
        $this->createItemGridWidget();

        return $this->preset->toArray();
    }

    private function createHeadline()
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.padding.top.value', 0)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 0)
            ->withSetting('spacing.padding.bottom.unit', null)
            ->withSetting('text', "<h1>Wohnzimmer</h1>")
            ->withSetting('appearance','none');
    }
    
    private function createToolbarWidget()
    {
        $this->toolbarWidget = $this->preset->createWidget('Ceres::ToolbarWidget')
            ->withSetting('customClass', '');
    }

    private function selectedFilterWidget()
    {
        $this->preset->createWidget("Ceres::SelectedFilterWidget")
            ->withSetting('customClass', '');
    }

    private function paginationWidget()
    {
        $this->preset->createWidget("Ceres::PaginationWidget")
            ->withSetting('alignment', 'right');
    }

    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'threeToNine');
    }

    private function createNavigationTreeWidget()
    {
        $this->twoColumnWidget->createChild('first', 'Ceres::NavigationTreeWidget')
            ->withSetting('customClass', '');
    }

    private function createItemGridWidget()
    {
        $this->twoColumnWidget->createChild('second', 'Ceres::ItemGridWidget')
            ->withSetting('numberOfColumns', 3)
            ->withSetting('customClass', '');
    }
}
