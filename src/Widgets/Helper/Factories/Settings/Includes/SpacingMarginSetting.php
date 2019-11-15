<?php

namespace Ceres\Widgets\Helper\Factories\Settings\Includes;

use Ceres\Widgets\Helper\Factories\Settings\ContainerSettingFactory;

class SpacingMarginSetting extends ContainerSettingFactory
{
    public function __construct()
    {
        parent::__construct();

        $this->withType('vertical');

        $this->children->createCheckbox('customMargin')
            ->withName('Widget.widgetCustomMargin');

        $this->children->createSetting('margin')
            ->withType('spacing')
            ->withCondition('!!spacing.customMargin')
            ->withOption('units', ['px', 'rem'])
            ->withOption('direction', 'all');
    }
}
