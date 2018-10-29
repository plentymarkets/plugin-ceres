<?php

namespace Ceres\Containers;

use Plenty\Plugin\Templates\Twig;

class CeresNewsletterInputContainer
{
    public function call(Twig $twig)
    {
        return $twig->render('Ceres::Containers.Newsletter.ContainerNewsletterInput');
    }
}