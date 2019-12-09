<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class GreetingWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.MyAccount.GreetingWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::GreetingWidget")
            ->withLabel("Widget.greetingWidgetLabel")
            ->withPreviewImageUrl("/images/widgets/greeting.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::CUSTOMER)
            ->withPosition(100)
            ->toArray();
    }
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();

        $settings->createSelect("salutation")
            ->withDefaultValue("firstname_surname")
            ->withName("Widget.greetingWidgetSalutationStyle")
            ->withTooltip("Widget.greetingWidgetSalutationStyleTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("firstname_surname", "Widget.greetingWidgetForenameSurname")
                    ->addEntry("firstname", "Widget.greetingWidgetForename")
                    ->addEntry("title_surname", "Widget.greetingWidgetTitleSurname")
                    ->addEntry("email", "Widget.greetingWidgetEmail")
                    ->toArray()
            );

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
