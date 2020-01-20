<?php

namespace Ceres\Contexts;

use Ceres\Config\CeresConfig;
use Ceres\Helper\BuildHash;
use IO\Extensions\Constants\ShopUrls;
use IO\Helper\ContextInterface;
use IO\Services\BasketService;
use IO\Services\CategoryService;
use IO\Services\CheckoutService;
use IO\Services\CustomerService;
use IO\Services\NotificationService;
use IO\Services\SessionStorageService;
use IO\Services\TemplateService;
use IO\Services\WebstoreConfigurationService;
use Plenty\Modules\ShopBuilder\Helper\ShopBuilderRequest;
use Plenty\Plugin\Application;
use Plenty\Plugin\Http\Request;

class ContactContext extends GlobalContext
{
    public $coordinates;

    public function init($params)
    {
        parent::init($params);

        $this->coordinates = $this->getParam('coordinates', []);
    }
}
