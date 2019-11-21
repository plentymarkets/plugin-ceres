<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class DataMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class DataMapping
{
    private $dataMapping = [];

    private $globalMapping = [];

    private $pluginMapping = [];

    /**
     * DataMapping constructor.
     */
    public function __construct()
    {
        $this->loadDataMapping();
        $this->sortDataMapping();
    }

    private function loadDataMapping()
    {
        $currenciesMapping      = CurrenciesMapping::getFieldsMapped();
        $defaultSettingsMapping = DefaultSettingsMapping::getFieldsMapped();
        $displayInfoMapping     = DisplayInfoMapping::getFieldsMapped();
        $languagesMapping       = LanguagesMapping::getFieldsMapped();
        $onlineStoreMapping     = OnlineStoreMapping::getFieldsMapped();
        $paginationMapping      = PaginationMapping::getFieldsMapped();
        $performanceMapping     = PerformanceMapping::getFieldsMapped();
        $searchMapping          = SearchMapping::getFieldsMapped();
        $seoMapping             = SeoMapping::getFieldsMapped();

        $this->dataMapping = array_merge(
            $currenciesMapping,
            $defaultSettingsMapping,
            $displayInfoMapping,
            $languagesMapping,
            $onlineStoreMapping,
            $paginationMapping,
            $performanceMapping,
            $searchMapping,
            $seoMapping
        );
    }
    
    private function sortDataMapping()
    {
        foreach ($this->dataMapping as $mappingKey => $mappingData) {
            if ($mappingData['global'] === true) {
                $this->globalMapping[$mappingKey] = $mappingData;
            } else {
                $this->pluginMapping[$mappingKey] = $mappingData;
            }
        }

    }
    
    /**
     * @return array
     */
    public function getGlobalData()
    {
        return $this->globalMapping;
    }
    
    /**
     * @return array
     */
    public function getPluginMapping()
    {
        return $this->pluginMapping;
    }
}
