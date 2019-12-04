<?php

namespace Ceres\Widgets\Header;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\BaseWidget;
use IO\Helper\Utils;
use IO\Services\CategoryService;
use IO\Services\CustomerService;
use IO\Services\ItemSearch\Factories\Faker\CategoryTreeFaker;

class NavigationWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Header.NavigationWidget";
    
    protected function getPreviewData($widgetSettings)
    {
        /** @var CategoryService $categoryService */
        $categoryService = pluginApp(CategoryService::class);
        
        /** @var CeresConfig $ceresConfig */
        $ceresConfig = pluginApp(CeresConfig::class);
        
        /** @var CustomerService $customerService */
        $customerService = pluginApp(CustomerService::class);
        
        $categories = $categoryService->getNavigationTree(
            $ceresConfig->header->showCategoryTypes,
            Utils::getLang(),
            $ceresConfig->header->menuLevels,
            $customerService->getContactClassId()
        );
        
        if (!count($categories)) {
            /** @var CategoryTreeFaker $categoryTreeFaker */
            $categoryTreeFaker = pluginApp(CategoryTreeFaker::class);
            $categories        = $categoryTreeFaker->fill([]);
        }
        
        return [
            'categories' => $categories
        ];
    }
}
