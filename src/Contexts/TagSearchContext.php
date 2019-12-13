<?php

namespace Ceres\Contexts;

use Ceres\Helper\SearchOptions;
use IO\Helper\ContextInterface;
use IO\Services\ItemSearch\SearchPresets\TagItems;

class TagSearchContext extends CategoryContext implements ContextInterface
{

    use ItemListContext;

    public $isSearch;
    public $searchString;
    public $isTag = true;

    public function init($params)
    {
        parent::init($params);

        $itemListOptions = [
            'page'          => $this->getParam( 'page', 1 ),
            'itemsPerPage'  => $this->getParam( 'itemsPerPage', '' ),
            'sorting'       => $this->getParam( 'sorting', '' ),
            'tagName'       => $this->getParam( 'tagName', '' ),
            'tagId'         => $this->getParam( 'tagId','' )
        ];

        $itemListOptions = SearchOptions::validateItemListOptions($itemListOptions, SearchOptions::SCOPE_SEARCH);
        $tagId = $itemListOptions['tagId'];
        $this->initItemList(
            [
                'itemList' =>  TagItems::getSearchFactory([
                    'tagIds'    => is_array( $tagId ) ? $tagId : [$tagId],
                    'sorting'   => $this->getParam('sorting','')
                ])
            ],
            $itemListOptions,
            SearchOptions::SCOPE_SEARCH
        );

        $this->isSearch = true;
        $this->searchString = $itemListOptions['tagName'];
    }
}

