<?php

namespace Ceres\Containers;

use Ceres\Config\CeresConfig;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\TagItems;
use Plenty\Modules\Webshop\ItemSearch\Services\ItemSearchService;
use Plenty\Plugin\Templates\Twig;

/**
 * Class CeresItemListContainer1
 *
 * This class is a DataProvider. It is used to display a configurable list of items in your online store.
 * @package Ceres\Containers
 */
class CeresItemListContainer1
{
    /**
     * Renders the template.
     * @param Twig $twig The twig instance
     * @param array $arg A list of items
     * @return string
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function call(Twig $twig, $arg):string
    {
        return $twig->render('Ceres::Containers.ItemLists.ItemList1', ["item" => $arg[0]]);
    }
}
