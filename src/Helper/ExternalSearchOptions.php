<?php

namespace Ceres\Helper;

use Plenty\Plugin\Events\Dispatcher;

/**
 * Class ExternalSearchOptions
 *
 * Exposes the search options of external search plugins
 * @package Ceres\Helper
 */
class ExternalSearchOptions
{
    /** @var string Identifier for the event */
    const EVENT_NAME = 'Ceres.Search.Options';

    /** @var array $itemsPerPage All itemsPerPage options */
    private $itemsPerPage;
    /** @var int $defaultItemsPerPage The default items per page */
    private $defaultItemsPerPage;
    /** @var bool $hasItemsPerPage Does the external search have an items per page option? */
    private $hasItemsPerPage = false;

    /** @var array $sortingOptions All sorting options */
    private $sortingOptions;
    /** @var string $defaultSorting The default sorting */
    private $defaultSorting;
    /** @var bool $hasSortingOptions Does the external search have sorting options? */
    private $hasSortingOptions = false;

    /**
     * Get itemsPerPage and sortingOptions from external search plugins
     * @return ExternalSearchOptions
     */
    public static function getExternalSearchOptions()
    {
        /** @var Dispatcher $dispatcher */
        $dispatcher = pluginApp( Dispatcher::class );

        /** @var ExternalSearchOptions $container */
        $container = pluginApp( ExternalSearchOptions::class );

        $dispatcher->fire( self::EVENT_NAME, [$container] );

        return $container;
    }

    /**
     * Set the itemsPerPage and it's default setting
     * @param array $itemsPerPage All available itemsPerPage settings
     * @param int $default The default itemsPerPage setting
     */
    public function setItemsPerPage( $itemsPerPage, $default )
    {
        $this->hasItemsPerPage      = true;
        $this->itemsPerPage         = $itemsPerPage;
        $this->defaultItemsPerPage  = $default;
    }

    /**
     * Get all itemsPerPage settings
     * @return array
     */
    public function getItemsPerPage()
    {
        return $this->itemsPerPage;
    }

    /**
     * Get the default itemsPerPage setting
     * @return int
     */
    public function getDefaultItemsPerPage()
    {
        return $this->defaultItemsPerPage;
    }

    /**
     * Set the sortingOptions and the default sortingOption
     * @param array $sorting All available sorting options
     * @param string $default The default sorting option
     */
    public function setSortingOptions( $sorting, $default )
    {
        $this->hasSortingOptions    = true;
        $this->sortingOptions       = $sorting;
        $this->defaultSorting       = $default;
    }

    /**
     * Get the sorting options
     * @return array
     */
    public function getSortingOptions()
    {
        return $this->sortingOptions;
    }

    /**
     * Return the default sorting option
     * @return string
     */
    public function getDefaultSortingOption()
    {
        return $this->defaultSorting;
    }

    /**
     * Does the external search expose any options at all?
     * @return bool
     */
    public function hasOptions()
    {
        return $this->hasItemsPerPage || $this->hasSortingOptions;
    }
}
