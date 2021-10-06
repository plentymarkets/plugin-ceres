<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\ShopBuilder\Factories\Settings\BaseSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\ValueListFactory;

class IconSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('select')
            ->withDefaultValue('none')
            ->withName('Widget.widgetIconLabel')
            ->withOption('tooltipText', 'Widget.widgetIconTooltip');

        /** @var ValueListFactory $valueListFactory */
        $valueListFactory = pluginApp(ValueListFactory::class);
        $valueListFactory->addEntry('none', 'Widget.widgetIconNone')
            ->addEntry('fa-check', 'Widget.widgetIconCheck')
            ->addEntry('fa-info', 'Widget.widgetIconInfo')
            ->addEntry('fa-circle', 'Widget.widgetIconCircle')
            ->addEntry('fa-circle-thin', 'Widget.widgetIconCircleThin')
            ->addEntry('fa-comment-o', 'Widget.widgetIconComment')
            ->addEntry('fa-credit-card', 'Widget.widgetIconCreditcard')
            ->addEntry('fa-envelope-o', 'Widget.widgetIconEnvelope')
            ->addEntry('fa-heart', 'Widget.widgetIconHeart')
            ->addEntry('fa-thumbs-o-up', 'Widget.widgetIconThumbsUp')
            ->addEntry('fa-euro', 'Widget.widgetIconEuro')
            ->addEntry('fa-dollar', 'Widget.widgetIconDollar')
            ->addEntry('fa-percent', 'Widget.widgetIconPercent')
            ->addEntry('fa-gift', 'Widget.widgetIconGift')
            ->addEntry('fa-truck', 'Widget.widgetIconTruck')
            ->addEntry('fa-phone', 'Widget.widgetIconPhone')
            ->addEntry('fa-copyright', 'Widget.widgetIconCopyright')
            ->addEntry('fa-registered', 'Widget.widgetIconRegistered')
            ->addEntry('fa-sliders', 'Widget.widgetIconSliders');

        $this->withOption('listBoxValues', $valueListFactory->toArray());
    }
}
