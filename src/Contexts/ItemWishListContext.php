<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

class ItemWishListContext extends GlobalContext implements ContextInterface
{
    public $wishList;
    
    public function init($params)
    {
        parent::init($params);
        
        $this->wishList = $params['wishList'];
    }
}