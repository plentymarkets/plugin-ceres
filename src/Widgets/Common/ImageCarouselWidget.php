<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ImageCarouselWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.ImageCarouselWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ImageCarouselWidget")
            ->withLabel("Widget.imageCarouselLabel")
            ->withPreviewImageUrl("/images/widgets/image-carousel.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::IMAGE)
            ->withPosition(500)
            ->withSearchKeyWords([
                "bild", "bilder", "image", "picture", "carousel", "bilderkarussel"
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

        $settings->createSelect("animationStyle")
        ->withDefaultValue("standard")
        ->withName("Widget.imageCarouselAnimationStyleLabel")
        ->withTooltip("Widget.imageCarouselAnimationStyleTooltip")
        ->withListBoxValues(
            ValueListFactory::make()
            ->addEntry("standard", "Widget.imageCarouselAnimationStyleSlide")
            ->addEntry("fade", "Widget.imageCarouselAnimationStyleFade")
            ->toArray()
        );

        $settings->createCheckbox("fullWidth")
            ->withDefaultValue(false)
            ->withName('Widget.backgroundFullWidthLabel')
            ->withTooltip('Widget.backgroundFullWidthTooltip');
        
        $settings->createSelect("aspectRatio")
            ->withDefaultValue("auto")
            ->withName("Widget.imageCarouselAspectRatioLabel")
            ->withTooltip("Widget.imageCarouselAspectRatioTooltip")
            ->withCondition("fullHeight !== true")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("auto", "Widget.imageCarouselAspectRatioAuto")
                    ->addEntry("3-1", "Widget.imageCarouselAspectRatioThreeToOne")
                    ->addEntry("2-1", "Widget.imageCarouselAspectRatioTwoToOne")
                    ->addEntry("3-2", "Widget.imageCarouselAspectRatioThreeToTwo")
                    ->addEntry("1-1", "Widget.imageCarouselAspectRatioOneToOne")
                    ->addEntry("2-3", "Widget.imageCarouselAspectRatioTwoToThree")
                    ->addEntry("1-2", "Widget.imageCarouselAspectRatioOneToTwo")
                    ->addEntry("1-3", "Widget.imageCarouselAspectRatioOneToThree")
                    ->toArray()
            );

        $settings->createCheckbox('fullHeight')
            ->withDefaultValue(false)
            ->withName('Widget.imageCarouselFullHeightLabel')
            ->withTooltip('Widget.imageCarouselFullHeightTooltip');

        $settings->createCheckbox("lazyLoading")
            ->withName("Widget.imageCarouselLazyLoadingName")
            ->withTooltip("Widget.imageCarouselLazyLoadingTooltip")
            ->withDefaultValue(true);

        $settings->createCheckbox('preloadImage')
            ->withName('Widget.preloadImageLabel')
            ->withTooltip('Widget.preloadImageTooltip');

        $container = $settings->createVerticalContainer("slides")
            ->withList(1)
            ->withName("Widget.imageCarouselSlide");

        $container->children->createSelect("headlineStyle")
            ->withDefaultValue("default-caption")
            ->withName("Widget.imageCarouselCaptionLabel")
            ->withTooltip("Widget.imageCarouselCaptionTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("default-caption", "Widget.imageCarouselCaptionDefault")
                    ->addEntry("custom-caption", "Widget.imageCarouselCaptionCustom")
                    ->addEntry("no-caption", "Widget.imageCarouselCaptionNoCaption")
                    ->toArray()
            );

        $container->children->createText("headline")
            ->withCondition("\$slides.headlineStyle === 'custom-caption'")
            ->withDefaultValue("")
            ->withName("Widget.imageCarouselHeadlineLabel")
            ->withTooltip("Widget.imageCarouselHeadlineTooltip");

        $container->children->createUrl("url")
            ->withName("Widget.imageCarouselUrlLabel");

        $container->children->createFile("customImagePath")
            ->withDefaultValue("")
            ->withName("Widget.imageCarouselCustomImagePathLabel")
            ->withTooltip("Widget.imageCarouselCustomImagePathTooltip")
            ->withAllowedExtensions(array_merge(ImageBoxWidget::IMAGE_EXTENSIONS, ImageBoxWidget::MODERN_IMAGE_EXTENSIONS));

        $container->children->createFile("fallbackImagePath")
            ->withDefaultValue("")
            ->withName("Widget.imageCarouselFallbackImagePathLabel")
            ->withTooltip("Widget.imageCarouselFallbackImagePathTooltip")
            ->withCondition("!!\$slides.customImagePath && /.?(\.webp)(?:$|\?)/.test(\$slides.customImagePath)")
            ->withAllowedExtensions(ImageBoxWidget::IMAGE_EXTENSIONS);

        $settings->createSpacing(false, true);
        return $settings->toArray();
    }

    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $sliderParams = [];

        foreach (["slide1", "slide2", "slide3"] as $slideName) {
            $slide = $widgetSettings[$slideName];

            if (
                !is_null($slide)
                && array_key_exists("mobile", $slide)
                && !is_null($slide["mobile"])
                && (!is_null($slide["mobile"]) || !is_null($slide["mobile"]) || !is_null($slide["mobile"]))
            ) {
                $sliderParams[] = [
                    "categoryId"      => $slide["mobile"]["categoryId"],
                    "variationId"     => $slide["mobile"]["variationId"],
                    "customImagePath" => $slide["mobile"]["customImagePath"]
                ];
            }
        }

        if (count($sliderParams) <= 0) {
            $sliderParams = $widgetSettings["slides"]["mobile"];
        }

        foreach ($sliderParams as $i => $sliderParam) {
            if (!array_key_exists("url", $sliderParam) || !$sliderParam["url"]["value"]) {
                if ($sliderParam["categoryId"]) {
                    $sliderParams[$i]["url"] = [
                        "type"  => "category",
                        "value" => $sliderParam["categoryId"]
                    ];
                } else {
                    $sliderParams[$i]["url"] = [
                        "type"  => "item",
                        "value" => $sliderParam["variationId"]
                    ];
                }
            }
        }

        return [
            "sliderParams" => [
                "mobile"       => $sliderParams,
                "tablet"       => $sliderParams,
                "desktop"      => $sliderParams,
                "largeDesktop" => $sliderParams
            ]
        ];
    }
}
