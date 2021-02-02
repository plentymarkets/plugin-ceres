<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use Plenty\Modules\Category\Models\Category;

/**
 * Class ChangeMailContext
 *
 * Context class with additional data, required for the change mail view.
 *
 * @package Ceres\Contexts
 */
class ChangeMailContext extends GlobalContext implements ContextInterface
{
    /**
     * @var int $contactId The contact's ID for changing the mail.
     */
    public $contactId;

    /**
     * @var string $hash The hash used to authenticate the mail change.
     */
    public $hash;

    /**
     * @var string $newMail The new email address the customer entered.
     */
    public $newMail;

    /**
     * @var Category $category
     * Category data of the current category linked to this context.
     */
    public $category;

    /**
     * @inheritDoc
     */
    public function init($params)
    {
        parent::init($params);

        $this->hash = $this->getParam('hash');
        $this->contactId = $this->getParam('contactId');
        $this->newMail = $this->getParam('newMail');
        $this->category = $this->getParam('category');
    }
}
