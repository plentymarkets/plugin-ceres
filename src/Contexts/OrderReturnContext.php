<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

class OrderReturnContext extends GlobalContext implements ContextInterface
{
    public $orderData;
    
    public function init($params)
    {
        parent::init($params);
        
        $this->orderData = $params['orderData'];
    }
}