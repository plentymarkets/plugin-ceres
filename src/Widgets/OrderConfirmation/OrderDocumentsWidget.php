<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class OrderDocumentsWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.OrderConfirmation.OrderDocumentsWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::OrderDocumentsWidget")
            ->withLabel("Widget.orderDocumentsLabel")
            ->withPreviewImageUrl("/images/widgets/order-documents.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::ORDER_CONFIRMATION)
            ->withPosition(100)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();
        $settings->createButtonSize();
        $settings->createSpacing();

        return $settings->toArray();
    }
}
