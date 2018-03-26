<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresMyAccountConfig extends PluginConfig
{
    public $ordersPerPage;
    public $orderReturnActive;
    public $orderReturnDays;
    public $orderReturnInitialStatus;
    public $changePayment;
    public $confirmationLinkLoginRedirect;
    
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->ordersPerPage                = $this->getIntegerValue( "my_account.orders_per_page", 5 );
        $this->orderReturnActive            = $this->getBooleanValue( "my_account.order_return_active", true );
        $this->orderReturnDays              = $this->getIntegerValue( "my_account.order_return_days", 14 );
        $this->orderReturnInitialStatus     = $this->getTextValue( "my_account.order_return_initial_status", "9" );
        $this->changePayment                = $this->getBooleanValue( "my_account.change_payment", true );
        $this->confirmationLinkLoginRedirect= $this->getBooleanValue( "my_account.confirmation_link_login_redirect", false );
    }
}