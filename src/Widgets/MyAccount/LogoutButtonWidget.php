<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class LogoutButtonWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.MyAccount.LogoutButtonWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LogoutButtonWidget")
            ->withLabel("Widget.logoutButtonLabel")
            ->withPreviewImageUrl("/images/widgets/logout.svg")
            ->withType(WidgetTypes::MY_ACCOUNT)
            ->withCategory(WidgetCategories::MY_ACCOUNT)
            ->withPosition(700)
            ->withSearchKeyWords([
                "logout", "button", "schaltfläche"
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
        $settings->createAppearance()
                 ->withDefaultValue("danger");

        $settings->createButtonSize();
        $settings->createSpacing();

        return $settings->toArray();
    }
}
