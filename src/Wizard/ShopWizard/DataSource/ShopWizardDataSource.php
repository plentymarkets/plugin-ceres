<?php

namespace Ceres\Wizard\ShopWizard\DataSource;

use Ceres\Wizard\ShopWizard\Models\ShopWizardPreviewConfiguration;
use Ceres\Wizard\ShopWizard\Repositories\ShopWizardConfigRepository;
use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;
use Ceres\Wizard\ShopWizard\Validators\RequiredSettingsDataValidator;
use Plenty\Modules\Wizard\Services\DataSources\BaseWizardDataSource;
use Ceres\Wizard\ShopWizard\Services\ShopWizardService;

/**
 * Class ShopWizardDataSource
 * @package Ceres\Wizard\ShopWizard\DataSource
 */
class ShopWizardDataSource extends BaseWizardDataSource
{
    /**
     * @var ShopWizardService
     */
    private $wizardService;

    /**
     * @var RequiredSettingsDataValidator
     */
    private $requiredSettingsDataValidator;

    /**
     * ShopWizardDataSource constructor.
     *
     * @param ShopWizardService $wizardService
     * @param RequiredSettingsDataValidator $settingsDataValidator
     */
    public function __construct(ShopWizardService $wizardService, RequiredSettingsDataValidator $settingsDataValidator)
    {
        $this->wizardService = $wizardService;
        $this->requiredSettingsDataValidator = $settingsDataValidator;
    }
    
    /**
     * @return array
     */
    public function getIdentifiers()
    {
        $environments = count($this->wizardService->getWebstoresIdentifiers()) ? array_keys($this->wizardService->getWebstoresIdentifiers()) : [];
        
        return $environments;
    }

    /**
     * @return array
     */
    public function get(): array
    {
        $dataStructure = $this->dataStructure;
        $dataStructure['data'] = (object) $this->wizardService->getWebstoresIdentifiers();

        return $dataStructure;
    }

    /**
     * @param string $optionId
     * @return array
     */
    public function getByOptionId(string $optionId = 'default')
    {
        list($webstore, $pluginSet) = explode(".", $optionId);

        $webstoreId = explode('_', $webstore)[1];
        $pluginSetId = explode('_', $pluginSet)[1];

        $dataStructure = $this->dataStructure;
        $dataStructure['data'] = (object) $this->wizardService->mapWebstoreData($webstoreId, $pluginSetId);

        return $dataStructure;
    }
    
    /**
     * @param string $optionId
     * @param array $data
     * @throws \Plenty\Exceptions\ValidationException
     */
    public function finalize(string $optionId = 'default', array $data = []) {
        $pluginSet= explode(".", $optionId)[1];

        if (empty($pluginSet)) {
            $settingsService = pluginApp(DefaultSettingsService::class);

            $hasShippingMethod = $settingsService->hasShippingMethods();
            $hasShippingProfile = $settingsService->hasShippingProfiles();
            $hasPaymentMethod = $settingsService->hasPaymentMethods();
            $hasShippingCountry = $settingsService->hasShippingCountries();

            if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry) {
                $data['setAllRequiredAssistants'] = 'true';
            }
        }
        $this->requiredSettingsDataValidator->validateOrFail($data);
    }

    /**
     * @param string $optionId
     */
    public function deleteDataOption(string $optionId = 'default')
    {
        $pluginSet = explode(".", $optionId)[1];
        $pluginSetId = explode('_', $pluginSet)[1];

        $previewConfRepo = pluginApp(ShopWizardConfigRepository::class);
        $confToDelete = $previewConfRepo->getConfig($pluginSetId);

        if ($confToDelete instanceof ShopWizardPreviewConfiguration) {
            $previewConfRepo->deleteConfig($pluginSetId, true);
        }
    }

}
