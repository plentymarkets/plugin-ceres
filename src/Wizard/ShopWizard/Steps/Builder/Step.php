<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 19/06/2019
 * Time: 15:11
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;

class Step
{

    public $globalsCondition;

    /**
     * Step constructor.
     */
    public function __construct()
    {
        $this->globalsCondition = "client !== 'preview'";
    }

    /**
     * @param $data
     * @param bool $captionColumn
     * @param bool $valColumn
     *
     * @return array
     */
    public function buildListBoxData($data, $captionColumn = false, $valColumn = false)
    {
        $listBoxValues = [];
        if (count($data)) {
            foreach ($data as $itemKey => $itemVal) {
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
     * @param string $translation
     *
     * @return array
     */
    public function generateTranslatedListBoxValues(array $data): array
    {
        $listValues = [];

        foreach ($data as $itemKey => $itemVal) {
            $listValues[] = [
                "value" => $itemVal,
                "caption" => "Wizard.{$itemKey}"
            ];
        }

        return $listValues;
    }

    /**
     * @return bool
     */
    public function hasRequiredSettings(): bool
    {
        $hasSettings = false;

        $shopWizardService = pluginApp(DefaultSettingsService::class);

        $hasShippingMethod = $shopWizardService->hasShippingMethods();
        $hasShippingProfile = $shopWizardService->hasShippingProfiles();
        $hasPaymentMethod = $shopWizardService->hasPaymentMethods();
        $hasShippingCountry = $shopWizardService->hasShippingCountries();
        $hasLocation = $shopWizardService->hasLocations();

        if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry && $hasLocation) {
            $hasSettings = true;
        }

        return $hasSettings;
    }
}