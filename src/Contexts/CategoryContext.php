<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use Plenty\Modules\Category\Models\Category;

class CategoryContext extends GlobalContext implements ContextInterface
{
    /** @var Category */
    public $category = null;
   
    public $metaRobots;
    
    public function init($params)
    {
        parent::init($params);
        
        $this->category = $params['category'];
        
        $this->metaRobots = str_replace('_', ', ', $this->category->details[0]->metaRobots);
    }
}