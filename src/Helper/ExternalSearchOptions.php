<?php

namespace Ceres\Helper;

use Plenty\Plugin\Events\Dispatcher;

class ExternalSearchOptions
{
    const EVENT_NAME = 'Ceres.Search.Options';

    private $itemsPerPage;
    private $defaultItemsPerPage;
    private $hasItemsPerPage = false;

    private $sortingOptions;
    private $defaultSorting;
    private $hasSortingOptions = false;

    public static function getExternalSearchOptions()
    {
        /** @var Dispatcher $dispatcher */
        $dispatcher = pluginApp( Dispatcher::class );

        /** @var ExternalSearchOptions $container */
        $container = pluginApp( ExternalSearchOptions::class );

        $dispatcher->fire( self::EVENT_NAME, [$container] );

        return $container;
    }

    public function setItemsPerPage( $itemsPerPage, $default )
    {
        $this->hasItemsPerPage      = true;
        $this->itemsPerPage         = $itemsPerPage;
        $this->defaultItemsPerPage  = $default;
    }

    public function getItemsPerPage()
    {
        return $this->itemsPerPage;
    }

    public function getDefaultItemsPerPage()
    {
        return $this->defaultItemsPerPage;
    }

    public function setSortingOptions( $sorting, $default )
    {
        $this->hasSortingOptions    = true;
        $this->sortingOptions       = $sorting;
        $this->defaultSorting       = $default;
    }

    public function getSortingOptions()
    {
        return $this->sortingOptions;
    }

    public function getDefaultSortingOption()
    {
        return $this->defaultSorting;
    }

    public function hasOptions()
    {
        return $this->hasItemsPerPage || $this->hasSortingOptions;
    }
}