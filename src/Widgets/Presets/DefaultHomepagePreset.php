<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

class DefaultHomepagePreset implements ContentPreset
{
    private $preset;

    public function getWidgets(): array
    {
        $this->preset = pluginApp(PresetHelper::class);

        $this->createImageSlider();
        $this->createCategoryShowcase();
        $this->createImageBox();
        $this->createItemShowcase();
        $this->createText();
        $this->createImageTextBox();
        $this->createImageBox();
        $this->createNewsletterbox();

        return $this->preset->toArray();
    }

    public function createImageSlider(): void
    {
        $this->preset->createWidget("Ceres::ImageCarouselWidget");
    }
    public function createCategoryShowcase(): void
    {
        $threeColumnWidget = $this->preset->createWidget('Ceres::ThreeColumnWidget')
            ->withSetting('layout', 'twoToOneStacked');
        $this->setupImageBoxWidget(
            $threeColumnWidget->createChild('first', 'Ceres::ImageBoxWidget')
        );
        $twoColumnWidget = $threeColumnWidget->createChild('second', 'Ceres::TwoColumnWidget')
            ->withSetting('layout', 'oneToOne');

        $this->setupImageBoxWidget(
            $twoColumnWidget->createChild('first', 'Ceres::ImageBoxWidget')
        );
        $this->setupImageBoxWidget(
            $twoColumnWidget->createChild('second', 'Ceres::ImageBoxWidget')
        );
        $this->setupImageBoxWidget(
            $threeColumnWidget->createChild('third', 'Ceres::ImageBoxWidget')
        );
    }
    public function createImageBox(): void
    {
        $this->setupImageBoxWidget(
            $this->preset->createWidget('Ceres::ImageBoxWidget')
        );
    }
    public function createItemShowcase()
    {
        $this->setupItemListWidget(
            $this->preset->createWidget("Ceres::ItemListWidget"),
            1
        );
        $this->setupItemListWidget(
            $this->preset->createWidget("Ceres::ItemListWidget"),
            2
        );
    }
    public function createText()
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.infoTextHeadline") }}</h1><br><p>{{ trans("Ceres::Template.infoText") }}</p>');
    }
    public function createImageTextBox()
    {
        $twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'oneToOne');
        $this->setupImageBoxWidget(
            $twoColumnWidget->createChild('first', 'Ceres::ImageBoxWidget')
        );
        $twoColumnWidget->createChild('second', "Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.infoTextHeadline") }}</h1><br><p>{{ trans("Ceres::Template.infoText") }}</p>');
        $twoColumnWidget->createChild('first', "Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.infoTextHeadline") }}</h1><br><p>{{ trans("Ceres::Template.infoText") }}</p>');
        $this->setupImageBoxWidget(
            $twoColumnWidget->createChild('second', 'Ceres::ImageBoxWidget')
        );
    }
    public function createNewsletterbox()
    {
        $row = $this->preset
            ->createWidget("Ceres::ThreeColumnWidget")
            ->withSetting("customClass", "")
            ->withSetting("layout", "oneToTwoToOne");

        $row->createChild("second", "Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.newsletterOptInTitle") }}</h1><p>{{ trans("Ceres::Template.newsletterOptInInfoText") }}</p>')
            ->withSetting("customClass", "");

        $row->createChild("second", "Ceres::NewsletterWidget")
            ->withSetting("customClass", "")
            ->withSetting("appearance", "primary");
    }

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
