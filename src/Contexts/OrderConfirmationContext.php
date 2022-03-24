<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use IO\Helper\Utils;
use IO\Models\LocalizedOrder;
use Plenty\Modules\Webshop\Contracts\SessionStorageRepositoryContract;
use Plenty\Modules\Webshop\Helpers\UrlQuery;
use Plenty\Plugin\Http\Request;

/**
 * Class OrderConfirmationContext
 *
 * Context class with additional data, required for the order confirmation view.
 *
 * @package Ceres\Contexts
 */
class OrderConfirmationContext extends CategoryContext implements ContextInterface
{
    /**
     * @var array $data Data, including information about the current order.
     */
    public $data;

    /**
     * @var array $totals Totals for the order.
     */
    public $totals;

    /**
     * @var string $showAdditionalPaymentInformation Defines if the user should be able to change the payment method later on.
     */
    public $showAdditionalPaymentInformation;

    /**
     * @inheritDoc
     */
    public $assetName = "ceres-checkout";

    /** @var int|null $orderId Order id from the requested order  */
    public $orderId = null;

    /** @var string $backlinkUrl Backlink url  */
    public $backlinkUrl = '';

    /** @var string $orderAccessKey access key for the requested order */
    public $orderAccessKey = '';

    /** @var string $orderInputType Required input field for verification */
    public $orderInputType = 'name';

    /** @var string $orderConfirmationToken Required token for verification */
    public $orderConfirmationToken = '';

    /**
     * @inheritDoc
     */
    public function init($params)
    {
        parent::init($params);

        $this->data = $params['data'];
        $this->totals = $this->data['totals'];
        $this->showAdditionalPaymentInformation = $params['showAdditionalPaymentInformation'];

        if ($this->data instanceof LocalizedOrder) {
            /** @var SessionStorageRepositoryContract $sessionStorage */
            $sessionStorage = pluginApp(SessionStorageRepositoryContract::class);
            $orderConfirmationToken = $sessionStorage->getSessionValue('orderConfirmationToken') ?? '';

            /** @var Request $request */
            $request = pluginApp(Request::class); 
            $this->orderConfirmationToken = $orderConfirmationToken;

            $orderArray = $this->data->toArray();
            $this->orderId = $orderArray['order']['id'];

            /** @var UrlQuery $urlQuery */
            $urlQuery = pluginApp(UrlQuery::class, ['path' => $request->getRequestUri()]);
            $includeLanguage = Utils::getLang() != Utils::getDefaultLang();
            $this->backlinkUrl = $urlQuery->getPath($includeLanguage);
            $this->orderAccessKey = $orderArray['order']['accessKey'];

            $order = $this->data->order;
            $orderDeliveryAddress = $order->deliveryAddress->postalCode ?? '';
            $orderBillingAddress = $order->billingAddress->postalCode ?? '';

            if (strlen(rtrim($orderDeliveryAddress)) || strlen(rtrim($orderBillingAddress))) {
                $this->orderInputType = 'postcode';
            }
        }
    }
}
