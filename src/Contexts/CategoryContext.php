<?php

namespace Ceres\Contexts;

use Plenty\Modules\Category\Models\Category;

class CategoryContext extends GlobalContext implements ContextInterface
{
    /** @var Category */
    //TODO rename to currentCategory
    public $category = null;
    
    public function init($params)
    {
       parent::init($params);
       
       $this->category = $params['category'];
       
    }
}