<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresLanguageConfig extends PluginConfig
{
    public $activeLanguages;
    
    protected function getPluginName()
    {
        return 'Ceres';
    }

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
