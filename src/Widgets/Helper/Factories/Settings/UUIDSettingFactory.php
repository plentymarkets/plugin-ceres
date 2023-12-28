<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\ShopBuilder\Factories\Settings\BaseSettingFactory;
//use IO\Extensions\Functions\UniqueId;

class UUIDSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
//        $uuidGenerator = pluginApp(UniqueId::class);
//        $uuid = $uuidGenerator->generateUniqueId();
        $this->withType('uuid')
            ->withDefaultValue('4af67288-b1e4-4a83-9777-fbbfe0295e95');
    }
}
