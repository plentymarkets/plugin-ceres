<?php

namespace Ceres\Contexts;

use Ceres\Helper\SearchOptions;
use IO\Helper\ContextInterface;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\TagItems;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\Facets;

class TagSearchContext extends CategoryContext implements ContextInterface
{

    use ItemListContext;

    public $isSearch;
    public $searchString;
    public $isTag = true;

    public function init($params)
    {
        parent::init($params);
        $tagId = $this->getParam( 'tagId','' );
        $tagIds = is_array( $tagId ) ? $tagId : [$tagId];
        $itemListOptions = [
            'page'          => $this->getParam( 'page', 1 ),
            'itemsPerPage'  => $this->getParam( 'itemsPerPage', '' ),
            'sorting'       => $this->getParam( 'sorting', '' ),
            'tagName'       => $this->getParam( 'tagName', '' ),
            'tagIds'        => $tagIds,
            'facets'        => $this->getParam( 'facets', ''),
            'priceMin'      => $this->request->get('priceMin', 0),
            'priceMax'      => $this->request->get('priceMax', 0)
        ];

        $itemListOptions = SearchOptions::validateItemListOptions($itemListOptions, SearchOptions::SCOPE_SEARCH);
        $this->initItemList(
            [
                'itemList' => TagItems::getSearchFactory($itemListOptions),
                'facets'   => Facets::getSearchFactory($itemListOptions)
            ],
            $itemListOptions,
            SearchOptions::SCOPE_SEARCH
        );

        $this->isSearch = true;
        $this->searchString = $itemListOptions['tagName'];
    }
}

