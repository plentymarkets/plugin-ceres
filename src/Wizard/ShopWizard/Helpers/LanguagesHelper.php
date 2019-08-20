<?php

namespace Ceres\Wizard\ShopWizard\Helpers;

use Plenty\Modules\User\Contracts\UserRepositoryContract;
use Plenty\Modules\User\Models\User;
use Plenty\Plugin\Http\Request;
use Plenty\Plugin\Translation\Translator;

/**
 * Class LanguagesHelper
 * @package Ceres\Wizard\ShopWizard\Helpers
 */
class LanguagesHelper
{
    private static $languages = array('de',
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
    
    /**
     * @return array
     */
    public static function getLanguages()
    {
        return self::$languages;
    }
    
    /**
     * @return array
     */
    public static function getTranslatedLanguages()
    {
        $translator = pluginApp(Translator::class);
        $rawLanguages = self::getLanguages();
        $languages = [];

        if(count($rawLanguages)) {
            foreach($rawLanguages as $lang) {
                $languages[$lang] = $translator->trans("Ceres::Config.languageActiveLanguages" . ucfirst($lang));
            }
        }

        return $languages;
    }
    
    /**
     * @return string
     */
    public static function getUserLang()
    {
        try
        {
            /** @var UserRepositoryContract $userRepo */
            $userRepo = pluginApp(UserRepositoryContract::class);
            /** @var User $currentUser */
            $currentUser = $userRepo->getCurrentUser();
            return $currentUser->lang;
        }
        catch(\Exception $e)
        {
            /** @var Request $request */
            $request = pluginApp(Request::class);
            return $request->getLocale();
        }
    }
}
