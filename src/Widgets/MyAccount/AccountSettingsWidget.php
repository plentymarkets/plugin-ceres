<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class AccountSettingsWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.MyAccount.AccountSettingsWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::AccountSettingsWidget")
            ->withLabel("Widget.myAccountAccountSettingsLabel")
            ->withPreviewImageUrl("/images/widgets/account-settings.svg")
            ->withType(WidgetTypes::MY_ACCOUNT)
            ->withCategory(WidgetCategories::MY_ACCOUNT)
            ->withPosition(100)
            ->withSearchKeyWords([
                "account", "settings", "einstellungen"
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
        $settings->createSpacing();

        return $settings->toArray();
    }
}
