<?php

namespace Ceres\Methods;

use Ceres\Wizard\ShopWizard\Services\SettingsHandlerService;
use Plenty\Modules\Basket\Contracts\BasketRepositoryContract;
use Plenty\Modules\Frontend\Contracts\Checkout;
use Plenty\Modules\Frontend\Session\Storage\Contracts\FrontendSessionStorageFactoryContract;
use Plenty\Modules\Payment\Method\Services\PaymentMethodBaseService;
use Plenty\Plugin\Application;
use Plenty\Plugin\Translation\Translator;

class AlreadyPaidPaymentMethod extends PaymentMethodBaseService
{
    /** @var BasketRepositoryContract */
    private $basketRepository;

    /** @var  Checkout */
    private $checkout;

    /** @var SettingsHandlerService */
    private $settingsHandlerService;

    /**
     * CashInAdvancePaymentMethod constructor.
     * @param BasketRepositoryContract $basketRepository
     * @param Checkout $checkout
     */
    public function __construct(
        BasketRepositoryContract $basketRepository,
        Checkout $checkout,
        SettingsHandlerService $settingsHandlerService
    ) {
        $this->basketRepository = $basketRepository;
        $this->checkout = $checkout;
        $this->settingsHandlerService = $settingsHandlerService;
    }

    /**
     * Check whether AlreadyPaid is active or not
     *
     * @return bool
     */
    public function isActive(): bool
    {
        $app = pluginApp(Application::class);
        $shippingCountries = $this->settingsHandlerService->getAlreadyPaidShippingCountries($app->getPlentyId());

        if(!in_array($this->checkout->getShippingCountryId(), $shippingCountries))
        {
            return false;
        }

        return $this->basketRepository->load()->basketAmount <= 0;
    }

    /**
     * Get shown name
     *
     * @param $lang
     * @return string
     */
    public function getName(string $lang = 'de'): string
    {
        /** @var Translator $translator */
        $translator = pluginApp(Translator::class);
        return $translator->trans('Ceres::AlreadyPaid.paymentMethodName', [], $lang);
    }

    /**
     * Get AlreadyPaid Fee
     *
     * @return float
     */
    public function getFee(): float
    {
        return 0.00;
    }

    /**
     * Get AlreadyPaid Icon
     *
     * @param string $lang
     * @return string
     */
    public function getIcon(string $lang = 'de'): string
    {
        return '';
    }

    /**
     * Get AlreadyPaid source URL
     *
     * @param string $lang
     * @return string
     */
    public function getSourceUrl(string $lang = 'de'): string
    {
        return '';
    }

    /**
     * Get AlreadyPaid description
     *
     * @param string $lang
     * @return string
     */
    public function getDescription(string $lang = 'de'): string
    {
        /** @var Translator $translator */
        $translator = pluginApp(Translator::class);
        return $translator->trans(
            'Ceres::AlreadyPaid.paymentMethodDescription',
            [],
            $lang
        ) . ' ' . $this->checkout->getCurrency();
    }

    /**
     * Check if it is allowed to switch to this payment method
     *
     * @return bool
     */
    public function isSwitchableTo(): bool
    {
        return false;
    }

    /**
     * Check if it is allowed to switch from this payment method
     *
     * @return bool
     */
    public function isSwitchableFrom(): bool
    {
        return false;
    }

    /**
     * Check if this payment method should be searchable in the backend
     *
     * @return bool
     */
    public function isBackendSearchable(): bool
    {
        return true;
    }

    /**
     * Check if this payment method should be active in the backend
     *
     * @return bool
     */
    public function isBackendActive(): bool
    {
        return true;
    }

    /**
     * Get the name for the backend
     *
     * @param string $lang
     * @return string
     */
    public function getBackendName(string $lang = 'de'): string
    {
        return $this->getName($lang);
    }

    /**
     * Check if this payment method can handle subscriptions
     *
     * @return bool
     */
    public function canHandleSubscriptions(): bool
    {
        return false;
    }

    /**
     * Get the url for the backend icon
     *
     * @return string
     */
    public function getBackendIcon(): string
    {
        //TODO real icon
        return '';
        //$app = pluginApp(Application::class);
        //$icon = $app->getUrlPath('prepayment').'/images/logos/prepayment_plus_backend_icon.svg';
        //return $icon;
    }
}
