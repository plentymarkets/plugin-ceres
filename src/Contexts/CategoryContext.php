<?php

namespace Ceres\Contexts;

use Plenty\Modules\Category\Models\Category;

class CategoryContext extends GlobalContext implements ContextInterface
{
    /** @var Category */
    public $category = null;
   
    public $metaRobots;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);
        
        $this->category = $params['category'];
        
        $this->metaRobots = str_replace('_', ', ', $this->category->details[0]->metaRobots);
    }
}