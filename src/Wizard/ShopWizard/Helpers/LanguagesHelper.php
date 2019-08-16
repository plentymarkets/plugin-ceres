<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 07/06/2019
 * Time: 15:18
 */

namespace Ceres\Wizard\ShopWizard\Helpers;

use Plenty\Modules\User\Contracts\UserRepositoryContract;
use Plenty\Modules\User\Models\User;
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
    public static function getTranslatedLanguages()
    {
        $translator = pluginApp(Translator::class);
        $rawLanguages = self::getLanguages();
        $languages = [];

        if (count($rawLanguages)) {
            foreach ($rawLanguages as $lang) {
                $languages[$lang] = $translator->trans("Ceres::Config.languageActiveLanguages" . ucfirst($lang));
            }
        }

        return $languages;

    }

    public static function getUserLang()
    {
        /** @var UserRepositoryContract $userRepo */
        $userRepo = pluginApp(UserRepositoryContract::class);
        /** @var User $currentUser */
        $currentUser = $userRepo->getCurrentUser();
        if($currentUser instanceof User)
        {
            return $currentUser->lang;
        }
        
        return 'en';
    }
}
