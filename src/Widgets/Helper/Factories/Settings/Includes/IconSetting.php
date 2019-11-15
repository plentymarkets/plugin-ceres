<?php

namespace Ceres\Widgets\Helper\Factories\Settings\Includes;

use Ceres\Widgets\Helper\Factories\Settings\BaseSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;

class IconSetting extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('select')
            ->withDefaultValue('none')
            ->withName('Widget.widgetIconLabel')
            ->withOption('tooltipText', 'Widget.widgetIconTooltip');

        /** @var ValueListFactory $valueListFactory */
        $valueListFactory = pluginApp(ValueListFactory::class);
        $valueListFactory->addEntry('none', 'Widget.widgetIconNone');
        $valueListFactory->addEntry('fa-check', 'Widget.widgetIconCheck');
        $valueListFactory->addEntry('fa-info', 'Widget.widgetIconInfo');
        $valueListFactory->addEntry('fa-circle', 'Widget.widgetIconCircle');
        $valueListFactory->addEntry('fa-circle-thin', 'Widget.widgetIconCircleThin');
        $valueListFactory->addEntry('fa-comment-o', 'Widget.widgetIconComment');
        $valueListFactory->addEntry('fa-credit-card', 'Widget.widgetIconCreditcard');
        $valueListFactory->addEntry('fa-envelope-o', 'Widget.widgetIconEnvelope');
        $valueListFactory->addEntry('fa-heart', 'Widget.widgetIconHeart');
        $valueListFactory->addEntry('fa-thumbs-o-up', 'Widget.widgetIconThumbsUp');
        $valueListFactory->addEntry('fa-euro', 'Widget.widgetIconEuro');
        $valueListFactory->addEntry('fa-dollar', 'Widget.widgetIconDollar');
        $valueListFactory->addEntry('fa-percent', 'Widget.widgetIconPercent');
        $valueListFactory->addEntry('fa-gift', 'Widget.widgetIconGift');
        $valueListFactory->addEntry('fa-truck', 'Widget.widgetIconTruck');
        $valueListFactory->addEntry('fa-phone', 'Widget.widgetIconPhone');
        $valueListFactory->addEntry('fa-copyright', 'Widget.widgetIconCopyright');
        $valueListFactory->addEntry('fa-registered', 'Widget.widgetIconRegistered');

        $this->withOption('listBoxValues', $valueListFactory->toArray());
    }
}
