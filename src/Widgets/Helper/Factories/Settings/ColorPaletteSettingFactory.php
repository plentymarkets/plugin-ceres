<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class ColorPaletteSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('select')
            ->withDefaultValue('primary')
            ->withName('Widget.widgetColor')
            ->withOption('tooltipText', 'Widget.widgetAppearanceTooltip');

        /** @var ValueListFactory $valueListFactory */
        $valueListFactory = pluginApp(ValueListFactory::class);

        // theme colors
        $valueListFactory->addEntry('primary', 'Widget.widgetAppearancePrimary')
            ->addEntry('secondary', 'Widget.widgetAppearanceSecondary')
            ->addEntry('success', 'Widget.widgetAppearanceSuccess')
            ->addEntry('info', 'Widget.widgetAppearanceInfo')
            ->addEntry('warning', 'Widget.widgetAppearanceWarning')
            ->addEntry('danger', 'Widget.widgetAppearanceDanger');

        // colors
        $valueListFactory->addEntry('blue', 'Widget.widgetColorBlue')
            ->addEntry('indigo', 'Widget.widgetColorIndigo')
            ->addEntry('purple', 'Widget.widgetColorPurple')
            ->addEntry('pink', 'Widget.widgetColorPink')
            ->addEntry('red', 'Widget.widgetColorRed')
            ->addEntry('orange', 'Widget.widgetColorOrange')
            ->addEntry('yellow', 'Widget.widgetColorYellow')
            ->addEntry('green', 'Widget.widgetColorGreen')
            ->addEntry('teal', 'Widget.widgetColorTeal')
            ->addEntry('cyan', 'Widget.widgetColorCyan')
            ->addEntry('white', 'Widget.widgetColorWhite')
            ->addEntry('gray', 'Widget.widgetColorGray')
            ->addEntry('gray-dark', 'Widget.widgetColorGrayDark')
            ->addEntry('black', 'Widget.widgetColorBlack');

        $this->withOption('listBoxValues', $valueListFactory->toArray());
    }
}
