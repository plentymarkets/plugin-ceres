<?php

namespace Ceres\Wizard\ShopWizard\Services;

use Ceres\Wizard\ShopWizard\Mapping\DataMapping;

/**
 * Class MappingService
 * @package Ceres\Wizard\ShopWizard\Services
 */
class MappingService
{
    /** @var DataMapping */
    private $dataMapping;

    /**
     * MappingService constructor.
     *
     * @param DataMapping $mapping
     */
    public function __construct(DataMapping $mapping)
    {
        $this->dataMapping = $mapping;
    }

    /**
     * @param array $dataToProcess
     * @param string $scope
     *
     * @return array
     */
    public function processGlobalMappingData(array $dataToProcess, string $scope = "display" ): array
    {
        $mappedData = $this->dataMapping->getGlobalData();
        $processedData = $this->matchArrayData($dataToProcess, $mappedData, $scope);

        return $processedData;
    }

    /**
     * @param array $dataToProcess
     * @param string $scope
     *
     * @return array
     */
    public function processPluginMappingData(array $dataToProcess, string $scope = "display"): array
    {
        $mappedData = $this->dataMapping->getPluginMapping();
        $processedData = $this->matchArrayData($dataToProcess, $mappedData, $scope);

        return $processedData;
    }

    /**
     * @param array $processingData
     * @param array $mappingData
     * @param string $scope
     *
     * @return array
     */
    private function matchArrayData(array $processingData, array $mappingData, string $scope): array
    {
        $matchedData = [];

        foreach ($mappingData as $itemKey => $itemData) {
            $key = $itemData['field'];

            if ($scope == "display") {
                list($step,$fieldName) = explode("_", $itemKey);

                if ($itemData['optional'] && !empty($processingData[$key])) {
                    $matchedData[$step][] =  $processingData[$key];
                }

                $matchedData[$itemKey] = $this->matchDataByType($itemData['type'], $processingData[$key]);
            } else {
                $matchedData[$key] = $this->matchDataByType($itemData['type'], $processingData[$itemKey], $scope);
            }
        }

        return $matchedData;
    }

    /**
     * @param $type
     * @param $value
     * @param string $scope
     *
     * @return float|int|string
     */
    private function matchDataByType($type, $value, $scope = "display")
    {
        $matchedValue = '';
        
        switch($type){
            case "string":
                $matchedValue = $value;
                break;
            case "boolean":
                $matchedValue = $value == 'true' || $value == '1' ? true : false;
                break;
            case "integer":
                $matchedValue = intval($value);
                break;
            case "float":
                $matchedValue = floatval($value);
                break;
            case "concatenated":
                if ( $scope == 'display') {
                    $matchedValue = $value != "" ? explode(", ", $value) : [];
                } else {
                    $matchedValue = implode($value, ", ");
                }
                break;
        }

        return $matchedValue;
    }
}
