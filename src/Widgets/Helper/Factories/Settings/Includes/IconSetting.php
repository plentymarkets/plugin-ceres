<?php

namespace Ceres\Widgets\Helper\Factories\Settings\Includes;

use Ceres\Widgets\Helper\Factories\Settings\BaseSettingFactory;

class IconSetting extends BaseSettingFactory
{
    private static $listBoxValues = [
        [
            'value' => 'none',
            'caption' => 'Widget.widgetIconNone'
        ],
        [
            'value' => 'fa-check',
            'caption' => 'Widget.widgetIconCheck'
        ],
        [
            'value' => 'fa-info',
            'caption' => 'Widget.widgetIconInfo'
        ],
        [
            'value' => 'fa-circle',
            'caption' => 'Widget.widgetIconCircle'
        ],
        [
            'value' => 'fa-circle-thin',
            'caption' => 'Widget.widgetIconCircleThin'
        ],
        [
            'value' => 'fa-comment-o',
            'caption' => 'Widget.widgetIconComment'
        ],
        [
            'value' => 'fa-credit-card',
            'caption' => 'Widget.widgetIconCreditcard'
        ],
        [
            'value' => 'fa-envelope-o',
            'caption' => 'Widget.widgetIconEnvelope'
        ],
        [
            'value' => 'fa-heart',
            'caption' => 'Widget.widgetIconHeart'
        ],
        [
            'value' => 'fa-thumbs-o-up',
            'caption' => 'Widget.widgetIconThumbsUp'
        ],
        [
            'value' => 'fa-euro',
            'caption' => 'Widget.widgetIconEuro'
        ],
        [
            'value' => 'fa-dollar',
            'caption' => 'Widget.widgetIconDollar'
        ],
        [
            'value' => 'fa-percent',
            'caption' => 'Widget.widgetIconPercent'
        ],
        [
            'value' => 'fa-gift',
            'caption' => 'Widget.widgetIconGift'
        ],
        [
            'value' => 'fa-truck',
            'caption' => 'Widget.widgetIconTruck'
        ],
        [
            'value' => 'fa-phone',
            'caption' => 'Widget.widgetIconPhone'
        ],
        [
            'value' => 'fa-copyright',
            'caption' => 'Widget.widgetIconCopyright'
        ],
        [
            'value' => 'fa-registered',
            'caption' => 'Widget.widgetIconRegistered'
        ]
    ];

    public function __construct()
    {
        $this->withType('select')
            ->withDefaultValue('none')
            ->withName('Widget.widgetIconLabel')
            ->withOption('tooltipText', 'Widget.widgetIconTooltip')
            ->withOption('listBoxValues', self::$listBoxValues);
    }
}
