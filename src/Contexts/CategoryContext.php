<?php

namespace Ceres\Contexts;

use Plenty\Modules\Category\Models\Category;

class CategoryContext extends GlobalContext implements ContextInterface
{
    /** @var Category */
    public $category = null;
   
    public $metaRobots;
    public $formattedMetaRobots;
    public $categoryURL;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);
        
        $this->category = $params['category'];
        
        $this->metaRobots = $this->category->details[0]->metaRobots;
        $this->formattedMetaRobots = str_replace('_', ', ', $this->metaRobots);
        $this->categoryURL = $this->categoryService->getURL($this->category);
    }
}