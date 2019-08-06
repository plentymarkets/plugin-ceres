<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use IO\Helper\RouteConfig;
use Plenty\Modules\Category\Models\Category;

class CategoryContext extends GlobalContext implements ContextInterface
{
    /** @var Category */
    public $category = null;
   
    public $metaRobots;
    
    public function init($params)
    {
        parent::init($params);
        
        $this->category = $params['category'];
        
        $this->metaRobots = str_replace('_', ', ', $this->category->details[0]->metaRobots);

        $this->bodyClasses[] = "page-category";
        $this->bodyClasses[] = "category-".$this->category->id;

        switch($this->category->id)
        {
            case RouteConfig::getCategoryId(RouteConfig::BASKET):
                $this->bodyClasses[] = "category-basket";
                break;
            case RouteConfig::getCategoryId(RouteConfig::CANCELLATION_RIGHTS):
                $this->bodyClasses[] = "category-cancellation-rights";
                break;
            case RouteConfig::getCategoryId(RouteConfig::CANCELLATION_FORM):
                $this->bodyClasses[] = "category-cancellation-form";
                break;
            case RouteConfig::getCategoryId(RouteConfig::CHANGE_MAIL):
                $this->bodyClasses[] = "category-change-mail";
                break;
            case RouteConfig::getCategoryId(RouteConfig::CHECKOUT):
                $this->bodyClasses[] = "category-checkout";
                break;
            case RouteConfig::getCategoryId(RouteConfig::CONFIRMATION):
                $this->bodyClasses[] = "category-confirmation";
                break;
            case RouteConfig::getCategoryId(RouteConfig::CONTACT):
                $this->bodyClasses[] = "category-contact";
                break;
            case RouteConfig::getCategoryId(RouteConfig::HOME):
                $this->bodyClasses[] = "category-home";
                break;
            case RouteConfig::getCategoryId(RouteConfig::LEGAL_DISCLOSURE):
                $this->bodyClasses[] = "category-legal-disclosure";
                break;
            case RouteConfig::getCategoryId(RouteConfig::LOGIN):
                $this->bodyClasses[] = "category-login";
                break;
            case RouteConfig::getCategoryId(RouteConfig::MY_ACCOUNT):
                $this->bodyClasses[] = "category-my-account";
                break;
            case RouteConfig::getCategoryId(RouteConfig::NEWSLETTER_OPT_IN):
                $this->bodyClasses[] = "category-newsletter-opt-in";
                break;
            case RouteConfig::getCategoryId(RouteConfig::NEWSLETTER_OPT_OUT):
                $this->bodyClasses[] = "category-newsletter-opt-out";
                break;
            case RouteConfig::getCategoryId(RouteConfig::ORDER_RETURN):
                $this->bodyClasses[] = "category-order-return";
                break;
            case RouteConfig::getCategoryId(RouteConfig::ORDER_RETURN_CONFIRMATION):
                $this->bodyClasses[] = "category-order-return-confirmation";
                break;
            case RouteConfig::getCategoryId(RouteConfig::PASSWORD_RESET):
                $this->bodyClasses[] = "category-password-reset";
                break;
            case RouteConfig::getCategoryId(RouteConfig::PRIVACY_POLICY):
                $this->bodyClasses[] = "category-privacy-policy";
                break;
            case RouteConfig::getCategoryId(RouteConfig::REGISTER):
                $this->bodyClasses[] = "category-register";
                break;
            case RouteConfig::getCategoryId(RouteConfig::SEARCH):
                $this->bodyClasses[] = "category-search";
                break;
            case RouteConfig::getCategoryId(RouteConfig::TERMS_CONDITIONS):
                $this->bodyClasses[] = "category-terms-conditions";
                break;
            case RouteConfig::getCategoryId(RouteConfig::WISH_LIST):
                $this->bodyClasses[] = "category-wish-list";
                break;
            case RouteConfig::getCategoryId(RouteConfig::PAGE_NOT_FOUND):
                $this->bodyClasses[] = "category-page-not-found";
                break;

        }
    }
}