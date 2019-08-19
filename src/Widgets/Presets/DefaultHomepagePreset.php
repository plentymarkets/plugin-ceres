<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Illuminate\Foundation\Console\Presets\Preset;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Application;
use Plenty\Plugin\Translation\Translator;

class DefaultHomepagePreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var CeresConfig */
    private $ceresConfig;

    /** @var Translator */
    private $translator;
    /**
     * Get the widget configurations of the presets to be assigned to the created content.
     *
     * @return mixed
     */
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->translator = pluginApp(Translator::class);

        $this->preset->createWidget("Ceres::TitleBarWidget")
            ->withSetting("appearance", "primary");

        //
        // FIRST ROW
        //
        $hasSlides = $this->ceresConfig->homepage->sliderItemId1 > 0
            || $this->ceresConfig->homepage->sliderItemId2 > 0
            || $this->ceresConfig->homepage->sliderItemId3 > 0;

        $hasHeroExtra1 = $this->ceresConfig->homepage->heroExtraItemId1
            || $this->ceresConfig->homepage->heroExtraImageUrl1;

        $hasHeroExtra2 = $this->ceresConfig->homepage->heroExtraItemId2
            || $this->ceresConfig->homepage->heroExtraImageUrl2;

        if ( $hasSlides )
        {
            $grid = null;
            if ( $hasHeroExtra1 && $hasHeroExtra2 )
            {
                $grid = $this->preset->createWidget("Ceres::ThreeColumnWidget")
                    ->withSetting("layout", "twoToOneStacked");

            }
            elseif ( $hasHeroExtra1 || $hasHeroExtra2 )
            {
                $grid = $this->preset->createWidget("Ceres::TwoColumnWidget")
                    ->withSetting("layout", "oneToOne");
            }

            if ( !is_null($grid) )
            {
                $this->setupSliderWidget(
                    $grid->createChild("first", "Ceres::ImageCarouselWidget")
                );

                if ( $hasHeroExtra1 )
                {
                    $this->setupImageBoxWidget(
                        $grid->createChild("second", "Ceres::ImageBoxWidget"),
                        0,
                        $this->ceresConfig->homepage->heroExtraItemId1,
                        $this->ceresConfig->homepage->heroExtraImageUrl1,
                        $this->ceresConfig->homepage->heroExtraItemId1 > 0 ? 'block-caption' : 'no-caption'
                    );
                }

                if ( $hasHeroExtra2 )
                {
                    $this->setupImageBoxWidget(
                        $grid->createChild($hasHeroExtra1 ? "third" : "second", "Ceres::ImageBoxWidget"),
                        0,
                        $this->ceresConfig->homepage->heroExtraItemId2,
                        $this->ceresConfig->homepage->heroExtraImageUrl2,
                        $this->ceresConfig->homepage->heroExtraItemId2 > 0 ? 'block-caption' : 'no-caption'
                    );
                }
            }
            else
            {
                $this->setupSliderWidget(
                    $this->preset->createWidget("Ceres::ImageCarouselWidget")
                );
            }

        }
        else
        {
            if ( $hasHeroExtra1 )
            {
                $this->setupImageBoxWidget(
                    $this->preset->createWidget("Ceres::ImageBoxWidget"),
                    0,
                    $this->ceresConfig->homepage->heroExtraItemId1,
                    $this->ceresConfig->homepage->heroExtraImageUrl1,
                    $this->ceresConfig->homepage->heroExtraItemId1 > 0 ? 'block-caption' : 'no-caption'
                );
            }

            if ( $hasHeroExtra2 )
            {
                $this->setupImageBoxWidget(
                    $this->preset->createWidget("Ceres::ImageBoxWidget"),
                    0,
                    $this->ceresConfig->homepage->heroExtraItemId2,
                    $this->ceresConfig->homepage->heroExtraImageUrl2,
                    $this->ceresConfig->homepage->heroExtraItemId2 > 0 ? 'block-caption' : 'no-caption'
                );
            }
        }

        //
        // SECOND ROW
        //
        $hasHomepageCategory1 = $this->ceresConfig->homepage->homepageCategory1 > 0;
        $hasHomepageCategory2 = $this->ceresConfig->homepage->homepageCategory2 > 0;
        $hasHomepageCategory3 = $this->ceresConfig->homepage->homepageCategory3 > 0;
        $hasHomepageCategory4 = $this->ceresConfig->homepage->homepageCategory4 > 0;
        $hasHomepageCategory5 = $this->ceresConfig->homepage->homepageCategory5 > 0;
        $hasHomepageCategory6 = $this->ceresConfig->homepage->homepageCategory6 > 0;

        $grid = null;
        if ( $hasHomepageCategory1 && $hasHomepageCategory2 )
        {
            $grid = $this->preset->createWidget("Ceres:TwoColumnWidget")
                ->withSetting("layout", "oneToOne");
        }

        if ( $hasHomepageCategory1 )
        {
            $this->setupImageBoxWidget(
                is_null($grid) ? $this->preset->createWidget("Ceres::ImageBoxWidget") : $grid->createChild("first", "Ceres::ImageBoxWidget"),
                $this->ceresConfig->homepage->homepageCategory1,
                0,
                "",
                "fullwidth",
                "secondary"
            );
        }

        if ( $hasHomepageCategory2 )
        {
            $this->setupImageBoxWidget(
                is_null($grid) ? $this->preset->createWidget("Ceres::ImageBoxWidget") : $grid->createChild("second", "Ceres::ImageBoxWidget"),
                $this->ceresConfig->homepage->homepageCategory2,
                0,
                "",
                "fullwidth",
                "secondary"
            );
        }

        //
        // THIRD ROW
        //
        if ( $hasHomepageCategory3 )
        {
            $this->setupItemListWidget(
                $this->preset->createWidget("Ceres::ItemListWidget"),
                $this->ceresConfig->homepage->homepageCategory3
            );
        }

        //
        // FOURTH ROW
        //
        $grid = null;
        if ( $hasHomepageCategory4 && $hasHomepageCategory5 )
        {
            $grid = $this->preset->createWidget("Ceres::TwoColumnWidget")
                ->withSetting("layout", "twoToOne");
        }

        if ( $hasHomepageCategory4 )
        {
            $this->setupImageBoxWidget(
                is_null($grid) ? $this->preset->createWidget("Ceres::ImageBoxWidget") : $grid->createChild("first", "Ceres::ImageBoxWidget"),
                $this->ceresConfig->homepage->homepageCategory4,
                0,
                "",
                "inline-caption"
            );
        }

        if ( $hasHomepageCategory5 )
        {
            $this->setupImageBoxWidget(
                is_null($grid) ? $this->preset->createWidget("Ceres::ImageBoxWidget") : $grid->createChild("second", "Ceres::ImageBoxWidget"),
                $this->ceresConfig->homepage->homepageCategory4,
                0,
                "",
                "inline-caption"
            );
        }

        //
        // FIFTH ROW
        //
        if ( $hasHomepageCategory6 )
        {
            $this->setupItemListWidget(
                $this->preset->createWidget("Ceres::ItemListWidget"),
                $this->ceresConfig->homepage->homepageCategory6
            );
        }

        return $this->preset->toArray();
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

    private function setupItemListWidget( $widget, $categoryId = 0, $tagId = 0, $itemSort = "texts.name1_asc" )
    {
        $listType = "last_seen";
        if ( $categoryId > 0 )
        {
            $listType = "category";
        }
        if ( $tagId > 0 )
        {
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