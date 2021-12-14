<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Illuminate\Foundation\Console\Presets\Preset;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Application;
use Plenty\Plugin\Translation\Translator;

/**
 * Class DefaultHomepagePreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a basic homepage based on settings in the plentyShop LTS config.
 *
 * @package Ceres\Widgets\Presets
 * @depreacted since 5.0
 */
class DefaultHomepagePreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var CeresConfig */
    private $ceresConfig;

    /** @var Translator */
    private $translator;

    /**
     * @inheritDoc
     */

    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->translator = pluginApp(Translator::class);
        $this->ceresConfig = pluginApp(ceresConfig::class);

        $this->createImageSlider();
        $this->createImageGrid();
        $this->createImageBox();
        $this->createItemShowcase();
        $this->createText();
        $this->createImageTextBox();
        $this->createNewsletterbox();


        return $this->preset->toArray();
    }

    public function createImageSlider()
    {
        $this->setupSliderWidget(
            $this->preset->createWidget("Ceres::ImageCarouselWidget")
        );
    }

    public function createImageGrid()
    {
        $grid = $this->preset->createWidget("Ceres::TwoColumnWidget")->withSetting("layout", "oneToOne");

        $this->setupImageBoxWidget(
            $grid->createChild("first", "Ceres::ImageBoxWidget"),
            $this->ceresConfig->homepage->homepageCategory1,
            0,
            "",
            "fullwidth",
            "secondary"
        );

        $childGrid = $grid->createChild("second", "Ceres::ImageBoxWidget")->withSetting("layout", "oneToOne");

        $this->setupImageBoxWidget(
            $childGrid->createChild("first", "Ceres::ImageBoxWidget"),
            $this->ceresConfig->homepage->homepageCategory2,
            0,
            "",
            "fullwidth",
            "secondary"
        );
        $this->setupImageBoxWidget(
            $childGrid->createChild("second", "Ceres::ImageBoxWidget"),
            $this->ceresConfig->homepage->homepageCategory3,
            0,
            "",
            "fullwidth",
            "secondary"
        );

        $this->setupImageBoxWidget(
            $grid->createChild("second", "Ceres::ImageBoxWidget"),
            $this->ceresConfig->homepage->homepageCategory4,
            0,
            "",
            "fullwidth",
            "secondary"
        );
    }
    public function createImageBox()
    {
        $this->setupImageBoxWidget(
            $this->preset->createWidget("Ceres::ImageBoxWidget"),
            $this->ceresConfig->homepage->homepageCategory4,
            0,
            "",
            "fullwidth",
            "secondary"
        );
    }
    public function createItemShowcase()
    {
        $this->setupItemListWidget(
            $this->preset->createWidget("Ceres::ItemListWidget"),
            $this->ceresConfig->homepage->homepageCategory1
        );
        $this->setupItemListWidget(
            $this->preset->createWidget("Ceres::ItemListWidget"),
            $this->ceresConfig->homepage->homepageCategory2
        );
    }
    public function createText()
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.infoTextHeadline") }}</h1><br><p>{{ trans("Ceres::Template.infoText") }}</p>');
    }
    public function createImageTextBox()
    {
    }
    public function createNewsletterbox()
    {
        $this->preset->createWidget("Ceres::NewsletterWidget");
    }

    private function setupSliderWidget($widget)
    {
        $slides = [
            [
                "categoryId" => "",
                "variationId" => $this->ceresConfig->homepage->sliderItemId1,
                "customImagePath" => $this->ceresConfig->homepage->sliderImageUrl1
            ],
            [
                "categoryId" => "",
                "variationId" => $this->ceresConfig->homepage->sliderItemId2,
                "customImagePath" => $this->ceresConfig->homepage->sliderImageUrl2
            ],
            [
                "categoryId" => "",
                "variationId" => $this->ceresConfig->homepage->sliderItemId3,
                "customImagePath" => $this->ceresConfig->homepage->sliderImageUrl3
            ]
        ];

        $widget
            ->withSetting("appearance", "primary")
            ->withSetting("slides", $slides);
    }

    /**
     * @param PresetWidgetFactory $widget
     * @param $categoryId
     * @param $variationId
     * @param $customImagePath
     * @param $style
     */
    private function setupImageBoxWidget($widget, $categoryId = 0, $variationId = 0, $customImagePath = "", $style = "no-caption", $appearance = "primary")
    {
        $widget
            ->withSetting("appearance", $appearance)
            ->withSetting("style", $style)
            ->withSetting("imageSize", "cover")
            ->withSetting("categoryId", $categoryId > 0 ? $categoryId : "")
            ->withSetting("variationId", $variationId > 0 ? $variationId : "")
            ->withSetting("customImagePath", $customImagePath);
    }

    private function setupItemListWidget($widget, $categoryId = 0, $tagId = 0, $itemSort = "texts.name1_asc")
    {
        $listType = "last_seen";
        if ($categoryId > 0) {
            $listType = "category";
        }
        if ($tagId > 0) {
            $listType = "tag_list";
        }

        $widget
            ->withSetting("appearance", "primary")
            ->withSetting("listType", $listType)
            ->withSetting("categoryId", $categoryId)
            ->withSetting("tagId", $tagId)
            ->withSetting("itemSort", $itemSort)
            ->withSetting("maxItems", 8);
    }
}
