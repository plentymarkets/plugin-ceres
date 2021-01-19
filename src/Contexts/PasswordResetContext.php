<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use Plenty\Modules\Category\Models\Category;

/**
 * Context class with additional data, required for the password reset view.
 */
class PasswordResetContext extends GlobalContext implements ContextInterface
{
    /**
     * @var int The contact's ID for reset the password.
     */
    public $contactId;

    /**
     * @var string The Hash used to authenticate the password reset.
     */
    public $hash;

    /**
     * @var Category
     * Category data of the current category, linked to this context.
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
        $this->category = $this->getParam('category');
    }
}
