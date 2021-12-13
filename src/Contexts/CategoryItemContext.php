<?php

namespace Ceres\Contexts;

use Ceres\Helper\SearchOptions;
use IO\Helper\ContextInterface;
use IO\Services\CategoryService;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\CategoryItems;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\Facets;

/**
 * Class CategoryItemContext
 *
 * Context class with additional data, required for all item category views.
 *
 * @package Ceres\Contexts
 */
class CategoryItemContext extends CategoryContext implements ContextInterface
{
    use ItemListContext;
    
    public $categoryBreadcrumbs = [];

    /**
     * @inheritDoc
     */
    public function init($params)
    {
        parent::init($params);

        $itemListOptions = [
            'page'          => $this->getParam( 'page', 1 ),
            'itemsPerPage'  => $this->getParam( 'itemsPerPage', '' ),
            'sorting'       => $this->getParam( 'sorting', '' ),
            'facets'        => $this->getParam( 'facets' ),
            'categoryId'    => $this->category->id,
            'priceMin'      => $this->request->get('priceMin', 0),
            'priceMax'      => $this->request->get('priceMax', 0)
        ];

        $itemListOptions = SearchOptions::validateItemListOptions($itemListOptions, SearchOptions::SCOPE_CATEGORY);

        $this->initItemList(
            [
                'itemList' => CategoryItems::getSearchFactory( $itemListOptions ),
                'facets'   => Facets::getSearchFactory( $itemListOptions )
            ],
            $itemListOptions,
            SearchOptions::SCOPE_CATEGORY
        );
        
        /** @var CategoryService $categoryService */
        $categoryService = pluginApp(CategoryService::class);
        $this->categoryBreadcrumbs = $categoryService->getHierarchy();
    }
}
