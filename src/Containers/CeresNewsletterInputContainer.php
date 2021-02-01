<?php

namespace Ceres\Containers;

use Plenty\Plugin\Templates\Twig;

/**
 * Class CeresNewsletterInputContainer
 *
 * This class was previously a DataProvider. It is now a stub.
 * @package Ceres\Containers
 * @deprecated
 */
class CeresNewsletterInputContainer
{
    /**
     * Does nothing, as the underlying template does no longer exist.
     * @deprecated
     * @param Twig $twig The twig instance
     * @return string
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function call(Twig $twig)
    {
        return $twig->render('Ceres::Containers.Newsletter.ContainerNewsletterInput');
    }
}
