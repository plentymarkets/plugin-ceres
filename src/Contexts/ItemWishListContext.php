<?php

namespace Ceres\Contexts;

class ItemWishListContext extends GlobalContext implements ContextInterface
{
    public $wishList;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);
        
        $this->wishList = $params['wishList'];
    }
}