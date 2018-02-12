<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresMyAccountConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getOrdersPerPage()
    {
        return $this->getIntegerValue( "my_account.orders_per_page", 5 );
    }

    public function getOrderReturnActive()
    {
        return $this->getBooleanValue( "my_account.order_return_active", true );
    }

    public function getOrderReturnDays()
    {
        return $this->getIntegerValue( "my_account.order_return_days", 14 );
    }

    public function getOrderReturnInitialStatus()
    {
        return $this->getTextValue( "my_account.order_return_initial_status", "9" );
    }

    public function getChangePayment()
    {
        return $this->getBooleanValue( "my_account.change_payment", true );
    }

    public function getConfirmationLinkLoginRedirect()
    {
        return $this->getBooleanValue( "my_account.confirmation_link_login_redirect", false );
    }
}