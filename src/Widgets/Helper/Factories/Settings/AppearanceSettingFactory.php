<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class AppearanceSettingFactory extends BaseSettingFactory
{
    public function __construct($selectionNone = false, $themeColors = true, $colors = false, $name='Widget.widgetAppearanceLabel')
    {
        $this->withType('select')
            ->withDefaultValue($selectionNone ? 'none' : 'primary')
            ->withName($name)
            ->withOption('tooltipText', 'Widget.widgetAppearanceTooltip');

        /** @var ValueListFactory $valueListFactory */
        $valueListFactory = pluginApp(ValueListFactory::class);

        if($selectionNone)
        {
            $valueListFactory->addEntry('none', 'Widget.widgetAppearanceNone');
        }

        if ($themeColors)
        {
            $valueListFactory->addEntry('primary', 'Widget.widgetAppearancePrimary')
                ->addEntry('secondary', 'Widget.widgetAppearanceSecondary')
                ->addEntry('success', 'Widget.widgetAppearanceSuccess')
                ->addEntry('info', 'Widget.widgetAppearanceInfo')
                ->addEntry('warning', 'Widget.widgetAppearanceWarning')
                ->addEntry('danger', 'Widget.widgetAppearanceDanger');
        }

        if ($colors)
        {
            $valueListFactory->addEntry('blue', 'Widget.widgetAppearanceBlue')
                ->addEntry('indigo', 'Widget.widgetAppearanceIndigo')
                ->addEntry('purple', 'Widget.widgetAppearancePurple')
                ->addEntry('pink', 'Widget.widgetAppearancePink')
                ->addEntry('red', 'Widget.widgetAppearanceRed')
                ->addEntry('orange', 'Widget.widgetAppearanceOrange')
                ->addEntry('yellow', 'Widget.widgetAppearanceYellow')
                ->addEntry('green', 'Widget.widgetAppearanceGreen')
                ->addEntry('teal', 'Widget.widgetAppearanceTeal')
                ->addEntry('cyan', 'Widget.widgetAppearanceCyan')
                ->addEntry('white', 'Widget.widgetAppearanceWhite')
                ->addEntry('gray', 'Widget.widgetAppearanceGray')
                ->addEntry('gray-dark', 'Widget.widgetAppearanceGrayDark')
                ->addEntry('black', 'Widget.widgetAppearanceBlack');
        }

        $this->withOption('listBoxValues', $valueListFactory->toArray());
    }
}
