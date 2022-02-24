<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Application;
use Plenty\Plugin\Translation\Translator;

/**
 * Class DefaultHomepagePreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a demo homepage with promotional images, flavor text, some articles and a newsletter registration. It contains:
 * - ImageCarouselWidget
 * - TwoColumnWidget
 * - ImageBoxWidget
 * - BackgroundWidget
 * - InlineTextWidget
 * - ItemListWidget
 * - LinkWidget
 * - ThreeColumnWidget
 * - NewsletterWidget
 * @package Ceres\Widgets\Presets
 */
class DefaultHomepagePreset implements ContentPreset
{
    /** @var PresetHelper $preset */
    public $preset;

    /** @var Translator $translator */
    public $translator;

    /** @var string $imagePath */
    private $imagePath;

    public function getWidgets(): array
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->translator = pluginApp(Translator::class);
        $this->imagePath = pluginApp(Application::class)->getUrlPath("Ceres") . "/images/homepage/";

        $this->createImageSlider();
        $this->createCategoryShowcase();
        $this->createBackground();
        $this->createBestsellersShowcase();
        $this->createTextBox();
        $this->createFirstImageTextContainer();
        $this->createSecondImageTextContainer();
        $this->createSecondBackground();
        $this->createNewsletter();

        return $this->preset->toArray();
    }

    public function createImageSlider(): void
    {
        $slides = [
            [
                "customImagePath" => $this->imagePath . "slider-living-1920x.webp",
                "fallbackImagePath" => $this->imagePath . "slider-living-1920x.jpg",
                "headline" => $this->translator->trans("Ceres::Homepage.categoryHeadline1"),
                "headlineStyle" => "custom-caption",
            ],
            [
                "customImagePath" => $this->imagePath . "slider-wear-1920x.webp",
                "fallbackImagePath" => $this->imagePath . "slider-wear-1920x.jpg",
                "headline" => $this->translator->trans("Ceres::Homepage.categoryHeadline2"),
                "headlineStyle" => "custom-caption",
            ],
            [
                "customImagePath" => $this->imagePath . "slider-gear-1920x.webp",
                "fallbackImagePath" => $this->imagePath . "slider-gear-1920x.jpg",
                "headline" => $this->translator->trans("Ceres::Homepage.categoryHeadline3"),
                "headlineStyle" => "custom-caption",
            ]
        ];

        $this->preset->createWidget("Ceres::ImageCarouselWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("preloadImage", true)
            ->withSetting("customClass", "widget-fw vh-100 img-1-offset-md-20-flip-horizontal")
            ->withSetting("slides", $slides)
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 3)
            ->withSetting("spacing.margin.bottom.unit", null);
    }
    public function createCategoryShowcase(): void
    {
        $twoColumnWidget =  $this->preset->createWidget("Ceres::TwoColumnWidget")
            ->withSetting("layout", "oneToOne")
            ->withSetting("layoutTablet", "oneToOne")
            ->withSetting("layoutMobile", "stackedMobile");
        $twoColumnWidgetRight = $twoColumnWidget->createChild("second", "Ceres::TwoColumnWidget")
            ->withSetting("layout", "stacked")
            ->withSetting("layoutTablet", "stacked")
            ->withSetting("layoutMobile", "stackedMobile");
        $innerTwoColumnWidgetRight = $twoColumnWidgetRight->createChild("first", "Ceres::TwoColumnWidget")
            ->withSetting("layout", "oneToOne")
            ->withSetting("layoutTablet", "oneToOne")
            ->withSetting("layoutMobile", "stackedMobile");

        $twoColumnWidget->createChild("first", "Ceres::ImageBoxWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("style", "block-caption")
            ->withSetting("customClass", "h-100")
            ->withSetting("aspectRatio", "auto")
            ->withSetting("imageSize", "cover")
            ->withSetting("customImagePath", $this->imagePath . "category-gear-1430x.webp")
            ->withSetting("fallbackImagePath", $this->imagePath . "category-gear-1430x.jpg")
            ->withSetting("lazyLoading", true)
            ->withSetting("customCaption", true)
            ->withSetting("headline", "<p>{{ trans(\"Ceres::Homepage.categoryName1\") }}</p>");

        $innerTwoColumnWidgetRight->createChild("first", "Ceres::ImageBoxWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("style", "block-caption")
            ->withSetting("aspectRatio", "1-1")
            ->withSetting("customImagePath", $this->imagePath . "category-wear-female-715x.webp")
            ->withSetting("fallbackImagePath", $this->imagePath . "category-wear-female-715x.jpg")
            ->withSetting("lazyLoading", true)
            ->withSetting("customCaption", true)
            ->withSetting("headline", "<p>{{ trans(\"Ceres::Homepage.categoryName2\") }}</p>");

        $innerTwoColumnWidgetRight->createChild("second", "Ceres::ImageBoxWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("style", "block-caption")
            ->withSetting("aspectRatio", "1-1")
            ->withSetting("customImagePath", $this->imagePath . "category-wear-male-715x.webp")
            ->withSetting("fallbackImagePath", $this->imagePath . "category-wear-male-715x.jpg")
            ->withSetting("lazyLoading", true)
            ->withSetting("customCaption", true)
            ->withSetting("headline", "<p>{{ trans(\"Ceres::Homepage.categoryName3\") }}</p>");

        $twoColumnWidgetRight->createChild("second", "Ceres::ImageBoxWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("style", "inline-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("customImagePath", $this->imagePath . "category-living-1430x.webp")
            ->withSetting("fallbackImagePath", $this->imagePath . "category-living-1430x.jpg")
            ->withSetting("lazyLoading", true)
            ->withSetting("customCaption", true)
            ->withSetting("headline", "<p>{{ trans(\"Ceres::Homepage.categoryName4\") }}</p>");
    }
    public function createBackground(): void
    {
        $bgContainer = $this->preset->createWidget("Ceres::BackgroundWidget")
            ->withSetting("customClass", "align-items-end vh-100")
            ->withSetting("fullWidth", true)
            ->withSetting("lazyloadImage", true)
            ->withSetting("sourceType", "custom-image")
            ->withSetting("backgroundFixed", false)
            ->withSetting("hugeFont", true)
            ->withSetting("customImagePath", $this->imagePath . "story-tree-1920x.webp")
            ->withSetting("fallbackImagePath", $this->imagePath . "story-tree-1920x.jpg")
            ->withSetting("imageSize", "cover")
            ->withSetting("aspectRatio", "auto")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 3)
            ->withSetting("spacing.margin.bottom.unit", null);

        $bgContainer->createChild("background", "Ceres::InlineTextWidget")
            ->withSetting("text", "<h5 class='align-center'><span class='color-light'>{{ trans('Ceres::Homepage.imageBackgroundHeadline1') }}</span></h5>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 2)
            ->withSetting("spacing.padding.bottom.unit", null);

        $bgContainer->createChild("background", "Ceres::InlineTextWidget")
            ->withSetting("text", "<h4 class='align-center'><span class='color-light'>{{ trans('Ceres::Homepage.imageBackgroundHeadline2') }}<br>{{ trans('Ceres::Homepage.imageBackgroundHeadline3') }}</span></h4>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null);

        $bgContainer->createChild("background", "Ceres::LinkWidget")
            ->withSetting("customClass", "text-center")
            ->withSetting("text", $this->translator->trans("Ceres::Homepage.shopNow"))
            ->withSetting("icon", "none")
            ->withSetting("url.type", "external")
            ->withSetting("url.value", "/");
    }
    public function createBestsellersShowcase(): void
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", "<h2>{{ trans('Ceres::Homepage.bestSellers') }}</h2>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null)
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.top.value", 5)
            ->withSetting("spacing.margin.top.unit", null);

        $this->preset->createWidget("Ceres::ItemListWidget")
            ->withSetting("listType", "all")
            ->withSetting("itemSort", "default.recommended_sorting")
            ->withSetting("headlineStyle", "no-caption")
            ->withSetting("maxItems", 4);

        $this->preset->createWidget("Ceres::ItemListWidget")
            ->withSetting("listType", "all")
            ->withSetting("itemSort", "variation.createdAt_desc")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 0)
            ->withSetting("spacing.margin.bottom.unit", null)
            ->withSetting("headlineStyle", "no-caption")
            ->withSetting("maxItems", 4);

        $this->preset->createWidget("Ceres::CodeWidget")
            ->withSetting("appearance", "none")
            ->withSetting("text", "<p class='mb-0'>{{ trans('Ceres::Template.singleItemFootnote1') }} {% if services.customer.showNetPrices() %}{{ trans('Ceres::Template.singleItemExclVAT') }}{% else %}{{ trans('Ceres::Template.singleItemInclVAT') }}{% endif %} {{ trans('Ceres::Template.singleItemExclusive') }} <a {% if ceresConfig.global.shippingCostsCategoryId > 0 %} data-toggle='modal' href='#shippingscosts'{% endif %} title='{{ trans('Ceres::Template.singleItemShippingCosts') }}'>{{ trans('Ceres::Template.singleItemShippingCosts') }}</a></p>");
    }
    public function createTextBox(): void
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", "<h2>{{ trans('Ceres::Homepage.philosophyHeadline') }}</h2><br/><p>{{ trans('Ceres::Homepage.philosophyText') }}</p>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.top.value", 5)
            ->withSetting("spacing.margin.top.unit", null)
            ->withSetting("spacing.margin.bottom.value", 4)
            ->withSetting("spacing.margin.bottom.unit", null)
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null);
    }
    public function createFirstImageTextContainer(): void
    {
        $twoColumnWidget =  $this->preset->createWidget("Ceres::TwoColumnWidget")
            ->withSetting("layout", "sevenToFive")
            ->withSetting("layoutTablet", "stackedTablet")
            ->withSetting("layoutMobile", "stackedMobile")
            ->withSetting("customClass", "mb-4");

        $twoColumnWidget->createChild("first", "Ceres::ImageBoxWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("style", "no-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("customImagePath", $this->imagePath . "story-precision-1920x.webp")
            ->withSetting("fallbackImagePath", $this->imagePath . "story-precision-1920x.jpg")
            ->withSetting("lazyLoading", true);

        $innerTwoColumnWidget = $twoColumnWidget->createChild("second", "Ceres::TwoColumnWidget")
            ->withSetting("layout", "nineToThree")
            ->withSetting("layoutTablet", "stackedTablet")
            ->withSetting("layoutMobile", "stackedMobile");

        $innerTwoColumnWidget->createChild("first", "Ceres::InlineTextWidget")
            ->withSetting("text", "<h2>{{ trans('Ceres::Homepage.imageHeadline1') }}</h2><br/><p>{{ trans('Ceres::Homepage.imageText1') }}</p>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 4)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 4)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 4)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 4)
            ->withSetting("spacing.padding.right.unit", null);
    }

    public function createSecondImageTextContainer(): void
    {
        $twoColumnWidget =  $this->preset->createWidget("Ceres::TwoColumnWidget")
            ->withSetting("layout", "fiveToSeven")
            ->withSetting("layoutTablet", "stackedTablet")
            ->withSetting("layoutMobile", "stackedMobile")
            ->withSetting("customClass", "mb-4");

        $twoColumnWidget->createChild("second", "Ceres::ImageBoxWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("style", "no-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("customImagePath", $this->imagePath . "story-natural-1920x.webp")
            ->withSetting("fallbackImagePath", $this->imagePath . "story-natural-1920x.jpg")
            ->withSetting("lazyLoading", true);

        $innerTwoColumnWidget = $twoColumnWidget->createChild("first", "Ceres::TwoColumnWidget")
            ->withSetting("layout", "nineToThree")
            ->withSetting("layoutTablet", "stackedTablet")
            ->withSetting("layoutMobile", "stackedMobile");

        $innerTwoColumnWidget->createChild("first", "Ceres::InlineTextWidget")
            ->withSetting("text", "<h2>{{ trans('Ceres::Homepage.imageHeadline2') }}</h2><br/><p>{{ trans('Ceres::Homepage.imageText2') }}</p>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 4)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 4)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 4)
            ->withSetting("spacing.padding.right.unit", null);
    }
    public function createSecondBackground(): void
    {
        $bgContainer = $this->preset->createWidget("Ceres::BackgroundWidget")
            ->withSetting("customClass", "text-right vh-100")
            ->withSetting("fullWidth", true)
            ->withSetting("lazyloadImage", true)
            ->withSetting("sourceType", "custom-image")
            ->withSetting("backgroundFixed", false)
            ->withSetting("customImagePath", $this->imagePath . "category-living-1920x.webp")
            ->withSetting("fallbackImagePath", $this->imagePath . "category-living-1920x.jpg")
            ->withSetting("imageSize", "cover")
            ->withSetting("aspectRatio", "auto")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.top.value", 5)
            ->withSetting("spacing.margin.top.unit", null)
            ->withSetting("spacing.margin.bottom.value", 5)
            ->withSetting("spacing.margin.bottom.unit", null)
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 4)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.right.value", 3)
            ->withSetting("spacing.padding.right.unit", null);

        $bgContainer->createChild("background", "Ceres::InlineTextWidget")
            ->withSetting("text", "<h4>{{ trans('Ceres::Homepage.imageHeadline3') }}</h4><h2>{{ trans('Ceres::Homepage.imageHeadline4') }}</h2>")
            ->withSetting("appearance", "none");

        $bgContainer->createChild("background", "Ceres::LinkWidget")
            ->withSetting("text", $this->translator->trans('Ceres::Homepage.shopNow'))
            ->withSetting("icon", "none")
            ->withSetting("url.type", "external")
            ->withSetting("url.value", "/")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.left.value", 3)
            ->withSetting("spacing.margin.left.unit", null)
            ->withSetting("spacing.margin.right.value", 0)
            ->withSetting("spacing.margin.right.unit", null);
    }
    public function createNewsletter(): void
    {
        $threeColumnWidget = $this->preset->createWidget("Ceres::ThreeColumnWidget")
            ->withSetting("layout", "oneToOneToOne")
            ->withSetting("customClass", "mb-5");

        $threeColumnWidget->createChild("second", "Ceres::InlineTextWidget")
            ->withSetting("text", "<h2>{{ trans('Ceres::Homepage.newsletterHeadline') }}</h2><p>{{ trans('Ceres::Homepage.newsletterText') }}</p>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null)
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 2)
            ->withSetting("spacing.margin.bottom.unit", null);

        $threeColumnWidget->createChild("second", "Ceres::NewsletterWidget")
            ->withSetting("showPrivacyPolicyCheckbox", true);
    }
}
