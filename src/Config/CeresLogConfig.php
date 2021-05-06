<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresLogConfig
 *
 * PluginConfig class, including all plugin settings for the log.
 *
 * @package Ceres\Config
 */
class CeresLogConfig extends PluginConfig
{
    /**
     * @var array $data Enable logging options.
     */
    public $data;

    /**
     * @var string $performanceLevel Performance level. Possible values are 'live' and 'development'.
     */
    public $performanceLevel;

    /**
     * @var bool $checkSyntax Check for errors in markup before initialization.
     */
    public $checkSyntax;
    
    /**
     * @var bool $performanceSsr Activate vue server side rendering.
     */
    public $performanceSsr;

    /**
     * @var bool $performanceEventPropagation Activate the vueX eventPropagation plugin.
     */
    public $performanceEventPropagation;

    /**
     * @inheritDoc
     */
    protected function getPluginName() :string
    {
        return 'Ceres';
    }

    /**
     * @inheritDoc
     */
    protected function load()
    {
        $this->data = $this->getMultiSelectValue(
            'log.data',
            [
                'print_errors',
                'print_success',
                'print_warnings',
                'print_infos',
                'print_stack_trace',
                'show_error_code'
            ],
            [
                'print_errors',
                'print_success'
            ]
        );

        $this->performanceLevel = $this->getTextValue( 'log.performance.level', 'live' );
        $this->checkSyntax = $this->getBooleanValue('log.check_syntax', true);
        $this->performanceSsr = $this->getBooleanValue('log.performance.ssr', false);
        $this->performanceEventPropagation = $this->getBooleanValue('log.performance.eventPropagation', true);
    }
}
