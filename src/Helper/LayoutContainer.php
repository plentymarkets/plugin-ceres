<?php

namespace Ceres\Helper;

use Plenty\Plugin\Application;
use Plenty\Plugin\Events\Dispatcher;

class LayoutContainer
{
    public static function getContents( $containerWithPluginName, $arguments )
    {
        /** @var Application $app */
        $app = pluginApp(Application::class);
        if($app->isTemplateSafeMode())
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

    private $pluginName = "";
    private $containerName = "";
    private $contents = [];

    public function getPluginName()
    {
        return $this->pluginName;
    }

    public function getContainerName()
    {
        return $this->containerName;
    }

    public function addContent( $content )
    {
        $this->contents[] = $content;
        return $this;
    }
}