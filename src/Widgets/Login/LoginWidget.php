<?php

namespace Ceres\Widgets\Login;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class LoginWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Login.LoginWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LoginWidget")
            ->withLabel("Widget.loginLabel")
            ->withPreviewImageUrl("/images/widgets/login.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::CUSTOMER)
            ->withPosition(100)
            ->withSearchKeyWords([
                "login"
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
