<?php

namespace Ceres\Contexts;

use Ceres\Helper\SearchOptions;
use IO\Services\ItemSearch\SearchPresets\CategoryItems;
use IO\Services\ItemSearch\SearchPresets\Facets;

class CategoryItemContext extends CategoryContext implements ContextInterface
{
    use ItemListContext;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);

        $itemListOptions = [
            'page'          => $this->getParam( 'page', 1 ),
            'itemsPerPage'  => $this->getParam( 'itemsPerPage', $this->ceresConfig->pagination->rowsPerPage[0] * $this->ceresConfig->pagination->columnsPerPage ),
            'sorting'       => $this->getParam( 'sorting', $this->ceresConfig->sorting->defaultSorting ),
            'facets'        => $this->getParam( 'facets' ),
            'categoryId'    => $this->category->id
        ];

        $this->initItemList(
            [
                'itemList' => CategoryItems::getSearchFactory( $itemListOptions ),
                'facets'   => Facets::getSearchFactory( $itemListOptions )
            ],
            $itemListOptions,
            SearchOptions::SCOPE_CATEGORY
        );
    }
}