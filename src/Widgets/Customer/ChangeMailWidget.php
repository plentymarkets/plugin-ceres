<?php

namespace Ceres\Widgets\Customer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ChangeMailWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Customer.ChangeMailWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ChangeMailWidget")
            ->withLabel("Widget.changeMailLabel")
            ->withPreviewImageUrl("/images/widgets/change-mail.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::CUSTOMER)
            ->withPosition(300)
            ->withSearchKeyWords([
                "mail", "change", "ändern", "benutzer", "user", "account", "customer", "kunde", "kundendaten"
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
