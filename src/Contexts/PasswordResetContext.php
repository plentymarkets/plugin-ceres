<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use Plenty\Modules\Category\Models\Category;

/**
 * Class PasswordResetContext
 *
 * Context class with additional data, required for the password reset view.
 *
 * @package Ceres\Contexts
 */
class PasswordResetContext extends GlobalContext implements ContextInterface
{
    /**
     * @var int $contactId The contact's ID for resetting the password.
     */
    public $contactId;

    /**
     * @var string $hash The hash used to authenticate the password reset.
     */
    public $hash;

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
        $this->category = $this->getParam('category');
    }
}
