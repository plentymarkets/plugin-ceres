<?php

namespace Ceres\Widgets\Footer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
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
        $settingFactory->createAppearance(true)
            ->withDefaultValue('primary');
        $settingFactory->createSpacing(false, true);

        $settingFactory->createSelect("buttonOrder")
            ->withCondition("showRejectAll")
            ->withName("Widget.cookieBarOrder")
            ->withDefaultValue("1-2-3")
            ->withTooltip("Widget.cookieBarOrderTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("1-2-3", "Widget.cookieBarOrder123")
                    ->addEntry("1-3-2", "Widget.cookieBarOrder132")
                    ->addEntry("2-1-3", "Widget.cookieBarOrder213")
                    ->addEntry("2-3-1", "Widget.cookieBarOrder231")
                    ->addEntry("3-1-2", "Widget.cookieBarOrder312")
                    ->addEntry("3-2-1", "Widget.cookieBarOrder321")
                    ->toArray()
            );

        $settingFactory->createSelect("buttonOrderWithoutRejectAll")
            ->withCondition("!showRejectAll")
            ->withName("Widget.cookieBarOrder")
            ->withDefaultValue("3-1")
            ->withTooltip("Widget.cookieBarOrderTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("1-3", "Widget.cookieBarOrder13")
                    ->addEntry("3-1", "Widget.cookieBarOrder31")
                    ->toArray()
            );

        $settingFactory->createCheckbox("showRejectAll")
            ->withDefaultValue(true)
            ->withName("Widget.cookieBarShowRejectAll");

        return $settingFactory->toArray();
    }
}
