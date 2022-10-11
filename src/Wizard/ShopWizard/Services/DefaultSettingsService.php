<?php

namespace Ceres\Wizard\ShopWizard\Services;

use Plenty\Modules\Accounting\Contracts\AccountingLocationRepositoryContract;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Order\Shipping\Contracts\ParcelServicePresetRepositoryContract;
use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Order\Shipping\ParcelService\Models\ParcelService;
use Plenty\Modules\Payment\Method\Contracts\PaymentMethodContainer;
use Plenty\Modules\Payment\Method\Contracts\PaymentMethodRepositoryContract;
use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\Plugin\Models\Plugin;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;
use Plenty\Plugin\Http\Request;

/**
 * Class DefaultSettingsService
 * @package Ceres\Wizard\ShopWizard\Services
 */
class DefaultSettingsService
{
    /**
     * @var AuthHelper
     */
    private $authHelper;

    /**
     * @var ParcelServicePresetRepositoryContract
     */
    private $parcelServicePresetRepo;

    /**
     * @var PaymentMethodRepositoryContract
     */
    private $paymentRepository;

    /**
     * @var CountryRepositoryContract
     */
    private $countryRepository;

    /**
     * @var AccountingLocationRepositoryContract
     */
    private $accountingLocationRepo;

    /**
     * @var array
     */
    private $pluginSetList;

    /** @var int */
    private $pluginSetId;

    /** @var PluginSetRepositoryContract */
    private $pluginSetRepository;

    /**
     * ShopWizardService constructor.
     *
     * @param ParcelServicePresetRepositoryContract $parcelServicePresetRepo
     * @param PaymentMethodRepositoryContract $paymentRepository
     * @param CountryRepositoryContract $countryRepository
     * @param AccountingLocationRepositoryContract $accountingLocationRepo
     */
    public function __construct(
        AuthHelper $authHelper,
        ParcelServicePresetRepositoryContract $parcelServicePresetRepo,
        PaymentMethodRepositoryContract $paymentRepository,
        CountryRepositoryContract $countryRepository,
        AccountingLocationRepositoryContract $accountingLocationRepo,
        PluginSetRepositoryContract $pluginSetRepository
    )
    {
        $this->authHelper = $authHelper;
        $this->parcelServicePresetRepo = $parcelServicePresetRepo;
        $this->paymentRepository = $paymentRepository;
        $this->countryRepository = $countryRepository;
        $this->accountingLocationRepo = $accountingLocationRepo;
        $this->pluginSetRepository = $pluginSetRepository;

        /** @var Request $request */
        $request = pluginApp(Request::class);
        $this->pluginSetId = $this->pluginSetRepository->getPluginSetIdFromHash($request->get('bootPluginSetHash'));
    }

    /**
     * @return bool
     */
    public function hasShippingProfiles(): bool
    {
        $shippingProfiles = $this->getShippingProfiles();
        return count($shippingProfiles) ? true : false;
    }

    /**
     * @return bool
     */
    public function hasPaymentMethods(): bool
    {
        /** @var PluginSet $pluginSet */
        $pluginSet = $this->pluginSetRepository->get($this->pluginSetId);

        $paymentPlugins = $pluginSet->pluginSetEntriesWithTrashed->filter(function(PluginSetEntry $pluginSetEntry) {
            return $pluginSetEntry->plugin->type === Plugin::TYPE_PAYMENT;
        });

        return $paymentPlugins->count() > 0;
    }

    /**
     * @return bool
     */
    public function hasInactivePaymentMethod(): bool
    {
        $pluginSetId = $this->pluginSetId;
        $pluginSetRepo = $this->pluginSetRepository;

        /** @var PluginSet $pluginSet */
        $pluginSet = $pluginSetRepo->get($pluginSetId);

        $paymentPlugins = $pluginSet->pluginSetEntriesWithTrashed->filter(function(PluginSetEntry $pluginSetEntry) {
            return $pluginSetEntry->plugin->type === Plugin::TYPE_PAYMENT && $pluginSetEntry->plugin->activeProductive;
        });

        /** @var PluginRepositoryContract $pluginRepository */
        $pluginRepository = pluginApp(PluginRepositoryContract::class);

        $activePaymentPlugins = $paymentPlugins->filter(function(PluginSetEntry $pluginSetEntry) use ($pluginSetId, $pluginRepository) {
            return $pluginRepository->isActiveInPluginSet($pluginSetEntry->plugin->id, $pluginSetId);
        });

        return $paymentPlugins->count() > 0 && $activePaymentPlugins->count() === 0;
    }

