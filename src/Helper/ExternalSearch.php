<?php

namespace Ceres\Helper;

use Plenty\Plugin\Events\Dispatcher;

/**
 * Class ExternalSearch
 *
 * Helper class to allow searches from external plugins.
 *
 * @package Ceres\Helper
 */
class ExternalSearch
{
    /** @var string Identifier for the event */
    const EVENT_NAME = 'Ceres.Search.Query';

    /** @var string $searchString The search string */
    public $searchString = "";
    /** @var int $categoryId Category id to search items for (Default: 0) */
    public $categoryId = 0;
    /** @var int $page What page to get (Default: 1) */
    public $page = 1;
    /** @var int $itemsPerPage How many items per page (Default: 20) */
    public $itemsPerPage = 20;
    /** @var string $sorting How should the result be sorted */
    public $sorting = "";

    /** @var array $results The result of the search, an array of variation ids */
    private $results = [];
    /** @var array $documents The result of the search, an array of variations */
    private $documents = [];

    /** @var int|null $countTotal Amount of results */
    private $countTotal = null;
    /** @var bool $hasResults Is there a result? */
    private $hasResults = false;

    /**
     * Perform the external search
     * @param ExternalSearch $container An ExternalSearch object
     * @return mixed
     */
    public static function getExternalResults($container)
    {
        /** @var Dispatcher $dispatcher */
        $dispatcher = pluginApp(Dispatcher::class);

        $dispatcher->fire(self::EVENT_NAME, [$container]);

        return $container;
    }

    /**
     * Check if there is an external search plugin?
     * @return bool
     */
    public static function hasExternalSearch()
    {
        /** @var Dispatcher $dispatcher */
        $dispatcher = pluginApp(Dispatcher::class);
        return $dispatcher->hasListeners(self::EVENT_NAME);
    }

    /**
     * Set the results of the external search
     * @param array $variationIds The variation ids found by the search
     * @param int|null $countTotal Optional: The amount of found variation ids
     */
    public function setResults($variationIds, $countTotal = null)
    {
        $this->hasResults = true;
        $this->results = $variationIds;
        $this->countTotal = $countTotal;
        if ($countTotal === null) {
            $this->countTotal = count($variationIds);
        }
    }

    /**
     * Set the documents of the external search
     *
     * @param array $documents The variations found by the search
     * @param int|null $countTotal Optional: The amount of found variations
     */
    public function setDocuments($documents, $countTotal = null)
    {
        $this->hasResults = true;
        $this->documents = $documents;
        if ($countTotal === null) {
            $this->countTotal = count($documents);
        } else {
            $this->countTotal = $countTotal;
        }
    }

    /**
     * Return true if the search has a result
     * @return bool
     */
    public function hasResults()
    {
        return $this->hasResults;
    }

    /**
     * Return the results of the search
     * @return array
     */
    public function getResults()
    {
        return $this->results;
    }

    /**
     * Return the results of the search
     * @return array
     */
    public function getDocuments()
    {
        return $this->documents;
    }

    /**
     * The amount of found variations
     * @return null|int
     */
    public function getCountTotal()
    {
        return $this->countTotal;
    }

}
