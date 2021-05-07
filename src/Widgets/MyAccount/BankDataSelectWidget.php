<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class BankDataSelectWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.MyAccount.BankDataSelectWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::BankDataSelectWidget")
            ->withLabel("Template.myAccountBankDetails")
            ->withPreviewImageUrl("/images/widgets/bank-details.svg")
            ->withType(WidgetTypes::MY_ACCOUNT)
            ->withCategory(WidgetCategories::MY_ACCOUNT)
            ->withPosition(100)
            ->withSearchKeyWords([
                "bank", "bankverbindung", "zahlungsmittel"
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
        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
