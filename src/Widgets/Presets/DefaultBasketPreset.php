<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use IO\Extensions\Constants\ShopUrls;
use IO\Helper\RouteConfig;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

class DefaultBasketPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    /** @var PresetWidgetFactory */
    private $twoColumnWidget;

    /** @var PresetWidgetFactory */
    private $stickyContainer;

    /** @var ShopUrls */
    private $shopUrls;

    /** @var Translator */
    private $translator;

    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->translator = pluginApp(Translator::class);
        $this->shopUrls = pluginApp(ShopUrls::class);

        $this->createHeadline();
        $this->createTwoColumnWidget();

        $this->createBasketWidget();

        $this->createStickyContainer();
        $this->createShippingCountryWidget();
        $this->createBasketTotalsWidget();
        $this->createCouponWidget();
        $this->createLinkWidget();

        return $this->preset->toArray();
    }

    private function createHeadline()
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", "<h1 class=\"h2\">{{ trans(\"Ceres::Template.basket\") }}</h1>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 5)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null)
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.top.value", 3)
            ->withSetting("spacing.margin.top.unit", null);

        $this->preset->createWidget("Ceres::SeparatorWidget");
    }

    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'sevenToFive');
    }

    private function createBasketWidget()
    {
        $this->twoColumnWidget->createChild('first', 'Ceres::BasketWidget')
            ->withSetting('basketDetailsData', ["basket.item.availability"])
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 4)
            ->withSetting("spacing.margin.bottom.unit", null)
            ->withSetting("spacing.margin.top.value", 4)
            ->withSetting("spacing.margin.top.unit", null)
            ->withSetting("spacing.margin.left.value", 3)
            ->withSetting("spacing.margin.left.unit", null)
            ->withSetting("spacing.margin.right.value", 3)
            ->withSetting("spacing.margin.right.unit", null)
            ->withSetting('customClass', '');
    }

    private function createStickyContainer()
    {
        $this->stickyContainer = $this->twoColumnWidget->createChild('second', 'Ceres::StickyContainerWidget');
    }

    private function createShippingCountryWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::ShippingCountryWidget')
            ->withSetting('customClass', '');

        $this->stickyContainer->createChild('sticky', 'Ceres::SeparatorWidget');
    }

    private function createBasketTotalsWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::BasketTotalsWidget')
            ->withSetting('customClass', '')
            ->withSetting('visibleFields', ["basketValueNet", "basketValueGross", "rebate", "shippingCostsNet", "shippingCostsGross", "totalSumNet", "promotionCoupon", "vats", "totalSumGross", "salesCoupon", "openAmount"]);

        $this->stickyContainer->createChild('sticky', 'Ceres::SeparatorWidget');
    }

    private function createCouponWidget()
    {
        $this->stickyContainer->createChild('sticky', 'Ceres::CouponWidget')
            ->withSetting('customClass', '');

        $this->stickyContainer->createChild('sticky', 'Ceres::SeparatorWidget');
    }

    private function createLinkWidget()
    {
        $checkoutLinkWidget = $this->twoColumnWidget->createChild("second", "Ceres::LinkWidget")
            ->withSetting("customClass", "")
            ->withSetting("appearance", "primary")
            ->withSetting("size", "md")
            ->withSetting("block", false)
            ->withSetting("text", $this->translator->trans("Ceres::Template.basketCheckout"));

        if (in_array(RouteConfig::CHECKOUT, RouteConfig::getEnabledRoutes()) && RouteConfig::getCategoryId(RouteConfig::CHECKOUT) > 0)
        {
            $checkoutLinkWidget
                ->withSetting("url.type", "category")
                ->withSetting("url.value", RouteConfig::getCategoryId(RouteConfig::CHECKOUT));
        }
        else
        {
            $checkoutLinkWidget
                ->withSetting("url.type", "external")
                ->withSetting("url.value", $this->shopUrls->checkout);
        }
    }
}