    /**
     * @return array
     */
    public function getPluginPaymentMethodsRegistered():array
    {
        $paymentMethods = $this->paymentRepository->allPluginPaymentMethods();
        $paymentMethodIds = [];
        foreach ($paymentMethods as $paymentMethod) {
            $paymentMethodIds[] = $paymentMethod->id;
        }

        foreach ($this->paymentRepository->listAllActive('en') as $paymentMethodId => $paymentMethodId)
        {
            if (!in_array($paymentMethodId, $paymentMethodIds)) {
                $paymentMethods[] = $this->paymentRepository->findByPaymentMethodId($paymentMethodId);
            }
        }

        $paymentMethodContainer = pluginApp(PaymentMethodContainer::class);

        $pluginPaymentMethodsRegistered = [];
        if (count($paymentMethods)) {
            foreach ($paymentMethods as $paymentMethod) {
                $registeringKey = $paymentMethod->pluginKey . '::' . $paymentMethod->paymentKey;
                if ($paymentMethodContainer->isRegistered($registeringKey)) {
                    $pluginPaymentMethodsRegistered[$paymentMethod->id] = $paymentMethod->name;
                }
            }
        }

        return $pluginPaymentMethodsRegistered;
    }

    /**
     * @return bool
     */
    public function hasShippingMethods(): bool
    {
        $shippingMethods = $this->getShippingMethods();
        return count($shippingMethods) ? true : false;
    }

    /**
     * @return bool
     */
    public function hasShippingCountries(): bool
    {
        $shippingCountries = $this->countryRepository->getActiveCountriesList()->all();
        return is_array($shippingCountries) && count($shippingCountries) ? true : false;
    }

    /**
     * @return array
     */
    public function getShippingProfiles(): array
    {
        return $this->parcelServicePresetRepo->getPreviewList(null, true);
    }

    /**
     * @return array
     */
    public function getShippingMethods(): array
    {
        $shippingMethods = [];
        $shippingProfiles = $this->parcelServicePresetRepo->getPresetList(['*'], 'parcelService')->all();

        if (is_array($shippingProfiles) && count($shippingProfiles)) {
            foreach ($shippingProfiles as $profile) {
                $shippingMethod = $profile->parcelService;
                if($shippingMethod instanceof ParcelService) {
                    $shippingMethods[(float)$shippingMethod->id] = $shippingMethod->backendName;
                }
            }
        }

        return $shippingMethods;
    }

    /**
     * @return bool
     */
    public function hasLocations(): bool
    {
        $accountingLocationRepo = $this->accountingLocationRepo;
        $locations = $this->authHelper->processUnguarded(function() use ($accountingLocationRepo) {
            return $accountingLocationRepo->getAll()->toArray();
        });

        return is_array($locations) && count($locations) ? true : false;
    }

    /**
     * @return array
     */
    public function getPluginSets(): array
    {
        if(is_array($this->pluginSetList)) {
            return $this->pluginSetList;
        }

        $pluginRepo = pluginApp(PluginRepositoryContract::class);
        $pluginSets = $this->pluginSetRepository->list();
        $pluginSetsData = $pluginSets->toArray();
        $pluginSetList = [];
        if (is_array($pluginSetsData) && count($pluginSetsData)) {
            $plugin = $pluginRepo->getPluginByName('Ceres');
            if ($plugin instanceof Plugin) {
                foreach ($pluginSetsData as $pluginSetData) {
                    $pluginSet = $pluginSets->where('id', '=', $pluginSetData['id'])->first();
                    if($pluginSet instanceof PluginSet) {
                        if ($pluginRepo->isActiveInPluginSet($plugin->id, $pluginSet)) {
                            $pluginSetList[] = $pluginSetData;
                        }
                    }
                }
            }
        }

        $this->pluginSetList = $pluginSetList;

        return $pluginSetList;
    }

    /**
     * @return array
     */
    public function getWebstores(): array
    {
        /** @var WebstoreRepositoryContract $webstoreRepo */
        $webstoreRepo = pluginApp(WebstoreRepositoryContract::class);
        $webstores = [];

        $webstoresCollection = $webstoreRepo->loadAll();

        if (count($webstoresCollection)) {
            foreach ($webstoresCollection as $webstore) {
                $webstores[] = $webstore->toArray();
            }
        }
        return $webstores;
    }
}
