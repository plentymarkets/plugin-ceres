<?php

namespace Ceres\Migrations;

use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Ceres\Config\CeresConfig;
use Plenty\Modules\PluginMultilingualism\Contracts\PluginTranslationRepositoryContract;
use Plenty\Plugin\ConfigRepository;

/**
 * Class ConfigPropertiesMigration_0_0_1
 * @package Ceres\Migrations
 */
class ConfigPropertiesMigration_0_0_1
{
    private static $translationMap =
    [
        'cancellationFormMetaDescription'   => ['meta'      => ['descriptionCancellationForm_de', 'descriptionCancellationForm_en']],
        'cancellationRightsMetaDescription' => ['meta'      => ['descriptionCancellationRights_de', 'descriptionCancellationRights_en']],
        'contactMetaDescription'            => ['meta'      => ['descriptionContact_de', 'descriptionContact_en']],
        'homepageMetaDescription'           => ['meta'      => ['descriptionHome_de', 'descriptionHome_en']],
        'legalDisclosureMetaDescription'    => ['meta'      => ['descriptionLegalDisclosure_de', 'descriptionLegalDisclosure_en']],
        'privacyPolicyMetaDescription'      => ['meta'      => ['descriptionPrivacyPolicy_de', 'descriptionPrivacyPolicy_en']],
        'termsAndConditionsMetaDescription' => ['meta'      => ['descriptionTermsAndConditions_de', 'descriptionTermsAndConditions_en']],
        'contactOpeningTimes'               => ['contact'   => ['openingTimes', 'openingTimes_en']],
        'footerColumnTitle1'                => ['footer'    => ['col1Title', 'col1Title']],
        'footerColumnTitle2'                => ['footer'    => ['col2Title', 'col2Title']],
        'footerColumnTitle3'                => ['footer'    => ['col3Title', 'col3Title']],
        'footerStoreFeature1'               => ['footer'    => ['storeFeature1', 'storeFeature1']],
        'footerStoreFeature2'               => ['footer'    => ['storeFeature2', 'storeFeature2']],
        'footerStoreFeature3'               => ['footer'    => ['storeFeature3', 'storeFeature3']],
        'headerCompanyName'                 => ['header'    => ['companyName', 'companyName']],
        'itemList1ListName'                 => ['itemLists' => ['list1Name_de', 'list1Name_en']],
        'itemList2ListName'                 => ['itemLists' => ['list2Name_de', 'list2Name_en']],
        'itemList3ListName'                 => ['itemLists' => ['list3Name_de', 'list3Name_en']]
    ];

    /**
     * @throws \ErrorException
     */
    public function run()
    {
		/** @var CeresConfig $ceresConfig */
		$ceresConfig = pluginApp(CeresConfig::class);

		/** @var PluginTranslationRepositoryContract $translationRepo */
		$translationRepo = pluginApp(PluginTranslationRepositoryContract::class);

		/** @var ConfigRepository $configRepo */
		$configRepo = pluginApp(ConfigRepository::class);

		$pluginSetId = $configRepo->get('plugin.setId');
		$pluginName = 'Ceres';
		$pluginTranslationFile = 'Template.properties';

        foreach (SELF::$translationMap as $key => $translation)
        {
            for($i = 0; $i <= 1; $i++)
            {
                if(strlen($configRepo->get('Ceres.' . key($translation) . '.' .  $translation[key($translation)][$i])))
                {
                    $lang = 'de';

                    if($i == 1)
                    {
                        $lang = 'en';
                    }

                    $translationData = [
                        'languageCode' => $lang,
                        'key' => $key,
                        'value' => $configRepo->get('Ceres.' . key($translation) . '.' . $translation[key($translation)][$i]),
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