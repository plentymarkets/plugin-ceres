<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

class OrderReturnContext extends CategoryContext implements ContextInterface
{
    public $orderData;
    
    public function init($params)
    {
        parent::init($params);
        
        $this->orderData = $params['orderData'];
    }
}