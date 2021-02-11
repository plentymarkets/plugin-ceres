<?php

namespace Ceres\Helper;

use Plenty\Plugin\Application;
use Plenty\Plugin\Events\Dispatcher;

/**
 * Class LayoutContainer
 *
 * Helper class for working with layout containers.
 * @package Ceres\Helper
 */
class LayoutContainer
{
    /**
     * Get a rendered layout container, normally used in the twig template renderer.
     * @param string $containerWithPluginName For example: "Ceres::Basket.BeforeBasketTotals".
     * @param array $arguments Context for the rendering of the layout container.
     * @return array
     */
    public static function getContents( $containerWithPluginName, $arguments )
    {
        /** @var Application $app */
        $app = pluginApp(Application::class);
        if($app->isTemplateSafeMode()) // Do not render layout containers in template safe mode.
        {
            return [];
        }

        list($pluginName, $containerName) = explode("::", $containerWithPluginName);

        /** @var Dispatcher $dispatcher */
        $dispatcher = pluginApp( Dispatcher::class );

        /** @var LayoutContainer $instance */
        $instance = pluginApp( self::class );
        $instance->pluginName = $pluginName;
        $instance->containerName = $containerName;

        $dispatcher->fire(
            $pluginName . '.LayoutContainer.' . $containerName,
            [$instance, $arguments]
        );

        return $instance->contents;
    }

    /** @var string $pluginName The plugin to which the layout container belongs */
    private $pluginName = "";
    /** @var string $containerName The container name for the layout container*/
    private $containerName = "";
    /** @var array The content of the layout container */
    private $contents = [];

    /**
     * Get the plugin name of the layout container.
     * @return string
     */
    public function getPluginName()
    {
        return $this->pluginName;
    }

    /**
     * Get the container name for the layout container.
     * @return string
     */
    public function getContainerName()
    {
        return $this->containerName;
    }

    /**
     * Add content for the layout container.
     * @param $content
     * @return $this
     */
    public function addContent( $content )
    {
        $this->contents[] = $content;
        return $this;
    }
}
