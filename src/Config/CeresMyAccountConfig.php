<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresMyAccountConfig extends PluginConfig
{
    public $ordersPerPage;
    public $orderReturnActive;
    public $orderReturnDays;
    public $orderReturnInitialStatus;
    public $changePayment;
    public $confirmationLinkLoginRedirect;
    public $confirmationLinkExpiration;
    
    protected function getPluginName()
    {
        return 'Ceres';
    }

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
