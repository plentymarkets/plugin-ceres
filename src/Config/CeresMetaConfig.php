<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresMetaConfig
 *
 * PluginConfig class, including all plugin settings for the meta data.
 *
 * @package Ceres\Config
 */
class CeresMetaConfig extends PluginConfig
{
    /**
     * @var string $robotsHome Robots for homepage.
     */
    public $robotsHome;

    /**
     * @var string $robotsContact Robots for contact page.
     */
    public $robotsContact;

    /**
     * @var string $robotsCancellationRights Robots for cancellation rights.
     */
    public $robotsCancellationRights;

    /**
     * @var string $robotsCancellationForm Robots for cancellation form.
     */
    public $robotsCancellationForm;

    /**
     * @var string $robotsLegalDisclosure Robots for legal disclosure.
     */
    public $robotsLegalDisclosure;

    /**
     * @var string $robotsPrivacyPolicy Robots for privacy policy.
     */
    public $robotsPrivacyPolicy;

    /**
     * @var string $robotsTermsAndConditions Robots for terms and conditions.
     */
    public $robotsTermsAndConditions;

    /**
     * @var string $robotsSearchResult Robots for search result.
     */
    public $robotsSearchResult;

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
        $this->robotsHome                           = $this->getTextValue( 'meta.robots_home' , 'all' );
        $this->robotsContact                        = $this->getTextValue( 'meta.robots_contact' , 'all' );
        $this->robotsCancellationRights             = $this->getTextValue( 'meta.robots_cancel_rights' , 'all' );
        $this->robotsCancellationForm               = $this->getTextValue( 'meta.robots_cancel_form' , 'all' );
        $this->robotsLegalDisclosure                = $this->getTextValue( 'meta.robots_legal_disclosure' , 'all' );
        $this->robotsPrivacyPolicy                  = $this->getTextValue( 'meta.robots_privacy_policy' , 'all' );
        $this->robotsTermsAndConditions             = $this->getTextValue( 'meta.robots_terms_and_conditions' , 'all' );
        $this->robotsSearchResult                   = $this->getTextValue( 'meta.robots_search_result' , 'all' );
    }
}
