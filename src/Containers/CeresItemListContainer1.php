<?php

namespace Ceres\Containers;

use Plenty\Plugin\Templates\Twig;

class CeresItemListContainer1
{
    public function call(Twig $twig):string
    {
        return $twig->render('Ceres::Containers.ItemLists.ItemList1');
    }
}