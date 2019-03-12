<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use IO\Services\CheckoutService;
use Plenty\Modules\Category\Models\Category;
use Plenty\Modules\ShopBuilder\Helper\ShopBuilderRequest;
use Plenty\Plugin\Templates\Twig;
use Plenty\Plugin\Translation\Translator;

class CheckoutContext extends CategoryContext implements ContextInterface
{
    public $checkout = [];

    public function init($params)
    {
        parent::init($params);

        /** @var CheckoutService $checkoutService */
        $checkoutService = pluginApp(CheckoutService::class);

        /** @var ShopBuilderRequest $shopBuilderRequest */
        $shopBuilderRequest = pluginApp(ShopBuilderRequest::class);

        $this->checkout = $checkoutService->getCheckout();

        if ( empty($this->checkout['shippingProfileList']) && $shopBuilderRequest->isShopBuilder() )
        {
            /** @var Translator $translator */
            $translator = pluginApp(Translator::class);

            $this->checkout['shippingProfileList'] = [
                [
                    'parcelServiceName' => $translator->trans('Ceres::Widget.dummyParcelServiceName', ['i' => 'A']),
                    'parcelServicePresetId' => $this->checkout['shippingProfileId'],
                    'parcelServicePresetName' => $translator->trans('Ceres::Widget.dummyParcelServicePresetName', ['i' => 1 ]),
                    'shippingAmount' => 0
                ],
                [
                    'parcelServiceName' => $translator->trans('Ceres::Widget.dummyParcelServiceName', ['i' => 'B']),
                    'parcelServicePresetId' => 0,
                    'parcelServicePresetName' => $translator->trans('Ceres::Widget.dummyParcelServicePresetName', ['i' => 2 ]),
                    'shippingAmount' => 4.99
                ]
            ];
        }
    }
}