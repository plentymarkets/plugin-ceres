<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class SpacingSettingFactory extends ContainerSettingFactory
{
    public function __construct($usePadding, $useMargin)
    {
        parent::__construct();

        $this->withType('vertical');

        $this->withName('Widget.widgetSpacing');

        if($usePadding)
        {
            $this->children->createCheckbox('customPadding')
                ->withName('Widget.widgetCustomPadding');

            $this->children->createSetting('padding')
                ->withType('spacing')
                ->withCondition('!!spacing.customPadding')
                ->withOption('units', ['px', 'rem'])
                ->withOption('direction', 'all');
        }

        if($useMargin)
        {
            $this->children->createCheckbox('customMargin')
                ->withName('Widget.widgetCustomMargin');

            $this->children->createSetting('margin')
                ->withType('spacing')
                ->withCondition('!!spacing.customMargin')
                ->withOption('units', ['px', 'rem'])
                ->withOption('direction', 'all');
        }
    }
}
