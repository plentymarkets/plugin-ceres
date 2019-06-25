<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 07/06/2019
 * Time: 15:18
 */

namespace Ceres\Wizard\ShopWizard\Helpers;

use Plenty\Plugin\Translation\Translator;

class LanguagesHelper
{
    public static $languages = array('de',
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
    );

    public static function getLanguages()
    {
        return self::$languages;
    }


    /**
     * @param array $langArray
     *
     * @return array
     */
    public static function translateLanguages(array $langArray)
    {
        $translator = pluginApp(Translator::class);
        $languages = [];

        if (count($langArray)) {
            foreach ($langArray as $lang) {
                $languages[$lang] = $translator->trans("Ceres::Config.languageActiveLanguages" . ucfirst($lang));
            }
        }

        return $languages;

    }
}