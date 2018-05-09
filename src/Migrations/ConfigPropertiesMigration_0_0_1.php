<?php

namespace Ceres\Migrations;

use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\PluginMultilingualism\Contracts\PluginTranslationRepositoryContract;

/**
 * Class ConfigPropertiesMigration_0_0_1
 * @package Ceres\Migrations
 */
class ConfigPropertiesMigration_0_0_1
{
    private $translationMap =
    [
        'cancellationFormMetaDescription' => [
            'de' => 'meta.de.description_cancel_form',
            'en' => 'meta.en.description_cancel_form'
        ],
        'cancellationRightsMetaDescription' => [
            'de' => 'meta.de.description_cancel_rights',
            'en' => 'meta.en.description_cancel_rights'
        ],
        'contactMetaDescription' => [
            'de' => 'meta.de.description_contact',
            'en' => 'meta.en.description_contact'
        ],
        'homepageMetaDescription' => [
            'de' => 'meta.de.description_home',
            'en' => 'meta.en.description_home'
        ],
        'legalDisclosureMetaDescription' => [
            'de' => 'meta.de.description_legal_disclosure',
            'en' => 'meta.en.description_legal_disclosure'
        ],
        'privacyPolicyMetaDescription' => [
            'de' => 'meta.de.description_privacy_policy',
            'en' => 'meta.en.description_privacy_policy'
        ],
        'termsAndConditionsMetaDescription' => [
            'de' => 'meta.de.description_terms_and_conditions',
            'en' => 'meta.en.description_terms_and_conditions'
        ],
        'contactOpeningTimes' => [
            'de' => 'contact.opening_times',
            'en' => 'contact.en.opening_times'
        ],
        'footerColumnTitle1' => [
            'de' => 'footer.col_1_title',
            'en' => 'footer.col_1_title'
        ],
        'footerColumnTitle2' => [
            'de' => 'footer.col_2_title',
            'en' => 'footer.col_2_title'
        ],
        'footerColumnTitle3' => [
            'de' => 'footer.col_3_title',
            'en' => 'footer.col_3_title'
        ],
        'footerStoreFeature1' => [
            'de' => 'footer.store_feature_1',
            'en' => 'footer.store_feature_1'
        ],
        'footerStoreFeature2' => [
            'de' => 'footer.store_feature_2',
            'en' => 'footer.store_feature_2'
        ],
        'footerStoreFeature3' => [
            'de' => 'footer.store_feature_3',
            'en' => 'footer.store_feature_3'
        ],
        'headerCompanyName' => [
            'de' => 'header.company_name',
            'en' => 'header.company_name'
        ],
        'itemList1ListName' => [
            'de' => 'item.lists.1.de.list_name',
            'en' => 'item.lists.1.en.list_name'
        ],
        'itemList2ListName' => [
            'de' => 'item.lists.2.de.list_name',
            'en' => 'item.lists.2.en.list_name'
        ],
        'itemList3ListName' => [
            'de' => 'item.lists.3.de.list_name',
            'en' => 'item.lists.3.en.list_name'
        ]
    ];

   
    public function run()
    {
        /** @var PluginSetRepositoryContract $pluginSetRepo */
        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginSets = $pluginSetRepo->list();
    
        /** @var PluginSet $pluginSet */
        foreach($pluginSets as $pluginSet)
        {
            foreach ($pluginSet->pluginSetEntries as $pluginSetEntry)
            {
                if ($pluginSetEntry instanceof PluginSetEntry && $pluginSetEntry->plugin->name === 'Ceres')
                {
                    $pluginSetId = $pluginSetEntry->pluginSetId;
                    $config      = $pluginSetEntry->configurations()->getResults();
                    
                    $this->migrate($pluginSetId, $config);
                }
            }
        }
    }
    
    public function migrate($pluginSetId, $config)
    {
		/** @var PluginTranslationRepositoryContract $translationRepo */
		$translationRepo = pluginApp(PluginTranslationRepositoryContract::class);

		$pluginName = 'Ceres';
		$pluginTranslationFile = 'Template.properties';
		
		foreach($this->translationMap as $translationKey => $configKeys)
        {
            foreach($configKeys as $lang => $configKey)
            {
                $configValue = null;
                foreach($config as $configEntry)
                {
                    if($configEntry->key == $configKey)
                    {
                        $configValue = $configEntry->value;
                    }
                }
                
                if(!is_null($configValue) && strlen($configValue))
                {
                    $translationData = [
                        'languageCode' => $lang,
                        'key'          => $translationKey,
                        'value'        => $configValue,
                        'pluginName'   => $pluginName,
                        'pluginSetId'  => $pluginSetId,
                        'fileName'     => $pluginTranslationFile
                    ];
    
                    $translationRepo->updateOrCreateTranslation($translationData);
                }
                
            }
        }
    }
}