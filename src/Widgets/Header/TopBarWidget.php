<?php

namespace Ceres\Widgets\Header;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class TopBarWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Header.TopBarWidget";
    
    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::TopBarWidget")
            ->withLabel("Widget.topBarLabel")
            ->withPreviewImageUrl("/images/widgets/top-bar.svg")
            ->withType(WidgetTypes::HEADER)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition(0)
            ->withAllowedNestingTypes(
                [
                    WidgetTypes::STRUCTURE,
                    WidgetTypes::STATIC,
                    WidgetTypes::DEFAULT,
                    WidgetTypes::ITEM_SEARCH
                ]
            )
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
            ->withName("Widget.topBarIsFixedLabel")
            ->withDefaultValue(true);

        $settingsFactory->createSelect("searchStyle")
            ->withName("Widget.topBarSearchStyleLabel")
            ->withTooltip("Widget.topBarSearchStyleTooltip")
            ->withDefaultValue("onDemand")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("hidden", "Widget.topBarSearchStyleHidden")
                    ->addEntry("onDemand", "Widget.topBarSearchStyleOnDemand")
                    ->addEntry("permanent", "Widget.topBarSearchStylePermanent")
                    ->toArray()
            );

        $settingsFactory->createCheckbox("enableLogin")
            ->withName("Widget.topBarEnableLoginLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("enableRegistration")
            ->withName("Widget.topBarEnableRegistrationLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("enableLanguageSelect")
            ->withName("Widget.topBarEnableLanguageSelectLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("enableShippingCountrySelect")
            ->withName("Widget.topBarEnableShippingCountrySelectLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("enableCurrencySelect")
            ->withName("Widget.topBarEnableCurrencySelectLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("enableWishList")
            ->withName("Widget.topBarEnableWishListLabel")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("enableBasketPreview")
            ->withName("Widget.topBarEnableBasketPreviewLabel")
            ->withDefaultValue(true);

        $settingsFactory->createSelect("basketValues")
            ->withName("Widget.topBarBasketValuesLabel")
            ->withTooltip("Widget.topBarBasketValuesTooltip")
            ->withDefaultValue("sum")
            ->withCondition("enableBasketPreview")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("sum", "Widget.topBarBasketValuesSum")
                    ->addEntry("quantity", "Widget.topBarBasketValuesQuantity")
                    ->addEntry("both", "Widget.topBarBasketValuesBoth")
                    ->toArray()
            );

        return $settingsFactory->toArray();
    }
}
