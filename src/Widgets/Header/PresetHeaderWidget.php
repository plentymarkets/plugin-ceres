<?php

namespace Ceres\Widgets\Header;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetTypes;

class PresetHeaderWidget extends BaseWidget
{
    /** @var PresetHelper */
      private $preset;
      protected $template = "Ceres::Widgets.Header.PresetHeaderWidget";

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


        $topBarContainer = $settingsFactory->createVerticalContainer('TopBarContainers')
            ->withName('Top Bar Settings');

        $topBarContainer->children->createCheckbox("isFixed")
            ->withName("Widget.topBarIsFixedLabel")
            ->withDefaultValue(true);

        $topBarContainer->children->createSelect("searchStyle")
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

        $topBarContainer->children->createCheckbox("enableLogin")
            ->withName("Widget.topBarEnableLoginLabel")
            ->withDefaultValue(true);

        $topBarContainer->children->createCheckbox("enableRegistration")
            ->withName("Widget.topBarEnableRegistrationLabel")
            ->withDefaultValue(true);

        $topBarContainer->children->createCheckbox("enableLanguageSelect")
            ->withName("Widget.topBarEnableLanguageSelectLabel")
            ->withDefaultValue(true);

        $topBarContainer->children->createCheckbox("enableShippingCountrySelect")
            ->withName("Widget.topBarEnableShippingCountrySelectLabel")
            ->withDefaultValue(true);

        $topBarContainer->children->createCheckbox("enableCurrencySelect")
            ->withName("Widget.topBarEnableCurrencySelectLabel")
            ->withDefaultValue(true);

        $topBarContainer->children->createCheckbox("enableWishList")
            ->withName("Widget.topBarEnableWishListLabel")
            ->withDefaultValue(true);

        $topBarContainer->children->createCheckbox("enableBasketPreview")
            ->withName("Widget.topBarEnableBasketPreviewLabel")
            ->withDefaultValue(true);

        $topBarContainer->children->createSelect("basketValues")
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



        //  Navigation Configuration
        $navigationContainer = $settingsFactory->createVerticalContainer('NavigationContainers')
            ->withName('Navigation Settings');

        $navigationContainer->children->createCustomClass();
        $navigationContainer->children->createCheckbox('isFixed')
            ->withName('Widget.navigationIsFixedLabel')
            ->withDefaultValue(true);

        $navigationContainer->children->createSelect('navigationStyle')
            ->withName('Widget.navigationNavigationStyleLabel')
            ->withTooltip('Widget.navigationNavigationStyleTooltip')
            ->withDefaultValue('normal')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('normal', 'Widget.navigationNavigationStyleNormal')
                    ->addEntry('megaMenu', 'Widget.navigationNavigationStyleMegaMenu')
                    ->toArray()
            );

        $navigationContainer->children->createSelect('megaMenuLevels')
            ->withName('Widget.navigationMegaMenuLevelsLabel')
            ->withTooltip('Widget.navigationMegaMenuLevelsTooltip')
            ->withDefaultValue(2)
            ->withCondition("navigationStyle === 'megaMenu'")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(2, 'Widget.navigationMegaMenuLevels2')
                    ->addEntry(3, 'Widget.navigationMegaMenuLevels3')
                    ->addEntry(4, 'Widget.navigationMegaMenuLevels4')
                    ->toArray()
            );

//        $maxItemsContainer = $navigationContainer->children->createVerticalContainer('megaMenuMaxItems')
//            ->withName('Widget.navigationMegaMenuMaxItemsLabel')
//            ->children;
//
//        $maxItemsContainer->createNumber('stage1')
//            ->withName('Widget.navigationMegaMenuMaxItemsStage1Label')
//            ->withTooltip('Widget.navigationMegaMenuMaxItemsStage1Tooltip')
//            ->withDefaultValue(30);
//
//        $maxItemsContainer->createNumber('stage2')
//            ->withName('Widget.navigationMegaMenuMaxItemsStage2Label')
//            ->withTooltip('Widget.navigationMegaMenuMaxItemsStage2Tooltip')
//            ->withDefaultValue(3)
//            ->withCondition('navigationStyle === "megaMenu" && megaMenuLevels >= 3');
//
//        $maxItemsContainer->createNumber('stage3')
//            ->withName('Widget.navigationMegaMenuMaxItemsStage3Label')
//            ->withTooltip('Widget.navigationMegaMenuMaxItemsStage3Tooltip')
//            ->withDefaultValue(2)
//            ->withCondition('navigationStyle === "megaMenu" && megaMenuLevels >= 4');

        $navigationContainer->children->createFile('companyLogoUrl')
            ->withName('Widget.navigationCompanyLogoUrlLabel')
            ->withTooltip('Widget.navigationCompanyLogoUrlTooltip')
            ->withDefaultValue('')
            ->withAllowedExtensions(array_merge(ImageBoxWidget::IMAGE_EXTENSIONS, ImageBoxWidget::MODERN_IMAGE_EXTENSIONS));

        $navigationContainer->children->createFile('fallbackImagePath')
            ->withCondition('!!companyLogoUrl && /.?(\.webp)(?:$|\?)/.test(companyLogoUrl)')
            ->withName('Widget.navigationFallbackImagePathLabel')
            ->withTooltip('Widget.navigationFallbackImagePathTooltip')
            ->withDefaultValue('')
            ->withAllowedExtensions(ImageBoxWidget::IMAGE_EXTENSIONS);

        $navigationContainer->children->createSpacing();




        //  BreadCrumb Configuration
//        $settingsFactory->createCustomClass();
//        $settingsFactory->createCheckbox("isFixed")
//            ->withName("Widget.breadcrumbIsFixedLabel")
//            ->withDefaultValue(true);
//
//        $settingsFactory->createCheckbox("showOnHomepage")
//            ->withName("Widget.breadcrumbShowOnHomepageLabel")
//            ->withDefaultValue(true);
//
//        $settingsFactory->createCheckbox("showOnMyAccount")
//            ->withName("Widget.breadcrumbShowOnMyAccountLabel")
//            ->withDefaultValue(true);
//
//        $settingsFactory->createCheckbox("showOnCheckout")
//            ->withName("Widget.breadcrumbShowOnCheckoutLabel")
//            ->withDefaultValue(true);
//
//        $settingsFactory->createCheckbox("showOnContentCategory")
//            ->withName("Widget.breadcrumbShowOnContentCategoryLabel")
//            ->withDefaultValue(true);
//
//        $settingsFactory->createCheckbox("showOnLegalPages")
//            ->withName("Widget.breadcrumbShowOnLegalPagesLabel")
//            ->withDefaultValue(false);
//



        return $settingsFactory->toArray();
    }
}
