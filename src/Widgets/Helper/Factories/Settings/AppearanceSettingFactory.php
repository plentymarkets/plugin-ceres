<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class AppearanceSettingFactory extends BaseSettingFactory
{
    public function __construct($optional)
    {
        $this->withType('select')
            ->withDefaultValue($optional ? 'none' : 'primary')
            ->withName('Widget.widgetAppearanceLabel')
            ->withOption('tooltipText', 'Widget.widgetAppearanceTooltip');

        /** @var ValueListFactory $valueListFactory */
        $valueListFactory = pluginApp(ValueListFactory::class);

        if($optional)
        {
            $valueListFactory->addEntry('none', 'Widget.widgetAppearanceNone');
        }

        $valueListFactory->addEntry('primary', 'Widget.widgetAppearancePrimary')
            ->addEntry('secondary', 'Widget.widgetAppearanceSecondary')
            ->addEntry('success', 'Widget.widgetAppearanceSuccess')
            ->addEntry('info', 'Widget.widgetAppearanceInfo')
            ->addEntry('warning', 'Widget.widgetAppearanceWarning')
            ->addEntry('danger', 'Widget.widgetAppearanceDanger');

        $this->withOption('listBoxValues', $valueListFactory->toArray());
    }
}
