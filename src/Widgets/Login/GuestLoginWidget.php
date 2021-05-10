<?php

namespace Ceres\Widgets\Login;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class GuestLoginWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Login.GuestLoginWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::GuestLoginWidget")
            ->withLabel("Widget.guestLoginLabel")
            ->withPreviewImageUrl("/images/widgets/guest-login.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::CUSTOMER)
            ->withPosition(200)
            ->withSearchKeyWords([
                "login", "guest", "gast"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        $settings->createCustomClass();
        $settings->createAppearance();
        $settings->createButtonSize();
        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
