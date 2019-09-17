<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

class OrderConfirmationContext extends CategoryContext implements ContextInterface
{
    
    public $data;
    public $totals;
    public $showAdditionalPaymentInformation;
    
    public function init($params)
    {
        parent::init($params);
        
        $this->data = $params['data'];
        $this->totals = $this->data['totals'];
        $this->showAdditionalPaymentInformation = $params['showAdditionalPaymentInformation'];
    }
}
