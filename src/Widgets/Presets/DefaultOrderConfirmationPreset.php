<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use IO\Extensions\Constants\ShopUrls;
use IO\Helper\RouteConfig;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

class DefaultOrderConfirmationPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;
    
    /** @var CeresConfig */
    private $ceresConfig;

    /** @var ShopUrls */
    private $shopUrls;

    /** @var Translator */
    private $translator;
    
    /** @var PresetWidgetFactory */
    private $twoColumnWidget;
    
    /** @var PresetWidgetFactory */
    private $threeColumnWidget;
    
    /** @var PresetWidgetFactory */
    private $fourColumnWidget;
    
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);
        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->translator = pluginApp(Translator::class);

        $this->shopUrls = pluginApp(ShopUrls::class);
        
        $this->createHeadline();
        
        $this->createTwoColumnWidget();
        
        $this->createOrderDataWidget();
        $this->createThreeColumnWidget();

        $this->createTrackingLinkWidget();
        $this->createOrderDocumentsWidget();
        $this->createRetourLinkWidget();

        $this->createPurchasedItemsWidget();
        $this->createOrderTotalsWidget();

        $this->createSeparatorWidget();

        $this->createFourColumnWidget();
        $this->createBottomNavigation();
        
        return $this->preset->toArray();
    }
    
    private function createHeadline()
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
                     ->withSetting("text", "<h1 class=\"h2\">{{ trans(\"Ceres::Template.orderConfirmationThanks\") }}</h1>")
                     ->withSetting("appearance", "none")
                     ->withSetting("spacing.customPadding", true)
                     ->withSetting("spacing.padding.top.value", 0)
                     ->withSetting("spacing.padding.top.unit", null)
                     ->withSetting("spacing.padding.bottom.value", 0)
                     ->withSetting("spacing.padding.bottom.unit", null)
                     ->withSetting("spacing.padding.left.value", 0)
                     ->withSetting("spacing.padding.left.unit", null)
                     ->withSetting("spacing.customMargin", true)
                     ->withSetting("spacing.margin.bottom.value", 0)
                     ->withSetting("spacing.margin.bottom.unit", null);

        $this->preset->createWidget("Ceres::InlineTextWidget")
                     ->withSetting("text", "<p>{{ trans(\"Ceres::Template.orderConfirmationWillBeProcessed\") }}</p>")
                     ->withSetting("appearance", "none")
                     ->withSetting("spacing.customMargin", true)
                     ->withSetting("spacing.margin.bottom.value", 5)
                     ->withSetting("spacing.margin.bottom.unit", null)
                     ->withSetting("spacing.customPadding", true)
                     ->withSetting("spacing.padding.top.value", 0)
                     ->withSetting("spacing.padding.top.unit", null)
                     ->withSetting("spacing.padding.bottom.value", 0)
                     ->withSetting("spacing.padding.bottom.unit", null)
                     ->withSetting("spacing.padding.left.value", 0)
                     ->withSetting("spacing.padding.left.unit", null)
                     ->withSetting("spacing.padding.right.value", 0)
                     ->withSetting("spacing.padding.right.unit", null);
    }
    
    private function createOrderDataWidget()
    {
        $this->twoColumnWidget->createChild("first", "Ceres::OrderDataWidget")
                              ->withSetting("addressFields", ["title", "contactPerson", "name1", "name2", "name3", "name4", "address1", "address2", "address3", "address4", "postalCode", "town", "country"])
                              ->withSetting("spacing.customMargin", true)
                              ->withSetting("spacing.margin.bottom.value", 4)
                              ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function createPurchasedItemsWidget()
    {
        $this->twoColumnWidget->createChild("second", "Ceres::PurchasedItemsWidget")
                              ->withSetting("customClass","")
                              ->withSetting("spacing.customMargin", true)
                              ->withSetting("spacing.margin.bottom.value", 4)
                              ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function createTrackingLinkWidget()
    {
        $this->threeColumnWidget->createChild("first", "Ceres::LinkWidget")
                                ->withSetting("block", "true")
                                ->withSetting("text", $this->translator->trans("Ceres::Widget.urlTrackingLabel"))
                                ->withSetting("url.value", "tracking")
                                ->withSetting("url.type", "internalLink")
                                ->withSetting("url.openInNewTab", true);
    }

    private function createOrderDocumentsWidget()
    {
        $this->threeColumnWidget->createChild("second", "Ceres::OrderDocumentsWidget")
                                ->withSetting("customClass","");
    }

    private function createRetourLinkWidget()
    {
        $this->threeColumnWidget->createChild("third", "Ceres::LinkWidget")
                                ->withSetting("block", "true")
                                ->withSetting("text", $this->translator->trans("Ceres::Widget.urlReturnLabel"))
                                ->withSetting("url.value", "return")
                                ->withSetting("url.type", "internalLink")
                                ->withSetting("url.openInNewTab", true);
    }

    private function createOrderTotalsWidget()
    {
        $this->twoColumnWidget->createChild("second", "Ceres::OrderTotalsWidget")
                              ->withSetting("visibleFields", ["orderValueNet", "orderValueGross", "rebate", "shippingCostsNet", "shippingCostsGross", "promotionCoupon", "totalSumNet", "vats", "totalSumGross", "salesCoupon", "openAmount"]);
    }

    private function createSeparatorWidget()
    {
        $this->preset->createWidget("Ceres::SeparatorWidget")
                     ->withSetting("customClass","");
    }

    private function createFourColumnWidget()
    {
        $this->fourColumnWidget = $this->preset->createWidget("Ceres::FourColumnWidget")
                                               ->withSetting("customClass","");
    }

    private function createBottomNavigation()
    {
        $homepageLinkWidget = null;
        $homepageLinkWidget = $this->fourColumnWidget->createChild("second", "Ceres::LinkWidget")
                                        ->withSetting("appearance", "primary")
                                        ->withSetting("block", "true")
                                        ->withSetting("text", $this->translator->trans("Ceres::Template.orderConfirmationHomepage"));

        if ( in_array(RouteConfig::HOME, RouteConfig::getEnabledRoutes()) && RouteConfig::getCategoryId(RouteConfig::HOME) > 0 )
        {
            $homepageLinkWidget->withSetting("url.type", "category")
                               ->withSetting("url.value", RouteConfig::getCategoryId(RouteConfig::HOME));
        }
        else
        {
            $homepageLinkWidget->withSetting("url.type", "external")
                               ->withSetting("url.value", $this->shopUrls->home);
        }
        
        $myAccountLinkWidget = null;
        $myAccountLinkWidget = $this->fourColumnWidget->createChild("third", "Ceres::LinkWidget")
                               ->withSetting("appearance", "primary")
                               ->withSetting("block", "true")
                               ->withSetting("text", $this->translator->trans("Ceres::Template.orderConfirmationMyAccount"));
        
        if ( in_array(RouteConfig::MY_ACCOUNT, RouteConfig::getEnabledRoutes())
            && RouteConfig::getCategoryId(RouteConfig::MY_ACCOUNT) > 0
            && !$this->shopUrls->equals($this->shopUrls->myAccount,'/my-account') )
        {
            $myAccountLinkWidget->withSetting("url.type", "category")
                                ->withSetting("url.value", RouteConfig::getCategoryId(RouteConfig::MY_ACCOUNT));
        }
        else
        {
            $myAccountLinkWidget->withSetting("url.type", "external")
                                ->withSetting("url.value", $this->shopUrls->myAccount);
        }
    }

    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget("Ceres::TwoColumnWidget")
                                              ->withSetting("layout", "oneToOne");
    }
    
    private function createThreeColumnWidget()
    {
        $this->threeColumnWidget = $this->twoColumnWidget->createChild("first", "Ceres::ThreeColumnWidget")
                                                         ->withSetting("layout", "oneToOneToOne");
    }
}