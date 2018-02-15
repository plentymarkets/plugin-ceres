<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresMetaConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getRobotsHome()
    {
        return $this->getTextValue( "meta.robots_home" , "all" );
    }

    public function getDescriptionHome_de()
    {
        return $this->getTextValue( "meta.de.description_home" );
    }

    public function getDescriptionHome_en()
    {
        return $this->getTextValue( "meta.en.description_home" );
    }

    public function getRobotsContact()
    {
        return $this->getTextValue( "meta.robots_contact" , "all" );
    }

    public function getDescriptionContact_de()
    {
        return $this->getTextValue( "meta.de.description_contact" );
    }

    public function getDescriptionContact_en()
    {
        return $this->getTextValue( "meta.en.description_contact" );
    }

    public function getRobotsCancellationRights()
    {
        return $this->getTextValue( "meta.robots_cancel_rights" , "all" );
    }

    public function getDescriptionCancellationRights_de()
    {
        return $this->getTextValue( "meta.de.description_cancel_rights" );
    }

    public function getDescriptionCancellationRights_en()
    {
        return $this->getTextValue( "meta.en.description_cancel_rights" );
    }

    public function getRobotsCancellationForm()
    {
        return $this->getTextValue( "meta.robots_cancel_form" , "all" );
    }

    public function getDescriptionCancellationForm_de()
    {
        return $this->getTextValue( "meta.de.description_cancel_form" );
    }

    public function getDescriptionCancellationForm_en()
    {
        return $this->getTextValue( "meta.en.description_cancel_form" );
    }

    public function getRobotsLegalDisclosure()
    {
        return $this->getTextValue( "meta.robots_legal_disclosure" , "all" );
    }

    public function getDescriptionLegalDisclosure_de()
    {
        return $this->getTextValue( "meta.de.description_legal_disclosure" );
    }

    public function getDescriptionLegalDisclosure_en()
    {
        return $this->getTextValue( "meta.en.description_legal_disclosure" );
    }

    public function getRobotsPrivacyPolicy()
    {
        return $this->getTextValue( "meta.robots_privacy_policy" , "all" );
    }

    public function getDescriptionPrivacyPolicy_de()
    {
        return $this->getTextValue( "meta.de.description_privacy_policy" );
    }

    public function getDescriptionPrivacyPolicy_en()
    {
        return $this->getTextValue( "meta.en.description_privacy_policy" );
    }

    public function getRobotsTermsAndConditions()
    {
        return $this->getTextValue( "meta.robots_terms_and_conditions" , "all" );
    }

    public function getDescriptionTermsAndConditions_de()
    {
        return $this->getTextValue( "meta.de.description_terms_and_conditions" );
    }

    public function getDescriptionTermsAndConditions_en()
    {
        return $this->getTextValue( "meta.en.description_terms_and_conditions" );
    }
}