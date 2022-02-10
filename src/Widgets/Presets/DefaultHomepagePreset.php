<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Application;

/* TODO phpdoc */

class DefaultHomepagePreset implements ContentPreset
{
    public $preset;

    public function getWidgets(): array
    {
        $this->preset = pluginApp(PresetHelper::class);

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
                "url" => [
                    "type" => "category",
                    "value" => "16"
                ],
                "slideUrlType" => "category",
                "customImagePath" => $this->imagePath . "slider-living-1920.webp",
                "headline" => "FURNITURE THAT STANDS OUT",
                "headlineStyle" => "custom-caption",
            ],
            [
                "url" => [
                    "type" => "category",
                    "value" => "16"
                ],
                "customImagePath" => $this->imagePath . "slider-wear-1920.webp",
                "headline" => "CLOTHING OF THE FUTURE",
                "headlineStyle" => "custom-caption",
            ],
            [
                "url" => [
                    "type" => "category",
                    "value" => "16"
                ],
                "customImagePath" => $this->imagePath . "slider-gear-1920.webp",
                "headline" => "THE FUTURE HAS ARRIVED",
                "headlineStyle" => "custom-caption",
            ]
        ];

        $this->preset->createWidget("Ceres::ImageCarouselWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("preloadImage", true)
            ->withSetting("customClass", "negative-margin-top widget-fw vh-100 widget-dark img-1-offset-md-20-flip-horizontal")
            ->withSetting("slides", $slides)
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.bottom.value', 3)
            ->withSetting('spacing.margin.bottom.unit', null);
    }
    public function createCategoryShowcase(): void
    {
        /** @var Application $app */
        $app = pluginApp(Application::class);
        $this->imagePath = $app->getUrlPath('Ceres') . '/resources/images/homepage/' ;

        $twoColumnWidget =  $this->preset->createWidget("Ceres::TwoColumnWidget")
            ->withSetting('layout', 'oneToOne')
            ->withSetting('layoutTablet', 'oneToOne')
            ->withSetting('layoutMobile', 'stackedMobile');
        $twoColumnWidgetRight = $twoColumnWidget->createChild('second', 'Ceres::TwoColumnWidget')
            ->withSetting('layout', 'stacked')
            ->withSetting('layoutTablet', 'stacked')
            ->withSetting('layoutMobile', 'stackedMobile');
        $innerTwoColumnWidgetRight = $twoColumnWidgetRight->createChild('first', 'Ceres::TwoColumnWidget')
            ->withSetting('layout', 'oneToOne')
            ->withSetting('layoutTablet', 'oneToOne')
            ->withSetting('layoutMobile', 'stackedMobile');

        $twoColumnWidget->createChild('first', 'Ceres::ImageBoxWidget')
            ->withSetting("appearance", "primary")
            ->withSetting("customClass", "h-100 widget-dark mouseover-zoom")
            ->withSetting("style", "inline-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("headline", "PLENTY GEAR")
            ->withSetting("customImagePath", $this->imagePath . "category-gear-1430x.webp")
            ->withSetting('url.type', 'category')
            ->withSetting('url.value', '16')
            ->withSetting("customCaption", true)
            ->withSetting("lazyLoading", true);

        $innerTwoColumnWidgetRight->createChild('first', 'Ceres::ImageBoxWidget')
            ->withSetting("appearance", "primary")
            ->withSetting("customClass", "widget-dark mouseover-zoom")
            ->withSetting("style", "inline-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("headline", "PLENTY WEAR - WOMEN")
            ->withSetting("customImagePath", $this->imagePath . "category-wear-female-715x.webp")
            ->withSetting('url.type', 'category')
            ->withSetting('url.value', '16')
            ->withSetting("customCaption", true)
            ->withSetting("lazyLoading", true);

        $innerTwoColumnWidgetRight->createChild('second', 'Ceres::ImageBoxWidget')
            ->withSetting("appearance", "primary")
            ->withSetting("customClass", "widget-dark mouseover-zoom")
            ->withSetting("style", "inline-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("headline", "PLENTY WEAR - MEN")
            ->withSetting("customImagePath", $this->imagePath . "category-wear-male-715x.webp")
            ->withSetting('url.type', 'category')
            ->withSetting('url.value', '16')
            ->withSetting("customCaption", true)
            ->withSetting("lazyLoading", true);

        $twoColumnWidgetRight->createChild('second', 'Ceres::ImageBoxWidget')
            ->withSetting("appearance", "primary")
            ->withSetting("customClass", "widget-dark mouseover-zoom")
            ->withSetting("style", "inline-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("headline", '"PLENTY LIVING"')
            ->withSetting("customImagePath", $this->imagePath . "category-living-1430x.webp")
            ->withSetting('url.type', 'category')
            ->withSetting('url.value', '16')
            ->withSetting("customCaption", true)
            ->withSetting("lazyLoading", true);
    }
    public function createBackground(): void
    {
        $bgContainer = $this->preset->createWidget("Ceres::BackgroundWidget")
            ->withSetting('customClass', 'd-flex align-items-end vh-100')
            ->withSetting('fullWidth', true)
            ->withSetting('lazyloadImage', true)
            ->withSetting('sourceType', 'custom-image')
            ->withSetting('customImagePath', $this->imagePath . "story-tree-1920.webp")
            ->withSetting("imageSize", "cover")
            ->withSetting("aspectRatio", "auto")
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.bottom.value', 3)
            ->withSetting('spacing.margin.bottom.unit', null);

        $bgContainer->createChild('background', 'Ceres::InlineTextWidget')
            ->withSetting("text", '<h4>NO MATTER HOW SMALL</h4>')
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null);

        $bgContainer->createChild('background', 'Ceres::InlineTextWidget')
            ->withSetting("text", '<h1 class="align-center"><span class="color-light">WITH EVERY ORDER<br>WE WILL PLANT A TREE</span></h1>')
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null);

        $bgContainer->createChild('background', 'Ceres::LinkWidget')
            ->withSetting('customClass', 'text-center btn-outline widget-light')
            ->withSetting('appearance', 'primary')
            ->withSetting('block', 'true')
            ->withSetting('text', 'SHOP NOW')
            ->withSetting('url.type', 'category')
            ->withSetting('url.value', '16');
    }
    public function createBestsellersShowcase(): void
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", '<h2>Best sellers</h2>')
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
            ->withSetting("appearance", "primary")
            ->withSetting('customClass', 'widget-dark item-bg-gray item-vat-hidden btn-outline')
            ->withSetting("categoryId", 16)
            ->withSetting("itemSort", "texts.name1_asc")
            ->withSetting("headlineStyle", "no-caption")
            ->withSetting("maxItems", 4);

        $this->preset->createWidget("Ceres::ItemListWidget")
            ->withSetting("appearance", "primary")
            ->withSetting('customClass', 'widget-dark item-bg-gray item-vat-hidden btn-outline')
            ->withSetting("categoryId", 16)
            ->withSetting("itemSort", "texts.name1_desc")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 0)
            ->withSetting("spacing.margin.bottom.unit", null)
            ->withSetting("headlineStyle", "no-caption")
            ->withSetting("maxItems", 4);


        $this->preset->createWidget('Ceres::CodeWidget')
            ->withSetting('appearance', 'none')
            ->withSetting('text', '<p class="mb-0">{{ trans("Ceres::Template.singleItemFootnote1") }} {% if services.customer.showNetPrices() %}{{ trans("Ceres::Template.singleItemExclVAT") }}{% else %}{{ trans("Ceres::Template.singleItemInclVAT") }}{% endif %} {{ trans("Ceres::Template.singleItemExclusive") }} <a {% if ceresConfig.global.shippingCostsCategoryId > 0 %} data-toggle="modal" href="#shippingscosts"{% endif %} title="{{ trans("Ceres::Template.singleItemShippingCosts") }}">{{ trans("Ceres::Template.singleItemShippingCosts") }}</a></p>');
    }
    public function createTextBox(): void
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", '<h2>Our philosophy</h2><br/><p>We create sustainable products that last & look unique. Our collection is divers and is meant to meet your needs in almost any situation. From shirts to drones, we provide products that benefit not only you, but also our planet.</p>')
            ->withSetting("appearance", "none")
            ->withSetting('customClass', 'container')
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.top.value", 5)
            ->withSetting("spacing.margin.top.unit", null)
            ->withSetting("spacing.margin.bottom.value", 4)
            ->withSetting("spacing.margin.bottom.unit", null);
    }
    public function createFirstImageTextContainer(): void
    {
        /** @var Application $app */
        $app = pluginApp(Application::class);
        $this->imagePath = $app->getUrlPath('Ceres') . '/resources/images/homepage/' ;

        $twoColumnWidget =  $this->preset->createWidget("Ceres::TwoColumnWidget")
            ->withSetting('layout', 'sevenToFive')
            ->withSetting('layoutTablet', 'stackedTablet')
            ->withSetting('layoutMobile', 'stackedMobile')
            ->withSetting('customClass', 'mb-4');

        $twoColumnWidget->createChild('first', 'Ceres::ImageBoxWidget')
            ->withSetting("appearance", "primary")
            ->withSetting("style", "no-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("customImagePath", $this->imagePath . "story-precision-1920x.webp")
            ->withSetting("lazyLoading", true);

        $innerTwoColumnWidget = $twoColumnWidget->createChild('second', 'Ceres::TwoColumnWidget')
            ->withSetting('layout', 'nineToThree')
            ->withSetting('layoutTablet', 'stackedTablet')
            ->withSetting('layoutMobile', 'stackedMobile');

        $innerTwoColumnWidget->createChild('first', 'Ceres::InlineTextWidget')
            ->withSetting("text", '<h2>High precision, High-Tech</h2><br/><p>We have perfected our craft and achieved high performance quality in clothing, furniture and applicable technologies. Being at the tip of innovation and using holistic methods is our default way of creating.</p>')
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting('customClass', 'container')
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
        /** @var Application $app */
        $app = pluginApp(Application::class);
        $this->imagePath = $app->getUrlPath('Ceres') . '/resources/images/homepage/' ;

        $twoColumnWidget =  $this->preset->createWidget("Ceres::TwoColumnWidget")
            ->withSetting('layout', 'sevenToFive')
            ->withSetting('layoutTablet', 'stackedTablet')
            ->withSetting('layoutMobile', 'stackedMobile')
            ->withSetting('customClass', 'mb-4');

        $twoColumnWidget->createChild('second', 'Ceres::ImageBoxWidget')
            ->withSetting("appearance", "primary")
            ->withSetting("style", "no-caption")
            ->withSetting("aspectRatio", "retain")
            ->withSetting("customImagePath", "../images/homepage/story-precision-1920x.webp")
            ->withSetting("lazyLoading", true);

        $innerTwoColumnWidget = $twoColumnWidget->createChild('first', 'Ceres::TwoColumnWidget')
            ->withSetting('layout', 'nineToThree')
            ->withSetting('layoutTablet', 'stackedTablet')
            ->withSetting('layoutMobile', 'stackedMobile');

        $innerTwoColumnWidget->createChild('first', 'Ceres::InlineTextWidget')
            ->withSetting("text", '<h2>High precision, High-Tech</h2><br/><p>We have perfected our craft and achieved high performance quality in clothing, furniture and applicable technologies. Being at the tip of innovation and using holistic methods is our default way of creating.</p>')
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting('customClass', 'container')
            ->withSetting("spacing.padding.top.value", 4)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 4)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 4)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 4)
            ->withSetting("spacing.padding.right.unit", null);
    }
    public function createSecondBackground(): void
    {
        /** @var Application $app */
        $app = pluginApp(Application::class);
        $this->imagePath = $app->getUrlPath('Ceres') . '/resources/images/homepage/' ;

        $bgContainer = $this->preset->createWidget("Ceres::BackgroundWidget")
            ->withSetting('customClass', 'text-right vh-100 pt-md-4 pr-md-4')
            ->withSetting('fullWidth', true)
            ->withSetting('lazyloadImage', true)
            ->withSetting('sourceType', 'custom-image')
            ->withSetting('customImagePath', "../images/homepage/story-precision-1920x.webp")
            ->withSetting("imageSize", "cover")
            ->withSetting("aspectRatio", "auto")
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.top.value', 5)
            ->withSetting('spacing.margin.top.unit', null)
            ->withSetting('spacing.margin.bottom.value', 5)
            ->withSetting('spacing.margin.bottom.unit', null)
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.top.value', 4)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.right.value', 3)
            ->withSetting('spacing.padding.right.unit', null);

        $bgContainer->createChild('background', 'Ceres::InlineTextWidget')
            ->withSetting("text", '<h4>LOVED BY MANY</h4><h1>OUR TIMELESS CLASSIC</h1>')
            ->withSetting("appearance", "none");

        $bgContainer->createChild('background', 'Ceres::LinkWidget')
            ->withSetting('customClass', 'text-right btn-outline widget-dark')
            ->withSetting('appearance', 'primary')
            ->withSetting('block', 'true')
            ->withSetting('text', 'SHOP NOW')
            ->withSetting('url.type', 'category')
            ->withSetting('url.value', '16')
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.left.value', 3)
            ->withSetting('spacing.margin.left.unit', null)
            ->withSetting('spacing.margin.right.value', 3)
            ->withSetting('spacing.margin.right.unit', null);
    }
    public function createNewsletter(): void
    {

        $threeColumnWidget = $this->preset->createWidget('Ceres::ThreeColumnWidget')
            ->withSetting('layout', 'oneToOneToOne')
            ->withSetting('customClass', 'mb-5');

        $threeColumnWidget->createChild('second', 'Ceres::InlineTextWidget')
            ->withSetting("text", '<h2>Get your 8€ welcome gift now</h2><p>by subscribing to our weekly newsletter</p>')
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

        $threeColumnWidget->createChild('second', 'Ceres::NewsletterWidget')
            ->withSetting('showPrivacyPolicyCheckbox', true)
            ->withSetting('customClass', 'widget-dark');
    }
}
