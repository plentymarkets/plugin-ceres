<?php

namespace Ceres\Containers;

use Plenty\Plugin\Templates\Twig;

class CeresLastSeenContainer
{
    public function call(Twig $twig):string
    {
        return $twig->render('Ceres::Containers.ItemLists.LastSeenItemList');
    }
}