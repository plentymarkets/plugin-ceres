<?php

namespace Ceres\Widgets\Customer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ChangePasswordWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Customer.ChangePasswordWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ChangePasswordWidget")
            ->withLabel("Widget.changePasswordLabel")
            ->withPreviewImageUrl("/images/widgets/change-password.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::CUSTOMER)
            ->withPosition(400)
            ->withSearchKeyWords([
                "login", "data", "change", "password", "passwort", "ändern", "customer", "kunde", "kundendaten"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createAppearance();
        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
