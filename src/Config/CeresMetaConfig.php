<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresMetaConfig extends PluginConfig
{
    public $robotsHome;
    public $descriptionHome_de;
    public $descriptionHome_en;
    public $robotsContact;
    public $descriptionContact_de;
    public $descriptionContact_en;
    public $robotsCancellationRights;
    public $descriptionCancellationRights_de;
    public $descriptionCancellationRights_en;
    public $robotsCancellationForm;
    public $descriptionCancellationForm_de;
    public $descriptionCancellationForm_en;
    public $robotsLegalDisclosure;
    public $descriptionLegalDisclosure_de;
    public $descriptionLegalDisclosure_en;
    public $robotsPrivacyPolicy;
    public $descriptionPrivacyPolicy_de;
    public $descriptionPrivacyPolicy_en;
    public $robotsTermsAndConditions;
    public $descriptionTermsAndConditions_de;
    public $descriptionTermsAndConditions_en;
    public $robotsSearchResult;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
        
        $this->robotsHome                           = $this->getTextValue( "meta.robots_home" , "all" );
        $this->descriptionHome_de                   = $this->getTextValue( "meta.de.description_home" );
        $this->descriptionHome_en                   = $this->getTextValue( "meta.en.description_home" );

        $this->robotsContact                        = $this->getTextValue( "meta.robots_contact" , "all" );
        $this->descriptionContact_de                = $this->getTextValue( "meta.de.description_contact" );
        $this->descriptionContact_en                = $this->getTextValue( "meta.en.description_contact" );

        $this->robotsCancellationRights             = $this->getTextValue( "meta.robots_cancel_rights" , "all" );
        $this->descriptionCancellationRights_de     = $this->getTextValue( "meta.de.description_cancel_rights" );
        $this->descriptionCancellationRights_en     = $this->getTextValue( "meta.en.description_cancel_rights" );

        $this->robotsCancellationForm               = $this->getTextValue( "meta.robots_cancel_form" , "all" );
        $this->descriptionCancellationForm_de       = $this->getTextValue( "meta.de.description_cancel_form" );
        $this->descriptionCancellationForm_en       = $this->getTextValue( "meta.en.description_cancel_form" );

        $this->robotsLegalDisclosure                = $this->getTextValue( "meta.robots_legal_disclosure" , "all" );
        $this->descriptionLegalDisclosure_de        = $this->getTextValue( "meta.de.description_legal_disclosure" );
        $this->descriptionLegalDisclosure_en        = $this->getTextValue( "meta.en.description_legal_disclosure" );

        $this->robotsPrivacyPolicy                  = $this->getTextValue( "meta.robots_privacy_policy" , "all" );
        $this->descriptionPrivacyPolicy_de          = $this->getTextValue( "meta.de.description_privacy_policy" );
        $this->descriptionPrivacyPolicy_en          = $this->getTextValue( "meta.en.description_privacy_policy" );

        $this->robotsTermsAndConditions             = $this->getTextValue( "meta.robots_terms_and_conditions" , "all" );
        $this->descriptionTermsAndConditions_de     = $this->getTextValue( "meta.de.description_terms_and_conditions" );
        $this->descriptionTermsAndConditions_en     = $this->getTextValue( "meta.en.description_terms_and_conditions" );

        $this->robotsSearchResult                   = $this->getTextValue( "meta.robots_search_result" , "all" );
    }
}