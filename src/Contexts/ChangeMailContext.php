<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

class ChangeMailContext extends GlobalContext implements ContextInterface
{
    /**
     * @var int The contact's ID for changing the mail.
     */
    public $contactId;

    /**
     * @var string The Hash used to authenticate the mail change.
     */
    public $hash;

    /**
     * @var string The new email address, to change.
     */
    public $newMail;

    /**
     * @var \Plenty\Modules\Category\Models\Category
     * Category data of the current category, linked to this context.
     */
    public $category;

    /**
     * @inheritdoc
     */
    public function init($params)
    {
        parent::init($params);

        $this->hash = $this->getParam( 'hash');
        $this->contactId = $this->getParam( 'contactId');
        $this->newMail = $this->getParam('newMail');
        $this->category = $this->getParam('category');
    }
}
