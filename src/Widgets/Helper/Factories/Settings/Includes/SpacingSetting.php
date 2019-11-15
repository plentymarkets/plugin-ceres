<?php

namespace Ceres\Widgets\Helper\Factories\Settings\Includes;

use Ceres\Widgets\Helper\Factories\Settings\ContainerSettingFactory;

class SpacingSetting extends ContainerSettingFactory
{
    public function __construct()
    {
        parent::__construct();

        $this->withType('vertical');

        $this->children->createSetting('customPadding')
            ->withType('checkbox')
            ->withName('Widget.widgetCustomPadding');

        $this->children->createSetting('padding')
            ->withType('spacing')
            ->withCondition('!!spacing.customPadding')
            ->withOption('units', ['px', 'rem'])
            ->withOption('direction', 'all');

        $this->children->createSetting('customMargin')
            ->withType('checkbox')
            ->withName('Widget.widgetCustomMargin');

        $this->children->createSetting('margin')
            ->withType('spacing')
            ->withCondition('!!spacing.customMargin')
            ->withOption('units', ['px', 'rem'])
            ->withOption('direction', 'all');
    }
}
