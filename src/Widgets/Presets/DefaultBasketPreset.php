<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Ceres\Widgets\Presets\Helper\HasWhiteBackground;
use IO\Extensions\Constants\ShopUrls;
use IO\Helper\RouteConfig;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

/**
 * Class DefaultBasketPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for viewing and interacting with the basket. It contains:
 * - InlineTextWidget
 * - SeparatorWidget
 * - TwoColumnWidget
 * - BackgroundWidget
 * - BasketWidget
 * - StickyContainerWidget
 * - ShippingCountryWidget
 * - BasketTotalsWidget
 * - CouponWidget
 * - LinkWidget
 *
 * @package Ceres\Widgets\Presets
 */
class DefaultBasketPreset implements ContentPreset
{
    use HasWhiteBackground;

    /** @var PresetHelper */
    private $preset;

    /** @var ShopUrls */
    private $shopUrls;

    /** @var Translator */
    private $translator;
    
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->translator = pluginApp(Translator::class);
        $this->shopUrls = pluginApp(ShopUrls::class);

        $this->createHeadline();
        $twoColumnWidget = $this->preset->createWidget('Ceres::TwoColumnWidget')
            ->withSetting('layout', 'sevenToFive');

        $this->createLeftSide($twoColumnWidget);
        $this->createRightSide($twoColumnWidget);

        return $this->preset->toArray();
    }

    private function createHeadline()
    {
        $this->preset->createWidget('Ceres::InlineTextWidget')
            ->withSetting('text', '<h1>{{ trans(\'Ceres::Template.basket\') }}</h1>')
            ->withSetting('appearance', 'none')
            ->withSetting('spacing.customPadding', true)
            ->withSetting('spacing.padding.top.value', 5)
            ->withSetting('spacing.padding.top.unit', null)
            ->withSetting('spacing.padding.bottom.value', 0)
            ->withSetting('spacing.padding.bottom.unit', null)
            ->withSetting('spacing.padding.left.value', 0)
            ->withSetting('spacing.padding.left.unit', null)
            ->withSetting('spacing.padding.right.value', 0)
            ->withSetting('spacing.padding.right.unit', null)
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.top.value', 3)
            ->withSetting('spacing.margin.top.unit', null);

        $this->preset->createWidget('Ceres::SeparatorWidget')
            ->withSetting('customClass', '');
    }

    /**
     * @param PresetWidgetFactory $twoColumnWidget
     */
    private function createLeftSide($twoColumnWidget)
    {
        $bgContainer = $twoColumnWidget->createChild('first', 'Ceres::BackgroundWidget');
        $this->setBackgroundWidgetSettings($bgContainer)
            ->withSetting("spacing.margin.top.value", 0)
            ->withSetting("spacing.margin.bottom.value", 0);

        // BASKET ITEMS
        $bgContainer->createChild('background', 'Ceres::BasketWidget')
            ->withSetting('basketDetailsData', ['basket.item.availability']);
    }

    /**
     * @param PresetWidgetFactory $twoColumnWidget
     */
    private function createRightSide($twoColumnWidget)
    {
        $stickyContainer = $twoColumnWidget->createChild('second', 'Ceres::StickyContainerWidget');
        $bgContainer = $stickyContainer->createChild('sticky', 'Ceres::BackgroundWidget');
        $this->setBackgroundWidgetSettings($bgContainer)
            ->withSetting("spacing.margin.top.value", 0)
            ->withSetting("spacing.margin.bottom.value", 0);

        // SHIPPING COUNTY SELECT
        $bgContainer->createChild('background', 'Ceres::ShippingCountryWidget')
            ->withSetting('customClass', '');

        $bgContainer->createChild('background', 'Ceres::SeparatorWidget')
            ->withSetting('customClass', '');

        // BASKET TOTALS
        $bgContainer->createChild('background', 'Ceres::BasketTotalsWidget')
            ->withSetting('customClass', '')
            ->withSetting(
                'visibleFields',
                [
                    'basketValueNet',
                    'basketValueGross',
                    'rebate',
                    'shippingCostsNet',
                    'shippingCostsGross',
                    'promotionCoupon',
                    'totalSumNet',
                    'vats',
                    'additionalCosts',
                    'totalSumGross',
                    'salesCoupon',
                    'openAmount'
                ]
            );

        $bgContainer->createChild('background', 'Ceres::SeparatorWidget')
            ->withSetting('customClass', '');

        // COUPON
        $bgContainer->createChild('background', 'Ceres::CouponWidget')
            ->withSetting('customClass', '');

        $bgContainer->createChild('background', 'Ceres::SeparatorWidget')
            ->withSetting('customClass', '');

        // CHECKOUT BUTTON
        $checkoutLinkWidget = $bgContainer->createChild('background', 'Ceres::LinkWidget')
            ->withSetting('customClass', '')
            ->withSetting('appearance', 'primary')
            ->withSetting('size', '')
            ->withSetting('block', 'true')
            ->withSetting('text', $this->translator->trans('Ceres::Template.basketCheckout'));

        if (in_array(RouteConfig::CHECKOUT, RouteConfig::getEnabledRoutes()) && RouteConfig::getCategoryId(
                RouteConfig::CHECKOUT
            ) > 0) {
            $checkoutLinkWidget
                ->withSetting('url.type', 'category')
                ->withSetting('url.value', RouteConfig::getCategoryId(RouteConfig::CHECKOUT));
        } else {
            $checkoutLinkWidget
                ->withSetting('url.type', 'external')
                ->withSetting('url.value', $this->shopUrls->checkout);
        }
    }
}
