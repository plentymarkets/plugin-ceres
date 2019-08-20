<?php

namespace Ceres\Wizard\ShopWizard\Helpers;

/**
 * Class StepHelper
 * @package Ceres\Wizard\ShopWizard\Helpers
 */
class StepHelper
{
    /**
     * @param array $data
     * @param bool $captionColumn
     * @param bool $valColumn
     *
     * @return array
     */
    public static function buildListBoxData($data, $captionColumn = false, $valColumn = false)
    {
        $listBoxValues = [];
        if(count($data)) {
            foreach($data as $itemKey => $itemVal) {
                $valData = is_object($itemVal) ? $itemVal->toArray() : $itemVal;
                $caption = $captionColumn ? $valData[$captionColumn] : $valData;
                $value = $valColumn ? $valData[$valColumn] : $itemKey;

                $listBoxValues[] = [
                    "caption" => $caption,
                    "value" => $value
                ];
            }
        }

        return $listBoxValues;
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public static function generateTranslatedListBoxValues(array $data): array
    {
        $listValues = [];

        foreach($data as $itemKey => $itemVal) {
            $listValues[] = [
                "value" => $itemVal,
                "caption" => "Wizard.{$itemKey}"
            ];
        }

        return $listValues;
    }
}
