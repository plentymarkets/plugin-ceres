<?php

namespace Ceres\Contexts;

use Ceres\Helper\SearchOptions;
use IO\Helper\ContextInterface;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\Facets;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\SearchItems;

class ItemSearchContext extends CategoryContext implements ContextInterface
{
    use ItemListContext;

    public $isSearch;
    public $searchString;

    public function init($params)
    {
        parent::init($params);

        $itemListOptions = [
            'page'         => $this->getParam('page', 1),
            'itemsPerPage' => $this->getParam('itemsPerPage', ''),
            'sorting'      => $this->getParam('sorting', ''),
            'facets'       => $this->getParam('facets', ''),
            'query'        => $this->getParam('query', ''),
            'priceMin'     => $this->request->get('priceMin', 0),
            'priceMax'     => $this->request->get('priceMax', 0)
        ];

        $itemListOptions = SearchOptions::validateItemListOptions($itemListOptions, SearchOptions::SCOPE_SEARCH);

        $this->isSearch = true;
        $this->searchString = $itemListOptions['query'];

        $this->initItemList(
            [
                'itemList' => SearchItems::getSearchFactory($itemListOptions),
                'facets'   => Facets::getSearchFactory($itemListOptions)
            ],
            $itemListOptions,
            SearchOptions::SCOPE_SEARCH
        );
    }
}
