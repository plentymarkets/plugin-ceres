<?php

namespace Ceres\Contexts;

class OrderConfirmationContext extends GlobalContext implements ContextInterface
{
    
    public $data;
    public $totals;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);
        
        $this->data = $params['data'];
        $this->totals = $params['totals'];
    }
}