<?php

namespace Ceres\Widgets\Helper\Factories\Settings\Includes;

use Ceres\Widgets\Helper\Factories\Settings\BaseSettingFactory;

class AppearanceSetting extends BaseSettingFactory
{
    private static $listBoxValues = [
        [
            'value' => 'primary',
            'caption' => 'Widget.widgetAppearancePrimary'
        ],
        [
            'value' => 'secondary',
            'caption' => 'Widget.widgetAppearanceSecondary'
        ],
        [
            'value' => 'success',
            'caption' => 'Widget.widgetAppearanceSuccess'
        ],
        [
            'value' => 'info',
            'caption' => 'Widget.widgetAppearanceInfo'
        ],
        [
            'value' => 'warning',
            'caption' => 'Widget.widgetAppearanceWarning'
        ],
        [
            'value' => 'danger',
            'caption' => 'Widget.widgetAppearanceDanger'
        ],
    ];

    public function __construct()
    {
        $this->withType('select')
            ->withDefaultValue('primary')
            ->withName('Widget.widgetAppearanceLabel')
            ->withOption('tooltipText', 'Widget.widgetAppearanceTooltip')
            ->withOption('listBoxValues', self::$listBoxValues);
    }
}
