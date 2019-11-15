<?php

namespace Ceres\Widgets\Helper\Factories\Settings\Includes;

use Ceres\Widgets\Helper\Factories\Settings\BaseSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;

class AppearanceSetting extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('select')
            ->withDefaultValue('primary')
            ->withName('Widget.widgetAppearanceLabel')
            ->withOption('tooltipText', 'Widget.widgetAppearanceTooltip');

        /** @var ValueListFactory $valueListFactory */
        $valueListFactory = pluginApp(ValueListFactory::class);
        $valueListFactory->addEntry('primary', 'Widget.widgetAppearancePrimary');
        $valueListFactory->addEntry('secondary', 'Widget.widgetAppearanceSecondary');
        $valueListFactory->addEntry('success', 'Widget.widgetAppearanceSuccess');
        $valueListFactory->addEntry('info', 'Widget.widgetAppearanceInfo');
        $valueListFactory->addEntry('warning', 'Widget.widgetAppearanceWarning');
        $valueListFactory->addEntry('danger', 'Widget.widgetAppearanceDanger');

        $this->withOption('listBoxValues', $valueListFactory->toArray());
    }
}
