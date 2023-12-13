<?php

namespace Ceres\Widgets\Header;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetTypes;

class PresetHeaderWidget extends BaseWidget
{
      protected $template = "Ceres::Widgets.Header.PresetHeaderWidget";
  //  protected $template = "Ceres::Widgets.Header.BreadcrumbWidget";
    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::PresetHeader")
            ->withLabel("Widget.presetHeader")
            ->withPreviewImageUrl("/images/widgets/top-bar.svg")
            ->withType(WidgetTypes::HEADER)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition(0)
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
        $settingsFactory->createCheckbox("isFixed")
            ->withName("Widget.presetHeaderFixed")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("showOnHomepage")
            ->withName("Widget.breadcrumbShowOnHomepageLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("showOnMyAccount")
            ->withName("Widget.breadcrumbShowOnMyAccountLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("showOnCheckout")
            ->withName("Widget.breadcrumbShowOnCheckoutLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("showOnContentCategory")
            ->withName("Widget.breadcrumbShowOnContentCategoryLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("showOnLegalPages")
            ->withName("Widget.breadcrumbShowOnLegalPagesLabel")
            ->withDefaultValue(false);

        return $settingsFactory->toArray();
    }
}