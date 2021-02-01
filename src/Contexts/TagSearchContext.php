<?php

namespace Ceres\Contexts;

use Ceres\Helper\SearchOptions;
use IO\Helper\ContextInterface;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\TagItems;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\Facets;

/**
 * Class TagSearchContext
 *
 * Context class with additional data, required for the tag item view.
 *
 * @package Ceres\Contexts
 */
class TagSearchContext extends CategoryContext implements ContextInterface
{
    use ItemListContext;

    /**
     * @var bool $isSearch Defines that the user has executed a shop search.
     */
    public $isSearch;

    /**
     * @var string $searchString The name of the tag.
     */
    public $searchString;

    /**
     * @var bool $isTag Defines that the user is on a page with items, filtered for the current tag.
     */
    public $isTag = true;

    /**
     * @inheritDoc
     */
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
