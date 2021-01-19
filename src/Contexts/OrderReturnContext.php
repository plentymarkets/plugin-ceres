<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

/**
 * Context class with additional data, required for the order return view.
 */
class OrderReturnContext extends CategoryContext implements ContextInterface
{
    /**
     * @var array Data, including information about the current order.
     */
    public $orderData;

    /**
     * @var string Key to authenticate the user and allow him to open the view.
     */
    public $orderAccessKey;

    /**
     * @inheritDoc
     */
    public function init($params)
    {
        parent::init($params);
        
        $this->orderData = $params['orderData'];
        $this->orderAccessKey = $params['orderAccessKey'];
    }
}
