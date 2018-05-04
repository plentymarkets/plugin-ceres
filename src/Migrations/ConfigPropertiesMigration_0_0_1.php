<?php

namespace Ceres\Migrations;

use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\PluginMultilingualism\Contracts\PluginTranslationRepositoryContract;
use Plenty\Plugin\ConfigRepository;

/**
 * Class ConfigPropertiesMigration_0_0_1
 * @package Ceres\Migrations
 */
class ConfigPropertiesMigration_0_0_1
{
    private $translationMap =
    [
        'cancellationFormMetaDescription'   => ['meta'       => ['de.description_cancel_form', 'en.description_cancel_form']],
        'cancellationRightsMetaDescription' => ['meta'       => ['de.description_cancel_rights', 'en.description_cancel_rights']],
        'contactMetaDescription'            => ['meta'       => ['de.description_contact', 'en.description_contact']],
        'homepageMetaDescription'           => ['meta'       => ['de.description_home', 'en.description_home']],
        'legalDisclosureMetaDescription'    => ['meta'       => ['de.description_legal_disclosure', 'en.description_legal_disclosure']],
        'privacyPolicyMetaDescription'      => ['meta'       => ['de.description_privacy_policy', 'en.description_privacy_policy']],
        'termsAndConditionsMetaDescription' => ['meta'       => ['de.description_terms_and_conditions', 'en.description_terms_and_conditions']],
        'contactOpeningTimes'               => ['contact'    => ['opening_times', 'en.opening_times']],
        'footerColumnTitle1'                => ['footer'     => ['col_1_title', 'col_1_title']],
        'footerColumnTitle2'                => ['footer'     => ['col_2_title', 'col_2_title']],
        'footerColumnTitle3'                => ['footer'     => ['col_3_title', 'col_3_title']],
        'footerStoreFeature1'               => ['footer'     => ['store_feature_1', 'store_feature_1']],
        'footerStoreFeature2'               => ['footer'     => ['store_feature_2', 'store_feature_2']],
        'footerStoreFeature3'               => ['footer'     => ['store_feature_3', 'store_feature_3']],
        'headerCompanyName'                 => ['header'     => ['company_name', 'company_name']],
        'itemList1ListName'                 => ['item.lists' => ['1.de.list_name', '1.en.list_name']],
        'itemList2ListName'                 => ['item.lists' => ['2.de.list_name', '2.en.list_name']],
        'itemList3ListName'                 => ['item.lists' => ['3.de.list_name', '3.en.list_name']]
    ];

    /**
     * @throws \ErrorException
     */
    public function run()
    {
		/** @var PluginTranslationRepositoryContract $translationRepo */
		$translationRepo = pluginApp(PluginTranslationRepositoryContract::class);

		/** @var ConfigRepository $configRepo */
		$configRepo = pluginApp(ConfigRepository::class);

		$pluginSetId = $configRepo->get('plugin.setId');
		$pluginName = 'Ceres';
		$pluginTranslationFile = 'Template.properties';

        foreach ($this->translationMap as $translationKey => $translation)
        {
            foreach($translation as $configKey => $configValue)
            {
                for($i = 0; $i <= 1; $i++)
                {
                    if(strlen($configRepo->get('Ceres.' . $configKey . '.' .  $configValue[$i])))
                    {
                        $lang = 'de';
            
                        if($i == 1)
                        {
                            $lang = 'en';
                        }
            
                        $translationData = [
                            'languageCode' => $lang,
                            'key' => $translationKey,
                            'value' => $configRepo->get('Ceres.' . $configKey . '.' .  $configValue[$i]),
                            'pluginName' => $pluginName,
                            'pluginSetId' => $pluginSetId,
                            'fileName' => $pluginTranslationFile
                        ];
            
                        $translationRepo->updateOrCreateTranslation($translationData);
                    }
                }
            }
		}
    }
}