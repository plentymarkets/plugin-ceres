<?php

namespace Ceres\Contexts;

class OrderReturnContext extends GlobalContext implements ContextInterface
{
    public $orderData;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);
        
        $this->orderData = $params['orderData'];
    }
}