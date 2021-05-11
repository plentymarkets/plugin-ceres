<?php

namespace Ceres\Widgets\Header;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class BreadcrumbWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Header.BreadcrumbWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::BreadcrumbWidget")
            ->withLabel("Widget.breadcrumbLabel")
            ->withPreviewImageUrl("/images/widgets/breadcrumb.svg")
            ->withType(WidgetTypes::HEADER)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition(0)
            ->withSearchKeyWords([
                "header", "breadcrumb", "brotkrumen"
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
        $settingsFactory->createCheckbox("isFixed")
            ->withName("Widget.breadcrumbIsFixedLabel")
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
