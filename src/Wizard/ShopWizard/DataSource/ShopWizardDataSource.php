<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 03/06/2019
 * Time: 14:37
 */

namespace Ceres\Wizard\ShopWizard\DataSource;

use Plenty\Modules\Wizard\Services\DataSources\BaseWizardDataSource;
use Ceres\Wizard\ShopWizard\Services\ShopWizardService;

class ShopWizardDataSource extends BaseWizardDataSource
{

    /**
     * @var ShopWizardService
     */

    private $wizardService;

    /**
     * ShopWizardDataSource constructor.
     *
     * @param ShopWizardService $wizardService
     */
    public function __construct(ShopWizardService $wizardService)
    {
        $this->wizardService = $wizardService;
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

        list($webstore,) = explode(".", $optionId);

        list($webstorePrefix, $webstoreId) = explode('_', $webstore);


        $dataStructure = $this->dataStructure;

        $dataStructure['data'] = (object) $this->wizardService->mapWebstoreData($webstoreId);

        return $dataStructure;
    }

}