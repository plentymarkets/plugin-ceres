<?php

namespace Ceres\Widgets\Footer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class CookieBarWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Footer.CookieBarWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::CookieBarWidget")
            ->withLabel("Widget.cookieBarLabel")
            ->withPreviewImageUrl("/images/widgets/cookie-bar.svg")
            ->withType(WidgetTypes::FOOTER)
            ->withCategory(WidgetCategories::FOOTER)
            ->withPosition(100)
            ->withSearchKeyWords([
                "cookie", "cookies", "datenschutz", "privacy"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingFactory */
        $settingFactory = pluginApp(WidgetSettingsFactory::class);

        $settingFactory->createCustomClass();
        $settingFactory->createAppearance();
        $settingFactory->createSpacing(false, true);

        return $settingFactory->toArray();
    }
}
