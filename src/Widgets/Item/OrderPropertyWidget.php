<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract;

class OrderPropertyWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Item.OrderPropertyWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::OrderPropertyWidget")
            ->withLabel("Widget.orderPropertyLabel")
            ->withPreviewImageUrl("/images/widgets/order-property.svg")
            ->withType(WidgetTypes::SET_COMPONENT)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(300)
            ->withSearchKeyWords([
                "item", "artikel", "article", "order", "property", "bestellung"
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
        $settingsFactory->createAppearance(true);
        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }

    public function getTemplateData($widgetSettings, $isPreview)
    {
        /** @var WebstoreConfigurationRepositoryContract $webstoreConfigurationRepository */
        $webstoreConfigurationRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);
        $webstoreConfiguration = $webstoreConfigurationRepository->getWebstoreConfiguration();

        return ['useVariationOrderProperties' => $webstoreConfiguration->useVariationOrderProperties];
    }
}
