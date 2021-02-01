<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresLanguageConfig
 *
 * PluginConfig class, including all plugin settings for the active languages.
 *
 * @package Ceres\Config
 */
class CeresLanguageConfig extends PluginConfig
{
    /**
     * @var array $activeLanguages Active languages.
     */
    public $activeLanguages;

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
        $this->activeLanguages = $this->getMultiSelectValue(
            'language.active_languages',
            [
                'de',
                'en',
                'bg',
                'fr',
                'it',
                'es',
                'tr',
                'nl',
                'pl',
                'pt',
                'nn',
                'ro',
                'da',
                'se',
                'cz',
                'ru',
                'sk',
                'cn',
                'vn'
            ],
            [
                'de'
            ]
        );
    }
}
