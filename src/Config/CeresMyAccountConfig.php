<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresMyAccountConfig
 *
 * PluginConfig class, including all plugin settings for the my account.
 *
 * @package Ceres\Config
 */
class CeresMyAccountConfig extends PluginConfig
{
    /**
     * @var int $ordersPerPage Number of orders to show per page in order history.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $ordersPerPage;

    /**
     * @var bool $orderReturnActive Defines if returns are allowed in my account.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $orderReturnActive;

    /**
     * @var int $orderReturnDays Number of days to return items of an order
     */
    public $orderReturnDays;

    /**
     * @var string $orderReturnInitialStatus Default status for return.
     */
    public $orderReturnInitialStatus;

    /**
     * @var bool $changePayment Allow customer to change the payment method.
     */
    public $changePayment;

    /**
     * @var bool $confirmationLinkLoginRedirect Forward to login page after clicking link in order confirmation.
     */
    public $confirmationLinkLoginRedirect;

    /**
     * @var string $confirmationLinkExpiration Validity of checkout URL.
     */
    public $confirmationLinkExpiration;

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
        $this->ordersPerPage                = $this->getIntegerValue( 'my_account.orders_per_page', 5 );
        $this->orderReturnActive            = $this->getBooleanValue( 'my_account.order_return_active', true );
        $this->orderReturnDays              = $this->getIntegerValue( 'my_account.order_return_days', 14 );
        $this->orderReturnInitialStatus     = $this->getTextValue( 'my_account.order_return_initial_status', '9.0' );
        $this->changePayment                = $this->getBooleanValue( 'my_account.change_payment', true );
        $this->confirmationLinkLoginRedirect= $this->getBooleanValue( 'my_account.confirmation_link_login_redirect', false );
        $this->confirmationLinkExpiration   = $this->getTextValue('my_account.confirmation_link_expiration', 'always');
    }
}
