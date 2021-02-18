<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\ShopBuilder\Factories\Settings\BaseSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\ValueListFactory;

class ColorPaletteSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('select')
            ->withDefaultValue('none')
            ->withName('Widget.widgetColor')
            ->withOption('tooltipText', 'Widget.widgetAppearanceTooltip');

        /** @var ValueListFactory $valueListFactory */
        $valueListFactory = pluginApp(ValueListFactory::class);

        $valueListFactory
            ->addEntry('none', 'Widget.widgetAppearanceNone')
            ->addEntry('primary', 'Widget.widgetAppearancePrimary')
            ->addEntry('secondary', 'Widget.widgetAppearanceSecondary')
            ->addEntry('success', 'Widget.widgetAppearanceSuccess')
            ->addEntry('info', 'Widget.widgetAppearanceInfo')
            ->addEntry('warning', 'Widget.widgetAppearanceWarning')
            ->addEntry('danger', 'Widget.widgetAppearanceDanger')
            ->addEntry('dark', 'Widget.widgetColorDark')
            ->addEntry('white', 'Widget.widgetColorWhite')
            ->addEntry('custom', 'Widget.widgetColorCustom');

        $this->withOption('listBoxValues', $valueListFactory->toArray());
    }
}
