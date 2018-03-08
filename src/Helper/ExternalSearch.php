<?php

namespace Ceres\Helper;

use Plenty\Plugin\Events\Dispatcher;

class ExternalSearch
{
    const EVENT_NAME = 'Ceres.Search.Query';

    public $searchString = "";
    public $categoryId   = 0;
    public $page         = 1;
    public $itemsPerPage = 20;
    public $sorting      = "";

    private $results      = [];
    private $countTotal   = null;
    private $hasResults   = false;


    public static function getExternalResults( $container )
    {
        /** @var Dispatcher $dispatcher */
        $dispatcher = pluginApp( Dispatcher::class );

        $dispatcher->fire( self::EVENT_NAME, [$container] );

        return $container;
    }

    public static function hasExternalSearch()
    {
        /** @var Dispatcher $dispatcher */
        $dispatcher = pluginApp( Dispatcher::class );
        return $dispatcher->hasListeners( self::EVENT_NAME );
    }

    public function setResults( $variationIds, $countTotal = null )
    {
        $this->hasResults = true;
        $this->results = $variationIds;
        $this->countTotal = $countTotal;
        if ( $countTotal === null )
        {
            $this->countTotal = count( $variationIds );
        }
    }

    public function hasResults()
    {
        return $this->hasResults;
    }

    public function getResults()
    {
        return $this->results;
    }

    public function getCountTotal()
    {
        return $this->countTotal;
    }

}