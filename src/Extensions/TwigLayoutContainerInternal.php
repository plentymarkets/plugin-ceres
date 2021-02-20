<?php
namespace Ceres\Extensions;

use Ceres\Helper\LayoutContainer;
use Plenty\Plugin\Templates\Extensions\Twig_Extension;
use Plenty\Plugin\Templates\Factories\TwigFactory;

/**
 * Class TwigLayoutContainerInternal
 * This TWIG extension provides the function container_internal, to render layout containers in TWIG.
 *
 * @package Ceres\Extensions
 */
class TwigLayoutContainerInternal extends Twig_Extension
{
    /**
     * @var TwigFactory $twig The factory to render TWIG.
     */
    private $twig;

    /**
     * TwigLayoutContainerInternal constructor.
     * @param TwigFactory $twig
     */
    public function __construct(TwigFactory $twig)
    {

        $this->twig = $twig;
    }

    /**
     * Return the name of the extension.
     *
     * @return string The name of the extension.
     */
    public function getName(): string
    {
        return "Ceres_Extension_TwigLayoutContainerInternal";
    }

    /**
     * Return a list of functions to add.
     *
     * @return array The list of functions to add.
     */
    public function getFunctions(): array
    {
        return [
            $this->twig->createSimpleFunction('container_internal', [$this, 'getInternalContainer'])
        ];
    }

    /**
     * Return a list of filters to add.
     *
     * @return array The list of filters to add.
     */
    public function getFilters(): array
    {
        return [];
    }

    /**
     * Get a list of rendered layout containers, normally used in the twig template renderer.
     *
     * @param string $containerName The name of the container.
     * @param string $arguments Optional arguments.
     * @return array List of rendered layout containers.
     */
    public function getInternalContainer($containerName, $arguments)
    {
        return LayoutContainer::getContents( $containerName, $arguments );
    }

    /**
     * Return a map of global helper objects to add.
     *
     * @return array The map of helper objects to add.
     */
    public function getGlobals(): array
    {
        return [];
    }
}
