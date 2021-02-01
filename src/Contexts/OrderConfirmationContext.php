<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

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

    /**
     * @inheritDoc
     */
    public function init($params)
    {
        parent::init($params);

        $this->data = $params['data'];
        $this->totals = $this->data['totals'];
        $this->showAdditionalPaymentInformation = $params['showAdditionalPaymentInformation'];
    }
}
