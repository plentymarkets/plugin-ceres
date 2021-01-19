<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

/**
 * Context class with additional data, required for the order confirmation view.
 */
class OrderConfirmationContext extends CategoryContext implements ContextInterface
{
    /**
     * @var array Data, including information about the current order.
     */
    public $data;

    /**
     * @var array Totals for the order.
     */
    public $totals;

    /**
     * Defines if the user should be able to change the payment method later on.
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
